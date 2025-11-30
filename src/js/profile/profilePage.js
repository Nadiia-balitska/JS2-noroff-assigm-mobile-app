import { getProfile } from "../api/profile/read";
import { followProfile } from "../api/profile/follow";
import { unfollowProfile } from "../api/profile/unfollow";
import { getAuth } from "../utilities/storage";

const profileHeader = document.getElementById("profileHeader");
const profileStatus = document.getElementById("profileStatus");
const profilePosts = document.getElementById("profilePosts");
const backBtn = document.getElementById("backToFeedBtn");

const auth = getAuth();
if (!auth?.accessToken) {
  window.location.href = "/auth/login/";
}

const params = new URLSearchParams(window.location.search);
const urlName = params.get("name");
const profileName = urlName || auth.name;


function renderProfileHeader(profile) {
  const isMe = profile.name === auth.name;

  const followersCount = profile._count?.followers ?? 0;
  const followingCount = profile._count?.following ?? 0;
  const postsCount = profile._count?.posts ?? 0;

  const isFollowing = profile.followers?.some(
    (f) => f.name === auth.name
  );

  profileHeader.innerHTML = `
    <div class="profile-card">
      <div class="profile-main">
        <div class="profile-avatar">
          ${
            profile.avatar?.url
              ? `<img src="${profile.avatar.url}" alt="${profile.avatar.alt || profile.name}" />`
              : `<div class="profile-avatar-placeholder">${profile.name
                  .charAt(0)
                  .toUpperCase()}</div>`
          }
        </div>
        <div class="profile-info">
          <h1>${profile.name}</h1>
          <p class="profile-email">${profile.email}</p>
          <p class="profile-counts">
            <span>${followersCount} followers</span>
            <span>${followingCount} following</span>
            <span>${postsCount} posts</span>
          </p>
        </div>
        <div class="profile-actions">
          ${
            isMe
              ? `<span class="profile-badge">This is you 🫶</span>`
              : `<button id="followBtn" class="btn secondary">
                  ${isFollowing ? "Unfollow" : "Follow"}
                 </button>`
          }
        </div>
      </div>
    </div>
  `;

  if (!isMe) {
    const followBtn = document.getElementById("followBtn");
    followBtn?.addEventListener("click", async () => {
      try {
        profileStatus.textContent = isFollowing
          ? "Unfollowing..."
          : "Following...";
        if (isFollowing) {
          await unfollowProfile(profile.name);
        } else {
          await followProfile(profile.name);
        }
        await loadProfile();
      } catch (error) {
        console.error(error);
        profileStatus.textContent = error.message || "Failed to update follow.";
      }
    });
  }
}


function renderProfilePosts(profile) {
  const posts = profile.posts || [];
  profilePosts.innerHTML = "";

  if (!posts.length) {
    profilePosts.innerHTML =
      '<p class="feed-empty">This user has no posts yet.</p>';
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
            ${created ? created : ""}
          </p>
        </div>
      </header>
      <p class="post-card-body">
        ${post.body ? post.body.slice(0, 200) : "No content."}
        ${post.body && post.body.length > 200 ? "..." : ""}
      </p>
      <footer class="post-card-footer">
        <button class="btn ghost-small" data-id="${post.id}">
          View post
        </button>
      </footer>
    `;

    fragment.appendChild(card);
  });

  profilePosts.appendChild(fragment);

  profilePosts.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `/post/read/?id=${id}`;
    });
  });
}

async function loadProfile() {
  try {
    profileStatus.textContent = "Loading profile...";
    const profile = await getProfile(profileName);
    profileStatus.textContent = "";
    renderProfileHeader(profile);
    renderProfilePosts(profile);
  } catch (error) {
    console.error(error);
    profileStatus.textContent = error.message || "Could not load profile.";
  }
}

backBtn?.addEventListener("click", () => {
  window.location.href = "/post/index.html";
});

loadProfile();
