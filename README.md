# The AI Stack

An interactive visualization comparing vertical integration across frontier AI developers.

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## Deployment to Vercel (Recommended)

### First-Time Setup

1. **Create a GitHub repository**
   - Go to github.com and create a new repository (e.g., "ai-stack")
   - Keep it public or private, doesn't matter for deployment

2. **Push this code to GitHub**
   ```bash
   cd ai-stack-project
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-stack.git
   git push -u origin main
   ```

3. **Connect to Vercel**
   - Go to vercel.com and sign up/log in with your GitHub account
   - Click "Add New Project"
   - Import your ai-stack repository
   - Vercel auto-detects Vite; just click "Deploy"
   - Wait ~1 minute for build to complete
   - You'll get a URL like `ai-stack-yourname.vercel.app`

4. **(Optional) Custom domain**
   - In Vercel dashboard, go to your project → Settings → Domains
   - Add your custom domain and follow DNS instructions

### Updating the Site

After initial setup, updates are simple:

```bash
# Edit src/data.js with your changes
# Then:
git add .
git commit -m "December 2024 update"
git push
```

Vercel automatically rebuilds and deploys within ~30 seconds.

## Alternative: Netlify

Nearly identical process:
1. Push to GitHub (same as above)
2. Go to netlify.com, sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repo, accept defaults, deploy

## Project Structure

```
ai-stack-project/
├── src/
│   ├── data.js                 ← EDIT THIS FILE for updates
│   ├── AIStackVisualization.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## How to Update Data

Open `src/data.js`. This file contains all the visualization data:

### Update the date
```javascript
export const lastUpdated = "January 2025";  // Change this
```

### Add a new infrastructure provider
```javascript
export const infrastructureProviders = [
  // ... existing providers
  { id: 'crusoe', name: 'Crusoe', color: '#22C55E', type: 'neocloud' },
];
```

### Update a company's stack
Find the company in the `companies` array and edit the relevant layer:
```javascript
{
  id: 'anthropic',
  name: 'Anthropic',
  // ...
  stack: {
    models: { 
      provider: 'Anthropic', 
      inHouse: true, 
      products: ['Claude 4', 'Claude 3.5 Sonnet']  // ← Update here
    },
    // ...
  }
}
```

### Add a new company
Copy an existing company object and modify all fields. Make sure the `id` is unique.

## Tech Stack

- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Deployed on Vercel/Netlify (free tier)

## License

MIT
