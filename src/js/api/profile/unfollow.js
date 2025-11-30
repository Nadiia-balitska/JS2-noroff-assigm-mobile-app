import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";
import { getAuth } from "../../utilities/storage.js";


export async function unfollowProfile(name) {
  const token = getAuth()?.accessToken;

  const response = await fetch(
    `${API_SOCIAL_PROFILES}/${encodeURIComponent(name)}/unfollow`,
    {
      method: "PUT",
      headers: headers(token),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.errors?.[0]?.message || "Could not unfollow profile."
    );
  }

  return result.data;
}
