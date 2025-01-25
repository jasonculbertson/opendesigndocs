function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}

function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n = -2; n <= 2; n++) {
    if (lines[loc.line + n]) visibleLines.push(loc.line + n);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth) gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}

class AstroError extends Error {
  loc;
  title;
  hint;
  frame;
  type = "AstroError";
  constructor(props, options) {
    const { name, title, message, stack, location, hint, frame } = props;
    super(message, options);
    this.title = title;
    this.name = name;
    if (message) this.message = message;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
  setLocation(location) {
    this.loc = location;
  }
  setName(name) {
    this.name = name;
  }
  setMessage(message) {
    this.message = message;
  }
  setHint(hint) {
    this.hint = hint;
  }
  setFrame(source, location) {
    this.frame = codeFrame(source, location);
  }
  static is(err) {
    return err.type === "AstroError";
  }
}
class AstroUserError extends Error {
  type = "AstroUserError";
  /**
   * A message that explains to the user how they can fix the error.
   */
  hint;
  name = "AstroUserError";
  constructor(message, hint) {
    super();
    this.message = message;
    this.hint = hint;
  }
  static is(err) {
    return err.type === "AstroUserError";
  }
}

const ClientAddressNotAvailable = {
  name: "ClientAddressNotAvailable",
  title: "`Astro.clientAddress` is not available in current adapter.",
  message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
};
const PrerenderClientAddressNotAvailable = {
  name: "PrerenderClientAddressNotAvailable",
  title: "`Astro.clientAddress` cannot be used inside prerendered routes.",
  message: `\`Astro.clientAddress\` cannot be used inside prerendered routes`
};
const StaticClientAddressNotAvailable = {
  name: "StaticClientAddressNotAvailable",
  title: "`Astro.clientAddress` is not available in static mode.",
  message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",
  hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR."
};
const NoMatchingStaticPathFound = {
  name: "NoMatchingStaticPathFound",
  title: "No static path found for requested path.",
  message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
  hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
};
const OnlyResponseCanBeReturned = {
  name: "OnlyResponseCanBeReturned",
  title: "Invalid type returned by Astro page.",
  message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
  hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
};
const MissingMediaQueryDirective = {
  name: "MissingMediaQueryDirective",
  title: "Missing value for `client:media` directive.",
  message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
};
const NoMatchingRenderer = {
  name: "NoMatchingRenderer",
  title: "No matching renderer found.",
  message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are" : "is"} ${validRenderersCount} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
  hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.`
};
const NoClientEntrypoint = {
  name: "NoClientEntrypoint",
  title: "No client entrypoint specified in renderer.",
  message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
  hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
};
const NoClientOnlyHint = {
  name: "NoClientOnlyHint",
  title: "Missing hint on client:only directive.",
  message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
  hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
};
const InvalidGetStaticPathsEntry = {
  name: "InvalidGetStaticPathsEntry",
  title: "Invalid entry inside getStaticPath's return value",
  message: (entryType) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${entryType}\``,
  hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
const InvalidGetStaticPathsReturn = {
  name: "InvalidGetStaticPathsReturn",
  title: "Invalid value returned by getStaticPaths.",
  message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
  hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
const GetStaticPathsExpectedParams = {
  name: "GetStaticPathsExpectedParams",
  title: "Missing params property on `getStaticPaths` route.",
  message: "Missing or empty required `params` property on `getStaticPaths` route.",
  hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
const GetStaticPathsInvalidRouteParam = {
  name: "GetStaticPathsInvalidRouteParam",
  title: "Invalid value for `getStaticPaths` route parameter.",
  message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
  hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
};
const GetStaticPathsRequired = {
  name: "GetStaticPathsRequired",
  title: "`getStaticPaths()` function required for dynamic routes.",
  message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
  hint: `See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` or \`output: "hybrid"\` in your Astro config file to switch to a non-static server build. This error can also occur if using \`export const prerender = true;\`.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
};
const ReservedSlotName = {
  name: "ReservedSlotName",
  title: "Invalid slot name.",
  message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
};
const NoMatchingImport = {
  name: "NoMatchingImport",
  title: "No import found for component.",
  message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
  hint: "Please make sure the component is properly imported."
};
const InvalidComponentArgs = {
  name: "InvalidComponentArgs",
  title: "Invalid component arguments.",
  message: (name) => `Invalid arguments passed to${name ? ` <${name}>` : ""} component.`,
  hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
};
const PageNumberParamNotFound = {
  name: "PageNumberParamNotFound",
  title: "Page number param not found.",
  message: (paramName) => `[paginate()] page number param \`${paramName}\` not found in your filepath.`,
  hint: "Rename your file to `[page].astro` or `[...page].astro`."
};
const ImageMissingAlt = {
  name: "ImageMissingAlt",
  title: 'Image missing required "alt" property.',
  message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.',
  hint: 'Use an empty string ("") for decorative images.'
};
const InvalidImageService = {
  name: "InvalidImageService",
  title: "Error while loading image service.",
  message: "There was an error loading the configured image service. Please see the stack trace for more information."
};
const FailedToFetchRemoteImageDimensions = {
  name: "FailedToFetchRemoteImageDimensions",
  title: "Failed to retrieve remote image dimensions",
  message: (imageURL) => `Failed to get the dimensions for ${imageURL}.`,
  hint: "Verify your remote image URL is accurate, and that you are not using `inferSize` with a file located in your `public/` folder."
};
const PrerenderDynamicEndpointPathCollide = {
  name: "PrerenderDynamicEndpointPathCollide",
  title: "Prerendered dynamic endpoint has path collision.",
  message: (pathname) => `Could not render \`${pathname}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`,
  hint: (filename) => `Rename \`${filename}\` to \`${filename.replace(/\.(?:js|ts)/, (m) => `.json` + m)}\``
};
const ExpectedImage = {
  name: "ExpectedImage",
  title: "Expected src to be an image.",
  message: (src, typeofOptions, fullOptions) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${src}\` (type: \`${typeofOptions}\`).

Full serialized options received: \`${fullOptions}\`.`,
  hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it."
};
const ExpectedImageOptions = {
  name: "ExpectedImageOptions",
  title: "Expected image options.",
  message: (options) => `Expected getImage() parameter to be an object. Received \`${options}\`.`
};
const ExpectedNotESMImage = {
  name: "ExpectedNotESMImage",
  title: "Expected image options, not an ESM-imported image.",
  message: "An ESM-imported image cannot be passed directly to `getImage()`. Instead, pass an object with the image in the `src` property.",
  hint: "Try changing `getImage(myImage)` to `getImage({ src: myImage })`"
};
const NoImageMetadata = {
  name: "NoImageMetadata",
  title: "Could not process image metadata.",
  message: (imagePath) => `Could not process image metadata${imagePath ? ` for \`${imagePath}\`` : ""}.`,
  hint: "This is often caused by a corrupted or malformed image. Re-exporting the image from your image editor may fix this issue."
};
const ResponseSentError = {
  name: "ResponseSentError",
  title: "Unable to set response.",
  message: "The response has already been sent to the browser and cannot be altered."
};
const MiddlewareNoDataOrNextCalled = {
  name: "MiddlewareNoDataOrNextCalled",
  title: "The middleware didn't return a `Response`.",
  message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function."
};
const MiddlewareNotAResponse = {
  name: "MiddlewareNotAResponse",
  title: "The middleware returned something that is not a `Response` object.",
  message: "Any data returned from middleware must be a valid `Response` object."
};
const EndpointDidNotReturnAResponse = {
  name: "EndpointDidNotReturnAResponse",
  title: "The endpoint did not return a `Response`.",
  message: "An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`."
};
const LocalsNotAnObject = {
  name: "LocalsNotAnObject",
  title: "Value assigned to `locals` is not accepted.",
  message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.",
  hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`."
};
const AstroResponseHeadersReassigned = {
  name: "AstroResponseHeadersReassigned",
  title: "`Astro.response.headers` must not be reassigned.",
  message: "Individual headers can be added to and removed from `Astro.response.headers`, but it must not be replaced with another instance of `Headers` altogether.",
  hint: "Consider using `Astro.response.headers.add()`, and `Astro.response.headers.delete()`."
};
const AstroGlobUsedOutside = {
  name: "AstroGlobUsedOutside",
  title: "Astro.glob() used outside of an Astro file.",
  message: (globStr) => `\`Astro.glob(${globStr})\` can only be used in \`.astro\` files. \`import.meta.glob(${globStr})\` can be used instead to achieve a similar result.`,
  hint: "See Vite's documentation on `import.meta.glob` for more information: https://vite.dev/guide/features.html#glob-import"
};
const AstroGlobNoMatch = {
  name: "AstroGlobNoMatch",
  title: "Astro.glob() did not match any files.",
  message: (globStr) => `\`Astro.glob(${globStr})\` did not return any matching files.`,
  hint: "Check the pattern for typos."
};
const i18nNoLocaleFoundInPath = {
  name: "i18nNoLocaleFoundInPath",
  title: "The path doesn't contain any locale",
  message: "You tried to use an i18n utility on a path that doesn't contain any locale. You can use `pathHasLocale` first to determine if the path has a locale."
};
const RewriteWithBodyUsed = {
  name: "RewriteWithBodyUsed",
  title: "Cannot use Astro.rewrite after the request body has been read",
  message: "Astro.rewrite() cannot be used if the request body has already been read. If you need to read the body, first clone the request."
};
const UnknownContentCollectionError = {
  name: "UnknownContentCollectionError",
  title: "Unknown Content Collection Error."
};

function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i) => {
    if (i === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  return /^(?:http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:");
}
function slash(path) {
  return path.replace(/\\/g, "/");
}
function fileExtension(path) {
  const ext = path.split(".").pop();
  return ext !== path ? `.${ext}` : "";
}
function removeBase(path, base) {
  if (path.startsWith(base)) {
    return path.slice(removeTrailingForwardSlash(base).length);
  }
  return path;
}

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_HASH_PROPS = ["src", "width", "height", "format", "quality"];

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  return typeof src === "object" && "then" in src ? (await src).default ?? await src : src;
}

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src)) return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}

