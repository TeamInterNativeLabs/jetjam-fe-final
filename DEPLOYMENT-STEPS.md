# JetJams – Deploy Steps (Vercel + AWS)

- **Frontend (user site)** → Vercel  
- **Admin panel** → Vercel  
- **Backend (API)** → AWS  

---

## 1. FRONTEND (Vercel par already deployed)

### Code push karna kaafi hai

1. **Git mein latest changes commit + push karo**
   ```bash
   cd d:\jetjam-fe-final
   git add .
   git commit -m "Latest changes"
   git push origin main
   ```
   (Branch name alag ho to `main` ki jagah woh use karo, e.g. `master`.)

2. **Vercel automatically naya deploy start karega** (agar repo connected hai).  
   - Vercel Dashboard → Project (frontend) → Deployments pe check karo.  
   - Naya deployment complete hone ke baad live site update ho jati hai.

### Ek baar check kar lo (pehle se set nahi hai to)

- **Environment variables:**  
  Vercel → Project → Settings → Environment Variables  
  - `VITE_APP_BASE_URL` = `https://api.jetjams.net/jetjams/v1/api`  
  - `VITE_APP_IMAGE_BASE_URL` = `https://api.jetjams.net`  
  - `VITE_PAYPAL_CLIENT_ID` = (live PayPal client ID)  
- **Build settings:**  
  - Build Command: `npm run build`  
  - Output Directory: `dist`  
  - Install Command: `npm install` (default)

Agar env pehle se sahi hain to **sirf code push = deploy**.

---

## 2. ADMIN PANEL (Vercel par already deployed)

### Code push karna kaafi hai

1. **Admin repo mein push karo**
   ```bash
   cd D:\jetjam-admin-final
   git add .
   git commit -m "Latest admin changes"
   git push origin main
   ```

2. **Vercel auto-deploy karega** (admin wala project).  
   Deployments tab se dekh sakte ho.

### Ek baar check (pehle se nahi kiya to)

- **Environment variables (Vercel → Admin project → Settings → Environment Variables):**  
  - `REACT_APP_BASE_URL` = `https://api.jetjams.net/jetjams/v1/api`  
  - `REACT_APP_IMAGE_ENDPOINT` = `https://api.jetjams.net/`  
  - (Optional) `REACT_APP_SITE_URL` = `https://jetjams.net` (package share link ke liye)
- **Build settings:**  
  - Build Command: `npm run build`  
  - Output Directory: `dist`

**Summary:** Admin ke liye bhi **code push = deploy** (env pehle se sahi hon to).

---

## 3. BACKEND (AWS EC2 par)

Yahan **sirf code push enough nahi** – EC2 par code update karke **process restart** zaroori hai.

### EC2 par deploy – step by step

1. **EC2 par SSH karo**
   - **Windows:** PowerShell / CMD se (key path apna use karo):
     ```bash
     ssh -i "C:\path\to\your-key.pem" ec2-user@<EC2-Public-IP>
     ```
   - **Linux/Mac:**
     ```bash
     ssh -i ~/path/to/your-key.pem ec2-user@<EC2-Public-IP>
     ```
   - User name EC2 AMI pe depend karta hai: Amazon Linux → `ec2-user`, Ubuntu → `ubuntu`. Public IP AWS Console → EC2 → Instances se milti hai.

2. **Project folder mein jao**  
   (Path wohi use karo jahan pehle clone kiya tha, e.g. `~/jetjam-be-final` ya `/home/ec2-user/jetjam-be-final`.)
   ```bash
   cd ~/jetjam-be-final
   # ya
   cd /home/ec2-user/jetjam-be-final
   ```

3. **Latest code kheecho**
   ```bash
   git pull origin main
   ```
   (Agar branch alag hai to `main` ki jagah woh branch.)

4. **Dependencies install (agar package.json ya dependencies change ki hon)**
   ```bash
   npm install
   ```

5. **.env check**  
   Server par project root mein `.env` honi chahiye (PORT, DB_CONNECTION_STRING, JWT_SECRET_KEY, PAYPAL_*, etc.). Naya variable add kiya ho to `nano .env` se add karo.

6. **App restart (zaroori)**
   - **Agar PM2 use karte ho:**
     ```bash
     pm2 restart all
     # ya specific name ho to:
     pm2 restart jetjam-api
     ```
   - **Agar PM2 nahi use karte:** pehle purani node process band karo, phir:
     ```bash
     nohup node app.js > app.log 2>&1 &
     ```
   - **Agar systemd service bana rakhi ho:**
     ```bash
     sudo systemctl restart jetjam-api
     ```

7. **Check**  
   - `pm2 status` ya `pm2 logs` (PM2 ho to)  
   - Browser/Postman se: `https://api.jetjams.net/...` hit karke dekho.

### EC2 pe pehli baar setup (agar abhi tak nahi kiya)

- Node.js install: `sudo yum install nodejs npm -y` (Amazon Linux) ya `sudo apt install nodejs npm -y` (Ubuntu).  
- Project clone: `git clone <repo-url> jetjam-be-final`  
- `.env` banao, `npm install`, phir process manager use karo (recommended: PM2):
  ```bash
  sudo npm install -g pm2
  pm2 start app.js --name jetjam-api
  pm2 save
  pm2 startup
  ```
- Security group mein woh port open ho (e.g. 5000) jo app use karti hai; public URL ke liye Nginx reverse proxy + SSL (Let’s Encrypt) use karte ho to 80/443 open karo.

### Summary – Backend (EC2)

| Step | Kya karna hai |
|------|----------------|
| 1 | Latest code AWS server par (git pull / upload) |
| 2 | `npm install` (agar package.json ya dependencies change ki hon) |
| 3 | `.env` sahi ho |
| 4 | **App restart** (PM2 / systemctl / node) – zaroori |

---

## Quick checklist – har deploy par

| Kaunsa | Kya karna hai |
|--------|----------------|
| **Frontend** | `git push` → Vercel auto-deploy (env pehle set ho to kuch aur nahi) |
| **Admin** | `git push` → Vercel auto-deploy (env pehle set ho to kuch aur nahi) |
| **Backend (AWS)** | Server par `git pull` → `npm install` (agar zarurat ho) → **restart** (PM2 / service) |

---

## Agar deploy ke baad issue aaye

- **Frontend/Admin (Vercel):** Deployments → latest deploy → Logs / Build logs dekho. 404 / wrong API → env vars check karo (sahi base URL).
- **Backend (AWS):**  
  - `pm2 logs` ya `journalctl -u jetjam-api -f`  
  - PORT, DB connection, PAYPAL env vars check karo.

Agar batao AWS par backend **kaise** run karte ho (PM2 / Docker / Elastic Beanstalk / Lambda), to usi ke hisaab se exact commands de sakta hoon.
