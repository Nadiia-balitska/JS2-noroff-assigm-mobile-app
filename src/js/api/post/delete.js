import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { getAuth } from "../../utilities/storage.js";


export async function deletePost(id) {
  const token = getAuth()?.accessToken;

  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: "DELETE",
    headers: headers(token),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.errors?.[0]?.message || "Could not delete post.");
  }

  return true;
}
