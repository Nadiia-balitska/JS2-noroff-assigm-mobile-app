import { loginUser } from "../api/auth.js";
import { saveAuth } from "../utilities/storage.js";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("loginError");

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = !msg;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    return showError("Please fill in both email and password.");
  }

  try {
    showError("");
    const data = await loginUser({ email, password });

    saveAuth({
      name: data.name,
      email: data.email,
      accessToken: data.accessToken,
    });

    window.location.href = "/post/";
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
});
