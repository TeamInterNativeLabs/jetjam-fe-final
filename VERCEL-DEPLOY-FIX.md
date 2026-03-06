# Frontend / Admin live nahi hua – kya karein (Vercel)

Code push ke baad agar site update nahi hui to neeche step-by-step check karein.

---

## 1. Vercel Dashboard check karo

1. **https://vercel.com** par login karo.
2. **Frontend project** (user site) open karo → **Deployments** tab.
3. Dekho:
   - **Naya deployment dikh raha hai?** (abhi push ke baad wala)
     - **Haan, aur status "Building" / "Ready":** Thodi der wait karo; "Ready" hone ke baad site update ho jati hai. "Visit" click karke check karo.
     - **Haan, lekin status "Error" / "Failed":** Build fail hua. Step 2 pe jao (logs dekho).
   - **Naya deployment hi nahi bana:**
     - Auto-deploy trigger nahi hua. Step 3 (manual deploy) pe jao.

---

## 2. Build fail hua ho to (status Error/Failed)

1. **Deployments** → us failed deployment pe click karo.
2. **"Building"** / **"Logs"** section open karo.
3. Error message neeche dikhega (e.g. `npm install` fail, `npm run build` error, missing env var).
4. **Frontend (Vite)** ke liye aam errors:
   - `VITE_APP_BASE_URL is undefined` → Project → **Settings** → **Environment Variables** mein add karo.
   - `Module not found` / dependency error → locally `npm run build` chala ke dekho; agar yahan chal jaye to Vercel pe "Redeploy" try karo (same commit).
5. **Admin (Webpack)** ke liye: same idea – build logs mein jo error hai woh fix karo, phir redeploy.

---

## 3. Manual deploy (auto-deploy nahi hua to)

1. Vercel → **Frontend project** → **Deployments** tab.
2. **"Redeploy"** button (ya top right **"Deploy"** / **"Redeploy"**) pe click karo.
3. **"Redeploy"** confirm karo – latest commit se naya build start hoga.
4. **Admin** ke liye bhi same: Admin project → Deployments → **Redeploy**.

Agar **Git branch** galat set ho to:
- **Settings** → **Git** → **Production Branch** (e.g. `main` ya `master`) sahi hai na check karo. Jo branch pe aap push karte ho wahi yahan honi chahiye.

---

## 4. Repo connected hi nahi ho to

Agar project pehle se "import" kiya hua nahi hai:

1. Vercel Dashboard → **Add New** → **Project**.
2. GitHub/GitLab/Bitbucket se **repo select** karo (frontend wala).
3. **Configure:**
   - **Framework Preset:** Vite (frontend) / Other (admin).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** (blank agar project root pe hi hai).
4. **Environment Variables** add karo (VITE_APP_BASE_URL, VITE_APP_IMAGE_BASE_URL, VITE_PAYPAL_CLIENT_ID).
5. **Deploy** click karo.

Admin ke liye alag project banao, same tarah; Output Directory phir bhi `dist` (webpack).

---

## 5. Cache / purana deploy dikh raha ho

- **Redeploy** karte waqt **"Redeploy with existing Build Cache"** unchecked karke try karo (clean build).
- Phir **Visit** se live URL khol ke check karo (hard refresh: Ctrl+Shift+R).

---

## Short checklist

| Problem | Solution |
|--------|----------|
| Deployments mein koi naya deploy nahi | Manual **Redeploy** chalao; Git repo connected + Production Branch sahi ho |
| Deploy "Failed" | Build **Logs** dekho, error fix karo, phir **Redeploy** |
| Repo connect hi nahi | **Add New → Project** se repo connect karo, Build/Output set karo, env vars add karo |
| Build pass ho gaya lekin site purani | **Visit** se URL kholo, hard refresh (Ctrl+Shift+R); CDN 1–2 min le sakta hai |

Frontend aur Admin dono ke liye same steps: **Deployments** dekho → agar fail hai to **Logs** → fix → **Redeploy**. Agar koi specific error message dikhe to woh bhejo, uske hisaab se exact bata sakte hain.
