export const fetchGenImages = async () => {
  const res = await fetch("/api/images", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return res.json();
};
