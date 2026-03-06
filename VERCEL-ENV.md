# Vercel Environment Variables (Live API + Images)

Live pe data fetch aur images ke liye **dono** projects (Frontend + Admin) mein env set karo.

---

## Frontend (www.jetjams.net)

1. **Vercel** → Frontend project → **Settings** → **Environment Variables**.
2. Add (Production + Preview dono pe rakh sakte ho):

| Name | Value | Notes |
|------|--------|--------|
| `VITE_APP_BASE_URL` | `http://13.60.82.114:5000/jetjams/v1/api` | Backend API base |
| `VITE_APP_IMAGE_BASE_URL` | `http://13.60.82.114:5000` | Images / uploads base (jahan backend static files serve karta hai) |
| `VITE_APP_IMAGE_PATH_PREFIX` | (optional) e.g. `uploads` | Agar backend sirf filename return kare (e.g. `thumb.jpg`) aur serve kare `BASE/uploads/thumb.jpg` to yahan `uploads` set karo |
| `VITE_PAYPAL_CLIENT_ID` | (PayPal client ID) | Agar payment use kar rahe ho |

3. **Save** → **Deployments** → latest deploy pe **Redeploy** (env change ke baad redeploy zaroori hai).

Code mein fallback hai: agar env set na ho to bhi `http://13.60.82.114:5000` use hota hai, lekin production pe env set karna behtar hai.

---

## Admin (admin.jetjams.net)

1. **Vercel** → Admin project → **Settings** → **Environment Variables**.
2. Add:

| Name | Value | Notes |
|------|--------|--------|
| `REACT_APP_BASE_URL` | `http://13.60.82.114:5000/jetjams/v1/api` | Backend API |
| `REACT_APP_IMAGE_ENDPOINT` | `http://13.60.82.114:5000` | Images |
| `REACT_APP_SITE_URL` | `https://www.jetjams.net` | Frontend site (e.g. emails/links) |

3. **Save** → **Redeploy**.

---

## Agar images / thumbnails ab bhi broken hon

- **Browser DevTools → Network:** Image request ka exact URL dekho. Agar 404 aaye to backend pe check karo: images kis path pe serve ho rahi hain (e.g. `/uploads/...` ya `/jetjams/v1/api/...`). Us hisaab se `VITE_APP_IMAGE_BASE_URL` set karo (e.g. `http://13.60.82.114:5000` ya `http://13.60.82.114:5000/jetjams/v1/api`).
- Agar API **sirf filename** return kare (e.g. `image.jpg`) aur backend serve kare `http://host/uploads/image.jpg`, to env mein `VITE_APP_IMAGE_PATH_PREFIX=uploads` add karke redeploy karo.
- **Mixed content:** Agar site HTTPS (Vercel) pe hai aur images HTTP URL se load ho rahi hon to kuch browsers block karte hain. Backend pe HTTPS (e.g. Nginx + SSL) use karo ya proxy through same origin.

## Quick check

- **Frontend:** Home page kholo → albums/images load honi chahiye; network tab mein API calls `13.60.82.114:5000` ki taraf jaa rahi hon.
- **Admin:** Login try karo; agar CORS/network error aaye to backend (EC2) pe CORS mein `https://admin.jetjams.net` allow hai na check karo.
