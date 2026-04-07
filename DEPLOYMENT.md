# Apollo AgriGuard - Deployment Guide

## 🚀 Quick Start Deployment (5 minutes)

### Option 1: GitHub Pages (Recommended)

#### Step 1: Create Repository
```bash
# On GitHub, create new repo: apollo-agriguard
# (or apollo-website)
git clone https://github.com/YOUR_USERNAME/apollo-agriguard.git
cd apollo-agriguard
```

#### Step 2: Add Project Files
```bash
# Copy all files from apollo-website folder
cp -r /Users/akashchatake/Downloads/Projects/Apollo/apollo-website/* .

# Initialize git if not already done
git init
git add .
git commit -m "Initial Apollo AgriGuard premium website"
```

#### Step 3: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from branch → Main
3. Save
4. Wait 1-2 minutes
5. Site live at: `https://YOUR_USERNAME.github.io/apollo-agriguard`

### Option 2: Vercel (One-Click Deploy)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
cd apollo-website
vercel

# Follow prompts, select "Other" for framework
# Auto-deployed on git push
```

Live at: `https://apollo-agriguard.vercel.app`

### Option 3: Netlify (One-Click Deploy)

```bash
# Via Netlify UI
# 1. Connect GitHub repo
# 2. Deploy settings:
#    - Build command: (leave empty)
#    - Publish directory: . (root)
# 3. Deploy

# OR via CLI
npm install -g netlify-cli
netlify deploy --prod --dir .
```

## 📋 Comprehensive Deployment Checklist

### Pre-Deployment
- [ ] Test all links (internal & external)
- [ ] Check form functionality
- [ ] Verify mobile responsiveness (test on devices)
- [ ] Test accessibility (keyboard nav, screen readers)
- [ ] Run Lighthouse audit
- [ ] Check console for JS errors
- [ ] Validate HTML/CSS

### Content Verification
- [ ] Update company contact information
- [ ] Verify all email links work
- [ ] Check social media links
- [ ] Confirm download links functional
- [ ] Review success story accuracy
- [ ] Verify research paper links
- [ ] Update any date references

### Performance Optimization
- [ ] Minify CSS: `csso-cli premium-style.css -o premium-style.min.css`
- [ ] Minify JS: `terser main.js -o main.min.js -c -m`
- [ ] Optimize images (< 100KB per image)
- [ ] Enable gzip compression on server
- [ ] Set cache headers
- [ ] Test on slow 3G connection

### Security
- [ ] Set Content Security Policy header
- [ ] Enable HTTPS/SSL
- [ ] Add X-Frame-Options header
- [ ] Set X-Content-Type-Options: nosniff
- [ ] Enable HSTS
- [ ] Test form validation

### SEO
- [ ] Update meta descriptions
- [ ] Add og: tags for social sharing
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Google Search Console
- [ ] Check structured data (schema.org)

### Analytics & Tracking
- [ ] Add Google Analytics
- [ ] Setup Google Search Console
- [ ] Add Hotjar or similar for heatmaps
- [ ] Setup error tracking (Sentry)
- [ ] Configure conversion tracking

## 🔧 Customization Before Deployment

### 1. Update Company Info
**File:** All .html files

```html
<!-- Replace all instances of: -->
<!-- Chatake Innoworks → Your Company Name -->
<!-- +91 9876 543 210 → Your Phone -->
<!-- info@chatakeinnoworks.com → Your Email -->
<!-- apollo@chatakeinnoworks.com → Your Support Email -->
```

### 2. Add Brand Assets
**Directory:** `assets/`

```
assets/
├── images/
│   ├── hero-background.jpg (1920×1080)
│   ├── robotics-unit.jpg
│   ├── farm-field.jpg
│   ├── harvest-success.jpg
│   └── field-operation.jpg
├── logos/
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   ├── favicon.svg
│   └── company-crest.svg
└── icons/
    └── (Font Awesome covers most needs)
```

### 3. Add Research Papers
**Directory:** `downloads/`

```
downloads/
├── ijca-paper.pdf (add actual paper)
├── technical-datasheet.pdf
└── case-studies.pdf
```

### 4. Update Color Scheme (if needed)

**File:** `css/premium-style.css`

```css
:root {
  /* Edit these color variables */
  --primary-dark-green: #0D5F3F;
  --accent-copper: #D4A574;
  --secondary-blue: #1A3A52;
  /* ... rest of colors */
}
```

### 5. Modify Content

**Pages to Update:**
- `index.html` - Main landing page
- `pages/technical-specs.html` - System specifications
- `pages/faq.html` - Answer templates
- `pages/contact.html` - Update contact form recipient
- `pages/about-company.html` - Company information (if exists)

