import { d as defineMiddleware, s as sequence } from './chunks/index_vkwmQXqB.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_tkzDmEgh.mjs';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/api/")) {
    console.log("API Request:", {
      method: context.request.method,
      path: context.url.pathname
    });
  }
  const response = await next();
  return response;
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
