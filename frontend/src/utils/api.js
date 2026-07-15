const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function handleResponse(res) {
  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (!res.ok) {
    const message = body?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.errors = body?.errors;
    throw error;
  }
  return body;
}

export async function submitInquiry(payload) {
  const res = await fetch(`${BASE_URL}/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function fetchInquiries(params = {}, adminKey = "") {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v !== undefined))
  ).toString();
  const res = await fetch(`${BASE_URL}/inquiry${query ? `?${query}` : ""}`, {
    headers: adminKey ? { "x-admin-key": adminKey } : {},
  });
  return handleResponse(res);
}

export async function deleteInquiry(id, adminKey = "") {
  const res = await fetch(`${BASE_URL}/inquiry/${id}`, {
    method: "DELETE",
    headers: adminKey ? { "x-admin-key": adminKey } : {},
  });
  return handleResponse(res);
}

export async function updateInquiryStatus(id, status, adminKey = "") {
  const res = await fetch(`${BASE_URL}/inquiry/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(adminKey ? { "x-admin-key": adminKey } : {}),
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}
