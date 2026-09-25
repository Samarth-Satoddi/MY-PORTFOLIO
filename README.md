# Samarth SS Mission Control — 3D Developer Portfolio

An extraordinary personal developer portfolio built for **Samarth** as a single-page React (Vite) application with an interactive, lightweight 3D experience. Styled in an aerospace-grade **Mission Control** aesthetic, with a procedural vector-driven **SS Monogram** centerpiece, vertical project list with 3D hover previews, and a 3D Fibonacci skills sphere.

Fully static, performant, accessible, and ready for instant deployment to Vercel with zero server dependencies.

---

## ⚡ Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Starts the local Vite development server at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Generates a static production bundle in `dist/`.

---

## 🚀 Deployment to Vercel

This portfolio is completely static: no backend, no server-side rendering, no database, no API routes, and no secrets.

1. **Push your repository to GitHub**:
   ```bash
   git add .
   git commit -m "feat: Samarth SS Mission Control 3D Portfolio"
   git push origin main
   ```
2. **Open Vercel**: Navigate to [vercel.com](https://vercel.com) and log in.
3. **Import Project**: Click **"Add New..."** → **"Project"** and select your GitHub repository.
4. **Framework Preset**: Select **Vite**.
5. **Environment Variables**: None required.
6. **Deploy**: Click **Deploy**. Vercel will build and publish your static portfolio globally in seconds.

---

## 🗂️ Architecture & Content Management

All portfolio data is centralized in a single configuration file:
👉 **[`src/data/portfolio.js`](file:///c:/Users/samar/OneDrive/Desktop/my-portfolio/src/data/portfolio.js)**

### Updating Projects
Open `src/data/portfolio.js` and locate the `projects` array:
```javascript
{
  id: 'project-slug',
  number: '01',
  title: 'Project Name',
  shape: 'cube', // Choose from: 'cube', 'torus', 'octahedron', 'icosahedron', 'cone', 'dodecahedron'
  description: 'Project summary...',
  highlights: ['Key feature 1', 'Key feature 2'],
  technologies: ['Python', 'FastAPI', 'LangGraph'],
  repository: 'REPO-NAME',
  repoUrl: 'https://github.com/Samarth-Satoddi/REPO-NAME',
  isComingSoon: false,
}
```
For upcoming projects, set `isComingSoon: true` and `repoUrl: null`. The UI will automatically render a `Coming Soon` badge instead of a broken repository link.

### Updating Skills
In `src/data/portfolio.js`:
- **Fibonacci 3D Sphere**: Update `sphereSkills` (keep between 15–20 items for optimal orbital distribution and readability).
- **Secondary Inventory**: Update `skillCategories` to organize technologies under clean categorized columns.

### Updating Contact Information
In `src/data/portfolio.js`, modify `contact`:
- `email`: Replace `[REPLACE: Email address]` with your actual contact email.
- `github`: Update username and profile URL.
- `linkedin`: Update display name and profile URL.

### Open Graph & Social Preview Image
Place your 1200x630 branded image at:
👉 **`public/og-image.png`**
This image will be served automatically for Open Graph, Twitter/X cards (`summary_large_image`), and social media link previews.

### Favicon
The favicon is rendered as a clean procedural SVG brand mark at:
👉 **`public/favicon.svg`**

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Post-Processing**: [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) (Restrained Bloom)
- **Motion**: [framer-motion](https://www.framer.com/motion/)
- **Styling**: Pure Vanilla CSS with Mission Control design tokens
- **Typography**: Google Fonts (*Instrument Sans* & *IBM Plex Mono*)
- **Icons**: Lucide Icons & Custom SVG procedural geometry

---

## 🎨 Design System & Palette

- **Void Background**: `--bg-void: #0B0F14`
- **Panel Surface**: `--bg-panel: #131A22`
- **Primary Text**: `--text-primary: #E9EEF3`
- **Muted Text**: `--text-muted: #7C8A99`
- **Mission Accent**: `--accent: #F5A65B`
- **Technical Border**: `--line: #2A3742`

Built with respect for accessibility (`prefers-reduced-motion: reduce`, ARIA landmark roles, semantic headings `<h1>` - `<h2>`, and visible focus rings).
