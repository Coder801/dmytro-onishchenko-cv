import { ENDPOINTS, PROTOCOL } from "@/config/api";

export const downloadPdf = async () => {
  const pdfEndpoint = `${PROTOCOL}${ENDPOINTS.PDF}`;
  let res;

  try {
    res = await fetch(pdfEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPage: window.location.href }),
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
  a.download = "profile.pdf";
  a.click();
  URL.revokeObjectURL(url);
};
