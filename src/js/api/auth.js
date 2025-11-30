import {
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
} from "./constants";
import { headers } from "./headers";


export async function registerUser({ name, email, password, avatarUrl }) {
  const body = {
    name,
    email,
    password,
  };

  if (avatarUrl) {
    body.avatar = {
      url: avatarUrl,
      alt: `${name}'s avatar`,
    };
  }

  const response = await fetch(API_AUTH_REGISTER, {
    method: "POST",
    headers: headers(), 
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      result?.errors?.[0]?.message || "Registration failed. Please try again.";
    throw new Error(message);
  }

  return result.data;
}


export async function loginUser({ email, password }) {
  const response = await fetch(API_AUTH_LOGIN, {
    method: "POST",
    headers: headers(), 
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      result?.errors?.[0]?.message || "Login failed. Please check your details.";
    throw new Error(message);
  }

  return result.data;
}
