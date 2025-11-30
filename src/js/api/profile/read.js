import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
import { getAuth } from "../../utilities/storage.js";


export async function getProfile(name) {
  const token = getAuth()?.accessToken;

  const response = await fetch(
    `${API_SOCIAL_PROFILES}/${encodeURIComponent(
      name
    )}?_posts=true&_followers=true&_following=true`,
    {
      headers: headers(token),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Could not load profile.");
  }

  return result.data;
}
