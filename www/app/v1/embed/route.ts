import { Language } from "@grida/builder-platform-types";
import { code } from "@grida/code";
import { NextResponse, type NextRequest } from "next/server";

export default async function GET(req: NextRequest) {
  // get the access token from the query string
  const figma = req.nextUrl.searchParams.get("figma") as string;
  const fpat = req.nextUrl.searchParams.get("fpat") as string;
  const fat = req.nextUrl.searchParams.get("fat") as string;

  if (!figma) {
    return new NextResponse("<h1>No figma file url is provided</h1>", {
      status: 400,
    });
  }

  if (!fpat && !fat) {
    return new NextResponse("<h1>No figma access token is provided</h1>", {
      status: 400,
    });
  }

  try {
    const gen = await code({
      uri: figma as string,
      framework: {
        framework: "preview",
        imgage_alt: {},
        language: Language.html,
      },
      auth: {
        accessToken: fat as string,
        personalAccessToken: fpat as string,
      },
    });

    const { src } = gen!;

    return new NextResponse(src, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });

  } catch (e: any) {
    return new NextResponse(`<h1>${e?.message}</h1><pre>${e?.stack}</pre>`, {
      status: 500,
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
}
