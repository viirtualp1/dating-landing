# Dating Landing Page Template

A modern, responsive dating landing page built with Gulp, SASS, and vanilla JavaScript. Features a beautiful design optimized for conversion with smooth animations and mobile-first approach.

## 🚀 Features

- **Modern Design**: Clean, professional dating-focused landing page
- **Responsive Layout**: Mobile-first design that works on all devices
- **Gulp Build System**: Automated build process with live reload
- **SASS Architecture**: Organized, maintainable CSS with variables and mixins
- **Vanilla JavaScript**: Lightweight, dependency-free interactive features
- **Performance Optimized**: Minified assets and optimized images
- **Cross-browser Compatible**: Works on all modern browsers

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🛠 Installation

1. **Clone or download the project**
   ```bash
   git clone https://github.com/yourusername/dating-landing.git
   cd dating-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   This will:
   - Compile SASS to CSS
   - Process and minify JavaScript
   - Optimize images
   - Start a local development server at `http://localhost:3000`
   - Watch for changes and auto-reload the browser

## 📜 Available Scripts

- `npm run dev` or `npm start` - Start development server with live reload
- `npm run build` - Build production-ready files
- `npm run clean` - Clean the dist directory
- `npm run styles` - Compile SASS files only
- `npm run scripts` - Process JavaScript files only
- `npm run html` - Process HTML files only
- `npm run images` - Optimize images only

## 📁 Project Structure

```
dating-landing/
├── src/                          # Source files
│   ├── html/                     # HTML templates
│   │   └── index.html           # Main HTML file
│   ├── scss/                     # SASS stylesheets
│   │   ├── base/                # Base styles
│   │   │   ├── _variables.scss  # SASS variables
│   │   │   ├── _mixins.scss     # SASS mixins
│   │   │   ├── _reset.scss      # CSS reset
│   │   │   └── _typography.scss # Typography styles
│   │   ├── components/          # Component styles
│   │   │   ├── _buttons.scss    # Button components
│   │   │   └── _forms.scss      # Form components
│   │   ├── layout/              # Layout styles
│   │   │   ├── _header.scss     # Header/navigation
│   │   │   ├── _hero.scss       # Hero section
│   │   │   ├── _features.scss   # Features section
│   │   │   ├── _how-it-works.scss # How it works section
│   │   │   ├── _testimonials.scss # Testimonials
│   │   │   ├── _cta.scss        # Call-to-action
│   │   │   └── _footer.scss     # Footer
│   │   └── main.scss           # Main SASS file
│   ├── js/                      # JavaScript files
│   │   └── main.js             # Main JavaScript file
│   └── images/                  # Source images
├── dist/                        # Built files (generated)
│   ├── css/                    # Compiled CSS
│   ├── js/                     # Processed JavaScript
│   ├── images/                 # Optimized images
│   └── index.html              # Processed HTML
├── gulpfile.js                 # Gulp configuration
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## 🎨 Customization

### Colors and Branding

Edit the SASS variables in `src/scss/base/_variables.scss`:

```scss
// Primary brand colors
$primary-color: #e91e63;        // Main brand color
$primary-hover: #c2185b;        // Hover state
$secondary-color: #2196f3;       // Secondary accent

// Text colors
$text-primary: #212121;          // Main text
$text-secondary: #757575;        // Secondary text
```

### Content

Update the content in `src/html/index.html`:
- Replace "LoveConnect" with your brand name
- Update section content, testimonials, and statistics
- Replace placeholder images with your own

### JavaScript Features

The main JavaScript file (`src/js/main.js`) includes:
- Mobile menu functionality
- Smooth scrolling navigation
- Header scroll effects
- Animated statistics counters
- Scroll-based animations
- Form validation utilities

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory ready for deployment.

### Deployment Options

1. **Static Hosting** (Netlify, Vercel, GitHub Pages)
   - Upload the `dist/` folder contents
   
2. **Traditional Web Hosting**
   - Upload `dist/` folder contents to your web server

3. **CDN Deployment**
   - Upload assets to CDN and update paths as needed

## 📱 Mobile Optimization

The template is built mobile-first with:
- Responsive grid system
- Touch-friendly navigation
- Optimized images for different screen densities
- Smooth animations that perform well on mobile devices

## ⚡ Performance Features

- **CSS**: Minified and autoprefixed
- **JavaScript**: Minified and concatenated
- **Images**: Optimized and compressed
- **HTML**: Minified with comments removed
- **Lazy Loading**: Ready for image lazy loading implementation

## 🔧 Development Tips

1. **Live Reload**: The development server automatically refreshes when you make changes
2. **Error Handling**: Check the terminal for any build errors
3. **Source Maps**: Available in development mode for easier debugging
4. **Modular SASS**: Use the existing structure to keep styles organized

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:
- Check the [Issues](https://github.com/yourusername/dating-landing/issues) page
- Create a new issue with detailed information
- Review the documentation above

## 🙏 Acknowledgments

- Google Fonts for the Inter typeface
- Feather Icons for the beautiful SVG icons
- Modern CSS techniques and best practices from the community

---

**Happy coding! 💕** Build something amazing with this template.
