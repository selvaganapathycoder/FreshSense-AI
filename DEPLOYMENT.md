# 🚀 Deployment Guide

This guide covers how to deploy the **Food Freshness Classifier** to popular free hosting platforms.

## Option 1: Vercel (Recommended)

Vercel is optimized for frontend apps and extremely easy to use.

1.  **Push your code to GitHub** (if you haven't already).
2.  Go to [Vercel.com](https://vercel.com) and sign up/login.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your `food-freshness-classifier` repository.
5.  **Configure Project**:
    *   **Framework Preset**: Vite (should detect automatically)
    *   **Root Directory**: `./`
    *   **Environment Variables**:
        *   Key: `VITE_HF_API_KEY`
        *   Value: `your_hugging_face_token_here` (If you want the Real AI to work online)
6.  Click **Deploy**.

🎉 Your app will be live at `https://your-project.vercel.app` in less than a minute.

---

## Option 2: Netlify

1.  Go to [Netlify.com](https://www.netlify.com/).
2.  Click **"Add new site"** -> **"Import an existing project"**.
3.  Connect to **GitHub** and select your repo.
4.  **Build Settings** (detected automatically):
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  **Environment Variables**:
    *   Click "Show advanced" or go to Site Settings later.
    *   Add `VITE_HF_API_KEY` and your token.
6.  Click **Deploy site**.

---

## ⚠️ Important Note on API Security

Since this is a client-side React app, your **API Key** is technically exposed to the user's browser if they inspect the network requests.
*   **For learning/demos**: This is usually acceptable (Hugging Face has free tier limits).
*   **For production**: You should ideally build a small backend (Node.js/Express) to hide the key, but that is out of scope for this frontend-focused demo.
