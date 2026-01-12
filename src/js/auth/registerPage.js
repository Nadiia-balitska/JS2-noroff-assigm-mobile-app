import { registerUser } from "../api/auth.js";

const form = document.getElementById("registerForm");
const errorEl = document.getElementById("registerError");
const successEl = document.getElementById("registerSuccess");

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = !msg;
  if (msg) successEl.hidden = true;
}

function showSuccess(msg) {
  successEl.textContent = msg;
  successEl.hidden = !msg;
  if (msg) errorEl.hidden = true;
}

function isNoroffStudentEmail(email) {
  return email.toLowerCase().endsWith("@stud.noroff.no");
}

function isValidUsername(name) {
  return /^[A-Za-z0-9_]+$/.test(name);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const avatarUrl = form.avatarUrl.value.trim();


  if (!isNoroffStudentEmail(email)) {
    return showError("Email should be like @stud.noroff.no");
  }

  if (password.length < 8) {
    return showError("Min 8 simbol");
  }

  try {
    showError("");
    const data = await registerUser({ name, email, password, avatarUrl });
    console.log("Registered user:", data);

    showSuccess("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "/auth/login/index.html";
    }, 800);
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
});
