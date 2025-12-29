import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(req.body);

  const html = req.body.htmlContent;
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  const buffer = Buffer.from(pdfBuffer);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=page.pdf");
  res.send(buffer);
}
