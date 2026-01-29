import { beforeEach, describe, expect, it, vi } from "vitest";

import { ENDPOINTS, PROTOCOL } from "@/config/api";
import { PDF_FILE_NAME } from "@/config/constants";

import { downloadPdf } from "../downloadPdf";

describe("downloadPdf", () => {
  const mockFetch = vi.fn();
  const mockCreateObjectURL = vi.fn();
  const mockRevokeObjectURL = vi.fn();
  const mockClick = vi.fn();
  const mockCreateElement = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock global fetch
    global.fetch = mockFetch;

    // Mock URL methods
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(),
      },
      writable: true,
    });

    // Mock window.location
    Object.defineProperty(window, "location", {
      value: {
        href: "https://example.com/page",
      },
      writable: true,
    });

    // Mock document.body.scrollHeight and scrollWidth
    Object.defineProperty(document.body, "scrollHeight", {
      value: 2000,
      writable: true,
    });
    Object.defineProperty(document.body, "scrollWidth", {
      value: 1000,
      writable: true,
    });

    // Mock document.getElementById for pdf-content
    vi.spyOn(document, "getElementById").mockImplementation((id: string) => {
      if (id === "pdf-content") {
        return { scrollWidth: 800 } as HTMLElement;
      }
      return null;
    });

    // Mock document.createElement
    const mockAnchor = {
      href: "",
      download: "",
      click: mockClick,
    };
    mockCreateElement.mockReturnValue(mockAnchor);
    document.createElement = mockCreateElement;

    mockCreateObjectURL.mockReturnValue("blob:mock-url");
  });

  it("should successfully download PDF with default language", async () => {
    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
    };
    mockFetch.mockResolvedValue(mockResponse);

    (window.localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      null
    );

    await downloadPdf();

    expect(mockFetch).toHaveBeenCalledWith(
      `${PROTOCOL}${ENDPOINTS.PDF}`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPage: "https://example.com/page",
          currentLanguage: "en",
          size: {
            width: 1000,
            height: 2000,
          },
        }),
      })
    );

    expect(mockResponse.blob).toHaveBeenCalled();
    expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(mockCreateElement).toHaveBeenCalledWith("a");
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
  });

  it("should use stored language from localStorage", async () => {
    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
    };
    mockFetch.mockResolvedValue(mockResponse);

    (window.localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      "fr"
    );

    await downloadPdf();

    expect(mockFetch).toHaveBeenCalledWith(
      `${PROTOCOL}${ENDPOINTS.PDF}`,
      expect.objectContaining({
        body: expect.stringContaining('"currentLanguage":"fr"'),
      })
    );
  });

  it("should call completed callback on success", async () => {
    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const completedCallback = vi.fn();

    await downloadPdf(completedCallback);

    expect(completedCallback).toHaveBeenCalled();
  });

  it("should call completed callback even on fetch failure", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const completedCallback = vi.fn();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await downloadPdf(completedCallback);

    expect(completedCallback).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error generating PDF:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("should handle non-ok response from server", async () => {
    const mockResponse = {
      ok: false,
    };
    mockFetch.mockResolvedValue(mockResponse);

    const completedCallback = vi.fn();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await downloadPdf(completedCallback);

    expect(completedCallback).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error generating PDF:",
      expect.objectContaining({ message: "Failed to generate PDF" })
    );
    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(mockClick).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should not proceed with download if fetch fails", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await downloadPdf();

    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(mockClick).not.toHaveBeenCalled();
    expect(mockRevokeObjectURL).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should set correct download filename", async () => {
    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const mockAnchor = {
      href: "",
      download: "",
      click: mockClick,
    };
    mockCreateElement.mockReturnValue(mockAnchor);

    await downloadPdf();

    expect(mockAnchor.download).toBe(PDF_FILE_NAME);
    expect(mockAnchor.href).toBe("blob:mock-url");
  });

  it("should use correct document scroll height", async () => {
    Object.defineProperty(document.body, "scrollHeight", {
      value: 5000,
      writable: true,
    });

    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await downloadPdf();

    expect(mockFetch).toHaveBeenCalledWith(
      `${PROTOCOL}${ENDPOINTS.PDF}`,
      expect.objectContaining({
        body: expect.stringContaining('"height":5000'),
      })
    );
  });

  it("should use pdf-content width + 32 when larger than body scrollWidth", async () => {
    vi.spyOn(document, "getElementById").mockImplementation((id: string) => {
      if (id === "pdf-content") {
        return { scrollWidth: 1500 } as HTMLElement;
      }
      return null;
    });

    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await downloadPdf();

    // pdf-content width (1500) + 32 = 1532 > body.scrollWidth (1000)
    expect(mockFetch).toHaveBeenCalledWith(
      `${PROTOCOL}${ENDPOINTS.PDF}`,
      expect.objectContaining({
        body: expect.stringContaining('"width":1532'),
      })
    );
  });

  it("should use body scrollWidth when pdf-content element is not found", async () => {
    vi.spyOn(document, "getElementById").mockReturnValue(null);

    Object.defineProperty(document.body, "scrollWidth", {
      value: 1200,
      writable: true,
    });

    const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await downloadPdf();

    // No pdf-content element, so width = max(0 + 32, 1200) = 1200
    expect(mockFetch).toHaveBeenCalledWith(
      `${PROTOCOL}${ENDPOINTS.PDF}`,
      expect.objectContaining({
        body: expect.stringContaining('"width":1200'),
      })
    );
  });
});
