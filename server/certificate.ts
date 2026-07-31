/**
 * Certificate PDF generation using pdf-lib (pure Node.js, works in production).
 * No shell commands or sandbox-only CLI tools are used.
 */
import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from "pdf-lib";
import { storagePut } from "./storage";
import { COURSE_MODULES, TOTAL_LESSONS } from "../shared/courseData";

// ─── Certificate ID ───────────────────────────────────────────────────────────

const CERT_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 1, 0

export function generateCertificateId(issuedAt: Date): string {
  const year = issuedAt.getFullYear();
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += CERT_CHARS[Math.floor(Math.random() * CERT_CHARS.length)];
  }
  return `AILLSB-${year}-${suffix}`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
}

function drawCenteredText(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  y: number,
  color: [number, number, number],
  pageWidth: number
) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, {
    x: (pageWidth - width) / 2,
    y,
    size,
    font,
    color: rgb(...color),
  });
}

function drawHRule(
  page: PDFPage,
  y: number,
  pageWidth: number,
  color: [number, number, number],
  widthFraction = 0.5
) {
  const lineWidth = pageWidth * widthFraction;
  const x = (pageWidth - lineWidth) / 2;
  page.drawLine({
    start: { x, y },
    end: { x: x + lineWidth, y },
    thickness: 0.75,
    color: rgb(...color),
  });
}

function drawCornerAccents(
  page: PDFPage,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  size: number,
  color: [number, number, number]
) {
  const t = 1.5;
  const corners = [
    { x: margin, y: pageHeight - margin, dx: size, dy: 0 },
    { x: margin, y: pageHeight - margin, dx: 0, dy: -size },
    { x: pageWidth - margin, y: pageHeight - margin, dx: -size, dy: 0 },
    { x: pageWidth - margin, y: pageHeight - margin, dx: 0, dy: -size },
    { x: margin, y: margin, dx: size, dy: 0 },
    { x: margin, y: margin, dx: 0, dy: size },
    { x: pageWidth - margin, y: margin, dx: -size, dy: 0 },
    { x: pageWidth - margin, y: margin, dx: 0, dy: size },
  ];
  for (const c of corners) {
    page.drawLine({
      start: { x: c.x, y: c.y },
      end: { x: c.x + c.dx, y: c.y + c.dy },
      thickness: t,
      color: rgb(...color),
    });
  }
}

