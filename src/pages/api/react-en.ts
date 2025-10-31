import { NextResponse } from "next/server";
import { FetchCVDataType, fetchCVData } from "@/server/routes/fetchCVData";

export default async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lang = (searchParams.get("lang") ?? "en") as FetchCVDataType["lang"];
  const type = (searchParams.get("type") ?? "react") as FetchCVDataType["type"];

  const data = await fetchCVData({ lang, type });

  return NextResponse.json({
    message: "Success",
    data: data,
  });
}
