export async function getClientSession() {
    const res = await fetch("/api/session", { credentials: "include" });
    if (!res.ok) return null;
  
    const data = await res.json();
    return data.session;
  }