import { ENDPOINTS } from "@/config/api";

export const downloadPdf = async () => {
  const res = await fetch(ENDPOINTS.PDF, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPage: window.location.href }),
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "profile.pdf";
  a.click();
  URL.revokeObjectURL(url);
};
