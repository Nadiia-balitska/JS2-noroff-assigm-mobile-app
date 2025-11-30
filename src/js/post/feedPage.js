import { getAllPosts } from "../api/post/read.js";
import { getAuth, clearAuth } from "../utilities/storage.js";

const postsContainer = document.getElementById("postsContainer");
const feedStatus = document.getElementById("feedStatus");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");
const createPostBtn = document.getElementById("createPostBtn");
const profileBtn = document.getElementById("profileBtn");

let allPosts = [];

const auth = getAuth();
if (!auth?.accessToken) {
  window.location.href = "/auth/login/index.html";
}

function renderPosts(posts) {
  postsContainer.innerHTML = "";

  if (!posts.length) {
    postsContainer.innerHTML =
      '<p class="feed-empty">No posts found. Try another search.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "post-card";

    const created = post.created
      ? new Date(post.created).toLocaleString()
      : "";

    card.innerHTML = `
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
      </header>

      <p class="post-card-body">
        ${post.body ? post.body.slice(0, 200) : "No content."}
        ${post.body && post.body.length > 200 ? "..." : ""}
      </p>

      <footer class="post-card-footer">
        <button class="btn ghost-small" data-id="${post.id}">
          View details
        </button>
      </footer>
    `;

    fragment.appendChild(card);
  });

  postsContainer.appendChild(fragment);

  postsContainer.querySelectorAll("button.btn.ghost-small").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `/post/read/?id=${id}`;
    });
  });

  postsContainer.querySelectorAll("button.profile-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      if (!name) return;
      window.location.href = `/profile/?name=${encodeURIComponent(name)}`;
    });
  });
}

function showStatus(message) {
  feedStatus.textContent = message || "";
}

async function loadPosts() {
  showStatus("Loading posts...");
  try {
    const posts = await getAllPosts();
    allPosts = posts;
    showStatus("");
    renderPosts(allPosts);
  } catch (error) {
    console.error(error);
    showStatus(error.message || "Failed to load posts.");
  }
}

searchInput?.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase().trim();

  if (!value) {
    renderPosts(allPosts);
    return;
  }

  const filtered = allPosts.filter((post) => {
    const title = post.title?.toLowerCase() || "";
    const body = post.body?.toLowerCase() || "";
    return title.includes(value) || body.includes(value);
  });

  renderPosts(filtered);
});

logoutBtn?.addEventListener("click", () => {
  clearAuth();
  window.location.href = "/auth/login/index.html";
});

createPostBtn?.addEventListener("click", () => {
  window.location.href = "/post/create/index.html";
});

profileBtn?.addEventListener("click", () => {
  window.location.href = "/profile/index.html";
});


loadPosts();
