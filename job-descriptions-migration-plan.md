# Migration Plan for Job Descriptions

## Overview

This document outlines the plan for migrating the Job Descriptions content from the old URL structure (`/docs/team/recruiting/job-descriptions-jds`) to a new structure (`/docs/levels/job-descriptions`) while preserving the original files.

## Important Note

This migration plan is designed to:
1. **Preserve** all original content at `/docs/team/recruiting/job-descriptions-jds`
2. **Delete** any existing content at the destination path `/docs/levels/job-descriptions`
3. **Copy** content from the source to the destination path

This approach ensures a clean migration to the new URL structure while maintaining the original content at its current location.

## Source and Destination

- **Source Path**: `/docs/team/recruiting/job-descriptions-jds`
- **Destination Path**: `/docs/levels/job-descriptions`

## Migration Steps

### 1. Preparation

#### 1.1 Delete Existing Content at Destination

Before copying any files, remove any existing content at the destination to ensure a clean migration:

```bash
# Remove existing content files
rm -rf /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions

# Remove existing Astro pages
rm -rf /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions
```

#### 1.2 Create Content Directory

Ensure the content directory for the new location exists:

```bash
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions
```

#### 1.2 Copy and Update MDX Files

Copy the MDX files from the source to the destination:

```bash
# Copy main job description files
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/*.mdx /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/

# Copy role-specific directories
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-researcher
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/design-ops
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/graphic-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/copywriter

# Copy role-specific content
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/ux-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/ux-researcher/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-researcher/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/design-ops/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/design-ops/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/graphic-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/graphic-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/copywriter/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/copywriter/
```

### 2. Astro Page Migration

#### 2.1 Create Astro Pages Directory

Ensure the Astro pages directory for the new location exists:

```bash
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions
```

#### 2.2 Copy Astro Pages

Copy the Astro pages from the source to the destination:

```bash
# Copy main job description page
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions.astro

# Create role directories
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-researcher
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/design-ops
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/graphic-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/copywriter

# Copy role pages
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-designer.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-researcher.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-researcher.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/design-ops.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/graphic-designer.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/graphic-designer.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/copywriter.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/copywriter.astro

# Copy level pages for each role
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-researcher/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-researcher/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/design-ops/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/graphic-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/graphic-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/copywriter/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/copywriter/
```

#### 2.3 Update Astro Files

Update the content entry paths in the Astro files to point to the new location:

```bash
# Update content entry paths in Astro files
sed -i '' 's|team/recruiting/job-descriptions-jds|levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*.astro
sed -i '' 's|team/recruiting/job-descriptions-jds|levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*/*.astro
```

#### 2.2 Fix Breadcrumbs

Update the breadcrumbs in the Astro files to reflect the new structure, ensuring "Levels" is not included as it's just a menu group name.

### 3. Update Internal Links

Update any internal links in the MDX files to point to the new URL structure:

```bash
# Update internal links in MDX files
sed -i '' 's|/docs/team/recruiting/job-descriptions-jds|/docs/levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/*.mdx
sed -i '' 's|/docs/team/recruiting/job-descriptions-jds|/docs/levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/*/*.mdx
```

## Implementation

```bash
# 1. Preparation - Delete existing content at destination
rm -rf /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions
rm -rf /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions

# 2. Create destination content directories
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-researcher
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/design-ops
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/graphic-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/copywriter

# 3. Copy content files
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/*.mdx /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/ux-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/ux-researcher/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/ux-researcher/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/design-ops/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/design-ops/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/graphic-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/graphic-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/team/recruiting/job-descriptions-jds/copywriter/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/copywriter/

# 4. Create Astro pages directories
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-researcher
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/design-ops
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/graphic-designer
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/copywriter

# 5. Copy Astro pages
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-designer.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-researcher.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-researcher.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/design-ops.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/graphic-designer.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/graphic-designer.astro
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/copywriter.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/copywriter.astro

# 6. Copy level pages for each role
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/ux-researcher/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/ux-researcher/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/design-ops/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/design-ops/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/graphic-designer/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/graphic-designer/
cp -r /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/team/recruiting/job-descriptions-jds/copywriter/* /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/copywriter/

# 7. Update content entry paths in Astro files
sed -i '' 's|team/recruiting/job-descriptions-jds|levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*.astro
sed -i '' 's|team/recruiting/job-descriptions-jds|levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*/*.astro

# 8. Update breadcrumbs in Astro files
sed -i '' 's|{ text: "Recruiting Team", href: "/docs/team/recruiting" },||g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*.astro
sed -i '' 's|{ text: "Recruiting Team", href: "/docs/team/recruiting" },||g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*/*.astro
sed -i '' 's|{ text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" }|{ text: "Job Descriptions", href: "/docs/levels/job-descriptions" }|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*.astro
sed -i '' 's|{ text: "Job Descriptions", href: "/docs/team/recruiting/job-descriptions-jds" }|{ text: "Job Descriptions", href: "/docs/levels/job-descriptions" }|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*/*.astro

# 9. Update internal links in MDX files
sed -i '' 's|/docs/team/recruiting/job-descriptions-jds|/docs/levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/*.mdx
sed -i '' 's|/docs/team/recruiting/job-descriptions-jds|/docs/levels/job-descriptions|g' /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/*/*.mdx
```

## Post-Migration Verification

### 1. Content Verification

1. Verify that all content files have been successfully copied to the new location:
   ```bash
   ls -la /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions
   ls -la /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions/*/
   ```

2. Verify that all Astro pages have been successfully copied to the new location:
   ```bash
   ls -la /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions
   ls -la /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/job-descriptions/*/
   ```

### 2. URL and Navigation Verification

1. Start the development server and verify the new URLs are accessible:
   ```bash
   npm run dev
   ```

2. Check the following URLs in a browser:
   - `/docs/levels/job-descriptions`
   - `/docs/levels/job-descriptions/ux-designer`
   - `/docs/levels/job-descriptions/ux-researcher`
   - `/docs/levels/job-descriptions/design-ops`
   - `/docs/levels/job-descriptions/graphic-designer`
   - `/docs/levels/job-descriptions/copywriter`
   - Level pages for each role (e.g., `/docs/levels/job-descriptions/ux-designer/designer-1`)

3. Confirm that the original URLs still work:
   - `/docs/team/recruiting/job-descriptions-jds`
   - `/docs/team/recruiting/job-descriptions-jds/ux-designer`
   - etc.

### 3. Link and Reference Verification

1. Ensure all internal links in the migrated content point to the new URL structure:
   ```bash
   grep -r "/docs/team/recruiting/job-descriptions-jds" /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/job-descriptions
   ```

2. Ensure all breadcrumbs are correctly displayed without the "Levels" entry and with updated paths.

3. Check that navigation menus correctly link to the new job descriptions pages.

### 4. Authentication Verification

1. Verify that the authentication system works correctly with the migrated content.

### 5. Final Checks

1. Run the build process to ensure there are no build errors:
   ```bash
   npm run build
   ```

2. Check for any lint errors or warnings related to the migrated content:
   ```bash
   npm run lint
   ```

3. Verify that the search functionality works correctly with the migrated content.
