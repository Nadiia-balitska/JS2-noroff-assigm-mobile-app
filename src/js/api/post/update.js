import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";
import { getAuth } from "../../utilities/storage";


export async function updatePost(id, data) {
  const token = getAuth()?.accessToken;

  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Could not update post.");
  }

  return result.data;
}
