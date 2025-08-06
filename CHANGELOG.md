# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive improvement plan documentation in `/docs/improvementplan.md`
- Enhanced GitHub Actions CI/CD pipeline with:
  - Automated testing and linting
  - Security audits
  - Lighthouse CI integration for performance monitoring
  - Dual deployment support (GitHub Pages + Vercel)
  - Build artifact caching
  - **Explicit permissions for GITHUB_TOKEN (security best practice)**
- Detailed README enhancements:
  - Getting Started guide
  - Architecture diagram placeholder
  - Contributing guidelines
  - Troubleshooting section
  - Security reporting guidelines
  - Available scripts documentation
  - Build status badges
- `.gitignore` rules for backup files
- Development and feature branch structure

### Changed
- Updated dependencies to latest versions:
  - @eslint/js: 9.30.1 → 9.32.0
  - @vitejs/plugin-react: 4.6.0 → 4.7.0
  - eslint: 9.30.1 → 9.32.0
  - sass-embedded: 1.89.2 → 1.90.0
- Enhanced GitHub Actions workflow with better error handling
- Improved build process with artifact management
- **Upgraded peaceiris/actions-gh-pages from v3 to v4**

### Fixed
- Resolved all security vulnerabilities in dependencies
- **Fixed CodeQL security warnings about workflow permissions**
- **Added least-privilege access control to GitHub Actions**
- Removed backup files from repository

### Security
- Implemented explicit permissions in GitHub Actions workflow
- Set default `contents: read` for all jobs
- Added `contents: write` only where required (deploy-github-pages)
- Follows principle of least-privilege access

### Removed
- Deleted `cover-backup.json` backup file

## [2.0.3] - 2025-01-06

### Added
- Buy Me a Coffee section in contact page
- Tech stack section with line breaks in cover
- Hidden KOTSD test page
- CSS hover effects for CTA buttons
- Icons to portfolio section headers
- Conditional deployment to GitHub Pages

### Changed
- Improved Buy Me a Coffee layout
- Updated portfolio structure with new icons
- Increased max rows collapse threshold in updates section
- Updated demo page with new projects and styling improvements

### Fixed
- XSS vulnerability in cover.json
- Language translations in demo.json
- Portfolio quick link icons

### Removed
- Freelance section

## [2.0.2] - 2024-07-23

### Added
- Full v2.0 migration from original template
- Modern visual design improvements
- Enhanced mobile experience
- Better touch interactions

### Changed
- Complete component architecture overhaul
- Improved performance optimizations
- Updated all dependencies

### Fixed
- Mobile flickering issues
- Component compatibility problems
- Markdown parsing issues
- Icon display problems

## [2.0.1] - 2024-07-10

### Added
- SEO improvements and meta tags
- Structured data for better search visibility
- Performance optimizations

### Fixed
- Vercel deployment configuration
- Build process issues

## [2.0.0] - 2024-07-05

### Added
- Migration to v2.0 architecture
- New component structure
- Improved theming system
- Better TypeScript support

### Changed
- Complete redesign of portfolio layout
- Updated to latest React patterns
- Modernized build tooling with Vite

## [1.0.9] - 2024-06-15

### Added
- Initial portfolio setup
- Custom content and assets
- Personal branding

### Changed
- Forked from ryanbalieiro/react-portfolio-template

---

## Version Guidelines

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR**: Incompatible API changes or complete redesigns
- **MINOR**: New functionality in a backward-compatible manner
- **PATCH**: Backward-compatible bug fixes

### Types of Changes

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

## Migration Guides

### Migrating from 1.x to 2.x

See [V2_MIGRATION_PLAN.md](V2_MIGRATION_PLAN.md) for detailed migration instructions.

Key changes:
1. New component architecture
2. Updated data structure
3. Vite instead of Webpack
4. New theming system

### Upcoming in 3.0

- Blog/Articles section
- Admin panel for content management
- Enhanced light mode with cyan-blue theme
- PWA support
- Advanced analytics integration

---

*For more details on each release, see the [GitHub Releases](https://github.com/ThomasJButler/Commercial-Portfolio-React/releases) page.*