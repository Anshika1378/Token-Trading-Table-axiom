# 🚀 Deployment Checklist - Axiom Pulse Clone

Use this checklist to ensure your submission is complete before the deadline.

## ✅ Pre-Deployment Verification

### Code Quality
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes with no warnings
- [ ] TypeScript strict mode enabled (`tsconfig.json`)
- [ ] All components are memoized with `React.memo`

### Features Verification
- [ ] Three-column layout displays on desktop (≥1024px)
- [ ] Tab navigation works on mobile (<1024px)
- [ ] Real-time price updates show green/red flashes
- [ ] Token modal opens on card click
- [ ] Token modal closes on Escape key / X button
- [ ] Tooltips appear on hover
- [ ] New tokens appear periodically with animation
- [ ] Sorting works in column headers
- [ ] Copy address button works

### Responsive Testing
Test at these exact widths:
- [ ] 320px (minimum mobile)
- [ ] 375px (iPhone SE/12 mini)
- [ ] 768px (iPad)
- [ ] 1024px (breakpoint - should show 3 columns)
- [ ] 1920px (desktop)

### Performance Checklist
- [ ] No console errors in browser
- [ ] No layout shifts visible during loading
- [ ] Price updates don't cause full re-renders
- [ ] Smooth animations (60fps)

---

## 🌐 Vercel Deployment Steps

### Method 1: Vercel CLI (Recommended)

```bash
# Step 1: Install Vercel CLI globally
npm install -g vercel

# Step 2: Login to Vercel
vercel login

# Step 3: Navigate to project
cd axiom-pulse-clone

# Step 4: Deploy
vercel


# Step 6: Get production URL
vercel --prod
```

### Method 2: GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Deploy"

3. **Configure (if needed)**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

---

## 🎬 YouTube Demo Recording

### Setup
1. Use screen recording software (QuickTime, OBS, Loom)
2. Set browser to 1920x1080 resolution
3. Hide bookmarks bar for cleaner look
4. Close unnecessary tabs

### Recording Script (1-2 minutes)

| Time | Action | What to Show |
|------|--------|--------------|
| 0:00-0:10 | **Intro** | "This is my Axiom Pulse clone for the EternaLabs assessment" |
| 0:10-0:30 | **Desktop Layout** | Scroll through all 3 columns, point out New Pairs / Final Stretch / Migrated |
| 0:30-0:45 | **Real-time Updates** | Wait for price to flash green/red, highlight the animation |
| 0:45-1:05 | **Interactions** | Click a token card → show modal → close with Escape |
| 1:05-1:20 | **Responsive** | Resize browser window to show tab view switching |
| 1:20-1:35 | **Mobile View** | Show tab navigation, switch between tabs |
| 1:35-1:50 | **Code Quality** | Quick peek at component structure in IDE |
| 1:50-2:00 | **Outro** | "Built with Next.js, Redux Toolkit, React Query, and Radix UI" |

### Upload to YouTube
1. Go to [studio.youtube.com](https://studio.youtube.com)
2. Click "Create" → "Upload videos"
3. Set visibility to **Unlisted** or **Public**
4. Title: "Axiom Pulse Clone - EternaLabs Frontend Assessment"
5. Description: Include tech stack and GitHub link
6. Copy the video URL

---

## 📝 Final README Updates

After deployment, update these in `README.md`:

```markdown


---

## 🔍 Lighthouse Audit

### Running Lighthouse



### Target Scores (≥90 each)

| Metric | What it Measures | Tips to Improve |
|--------|------------------|-----------------|
| **Performance** | Loading speed | Optimize images, reduce JS |
| **Accessibility** | Screen reader support | Add ARIA labels, focus states |
| **Best Practices** | Security, modern APIs | HTTPS, no console errors |
| **SEO** | Search optimization | Meta tags, semantic HTML |

### Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Large images | Use Next.js `<Image>` component |
| No meta description | Add to `layout.tsx` |
| Missing alt text | Add to all `<img>` tags |
| Low contrast | Increase text/background contrast |
| Missing lang attribute | Add `lang="en"` to `<html>` |

---
