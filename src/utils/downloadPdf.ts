import { ENDPOINTS, PROTOCOL } from "@/config/api";
import { PDF_FILE_NAME } from "@/config/constants";

export const downloadPdf = async () => {
  const pdfEndpoint = `${PROTOCOL}${ENDPOINTS.PDF}`;
  let res;
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";

  try {
    res = await fetch(pdfEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPage: window.location.href,
        currentLanguage,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to generate PDF");
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    return;
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = PDF_FILE_NAME;
  a.click();
  URL.revokeObjectURL(url);
};
