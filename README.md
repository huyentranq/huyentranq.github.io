# Personal Portfolio Website

A beautiful, modern personal portfolio website built with React, TypeScript, and Tailwind CSS. Features dark mode by default, smooth animations, and a complete project showcase system.


## ✨ Features

- **Dark Mode First**: Beautiful dark theme with light mode toggle
- **Responsive Design**: Works perfectly on all devices
- **Project Showcase**: Markdown-based project system with live table of contents
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Vite
- **Easy Customization**: Simple configuration for colors, fonts, and content

## 🚀 Quick Start

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
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:5173` to see your portfolio

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation with theme toggle
│   └── TableOfContents.tsx  # Live TOC for projects
├── contexts/           # React contexts
│   └── ThemeContext.tsx    # Theme management
├── pages/              # Main pages
│   ├── Home.tsx        # Landing page
│   ├── Projects.tsx    # Project listing
│   ├── ProjectDetail.tsx   # Individual project pages
│   ├── Now.tsx         # Current activities
│   └── Resume.tsx      # Resume/CV page
└── App.tsx             # Main app component
```

## 🎨 Customization Guide

### Changing Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
      primary: '#your-primary-color',
      secondary: '#your-secondary-color',
    }
  }
}
```

### Updating Content

1. **Personal Information**: Edit the content in each page component
2. **Social Links**: Update the links in `src/components/Navbar.tsx`
3. **Projects**: Modify the project data in `src/pages/Projects.tsx` and `src/pages/ProjectDetail.tsx`

### Font and Typography

Modify font sizes in `src/index.css`:

```css
/* Adjust base font sizes */
.prose h1 { @apply text-5xl; }
.prose h2 { @apply text-4xl; }
.prose p { @apply text-lg; }
```

### Layout Width

Adjust the maximum width in `src/App.tsx`:

```tsx
<main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16">
  {/* Change max-w-6xl to your preferred width */}
</main>
```

## 📝 Adding New Projects

### Method 1: Edit Project Data

Add your project to the projects array in `src/pages/Projects.tsx`:

```tsx
const projects = [
  {
    title: 'Your Project Name',
    description: 'Project description',
    image: 'https://your-image-url.com/image.jpg',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/project',
    demo: 'https://your-demo-url.com',
    slug: 'your-project-slug'
  },
  // ... other projects
];
```

### Method 2: Add Markdown Support (Advanced)

To add markdown file support:

1. Create a `public/projects/` directory
2. Add your markdown files (e.g., `my-project.md`)
3. Modify `ProjectDetail.tsx` to load from markdown files

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag the `dist` folder to [netlify.com/drop](https://netlify.com/drop)
   - Or connect your GitHub repository for continuous deployment

### GitHub Pages

1. **Add deployment script to package.json**
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

## 🛠 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📧 Contact Information

Update your contact information in:
- `src/components/Navbar.tsx` - Social links
- `src/pages/Resume.tsx` - Contact section
- `src/pages/Home.tsx` - Contact section

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Lazy Loading**: Images are lazy-loaded by default
3. **Code Splitting**: Routes are automatically code-split
4. **Minimize Bundle Size**: Remove unused dependencies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) for styling
- [Framer Motion](https://framer.com/motion) for animations
- [Lucide React](https://lucide.dev) for icons
- [Pexels](https://pexels.com) for stock photos

---

**Happy Coding!** 🚀

If you found this helpful, please give it a ⭐ on GitHub!