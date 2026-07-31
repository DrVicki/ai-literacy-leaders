import { execSync } from "child_process";
import { writeFileSync, readFileSync, unlinkSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { storagePut } from "./storage";
import { TOTAL_LESSONS, COURSE_MODULES } from "../shared/courseData";

/**
 * Generates a unique, human-readable certificate ID.
 * Format: AILLSB-YYYY-XXXXXX  (e.g. AILLSB-2025-A3F7K2)
 * - AILLSB = AI Literacy & Application for Small Business prefix
 * - YYYY   = year of issuance
 * - XXXXXX = 6 random alphanumeric characters (uppercase)
 */
export function generateCertificateId(issuedAt: Date): string {
  const year = issuedAt.getFullYear();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/1/0 to avoid confusion
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `AILLSB-${year}-${suffix}`;
}

/**
 * Generates a PDF certificate for a learner who has completed all course lessons.
 * Uses manus-md-to-pdf to render a polished Markdown template into a PDF,
 * then uploads the result to S3 storage and returns the key and URL.
 */
export async function generateCertificatePdf(params: {
  userName: string;
  userEmail: string;
  issuedAt: Date;
  certificateId: string;
}): Promise<{ key: string; url: string }> {
  const { userName, issuedAt, certificateId } = params;

  const dateStr = issuedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const verifyUrl = `https://ailitleaders-j5tktczv.manus.space/verify/${certificateId}`;

  // Build the certificate Markdown — manus-md-to-pdf renders it with full CSS support
  const md = `---
title: Certificate of Completion
---

<div style="font-family: 'Georgia', serif; max-width: 780px; margin: 0 auto; padding: 60px 80px; border: 3px solid #1a2a4a; border-radius: 8px; text-align: center; background: #fff; position: relative;">

<!-- Corner accent lines -->
<div style="position: absolute; top: 16px; left: 16px; width: 32px; height: 32px; border-left: 2px solid #d4b86a; border-top: 2px solid #d4b86a; border-radius: 4px 0 0 0;"></div>
<div style="position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-right: 2px solid #d4b86a; border-top: 2px solid #d4b86a; border-radius: 0 4px 0 0;"></div>
<div style="position: absolute; bottom: 16px; left: 16px; width: 32px; height: 32px; border-left: 2px solid #d4b86a; border-bottom: 2px solid #d4b86a; border-radius: 0 0 0 4px;"></div>
<div style="position: absolute; bottom: 16px; right: 16px; width: 32px; height: 32px; border-right: 2px solid #d4b86a; border-bottom: 2px solid #d4b86a; border-radius: 0 0 4px 0;"></div>

<p style="font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: #8a7340; margin-bottom: 8px;">Certificate of Completion</p>

<h1 style="font-size: 38px; color: #1a2a4a; margin: 0 0 32px; font-weight: 700; letter-spacing: -0.5px;">AI Literacy & Application for Small Business</h1>

<p style="font-size: 16px; color: #555; margin-bottom: 8px;">This is to certify that</p>

<h2 style="font-size: 30px; color: #1a2a4a; margin: 0 0 8px; font-style: italic; font-weight: 600;">${userName}</h2>

<p style="font-size: 16px; color: #555; margin-bottom: 32px;">has successfully completed all ${COURSE_MODULES.length} modules of the</p>

<p style="font-size: 18px; font-weight: 600; color: #1a2a4a; margin-bottom: 32px;">AI Literacy & Application for Small Business Executive Education Program</p>

<div style="display: flex; justify-content: center; gap: 60px; margin: 32px 0; flex-wrap: wrap;">
  <div style="text-align: center;">
    <p style="font-size: 13px; color: #888; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 2px;">Modules Completed</p>
    <p style="font-size: 22px; font-weight: 700; color: #1a2a4a; margin: 0;">${COURSE_MODULES.length} of ${COURSE_MODULES.length}</p>
  </div>
  <div style="text-align: center;">
    <p style="font-size: 13px; color: #888; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 2px;">Lessons Completed</p>
    <p style="font-size: 22px; font-weight: 700; color: #1a2a4a; margin: 0;">${TOTAL_LESSONS} of ${TOTAL_LESSONS}</p>
  </div>
  <div style="text-align: center;">
    <p style="font-size: 13px; color: #888; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 2px;">Date Completed</p>
    <p style="font-size: 22px; font-weight: 700; color: #1a2a4a; margin: 0;">${dateStr}</p>
  </div>
</div>

<hr style="border: none; border-top: 1px solid #d4b86a; margin: 32px auto; width: 60%;" />

<div style="margin-bottom: 20px;">
  <p style="font-size: 12px; color: #888; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;">Certificate ID</p>
  <p style="font-size: 16px; font-weight: 700; color: #1a2a4a; letter-spacing: 3px; font-family: 'Courier New', monospace; margin: 0;">${certificateId}</p>
</div>

<p style="font-size: 11px; color: #aaa; margin-bottom: 4px;">Verify this certificate at:</p>
<p style="font-size: 11px; color: #8a7340; margin: 0;">${verifyUrl}</p>

<hr style="border: none; border-top: 1px solid #eee; margin: 24px auto; width: 60%;" />

<p style="font-size: 12px; color: #aaa; letter-spacing: 2px; text-transform: uppercase;">AI Literacy & Application for Small Business · Dr. Vicki Bealman</p>

</div>
`;

  const tmpMd = join(tmpdir(), `cert_${Date.now()}.md`);
  const tmpPdf = join(tmpdir(), `cert_${Date.now()}.pdf`);

  try {
    writeFileSync(tmpMd, md, "utf-8");
    execSync(`manus-md-to-pdf "${tmpMd}" "${tmpPdf}"`, { timeout: 30_000 });

    if (!existsSync(tmpPdf)) {
      throw new Error("PDF generation failed: output file not found");
    }

    const pdfBuffer = readFileSync(tmpPdf);
    const safeUserName = userName.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40);
    const key = `certificates/${safeUserName}_${certificateId}.pdf`;
    const result = await storagePut(key, pdfBuffer, "application/pdf");
    return result;
  } finally {
    if (existsSync(tmpMd)) unlinkSync(tmpMd);
    if (existsSync(tmpPdf)) unlinkSync(tmpPdf);
  }
}
