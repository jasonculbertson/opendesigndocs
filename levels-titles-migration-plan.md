# Migration Plan for Levels and Titles

## Overview

This document outlines the plan for migrating the "Design Team Levels & Titles" content from the old URL structure to a new structure while preserving the original files.

## Source and Destination

- **Source Path**: `/docs/leadership/month-1/designer-levels-titles`
- **Destination Path**: `/docs/levels/levels-titles`

## Migration Steps

### 1. Create Destination Directory Structure

Ensure the destination directory exists:

```bash
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/levels-titles
```

### 2. Content Files Migration

#### 2.1 Create Content Directory

Create the content directory for the new location:

```bash
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/levels-titles
```

#### 2.2 Copy and Update MDX File

Copy the MDX file from the source to the destination:

```bash
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/month-1/designer-levels-titles.mdx /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/levels-titles.mdx
```

### 3. Astro Page Migration

#### 3.1 Copy and Update Astro File

Copy the Astro file from the source to the destination:

```bash
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/designer-levels-titles.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/levels-titles.astro
```

#### 3.2 Update Content Entry Path

Modify the content entry path in the Astro file to point to the new location.

### 4. Fix Breadcrumbs

Update the breadcrumbs in the Astro file to reflect the new structure, ensuring "Levels" is not included as it's just a menu group name.

## Implementation

```bash
# 1. Create destination directories
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/levels-titles
mkdir -p /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels

# 2. Copy content files
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/leadership/month-1/designer-levels-titles.mdx /Users/jasonculbertson/Documents/GitHub/opendesign/src/content/docs/levels/levels-titles.mdx

# 3. Copy Astro files
cp /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/leadership/month-1/designer-levels-titles.astro /Users/jasonculbertson/Documents/GitHub/opendesign/src/pages/docs/levels/levels-titles.astro
```

## Post-Migration Verification

1. Verify that the content is correctly displayed at the new URL
2. Ensure all internal links are updated
3. Confirm that breadcrumbs are correctly displayed without the "Levels" entry
