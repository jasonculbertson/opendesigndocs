import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';
import { sequence } from 'astro/middleware';
import { rateLimiter } from './middleware/rateLimiter';

// Define public routes that don't require authentication overlay
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/api/search.json',
  '/api/subscribe.json'
]);

const isApiRoute = createRouteMatcher(['/api/(.*)']);

const apiAuthMiddleware = clerkMiddleware((auth, req) => {
  if (isApiRoute(req) && !isPublicRoute(req)) {
    return auth().protect();
  }
});

export const onRequest = sequence(apiAuthMiddleware, (context, next) => {
  if (isApiRoute(context.request) && !isPublicRoute(context.request)) {
    return rateLimiter(context, next);
  }
  return next();
});
