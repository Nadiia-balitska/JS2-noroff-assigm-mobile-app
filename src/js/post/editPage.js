import { getPost } from "../api/post/read.js";
import { updatePost } from "../api/post/update.js";
import { getAuth } from "../utilities/storage.js";

const form = document.getElementById("editPostForm");
const errorEl = document.getElementById("editPostError");
const successEl = document.getElementById("editPostSuccess");
const cancelBtn = document.getElementById("cancelBtn");

const auth = getAuth();
if (!auth?.accessToken) {
  window.location.href = "/auth/login/index.html";
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
if (!id) {
  errorEl.textContent = "No post id provided.";
  errorEl.hidden = false;
}


async function loadPost() {
  try {
    const post = await getPost(id);

    if (post.author?.name !== auth.name) {
      errorEl.textContent = "You can only edit your own posts.";
      errorEl.hidden = false;
      form.querySelector("button[type='submit']").disabled = true;
      return;
    }

    form.title.value = post.title || "";
    form.body.value = post.body || "";
    form.media.value = post.media || "";
  } catch (error) {
    console.error(error);
    errorEl.textContent = error.message || "Could not load post.";
    errorEl.hidden = false;
  }
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
    await updatePost(id, payload);
    showSuccess("Post updated! Redirecting...");
    setTimeout(() => {
      window.location.href = `/post/read/?id=${id}`;
    }, 800);
  } catch (error) {
    console.error(error);
    showError(error.message || "Could not update post.");
  }
});

cancelBtn?.addEventListener("click", () => {
  window.location.href = `/post/read/?id=${id}`;
});

if (id) {
  loadPost();
}
