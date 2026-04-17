# FinTech Website - Quick Start Guide

Get your FinTech website up and running in 5 minutes!

## ⚡ 5-Minute Setup

### Step 1: Open the Website (2 minutes)
1. Extract the `fintech-website` folder
2. Double-click `index.html`
3. Your browser opens the website

**Done!** You can now see the website locally.

---

## 🎨 Basic Customization (3 minutes)

### Change Colors to Your Brand
1. Open `assets/css/main.css`
2. Find the `:root` section (top of file)
3. Change these colors:
   ```css
   --primary-color: #6366F1;    /* Change this to your color */
   --accent-color: #06B6D4;     /* Change this too */
   ```

**Pro Tip:** Use [Color Picker](https://htmlcolorcodes.com/) to find your hex color code

### Update Company Name
1. Open `index.html`
2. Find: `<span class="logo-text">FinTech</span>`
3. Replace "FinTech" with your company name

### Update Headline
1. Find: `The Future of <span class="gradient-text">Digital Services</span>`
2. Replace with your headline

---

## 📱 Test Responsiveness

### On Desktop
- Open DevTools: Press F12
- Click device icon (top-left)
- Select "Mobile" to see mobile view
- Try different screen sizes

### On Mobile
- Email the file to yourself
- Or use a local server (see below)

---

## 🖥️ Local Development Server (Optional)

Use a local server for better testing:

### Windows (Python 3)
```bash
# Open Command Prompt in the folder
python -m http.server 8000
# Visit: http://localhost:8000
```

### Mac/Linux
```bash
# Open Terminal in the folder
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Using Python 2
```bash
python -m SimpleHTTPServer 8000
```

### Using Node.js
```bash
npm install -g http-server
http-server
```

---

## 🚀 Deploy Live (Choose One)

### Easiest: Netlify (Recommended)
1. Visit [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag & drop the `fintech-website` folder
4. **DONE!** You have a live website

**Live URL:** https://your-random-name.netlify.app

### GitHub Pages
1. Create account at [github.com](https://github.com)
2. Create new repository named `fintech-website`
3. Upload your files
4. Settings → Pages → Enable
5. **DONE!** Live at: https://yourname.github.io/fintech-website

---

## ✏️ Common Edits

### Change Service Titles
Find this section in `index.html`:
```html
<div class="service-card">
    <div class="service-icon">📱</div>
    <h3 class="service-title">Mobile Recharge</h3>
    <p class="service-desc">Your description</p>
</div>
```

Change:
- Service icon (emoji)
- Service title
- Service description

### Update Contact Info
Find Contact section:
- Address
- Phone number
- Email address
- Working hours

### Add Team Member to Testimonials
Add new testimonial:
```html
<div class="testimonial-card">
    <div class="testimonial-header">
        <div class="avatar">👨‍💼</div>
        <div class="testimonial-info">
            <h4>Person Name</h4>
            <p>Their Title</p>
        </div>
    </div>
    <div class="stars">⭐⭐⭐⭐⭐</div>
    <p>Their testimonial text...</p>
</div>
```

---

## 🎯 Feature Guide

### Dark/Light Mode
- Click the sun/moon icon in header
- Preference saved automatically

### Mobile Menu
- Click hamburger icon on mobile
- Menu slides down
- Closes when you click a link

### Contact Form
- Fill in the form
- Click "Send Message"
- You'll see success message
- (Connect to real email in production)

### Login/Register
- Click "Login" button
- Toggle between Login/Register
- Try different inputs

### Smooth Scrolling
- Click any menu item
- Page smoothly scrolls to section

---

## 📋 Quick Customization Checklist

- [ ] Change primary color
- [ ] Update company name
- [ ] Change headline
- [ ] Update service titles
- [ ] Add company info
- [ ] Update contact details
- [ ] Change team testimonials
- [ ] Deploy to Netlify/GitHub

---

## 🐛 Quick Troubleshooting

### Site looks broken?
- Refresh page (Ctrl+F5)
- Clear cache (Ctrl+Shift+Del)
- Close and reopen browser

### Colors not changing?
- Hard refresh (Ctrl+Shift+F5)
- Check syntax in CSS
- No spaces in color codes

### Mobile view weird?
- Check responsive CSS
- Zoom to 100%
- Try different browser

### JavaScript not working?
- Check DevTools console (F12)
- Look for error messages
- Verify scripts loaded

---

## 📞 Need Help?

### Check These Files
1. **README.md** - Full documentation
2. **CUSTOMIZATION.md** - Detailed customization guide
3. **DEPLOYMENT.md** - Deployment instructions

### Common Questions

**Q: Can I use images?**
A: Yes! Add to `assets/images/` and reference in HTML

**Q: Can I add more sections?**
A: Yes! Copy existing section HTML and customize

**Q: How do I connect to backend?**
A: Edit `script.js` in the API section

**Q: Can I remove sections?**
A: Yes! Delete the section from HTML, works fine

**Q: How do I add animations?**
A: Use `data-aos` attribute on elements

---

## 🎓 Learning Resources

- [CSS Tricks](https://css-tricks.com)
- [MDN Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)
- [HTML Reference](https://htmlreference.io)

---

## 🎉 You're All Set!

Your FinTech website is ready to customize and deploy!

**Next Steps:**
1. ✅ Customize colors and text
2. ✅ Add your content
3. ✅ Test on mobile
4. ✅ Deploy to Netlify/GitHub
5. ✅ Get your custom domain
6. ✅ Share with the world!

---

**Happy Building! 🚀**

For detailed help, see README.md or CUSTOMIZATION.md
