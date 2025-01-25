import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/api/')) {
    // Log API requests for debugging
    console.log('API Request:', {
      method: context.request.method,
      path: context.url.pathname,
    });
  }
  
  const response = await next();
  return response;
});
