import express from "express";
import Stripe from "stripe";
import { createEnrollment, getEnrollmentBySessionId, markEmailSent, getUserByOpenId } from "./db";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia",
});

// IMPORTANT: must use raw body for Stripe signature verification
router.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("[Webhook] Signature verification failed:", message);
      return res.status(400).send(`Webhook Error: ${message}`);
    }

    // Handle test events
    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Avoid duplicate enrollment
      const existing = await getEnrollmentBySessionId(session.id);
      if (existing) {
        console.log("[Webhook] Enrollment already exists for session:", session.id);
        return res.json({ received: true });
      }

      const userId = session.metadata?.user_id
        ? parseInt(session.metadata.user_id, 10)
        : null;

      if (!userId) {
        console.error("[Webhook] No user_id in session metadata");
        return res.status(400).json({ error: "No user_id in metadata" });
      }

      await createEnrollment({
        userId,
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : null,
        amountPaid: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        emailSent: false,
      });

      console.log(`[Webhook] Enrollment created for user ${userId}`);

      // Send confirmation email via Gmail MCP (fire-and-forget)
      const customerEmail =
        session.customer_email ?? session.metadata?.customer_email ?? null;
      const customerName = session.metadata?.customer_name ?? "Learner";

      if (customerEmail) {
        try {
          await sendEnrollmentEmail(customerEmail, customerName, userId);
          // Mark email as sent in the DB
          const enrollment = await getEnrollmentBySessionId(session.id);
          if (enrollment) {
            await markEmailSent(enrollment.id);
            console.log("[Webhook] Enrollment email sent and recorded for user", userId);
          }
        } catch (emailErr) {
          console.error("[Webhook] Failed to send enrollment email:", emailErr);
        }
      }
    }

    res.json({ received: true });
  }
);

async function sendEnrollmentEmail(
  email: string,
  name: string,
  _userId: number
): Promise<void> {
  const { execFile } = await import("child_process");
  const { promisify } = await import("util");
  const execFileAsync = promisify(execFile);

  const subject = "Welcome to AI Literacy for Leaders — You're Enrolled!";
  const content = `Hi ${name},

Congratulations! Your enrollment in AI Literacy for Leaders is confirmed.

You now have full access to all 5 modules:

  Module 1: Demystifying AI
  Module 2: Strategic AI Integration
  Module 3: Data Strategy & Governance
  Module 4: Ethical AI
  Module 5: Leading the AI-Powered Organization

Log in to your course dashboard to start learning and track your progress.

If you have any questions, simply reply to this email.

Welcome aboard,
The AI Literacy for Leaders Team`;

  const input = JSON.stringify({
    messages: [
      {
        to: [email],
        subject,
        content,
      },
    ],
  });

  try {
    await execFileAsync("manus-mcp-cli", [
      "tool",
      "call",
      "gmail_send_messages",
      "--server",
      "gmail",
      "--input",
      input,
    ]);
    console.log("[Email] Enrollment email queued for:", email);
  } catch (err) {
    console.error("[Email] Failed to send via Gmail MCP:", err);
    throw err;
  }
}

export { router as stripeWebhookRouter };
