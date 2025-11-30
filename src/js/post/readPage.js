import { getPost } from "../api/post/read";
import { deletePost } from "../api/post/delete";
import { getAuth } from "../utilities/storage";

const postEl = document.getElementById("singlePost");
const postStatus = document.getElementById("postStatus");
const backBtn = document.getElementById("backToFeedBtn");

const auth = getAuth();
if (!auth?.accessToken) {
  window.location.href = "/auth/login/";
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  postStatus.textContent = "No post id provided.";
}


function renderPost(post) {
  const created = post.created
    ? new Date(post.created).toLocaleString()
    : "";

  const isOwner = post.author?.name === auth?.name;

  postEl.innerHTML = `
    <header class="post-card-header">
      <div>
        <h2 class="post-card-title">${post.title || "Untitled post"}</h2>
        <p class="post-card-meta">
          by <button class="profile-link" data-name="${post.author?.name || ""}">
            ${post.author?.name || "Unknown"}
          </button>
          ${created ? ` • ${created}` : ""}
        </p>
      </div>
      ${
        isOwner
          ? `<div class="post-actions">
                <button id="editPostBtn" class="btn ghost-small">Edit</button>
                <button id="deletePostBtn" class="btn ghost-small">Delete</button>
             </div>`
          : ""
      }
    </header>

    <p class="post-card-body">
      ${post.body || "No content."}
    </p>
  `;

  const profileLink = postEl.querySelector(".profile-link");
  profileLink?.addEventListener("click", () => {
    const name = profileLink.dataset.name;
    if (!name) return;
    window.location.href = `/profile/?name=${encodeURIComponent(name)}`;
  });

  if (isOwner) {
    const editBtn = document.getElementById("editPostBtn");
    const deleteBtn = document.getElementById("deletePostBtn");

    editBtn?.addEventListener("click", () => {
      window.location.href = `/post/edit/?id=${post.id}`;
    });

    deleteBtn?.addEventListener("click", async () => {
      const confirmed = window.confirm("Delete this post?");
      if (!confirmed) return;

      try {
        postStatus.textContent = "Deleting...";
        await deletePost(post.id);
        window.location.href = "/post/";
      } catch (error) {
        console.error(error);
        postStatus.textContent = error.message || "Could not delete post.";
      }
    });
  }
}

async function loadPost() {
  try {
    postStatus.textContent = "Loading post...";
    const post = await getPost(id);
    postStatus.textContent = "";
    renderPost(post);
  } catch (error) {
    console.error(error);
    postStatus.textContent = error.message || "Could not load post.";
  }
}

backBtn?.addEventListener("click", () => {
  window.location.href = "/post/";
});

if (id) {
  loadPost();
}
