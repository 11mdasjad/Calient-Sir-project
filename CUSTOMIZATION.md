# FinTech Website - Customization Guide

Complete guide to customize the FinTech website for your brand and specific needs.

## 🎨 Color Customization

### Method 1: CSS Variables (Recommended)

Edit `assets/css/main.css` - Find the `:root` section:

```css
:root {
    --primary-color: #6366F1;      /* Main brand color */
    --primary-dark: #4F46E5;       /* Darker shade */
    --primary-light: #818CF8;      /* Lighter shade */
    --secondary-color: #8B5CF6;    /* Secondary accent */
    --accent-color: #06B6D4;       /* Accent/highlight color */
    --accent-light: #22D3EE;       /* Light accent */
    
    /* Other colors... */
}
```

**Example - Change to Orange theme:**
```css
--primary-color: #F97316;
--secondary-color: #EA580C;
--accent-color: #FB923C;
```

### Method 2: Brand Kit

Create a new CSS file `assets/css/brand.css`:

```css
/* Custom Brand Colors */
:root {
    --primary-color: #YOUR_COLOR;
    --secondary-color: #YOUR_COLOR;
    --accent-color: #YOUR_COLOR;
}
```

Add to `index.html` before other CSS:
```html
<link rel="stylesheet" href="assets/css/brand.css">
```

## 📝 Text & Content Customization

### Company Information

1. **Logo/Brand Name**
   - Find: `.logo-text` in HTML
   - Change: "FinTech" to your company name

2. **Hero Title**
   - Find: `.hero-title` in HTML
   - Update headline to match your offering

3. **Services**
   - Find: `.services-grid` section
   - Update service icons and descriptions

4. **Contact Information**
   - Find: Contact section in HTML
   - Update address, phone, email
   - Update working hours

### Updating Section Text

**Example - Change About Section:**
```html
<section id="about" class="about">
    <div class="container">
        <div class="about-text">
            <h2>Your Company Name</h2>
            <p>Your company description here...</p>
            <!-- Update content -->
        </div>
    </div>
</section>
```

## 🖼️ Adding Images

### Add Hero Image
1. Place image in `assets/images/`
2. Update `.hero-visual` section:
```html
<div class="hero-visual">
    <img src="assets/images/your-image.png" alt="Description" />
</div>
```

### Add Service Icons
Replace emoji icons with images or SVGs:
```html
<!-- From: -->
<div class="service-icon">📱</div>

<!-- To: -->
<div class="service-icon">
    <img src="assets/images/mobile-icon.svg" alt="Mobile" />
</div>
```

### Add Team Photos
In testimonials section:
```html
<div class="avatar">
    <img src="assets/images/person.jpg" alt="Name" />
</div>
```

## 🎯 Navigation Customization

### Add/Remove Menu Items

Edit `.nav-menu` in HTML:

```html
<ul class="nav-menu">
    <li><a href="#home" class="nav-link">Home</a></li>
    <li><a href="#your-section" class="nav-link">Your Section</a></li>
    <!-- Add more items -->
</ul>
```

### Add Dropdown Menu

```html
<li class="nav-item">
    <a href="#" class="nav-link">Services ▼</a>
    <ul class="dropdown-menu">
        <li><a href="#service1">Service 1</a></li>
        <li><a href="#service2">Service 2</a></li>
    </ul>
</li>
```

Add CSS in `main.css`:
```css
.dropdown-menu {
    display: none;
    position: absolute;
    background: var(--surface-color);
    border-radius: var(--radius-md);
    list-style: none;
}

.nav-item:hover .dropdown-menu {
    display: flex;
    flex-direction: column;
}
```

## 🔘 Button Customization

### Change Button Text
Find buttons in HTML and update text:
```html
<button class="btn btn-primary">Your Button Text</button>
```

### Change Button Style
Add custom classes in `main.css`:

```css
.btn-secondary {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
    color: white;
}

.btn-success {
    background: #10B981;
}
```

## 📱 Typography Changes

### Change Main Font

Edit `main.css` and replace font imports:

```css
/* From: */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

/* To your font: */
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@700&display=swap');
```

Update font family:
```css
h1, h2, h3, h4, h5, h6 {
    font-family: 'Your Font', sans-serif;
}
```

### Change Font Sizes

Edit in `main.css`:
```css
h1 {
    font-size: clamp(2rem, 5vw, 4rem);  /* min, preferred, max */
}
```

