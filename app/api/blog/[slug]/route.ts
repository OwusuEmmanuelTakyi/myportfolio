import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const runtime = "nodejs";

type Action = "view" | "like" | "unlike";

async function readStats(slug: string) {
  const [views, likes] = await Promise.all([
    kv.get<number>(`post:${slug}:views`),
    kv.get<number>(`post:${slug}:likes`),
  ]);
  return { views: views ?? 0, likes: likes ?? 0 };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const stats = await readStats(slug);
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ views: 0, likes: 0 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { action } = (await req.json()) as { action: Action };

  try {
    if (action === "view") {
      const views = await kv.incr(`post:${slug}:views`);
      return NextResponse.json({ views });
    }
    if (action === "like") {
      const likes = await kv.incr(`post:${slug}:likes`);
      return NextResponse.json({ likes });
    }
    if (action === "unlike") {
      const likes = await kv.decr(`post:${slug}:likes`);
      return NextResponse.json({ likes: Math.max(0, likes) });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json(await readStats(slug).catch(() => ({ views: 0, likes: 0 })));
  }
}
