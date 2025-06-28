# Personal Portfolio Website

A modern personal portfolio website built with React, TypeScript, and Tailwind CSS.

##  Quick Start

### Prerequisites
- Node.js 16+  
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install react-router-dom
   npm install react-markdown
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:5173` to see your portfolio.

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [https://vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag the `dist` folder to [https://netlify.com/drop](https://netlify.com/drop)
   - Or connect your GitHub repository for continuous deployment

### GitHub Pages

1. **Add deployment script to `package.json`**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && npx gh-pages -d dist"
     }
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

---

**Happy Coding!** 