// ─── Main PDF generator ───────────────────────────────────────────────────────

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

  // ── Colours ──────────────────────────────────────────────────────────────
  const navy = hexToRgb("#1a2a4a");
  const gold = hexToRgb("#d4b86a");
  const darkGold = hexToRgb("#8a7340");
  const midGrey = hexToRgb("#555555");
  const lightGrey = hexToRgb("#888888");
  const veryLight = hexToRgb("#aaaaaa");
  const white: [number, number, number] = [1, 1, 1];

  // ── Page setup (Landscape A4) ─────────────────────────────────────────────
  const pageWidth = 841.89;
  const pageHeight = 595.28;
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  // White background
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: rgb(...white) });

  // Outer border
  const bm = 20;
  page.drawRectangle({
    x: bm, y: bm,
    width: pageWidth - bm * 2, height: pageHeight - bm * 2,
    borderColor: rgb(...navy), borderWidth: 2, color: rgb(...white),
  });

  // Corner gold accents
  drawCornerAccents(page, pageWidth, pageHeight, bm + 10, 28, gold);

  // ── Fonts ────────────────────────────────────────────────────────────────
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ── Content layout (y decreases downward) ────────────────────────────────
  let y = pageHeight - 68;

  // "CERTIFICATE OF COMPLETION" — letter-spaced label
  const labelText = "CERTIFICATE OF COMPLETION";
  const labelSize = 9;
  const letterSpacing = 3;
  const labelWidth = helveticaBold.widthOfTextAtSize(labelText, labelSize) + letterSpacing * (labelText.length - 1);
  let lx = (pageWidth - labelWidth) / 2;
  for (const ch of labelText) {
    page.drawText(ch, { x: lx, y, size: labelSize, font: helveticaBold, color: rgb(...darkGold) });
    lx += helveticaBold.widthOfTextAtSize(ch, labelSize) + letterSpacing;
  }
  y -= 22;

  drawHRule(page, y, pageWidth, gold, 0.55);
  y -= 22;

  drawCenteredText(page, "AI Literacy & Application for Small Business", timesBold, 22, y, navy, pageWidth);
  y -= 30;

  drawCenteredText(page, "This is to certify that", timesRoman, 13, y, midGrey, pageWidth);
  y -= 28;

  drawCenteredText(page, userName, timesItalic, 30, y, navy, pageWidth);
  y -= 36;

  drawCenteredText(
    page,
    `has successfully completed all ${COURSE_MODULES.length} modules of the`,
    timesRoman, 13, y, midGrey, pageWidth
  );
  y -= 22;

  drawCenteredText(
    page,
    "AI Literacy & Application for Small Business Executive Education Program",
    timesBold, 14, y, navy, pageWidth
  );
  y -= 36;

  drawHRule(page, y, pageWidth, gold, 0.45);
  y -= 28;

  // Stats row
  const statsY = y;
  const col1x = pageWidth * 0.22;
  const col2x = pageWidth * 0.50;
  const col3x = pageWidth * 0.78;

  const drawStat = (label: string, value: string, cx: number) => {
    const lw = helvetica.widthOfTextAtSize(label, 8);
    const vw = helveticaBold.widthOfTextAtSize(value, 16);
    page.drawText(label, { x: cx - lw / 2, y: statsY, size: 8, font: helvetica, color: rgb(...lightGrey) });
    page.drawText(value, { x: cx - vw / 2, y: statsY - 18, size: 16, font: helveticaBold, color: rgb(...navy) });
  };

  drawStat("MODULES COMPLETED", `${COURSE_MODULES.length} of ${COURSE_MODULES.length}`, col1x);
  drawStat("LESSONS COMPLETED", `${TOTAL_LESSONS} of ${TOTAL_LESSONS}`, col2x);
  drawStat("DATE COMPLETED", dateStr, col3x);
  y = statsY - 46;

  drawHRule(page, y, pageWidth, gold, 0.45);
  y -= 24;

  // Certificate ID
  drawCenteredText(page, "CERTIFICATE ID", helvetica, 8, y, lightGrey, pageWidth);
  y -= 16;

  const certIdSize = 14;
  const certIdSpacing = 2;
  const certIdWidth =
    helveticaBold.widthOfTextAtSize(certificateId, certIdSize) +
    certIdSpacing * (certificateId.length - 1);
  let cidX = (pageWidth - certIdWidth) / 2;
  for (const ch of certificateId) {
    page.drawText(ch, { x: cidX, y, size: certIdSize, font: helveticaBold, color: rgb(...navy) });
    cidX += helveticaBold.widthOfTextAtSize(ch, certIdSize) + certIdSpacing;
  }
  y -= 20;

  drawCenteredText(page, `Verify at: ${verifyUrl}`, helvetica, 8, y, veryLight, pageWidth);
  y -= 20;

  drawHRule(page, y, pageWidth, hexToRgb("#eeeeee"), 0.55);
  y -= 14;

  drawCenteredText(
    page,
    "AI Literacy & Application for Small Business  \u00B7  Dr. Vicki Bealman",
    helvetica, 8, y, veryLight, pageWidth
  );

  // ── Serialize & upload ────────────────────────────────────────────────────
  const pdfBytes = await pdfDoc.save();
  const safeUserName = userName.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40);
  const key = `certificates/${safeUserName}_${certificateId}.pdf`;
  const result = await storagePut(key, Buffer.from(pdfBytes), "application/pdf");
  return result;
}