## 🎬 Animation Customization

### Slow Down Animations

Edit `main.css` - Transition variables:
```css
--transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);  /* Increased from 0.3s */
--transition-slow: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
```

### Disable Animations

For performance or preference:
```css
* {
    animation: none !important;
    transition: none !important;
}
```

### Custom Animation

Add to `components.css`:
```css
@keyframes myAnimation {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.my-element {
    animation: myAnimation 0.5s ease-out;
}
```

## 📐 Layout Adjustments

### Change Container Width
Edit `main.css`:
```css
.container {
    max-width: 1280px;  /* Change this value */
}
```

### Adjust Section Padding
Edit `main.css`:
```css
section {
    padding: 6rem 0;  /* Change padding */
}
```

### Modify Grid Columns
Find grid layouts and adjust:
```css
.services-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));  /* Adjust minmax */
}
```

## 🔐 Form Customization

### Add Form Fields

Update contact form in HTML:
```html
<div class="form-group">
    <label for="company">Company Name</label>
    <input type="text" id="company" name="company" required>
</div>
```

### Handle Form Submission

Update `script.js`:
```javascript
class FormHandler {
    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.contactForm);
        
        // Send to your API
        fetch('https://your-api.com/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }
}
```

## 🔗 Links & Navigation

### Change Footer Links
Find footer section in HTML and update:
```html
<li><a href="your-url">Your Link</a></li>
```

### Add Social Links

Find social-links section:
```html
<div class="social-links">
    <a href="https://facebook.com/yourpage" aria-label="Facebook">f</a>
    <a href="https://twitter.com/yourhandle" aria-label="Twitter">𝕏</a>
</div>
```

## 🌐 SEO Optimization

### Meta Tags

Update in `<head>` of `index.html`:
```html
<meta name="description" content="Your page description">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta name="author" content="Your Company">
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your description">
<meta property="og:image" content="your-image-url">
```

### Schema Markup

Add in `<head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yourwebsite.com",
  "logo": "https://yourwebsite.com/logo.png"
}
</script>
```

## 🔄 Using API Integration

### Connect Real Backend

Update `script.js` API:
```javascript
const API = {
    async login(email, password) {
        const response = await fetch('your-api.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
};
```

## 📊 Analytics Integration

### Google Analytics

Add to `<head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Custom Events

Track custom events in `script.js`:
```javascript
function trackEvent(eventName, eventData) {
    gtag('event', eventName, eventData);
}
```

## 🚀 Performance Optimization

### Image Optimization
```html
<!-- Add responsive images -->
<img 
    src="image.jpg" 
    srcset="image-small.jpg 500w, image-large.jpg 1000w"
    alt="Description"
/>
```

### Minify CSS/JS
Use tools:
- CSS: https://cssminifier.com
- JS: https://jsminifier.com

### Remove Unused CSS
Use PurgeCSS or uncss to remove unused styles

## 🔧 Advanced Customization

### Add Dark Mode to Sections

Create theme-specific CSS:
```css
.about {
    background: var(--background-light);
}

body.light-mode .about {
    background: var(--background-color);
}
```

### Create Custom Theme

Create `assets/css/custom-theme.css`:
```css
:root {
    /* Your custom variables */
    --brand-primary: #FF6B6B;
    --brand-secondary: #4ECDC4;
}
```

### Add Custom Sections

1. Add HTML section after desired section
2. Style in `main.css`
3. Add animations if needed

## 📋 Pre-Launch Checklist

- [ ] Update all text content
- [ ] Add company logo and images
- [ ] Change colors to brand palette
- [ ] Update contact information
- [ ] Add real links
- [ ] Test all forms
- [ ] Test on mobile devices
- [ ] Optimize images
- [ ] Add analytics
- [ ] Test in all browsers
- [ ] Check accessibility (WCAG)
- [ ] Update favicon
- [ ] Add robots.txt
- [ ] Add sitemap.xml

## 🆘 Need Help?

Common issues and solutions:

**Colors not changing?**
- Clear browser cache (Ctrl+Shift+Del)
- Check if CSS loaded correctly
- Verify no conflicting styles

**Layout broken?**
- Check responsive CSS
- Verify no missing closing tags
- Check z-index values

**JavaScript not working?**
- Check console for errors
- Verify scripts loaded
- Check browser compatibility

---

For more help, consult the README.md file.
