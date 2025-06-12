# Data Engineer Portfolio
npm install react-markdown
  npm install rehype-slug



A modern, responsive personal portfolio website showcasing data engineering expertise, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Dark theme with professional aesthetics
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Smooth Animations**: Subtle animations and micro-interactions
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Fast Performance**: Built with Vite for optimal loading speeds
- **Accessibility**: WCAG compliant with proper contrast ratios

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages ready

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Portfolio title and branding
│   ├── Navigation.tsx      # Sticky navigation with mobile menu
│   ├── Hero.tsx           # Introduction and profile section
│   ├── Projects.tsx       # Project showcase with thumbnails
│   ├── Competitions.tsx   # Awards and certifications
│   ├── Contact.tsx        # Contact information and social links
│   └── Footer.tsx         # Footer with copyright
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Design System

### Colors
- **Background**: `#1e1e2f` (Dark navy)
- **Sections**: `#2a2a3d` (Lighter navy)
- **Text**: `#f1f1f1` (Light gray)
- **Accent**: `#ffc107` (Golden yellow)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 600 (Semibold), 800 (Extra Bold)

### Spacing
- **System**: 8px base unit for consistent spacing
- **Container**: Max-width 1000px, centered layout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
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
   Visit `http://localhost:5173` to view the portfolio

## 📝 Customization Guide

### Personal Information
Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change name and title
   - Update description and skills
   - Replace profile image URL

2. **Projects** (`src/components/Projects.tsx`):
   - Add your project details
   - Update project images and links
   - Modify technology tags

3. **Contact Info** (`src/components/Contact.tsx`):
   - Update social media links
   - Change email and phone number
   - Modify location information

4. **Meta Tags** (`index.html`):
   - Update page title and description
   - Modify Open Graph tags
   - Change author information

### Adding New Sections

To add a new section:

1. Create a new component in `src/components/`
2. Import and add it to `src/App.tsx`
3. Add navigation link in `src/components/Navigation.tsx`
4. Ensure proper `id` attribute for smooth scrolling

### Styling Customization

The design system is configured in `tailwind.config.js`:

- **Colors**: Modify the `primary` color palette
- **Animations**: Add new keyframes and animations
- **Fonts**: Change font family or add new fonts

## 🌐 Deployment

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/portfolio",
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Other Hosting Providers

The built files in the `dist` folder can be deployed to:
- Netlify
- Vercel  
- AWS S3 + CloudFront
- Any static hosting service

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- High contrast color ratios
- Focus indicators

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/portfolio/issues).

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: nguyenhuyentrangg457@gmail.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

---

**Happy coding!** 🚀✨