export const fetchGenImage = async () => {
  const res = await fetch("/api/genImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return res.json();
};
