import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1800,
    height: 2000,
  });

  await page.goto(req.body.currentPage, {
    waitUntil: "networkidle0",
  });
  await page.waitForSelector("#pdf-content", { timeout: 10000 });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const contentHandle = await page.$("#pdf-content");
  const boundingBox = await contentHandle?.boundingBox();
  const width = boundingBox?.width || 1800;
  const height = boundingBox?.height || 2000;
  await contentHandle?.dispose();

  const pdfBuffer = await page.pdf({
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
  });

  await browser.close();

  const buffer = Buffer.from(pdfBuffer);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=page.pdf");
  res.send(buffer);
}
