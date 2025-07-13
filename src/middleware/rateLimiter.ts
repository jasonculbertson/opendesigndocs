import rateLimit from 'express-rate-limit';
import type { MiddlewareResponseHandler } from 'astro';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const rateLimiter: MiddlewareResponseHandler = (context, next) => {
  // The express-rate-limit middleware expects Express-like request and response objects.
  // We can create simple mocks that provide the necessary properties.
  const req = {
    ip: context.clientAddress,
  };

  let res = {
    headers: new Headers(),
    setHeader(name: string, value: string | number | readonly string[]): void {
      if (typeof value === 'string' || typeof value === 'number') {
        this.headers.set(name, value.toString());
      } else {
        // Handle array of strings if necessary, though typical for rate-limit headers it is not
        this.headers.set(name, value.join(', '));
      }
    },
    send(body: any): void {
      // This function is called when the rate limit is exceeded.
      // We will throw a special response to be caught and handled.
      const response = new Response(body, {
        status: 429,
        headers: this.headers,
      });
      context.response = response;
    },
    status(statusCode: number) {
      // This is used to set the status code of the response.
      // We'll capture this and use it in our Response object.
      // For simplicity, we'll just chain it.
      return this;
    },
  };

  return new Promise((resolve) => {
    limiter(req as any, res as any, (err?: any) => {
      if (err) {
        // If an error occurs in the middleware, we pass it to Astro's error handling.
        // This is unlikely in standard operation of express-rate-limit.
        return resolve(new Response(String(err), { status: 500 }));
      }

      // If the rate limit was exceeded, context.response is already set.
      if (context.response && context.response.status === 429) {
        return resolve(context.response);
      }

      // If the request is not rate-limited, we proceed with the next middleware.
      resolve(next());
    });
  });
};
