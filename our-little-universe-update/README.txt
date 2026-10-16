OUR LITTLE UNIVERSE — DROP-IN UPDATE

1. Open your existing Vite React + TypeScript project in VS Code.
2. Copy the three files in this folder's src/ into your existing src/ folder:
     src/App.tsx
     src/index.css
     src/content.ts
   Replace the existing App.tsx and index.css when prompted.
3. Ensure Tailwind CSS was configured as in the earlier setup.
   (This app mostly uses its own CSS and will work even without Tailwind.)
4. Run: npm run dev

CUSTOMIZE:
- Spotify: in src/content.ts paste her Spotify playlist URL in playlistUrl.
- Photos: put photos in public/photos/ and add their filenames/captions to memories in src/content.ts.
- Letters, things you love about her, nicknames: change the corresponding arrays in src/content.ts.
- No backend required.

TIP: To share online, deploy the project to Vercel or Netlify.
