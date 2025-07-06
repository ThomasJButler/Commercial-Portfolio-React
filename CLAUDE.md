# Claude AI Assistant Guide - Commercial React Portfolio

## Project Overview

This is Thomas Butler's commercial React portfolio, forked from [ryanbalieiro/react-portfolio-template](https://github.com/ryanbalieiro/react-portfolio-template) in December 2024.

Please see the tutorials docs for up to date info how to edit the website - [text](docs/tutorials).

### Project Status
- **Current Branch**: `v2.0-migration` 
- **Main Branch**: `main`
- **Production URL**: https://www.thomasjbutler.me/
- **Repository**: https://github.com/ThomasJButler/Commercial-Portfolio-React
- **Version**: 2.0.3 (July 2025)

### Recent Major Work
- **Completed v2.0 migration** (July 4-5, 2025)
  - Migrated all custom content and assets from v1.x
  - Applied SEO and performance improvements
  - Fixed component compatibility issues
  - Implemented design improvements and complete translations
  - Fixed markdown parsing and icon issues
  - Resolved Vercel deployment configuration
- Previous work included recovery from v1.0.9 regression and upstream contributions

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
2. **Sass Deprecation Warnings**: From Bootstrap - not critical, can ignore

## Git Workflow & Branch Strategy

### Current Branches
- `main` - Production branch
- `v2.0-migration` - Active development branch (current)
- Other feature branches may exist for specific improvements

### Upstream Relationship
- **Original Fork**: December 2024
- **Major Upstream Change**: v2.0 refactor (May 2025) - successfully integrated July 2025
- **Current Strategy**: Stay aligned with upstream v2.0, cherry-pick future fixes as needed
- **Upstream v2.0 baseline commit**: `0fa84ee`

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

## Commit Memory

### Commit Message Patterns to Avoid
- **Avoid auto-generated commit messages with AI references**
  - Do not use commit messages that mention AI generation or tools
  - Preserve professional commit message standards
  - Focus on clear, descriptive commit messages that explain the changes

### Commit Guidance
- **Correct Commit Message Format**:
  ```
  feat(section): Add new skills to skills section

  - Updated skills.json with latest technical skills
  - Adjusted skill percentages for accuracy
  - Added new technology icons
  ```

- **Incorrect Commit Message Example**:
  ```
  Please don't commit using this message ever. #                                                                                          
  🤖 Generated with [Claude Code](https://claude.ai/code)                               
  Co-Authored-By: Claude <noreply@anthropic.com>
  Commit education.json changes           
  ```

### Best Practices
- Write clear, concise commit messages
- Use conventional commit format (feat:, fix:, docs:, etc.)
- Explain the 'why' behind the changes
- Keep commit scope focused
- Avoid referencing AI tools in commit messages