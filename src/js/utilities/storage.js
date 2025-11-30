
const AUTH_KEY = "social_auth";

export function saveAuth(data) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export function getAuth() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse auth from storage", error);
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}
