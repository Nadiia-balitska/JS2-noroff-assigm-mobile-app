import { createPost } from "../api/post/create.js";
import { getAuth } from "../utilities/storage.js";

const form = document.getElementById("createPostForm");
const errorEl = document.getElementById("createPostError");
const successEl = document.getElementById("createPostSuccess");
const cancelBtn = document.getElementById("cancelBtn");

if (!getAuth()?.accessToken) {
  window.location.href = "/auth/login/index.html";
}

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = form.title.value.trim();
  const body = form.body.value.trim();
  const media = form.media.value.trim();

  if (!title) {
    return showError("Title is required.");
  }

  const payload = { title };
  if (body) payload.body = body;
  if (media) payload.media = media;

  try {
    showError("");
    const post = await createPost(payload);
    showSuccess("Post created! Redirecting to post...");
    setTimeout(() => {
      window.location.href = `/post/read/?id=${post.id}`;
    }, 800);
  } catch (error) {
    console.error(error);
    showError(error.message || "Could not create post.");
  }
});

cancelBtn?.addEventListener("click", () => {
  window.location.href = "/post/";
});
