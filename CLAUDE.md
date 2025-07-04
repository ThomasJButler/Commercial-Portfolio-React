# Claude AI Assistant Guide - Commercial React Portfolio

## Project Overview

This is Thomas Butler's commercial React portfolio, forked from [ryanbalieiro/react-portfolio-template](https://github.com/ryanbalieiro/react-portfolio-template) in December 2024.

### Project Status
- **Current Branch**: `feature/upstream-performance-seo` 
- **Main Branch**: `main`
- **Production URL**: https://www.thomasjbutler.me/
- **Repository**: https://github.com/ThomasJButler/Commercial-Portfolio-React

### Recent Major Work
- Completed recovery from v1.0.9 regression back to stable v1.0.5
- Cherry-picked safe improvements from v1.0.6-v1.0.9
- Created and submitted upstream PR with performance/SEO improvements
- Documented upstream changes since fork

## Development Setup

### Prerequisites
```bash
Node.js: v18+ 
npm: v9+
```

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Known Issues
1. **PrimeIcons Missing**: Upstream added primeicons dependency. Install locally for testing:
   ```bash
   npm install primeicons
   ```
   But DON'T commit package.json changes when contributing upstream.

2. **Sass Deprecation Warnings**: From Bootstrap - not critical, can ignore

## Git Workflow & Branch Strategy

### Current Branches
- `main` - Production branch
- `v1.1` - Backup of work before recovery
- `dev-rollback-1.0.5` - Clean recovery branch
- `feature/performance-seo` - Improvements for personal use
- `feature/upstream-performance-seo` - Upstream contribution branch

### Upstream Relationship
- **Original Fork**: December 2024
- **Major Upstream Change**: v2.0 refactor (May 2025) - too big to merge
- **Strategy**: Cherry-pick specific fixes, don't merge entire upstream

### Managing Updates
```bash
# Add upstream remote if needed
git remote add upstream https://github.com/ryanbalieiro/react-portfolio-template.git

# Fetch upstream changes
git fetch upstream main

# View specific commits
git log upstream/main --oneline

# Cherry-pick specific fixes
git cherry-pick COMMIT_HASH
```

## Key Files & Customizations

### Content Files (JSON)
- `/public/data/sections/cover.json` - Main intro section
- `/public/data/sections/skills.json` - Skills and services
- `/public/data/sections/experience.json` - Work history
- `/public/data/sections/education.json` - Education details
- `/public/data/sections/portfolio.json` - Project showcase
- `/public/data/sections/contact.json` - Contact information
- `/public/data/strings.json` - UI text translations
- `/public/data/structure.json` - Site structure
- `/public/data/settings.json` - App settings

### Key Components Modified
- `index.html` - SEO meta tags, structured data
- `src/styles/app.scss` - Bootstrap import fix
- `src/components/nav/partials/NavProfileCard.jsx` - H1 heading fix
- `src/components/sections/SectionHeader.jsx` - H2 heading fix
- `src/components/generic/ImageView.jsx` - Lazy loading implementation
- `src/components/layout/LayoutImageCache.jsx` - Alt text improvements
- `src/styles/_constants.scss` - Z-index normalization
- `src/main.jsx` - Developer console message

### Personal Customizations
- Location: Liverpool, England
- GitHub: https://github.com/ThomasJButler
- Portfolio: https://thomasjbutler.github.io/
- Custom testimonials and skills
- Removed language switcher functionality

## Testing & Quality Checks

### Before Committing
```bash
# Run linting (if available)
npm run lint

# Run type checking (if available) 
npm run typecheck

# Test build
npm run build

# Test all viewport sizes
# Test lazy loading on slow connection
# Check console for errors
```

### Testing Checklist
- [ ] Desktop: Chrome, Firefox, Safari
- [ ] Mobile: iOS Safari, Chrome Android
- [ ] Lazy loading works
- [ ] No console errors
- [ ] SEO meta tags present
- [ ] Navigation smooth
- [ ] Contact form functional

## Deployment

### Build Process
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Production build
npm run build

# Output in /dist directory
```

### Deployment Options
1. **GitHub Pages** (current)
2. **Vercel** 
3. **Netlify**
4. **Custom hosting**

## Maintenance Tasks

### Regular Updates
1. **Check upstream for critical fixes**
   ```bash
   git fetch upstream main
   git log upstream/main --oneline --since="1 month ago"
   ```

2. **Update dependencies** (carefully)
   ```bash
   npm outdated
   npm update
   ```

3. **Test thoroughly after updates**

### Cherry-Picking Upstream Fixes
High-value fixes to consider:
- Mobile flickering fixes: `bd26d7d`, `0294d7d`
- Touch sensitivity: `8cd54f5`
- Timeline padding: `4eebf09`
- Theme spinner: `9b0e8c1`

### Contributing Back
1. Create feature branch from upstream/main
2. Apply improvements
3. Test thoroughly
4. Submit PR with clear description
5. Current PR: https://github.com/ryanbalieiro/react-portfolio-template/pull/9

## Recovery Operation Summary

### What Happened
1. Rushed v1.0.9 changes caused production regression
2. Successfully rolled back to stable v1.0.5
3. Cherry-picked safe improvements from v1.0.6
4. Created organized feature branches for remaining work

### Branches Created
- `feature/performance-seo` - SEO and performance improvements ✅
- `feature/social-links` - Enhanced social components (pending)
- `feature/animations` - Scroll animations (pending)
- `feature/content-updates` - Location updates (pending)

### Lessons Learned
1. Always branch from stable version
2. Test thoroughly before merging to main
3. Keep atomic commits for easy rollback
4. Document recovery operations

## Quick Commands Reference

### Development
```bash
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

### Git Operations
```bash
git status              # Check current state
git log --oneline -10   # Recent commits
git diff --staged       # Review staged changes
git cherry-pick HASH    # Apply specific commit
git stash              # Temporarily store changes
```

### Troubleshooting
```bash
# If build fails with module errors
rm -rf node_modules package-lock.json
npm install

# If styles not loading
npm run build
npm run preview

# If commits have wrong author
git config user.name "Thomas Butler"
git config user.email "your-email@example.com"
```

## Important Notes

1. **Never force push to main**
2. **Always test on mobile**
3. **Keep commits atomic and descriptive**
4. **Don't include AI references in commits**
5. **Preserve upstream author credit**
6. **Test thoroughly after cherry-picks**
7. **Document significant changes**

## Resources

- **Upstream Repo**: https://github.com/ryanbalieiro/react-portfolio-template
- **Your Fork**: https://github.com/ThomasJButler/Commercial-Portfolio-React
- **Live Site**: https://www.thomasjbutler.me/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/

---

Last Updated: July 2025
Recovery Operation Completed Successfully ✅