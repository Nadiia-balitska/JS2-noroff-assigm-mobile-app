import { API_KEY } from "./constants.js";

export function headers(token = null) {
  const h = new Headers();

  h.append("Content-Type", "application/json");

  if (API_KEY) {
    h.append("X-Noroff-API-Key", API_KEY);
  }

  if (token) {
    h.append("Authorization", `Bearer ${token}`);
  }

  return h;
}
