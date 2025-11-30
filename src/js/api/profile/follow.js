import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
import { getAuth } from "../../utilities/storage.js";


export async function followProfile(name) {
  const token = getAuth()?.accessToken;

  const response = await fetch(
    `${API_SOCIAL_PROFILES}/${encodeURIComponent(name)}/follow`,
    {
      method: "PUT",
      headers: headers(token),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Could not follow profile.");
  }

  return result.data;
}
