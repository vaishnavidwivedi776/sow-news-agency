# SOW News Portal

A React + Vite implementation based on the supplied SOW for a bilingual Hindi/English digital news portal.

## Run locally

1. Open this folder in VS Code.
2. Open the VS Code terminal.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL shown by Vite (normally `http://localhost:5173`).

## Included

- Responsive editorial homepage
- Hindi / English switch
- Breaking news bar
- Latest, featured, category and popular stories
- Article detail pages
- Search
- Video News with YouTube links
- About, Contact, Editorial Policy, Privacy, Terms, Disclaimer and Corrections pages
- 404 page
- Admin dashboard at `/admin`
- Article create/edit/delete demo CMS
- Video management demo
- Categories, media, users/roles and settings modules
- Browser localStorage persistence for CMS demo changes

## Production note

The SOW specifies Next.js, serverless APIs, MongoDB and Cloudinary for the production architecture. This browser-ready version is intentionally a React/Vite frontend demo so it can be opened immediately in VS Code and run without database credentials. The CMS currently persists demo content in localStorage. For production, connect the existing UI to the approved Next.js API, MongoDB, Cloudinary, authentication, analytics and real YouTube data described in the SOW.
