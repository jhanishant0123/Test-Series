# BIJZLI Test Series - put it on GitHub and deploy it

You do not need to install anything or write code. Follow one of the two routes below.

---

## Route A - Fastest (Netlify Drop, no GitHub)

1. Open <https://app.netlify.com/drop>.
2. Drag the `dist` folder from this project onto the page.
3. Netlify gives you a live link in a few seconds.

Use this when you only want the site online quickly. You will repeat the drag after every change.

---

## Route B - GitHub, then deploy on Netlify (recommended)

This gives you one permanent home for the files, and Netlify updates the live site automatically whenever the files change.

### 1. Make a GitHub account

1. Go to <https://github.com> and click **Sign up**.
2. Finish the sign-up and verify your email.

### 2. Create a new repository

1. Click the **+** button (top right) and choose **New repository**.
2. Repository name: `bijzli-test-series` (or any name you like).
3. Choose **Public**.
4. Do **not** tick "Add a README file".
5. Click **Create repository**.

### 3. Upload the files

1. On the new repository page, click **uploading an existing file** (or **Add file > Upload files**).
2. Open this `app` folder on your computer.
3. Select everything inside it - `src`, `dist`, `build.mjs`, `package.json`, `package-lock.json`, `netlify.toml`, `.gitignore`, and this `README.md` - and drag it into the browser.
   - Upload the **contents** of the `app` folder, not the `app` folder itself.
   - If you cannot see `.gitignore`, that is fine; the site still works without it.
4. Click **Commit changes**.

### 4. Connect GitHub to Netlify

1. Go to <https://app.netlify.com> and sign in (GitHub login is easiest).
2. Click **Add new site** > **Import an existing project**.
3. Choose **GitHub**, click **Authorize Netlify**, and pick the `bijzli-test-series` repository.
4. Netlify reads `netlify.toml` automatically, so the settings should already be:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: leave empty (only fill in `app` if you uploaded the `app` folder itself)
5. Click **Deploy site**.

### 5. Get your link

Netlify shows a random address such as `https://sunny-cat-123456.netlify.app`. That is your live site. You can rename it under **Site configuration > Change site name**, or connect your own domain there.

### 6. Future updates

- Edit or replace the files in GitHub (or upload new ones with **Add file > Upload files**).
- Click **Commit changes**.
- Netlify rebuilds and publishes the site by itself in about a minute.

---

## If something goes wrong

- **"Page not found" after deploy:** Netlify's publish directory is wrong. Set it to `dist`.
- **Repository has an `app` folder inside it:** set Netlify's **Base directory** to `app`.
- **Blank page:** make sure `index.html` sits at the top of `dist`, not inside another folder.

## Files in this folder

- `src/` - editable source files.
- `dist/` - the ready-to-publish website.
- `build.mjs` - copies `src/` to `dist/` (`npm run build`).
- `netlify.toml` - tells Netlify how to build and publish.
- `.gitignore` - keeps junk files out of GitHub.
