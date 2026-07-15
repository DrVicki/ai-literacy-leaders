import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

/**
 * Sends an enrollment confirmation email via Gmail MCP.
 */
export async function sendEnrollmentEmail(
  email: string,
  name: string
): Promise<void> {
  const subject = "Welcome to AI Literacy & Application for Small Business — You're Enrolled!";
  const content = `Hi ${name},

Congratulations! Your enrollment in AI Literacy & Application for Small Business is confirmed.

You now have full access to all 5 modules:

  Module 1: Demystifying AI
  Module 2: Strategic AI Integration
  Module 3: Data Strategy & Governance
  Module 4: Ethical AI
  Module 5: Leading the AI-Powered Organization

Log in to your course dashboard to start learning and track your progress.

If you have any questions, simply reply to this email.

Welcome aboard,
The AI Literacy & Application for Small Business Team`;

  const input = JSON.stringify({
    messages: [{ to: [email], subject, content }],
  });

  await execFileAsync("manus-mcp-cli", [
    "tool", "call", "gmail_send_messages", "--server", "gmail", "--input", input,
  ]);
  console.log("[Email] Enrollment email sent to:", email);
}

/**
 * Sends a certificate of completion email with a download link via Gmail MCP.
 */
export async function sendCertificateEmail(
  email: string,
  name: string,
  pdfKey: string
): Promise<void> {
  if (!email) return;

  const subject = "Your AI Literacy & Application for Small Business Certificate of Completion";
  const pdfUrl = `/manus-storage/${pdfKey}`;
  const content = `Hi ${name},

Congratulations on completing the AI Literacy & Application for Small Business Executive Education Program!

You have successfully finished all 5 modules and 18 lessons. Your certificate of completion is now available.

Download your certificate here:
${pdfUrl}

(If the link doesn't work, log in to your course dashboard and click "Download Certificate" from the top of the page.)

Thank you for your commitment to building AI literacy. We hope the frameworks and insights from this program serve you and your organization well.

With congratulations,
The AI Literacy & Application for Small Business Team`;

  const input = JSON.stringify({
    messages: [{ to: [email], subject, content }],
  });

  await execFileAsync("manus-mcp-cli", [
    "tool", "call", "gmail_send_messages", "--server", "gmail", "--input", input,
  ]);
  console.log("[Email] Certificate email sent to:", email);
}
