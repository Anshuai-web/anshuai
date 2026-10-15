# AnshuAI (anshuai.in) — Website Deployment & Google Domains Guide

This guide explains how to host the AnshuAI corporate website and configure your domain **`anshuai.in`** (registered with Google Domains / Squarespace) with free SSL and global CDN delivery.

---

## 1. Local Preview

You can preview the website immediately on your computer:
* Double-click [`index.html`](./index.html) to open it directly in Safari, Chrome, or Edge.
* Or start a quick local server in terminal:
  ```bash
  # Using Python (if available):
  python3 -m http.server 8080 --directory /Users/deepakan/Desktop/AnshuAI/Webpage
  # Or with Node.js:
  npx serve /Users/deepakan/Desktop/AnshuAI/Webpage
  ```
  Then visit `http://localhost:8080`.

---

## 2. Recommended Hosting Options (100% Free, Automated SSL)

### Option A: GitHub Pages (Recommended for Developers)

1. Create a GitHub repository (e.g., `AnshuAI/anshuai-website`).
2. Push all files inside `Webpage/` to the `main` branch.
3. In GitHub: Navigate to **Settings** &rarr; **Pages**.
4. Under **Branch**, select `main` / `root` and click **Save**.
5. Under **Custom domain**, enter `anshuai.in` and click **Save** (the `CNAME` file is already included).
6. Check the box for **Enforce HTTPS**.

### Option B: Vercel or Cloudflare Pages (Instant Zero-CLI Deployment)

1. Go to [vercel.com](https://vercel.com) or [pages.cloudflare.com](https://pages.cloudflare.com).
2. Click **Add New Project** &rarr; Drag and drop the `Webpage` folder or connect your Git repo.
3. Click **Deploy**.
4. Go to **Settings** &rarr; **Domains** &rarr; Add `anshuai.in` and `www.anshuai.in`.

---

## 3. Configuring DNS in Google Domains / Squarespace

Log in to your Google Domains dashboard (or Squarespace Domains if migrated) &rarr; Select **`anshuai.in`** &rarr; Click **DNS** &rarr; **Custom Records**.

Add the following records:

### For GitHub Pages:

| Type | Host / Name | Value / Destination | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or blank) | `185.199.108.153` | 3600 |
| **A** | `@` (or blank) | `185.199.109.153` | 3600 |
| **A** | `@` (or blank) | `185.199.110.153` | 3600 |
| **A** | `@` (or blank) | `185.199.111.153` | 3600 |
| **CNAME** | `www` | `<your-github-username>.github.io` | 3600 |

### For Vercel:

| Type | Host / Name | Value / Destination | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or blank) | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

---

## 4. Setting Up Corporate Email (`Anshu@anshuai.in`)

To activate business email on Google Workspace (Gmail) for `anshuai.in`:
1. In Google Domains / Squarespace DNS, navigate to **Email** or **Custom Records**.
2. Add Google Workspace MX records:
   * **MX**: `1 ASPMX.L.GOOGLE.COM`
   * **MX**: `5 ALT1.ASPMX.L.GOOGLE.COM`
   * **MX**: `5 ALT2.ASPMX.L.GOOGLE.COM`
   * **MX**: `10 ALT3.ASPMX.L.GOOGLE.COM`
   * **MX**: `10 ALT4.ASPMX.L.GOOGLE.COM`
3. Add SPF TXT record:
   * **TXT**: `@` &rarr; `v=spf1 include:_spf.google.com ~all`

---

## 5. File Inventory

* [`index.html`](./index.html): Complete production-ready corporate landing page.
* [`styles.css`](./styles.css): Custom luxury styling, dark teal & champagne gold theme, glassmorphism.
* [`script.js`](./script.js): Tab switcher, dynamic ROI calculator, mobile menu, and contact form handling.
* [`favicon.png`](./favicon.png): 64x64 browser favicon.
* [`CNAME`](./CNAME): Domain binding file for `anshuai.in`.
* Brand imagery:
  * [`Gemini_Generated_Image_4aoph94aoph94aop.png`](./Gemini_Generated_Image_4aoph94aoph94aop.png): High-resolution kinetic brain emblem.
  * [`Gemini_Generated_Image_qkkzr9qkkzr9qkkz.png`](./Gemini_Generated_Image_qkkzr9qkkzr9qkkz.png): Hero graphics banner.
  * [`Gemini_Generated_Image_gigtergigtergigt.png`](./Gemini_Generated_Image_gigtergigtergigt.png): Neural circuit ambient background.