## 🌐 Domain Configuration

### For Custom Domain
```
Example: apollo.chatakeinnoworks.com

GitHub Pages:
1. Add CNAME file to root:
   apollo.chatakeinnoworks.com

2. In Settings → Pages → Custom domain:
   Enter: apollo.chatakeinnoworks.com

3. DNS Record (at registrar):
   CNAME apollo.chatakeinnoworks.com → username.github.io
```

### For Subdomain on Existing Site
```
Redirect: agriguard.chatakeinnoworks.com → github.pages

At DNS provider:
CNAME agriguard.chatakeinnoworks.com → aakashchatake.github.io
```

## 📊 Post-Deployment Testing

### Automated Tests
```bash
# Lighthouse audit
npx lighthouse https://apollo-agriguard.com --chrome-flags="--headless"

# HTML validation
npm install -g html-validator
html-validator --file=index.html

# Links checker
bleach --follow-links https://apollo-agriguard.com
```

### Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iPhone, iPad, Android
- [ ] Test all navigation links
- [ ] Test form submission
- [ ] Test button clicks
- [ ] Scroll animations on various devices
- [ ] Download links functional
- [ ] External links open new tab
- [ ] Mobile menu (if implemented)

### Performance Benchmarks
- **Page Load**: < 2 seconds
- **Lighthouse Score**: > 90
- **Mobile Score**: > 85
- **First Contentful Paint**: < 1s
- **CLS (Layout Shift)**: < 0.1

## 🔄 Continuous Deployment

### GitHub Actions (Auto-Deploy on Push)
**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Vercel Auto-Deploy
```bash
# Auto-deployed when pushing to main
# No additional setup needed
```

## 📱 Mobile Optimization

### Testing Tools
```bash
# Google Mobile-Friendly Test
curl -s "https://www.google.com/webmasters/tools/mobile-friendly/?url=your-site.com"

# Responsive Design Testing
npx responsive-check https://your-site.com
```

### Common Issues Fixed
- [ ] Meta viewport tag ✓ (in head)
- [ ] Font size readable on mobile ✓
- [ ] Touch targets 48px minimum ✓
- [ ] No horizontal scroll ✓
- [ ] Images responsive ✓

## 🛡️ Security Hardening

### HTTP Security Headers
```
# .htaccess (Apache)
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# vercel.json (Vercel)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📈 Growth & Optimization

### Recommended Additions
1. **Email Capture**: Newsletter signup
2. **Analytics**: Google Analytics 4
3. **Chatbot**: For FAQ automation
4. **Video Integration**: Demo videos
5. **Blog Section**: Content marketing
6. **Webinar Section**: Educational events
7. **Case Studies**: Detailed ROI stories
8. **Testimonials**: Customer success stories

### Performance Improvements
1. Implement service worker for offline support
2. Add image lazy loading
3. Code splitting for faster load
4. Minify/compress assets
5. CDN for static assets
6. Database integration (instead of static)

## 🚀 Launch Checklist

### Week 1
- [ ] Deploy to staging environment
- [ ] Full QA testing
- [ ] Load testing (>1000 concurrent)
- [ ] Security audit
- [ ] Backup procedures in place

### Day 1 (Go Live)
- [ ] Deploy to production
- [ ] Monitor error logs
- [ ] Check analytics setup
- [ ] Monitor performance metrics
- [ ] Social media announcement

### Week 1-2 (Post-Launch)
- [ ] Address user feedback
- [ ] Optimize based on analytics
- [ ] Update content if needed
- [ ] Celebrate launch 🎉

## 📞 Support & Troubleshooting

### Common Issues

**Q: Site not loading**
- Check DNS propagation (up to 48 hours)
- Clear browser cache (Ctrl+Shift+Delete)
- Check GitHub Pages/Vercel status

**Q: Styles not loading**
- Check CSS file paths (use relative paths)
- Clear cache and hard refresh (Ctrl+F5)
- Verify files in repository

**Q: Forms not working**
- Verify form action/backend
- Check browser console for JS errors
- Ensure CORS headers if using API

**Q: Images not showing**
- Check image file paths
- Verify images exist in repo
- Check file permissions (644 or similar)

## 📞 Contact for Support

- **Technical Issues**: apollo@chatakeinnoworks.com
- **Content Updates**: info@chatakeinnoworks.com
- **Deployment Help**: GitHub Issues in repository

---

**Successfully Deployed? Great!** 🎉

Next steps:
1. Monitor analytics
2. Gather user feedback
3. Plan feature enhancements
4. Scale with success
5. Celebrate the launch!

---

*Apollo AgriGuard Premium Website - Ready for Production*
