import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

// Define public routes that don't require authentication overlay
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/api/search.json',
  '/api/subscribe.json'
]);

export const onRequest = clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    return auth().protect();
  }
});
