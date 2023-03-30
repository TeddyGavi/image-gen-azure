export async function GET(request: Request) {
  const suggest = await fetch("...", {
    cache: "no-store",
  });

  const text = await suggest.text();

  return new Response(JSON.stringify(text), { status: 200 });
}
