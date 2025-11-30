# Social Media Client – JS2 Noroff Assignment

This project is a front-end client for the Noroff Social Media API, built as part of the JavaScript 2 course.  
Users can register, log in, view a feed of posts, create their own posts, edit and delete them, view profiles and follow/unfollow other users.

> **Note:** The application uses the Noroff API v2 and requires a valid API key and a registered `@stud.noroff.no` account.

---

## 🔗 Live demo

- Deployed on: **Vercel and  GitHub Pages**  
- URL: `https://your-project-url-here.vercel.app/`  



---

## ✅ Features (User Stories)

The following user stories from the assignment are implemented:

### Authentication
- **Register new user**  
  - `auth/register/`  
  - Users can create an account using a `@stud.noroff.no` email.
- **Login user**  
  - `auth/login/`  
  - Registered users can log in and receive an `accessToken` which is stored in `localStorage`.

### Posts
- **Get all posts**  
  - `post/` (Feed page)  
  - Displays a list of all posts, including author, created date and content.

- **Search posts**  
  - On the feed page, the search bar filters posts by title and body (client-side search).

- **Get post (single)**  
  - `post/read/?id=:id`  
  - Opens a single post with full content.  
  - If the user is the owner, they see **Edit** and **Delete** buttons.

- **Create post**  
  - `post/create/`  
  - Authenticated users can create a new post with:
    - title (required)
    - body (optional)
    - media URL (optional)

- **Edit post**  
  - `post/edit/?id=:id`  
  - A user can edit only their own posts (title, body, media).

- **Delete post**  
  - From the single post page (`post/read/?id=:id`)  
  - A user can delete only their own posts (confirmation dialog shown).

### Profiles
- **View my own profile**  
  - `profile/` with no query params  
  - Automatically loads the profile of the currently logged in user (`auth.name`).

- **Get posts of a user**  
  - `profile/?name=:name`  
  - Shows the selected user's avatar, email, follower/following counts and a list of their posts.

- **Follow / Unfollow user**  
  - On `profile/?name=:name`  
  - If the profile does not belong to the logged in user:
    - A **Follow / Unfollow** button is shown.
    - Follower/following counts update after action.

---

## 🧱 Tech stack

- **HTML5 + CSS3**
- **Vanilla JavaScript (ES6 modules)**
- Noroff **Social Media API v2**
- Noroff **Auth API** for registration and login
- LocalStorage for storing auth state (`accessToken`, `name`, `email`)

---

## 📁 Project structure

Simplified structure of the project:

```text
auth/
  login/index.html       # Login page
  register/index.html    # Register page

post/
  index.html             # Feed (all posts + search)
  read/index.html        # Single post
  create/index.html      # Create new post
  edit/index.html        # Edit existing post

profile/
  index.html             # Profile (my profile / other user)

src/
  css/
    _reset.css           # (optional) reset
    base.css             # global variables, buttons, header
    auth.css             # login/register/create/edit forms
    feed.css             # feed and post card layout
    profile.css          # profile page styles
    style.css            # imports all other CSS

  js/
    api/
      constants.js       # API base URLs & endpoints
      headers.js         # common headers + API key + Authorization
      auth.js            # registerUser, loginUser
      post/
        read.js          # getAllPosts, getPost
        create.js        # createPost
        update.js        # updatePost
        delete.js        # deletePost
      profile/
        read.js          # getProfile
        follow.js        # followProfile
        unfollow.js      # unfollowProfile

    auth/
      loginPage.js       # logic for login form
      registerPage.js    # logic for registration form

    post/
      feedPage.js        # feed page (list + search)
      readPage.js        # single post view + delete + go to edit
      createPage.js      # create post form
      editPage.js        # edit post form

    profile/
      profilePage.js     # profile view, posts of user, follow/unfollow

    utilities/
      storage.js         # saveAuth, getAuth, clearAuth
