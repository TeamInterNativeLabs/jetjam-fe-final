# www.jetjams.net – Vercel Custom Domain Setup

## 1. Vercel pe domain add karo

1. **Vercel Dashboard** → **InterNative Labs Pro** team → project **jetjam-fe-final** open karo.
2. **Settings** → **Domains**.
3. **Add** pe click karo.
4. Type karo: **www.jetjams.net** → **Add**.
5. (Optional) **jetjams.net** (bina www) bhi add karo taaki dono kaam karein.

---

## 2. DNS configure karo (jahan domain register hai)

Vercel **Domains** page pe add karne ke baad tumhe **DNS instructions** dikhenge (kya record add karna hai).

### www.jetjams.net ke liye (recommended)

Apne **domain registrar** (Namecheap, GoDaddy, Cloudflare, etc.) pe jao → **DNS** / **DNS Management**:

| Type  | Name/Host | Value / Target              |
|-------|-----------|-----------------------------|
| **CNAME** | **www**   | **cname.vercel-dns.com**    |

(Vercel agar koi aur target batae, e.g. `cname.vercel-dns.com`, to wahi use karo.)

### jetjams.net (apex, bina www) ke liye

Agar tum **jetjams.net** bhi use karna chahte ho (redirect www pe ho ya direct):

- Vercel **Domains** pe **jetjams.net** add karo.
- Vercel tumhe **A record** ya **ALIAS/ANAME** bataega. Usually:
  - **A** → **76.76.21.21** (Vercel ka IP)
  - Ya **CNAME** (flattening) → **cname.vercel-dns.com** (agar registrar support kare).

Save karo, thodi der (5–30 min, kabhi 48 hr) wait karo.

---

## 3. Vercel mein verify karo

- **Settings** → **Domains** → har domain ke saamne status dikhega.
- **Valid Configuration** / tick aane tak wait karo.
- Agar **Invalid** dikhe to Vercel wahi page pe bataega kya galat hai (wrong record, wrong target) – woh theek karo.

---

## 4. Redirect (optional)

Agar **jetjams.net** (bina www) ko **www.jetjams.net** pe bhejna ho:

- Vercel **Domains** pe **jetjams.net** add karo.
- Us domain ke **Edit** / options mein **Redirect to www.jetjams.net** select karo (agar option ho).

---

## Short checklist

| Step | Kya karo |
|------|----------|
| 1 | Vercel → Project → **Settings** → **Domains** → **Add** → **www.jetjams.net** |
| 2 | Domain registrar pe **CNAME** **www** → **cname.vercel-dns.com** |
| 3 | 5–30 min (ya zyada) wait → **Domains** pe status **Valid** check karo |
| 4 | Browser mein **https://www.jetjams.net** open karo |

---

**Note:** SSL (HTTPS) Vercel khud issue karta hai; DNS sahi hone ke baad https automatically chal jata hai.
