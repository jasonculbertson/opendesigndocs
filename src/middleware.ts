import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

// Define public routes that don't require authentication overlay
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/api/(.*)'
]);

export const onRequest = clerkMiddleware();
