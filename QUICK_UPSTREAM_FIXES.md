# Quick Upstream Fixes Reference

## Mobile Bug Fixes to Apply

### 1. Fix ArticleInfoList Mobile Flickering
```bash
# View the fix
git show bd26d7d

# Key change: Fixed continuous triggering of size adjustment hook
```

### 2. Fix NavPills Mobile Flicker
```bash
# View the fix
git show 0294d7d

# Prevents flickering when changing tabs on mobile
```

### 3. Improve Touch Sensitivity
```bash
# View the fix
git show 8cd54f5

# Better touch response for CategoryFilter on mobile
```

### 4. Fix Timeline Padding
```bash
# View the fix
git show 4eebf09

# Corrects padding issues on phone screens
```

## Feature Improvements

### 1. Theme Change Spinner
```bash
# View the feature
git show 9b0e8c1

# Adds loading spinner during theme transitions
# Settings: showSpinnerOnThemeChange
```

### 2. Better YouTube Link Handling
```bash
# View the improvement
git show 28dab21

# Only shows video player for actual videos
# Channel links open externally
```

## How to Apply

### Check What Changed
```bash
# See files changed in a commit
git show --name-only COMMIT_HASH

# See the actual changes
git show COMMIT_HASH
```

### Apply If Compatible
```bash
# Try to cherry-pick
git cherry-pick COMMIT_HASH

# If conflicts, check the changes and apply manually
git show COMMIT_HASH > fix.patch
# Then manually apply relevant parts
```

### Test After Each Change
```bash
npm run dev
# Test on mobile device or responsive mode
```

## Skip These Commits
- `8fa3b7e` - V2.0 complete refactor (too big)
- `194dd4c` - PrimeIcons (unless you need it)
- Theme color changes (unless you want new colors)

## Your PR Status
- PR Created: https://github.com/ryanbalieiro/react-portfolio-template/pull/9
- Improvements submitted:
  - ✅ SEO meta tags
  - ✅ Heading hierarchy
  - ✅ Lazy loading
  - ✅ Alt text
  - ✅ Z-index normalization
  - ✅ Console message