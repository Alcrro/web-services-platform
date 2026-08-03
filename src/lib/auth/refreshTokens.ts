"use client"; // optional, ensures it runs in browser

export const refreshAccessToken = async (): Promise<string> => {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include", // important to send cookies
  });

  if (!res.ok) throw new Error("Failed to refresh token");

  const data = await res.json();
  return data.token; // attach to headers for current request
};
