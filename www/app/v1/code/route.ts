import { code } from "@grida/code";
import { LICENSE_CE } from "@/license";
import type { CodeRequest, FigmaToVanillaResponse } from "@/types";
import assert from "assert";
import { FrameworkConfig, VanillaFrameworkConfig } from "@grida/builder-config";
import { type NextRequest, NextResponse } from "next/server";

type FigmaAccessTokenType = "fat" | "fpat";

export async function POST(req: NextRequest) {
  try {
    const figma_access_token: string | null = req.headers.get("x-figma-token");

    if (!figma_access_token) {
      return NextResponse.json({
        message: "No figma access token provided.",
      }, {
        status: 401,
      })
    }

    const figma_access_token_type: FigmaAccessTokenType =
      figma_access_token.startsWith("figd") ? "fpat" : "fat";

    const {
      figma: figmaInput,
      framework,
      plugins,
      raw,
    } = await req.json() as CodeRequest;

    assert(typeof figmaInput === "string", "`body.figma` must be a string");

    try {
      const coderes = await code({
        uri: figmaInput,
        framework: framework as FrameworkConfig,
        plugins,
        auth:
          figma_access_token_type === "fat"
            ? {
              accessToken: figma_access_token,
            }
            : {
              personalAccessToken: figma_access_token,
            },
      });

      const { src, figma, target } = coderes!;

      const response: FigmaToVanillaResponse = {
        figma: {
          file:
          {
            // null, // TODO:
            name: '',
            lastModified: '', // undefined,
            thumbnailUrl: '', // undefined,
            version: '' // undefined,
          },

          filekey: figma.filekey,
          entry: figma.node,
          node: target.figma,
          json: target.remote,
        },
        framework: framework as VanillaFrameworkConfig,
        src: null, // TODO:
        srcdoc: src!,
        srcmap: null, // TODO:
        files: {
          "index.html": src!,
        },
        thumbnail: undefined, // TODO:
        engine: {
          name: "code.grida.co/api/v1",
          version: "2023.1.1",
          license: "AGPL-3.0",
        },
        version: 0,
        license: LICENSE_CE,
        warnings: [],
      };

      if (raw) {
        // if debug option raw is set, return raw html
        return new NextResponse(src, {
          status: 200,
          headers: {
            "Content-Type": "text/html",
          },
        })
      } else {
        return NextResponse.json(response, { status: 200 })
      }
    } catch (e: any) {
      return NextResponse.json({
        message: e?.message,
        stacktrace: e?.stack,
      }, {
        status: 500,
      })

      throw e;
    }
  } catch (e: any) {
    return NextResponse.json({
      message: e?.message,
      stacktrace: e?.stack,
    }, {
      status: 500,
    })
  }
}