export { InvalidImageService as $, AstroError as A, RewriteWithBodyUsed as B, PrerenderClientAddressNotAvailable as C, ClientAddressNotAvailable as D, EndpointDidNotReturnAResponse as E, AstroResponseHeadersReassigned as F, GetStaticPathsRequired as G, NoImageMetadata as H, InvalidComponentArgs as I, FailedToFetchRemoteImageDimensions as J, ExpectedImageOptions as K, LocalsNotAnObject as L, MissingMediaQueryDirective as M, NoMatchingImport as N, OnlyResponseCanBeReturned as O, PageNumberParamNotFound as P, ExpectedImage as Q, ResponseSentError as R, StaticClientAddressNotAvailable as S, ExpectedNotESMImage as T, UnknownContentCollectionError as U, VALID_INPUT_FORMATS as V, resolveSrc as W, isRemoteImage as X, isESMImportedImage as Y, isLocalService as Z, DEFAULT_HASH_PROPS as _, AstroGlobUsedOutside as a, ImageMissingAlt as a0, AstroGlobNoMatch as b, NoMatchingRenderer as c, NoClientOnlyHint as d, NoClientEntrypoint as e, isRemoteAllowed as f, AstroUserError as g, fileExtension as h, isRemotePath as i, joinPaths as j, removeTrailingForwardSlash as k, appendForwardSlash as l, i18nNoLocaleFoundInPath as m, MiddlewareNoDataOrNextCalled as n, MiddlewareNotAResponse as o, prependForwardSlash as p, InvalidGetStaticPathsReturn as q, removeBase as r, slash as s, InvalidGetStaticPathsEntry as t, GetStaticPathsExpectedParams as u, GetStaticPathsInvalidRouteParam as v, trimSlashes as w, NoMatchingStaticPathFound as x, PrerenderDynamicEndpointPathCollide as y, ReservedSlotName as z };
