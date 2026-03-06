# JetJams Backend – EC2 Deploy (Your Instance)

## Your EC2 details

| Item | Value |
|------|--------|
| **Public IP** | `16.171.134.222` |
| **Public DNS** | `ec2-16-171-134-222.eu-north-1.compute.amazonaws.com` |
| **Region** | eu-north-1 (Stockholm) |
| **OS** | Ubuntu 24.04 |
| **Key pair** | `jetjams` (you need the `.pem` file for this key) |
| **Instance** | Running |

---

## What you need before deploying

1. **SSH key file**  
   The key pair name is `jetjams`. You must have the **.pem** file that was downloaded when you created this key (e.g. `jetjams.pem`).  
   - If you lost it, you cannot SSH with this key. You’d need to add a new key pair or use another way to access the instance.

2. **Security group**  
   - **Port 22** (SSH) must be open for your IP (or 0.0.0.0/0 if you’re okay with that).  
   - Port for your Node app (e.g. **5000**) or **80/443** if you use Nginx in front.

3. **Backend code**  
   Either already cloned on the server, or you’ll clone it in the steps below.

---

## Step 1: SSH into the server

On your PC (PowerShell or CMD), use the path where you saved `jetjams.pem`:

```bash
ssh -i "C:\path\to\jetjams.pem" ubuntu@16.171.134.222
```

- Ubuntu AMI uses user **`ubuntu`** (not `ec2-user`).  
- If it says “key too open”, fix permissions (on Git Bash/WSL: `chmod 400 jetjams.pem`).

---

## Step 2: On the server – one-time setup (if not done yet)

```bash
# Node.js (Ubuntu 24)
sudo apt update
sudo apt install -y nodejs npm git

# Optional: use Node 18+ via NodeSource
# curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
# sudo apt install -y nodejs

# PM2 (to run app in background and restart on reboot)
sudo npm install -g pm2
```

---

## Step 3: Clone or update your backend code

**First time (clone):**

```bash
cd ~
git clone <your-backend-repo-url> jetjam-be-final
cd jetjam-be-final
```

**Already cloned (update):**

```bash
cd ~/jetjam-be-final
git pull origin main
```

(Use your real repo URL and branch name.)

---

## Step 4: Install dependencies and set .env

```bash
cd ~/jetjam-be-final
npm install
```

Create or edit `.env` in the project root (same as your local backend):

```bash
nano .env
```

Add/check:

- `PORT=5000`
- `DB_CONNECTION_STRING=mongodb+srv://...`
- `JWT_SECRET_KEY=...`
- `PAYPAL_CLIENT_ID=...`
- `PAYPAL_CLIENT_SECRET=...`
- `PAYPAL_API_URL=https://api-m.paypal.com`
- (any other vars your app needs)

Save: Ctrl+O, Enter, then Ctrl+X.

---

## Step 5: Start or restart the app with PM2

**First time:**

```bash
cd ~/jetjam-be-final
pm2 start app.js --name jetjam-api
pm2 save
pm2 startup
# Run the command it prints (sudo ...) so the app starts on reboot
```

**Later (after git pull / updates):**

```bash
cd ~/jetjam-be-final
npm install
pm2 restart jetjam-api
```

---

## Step 6: Check

```bash
pm2 status
pm2 logs jetjam-api
```

From your browser or Postman, hit your API (e.g. `https://api.jetjams.net/...`).  
If you’re not using a domain yet, test with: `http://16.171.134.222:5000` (only if port 5000 is open in the security group).

---

## Summary

| What | Status |
|------|--------|
| EC2 info (IP, DNS, key name) | Enough to deploy |
| You need | `jetjams.pem` file, security group (22 + app port), then follow steps above |

If you tell me whether the repo is already on the server and which port your app uses, I can give you the exact commands in one block (copy-paste).
