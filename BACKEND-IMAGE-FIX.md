# Backend: Images 404 – Cannot GET /uploads/images/...

## Problem

Frontend requests:
```
http://13.60.82.114:5000/uploads/images/Barbie%20Million%20Dollar%20Foot%20Fetish%203_1756920059177.jpg
```
Backend responds: **Cannot GET /uploads/images/...** (404).

So the **Node/Express app on EC2 is not serving the `/uploads` path**. Fix this in the **backend** repo (e.g. `jetjam-be-final`).

---

## Fix: Serve uploads folder as static files

You confirmed `./uploads` exists in `jetjam-be-final`. Add the following in your backend.

### Step 1 – In `app.js` (or `server.js`)

At the **top** with other requires, add (if not already there):

```js
const path = require('path');
```

### Step 2 – After `const app = express();` and **before** your API routes

Add this single line:

```js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

So the start of your file looks like:

```js
const express = require('express');
const path = require('path');   // add if missing
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // add this line

// ... then your other middleware and API routes (e.g. app.use('/jetjams/v1/api', ...))
```

- This makes `GET /uploads/images/xxx.jpg` serve files from the `uploads` folder.
- If your images are in a different folder (e.g. `public/uploads`), use:
  `path.join(__dirname, 'public', 'uploads')` instead of `path.join(__dirname, 'uploads')`.

---

## Check folder on EC2

1. SSH into EC2 and go to your backend directory:
   ```bash
   cd ~/jetjam-be-final
   ```
2. See where image files actually are:
   ```bash
   ls -la uploads/images/
   # or
   find . -name "*.jpg" | head -5
   ```
3. Use that folder in `express.static()` as above.

---

## Restart backend after change

```bash
pm2 restart jetjam-api
# or whatever your app name is
pm2 restart all
```

No frontend change is needed: the frontend already uses `VITE_APP_IMAGE_BASE_URL` (e.g. `http://13.60.82.114:5000`) and the API returns paths like `uploads/images/...`, so the full URL is correct once the backend serves `/uploads`.

---

## If you already have `app.use('/uploads', ...)` but still get 404

1. **Order:** Put the `/uploads` line **before** your API routes so static files are served first.
2. **On EC2:** Ensure the `uploads` folder (and `uploads/images/`) actually exists and contains the image files. If you only deploy code, uploads might be empty. Copy or sync your local `uploads` folder to the server, or ensure your upload flow saves files into `uploads/images/` on the server.
3. **Restart:** After any change, run `pm2 restart jetjam-api` (or your app name).
