export async function getClientSession() {
    const res = await fetch("/api/session", {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
  
    const data = await res.json();
    return data.session;
  }