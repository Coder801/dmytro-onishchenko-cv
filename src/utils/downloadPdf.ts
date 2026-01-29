import { ENDPOINTS, PROTOCOL } from "@/config/api";
import { PDF_FILE_NAME } from "@/config/constants";

type DownloadPdfOptions = {
  showAllWorkHistory?: boolean;
};

export const downloadPdf = async (
  completed = () => {},
  options: DownloadPdfOptions = {}
) => {
  const pdfEndpoint = `${PROTOCOL}${ENDPOINTS.PDF}`;
  let res;
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const pdfContent = document.getElementById("pdf-content");
  if (!pdfContent) {
    console.error("PDF content element not found");
    return;
  }

  const pageUrl = new URL(window.location.href);
  if (options.showAllWorkHistory) {
    pageUrl.searchParams.set("showAllWorkHistory", "true");
  }

  try {
    res = await fetch(pdfEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPage: pageUrl.toString(),
        currentLanguage,
        size: {
          width: Math.max((pdfContent?.scrollWidth || 0) + 32),
          height: Math.max((pdfContent?.scrollHeight || 0) + 32),
        },
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to generate PDF");
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    return;
  } finally {
    completed();
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = PDF_FILE_NAME;
  a.click();
  URL.revokeObjectURL(url);
};
