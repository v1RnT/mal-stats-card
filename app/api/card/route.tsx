import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import { fetchUserStats } from "@/src/api/api";
import { StatsCard } from "@/src/components/StatsCard";
import { LayoutType } from "@/src/types/LayoutType";
import { LAYOUT_CONFIG } from "@/src/lib/layout-config";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const username = searchParams.get("user");
    const type = searchParams.get("type") === "manga" ? "manga" : "anime";
    const theme = searchParams.get("theme") === "light" ? "light" : "dark";

    const rawLayout = searchParams.get("layout");
    const layout: LayoutType =
      rawLayout === "mini" || rawLayout === "line" ? rawLayout : "full";

    const config = LAYOUT_CONFIG[layout];

    const widthParam = parseInt(
      searchParams.get("width") || String(config.defaultW)
    );
    const heightParam = parseInt(
      searchParams.get("height") || String(config.defaultH)
    );

    const width = Math.min(Math.max(widthParam, config.minW), 1200);
    const height = Math.min(Math.max(heightParam, config.minH), 1200);

    if (!username) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing "user" parameter' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const fontUrl =
      "https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.8/files/roboto-latin-400-normal.woff";
    const fontPromise = fetch(fontUrl).then(async (res) => {
      if (!res.ok) throw new Error(`Failed to load font: ${res.status}`);
      return res.arrayBuffer();
    });

    const statsPromise = fetchUserStats(username, type);

    const [fontData, stats] = await Promise.all([fontPromise, statsPromise]);

    const svg = await satori(
      <StatsCard
        username={username}
        type={type}
        stats={stats}
        theme={theme}
        layout={layout}
      />,
      {
        width,
        height,
        fonts: [
          {
            name: "Verdana",
            data: fontData,
            weight: 400,
            style: "normal",
          },
        ],
      }
    );

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=600, s-maxage=600",
      },
    });
  } catch (e: unknown) {
    console.error(e);
    const errorMessage =
      e instanceof Error ? e.message : "Unknown internal error";
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
