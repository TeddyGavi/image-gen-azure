import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  const resFromDalle = await fetch("/api/genImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const text = await resFromDalle.text();

  return NextResponse.json(text);
}
