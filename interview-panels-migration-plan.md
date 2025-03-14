# Interview Panels Migration Plan

## Overview
This plan outlines the steps to migrate the interview panels content from `/docs/team/recruiting/interview-panels` to `/docs/levels/interview-panels`.

## Migration Steps

### 1. Preparation
- Delete any existing content at the destination path `/docs/levels/interview-panels`
- Create the necessary directories for the new structure

### 2. Content Files Migration
- Copy the MDX files from `/docs/team/recruiting/interview-panels.mdx` to `/docs/levels/interview-panels.mdx`

### 3. Astro Pages Migration
- Ensure the Astro page at `/docs/levels/interview-panels.astro` correctly references the new content path
- Update any breadcrumbs to remove references to 'Recruiting Team'

### 4. Verification
- Verify that the content is accessible at the new path `/docs/levels/interview-panels`
- Ensure all links and navigation work correctly
