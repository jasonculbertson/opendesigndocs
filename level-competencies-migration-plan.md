# Level Competencies Migration Plan

This document outlines the complete page structure for migrating content from `/docs/leadership/month-1/level-competencies` to `/docs/levels/level-competencies`.

## Important Note

This migration plan is designed to:
1. **Preserve** all original content at `/docs/leadership/month-1/level-competencies`
2. **Delete** any existing content at the destination path `/docs/levels/level-competencies`
3. **Copy** content from the source to the destination path

This approach ensures a clean migration to the new URL structure while maintaining the original content at its current location.

## Page Structure Overview

### Source Path: `/docs/leadership/month-1/level-competencies`

#### Content Files (MDX)
- `/src/content/docs/leadership/month-1/level-competencies.mdx` (Main page)
- `/src/content/docs/leadership/month-1/level-competencies/product-designer.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/content-designer.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/researcher.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/design-ops.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/graphic-designer.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/copywriter.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/photographer.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/ic1.mdx`
- `/src/content/docs/leadership/month-1/level-competencies/manager.mdx`

#### Astro Pages
- `/src/pages/docs/leadership/month-1/level-competencies.astro` (Main page)
- `/src/pages/docs/leadership/month-1/level-competencies/index.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/product-designer.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/content-designer.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/researcher.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/design-ops.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/graphic-designer.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/copywriter.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/photographer.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/ic1.astro`
- `/src/pages/docs/leadership/month-1/level-competencies/manager.astro`

### Destination Path: `/docs/levels/level-competencies`

#### Content Files (MDX)
- `/src/content/docs/levels/level-competencies.mdx` (Main page)
- `/src/content/docs/levels/level-competencies/product-designer.mdx`
- `/src/content/docs/levels/level-competencies/content-designer.mdx`
- `/src/content/docs/levels/level-competencies/researcher.mdx`
- `/src/content/docs/levels/level-competencies/design-ops.mdx`
- `/src/content/docs/levels/level-competencies/graphic-designer.mdx`
- `/src/content/docs/levels/level-competencies/copywriter.mdx`
- `/src/content/docs/levels/level-competencies/photographer.mdx`
- `/src/content/docs/levels/level-competencies/ic1.mdx`
- `/src/content/docs/levels/level-competencies/manager.mdx`

#### Astro Pages
- `/src/pages/docs/levels/level-competencies.astro` (Main page)
- `/src/pages/docs/levels/level-competencies/product-designer.astro`
- `/src/pages/docs/levels/level-competencies/content-designer.astro`
- `/src/pages/docs/levels/level-competencies/researcher.astro`
- `/src/pages/docs/levels/level-competencies/design-ops.astro`
- `/src/pages/docs/levels/level-competencies/graphic-designer.astro`
- `/src/pages/docs/levels/level-competencies/copywriter.astro`
- `/src/pages/docs/levels/level-competencies/photographer.astro`
- `/src/pages/docs/levels/level-competencies/ic1.astro`
- `/src/pages/docs/levels/level-competencies/manager.astro`

## URL Structure Mapping

| Content Type | Source URL | Destination URL |
|--------------|------------|------------------|
| Main Page | `/docs/leadership/month-1/level-competencies` | `/docs/levels/level-competencies` |
| Product Designer | `/docs/leadership/month-1/level-competencies/product-designer` | `/docs/levels/level-competencies/product-designer` |
| Content Designer | `/docs/leadership/month-1/level-competencies/content-designer` | `/docs/levels/level-competencies/content-designer` |
| UX Researcher | `/docs/leadership/month-1/level-competencies/researcher` | `/docs/levels/level-competencies/researcher` |
| Design Ops | `/docs/leadership/month-1/level-competencies/design-ops` | `/docs/levels/level-competencies/design-ops` |
| Graphic Designer | `/docs/leadership/month-1/level-competencies/graphic-designer` | `/docs/levels/level-competencies/graphic-designer` |
| Copywriter | `/docs/leadership/month-1/level-competencies/copywriter` | `/docs/levels/level-competencies/copywriter` |
| Photographer | `/docs/leadership/month-1/level-competencies/photographer` | `/docs/levels/level-competencies/photographer` |
| IC1 | `/docs/leadership/month-1/level-competencies/ic1` | `/docs/levels/level-competencies/ic1` |
| Manager | `/docs/leadership/month-1/level-competencies/manager` | `/docs/levels/level-competencies/manager` |

