import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { getAuth } from "../../utilities/storage.js";

function authHeaders() {
  const token = getAuth()?.accessToken;
  return headers(token);
}


export async function getAllPosts() {
  const response = await fetch(
    `${API_SOCIAL_POSTS}?_author=true&_comments=true&_reactions=true`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Could not load posts.");
  }

  return result.data;
}


export async function getPost(id) {
  const response = await fetch(
    `${API_SOCIAL_POSTS}/${id}?_author=true&_comments=true&_reactions=true`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Could not load post.");
  }

  return result.data;
}
