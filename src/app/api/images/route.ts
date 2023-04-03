export async function GET(request: Request) {
  const res = await fetch("http://localhost:7071/api/getImages", {
    cache: "no-cache",
  });

  const blob = await res.blob();
  const text = await blob.text();

  const data = JSON.parse(text);

  return new Response(JSON.stringify(data), { status: 200 });
}