## Migration Steps

1. **Preparation**:
   - Delete all existing files in the destination folders to ensure a clean migration
   - Preserve all original content in the source path
   - Create necessary destination directories after deletion

2. **Content Files (MDX)**:
   - Copy content from source MDX files to destination MDX files
   - Update any internal links to use the new URL structure (change `/docs/leadership/month-1/level-competencies/` to `/docs/levels/level-competencies/`)
   - Update metadata (especially category tags) to reflect the new section

3. **Astro Pages**:
   - Copy Astro pages from source to destination
   - Update import paths in Astro files (adjust relative paths as needed)
   - Update content entry paths (from `leadership/month-1/level-competencies` to `levels/level-competencies`)
   - Update href links for all role cards
   - Fix breadcrumbs to match the new folder structure:
     - Add breadcrumbs to the main level-competencies.astro file if missing
     - Update breadcrumb paths in all subpage Astro files
     - Ensure breadcrumb text and hierarchy is consistent with the levels section

4. **Navigation Updates**:
   - Check and update sidebar navigation components
   - Update any other navigation references throughout the site

5. **Testing**:
   - Verify all pages load correctly
   - Test all navigation links
   - Ensure content displays properly

6. **Cleanup (Optional)**:
   - Consider adding redirects from old URLs to new URLs

## Implementation Commands

### 1. Delete Existing Destination Files

```bash
# Delete existing MDX content files in destination
rm -f /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/level-competencies.mdx
rm -rf /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/level-competencies/

# Delete existing Astro pages in destination
rm -f /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies.astro
rm -rf /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies/

# Create destination directories
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/level-competencies/
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies/
```

### 2. Copy and Update Content Files

```bash
# Copy main level-competencies.mdx file
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/month-1/level-competencies.mdx /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/level-competencies.mdx

# Copy all subpage MDX files
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/month-1/level-competencies/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/level-competencies/

# Update internal links in all MDX files
find /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/level-competencies -type f -name '*.mdx' -exec sed -i '' 's|/docs/leadership/month-1/level-competencies|/docs/levels/level-competencies|g' {} \;

# Update category tags in MDX files if needed
find /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/level-competencies -type f -name '*.mdx' -exec sed -i '' 's|category: "Career Development"|category: "Levels Framework"|g' {} \;
```

### 3. Copy and Update Astro Pages

```bash
# Copy main level-competencies.astro file
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/level-competencies.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies.astro

# Copy all subpage Astro files (excluding index.astro which may have different structure)
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/level-competencies/*.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies/

# Update content entry paths in Astro files
find /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies -type f -name '*.astro' -exec sed -i '' 's|leadership/month-1/level-competencies|levels/level-competencies|g' {} \;

# Update import paths (adjust relative paths)
find /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies -type f -name '*.astro' -exec sed -i '' 's|../../../../|../../../|g' {} \;

# Update href links in Astro files
find /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies -type f -name '*.astro' -exec sed -i '' 's|/docs/leadership/month-1/level-competencies|/docs/levels/level-competencies|g' {} \;

# Fix breadcrumbs in the main level-competencies.astro file
sed -i '' '/const { Content } = await entry.render();/a\
const breadcrumbs = [];\
' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies.astro

# Update breadcrumbs in all subpage Astro files
find /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies -type f -name '*.astro' -exec sed -i '' "s|text: 'Month 1', href: '/docs/leadership/month-1'|text: 'Levels', href: '/docs/levels'|g" {} \;
find /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/level-competencies -type f -name '*.astro' -exec sed -i '' "s|text: 'Level Competencies', href: '/docs/leadership/month-1/level-competencies'|text: 'Level Competencies', href: '/docs/levels/level-competencies'|g" {} \;
```

### 4. Update Navigation

```bash
# Find files that might contain navigation references to the old path
grep -r '/docs/leadership/month-1/level-competencies' /Users/jasonculbertson/Documents/GitHub/opendesign/src --include='*.astro' --include='*.mdx' --include='*.jsx' --include='*.tsx'
```

### 5. Testing

```bash
# Start the development server to test the changes
npm run dev
```
