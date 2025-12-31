const isProd = process.env.NODE_ENV === "production";

export const PROTOCOL = isProd ? "https://" : "http://";
export const API_BASE = "/api";

export const ENDPOINTS = {
  PROFILE: `${API_BASE}/profile`,
  PDF: `${
    isProd
      ? "pdf-generator-service-production-1736.up.railway.app"
      : "localhost:8000"
  }/generate-pdf`,
};
