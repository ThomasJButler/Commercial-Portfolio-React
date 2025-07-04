# V2.0 Migration Plan - Thomas Butler Portfolio

## Overview
This document outlines the comprehensive plan to migrate from the current portfolio (based on December 2024 fork) to the upstream v2.0 (May 2025 release), while preserving all custom content and improvements.

## Current Custom Content Inventory

### 1. Personal Information & Contact
- **Location**: Liverpool, England
- **Email**: dev@thomasjbutler.me
- **Phone**: +44 7903352059
- **GitHub**: https://github.com/ThomasJButler
- **Portfolio**: https://thomasjbutler.github.io/
- **LinkedIn**: https://www.linkedin.com/in/thomasbutleruk/
- **CodePen**: https://codepen.io/thomasbutler

### 2. Professional Summary
- 3+ years experience description
- Tech stack: .NET, Azure, Node.js, C#, SCSS, Python, HubSpot/Umbraco CMS
- Personal testimonials from:
  - Keith Cridland (KC Roofing and Building)
  - Annabel Butler (Annabel Butler Designs)
  - Mark Johnson (Dribbble)
  - Sophie Smith (Dingga)
- Personal interests: Guitar, AI Image/Model Creation, Cricket, Skiing, Gaming, Hiking

### 3. Skills Section
- Technical Proficiencies (95% Web Dev, 85% Programming, 98% Version Control, etc.)
- Professional Services (Website Dev, AI Integration, Mobile Apps, Web3, Digital Design, Custom Projects)
- Core Expertise
- Advanced Skills (HTML5/CSS3, JavaScript/React/Node.js, C#/.NET, etc.)
- AI Skills (PyTorch, TensorFlow, Django & Flask)
- Python Development Skills

### 4. Work Experience
- Fuelius apprenticeship (Aug 2023 - Dec 2024)
- Growth Company bootcamp (Feb-Jun 2023)
- "Lifelong Passion for Technology" entry

### 5. Education
- Codecademy certifications
- HubSpot CMS certification
- Cisco certifications
- AWS Skill Builder
- Free Code Camp certification
- GCSE results from Merchant Taylors Boys School

### 6. Portfolio Projects
**Web Agency Projects:**
- M&S Bank Arena, CDW, ACC Liverpool, InfoTrack, MasterMover, Merseyrail, PvCase, Premex, Fuelius Internal, Lancashire Cricket, Orega, Hewitt Fertility

**Freelance Projects:**
- KC Roofing and Building
- Annabel Butler Designs

**Personal Projects:**
- Personal Portfolio
- AiTomatic
- Matrix Arcade

### 7. Custom Improvements Made
- SEO meta tags and structured data
- Developer console messages
- Language switcher removal
- Performance improvements from feature/performance-seo branch

## Migration Strategy

### Branch Structure
```
main (production)
  |
  ├── dev-rollback-1.0.5 (current stable)
  |     |
  |     └── v2.0-backup (backup of current state)
  |
  └── v2.0-migration (new branch from upstream/main)
```

### Phase 1: Preparation (15 mins)
1. Create backup branch from current state
   ```bash
   git checkout dev-rollback-1.0.5
   git checkout -b v2.0-backup
   git push origin v2.0-backup
   ```

2. Create fresh v2.0 branch from upstream
   ```bash
   git fetch upstream main
   git checkout -b v2.0-migration upstream/main
   ```

3. Install dependencies
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev  # Test vanilla v2.0 works
   ```

### Phase 2: Content Migration (1 hour)

#### 2.1 Copy All JSON Data Files
```bash
# From v2.0-backup branch, copy:
- public/data/sections/cover.json
- public/data/sections/skills.json
- public/data/sections/experience.json
- public/data/sections/education.json
- public/data/sections/portfolio.json
- public/data/sections/contact.json
- public/data/strings.json
- public/data/structure.json
```

#### 2.2 Copy Custom Assets
```bash
# Profile images and other assets
- public/img/profile/
- public/img/portfolio/
- Any custom fonts or icons
```

#### 2.3 Apply SEO Customizations
- Update index.html with meta tags
- Add structured data
- Update canonical URL
- Apply favicon

### Phase 3: Feature Re-implementation (1 hour)

#### 3.1 Re-apply Performance Improvements
- Check if lazy loading exists in v2.0, if not re-implement
- Verify heading hierarchy (h1, h2 fixes)
- Check z-index normalization needs

#### 3.2 Custom Components
- Developer console message in main.jsx
- Social links components (if custom)
- Any animation hooks

#### 3.3 Configuration
- Remove language switcher if present
- Update any hardcoded URLs
- Verify all external links work

### Phase 4: Testing Checklist (30 mins)

#### Desktop Testing
- [ ] Chrome - All sections load correctly
- [ ] Firefox - No console errors
- [ ] Safari - Smooth scrolling works
- [ ] Edge - Contact form functional

#### Mobile Testing
- [ ] iOS Safari - Touch interactions work
- [ ] Android Chrome - No layout issues
- [ ] Tablet view - Responsive design correct

#### Content Verification
- [ ] All portfolio projects link correctly
- [ ] Testimonials display properly
- [ ] Skills percentages show correctly
- [ ] Timeline displays all entries
- [ ] Contact links work

#### Performance
- [ ] Lighthouse score > 90
- [ ] Images lazy load
- [ ] No console errors
- [ ] Build succeeds without warnings

### Phase 5: Deployment (15 mins)
1. Build production version
   ```bash
   npm run build
   ```

2. Test production build locally
   ```bash
   npm run preview
   ```

3. Deploy to GitHub Pages
4. Verify live site: https://www.thomasjbutler.me/

## What You'll Gain vs Lose

### Gains ✅
- Modern v2.0 visual design
- All upstream bug fixes (mobile flickering, touch sensitivity, etc.)
- PrimeIcons support (additional icon library)
- Better theme switching with spinner
- Improved YouTube link handling
- Cleaner component architecture
- Latest performance optimizations
- Better mobile experience
- Foundation for future updates

### Potential Losses ⚠️
- Any custom SCSS tweaks will need re-applying
- Custom components (if any) need recreation
- Build configuration changes may need adjustment
- Some file paths might change

### Neutral Changes 🔄
- Different file structure (but cleaner)
- New dependencies (PrimeIcons)
- Updated color schemes (customizable)

## Risk Mitigation
1. **Backup branch** (v2.0-backup) preserves current state
2. **Incremental testing** at each phase
3. **Content first** approach ensures no data loss
4. **Local testing** before deployment
5. **Easy rollback** if needed

## Success Criteria
- [ ] All personal content migrated
- [ ] Site builds without errors
- [ ] Mobile experience improved
- [ ] Performance maintained or improved
- [ ] All links functional
- [ ] SEO tags preserved
- [ ] Clean git history

## Next Steps After Migration
1. Consider creating custom theme
2. Add new v3.0 features
3. Implement additional animations
4. Enhance mobile interactions
5. Add blog/article functionality

## Commands Reference
```bash
# Switch between branches
git checkout v2.0-backup      # Your current version
git checkout v2.0-migration   # New v2.0 version

# Copy files between branches
git checkout v2.0-backup -- public/data/

# Build and test
npm run dev
npm run build
npm run preview

# Deploy
git push origin v2.0-migration
```

## Emergency Rollback
If anything goes wrong:
```bash
git checkout main
git reset --hard v2.0-backup
git push --force origin main
```

---

**Created**: July 2025  
**Purpose**: Migrate to upstream v2.0 while preserving all customizations  
**Estimated Time**: 3-4 hours total  
**Risk Level**: Low (with proper backups)