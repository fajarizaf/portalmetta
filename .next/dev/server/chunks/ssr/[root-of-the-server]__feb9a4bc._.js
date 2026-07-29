module.exports = [
"[project]/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    AppRenderSpan: null,
    AppRouteRouteHandlersSpan: null,
    BaseServerSpan: null,
    LoadComponentsSpan: null,
    LogSpanAllowList: null,
    MiddlewareSpan: null,
    NextNodeServerSpan: null,
    NextServerSpan: null,
    NextVanillaSpanAllowlist: null,
    NodeSpan: null,
    RenderSpan: null,
    ResolveMetadataSpan: null,
    RouterSpan: null,
    StartServerSpan: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRenderSpan: function() {
        return AppRenderSpan;
    },
    AppRouteRouteHandlersSpan: function() {
        return AppRouteRouteHandlersSpan;
    },
    BaseServerSpan: function() {
        return BaseServerSpan;
    },
    LoadComponentsSpan: function() {
        return LoadComponentsSpan;
    },
    LogSpanAllowList: function() {
        return LogSpanAllowList;
    },
    MiddlewareSpan: function() {
        return MiddlewareSpan;
    },
    NextNodeServerSpan: function() {
        return NextNodeServerSpan;
    },
    NextServerSpan: function() {
        return NextServerSpan;
    },
    NextVanillaSpanAllowlist: function() {
        return NextVanillaSpanAllowlist;
    },
    NodeSpan: function() {
        return NodeSpan;
    },
    RenderSpan: function() {
        return RenderSpan;
    },
    ResolveMetadataSpan: function() {
        return ResolveMetadataSpan;
    },
    RouterSpan: function() {
        return RouterSpan;
    },
    StartServerSpan: function() {
        return StartServerSpan;
    }
});
var BaseServerSpan = /*#__PURE__*/ function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
    return BaseServerSpan;
}(BaseServerSpan || {});
var LoadComponentsSpan = /*#__PURE__*/ function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
    return LoadComponentsSpan;
}(LoadComponentsSpan || {});
var NextServerSpan = /*#__PURE__*/ function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getRequestHandlerWithMetadata"] = "NextServer.getRequestHandlerWithMetadata";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
    return NextServerSpan;
}(NextServerSpan || {});
var NextNodeServerSpan = /*#__PURE__*/ function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["createComponentTree"] = "NextNodeServer.createComponentTree";
    NextNodeServerSpan["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["startResponse"] = "NextNodeServer.startResponse";
    // nested inner span, does not require parent scope name
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
    return NextNodeServerSpan;
}(NextNodeServerSpan || {});
var StartServerSpan = /*#__PURE__*/ function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
    return StartServerSpan;
}(StartServerSpan || {});
var RenderSpan = /*#__PURE__*/ function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
    return RenderSpan;
}(RenderSpan || {});
var AppRenderSpan = /*#__PURE__*/ function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
    return AppRenderSpan;
}(AppRenderSpan || {});
var RouterSpan = /*#__PURE__*/ function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
    return RouterSpan;
}(RouterSpan || {});
var NodeSpan = /*#__PURE__*/ function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
    return NodeSpan;
}(NodeSpan || {});
var AppRouteRouteHandlersSpan = /*#__PURE__*/ function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
    return AppRouteRouteHandlersSpan;
}(AppRouteRouteHandlersSpan || {});
var ResolveMetadataSpan = /*#__PURE__*/ function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
    return ResolveMetadataSpan;
}(ResolveMetadataSpan || {});
var MiddlewareSpan = /*#__PURE__*/ function(MiddlewareSpan) {
    MiddlewareSpan["execute"] = "Middleware.execute";
    return MiddlewareSpan;
}(MiddlewareSpan || {});
const NextVanillaSpanAllowlist = new Set([
    "Middleware.execute",
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule",
    "NextNodeServer.startResponse",
    "NextNodeServer.clientComponentLoading"
]);
const LogSpanAllowList = new Set([
    "NextNodeServer.findPageComponents",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.clientComponentLoading"
]); //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/next/dist/shared/lib/is-thenable.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Check to see if a value is Thenable.
 *
 * @param promise the maybe-thenable value
 * @returns true if the value is thenable
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isThenable", {
    enumerable: true,
    get: function() {
        return isThenable;
    }
});
function isThenable(promise) {
    return promise !== null && typeof promise === 'object' && 'then' in promise && typeof promise.then === 'function';
} //# sourceMappingURL=is-thenable.js.map
}),
"[project]/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BubbledError: null,
    SpanKind: null,
    SpanStatusCode: null,
    getTracer: null,
    isBubbledError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BubbledError: function() {
        return BubbledError;
    },
    SpanKind: function() {
        return SpanKind;
    },
    SpanStatusCode: function() {
        return SpanStatusCode;
    },
    getTracer: function() {
        return getTracer;
    },
    isBubbledError: function() {
        return isBubbledError;
    }
});
const _constants = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _isthenable = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/is-thenable.js [app-rsc] (ecmascript)");
const NEXT_OTEL_PERFORMANCE_PREFIX = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    try {
        api = __turbopack_context__.r("[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)");
    } catch (err) {
        api = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/@opentelemetry/api/index.js [app-rsc] (ecmascript)");
    }
}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
class BubbledError extends Error {
    constructor(bubble, result){
        super(), this.bubble = bubble, this.result = result;
    }
}
function isBubbledError(error) {
    if (typeof error !== 'object' || error === null) return false;
    return error instanceof BubbledError;
}
const closeSpanWithError = (span, error)=>{
    if (isBubbledError(error) && error.bubble) {
        span.setAttribute('next.bubble', true);
    } else {
        if (error) {
            span.recordException(error);
            span.setAttribute('error.type', error.name);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey('next.rootSpanId');
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
const clientTraceDataSetter = {
    set (carrier, key, value) {
        carrier.push({
            key,
            value
        });
    }
};
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer('next.js', '0.0.1');
    }
    getContext() {
        return context;
    }
    getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === 'function' ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        const spanName = options.spanName ?? type;
        if (!_constants.NextVanillaSpanAllowlist.has(type) && process.env.NEXT_OTEL_VERBOSE !== '1' || options.hideSpan) {
            return fn();
        }
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        if (!spanContext) {
            spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
        }
        // Check if there's already a root span in the store for this trace
        // We are intentionally not checking whether there is an active context
        // from outside of nextjs to ensure that we can provide the same level
        // of telemetry when using a custom server
        const existingRootSpanId = spanContext.getValue(rootSpanIdKey);
        const isRootSpan = typeof existingRootSpanId !== 'number' || !rootSpanAttributesStore.has(existingRootSpanId);
        const spanId = getSpanId();
        options.attributes = {
            'next.span_name': spanName,
            'next.span_type': type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                let startTime;
                if (NEXT_OTEL_PERFORMANCE_PREFIX && type && _constants.LogSpanAllowList.has(type)) {
                    startTime = 'performance' in globalThis && 'measure' in performance ? globalThis.performance.now() : undefined;
                }
                let cleanedUp = false;
                const onCleanup = ()=>{
                    if (cleanedUp) return;
                    cleanedUp = true;
                    rootSpanAttributesStore.delete(spanId);
                    if (startTime) {
                        performance.measure(`${NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split('.').pop() || '').replace(/[A-Z]/g, (match)=>'-' + match.toLowerCase())}`, {
                            start: startTime,
                            end: performance.now()
                        });
                    }
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                if (fn.length > 1) {
                    try {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    } catch (err) {
                        closeSpanWithError(span, err);
                        throw err;
                    } finally{
                        onCleanup();
                    }
                }
                try {
                    const result = fn(span);
                    if ((0, _isthenable.isThenable)(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!_constants.NextVanillaSpanAllowlist.has(name) && process.env.NEXT_OTEL_VERBOSE !== '1') {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === 'function' && typeof fn === 'function') {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === 'function') {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
    setRootSpanAttribute(key, value) {
        const spanId = context.active().getValue(rootSpanIdKey);
        const attributes = rootSpanAttributesStore.get(spanId);
        if (attributes && !attributes.has(key)) {
            attributes.set(key, value);
        }
    }
    withSpan(span, fn) {
        const spanContext = trace.setSpan(context.active(), span);
        return context.with(spanContext, fn);
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})(); //# sourceMappingURL=tracer.js.map
}),
"[project]/node_modules/next/dist/server/lib/clone-response.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cloneResponse", {
    enumerable: true,
    get: function() {
        return cloneResponse;
    }
});
const noop = ()=>{};
let registry;
if (globalThis.FinalizationRegistry) {
    registry = new FinalizationRegistry((weakRef)=>{
        const stream = weakRef.deref();
        if (stream && !stream.locked) {
            stream.cancel('Response object has been garbage collected').then(noop);
        }
    });
}
function cloneResponse(original) {
    // If the response has no body, then we can just return the original response
    // twice because it's immutable.
    if (!original.body) {
        return [
            original,
            original
        ];
    }
    const [body1, body2] = original.body.tee();
    const cloned1 = new Response(body1, {
        status: original.status,
        statusText: original.statusText,
        headers: original.headers
    });
    Object.defineProperty(cloned1, 'url', {
        value: original.url,
        // How the original response.url behaves
        configurable: true,
        enumerable: true,
        writable: false
    });
    // The Fetch Standard allows users to skip consuming the response body by
    // relying on garbage collection to release connection resources.
    // https://github.com/nodejs/undici?tab=readme-ov-file#garbage-collection
    //
    // To cancel the stream you then need to cancel both resulting branches.
    // Teeing a stream will generally lock it for the duration, preventing other
    // readers from locking it.
    // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee
    // cloned2 is stored in a react cache and cloned for subsequent requests.
    // It is the original request, and is is garbage collected by a
    // FinalizationRegistry in Undici, but since we're tee-ing the stream
    // ourselves, we need to cancel clone1's stream (the response returned from
    // our dedupe fetch) when clone1 is reclaimed, otherwise we leak memory.
    if (registry && cloned1.body) {
        registry.register(cloned1, new WeakRef(cloned1.body));
    }
    const cloned2 = new Response(body2, {
        status: original.status,
        statusText: original.statusText,
        headers: original.headers
    });
    Object.defineProperty(cloned2, 'url', {
        value: original.url,
        // How the original response.url behaves
        configurable: true,
        enumerable: true,
        writable: false
    });
    return [
        cloned1,
        cloned2
    ];
} //# sourceMappingURL=clone-response.js.map
}),
"[project]/node_modules/next/dist/server/lib/dedupe-fetch.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Based on https://github.com/facebook/react/blob/d4e78c42a94be027b4dc7ed2659a5fddfbf9bd4e/packages/react/src/ReactFetch.js
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDedupeFetch", {
    enumerable: true,
    get: function() {
        return createDedupeFetch;
    }
});
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)"));
const _cloneresponse = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/clone-response.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const simpleCacheKey = '["GET",[],null,"follow",null,null,null,null]' // generateCacheKey(new Request('https://blank'));
;
// Headers that should not affect deduplication
// traceparent and tracestate are used for distributed tracing and should not affect cache keys
const headersToExcludeInCacheKey = new Set([
    'traceparent',
    'tracestate'
]);
function generateCacheKey(request) {
    // We pick the fields that goes into the key used to dedupe requests.
    // We don't include the `cache` field, because we end up using whatever
    // caching resulted from the first request.
    // Notably we currently don't consider non-standard (or future) options.
    // This might not be safe. TODO: warn for non-standard extensions differing.
    // IF YOU CHANGE THIS UPDATE THE simpleCacheKey ABOVE.
    const filteredHeaders = Array.from(request.headers.entries()).filter(([key])=>!headersToExcludeInCacheKey.has(key.toLowerCase()));
    return JSON.stringify([
        request.method,
        filteredHeaders,
        request.mode,
        request.redirect,
        request.credentials,
        request.referrer,
        request.referrerPolicy,
        request.integrity
    ]);
}
function createDedupeFetch(originalFetch) {
    const getCacheEntries = _react.cache((url)=>[]);
    return function dedupeFetch(resource, options) {
        if (options && options.signal) {
            // If we're passed a signal, then we assume that
            // someone else controls the lifetime of this object and opts out of
            // caching. It's effectively the opt-out mechanism.
            // Ideally we should be able to check this on the Request but
            // it always gets initialized with its own signal so we don't
            // know if it's supposed to override - unless we also override the
            // Request constructor.
            return originalFetch(resource, options);
        }
        // Normalize the Request
        let url;
        let cacheKey;
        if (typeof resource === 'string' && !options) {
            // Fast path.
            cacheKey = simpleCacheKey;
            url = resource;
        } else {
            // Normalize the request.
            // if resource is not a string or a URL (its an instance of Request)
            // then do not instantiate a new Request but instead
            // reuse the request as to not disturb the body in the event it's a ReadableStream.
            const request = typeof resource === 'string' || resource instanceof URL ? new Request(resource, options) : resource;
            if (request.method !== 'GET' && request.method !== 'HEAD' || request.keepalive) {
                // We currently don't dedupe requests that might have side-effects. Those
                // have to be explicitly cached. We assume that the request doesn't have a
                // body if it's GET or HEAD.
                // keepalive gets treated the same as if you passed a custom cache signal.
                return originalFetch(resource, options);
            }
            cacheKey = generateCacheKey(request);
            url = request.url;
        }
        const cacheEntries = getCacheEntries(url);
        for(let i = 0, j = cacheEntries.length; i < j; i += 1){
            const [key, promise] = cacheEntries[i];
            if (key === cacheKey) {
                return promise.then(()=>{
                    const response = cacheEntries[i][2];
                    if (!response) throw Object.defineProperty(new _invarianterror.InvariantError('No cached response'), "__NEXT_ERROR_CODE", {
                        value: "E579",
                        enumerable: false,
                        configurable: true
                    });
                    // We're cloning the response using this utility because there exists
                    // a bug in the undici library around response cloning. See the
                    // following pull request for more details:
                    // https://github.com/vercel/next.js/pull/73274
                    const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(response);
                    cacheEntries[i][2] = cloned2;
                    return cloned1;
                });
            }
        }
        // We pass the original arguments here in case normalizing the Request
        // doesn't include all the options in this environment.
        const promise = originalFetch(resource, options);
        const entry = [
            cacheKey,
            promise,
            null
        ];
        cacheEntries.push(entry);
        return promise.then((response)=>{
            // We're cloning the response using this utility because there exists
            // a bug in the undici library around response cloning. See the
            // following pull request for more details:
            // https://github.com/vercel/next.js/pull/73274
            const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(response);
            entry[2] = cloned2;
            return cloned1;
        });
    };
} //# sourceMappingURL=dedupe-fetch.js.map
}),
"[project]/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    CachedRouteKind: null,
    IncrementalCacheKind: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CachedRouteKind: function() {
        return CachedRouteKind;
    },
    IncrementalCacheKind: function() {
        return IncrementalCacheKind;
    }
});
var CachedRouteKind = /*#__PURE__*/ function(CachedRouteKind) {
    CachedRouteKind["APP_PAGE"] = "APP_PAGE";
    CachedRouteKind["APP_ROUTE"] = "APP_ROUTE";
    CachedRouteKind["PAGES"] = "PAGES";
    CachedRouteKind["FETCH"] = "FETCH";
    CachedRouteKind["REDIRECT"] = "REDIRECT";
    CachedRouteKind["IMAGE"] = "IMAGE";
    return CachedRouteKind;
}({});
var IncrementalCacheKind = /*#__PURE__*/ function(IncrementalCacheKind) {
    IncrementalCacheKind["APP_PAGE"] = "APP_PAGE";
    IncrementalCacheKind["APP_ROUTE"] = "APP_ROUTE";
    IncrementalCacheKind["PAGES"] = "PAGES";
    IncrementalCacheKind["FETCH"] = "FETCH";
    IncrementalCacheKind["IMAGE"] = "IMAGE";
    return IncrementalCacheKind;
}({}); //# sourceMappingURL=types.js.map
}),
"[project]/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A `Promise.withResolvers` implementation that exposes the `resolve` and
 * `reject` functions on a `Promise`.
 *
 * @see https://tc39.es/proposal-promise-with-resolvers/
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DetachedPromise", {
    enumerable: true,
    get: function() {
        return DetachedPromise;
    }
});
class DetachedPromise {
    constructor(){
        let resolve;
        let reject;
        // Create the promise and assign the resolvers to the object.
        this.promise = new Promise((res, rej)=>{
            resolve = res;
            reject = rej;
        });
        // We know that resolvers is defined because the Promise constructor runs
        // synchronously.
        this.resolve = resolve;
        this.reject = reject;
    }
} //# sourceMappingURL=detached-promise.js.map
}),
"[project]/node_modules/next/dist/lib/batcher.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Batcher", {
    enumerable: true,
    get: function() {
        return Batcher;
    }
});
const _detachedpromise = __turbopack_context__.r("[project]/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)");
class Batcher {
    constructor(cacheKeyFn, /**
     * A function that will be called to schedule the wrapped function to be
     * executed. This defaults to a function that will execute the function
     * immediately.
     */ schedulerFn = (fn)=>fn()){
        this.cacheKeyFn = cacheKeyFn;
        this.schedulerFn = schedulerFn;
        this.pending = new Map();
    }
    static create(options) {
        return new Batcher(options == null ? void 0 : options.cacheKeyFn, options == null ? void 0 : options.schedulerFn);
    }
    /**
   * Wraps a function in a promise that will be resolved or rejected only once
   * for a given key. This will allow multiple calls to the function to be
   * made, but only one will be executed at a time. The result of the first
   * call will be returned to all callers.
   *
   * @param key the key to use for the cache
   * @param fn the function to wrap
   * @returns a promise that resolves to the result of the function
   */ async batch(key, fn) {
        const cacheKey = this.cacheKeyFn ? await this.cacheKeyFn(key) : key;
        if (cacheKey === null) {
            return fn({
                resolve: (value)=>Promise.resolve(value),
                key
            });
        }
        const pending = this.pending.get(cacheKey);
        if (pending) return pending;
        const { promise, resolve, reject } = new _detachedpromise.DetachedPromise();
        this.pending.set(cacheKey, promise);
        this.schedulerFn(async ()=>{
            try {
                const result = await fn({
                    resolve,
                    key
                });
                // Resolving a promise multiple times is a no-op, so we can safely
                // resolve all pending promises with the same result.
                resolve(result);
            } catch (err) {
                reject(err);
            } finally{
                this.pending.delete(cacheKey);
            }
        });
        return promise;
    }
} //# sourceMappingURL=batcher.js.map
}),
"[project]/node_modules/next/dist/server/stream-utils/encoded-tags.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ENCODED_TAGS", {
    enumerable: true,
    get: function() {
        return ENCODED_TAGS;
    }
});
const ENCODED_TAGS = {
    // opening tags do not have the closing `>` since they can contain other attributes such as `<body className=''>`
    OPENING: {
        // <html
        HTML: new Uint8Array([
            60,
            104,
            116,
            109,
            108
        ]),
        // <body
        BODY: new Uint8Array([
            60,
            98,
            111,
            100,
            121
        ])
    },
    CLOSED: {
        // </head>
        HEAD: new Uint8Array([
            60,
            47,
            104,
            101,
            97,
            100,
            62
        ]),
        // </body>
        BODY: new Uint8Array([
            60,
            47,
            98,
            111,
            100,
            121,
            62
        ]),
        // </html>
        HTML: new Uint8Array([
            60,
            47,
            104,
            116,
            109,
            108,
            62
        ]),
        // </body></html>
        BODY_AND_HTML: new Uint8Array([
            60,
            47,
            98,
            111,
            100,
            121,
            62,
            60,
            47,
            104,
            116,
            109,
            108,
            62
        ])
    },
    META: {
        // Only the match the prefix cause the suffix can be different wether it's xml compatible or not ">" or "/>"
        // <meta name="«nxt-icon»"
        // This is a special mark that will be replaced by the icon insertion script tag.
        ICON_MARK: new Uint8Array([
            60,
            109,
            101,
            116,
            97,
            32,
            110,
            97,
            109,
            101,
            61,
            34,
            194,
            171,
            110,
            120,
            116,
            45,
            105,
            99,
            111,
            110,
            194,
            187,
            34
        ])
    }
}; //# sourceMappingURL=encoded-tags.js.map
}),
"[project]/node_modules/next/dist/server/stream-utils/uint8array-helpers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Find the starting index of Uint8Array `b` within Uint8Array `a`.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    indexOfUint8Array: null,
    isEquivalentUint8Arrays: null,
    removeFromUint8Array: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    indexOfUint8Array: function() {
        return indexOfUint8Array;
    },
    isEquivalentUint8Arrays: function() {
        return isEquivalentUint8Arrays;
    },
    removeFromUint8Array: function() {
        return removeFromUint8Array;
    }
});
function indexOfUint8Array(a, b) {
    if (b.length === 0) return 0;
    if (a.length === 0 || b.length > a.length) return -1;
    // start iterating through `a`
    for(let i = 0; i <= a.length - b.length; i++){
        let completeMatch = true;
        // from index `i`, iterate through `b` and check for mismatch
        for(let j = 0; j < b.length; j++){
            // if the values do not match, then this isn't a complete match, exit `b` iteration early and iterate to next index of `a`.
            if (a[i + j] !== b[j]) {
                completeMatch = false;
                break;
            }
        }
        if (completeMatch) {
            return i;
        }
    }
    return -1;
}
function isEquivalentUint8Arrays(a, b) {
    if (a.length !== b.length) return false;
    for(let i = 0; i < a.length; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function removeFromUint8Array(a, b) {
    const tagIndex = indexOfUint8Array(a, b);
    if (tagIndex === 0) return a.subarray(b.length);
    if (tagIndex > -1) {
        const removed = new Uint8Array(a.length - b.length);
        removed.set(a.slice(0, tagIndex));
        removed.set(a.slice(tagIndex + b.length), tagIndex);
        return removed;
    } else {
        return a;
    }
} //# sourceMappingURL=uint8array-helpers.js.map
}),
"[project]/node_modules/next/dist/shared/lib/errors/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MISSING_ROOT_TAGS_ERROR", {
    enumerable: true,
    get: function() {
        return MISSING_ROOT_TAGS_ERROR;
    }
});
const MISSING_ROOT_TAGS_ERROR = 'NEXT_MISSING_ROOT_TAGS';
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=constants.js.map
}),
"[project]/node_modules/next/dist/shared/lib/segment-cache/output-export-prefetch-encoding.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// In output: export mode, the build id is added to the start of the HTML
// document, directly after the doctype declaration. During a prefetch, the
// client performs a range request to get the build id, so it can check whether
// the target page belongs to the same build.
//
// The first 64 bytes of the document are requested. The exact number isn't
// too important; it must be larger than the build id + doctype + closing and
// ending comment markers, but it doesn't need to match the end of the
// comment exactly.
//
// Build ids are 21 bytes long in the default implementation, though this
// can be overridden in the Next.js config. For the purposes of this check,
// it's OK to only match the start of the id, so we'll truncate it if exceeds
// a certain length.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "insertBuildIdComment", {
    enumerable: true,
    get: function() {
        return insertBuildIdComment;
    }
});
const DOCTYPE_PREFIX = '<!DOCTYPE html>' // 15 bytes
;
const MAX_BUILD_ID_LENGTH = 24;
function escapeBuildId(buildId) {
    // If the build id is longer than the given limit, it's OK for our purposes
    // to only match the beginning.
    const truncated = buildId.slice(0, MAX_BUILD_ID_LENGTH);
    // Replace hyphens with underscores so it doesn't break the HTML comment.
    // (Unlikely, but if this did happen it would break the whole document.)
    return truncated.replace(/-/g, '_');
}
function insertBuildIdComment(originalHtml, buildId) {
    if (buildId.includes('-->') || // React always inserts a doctype at the start of the document. Skip if it
    // isn't present. Shouldn't happen; suggests an issue elsewhere.
    !originalHtml.startsWith(DOCTYPE_PREFIX)) {
        // Return the original HTML unchanged. This means the document will not
        // be prefetched.
        // TODO: The build id comment is currently only used during prefetches, but
        // if we eventually use this mechanism for regular navigations, we may need
        // to error during build if we fail to insert it for some reason.
        return originalHtml;
    }
    // The comment must be inserted after the doctype.
    return originalHtml.replace(DOCTYPE_PREFIX, DOCTYPE_PREFIX + '<!--' + escapeBuildId(buildId) + '-->');
} //# sourceMappingURL=output-export-prefetch-encoding.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/cache-busting-search-param.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCacheBustingSearchParam", {
    enumerable: true,
    get: function() {
        return computeCacheBustingSearchParam;
    }
});
const _hash = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/hash.js [app-rsc] (ecmascript)");
function computeCacheBustingSearchParam(prefetchHeader, segmentPrefetchHeader, stateTreeHeader, nextUrlHeader) {
    if ((prefetchHeader === undefined || prefetchHeader === '0') && segmentPrefetchHeader === undefined && stateTreeHeader === undefined && nextUrlHeader === undefined) {
        return '';
    }
    return (0, _hash.hexHash)([
        prefetchHeader || '0',
        segmentPrefetchHeader || '0',
        stateTreeHeader || '0',
        nextUrlHeader || '0'
    ].join(','));
} //# sourceMappingURL=cache-busting-search-param.js.map
}),
"[project]/node_modules/next/dist/server/stream-utils/node-web-streams-helper.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    chainStreams: null,
    continueDynamicHTMLResume: null,
    continueDynamicPrerender: null,
    continueFizzStream: null,
    continueStaticFallbackPrerender: null,
    continueStaticPrerender: null,
    createBufferedTransformStream: null,
    createDocumentClosingStream: null,
    createRootLayoutValidatorStream: null,
    renderToInitialFizzStream: null,
    streamFromBuffer: null,
    streamFromString: null,
    streamToBuffer: null,
    streamToString: null,
    streamToUint8Array: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    chainStreams: function() {
        return chainStreams;
    },
    continueDynamicHTMLResume: function() {
        return continueDynamicHTMLResume;
    },
    continueDynamicPrerender: function() {
        return continueDynamicPrerender;
    },
    continueFizzStream: function() {
        return continueFizzStream;
    },
    continueStaticFallbackPrerender: function() {
        return continueStaticFallbackPrerender;
    },
    continueStaticPrerender: function() {
        return continueStaticPrerender;
    },
    createBufferedTransformStream: function() {
        return createBufferedTransformStream;
    },
    createDocumentClosingStream: function() {
        return createDocumentClosingStream;
    },
    createRootLayoutValidatorStream: function() {
        return createRootLayoutValidatorStream;
    },
    renderToInitialFizzStream: function() {
        return renderToInitialFizzStream;
    },
    streamFromBuffer: function() {
        return streamFromBuffer;
    },
    streamFromString: function() {
        return streamFromString;
    },
    streamToBuffer: function() {
        return streamToBuffer;
    },
    streamToString: function() {
        return streamToString;
    },
    streamToUint8Array: function() {
        return streamToUint8Array;
    }
});
const _tracer = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _detachedpromise = __turbopack_context__.r("[project]/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)");
const _encodedtags = __turbopack_context__.r("[project]/node_modules/next/dist/server/stream-utils/encoded-tags.js [app-rsc] (ecmascript)");
const _uint8arrayhelpers = __turbopack_context__.r("[project]/node_modules/next/dist/server/stream-utils/uint8array-helpers.js [app-rsc] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/errors/constants.js [app-rsc] (ecmascript)");
const _outputexportprefetchencoding = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/segment-cache/output-export-prefetch-encoding.js [app-rsc] (ecmascript)");
const _approuterheaders = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/app-router-headers.js [app-rsc] (ecmascript)");
const _cachebustingsearchparam = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/cache-busting-search-param.js [app-rsc] (ecmascript)");
function voidCatch() {
// this catcher is designed to be used with pipeTo where we expect the underlying
// pipe implementation to forward errors but we don't want the pipeTo promise to reject
// and be unhandled
}
// We can share the same encoder instance everywhere
// Notably we cannot do the same for TextDecoder because it is stateful
// when handling streaming data
const encoder = new TextEncoder();
function chainStreams(...streams) {
    // If we have no streams, return an empty stream. This behavior is
    // intentional as we're now providing the `RenderResult.EMPTY` value.
    if (streams.length === 0) {
        return new ReadableStream({
            start (controller) {
                controller.close();
            }
        });
    }
    // If we only have 1 stream we fast path it by returning just this stream
    if (streams.length === 1) {
        return streams[0];
    }
    const { readable, writable } = new TransformStream();
    // We always initiate pipeTo immediately. We know we have at least 2 streams
    // so we need to avoid closing the writable when this one finishes.
    let promise = streams[0].pipeTo(writable, {
        preventClose: true
    });
    let i = 1;
    for(; i < streams.length - 1; i++){
        const nextStream = streams[i];
        promise = promise.then(()=>nextStream.pipeTo(writable, {
                preventClose: true
            }));
    }
    // We can omit the length check because we halted before the last stream and there
    // is at least two streams so the lastStream here will always be defined
    const lastStream = streams[i];
    promise = promise.then(()=>lastStream.pipeTo(writable));
    // Catch any errors from the streams and ignore them, they will be handled
    // by whatever is consuming the readable stream.
    promise.catch(voidCatch);
    return readable;
}
function streamFromString(str) {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(encoder.encode(str));
            controller.close();
        }
    });
}
function streamFromBuffer(chunk) {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(chunk);
            controller.close();
        }
    });
}
async function streamToChunks(stream) {
    const reader = stream.getReader();
    const chunks = [];
    while(true){
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }
    return chunks;
}
function concatUint8Arrays(chunks) {
    const totalLength = chunks.reduce((sum, chunk)=>sum + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks){
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}
async function streamToUint8Array(stream) {
    return concatUint8Arrays(await streamToChunks(stream));
}
async function streamToBuffer(stream) {
    return Buffer.concat(await streamToChunks(stream));
}
async function streamToString(stream, signal) {
    const decoder = new TextDecoder('utf-8', {
        fatal: true
    });
    let string = '';
    for await (const chunk of stream){
        if (signal == null ? void 0 : signal.aborted) {
            return string;
        }
        string += decoder.decode(chunk, {
            stream: true
        });
    }
    string += decoder.decode();
    return string;
}
function createBufferedTransformStream(options = {}) {
    const { maxBufferByteLength = Infinity } = options;
    let bufferedChunks = [];
    let bufferByteLength = 0;
    let pending;
    const flush = (controller)=>{
        try {
            if (bufferedChunks.length === 0) {
                return;
            }
            const chunk = new Uint8Array(bufferByteLength);
            let copiedBytes = 0;
            for(let i = 0; i < bufferedChunks.length; i++){
                const bufferedChunk = bufferedChunks[i];
                chunk.set(bufferedChunk, copiedBytes);
                copiedBytes += bufferedChunk.byteLength;
            }
            // We just wrote all the buffered chunks so we need to reset the bufferedChunks array
            // and our bufferByteLength to prepare for the next round of buffered chunks
            bufferedChunks.length = 0;
            bufferByteLength = 0;
            controller.enqueue(chunk);
        } catch  {
        // If an error occurs while enqueuing, it can't be due to this
        // transformer. It's most likely caused by the controller having been
        // errored (for example, if the stream was cancelled).
        }
    };
    const scheduleFlush = (controller)=>{
        if (pending) {
            return;
        }
        const detached = new _detachedpromise.DetachedPromise();
        pending = detached;
        (0, _scheduler.scheduleImmediate)(()=>{
            try {
                flush(controller);
            } finally{
                pending = undefined;
                detached.resolve();
            }
        });
    };
    return new TransformStream({
        transform (chunk, controller) {
            // Combine the previous buffer with the new chunk.
            bufferedChunks.push(chunk);
            bufferByteLength += chunk.byteLength;
            if (bufferByteLength >= maxBufferByteLength) {
                flush(controller);
            } else {
                scheduleFlush(controller);
            }
        },
        flush () {
            return pending == null ? void 0 : pending.promise;
        }
    });
}
function createPrefetchCommentStream(isBuildTimePrerendering, buildId) {
    // Insert an extra comment at the beginning of the HTML document. This must
    // come after the DOCTYPE, which is inserted by React.
    //
    // The first chunk sent by React will contain the doctype. After that, we can
    // pass through the rest of the chunks as-is.
    let didTransformFirstChunk = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (isBuildTimePrerendering && !didTransformFirstChunk) {
                didTransformFirstChunk = true;
                const decoder = new TextDecoder('utf-8', {
                    fatal: true
                });
                const chunkStr = decoder.decode(chunk, {
                    stream: true
                });
                const updatedChunkStr = (0, _outputexportprefetchencoding.insertBuildIdComment)(chunkStr, buildId);
                controller.enqueue(encoder.encode(updatedChunkStr));
                return;
            }
            controller.enqueue(chunk);
        }
    });
}
function renderToInitialFizzStream({ ReactDOMServer, element, streamOptions }) {
    return (0, _tracer.getTracer)().trace(_constants.AppRenderSpan.renderToReadableStream, async ()=>ReactDOMServer.renderToReadableStream(element, streamOptions));
}
function createMetadataTransformStream(insert) {
    let chunkIndex = -1;
    let isMarkRemoved = false;
    return new TransformStream({
        async transform (chunk, controller) {
            let iconMarkIndex = -1;
            let closedHeadIndex = -1;
            chunkIndex++;
            if (isMarkRemoved) {
                controller.enqueue(chunk);
                return;
            }
            let iconMarkLength = 0;
            // Only search for the closed head tag once
            if (iconMarkIndex === -1) {
                iconMarkIndex = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.META.ICON_MARK);
                if (iconMarkIndex === -1) {
                    controller.enqueue(chunk);
                    return;
                } else {
                    // When we found the `<meta name="«nxt-icon»"` tag prefix, we will remove it from the chunk.
                    // Its close tag could either be `/>` or `>`, checking the next char to ensure we cover both cases.
                    iconMarkLength = _encodedtags.ENCODED_TAGS.META.ICON_MARK.length;
                    // Check if next char is /, this is for xml mode.
                    if (chunk[iconMarkIndex + iconMarkLength] === 47) {
                        iconMarkLength += 2;
                    } else {
                        // The last char is `>`
                        iconMarkLength++;
                    }
                }
            }
            // Check if icon mark is inside <head> tag in the first chunk.
            if (chunkIndex === 0) {
                closedHeadIndex = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HEAD);
                if (iconMarkIndex !== -1) {
                    // The mark icon is located in the 1st chunk before the head tag.
                    // We do not need to insert the script tag in this case because it's in the head.
                    // Just remove the icon mark from the chunk.
                    if (iconMarkIndex < closedHeadIndex) {
                        const replaced = new Uint8Array(chunk.length - iconMarkLength);
                        // Remove the icon mark from the chunk.
                        replaced.set(chunk.subarray(0, iconMarkIndex));
                        replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex);
                        chunk = replaced;
                    } else {
                        // The icon mark is after the head tag, replace and insert the script tag at that position.
                        const insertion = await insert();
                        const encodedInsertion = encoder.encode(insertion);
                        const insertionLength = encodedInsertion.length;
                        const replaced = new Uint8Array(chunk.length - iconMarkLength + insertionLength);
                        replaced.set(chunk.subarray(0, iconMarkIndex));
                        replaced.set(encodedInsertion, iconMarkIndex);
                        replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex + insertionLength);
                        chunk = replaced;
                    }
                    isMarkRemoved = true;
                }
            // If there's no icon mark located, it will be handled later when if present in the following chunks.
            } else {
                // When it's appeared in the following chunks, we'll need to
                // remove the mark and then insert the script tag at that position.
                const insertion = await insert();
                const encodedInsertion = encoder.encode(insertion);
                const insertionLength = encodedInsertion.length;
                // Replace the icon mark with the hoist script or empty string.
                const replaced = new Uint8Array(chunk.length - iconMarkLength + insertionLength);
                // Set the first part of the chunk, before the icon mark.
                replaced.set(chunk.subarray(0, iconMarkIndex));
                // Set the insertion after the icon mark.
                replaced.set(encodedInsertion, iconMarkIndex);
                // Set the rest of the chunk after the icon mark.
                replaced.set(chunk.subarray(iconMarkIndex + iconMarkLength), iconMarkIndex + insertionLength);
                chunk = replaced;
                isMarkRemoved = true;
            }
            controller.enqueue(chunk);
        }
    });
}
function createHeadInsertionTransformStream(insert) {
    let inserted = false;
    // We need to track if this transform saw any bytes because if it didn't
    // we won't want to insert any server HTML at all
    let hasBytes = false;
    return new TransformStream({
        async transform (chunk, controller) {
            hasBytes = true;
            const insertion = await insert();
            if (inserted) {
                if (insertion) {
                    const encodedInsertion = encoder.encode(insertion);
                    controller.enqueue(encodedInsertion);
                }
                controller.enqueue(chunk);
            } else {
                // TODO (@Ethan-Arrowood): Replace the generic `indexOfUint8Array` method with something finely tuned for the subset of things actually being checked for.
                const index = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HEAD);
                // In fully static rendering or non PPR rendering cases:
                // `/head>` will always be found in the chunk in first chunk rendering.
                if (index !== -1) {
                    if (insertion) {
                        const encodedInsertion = encoder.encode(insertion);
                        // Get the total count of the bytes in the chunk and the insertion
                        // e.g.
                        // chunk = <head><meta charset="utf-8"></head>
                        // insertion = <script>...</script>
                        // output = <head><meta charset="utf-8"> [ <script>...</script> ] </head>
                        const insertedHeadContent = new Uint8Array(chunk.length + encodedInsertion.length);
                        // Append the first part of the chunk, before the head tag
                        insertedHeadContent.set(chunk.slice(0, index));
                        // Append the server inserted content
                        insertedHeadContent.set(encodedInsertion, index);
                        // Append the rest of the chunk
                        insertedHeadContent.set(chunk.slice(index), index + encodedInsertion.length);
                        controller.enqueue(insertedHeadContent);
                    } else {
                        controller.enqueue(chunk);
                    }
                    inserted = true;
                } else {
                    // This will happens in PPR rendering during next start, when the page is partially rendered.
                    // When the page resumes, the head tag will be found in the middle of the chunk.
                    // Where we just need to append the insertion and chunk to the current stream.
                    // e.g.
                    // PPR-static: <head>...</head><body> [ resume content ] </body>
                    // PPR-resume: [ insertion ] [ rest content ]
                    if (insertion) {
                        controller.enqueue(encoder.encode(insertion));
                    }
                    controller.enqueue(chunk);
                    inserted = true;
                }
            }
        },
        async flush (controller) {
            // Check before closing if there's anything remaining to insert.
            if (hasBytes) {
                const insertion = await insert();
                if (insertion) {
                    controller.enqueue(encoder.encode(insertion));
                }
            }
        }
    });
}
function createClientResumeScriptInsertionTransformStream() {
    const segmentPath = '/_full';
    const cacheBustingHeader = (0, _cachebustingsearchparam.computeCacheBustingSearchParam)('1', '/_full', undefined, undefined //       headers[NEXT_URL]
    );
    const searchStr = `${_approuterheaders.NEXT_RSC_UNION_QUERY}=${cacheBustingHeader}`;
    const NEXT_CLIENT_RESUME_SCRIPT = `<script>__NEXT_CLIENT_RESUME=fetch(location.pathname+'?${searchStr}',{credentials:'same-origin',headers:{'${_approuterheaders.RSC_HEADER}': '1','${_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER}': '1','${_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER}': '${segmentPath}'}})</script>`;
    let didAlreadyInsert = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (didAlreadyInsert) {
                // Already inserted the script into the head. Pass through.
                controller.enqueue(chunk);
                return;
            }
            // TODO (@Ethan-Arrowood): Replace the generic `indexOfUint8Array` method with something finely tuned for the subset of things actually being checked for.
            const headClosingTagIndex = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HEAD);
            if (headClosingTagIndex === -1) {
                // In fully static rendering or non PPR rendering cases:
                // `/head>` will always be found in the chunk in first chunk rendering.
                controller.enqueue(chunk);
                return;
            }
            const encodedInsertion = encoder.encode(NEXT_CLIENT_RESUME_SCRIPT);
            // Get the total count of the bytes in the chunk and the insertion
            // e.g.
            // chunk = <head><meta charset="utf-8"></head>
            // insertion = <script>...</script>
            // output = <head><meta charset="utf-8"> [ <script>...</script> ] </head>
            const insertedHeadContent = new Uint8Array(chunk.length + encodedInsertion.length);
            // Append the first part of the chunk, before the head tag
            insertedHeadContent.set(chunk.slice(0, headClosingTagIndex));
            // Append the server inserted content
            insertedHeadContent.set(encodedInsertion, headClosingTagIndex);
            // Append the rest of the chunk
            insertedHeadContent.set(chunk.slice(headClosingTagIndex), headClosingTagIndex + encodedInsertion.length);
            controller.enqueue(insertedHeadContent);
            didAlreadyInsert = true;
        }
    });
}
// Suffix after main body content - scripts before </body>,
// but wait for the major chunks to be enqueued.
function createDeferredSuffixStream(suffix) {
    let flushed = false;
    let pending;
    const flush = (controller)=>{
        const detached = new _detachedpromise.DetachedPromise();
        pending = detached;
        (0, _scheduler.scheduleImmediate)(()=>{
            try {
                controller.enqueue(encoder.encode(suffix));
            } catch  {
            // If an error occurs while enqueuing it can't be due to this
            // transformers fault. It's likely due to the controller being
            // errored due to the stream being cancelled.
            } finally{
                pending = undefined;
                detached.resolve();
            }
        });
    };
    return new TransformStream({
        transform (chunk, controller) {
            controller.enqueue(chunk);
            // If we've already flushed, we're done.
            if (flushed) return;
            // Schedule the flush to happen.
            flushed = true;
            flush(controller);
        },
        flush (controller) {
            if (pending) return pending.promise;
            if (flushed) return;
            // Flush now.
            controller.enqueue(encoder.encode(suffix));
        }
    });
}
function createFlightDataInjectionTransformStream(stream, delayDataUntilFirstHtmlChunk) {
    let htmlStreamFinished = false;
    let pull = null;
    let donePulling = false;
    function startOrContinuePulling(controller) {
        if (!pull) {
            pull = startPulling(controller);
        }
        return pull;
    }
    async function startPulling(controller) {
        const reader = stream.getReader();
        if (delayDataUntilFirstHtmlChunk) {
            // NOTE: streaming flush
            // We are buffering here for the inlined data stream because the
            // "shell" stream might be chunkenized again by the underlying stream
            // implementation, e.g. with a specific high-water mark. To ensure it's
            // the safe timing to pipe the data stream, this extra tick is
            // necessary.
            // We don't start reading until we've left the current Task to ensure
            // that it's inserted after flushing the shell. Note that this implementation
            // might get stale if impl details of Fizz change in the future.
            await (0, _scheduler.atLeastOneTask)();
        }
        try {
            while(true){
                const { done, value } = await reader.read();
                if (done) {
                    donePulling = true;
                    return;
                }
                // We want to prioritize HTML over RSC data.
                // The SSR render is based on the same RSC stream, so when we get a new RSC chunk,
                // we're likely to produce an HTML chunk as well, so give it a chance to flush first.
                if (!delayDataUntilFirstHtmlChunk && !htmlStreamFinished) {
                    await (0, _scheduler.atLeastOneTask)();
                }
                controller.enqueue(value);
            }
        } catch (err) {
            controller.error(err);
        }
    }
    return new TransformStream({
        start (controller) {
            if (!delayDataUntilFirstHtmlChunk) {
                startOrContinuePulling(controller);
            }
        },
        transform (chunk, controller) {
            controller.enqueue(chunk);
            // Start the streaming if it hasn't already been started yet.
            if (delayDataUntilFirstHtmlChunk) {
                startOrContinuePulling(controller);
            }
        },
        flush (controller) {
            htmlStreamFinished = true;
            if (donePulling) {
                return;
            }
            return startOrContinuePulling(controller);
        }
    });
}
const CLOSE_TAG = '</body></html>';
/**
 * This transform stream moves the suffix to the end of the stream, so results
 * like `</body></html><script>...</script>` will be transformed to
 * `<script>...</script></body></html>`.
 */ function createMoveSuffixStream() {
    let foundSuffix = false;
    return new TransformStream({
        transform (chunk, controller) {
            if (foundSuffix) {
                return controller.enqueue(chunk);
            }
            const index = (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML);
            if (index > -1) {
                foundSuffix = true;
                // If the whole chunk is the suffix, then don't write anything, it will
                // be written in the flush.
                if (chunk.length === _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length) {
                    return;
                }
                // Write out the part before the suffix.
                const before = chunk.slice(0, index);
                controller.enqueue(before);
                // In the case where the suffix is in the middle of the chunk, we need
                // to split the chunk into two parts.
                if (chunk.length > _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length + index) {
                    // Write out the part after the suffix.
                    const after = chunk.slice(index + _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length);
                    controller.enqueue(after);
                }
            } else {
                controller.enqueue(chunk);
            }
        },
        flush (controller) {
            // Even if we didn't find the suffix, the HTML is not valid if we don't
            // add it, so insert it at the end.
            controller.enqueue(_encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML);
        }
    });
}
function createStripDocumentClosingTagsTransform() {
    return new TransformStream({
        transform (chunk, controller) {
            // We rely on the assumption that chunks will never break across a code unit.
            // This is reasonable because we currently concat all of React's output from a single
            // flush into one chunk before streaming it forward which means the chunk will represent
            // a single coherent utf-8 string. This is not safe to use if we change our streaming to no
            // longer do this large buffered chunk
            if ((0, _uint8arrayhelpers.isEquivalentUint8Arrays)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY_AND_HTML) || (0, _uint8arrayhelpers.isEquivalentUint8Arrays)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY) || (0, _uint8arrayhelpers.isEquivalentUint8Arrays)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HTML)) {
                // the entire chunk is the closing tags; return without enqueueing anything.
                return;
            }
            // We assume these tags will go at together at the end of the document and that
            // they won't appear anywhere else in the document. This is not really a safe assumption
            // but until we revamp our streaming infra this is a performant way to string the tags
            chunk = (0, _uint8arrayhelpers.removeFromUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.BODY);
            chunk = (0, _uint8arrayhelpers.removeFromUint8Array)(chunk, _encodedtags.ENCODED_TAGS.CLOSED.HTML);
            controller.enqueue(chunk);
        }
    });
}
function createRootLayoutValidatorStream() {
    let foundHtml = false;
    let foundBody = false;
    return new TransformStream({
        async transform (chunk, controller) {
            // Peek into the streamed chunk to see if the tags are present.
            if (!foundHtml && (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.OPENING.HTML) > -1) {
                foundHtml = true;
            }
            if (!foundBody && (0, _uint8arrayhelpers.indexOfUint8Array)(chunk, _encodedtags.ENCODED_TAGS.OPENING.BODY) > -1) {
                foundBody = true;
            }
            controller.enqueue(chunk);
        },
        flush (controller) {
            const missingTags = [];
            if (!foundHtml) missingTags.push('html');
            if (!foundBody) missingTags.push('body');
            if (!missingTags.length) return;
            controller.enqueue(encoder.encode(`<html id="__next_error__">
            <template
              data-next-error-message="Missing ${missingTags.map((c)=>`<${c}>`).join(missingTags.length > 1 ? ' and ' : '')} tags in the root layout.\nRead more at https://nextjs.org/docs/messages/missing-root-layout-tags"
              data-next-error-digest="${_constants1.MISSING_ROOT_TAGS_ERROR}"
              data-next-error-stack=""
            ></template>
          `));
        }
    });
}
function chainTransformers(readable, transformers) {
    let stream = readable;
    for (const transformer of transformers){
        if (!transformer) continue;
        stream = stream.pipeThrough(transformer);
    }
    return stream;
}
async function continueFizzStream(renderStream, { suffix, inlinedDataStream, isStaticGeneration, isBuildTimePrerendering, buildId, getServerInsertedHTML, getServerInsertedMetadata, validateRootLayout }) {
    // Suffix itself might contain close tags at the end, so we need to split it.
    const suffixUnclosed = suffix ? suffix.split(CLOSE_TAG, 1)[0] : null;
    if (isStaticGeneration) {
        // If we're generating static HTML we need to wait for it to resolve before continuing.
        await renderStream.allReady;
    } else {
        // Otherwise, we want to make sure Fizz is done with all microtasky work
        // before we start pulling the stream and cause a flush.
        await (0, _scheduler.waitAtLeastOneReactRenderTask)();
    }
    return chainTransformers(renderStream, [
        // Buffer everything to avoid flushing too frequently
        createBufferedTransformStream(),
        // Add build id comment to start of the HTML document (in export mode)
        createPrefetchCommentStream(isBuildTimePrerendering, buildId),
        // Transform metadata
        createMetadataTransformStream(getServerInsertedMetadata),
        // Insert suffix content
        suffixUnclosed != null && suffixUnclosed.length > 0 ? createDeferredSuffixStream(suffixUnclosed) : null,
        // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
        inlinedDataStream ? createFlightDataInjectionTransformStream(inlinedDataStream, true) : null,
        // Validate the root layout for missing html or body tags
        validateRootLayout ? createRootLayoutValidatorStream() : null,
        // Close tags should always be deferred to the end
        createMoveSuffixStream(),
        // Special head insertions
        // TODO-APP: Insert server side html to end of head in app layout rendering, to avoid
        // hydration errors. Remove this once it's ready to be handled by react itself.
        createHeadInsertionTransformStream(getServerInsertedHTML)
    ]);
}
async function continueDynamicPrerender(prerenderStream, { getServerInsertedHTML, getServerInsertedMetadata }) {
    return prerenderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()).pipeThrough(createStripDocumentClosingTagsTransform()) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata));
}
async function continueStaticPrerender(prerenderStream, { inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata, isBuildTimePrerendering, buildId }) {
    return prerenderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()) // Add build id comment to start of the HTML document (in export mode)
    .pipeThrough(createPrefetchCommentStream(isBuildTimePrerendering, buildId)) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata)) // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
    .pipeThrough(createFlightDataInjectionTransformStream(inlinedDataStream, true)) // Close tags should always be deferred to the end
    .pipeThrough(createMoveSuffixStream());
}
async function continueStaticFallbackPrerender(prerenderStream, { inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata, isBuildTimePrerendering, buildId }) {
    // Same as `continueStaticPrerender`, but also inserts an additional script
    // to instruct the client to start fetching the hydration data as early
    // as possible.
    return prerenderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()) // Add build id comment to start of the HTML document (in export mode)
    .pipeThrough(createPrefetchCommentStream(isBuildTimePrerendering, buildId)) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Insert the client resume script into the head
    .pipeThrough(createClientResumeScriptInsertionTransformStream()) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata)) // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
    .pipeThrough(createFlightDataInjectionTransformStream(inlinedDataStream, true)) // Close tags should always be deferred to the end
    .pipeThrough(createMoveSuffixStream());
}
async function continueDynamicHTMLResume(renderStream, { delayDataUntilFirstHtmlChunk, inlinedDataStream, getServerInsertedHTML, getServerInsertedMetadata }) {
    return renderStream // Buffer everything to avoid flushing too frequently
    .pipeThrough(createBufferedTransformStream()) // Insert generated tags to head
    .pipeThrough(createHeadInsertionTransformStream(getServerInsertedHTML)) // Transform metadata
    .pipeThrough(createMetadataTransformStream(getServerInsertedMetadata)) // Insert the inlined data (Flight data, form state, etc.) stream into the HTML
    .pipeThrough(createFlightDataInjectionTransformStream(inlinedDataStream, delayDataUntilFirstHtmlChunk)) // Close tags should always be deferred to the end
    .pipeThrough(createMoveSuffixStream());
}
function createDocumentClosingStream() {
    return streamFromString(CLOSE_TAG);
} //# sourceMappingURL=node-web-streams-helper.js.map
}),
"[project]/node_modules/next/dist/server/request-meta.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_REQUEST_META: null,
    addRequestMeta: null,
    getRequestMeta: null,
    removeRequestMeta: null,
    setRequestMeta: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_REQUEST_META: function() {
        return NEXT_REQUEST_META;
    },
    addRequestMeta: function() {
        return addRequestMeta;
    },
    getRequestMeta: function() {
        return getRequestMeta;
    },
    removeRequestMeta: function() {
        return removeRequestMeta;
    },
    setRequestMeta: function() {
        return setRequestMeta;
    }
});
const NEXT_REQUEST_META = Symbol.for('NextInternalRequestMeta');
function getRequestMeta(req, key) {
    const meta = req[NEXT_REQUEST_META] || {};
    return typeof key === 'string' ? meta[key] : meta;
}
function setRequestMeta(req, meta) {
    req[NEXT_REQUEST_META] = meta;
    return meta;
}
function addRequestMeta(request, key, value) {
    const meta = getRequestMeta(request);
    meta[key] = value;
    return setRequestMeta(request, meta);
}
function removeRequestMeta(request, key) {
    const meta = getRequestMeta(request);
    delete meta[key];
    return setRequestMeta(request, meta);
} //# sourceMappingURL=request-meta.js.map
}),
"[project]/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "detectDomainLocale", {
    enumerable: true,
    get: function() {
        return detectDomainLocale;
    }
});
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        // remove port if present
        const domainHostname = item.domain?.split(':', 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || item.locales?.some((locale)=>locale.toLowerCase() === detectedLocale)) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parsePath", {
    enumerable: true,
    get: function() {
        return parsePath;
    }
});
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathPrefix", {
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${prefix}${pathname}${query}${hash}`;
} //# sourceMappingURL=add-path-prefix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathSuffix", {
    enumerable: true,
    get: function() {
        return addPathSuffix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${pathname}${suffix}${query}${hash}`;
} //# sourceMappingURL=add-path-suffix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pathHasPrefix", {
    enumerable: true,
    get: function() {
        return pathHasPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-rsc] (ecmascript)");
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} //# sourceMappingURL=path-has-prefix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/add-locale.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
        return addLocale;
    }
});
const _addpathprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, '/api')) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, `/${locale.toLowerCase()}`)) return path;
    }
    // Add the locale prefix to the path.
    return (0, _addpathprefix.addPathPrefix)(path, `/${locale}`);
} //# sourceMappingURL=add-locale.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return formatNextPathnameInfo;
    }
});
const _removetrailingslash = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [app-rsc] (ecmascript)");
const _addpathprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-rsc] (ecmascript)");
const _addpathsuffix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [app-rsc] (ecmascript)");
const _addlocale = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/add-locale.js [app-rsc] (ecmascript)");
function formatNextPathnameInfo(info) {
    let pathname = (0, _addlocale.addLocale)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
    }
    if (info.buildId) {
        pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, `/_next/data/${info.buildId}`), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (0, _addpathprefix.addPathPrefix)(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0, _addpathsuffix.addPathSuffix)(pathname, '/') : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map
}),
"[project]/node_modules/next/dist/shared/lib/get-hostname.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getHostname", {
    enumerable: true,
    get: function() {
        return getHostname;
    }
});
function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if (headers?.host && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(':', 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removePathPrefix", {
    enumerable: true,
    get: function() {
        return removePathPrefix;
    }
});
const _pathhasprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!(0, _pathhasprefix.pathHasPrefix)(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return `/${withoutPrefix}`;
} //# sourceMappingURL=remove-path-prefix.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return getNextPathnameInfo;
    }
});
const _normalizelocalepath = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [app-rsc] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-rsc] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-rsc] (ecmascript)");
function getNextPathnameInfo(pathname, options) {
    const { basePath, i18n, trailingSlash } = options.nextConfig ?? {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (0, _pathhasprefix.pathHasPrefix)(info.pathname, basePath)) {
        info.pathname = (0, _removepathprefix.removePathPrefix)(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\//, '').replace(/\.json$/, '').split('/');
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? `/${paths.slice(1).join('/')}` : '/';
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, _normalizelocalepath.normalizeLocalePath)(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        info.pathname = result.pathname ?? info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, _normalizelocalepath.normalizeLocalePath)(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map
}),
"[project]/node_modules/next/dist/server/web/next-url.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NextURL", {
    enumerable: true,
    get: function() {
        return NextURL;
    }
});
const _detectdomainlocale = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-rsc] (ecmascript)");
const _formatnextpathnameinfo = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [app-rsc] (ecmascript)");
const _gethostname = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/get-hostname.js [app-rsc] (ecmascript)");
const _getnextpathnameinfo = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [app-rsc] (ecmascript)");
const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, 'localhost'));
}
const Internal = Symbol('NextURLInternal');
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === 'object' && 'pathname' in baseOrOpts || typeof baseOrOpts === 'string') {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ''
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = (0, _getnextpathnameinfo.getNextPathnameInfo)(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !("TURBOPACK compile-time value", void 0),
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = (0, _gethostname.getHostname)(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, _detectdomainlocale.detectDomainLocale)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? '';
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? '';
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw Object.defineProperty(new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
                value: "E597",
                enumerable: false,
                configurable: true
            });
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith('/') ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map
}),
"[project]/node_modules/next/dist/server/web/error.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PageSignatureError: null,
    RemovedPageError: null,
    RemovedUAError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PageSignatureError: function() {
        return PageSignatureError;
    },
    RemovedPageError: function() {
        return RemovedPageError;
    },
    RemovedUAError: function() {
        return RemovedUAError;
    }
});
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/request.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    INTERNALS: null,
    NextRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERNALS: function() {
        return INTERNALS;
    },
    NextRequest: function() {
        return NextRequest;
    }
});
const _nexturl = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/next-url.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/utils.js [app-rsc] (ecmascript)");
const _error = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/error.js [app-rsc] (ecmascript)");
const _cookies = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/cookies.js [app-rsc] (ecmascript)");
const INTERNALS = Symbol('internal request');
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== 'string' && 'url' in input ? input.url : String(input);
        (0, _utils.validateURL)(url);
        // node Request instance requires duplex option when a body
        // is present or it errors, we don't handle this for
        // Request being passed in since it would have already
        // errored if this wasn't configured
        if ("TURBOPACK compile-time truthy", 1) {
            if (init.body && init.duplex !== 'half') {
                init.duplex = 'half';
            }
        }
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new _nexturl.NextURL(url, {
            headers: (0, _utils.toNodeOutgoingHttpHeaders)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _cookies.RequestCookies(this.headers),
            nextUrl,
            url: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : nextUrl.toString()
        };
    }
    [Symbol.for('edge-runtime.inspect.custom')]() {
        return {
            cookies: this.cookies,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new _error.RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new _error.RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map
}),
"[project]/node_modules/next/dist/server/base-http/helpers.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isNodeNextRequest: null,
    isNodeNextResponse: null,
    isWebNextRequest: null,
    isWebNextResponse: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isNodeNextRequest: function() {
        return isNodeNextRequest;
    },
    isNodeNextResponse: function() {
        return isNodeNextResponse;
    },
    isWebNextRequest: function() {
        return isWebNextRequest;
    },
    isWebNextResponse: function() {
        return isWebNextResponse;
    }
});
const isWebNextRequest = (req)=>("TURBOPACK compile-time value", "nodejs") === 'edge';
const isWebNextResponse = (res)=>("TURBOPACK compile-time value", "nodejs") === 'edge';
const isNodeNextRequest = (req)=>("TURBOPACK compile-time value", "nodejs") !== 'edge';
const isNodeNextResponse = (res)=>("TURBOPACK compile-time value", "nodejs") !== 'edge'; //# sourceMappingURL=helpers.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/adapters/next-request.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NextRequestAdapter: null,
    ResponseAborted: null,
    ResponseAbortedName: null,
    createAbortController: null,
    signalFromNodeResponse: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NextRequestAdapter: function() {
        return NextRequestAdapter;
    },
    ResponseAborted: function() {
        return ResponseAborted;
    },
    ResponseAbortedName: function() {
        return ResponseAbortedName;
    },
    createAbortController: function() {
        return createAbortController;
    },
    signalFromNodeResponse: function() {
        return signalFromNodeResponse;
    }
});
const _requestmeta = __turbopack_context__.r("[project]/node_modules/next/dist/server/request-meta.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/utils.js [app-rsc] (ecmascript)");
const _request = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/request.js [app-rsc] (ecmascript)");
const _helpers = __turbopack_context__.r("[project]/node_modules/next/dist/server/base-http/helpers.js [app-rsc] (ecmascript)");
const ResponseAbortedName = 'ResponseAborted';
class ResponseAborted extends Error {
    constructor(...args){
        super(...args), this.name = ResponseAbortedName;
    }
}
function createAbortController(response) {
    const controller = new AbortController();
    // If `finish` fires first, then `res.end()` has been called and the close is
    // just us finishing the stream on our side. If `close` fires first, then we
    // know the client disconnected before we finished.
    response.once('close', ()=>{
        if (response.writableFinished) return;
        controller.abort(new ResponseAborted());
    });
    return controller;
}
function signalFromNodeResponse(response) {
    const { errored, destroyed } = response;
    if (errored || destroyed) {
        return AbortSignal.abort(errored ?? new ResponseAborted());
    }
    const { signal } = createAbortController(response);
    return signal;
}
class NextRequestAdapter {
    static fromBaseNextRequest(request, signal) {
        if (// environment variable check provides dead code elimination.
        ("TURBOPACK compile-time value", "nodejs") === 'edge' && (0, _helpers.isWebNextRequest)(request)) //TURBOPACK unreachable
        ;
        else if (// environment variable check provides dead code elimination.
        ("TURBOPACK compile-time value", "nodejs") !== 'edge' && (0, _helpers.isNodeNextRequest)(request)) {
            return NextRequestAdapter.fromNodeNextRequest(request, signal);
        } else {
            throw Object.defineProperty(new Error('Invariant: Unsupported NextRequest type'), "__NEXT_ERROR_CODE", {
                value: "E345",
                enumerable: false,
                configurable: true
            });
        }
    }
    static fromNodeNextRequest(request, signal) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
            // @ts-expect-error - this is handled by undici, when streams/web land use it instead
            body = request.body;
        }
        let url;
        if (request.url.startsWith('http')) {
            url = new URL(request.url);
        } else {
            // Grab the full URL from the request metadata.
            const base = (0, _requestmeta.getRequestMeta)(request, 'initURL');
            if (!base || !base.startsWith('http')) {
                // Because the URL construction relies on the fact that the URL provided
                // is absolute, we need to provide a base URL. We can't use the request
                // URL because it's relative, so we use a dummy URL instead.
                url = new URL(request.url, 'http://n');
            } else {
                url = new URL(request.url, base);
            }
        }
        return new _request.NextRequest(url, {
            method: request.method,
            headers: (0, _utils.fromNodeOutgoingHttpHeaders)(request.headers),
            duplex: 'half',
            signal,
            // geo
            // ip
            // nextConfig
            // body can not be passed if request was aborted
            // or we get a Request body was disturbed error
            ...signal.aborted ? {} : {
                body
            }
        });
    }
    static fromWebNextRequest(request) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            body = request.body;
        }
        return new _request.NextRequest(request.url, {
            method: request.method,
            headers: (0, _utils.fromNodeOutgoingHttpHeaders)(request.headers),
            duplex: 'half',
            signal: request.request.signal,
            // geo
            // ip
            // nextConfig
            // body can not be passed if request was aborted
            // or we get a Request body was disturbed error
            ...request.request.signal.aborted ? {} : {
                body
            }
        });
    }
} //# sourceMappingURL=next-request.js.map
}),
"[project]/node_modules/next/dist/server/client-component-renderer-logger.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getClientComponentLoaderMetrics: null,
    wrapClientComponentLoader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getClientComponentLoaderMetrics: function() {
        return getClientComponentLoaderMetrics;
    },
    wrapClientComponentLoader: function() {
        return wrapClientComponentLoader;
    }
});
// Combined load times for loading client components
let clientComponentLoadStart = 0;
let clientComponentLoadTimes = 0;
let clientComponentLoadCount = 0;
function wrapClientComponentLoader(ComponentMod) {
    if (!('performance' in globalThis)) {
        return ComponentMod.__next_app__;
    }
    return {
        require: (...args)=>{
            const startTime = performance.now();
            if (clientComponentLoadStart === 0) {
                clientComponentLoadStart = startTime;
            }
            try {
                clientComponentLoadCount += 1;
                return ComponentMod.__next_app__.require(...args);
            } finally{
                clientComponentLoadTimes += performance.now() - startTime;
            }
        },
        loadChunk: (...args)=>{
            const startTime = performance.now();
            const result = ComponentMod.__next_app__.loadChunk(...args);
            // Avoid wrapping `loadChunk`'s result in an extra promise in case something like React depends on its identity.
            // We only need to know when it's settled.
            result.finally(()=>{
                clientComponentLoadTimes += performance.now() - startTime;
            });
            return result;
        }
    };
}
function getClientComponentLoaderMetrics(options = {}) {
    const metrics = clientComponentLoadStart === 0 ? undefined : {
        clientComponentLoadStart,
        clientComponentLoadTimes,
        clientComponentLoadCount
    };
    if (options.reset) {
        clientComponentLoadStart = 0;
        clientComponentLoadTimes = 0;
        clientComponentLoadCount = 0;
    }
    return metrics;
} //# sourceMappingURL=client-component-renderer-logger.js.map
}),
"[project]/node_modules/next/dist/server/pipe-readable.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isAbortError: null,
    pipeToNodeResponse: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isAbortError: function() {
        return isAbortError;
    },
    pipeToNodeResponse: function() {
        return pipeToNodeResponse;
    }
});
const _nextrequest = __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/adapters/next-request.js [app-rsc] (ecmascript)");
const _detachedpromise = __turbopack_context__.r("[project]/node_modules/next/dist/lib/detached-promise.js [app-rsc] (ecmascript)");
const _tracer = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _clientcomponentrendererlogger = __turbopack_context__.r("[project]/node_modules/next/dist/server/client-component-renderer-logger.js [app-rsc] (ecmascript)");
function isAbortError(e) {
    return (e == null ? void 0 : e.name) === 'AbortError' || (e == null ? void 0 : e.name) === _nextrequest.ResponseAbortedName;
}
function createWriterFromResponse(res, waitUntilForEnd) {
    let started = false;
    // Create a promise that will resolve once the response has drained. See
    // https://nodejs.org/api/stream.html#stream_event_drain
    let drained = new _detachedpromise.DetachedPromise();
    function onDrain() {
        drained.resolve();
    }
    res.on('drain', onDrain);
    // If the finish event fires, it means we shouldn't block and wait for the
    // drain event.
    res.once('close', ()=>{
        res.off('drain', onDrain);
        drained.resolve();
    });
    // Create a promise that will resolve once the response has finished. See
    // https://nodejs.org/api/http.html#event-finish_1
    const finished = new _detachedpromise.DetachedPromise();
    res.once('finish', ()=>{
        finished.resolve();
    });
    // Create a writable stream that will write to the response.
    return new WritableStream({
        write: async (chunk)=>{
            // You'd think we'd want to use `start` instead of placing this in `write`
            // but this ensures that we don't actually flush the headers until we've
            // started writing chunks.
            if (!started) {
                started = true;
                if ('performance' in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                    const metrics = (0, _clientcomponentrendererlogger.getClientComponentLoaderMetrics)();
                    if (metrics) {
                        performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, {
                            start: metrics.clientComponentLoadStart,
                            end: metrics.clientComponentLoadStart + metrics.clientComponentLoadTimes
                        });
                    }
                }
                res.flushHeaders();
                (0, _tracer.getTracer)().trace(_constants.NextNodeServerSpan.startResponse, {
                    spanName: 'start response'
                }, ()=>undefined);
            }
            try {
                const ok = res.write(chunk);
                // Added by the `compression` middleware, this is a function that will
                // flush the partially-compressed response to the client.
                if ('flush' in res && typeof res.flush === 'function') {
                    res.flush();
                }
                // If the write returns false, it means there's some backpressure, so
                // wait until it's streamed before continuing.
                if (!ok) {
                    await drained.promise;
                    // Reset the drained promise so that we can wait for the next drain event.
                    drained = new _detachedpromise.DetachedPromise();
                }
            } catch (err) {
                res.end();
                throw Object.defineProperty(new Error('failed to write chunk to response', {
                    cause: err
                }), "__NEXT_ERROR_CODE", {
                    value: "E321",
                    enumerable: false,
                    configurable: true
                });
            }
        },
        abort: (err)=>{
            if (res.writableFinished) return;
            res.destroy(err);
        },
        close: async ()=>{
            // if a waitUntil promise was passed, wait for it to resolve before
            // ending the response.
            if (waitUntilForEnd) {
                await waitUntilForEnd;
            }
            if (res.writableFinished) return;
            res.end();
            return finished.promise;
        }
    });
}
async function pipeToNodeResponse(readable, res, waitUntilForEnd) {
    try {
        // If the response has already errored, then just return now.
        const { errored, destroyed } = res;
        if (errored || destroyed) return;
        // Create a new AbortController so that we can abort the readable if the
        // client disconnects.
        const controller = (0, _nextrequest.createAbortController)(res);
        const writer = createWriterFromResponse(res, waitUntilForEnd);
        await readable.pipeTo(writer, {
            signal: controller.signal
        });
    } catch (err) {
        // If this isn't related to an abort error, re-throw it.
        if (isAbortError(err)) return;
        throw Object.defineProperty(new Error('failed to pipe response', {
            cause: err
        }), "__NEXT_ERROR_CODE", {
            value: "E180",
            enumerable: false,
            configurable: true
        });
    }
} //# sourceMappingURL=pipe-readable.js.map
}),
"[project]/node_modules/next/dist/server/render-result.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RenderResult;
    }
});
const _nodewebstreamshelper = __turbopack_context__.r("[project]/node_modules/next/dist/server/stream-utils/node-web-streams-helper.js [app-rsc] (ecmascript)");
const _pipereadable = __turbopack_context__.r("[project]/node_modules/next/dist/server/pipe-readable.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
class RenderResult {
    static #_ = /**
   * A render result that represents an empty response. This is used to
   * represent a response that was not found or was already sent.
   */ this.EMPTY = new RenderResult(null, {
        metadata: {},
        contentType: null
    });
    /**
   * Creates a new RenderResult instance from a static response.
   *
   * @param value the static response value
   * @param contentType the content type of the response
   * @returns a new RenderResult instance
   */ static fromStatic(value, contentType) {
        return new RenderResult(value, {
            metadata: {},
            contentType
        });
    }
    constructor(response, { contentType, waitUntil, metadata }){
        this.response = response;
        this.contentType = contentType;
        this.metadata = metadata;
        this.waitUntil = waitUntil;
    }
    assignMetadata(metadata) {
        Object.assign(this.metadata, metadata);
    }
    /**
   * Returns true if the response is null. It can be null if the response was
   * not found or was already sent.
   */ get isNull() {
        return this.response === null;
    }
    /**
   * Returns false if the response is a string. It can be a string if the page
   * was prerendered. If it's not, then it was generated dynamically.
   */ get isDynamic() {
        return typeof this.response !== 'string';
    }
    toUnchunkedString(stream = false) {
        if (this.response === null) {
            // If the response is null, return an empty string. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return '';
        }
        if (typeof this.response !== 'string') {
            if (!stream) {
                throw Object.defineProperty(new _invarianterror.InvariantError('dynamic responses cannot be unchunked. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
                    value: "E732",
                    enumerable: false,
                    configurable: true
                });
            }
            return (0, _nodewebstreamshelper.streamToString)(this.readable);
        }
        return this.response;
    }
    /**
   * Returns a readable stream of the response.
   */ get readable() {
        if (this.response === null) {
            // If the response is null, return an empty stream. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return new ReadableStream({
                start (controller) {
                    controller.close();
                }
            });
        }
        if (typeof this.response === 'string') {
            return (0, _nodewebstreamshelper.streamFromString)(this.response);
        }
        if (Buffer.isBuffer(this.response)) {
            return (0, _nodewebstreamshelper.streamFromBuffer)(this.response);
        }
        // If the response is an array of streams, then chain them together.
        if (Array.isArray(this.response)) {
            return (0, _nodewebstreamshelper.chainStreams)(...this.response);
        }
        return this.response;
    }
    /**
   * Coerces the response to an array of streams. This will convert the response
   * to an array of streams if it is not already one.
   *
   * @returns An array of streams
   */ coerce() {
        if (this.response === null) {
            // If the response is null, return an empty stream. This behavior is
            // intentional as we're now providing the `RenderResult.EMPTY` value.
            return [];
        }
        if (typeof this.response === 'string') {
            return [
                (0, _nodewebstreamshelper.streamFromString)(this.response)
            ];
        } else if (Array.isArray(this.response)) {
            return this.response;
        } else if (Buffer.isBuffer(this.response)) {
            return [
                (0, _nodewebstreamshelper.streamFromBuffer)(this.response)
            ];
        } else {
            return [
                this.response
            ];
        }
    }
    /**
   * Unshifts a new stream to the response. This will convert the response to an
   * array of streams if it is not already one and will add the new stream to
   * the start of the array. When this response is piped, all of the streams
   * will be piped one after the other.
   *
   * @param readable The new stream to unshift
   */ unshift(readable) {
        // Coerce the response to an array of streams.
        this.response = this.coerce();
        // Add the new stream to the start of the array.
        this.response.unshift(readable);
    }
    /**
   * Chains a new stream to the response. This will convert the response to an
   * array of streams if it is not already one and will add the new stream to
   * the end. When this response is piped, all of the streams will be piped
   * one after the other.
   *
   * @param readable The new stream to chain
   */ push(readable) {
        // Coerce the response to an array of streams.
        this.response = this.coerce();
        // Add the new stream to the end of the array.
        this.response.push(readable);
    }
    /**
   * Pipes the response to a writable stream. This will close/cancel the
   * writable stream if an error is encountered. If this doesn't throw, then
   * the writable stream will be closed or aborted.
   *
   * @param writable Writable stream to pipe the response to
   */ async pipeTo(writable) {
        try {
            await this.readable.pipeTo(writable, {
                // We want to close the writable stream ourselves so that we can wait
                // for the waitUntil promise to resolve before closing it. If an error
                // is encountered, we'll abort the writable stream if we swallowed the
                // error.
                preventClose: true
            });
            // If there is a waitUntil promise, wait for it to resolve before
            // closing the writable stream.
            if (this.waitUntil) await this.waitUntil;
            // Close the writable stream.
            await writable.close();
        } catch (err) {
            // If this is an abort error, we should abort the writable stream (as we
            // took ownership of it when we started piping). We don't need to re-throw
            // because we handled the error.
            if ((0, _pipereadable.isAbortError)(err)) {
                // Abort the writable stream if an error is encountered.
                await writable.abort(err);
                return;
            }
            // We're not aborting the writer here as when this method throws it's not
            // clear as to how so the caller should assume it's their responsibility
            // to clean up the writer.
            throw err;
        }
    }
    /**
   * Pipes the response to a node response. This will close/cancel the node
   * response if an error is encountered.
   *
   * @param res
   */ async pipeToNodeResponse(res) {
        await (0, _pipereadable.pipeToNodeResponse)(this.readable, res, this.waitUntil);
    }
} //# sourceMappingURL=render-result.js.map
}),
"[project]/node_modules/next/dist/server/route-kind.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouteKind", {
    enumerable: true,
    get: function() {
        return RouteKind;
    }
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}),
"[project]/node_modules/next/dist/server/response-cache/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    fromResponseCacheEntry: null,
    routeKindToIncrementalCacheKind: null,
    toResponseCacheEntry: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fromResponseCacheEntry: function() {
        return fromResponseCacheEntry;
    },
    routeKindToIncrementalCacheKind: function() {
        return routeKindToIncrementalCacheKind;
    },
    toResponseCacheEntry: function() {
        return toResponseCacheEntry;
    }
});
const _types = __turbopack_context__.r("[project]/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)");
const _renderresult = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/node_modules/next/dist/server/render-result.js [app-rsc] (ecmascript)"));
const _routekind = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-kind.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function fromResponseCacheEntry(cacheEntry) {
    var _cacheEntry_value, _cacheEntry_value1;
    return {
        ...cacheEntry,
        value: ((_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) === _types.CachedRouteKind.PAGES ? {
            kind: _types.CachedRouteKind.PAGES,
            html: await cacheEntry.value.html.toUnchunkedString(true),
            pageData: cacheEntry.value.pageData,
            headers: cacheEntry.value.headers,
            status: cacheEntry.value.status
        } : ((_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind) === _types.CachedRouteKind.APP_PAGE ? {
            kind: _types.CachedRouteKind.APP_PAGE,
            html: await cacheEntry.value.html.toUnchunkedString(true),
            postponed: cacheEntry.value.postponed,
            rscData: cacheEntry.value.rscData,
            headers: cacheEntry.value.headers,
            status: cacheEntry.value.status,
            segmentData: cacheEntry.value.segmentData
        } : cacheEntry.value
    };
}
async function toResponseCacheEntry(response) {
    var _response_value, _response_value1;
    if (!response) return null;
    return {
        isMiss: response.isMiss,
        isStale: response.isStale,
        cacheControl: response.cacheControl,
        value: ((_response_value = response.value) == null ? void 0 : _response_value.kind) === _types.CachedRouteKind.PAGES ? {
            kind: _types.CachedRouteKind.PAGES,
            html: _renderresult.default.fromStatic(response.value.html, _constants.HTML_CONTENT_TYPE_HEADER),
            pageData: response.value.pageData,
            headers: response.value.headers,
            status: response.value.status
        } : ((_response_value1 = response.value) == null ? void 0 : _response_value1.kind) === _types.CachedRouteKind.APP_PAGE ? {
            kind: _types.CachedRouteKind.APP_PAGE,
            html: _renderresult.default.fromStatic(response.value.html, _constants.HTML_CONTENT_TYPE_HEADER),
            rscData: response.value.rscData,
            headers: response.value.headers,
            status: response.value.status,
            postponed: response.value.postponed,
            segmentData: response.value.segmentData
        } : response.value
    };
}
function routeKindToIncrementalCacheKind(routeKind) {
    switch(routeKind){
        case _routekind.RouteKind.PAGES:
            return _types.IncrementalCacheKind.PAGES;
        case _routekind.RouteKind.APP_PAGE:
            return _types.IncrementalCacheKind.APP_PAGE;
        case _routekind.RouteKind.IMAGE:
            return _types.IncrementalCacheKind.IMAGE;
        case _routekind.RouteKind.APP_ROUTE:
            return _types.IncrementalCacheKind.APP_ROUTE;
        case _routekind.RouteKind.PAGES_API:
            // Pages Router API routes are not cached in the incremental cache.
            throw Object.defineProperty(new Error(`Unexpected route kind ${routeKind}`), "__NEXT_ERROR_CODE", {
                value: "E64",
                enumerable: false,
                configurable: true
            });
        default:
            return routeKind;
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/next/dist/server/response-cache/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return ResponseCache;
    }
});
0 && __export(__turbopack_context__.r("[project]/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)"));
const _batcher = __turbopack_context__.r("[project]/node_modules/next/dist/lib/batcher.js [app-rsc] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/node_modules/next/dist/lib/scheduler.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/server/response-cache/utils.js [app-rsc] (ecmascript)");
_export_star(__turbopack_context__.r("[project]/node_modules/next/dist/server/response-cache/types.js [app-rsc] (ecmascript)"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
class ResponseCache {
    constructor(minimal_mode){
        this.getBatcher = _batcher.Batcher.create({
            // Ensure on-demand revalidate doesn't block normal requests, it should be
            // safe to run an on-demand revalidate for the same key as a normal request.
            cacheKeyFn: ({ key, isOnDemandRevalidate })=>`${key}-${isOnDemandRevalidate ? '1' : '0'}`,
            // We wait to do any async work until after we've added our promise to
            // `pendingResponses` to ensure that any any other calls will reuse the
            // same promise until we've fully finished our work.
            schedulerFn: _scheduler.scheduleOnNextTick
        });
        this.revalidateBatcher = _batcher.Batcher.create({
            // We wait to do any async work until after we've added our promise to
            // `pendingResponses` to ensure that any any other calls will reuse the
            // same promise until we've fully finished our work.
            schedulerFn: _scheduler.scheduleOnNextTick
        });
        this.minimal_mode = minimal_mode;
    }
    /**
   * Gets the response cache entry for the given key.
   *
   * @param key - The key to get the response cache entry for.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param context - The context for the get request.
   * @returns The response cache entry.
   */ async get(key, responseGenerator, context) {
        var _this_previousCacheItem;
        // If there is no key for the cache, we can't possibly look this up in the
        // cache so just return the result of the response generator.
        if (!key) {
            return responseGenerator({
                hasResolved: false,
                previousCacheEntry: null
            });
        }
        // Check minimal mode cache before doing any other work
        if (this.minimal_mode && ((_this_previousCacheItem = this.previousCacheItem) == null ? void 0 : _this_previousCacheItem.key) === key && this.previousCacheItem.expiresAt > Date.now()) {
            return (0, _utils.toResponseCacheEntry)(this.previousCacheItem.entry);
        }
        const { incrementalCache, isOnDemandRevalidate = false, isFallback = false, isRoutePPREnabled = false, isPrefetch = false, waitUntil, routeKind } = context;
        const response = await this.getBatcher.batch({
            key,
            isOnDemandRevalidate
        }, ({ resolve })=>{
            const promise = this.handleGet(key, responseGenerator, {
                incrementalCache,
                isOnDemandRevalidate,
                isFallback,
                isRoutePPREnabled,
                isPrefetch,
                routeKind
            }, resolve);
            // We need to ensure background revalidates are passed to waitUntil.
            if (waitUntil) waitUntil(promise);
            return promise;
        });
        return (0, _utils.toResponseCacheEntry)(response);
    }
    /**
   * Handles the get request for the response cache.
   *
   * @param key - The key to get the response cache entry for.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param context - The context for the get request.
   * @param resolve - The resolve function to use to resolve the response cache entry.
   * @returns The response cache entry.
   */ async handleGet(key, responseGenerator, context, resolve) {
        let previousIncrementalCacheEntry = null;
        let resolved = false;
        try {
            // Get the previous cache entry if not in minimal mode
            previousIncrementalCacheEntry = !this.minimal_mode ? await context.incrementalCache.get(key, {
                kind: (0, _utils.routeKindToIncrementalCacheKind)(context.routeKind),
                isRoutePPREnabled: context.isRoutePPREnabled,
                isFallback: context.isFallback
            }) : null;
            if (previousIncrementalCacheEntry && !context.isOnDemandRevalidate) {
                resolve(previousIncrementalCacheEntry);
                resolved = true;
                if (!previousIncrementalCacheEntry.isStale || context.isPrefetch) {
                    // The cached value is still valid, so we don't need to update it yet.
                    return previousIncrementalCacheEntry;
                }
            }
            // Revalidate the cache entry
            const incrementalResponseCacheEntry = await this.revalidate(key, context.incrementalCache, context.isRoutePPREnabled, context.isFallback, responseGenerator, previousIncrementalCacheEntry, previousIncrementalCacheEntry !== null && !context.isOnDemandRevalidate);
            // Handle null response
            if (!incrementalResponseCacheEntry) {
                // Unset the previous cache item if it was set so we don't use it again.
                if (this.minimal_mode) this.previousCacheItem = undefined;
                return null;
            }
            // Resolve for on-demand revalidation or if not already resolved
            if (context.isOnDemandRevalidate && !resolved) {
                return incrementalResponseCacheEntry;
            }
            return incrementalResponseCacheEntry;
        } catch (err) {
            // If we've already resolved the cache entry, we can't reject as we
            // already resolved the cache entry so log the error here.
            if (resolved) {
                console.error(err);
                return null;
            }
            throw err;
        }
    }
    /**
   * Revalidates the cache entry for the given key.
   *
   * @param key - The key to revalidate the cache entry for.
   * @param incrementalCache - The incremental cache to use to revalidate the cache entry.
   * @param isRoutePPREnabled - Whether the route is PPR enabled.
   * @param isFallback - Whether the route is a fallback.
   * @param responseGenerator - The response generator to use to generate the response cache entry.
   * @param previousIncrementalCacheEntry - The previous cache entry to use to revalidate the cache entry.
   * @param hasResolved - Whether the response has been resolved.
   * @returns The revalidated cache entry.
   */ async revalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved, waitUntil) {
        return this.revalidateBatcher.batch(key, ()=>{
            const promise = this.handleRevalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved);
            // We need to ensure background revalidates are passed to waitUntil.
            if (waitUntil) waitUntil(promise);
            return promise;
        });
    }
    async handleRevalidate(key, incrementalCache, isRoutePPREnabled, isFallback, responseGenerator, previousIncrementalCacheEntry, hasResolved) {
        try {
            // Generate the response cache entry using the response generator.
            const responseCacheEntry = await responseGenerator({
                hasResolved,
                previousCacheEntry: previousIncrementalCacheEntry,
                isRevalidating: true
            });
            if (!responseCacheEntry) {
                return null;
            }
            // Convert the response cache entry to an incremental response cache entry.
            const incrementalResponseCacheEntry = await (0, _utils.fromResponseCacheEntry)({
                ...responseCacheEntry,
                isMiss: !previousIncrementalCacheEntry
            });
            // We want to persist the result only if it has a cache control value
            // defined.
            if (incrementalResponseCacheEntry.cacheControl) {
                if (this.minimal_mode) {
                    this.previousCacheItem = {
                        key,
                        entry: incrementalResponseCacheEntry,
                        expiresAt: Date.now() + 1000
                    };
                } else {
                    await incrementalCache.set(key, incrementalResponseCacheEntry.value, {
                        cacheControl: incrementalResponseCacheEntry.cacheControl,
                        isRoutePPREnabled,
                        isFallback
                    });
                }
            }
            return incrementalResponseCacheEntry;
        } catch (err) {
            // When a path is erroring we automatically re-set the existing cache
            // with new revalidate and expire times to prevent non-stop retrying.
            if (previousIncrementalCacheEntry == null ? void 0 : previousIncrementalCacheEntry.cacheControl) {
                const revalidate = Math.min(Math.max(previousIncrementalCacheEntry.cacheControl.revalidate || 3, 3), 30);
                const expire = previousIncrementalCacheEntry.cacheControl.expire === undefined ? undefined : Math.max(revalidate + 3, previousIncrementalCacheEntry.cacheControl.expire);
                await incrementalCache.set(key, previousIncrementalCacheEntry.value, {
                    cacheControl: {
                        revalidate: revalidate,
                        expire: expire
                    },
                    isRoutePPREnabled,
                    isFallback
                });
            }
            // We haven't resolved yet, so let's throw to indicate an error.
            throw err;
        }
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/next/dist/server/lib/patch-fetch.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_PATCH_SYMBOL: null,
    createPatchedFetcher: null,
    patchFetch: null,
    validateRevalidate: null,
    validateTags: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_PATCH_SYMBOL: function() {
        return NEXT_PATCH_SYMBOL;
    },
    createPatchedFetcher: function() {
        return createPatchedFetcher;
    },
    patchFetch: function() {
        return patchFetch;
    },
    validateRevalidate: function() {
        return validateRevalidate;
    },
    validateTags: function() {
        return validateTags;
    }
});
const _constants = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/trace/constants.js [app-rsc] (ecmascript)");
const _tracer = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/trace/tracer.js [app-rsc] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/node_modules/next/dist/server/dynamic-rendering-utils.js [app-rsc] (ecmascript)");
const _dedupefetch = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/dedupe-fetch.js [app-rsc] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _responsecache = __turbopack_context__.r("[project]/node_modules/next/dist/server/response-cache/index.js [app-rsc] (ecmascript)");
const _cloneresponse = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/clone-response.js [app-rsc] (ecmascript)");
const _stagedrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/staged-rendering.js [app-rsc] (ecmascript)");
const isEdgeRuntime = ("TURBOPACK compile-time value", "nodejs") === 'edge';
const NEXT_PATCH_SYMBOL = Symbol.for('next-patch');
function isFetchPatched() {
    return globalThis[NEXT_PATCH_SYMBOL] === true;
}
function validateRevalidate(revalidateVal, route) {
    try {
        let normalizedRevalidate = undefined;
        if (revalidateVal === false) {
            normalizedRevalidate = _constants1.INFINITE_CACHE;
        } else if (typeof revalidateVal === 'number' && !isNaN(revalidateVal) && revalidateVal > -1) {
            normalizedRevalidate = revalidateVal;
        } else if (typeof revalidateVal !== 'undefined') {
            throw Object.defineProperty(new Error(`Invalid revalidate value "${revalidateVal}" on "${route}", must be a non-negative number or false`), "__NEXT_ERROR_CODE", {
                value: "E179",
                enumerable: false,
                configurable: true
            });
        }
        return normalizedRevalidate;
    } catch (err) {
        // handle client component error from attempting to check revalidate value
        if (err instanceof Error && err.message.includes('Invalid revalidate')) {
            throw err;
        }
        return undefined;
    }
}
function validateTags(tags, description) {
    const validTags = [];
    const invalidTags = [];
    for(let i = 0; i < tags.length; i++){
        const tag = tags[i];
        if (typeof tag !== 'string') {
            invalidTags.push({
                tag,
                reason: 'invalid type, must be a string'
            });
        } else if (tag.length > _constants1.NEXT_CACHE_TAG_MAX_LENGTH) {
            invalidTags.push({
                tag,
                reason: `exceeded max length of ${_constants1.NEXT_CACHE_TAG_MAX_LENGTH}`
            });
        } else {
            validTags.push(tag);
        }
        if (validTags.length > _constants1.NEXT_CACHE_TAG_MAX_ITEMS) {
            console.warn(`Warning: exceeded max tag count for ${description}, dropped tags:`, tags.slice(i).join(', '));
            break;
        }
    }
    if (invalidTags.length > 0) {
        console.warn(`Warning: invalid tags passed to ${description}: `);
        for (const { tag, reason } of invalidTags){
            console.log(`tag: "${tag}" ${reason}`);
        }
    }
    return validTags;
}
function trackFetchMetric(workStore, ctx) {
    if (!workStore.shouldTrackFetchMetrics) {
        return;
    }
    workStore.fetchMetrics ??= [];
    workStore.fetchMetrics.push({
        ...ctx,
        end: performance.timeOrigin + performance.now(),
        idx: workStore.nextFetchId || 0
    });
}
async function createCachedPrerenderResponse(res, cacheKey, incrementalCacheContext, incrementalCache, revalidate, handleUnlock) {
    // We are prerendering at build time or revalidate time with cacheComponents so we
    // need to buffer the response so we can guarantee it can be read in a
    // microtask.
    const bodyBuffer = await res.arrayBuffer();
    const fetchedData = {
        headers: Object.fromEntries(res.headers.entries()),
        body: Buffer.from(bodyBuffer).toString('base64'),
        status: res.status,
        url: res.url
    };
    // We can skip setting the serverComponentsHmrCache because we aren't in dev
    // mode.
    if (incrementalCacheContext) {
        await incrementalCache.set(cacheKey, {
            kind: _responsecache.CachedRouteKind.FETCH,
            data: fetchedData,
            revalidate
        }, incrementalCacheContext);
    }
    await handleUnlock();
    // We return a new Response to the caller.
    return new Response(bodyBuffer, {
        headers: res.headers,
        status: res.status,
        statusText: res.statusText
    });
}
async function createCachedDynamicResponse(workStore, res, cacheKey, incrementalCacheContext, incrementalCache, serverComponentsHmrCache, revalidate, input, handleUnlock) {
    // We're cloning the response using this utility because there exists a bug in
    // the undici library around response cloning. See the following pull request
    // for more details: https://github.com/vercel/next.js/pull/73274
    const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(res);
    // We are dynamically rendering including dev mode. We want to return the
    // response to the caller as soon as possible because it might stream over a
    // very long time.
    const cacheSetPromise = cloned1.arrayBuffer().then(async (arrayBuffer)=>{
        const bodyBuffer = Buffer.from(arrayBuffer);
        const fetchedData = {
            headers: Object.fromEntries(cloned1.headers.entries()),
            body: bodyBuffer.toString('base64'),
            status: cloned1.status,
            url: cloned1.url
        };
        serverComponentsHmrCache == null ? void 0 : serverComponentsHmrCache.set(cacheKey, fetchedData);
        if (incrementalCacheContext) {
            await incrementalCache.set(cacheKey, {
                kind: _responsecache.CachedRouteKind.FETCH,
                data: fetchedData,
                revalidate
            }, incrementalCacheContext);
        }
    }).catch((error)=>console.warn(`Failed to set fetch cache`, input, error)).finally(handleUnlock);
    const pendingRevalidateKey = `cache-set-${cacheKey}`;
    const pendingRevalidates = workStore.pendingRevalidates ??= {};
    let pendingRevalidatePromise = Promise.resolve();
    if (pendingRevalidateKey in pendingRevalidates) {
        // There is already a pending revalidate entry that we need to await to
        // avoid race conditions.
        pendingRevalidatePromise = pendingRevalidates[pendingRevalidateKey];
    }
    pendingRevalidates[pendingRevalidateKey] = pendingRevalidatePromise.then(()=>cacheSetPromise).finally(()=>{
        // If the pending revalidate is not present in the store, then we have
        // nothing to delete.
        if (!(pendingRevalidates == null ? void 0 : pendingRevalidates[pendingRevalidateKey])) {
            return;
        }
        delete pendingRevalidates[pendingRevalidateKey];
    });
    return cloned2;
}
function createPatchedFetcher(originFetch, { workAsyncStorage, workUnitAsyncStorage }) {
    // Create the patched fetch function.
    const patched = async function fetch(input, init) {
        var _init_method, _init_next;
        let url;
        try {
            url = new URL(input instanceof Request ? input.url : input);
            url.username = '';
            url.password = '';
        } catch  {
            // Error caused by malformed URL should be handled by native fetch
            url = undefined;
        }
        const fetchUrl = (url == null ? void 0 : url.href) ?? '';
        const method = (init == null ? void 0 : (_init_method = init.method) == null ? void 0 : _init_method.toUpperCase()) || 'GET';
        // Do create a new span trace for internal fetches in the
        // non-verbose mode.
        const isInternal = (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) === true;
        const hideSpan = process.env.NEXT_OTEL_FETCH_DISABLED === '1';
        // We don't track fetch metrics for internal fetches
        // so it's not critical that we have a start time, as it won't be recorded.
        // This is to workaround a flaky issue where performance APIs might
        // not be available and will require follow-up investigation.
        const fetchStart = isInternal ? undefined : performance.timeOrigin + performance.now();
        const workStore = workAsyncStorage.getStore();
        const workUnitStore = workUnitAsyncStorage.getStore();
        let cacheSignal = workUnitStore ? (0, _workunitasyncstorageexternal.getCacheSignal)(workUnitStore) : null;
        if (cacheSignal) {
            cacheSignal.beginRead();
        }
        const result = (0, _tracer.getTracer)().trace(isInternal ? _constants.NextNodeServerSpan.internalFetch : _constants.AppRenderSpan.fetch, {
            hideSpan,
            kind: _tracer.SpanKind.CLIENT,
            spanName: [
                'fetch',
                method,
                fetchUrl
            ].filter(Boolean).join(' '),
            attributes: {
                'http.url': fetchUrl,
                'http.method': method,
                'net.peer.name': url == null ? void 0 : url.hostname,
                'net.peer.port': (url == null ? void 0 : url.port) || undefined
            }
        }, async ()=>{
            var _getRequestMeta;
            // If this is an internal fetch, we should not do any special treatment.
            if (isInternal) {
                return originFetch(input, init);
            }
            // If the workStore is not available, we can't do any
            // special treatment of fetch, therefore fallback to the original
            // fetch implementation.
            if (!workStore) {
                return originFetch(input, init);
            }
            // We should also fallback to the original fetch implementation if we
            // are in draft mode, it does not constitute a static generation.
            if (workStore.isDraftMode) {
                return originFetch(input, init);
            }
            const isRequestInput = input && typeof input === 'object' && typeof input.method === 'string';
            const getRequestMeta = (field)=>{
                // If request input is present but init is not, retrieve from input first.
                const value = init == null ? void 0 : init[field];
                return value || (isRequestInput ? input[field] : null);
            };
            let finalRevalidate = undefined;
            const getNextField = (field)=>{
                var _init_next, _init_next1, _input_next;
                return typeof (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next[field]) !== 'undefined' ? init == null ? void 0 : (_init_next1 = init.next) == null ? void 0 : _init_next1[field] : isRequestInput ? (_input_next = input.next) == null ? void 0 : _input_next[field] : undefined;
            };
            // RequestInit doesn't keep extra fields e.g. next so it's
            // only available if init is used separate
            const originalFetchRevalidate = getNextField('revalidate');
            let currentFetchRevalidate = originalFetchRevalidate;
            const tags = validateTags(getNextField('tags') || [], `fetch ${input.toString()}`);
            let revalidateStore;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'prerender':
                    case 'prerender-runtime':
                    // TODO: Stop accumulating tags in client prerender. (fallthrough)
                    case 'prerender-client':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'cache':
                    case 'private-cache':
                        revalidateStore = workUnitStore;
                        break;
                    case 'request':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            if (revalidateStore) {
                if (Array.isArray(tags)) {
                    // Collect tags onto parent caches or parent prerenders.
                    const collectedTags = revalidateStore.tags ?? (revalidateStore.tags = []);
                    for (const tag of tags){
                        if (!collectedTags.includes(tag)) {
                            collectedTags.push(tag);
                        }
                    }
                }
            }
            const implicitTags = workUnitStore == null ? void 0 : workUnitStore.implicitTags;
            let pageFetchCacheMode = workStore.fetchCache;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'unstable-cache':
                        // Inside unstable-cache we treat it the same as force-no-store on
                        // the page.
                        pageFetchCacheMode = 'force-no-store';
                        break;
                    case 'prerender':
                    case 'prerender-client':
                    case 'prerender-runtime':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'request':
                    case 'cache':
                    case 'private-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            const isUsingNoStore = !!workStore.isUnstableNoStore;
            let currentFetchCacheConfig = getRequestMeta('cache');
            let cacheReason = '';
            let cacheWarning;
            if (typeof currentFetchCacheConfig === 'string' && typeof currentFetchRevalidate !== 'undefined') {
                // If the revalidate value conflicts with the cache value, we should warn the user and unset the conflicting values.
                const isConflictingRevalidate = currentFetchCacheConfig === 'force-cache' && currentFetchRevalidate === 0 || // revalidate: >0 or revalidate: false and cache: no-store
                currentFetchCacheConfig === 'no-store' && (currentFetchRevalidate > 0 || currentFetchRevalidate === false);
                if (isConflictingRevalidate) {
                    cacheWarning = `Specified "cache: ${currentFetchCacheConfig}" and "revalidate: ${currentFetchRevalidate}", only one should be specified.`;
                    currentFetchCacheConfig = undefined;
                    currentFetchRevalidate = undefined;
                }
            }
            const hasExplicitFetchCacheOptOut = currentFetchCacheConfig === 'no-cache' || currentFetchCacheConfig === 'no-store' || // the fetch isn't explicitly caching and the segment level cache config signals not to cache
            // note: `pageFetchCacheMode` is also set by being in an unstable_cache context.
            pageFetchCacheMode === 'force-no-store' || pageFetchCacheMode === 'only-no-store';
            // If no explicit fetch cache mode is set, but dynamic = `force-dynamic` is set,
            // we shouldn't consider caching the fetch. This is because the `dynamic` cache
            // is considered a "top-level" cache mode, whereas something like `fetchCache` is more
            // fine-grained. Top-level modes are responsible for setting reasonable defaults for the
            // other configurations.
            const noFetchConfigAndForceDynamic = !pageFetchCacheMode && !currentFetchCacheConfig && !currentFetchRevalidate && workStore.forceDynamic;
            if (// which will signal the cache to not revalidate
            currentFetchCacheConfig === 'force-cache' && typeof currentFetchRevalidate === 'undefined') {
                currentFetchRevalidate = false;
            } else if (hasExplicitFetchCacheOptOut || noFetchConfigAndForceDynamic) {
                currentFetchRevalidate = 0;
            }
            if (currentFetchCacheConfig === 'no-cache' || currentFetchCacheConfig === 'no-store') {
                cacheReason = `cache: ${currentFetchCacheConfig}`;
            }
            finalRevalidate = validateRevalidate(currentFetchRevalidate, workStore.route);
            const _headers = getRequestMeta('headers');
            const initHeaders = typeof (_headers == null ? void 0 : _headers.get) === 'function' ? _headers : new Headers(_headers || {});
            const hasUnCacheableHeader = initHeaders.get('authorization') || initHeaders.get('cookie');
            const isUnCacheableMethod = ![
                'get',
                'head'
            ].includes(((_getRequestMeta = getRequestMeta('method')) == null ? void 0 : _getRequestMeta.toLowerCase()) || 'get');
            /**
         * We automatically disable fetch caching under the following conditions:
         * - Fetch cache configs are not set. Specifically:
         *    - A page fetch cache mode is not set (export const fetchCache=...)
         *    - A fetch cache mode is not set in the fetch call (fetch(url, { cache: ... }))
         *      or the fetch cache mode is set to 'default'
         *    - A fetch revalidate value is not set in the fetch call (fetch(url, { revalidate: ... }))
         * - OR the fetch comes after a configuration that triggered dynamic rendering (e.g., reading cookies())
         *   and the fetch was considered uncacheable (e.g., POST method or has authorization headers)
         */ const hasNoExplicitCacheConfig = pageFetchCacheMode == undefined && // eslint-disable-next-line eqeqeq
            (currentFetchCacheConfig == undefined || // when considering whether to opt into the default "no-cache" fetch semantics,
            // a "default" cache config should be treated the same as no cache config
            currentFetchCacheConfig === 'default') && // eslint-disable-next-line eqeqeq
            currentFetchRevalidate == undefined;
            let autoNoCache = Boolean((hasUnCacheableHeader || isUnCacheableMethod) && (revalidateStore == null ? void 0 : revalidateStore.revalidate) === 0);
            let isImplicitBuildTimeCache = false;
            if (!autoNoCache && hasNoExplicitCacheConfig) {
                // We don't enable automatic no-cache behavior during build-time
                // prerendering so that we can still leverage the fetch cache between
                // export workers.
                if (workStore.isBuildTimePrerendering) {
                    isImplicitBuildTimeCache = true;
                } else {
                    autoNoCache = true;
                }
            }
            // If we have no cache config, and we're in Dynamic I/O prerendering,
            // it'll be a dynamic call. We don't have to issue that dynamic call.
            if (hasNoExplicitCacheConfig && workUnitStore !== undefined) {
                switch(workUnitStore.type){
                    case 'prerender':
                    case 'prerender-runtime':
                    // While we don't want to do caching in the client scope we know the
                    // fetch will be dynamic for cacheComponents so we may as well avoid the
                    // call here. (fallthrough)
                    case 'prerender-client':
                        if (cacheSignal) {
                            cacheSignal.endRead();
                            cacheSignal = null;
                        }
                        return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                    case 'request':
                        if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                            if (cacheSignal) {
                                cacheSignal.endRead();
                                cacheSignal = null;
                            }
                            await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                        }
                        break;
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'cache':
                    case 'private-cache':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            switch(pageFetchCacheMode){
                case 'force-no-store':
                    {
                        cacheReason = 'fetchCache = force-no-store';
                        break;
                    }
                case 'only-no-store':
                    {
                        if (currentFetchCacheConfig === 'force-cache' || typeof finalRevalidate !== 'undefined' && finalRevalidate > 0) {
                            throw Object.defineProperty(new Error(`cache: 'force-cache' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-no-store'`), "__NEXT_ERROR_CODE", {
                                value: "E448",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        cacheReason = 'fetchCache = only-no-store';
                        break;
                    }
                case 'only-cache':
                    {
                        if (currentFetchCacheConfig === 'no-store') {
                            throw Object.defineProperty(new Error(`cache: 'no-store' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-cache'`), "__NEXT_ERROR_CODE", {
                                value: "E521",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        break;
                    }
                case 'force-cache':
                    {
                        if (typeof currentFetchRevalidate === 'undefined' || currentFetchRevalidate === 0) {
                            cacheReason = 'fetchCache = force-cache';
                            finalRevalidate = _constants1.INFINITE_CACHE;
                        }
                        break;
                    }
                case 'default-cache':
                case 'default-no-store':
                case 'auto':
                case undefined:
                    break;
                default:
                    pageFetchCacheMode;
            }
            if (typeof finalRevalidate === 'undefined') {
                if (pageFetchCacheMode === 'default-cache' && !isUsingNoStore) {
                    finalRevalidate = _constants1.INFINITE_CACHE;
                    cacheReason = 'fetchCache = default-cache';
                } else if (pageFetchCacheMode === 'default-no-store') {
                    finalRevalidate = 0;
                    cacheReason = 'fetchCache = default-no-store';
                } else if (isUsingNoStore) {
                    finalRevalidate = 0;
                    cacheReason = 'noStore call';
                } else if (autoNoCache) {
                    finalRevalidate = 0;
                    cacheReason = 'auto no cache';
                } else {
                    // TODO: should we consider this case an invariant?
                    cacheReason = 'auto cache';
                    finalRevalidate = revalidateStore ? revalidateStore.revalidate : _constants1.INFINITE_CACHE;
                }
            } else if (!cacheReason) {
                cacheReason = `revalidate: ${finalRevalidate}`;
            }
            if (// `revalidate: 0` values
            !(workStore.forceStatic && finalRevalidate === 0) && // we don't consider autoNoCache to switch to dynamic for ISR
            !autoNoCache && // If the revalidate value isn't currently set or the value is less
            // than the current revalidate value, we should update the revalidate
            // value.
            revalidateStore && finalRevalidate < revalidateStore.revalidate) {
                // If we were setting the revalidate value to 0, we should try to
                // postpone instead first.
                if (finalRevalidate === 0) {
                    if (workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                if (cacheSignal) {
                                    cacheSignal.endRead();
                                    cacheSignal = null;
                                }
                                return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    if (cacheSignal) {
                                        cacheSignal.endRead();
                                        cacheSignal = null;
                                    }
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `revalidate: 0 fetch ${input} ${workStore.route}`);
                }
                // We only want to set the revalidate store's revalidate time if it
                // was explicitly set for the fetch call, i.e.
                // originalFetchRevalidate.
                if (revalidateStore && originalFetchRevalidate === finalRevalidate) {
                    revalidateStore.revalidate = finalRevalidate;
                }
            }
            const isCacheableRevalidate = typeof finalRevalidate === 'number' && finalRevalidate > 0;
            let cacheKey;
            const { incrementalCache } = workStore;
            let isHmrRefresh = false;
            let serverComponentsHmrCache;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'request':
                    case 'cache':
                    case 'private-cache':
                        isHmrRefresh = workUnitStore.isHmrRefresh ?? false;
                        serverComponentsHmrCache = workUnitStore.serverComponentsHmrCache;
                        break;
                    case 'prerender':
                    case 'prerender-client':
                    case 'prerender-runtime':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            if (incrementalCache && (isCacheableRevalidate || serverComponentsHmrCache)) {
                try {
                    cacheKey = await incrementalCache.generateCacheKey(fetchUrl, isRequestInput ? input : init);
                } catch (err) {
                    console.error(`Failed to generate cache key for`, input);
                }
            }
            const fetchIdx = workStore.nextFetchId ?? 1;
            workStore.nextFetchId = fetchIdx + 1;
            let handleUnlock = ()=>{};
            const doOriginalFetch = async (isStale, cacheReasonOverride)=>{
                const requestInputFields = [
                    'cache',
                    'credentials',
                    'headers',
                    'integrity',
                    'keepalive',
                    'method',
                    'mode',
                    'redirect',
                    'referrer',
                    'referrerPolicy',
                    'window',
                    'duplex',
                    // don't pass through signal when revalidating
                    ...isStale ? [] : [
                        'signal'
                    ]
                ];
                if (isRequestInput) {
                    const reqInput = input;
                    const reqOptions = {
                        body: reqInput._ogBody || reqInput.body
                    };
                    for (const field of requestInputFields){
                        // @ts-expect-error custom fields
                        reqOptions[field] = reqInput[field];
                    }
                    input = new Request(reqInput.url, reqOptions);
                } else if (init) {
                    const { _ogBody, body, signal, ...otherInput } = init;
                    init = {
                        ...otherInput,
                        body: _ogBody || body,
                        signal: isStale ? undefined : signal
                    };
                }
                // add metadata to init without editing the original
                const clonedInit = {
                    ...init,
                    next: {
                        ...init == null ? void 0 : init.next,
                        fetchType: 'origin',
                        fetchIdx
                    }
                };
                return originFetch(input, clonedInit).then(async (res)=>{
                    if (!isStale && fetchStart) {
                        trackFetchMetric(workStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason: cacheReasonOverride || cacheReason,
                            cacheStatus: finalRevalidate === 0 || cacheReasonOverride ? 'skip' : 'miss',
                            cacheWarning,
                            status: res.status,
                            method: clonedInit.method || 'GET'
                        });
                    }
                    if (res.status === 200 && incrementalCache && cacheKey && (isCacheableRevalidate || serverComponentsHmrCache)) {
                        const normalizedRevalidate = finalRevalidate >= _constants1.INFINITE_CACHE ? _constants1.CACHE_ONE_YEAR : finalRevalidate;
                        const incrementalCacheConfig = isCacheableRevalidate ? {
                            fetchCache: true,
                            fetchUrl,
                            fetchIdx,
                            tags,
                            isImplicitBuildTimeCache
                        } : undefined;
                        switch(workUnitStore == null ? void 0 : workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                return createCachedPrerenderResponse(res, cacheKey, incrementalCacheConfig, incrementalCache, normalizedRevalidate, handleUnlock);
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering && workUnitStore.cacheSignal) {
                                    // We're filling caches for a staged render,
                                    // so we need to wait for the response to finish instead of streaming.
                                    return createCachedPrerenderResponse(res, cacheKey, incrementalCacheConfig, incrementalCache, normalizedRevalidate, handleUnlock);
                                }
                            // fallthrough
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                            case undefined:
                                return createCachedDynamicResponse(workStore, res, cacheKey, incrementalCacheConfig, incrementalCache, serverComponentsHmrCache, normalizedRevalidate, input, handleUnlock);
                            default:
                                workUnitStore;
                        }
                    }
                    // we had response that we determined shouldn't be cached so we return it
                    // and don't cache it. This also needs to unlock the cache lock we acquired.
                    await handleUnlock();
                    return res;
                }).catch((error)=>{
                    handleUnlock();
                    throw error;
                });
            };
            let cacheReasonOverride;
            let isForegroundRevalidate = false;
            let isHmrRefreshCache = false;
            if (cacheKey && incrementalCache) {
                let cachedFetchData;
                if (isHmrRefresh && serverComponentsHmrCache) {
                    cachedFetchData = serverComponentsHmrCache.get(cacheKey);
                    isHmrRefreshCache = true;
                }
                if (isCacheableRevalidate && !cachedFetchData) {
                    handleUnlock = await incrementalCache.lock(cacheKey);
                    const entry = workStore.isOnDemandRevalidate ? null : await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate: finalRevalidate,
                        fetchUrl,
                        fetchIdx,
                        tags,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags
                    });
                    if (hasNoExplicitCacheConfig && workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                // We sometimes use the cache to dedupe fetches that do not
                                // specify a cache configuration. In these cases we want to
                                // make sure we still exclude them from prerenders if
                                // cacheComponents is on so we introduce an artificial task boundary
                                // here.
                                await getTimeoutBoundary();
                                break;
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    if (entry) {
                        await handleUnlock();
                    } else {
                        // in dev, incremental cache response will be null in case the browser adds `cache-control: no-cache` in the request headers
                        // TODO: it seems like we also hit this after revalidates in dev?
                        cacheReasonOverride = 'cache-control: no-cache (hard refresh)';
                    }
                    if ((entry == null ? void 0 : entry.value) && entry.value.kind === _responsecache.CachedRouteKind.FETCH) {
                        // when stale and is revalidating we wait for fresh data
                        // so the revalidated entry has the updated data
                        if (workStore.isStaticGeneration && entry.isStale) {
                            isForegroundRevalidate = true;
                        } else {
                            if (entry.isStale) {
                                workStore.pendingRevalidates ??= {};
                                if (!workStore.pendingRevalidates[cacheKey]) {
                                    const pendingRevalidate = doOriginalFetch(true).then(async (response)=>({
                                            body: await response.arrayBuffer(),
                                            headers: response.headers,
                                            status: response.status,
                                            statusText: response.statusText
                                        })).finally(()=>{
                                        workStore.pendingRevalidates ??= {};
                                        delete workStore.pendingRevalidates[cacheKey || ''];
                                    });
                                    // Attach the empty catch here so we don't get a "unhandled
                                    // promise rejection" warning.
                                    pendingRevalidate.catch(console.error);
                                    workStore.pendingRevalidates[cacheKey] = pendingRevalidate;
                                }
                            }
                            cachedFetchData = entry.value.data;
                        }
                    }
                }
                if (cachedFetchData) {
                    if (fetchStart) {
                        trackFetchMetric(workStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason,
                            cacheStatus: isHmrRefreshCache ? 'hmr' : 'hit',
                            cacheWarning,
                            status: cachedFetchData.status || 200,
                            method: (init == null ? void 0 : init.method) || 'GET'
                        });
                    }
                    const response = new Response(Buffer.from(cachedFetchData.body, 'base64'), {
                        headers: cachedFetchData.headers,
                        status: cachedFetchData.status
                    });
                    Object.defineProperty(response, 'url', {
                        value: cachedFetchData.url
                    });
                    return response;
                }
            }
            if ((workStore.isStaticGeneration || ("TURBOPACK compile-time value", "development") === 'development' && ("TURBOPACK compile-time value", false) && workUnitStore && // eslint-disable-next-line no-restricted-syntax
            workUnitStore.type === 'request' && workUnitStore.stagedRendering) && init && typeof init === 'object') {
                const { cache } = init;
                // Delete `cache` property as Cloudflare Workers will throw an error
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                if (cache === 'no-store') {
                    // If enabled, we should bail out of static generation.
                    if (workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                if (cacheSignal) {
                                    cacheSignal.endRead();
                                    cacheSignal = null;
                                }
                                return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    if (cacheSignal) {
                                        cacheSignal.endRead();
                                        cacheSignal = null;
                                    }
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `no-store fetch ${input} ${workStore.route}`);
                }
                const hasNextConfig = 'next' in init;
                const { next = {} } = init;
                if (typeof next.revalidate === 'number' && revalidateStore && next.revalidate < revalidateStore.revalidate) {
                    if (next.revalidate === 0) {
                        // If enabled, we should bail out of static generation.
                        if (workUnitStore) {
                            switch(workUnitStore.type){
                                case 'prerender':
                                case 'prerender-client':
                                case 'prerender-runtime':
                                    return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                                case 'request':
                                    if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                        await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                    }
                                    break;
                                case 'cache':
                                case 'private-cache':
                                case 'unstable-cache':
                                case 'prerender-legacy':
                                case 'prerender-ppr':
                                    break;
                                default:
                                    workUnitStore;
                            }
                        }
                        (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `revalidate: 0 fetch ${input} ${workStore.route}`);
                    }
                    if (!workStore.forceStatic || next.revalidate !== 0) {
                        revalidateStore.revalidate = next.revalidate;
                    }
                }
                if (hasNextConfig) delete init.next;
            }
            // if we are revalidating the whole page via time or on-demand and
            // the fetch cache entry is stale we should still de-dupe the
            // origin hit if it's a cache-able entry
            if (cacheKey && isForegroundRevalidate) {
                const pendingRevalidateKey = cacheKey;
                workStore.pendingRevalidates ??= {};
                let pendingRevalidate = workStore.pendingRevalidates[pendingRevalidateKey];
                if (pendingRevalidate) {
                    const revalidatedResult = await pendingRevalidate;
                    return new Response(revalidatedResult.body, {
                        headers: revalidatedResult.headers,
                        status: revalidatedResult.status,
                        statusText: revalidatedResult.statusText
                    });
                }
                // We used to just resolve the Response and clone it however for
                // static generation with cacheComponents we need the response to be able to
                // be resolved in a microtask and cloning the response will never have
                // a body that can resolve in a microtask in node (as observed through
                // experimentation) So instead we await the body and then when it is
                // available we construct manually cloned Response objects with the
                // body as an ArrayBuffer. This will be resolvable in a microtask
                // making it compatible with cacheComponents.
                const pendingResponse = doOriginalFetch(true, cacheReasonOverride) // We're cloning the response using this utility because there
                // exists a bug in the undici library around response cloning.
                // See the following pull request for more details:
                // https://github.com/vercel/next.js/pull/73274
                .then(_cloneresponse.cloneResponse);
                pendingRevalidate = pendingResponse.then(async (responses)=>{
                    const response = responses[0];
                    return {
                        body: await response.arrayBuffer(),
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText
                    };
                }).finally(()=>{
                    var _workStore_pendingRevalidates;
                    // If the pending revalidate is not present in the store, then
                    // we have nothing to delete.
                    if (!((_workStore_pendingRevalidates = workStore.pendingRevalidates) == null ? void 0 : _workStore_pendingRevalidates[pendingRevalidateKey])) {
                        return;
                    }
                    delete workStore.pendingRevalidates[pendingRevalidateKey];
                });
                // Attach the empty catch here so we don't get a "unhandled promise
                // rejection" warning
                pendingRevalidate.catch(()=>{});
                workStore.pendingRevalidates[pendingRevalidateKey] = pendingRevalidate;
                return pendingResponse.then((responses)=>responses[1]);
            } else {
                return doOriginalFetch(false, cacheReasonOverride);
            }
        });
        if (cacheSignal) {
            try {
                return await result;
            } finally{
                if (cacheSignal) {
                    cacheSignal.endRead();
                }
            }
        }
        return result;
    };
    // Attach the necessary properties to the patched fetch function.
    // We don't use this to determine if the fetch function has been patched,
    // but for external consumers to determine if the fetch function has been
    // patched.
    patched.__nextPatched = true;
    patched.__nextGetStaticStore = ()=>workAsyncStorage;
    patched._nextOriginalFetch = originFetch;
    globalThis[NEXT_PATCH_SYMBOL] = true;
    // Assign the function name also as a name property, so that it's preserved
    // even when mangling is enabled.
    Object.defineProperty(patched, 'name', {
        value: 'fetch',
        writable: false
    });
    return patched;
}
function patchFetch(options) {
    // If we've already patched fetch, we should not patch it again.
    if (isFetchPatched()) return;
    // Grab the original fetch function. We'll attach this so we can use it in
    // the patched fetch function.
    const original = (0, _dedupefetch.createDedupeFetch)(globalThis.fetch);
    // Set the global fetch to the patched fetch.
    globalThis.fetch = createPatchedFetcher(original, options);
}
let currentTimeoutBoundary = null;
function getTimeoutBoundary() {
    if (!currentTimeoutBoundary) {
        currentTimeoutBoundary = new Promise((r)=>{
            setTimeout(()=>{
                currentTimeoutBoundary = null;
                r();
            }, 0);
        });
    }
    return currentTimeoutBoundary;
} //# sourceMappingURL=patch-fetch.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/unstable-cache.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_cache", {
    enumerable: true,
    get: function() {
        return unstable_cache;
    }
});
const _constants = __turbopack_context__.r("[project]/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
const _patchfetch = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/patch-fetch.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _responsecache = __turbopack_context__.r("[project]/node_modules/next/dist/server/response-cache/index.js [app-rsc] (ecmascript)");
let noStoreFetchIdx = 0;
async function cacheNewResult(result, incrementalCache, cacheKey, tags, revalidate, fetchIdx, fetchUrl) {
    await incrementalCache.set(cacheKey, {
        kind: _responsecache.CachedRouteKind.FETCH,
        data: {
            headers: {},
            // TODO: handle non-JSON values?
            body: JSON.stringify(result),
            status: 200,
            url: ''
        },
        revalidate: typeof revalidate !== 'number' ? _constants.CACHE_ONE_YEAR : revalidate
    }, {
        fetchCache: true,
        tags,
        fetchIdx,
        fetchUrl
    });
    return;
}
function unstable_cache(cb, keyParts, options = {}) {
    if (options.revalidate === 0) {
        throw Object.defineProperty(new Error(`Invariant revalidate: 0 can not be passed to unstable_cache(), must be "false" or "> 0" ${cb.toString()}`), "__NEXT_ERROR_CODE", {
            value: "E57",
            enumerable: false,
            configurable: true
        });
    }
    // Validate the tags provided are valid
    const tags = options.tags ? (0, _patchfetch.validateTags)(options.tags, `unstable_cache ${cb.toString()}`) : [];
    // Validate the revalidate options
    (0, _patchfetch.validateRevalidate)(options.revalidate, `unstable_cache ${cb.name || cb.toString()}`);
    // Stash the fixed part of the key at construction time. The invocation key will combine
    // the fixed key with the arguments when actually called
    // @TODO if cb.toString() is long we should hash it
    // @TODO come up with a collision-free way to combine keyParts
    // @TODO consider validating the keyParts are all strings. TS can't provide runtime guarantees
    // and the error produced by accidentally using something that cannot be safely coerced is likely
    // hard to debug
    const fixedKey = `${cb.toString()}-${Array.isArray(keyParts) && keyParts.join(',')}`;
    const cachedCb = async (...args)=>{
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        // We must be able to find the incremental cache otherwise we throw
        const maybeIncrementalCache = (workStore == null ? void 0 : workStore.incrementalCache) || globalThis.__incrementalCache;
        if (!maybeIncrementalCache) {
            throw Object.defineProperty(new Error(`Invariant: incrementalCache missing in unstable_cache ${cb.toString()}`), "__NEXT_ERROR_CODE", {
                value: "E469",
                enumerable: false,
                configurable: true
            });
        }
        const incrementalCache = maybeIncrementalCache;
        const cacheSignal = workUnitStore ? (0, _workunitasyncstorageexternal.getCacheSignal)(workUnitStore) : null;
        if (cacheSignal) {
            cacheSignal.beginRead();
        }
        try {
            // If there's no request store, we aren't in a request (or we're not in
            // app router) and if there's no static generation store, we aren't in app
            // router. Default to an empty pathname and search params when there's no
            // request store or static generation store available.
            const fetchUrlPrefix = workStore && workUnitStore ? getFetchUrlPrefix(workStore, workUnitStore) : '';
            // Construct the complete cache key for this function invocation
            // @TODO stringify is likely not safe here. We will coerce undefined to null which will make
            // the keyspace smaller than the execution space
            const invocationKey = `${fixedKey}-${JSON.stringify(args)}`;
            const cacheKey = await incrementalCache.generateCacheKey(invocationKey);
            // $urlWithPath,$sortedQueryStringKeys,$hashOfEveryThingElse
            const fetchUrl = `unstable_cache ${fetchUrlPrefix} ${cb.name ? ` ${cb.name}` : cacheKey}`;
            const fetchIdx = (workStore ? workStore.nextFetchId : noStoreFetchIdx) ?? 1;
            const implicitTags = workUnitStore == null ? void 0 : workUnitStore.implicitTags;
            const innerCacheStore = {
                type: 'unstable-cache',
                phase: 'render',
                implicitTags,
                draftMode: workUnitStore && workStore && (0, _workunitasyncstorageexternal.getDraftModeProviderForCacheScope)(workStore, workUnitStore)
            };
            if (workStore) {
                workStore.nextFetchId = fetchIdx + 1;
                // We are in an App Router context. We try to return the cached entry if it exists and is valid
                // If the entry is fresh we return it. If the entry is stale we return it but revalidate the entry in
                // the background. If the entry is missing or invalid we generate a new entry and return it.
                let isNestedUnstableCache = false;
                if (workUnitStore) {
                    switch(workUnitStore.type){
                        case 'cache':
                        case 'private-cache':
                        case 'prerender':
                        case 'prerender-runtime':
                        case 'prerender-ppr':
                        case 'prerender-legacy':
                            // We update the store's revalidate property if the option.revalidate is a higher precedence
                            // options.revalidate === undefined doesn't affect timing.
                            // options.revalidate === false doesn't shrink timing. it stays at the maximum.
                            if (typeof options.revalidate === 'number') {
                                if (workUnitStore.revalidate < options.revalidate) {
                                // The store is already revalidating on a shorter time interval, leave it alone
                                } else {
                                    workUnitStore.revalidate = options.revalidate;
                                }
                            }
                            // We need to accumulate the tags for this invocation within the store
                            const collectedTags = workUnitStore.tags;
                            if (collectedTags === null) {
                                workUnitStore.tags = tags.slice();
                            } else {
                                for (const tag of tags){
                                    // @TODO refactor tags to be a set to avoid this O(n) lookup
                                    if (!collectedTags.includes(tag)) {
                                        collectedTags.push(tag);
                                    }
                                }
                            }
                            break;
                        case 'unstable-cache':
                            isNestedUnstableCache = true;
                            break;
                        case 'prerender-client':
                        case 'request':
                            break;
                        default:
                            workUnitStore;
                    }
                }
                if (// we should bypass cache similar to fetches
                !isNestedUnstableCache && workStore.fetchCache !== 'force-no-store' && !workStore.isOnDemandRevalidate && !incrementalCache.isOnDemandRevalidate && !workStore.isDraftMode) {
                    // We attempt to get the current cache entry from the incremental cache.
                    const cacheEntry = await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate: options.revalidate,
                        tags,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags,
                        fetchIdx,
                        fetchUrl
                    });
                    if (cacheEntry && cacheEntry.value) {
                        // The entry exists and has a value
                        if (cacheEntry.value.kind !== _responsecache.CachedRouteKind.FETCH) {
                            // The entry is invalid and we need a special warning
                            // @TODO why do we warn this way? Should this just be an error? How are these errors surfaced
                            // so bugs can be reported
                            // @TODO the invocation key can have sensitive data in it. we should not log this entire object
                            console.error(`Invariant invalid cacheEntry returned for ${invocationKey}`);
                        // will fall through to generating a new cache entry below
                        } else {
                            // We have a valid cache entry so we will be returning it. We also check to see if we need
                            // to background revalidate it by checking if it is stale.
                            const cachedResponse = cacheEntry.value.data.body !== undefined ? JSON.parse(cacheEntry.value.data.body) : undefined;
                            if (cacheEntry.isStale) {
                                if (!workStore.pendingRevalidates) {
                                    workStore.pendingRevalidates = {};
                                }
                                // Check if there's already a pending revalidation to avoid duplicate work
                                if (!workStore.pendingRevalidates[invocationKey]) {
                                    // Create the revalidation promise
                                    const revalidationPromise = _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args).then(async (result)=>{
                                        await cacheNewResult(result, incrementalCache, cacheKey, tags, options.revalidate, fetchIdx, fetchUrl);
                                        return result;
                                    }).catch((err)=>{
                                        // @TODO This error handling seems wrong. We swallow the error?
                                        console.error(`revalidating cache with key: ${invocationKey}`, err);
                                        // Return the stale value on error for foreground revalidation
                                        return cachedResponse;
                                    });
                                    // Attach the empty catch here so we don't get a "unhandled promise
                                    // rejection" warning. (Behavior is matched with patch-fetch)
                                    if (workStore.isStaticGeneration) {
                                        revalidationPromise.catch(()=>{});
                                    }
                                    workStore.pendingRevalidates[invocationKey] = revalidationPromise;
                                }
                                // Check if we need to do foreground revalidation
                                if (workStore.isStaticGeneration) {
                                    // When the page is revalidating and the cache entry is stale,
                                    // we need to wait for fresh data (blocking revalidate)
                                    return workStore.pendingRevalidates[invocationKey];
                                }
                            // Otherwise, we're doing background revalidation - return stale immediately
                            }
                            // We had a valid cache entry so we return it here
                            return cachedResponse;
                        }
                    }
                }
                // If we got this far then we had an invalid cache entry and need to generate a new one
                const result = await _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args);
                if (!workStore.isDraftMode) {
                    if (!workStore.pendingRevalidates) {
                        workStore.pendingRevalidates = {};
                    }
                    // We need to push the cache result promise to pending
                    // revalidates otherwise it won't be awaited and is just
                    // dangling
                    workStore.pendingRevalidates[invocationKey] = cacheNewResult(result, incrementalCache, cacheKey, tags, options.revalidate, fetchIdx, fetchUrl);
                }
                return result;
            } else {
                noStoreFetchIdx += 1;
                // We are in Pages Router or were called outside of a render. We don't have a store
                // so we just call the callback directly when it needs to run.
                // If the entry is fresh we return it. If the entry is stale we return it but revalidate the entry in
                // the background. If the entry is missing or invalid we generate a new entry and return it.
                if (!incrementalCache.isOnDemandRevalidate) {
                    // We aren't doing an on demand revalidation so we check use the cache if valid
                    const cacheEntry = await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate: options.revalidate,
                        tags,
                        fetchIdx,
                        fetchUrl,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags
                    });
                    if (cacheEntry && cacheEntry.value) {
                        // The entry exists and has a value
                        if (cacheEntry.value.kind !== _responsecache.CachedRouteKind.FETCH) {
                            // The entry is invalid and we need a special warning
                            // @TODO why do we warn this way? Should this just be an error? How are these errors surfaced
                            // so bugs can be reported
                            console.error(`Invariant invalid cacheEntry returned for ${invocationKey}`);
                        // will fall through to generating a new cache entry below
                        } else if (!cacheEntry.isStale) {
                            // We have a valid cache entry and it is fresh so we return it
                            return cacheEntry.value.data.body !== undefined ? JSON.parse(cacheEntry.value.data.body) : undefined;
                        }
                    }
                }
                // If we got this far then we had an invalid cache entry and need to generate a new one
                const result = await _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args);
                // we need to wait setting the new cache result here as
                // we don't have pending revalidates on workStore to
                // push to and we can't have a dangling promise
                await cacheNewResult(result, incrementalCache, cacheKey, tags, options.revalidate, fetchIdx, fetchUrl);
                return result;
            }
        } finally{
            if (cacheSignal) {
                cacheSignal.endRead();
            }
        }
    };
    // TODO: once AsyncLocalStorage.run() returns the correct types this override will no longer be necessary
    return cachedCb;
}
function getFetchUrlPrefix(workStore, workUnitStore) {
    switch(workUnitStore.type){
        case 'request':
            const pathname = workUnitStore.url.pathname;
            const searchParams = new URLSearchParams(workUnitStore.url.search);
            const sortedSearch = [
                ...searchParams.keys()
            ].sort((a, b)=>a.localeCompare(b)).map((key)=>`${key}=${searchParams.get(key)}`).join('&');
            return `${pathname}${sortedSearch.length ? '?' : ''}${sortedSearch}`;
        case 'prerender':
        case 'prerender-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            return workStore.route;
        default:
            return workUnitStore;
    }
} //# sourceMappingURL=unstable-cache.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getSortedRouteObjects: null,
    getSortedRoutes: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return getSortedRoutes;
    }
});
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split('/').filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix = '/') {
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[]'), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[...]'), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[[...]]'), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get('[]')._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
            const r = prefix === '/' ? '/' : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw Object.defineProperty(new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`), "__NEXT_ERROR_CODE", {
                    value: "E458",
                    enumerable: false,
                    configurable: true
                });
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get('[...]')._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get('[[...]]')._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw Object.defineProperty(new Error(`Catch-all must be the last part of the URL.`), "__NEXT_ERROR_CODE", {
                value: "E392",
                enumerable: false,
                configurable: true
            });
        }
        // The next segment in the urlPaths list
        let nextSegment = urlPaths[0];
        // Check if the segment matches `[something]`
        if (nextSegment.startsWith('[') && nextSegment.endsWith(']')) {
            // Strip `[` and `]`, leaving only `something`
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith('[') && segmentName.endsWith(']')) {
                // Strip optional `[` and `]`, leaving only `something`
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith('…')) {
                throw Object.defineProperty(new Error(`Detected a three-dot character ('…') at ('${segmentName}'). Did you mean ('...')?`), "__NEXT_ERROR_CODE", {
                    value: "E147",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('...')) {
                // Strip `...`, leaving only `something`
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith('[') || segmentName.endsWith(']')) {
                throw Object.defineProperty(new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E421",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('.')) {
                throw Object.defineProperty(new Error(`Segment names may not start with erroneous periods ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E288",
                    enumerable: false,
                    configurable: true
                });
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    // If the specific segment already has a slug but the slug is not `something`
                    // This prevents collisions like:
                    // pages/[post]/index.js
                    // pages/[id]/index.js
                    // Because currently multiple dynamic params on the same segment level are not supported
                    if (previousSlug !== nextSlug) {
                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
                        throw Object.defineProperty(new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`), "__NEXT_ERROR_CODE", {
                            value: "E337",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw Object.defineProperty(new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E247",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    if (slug.replace(/\W/g, '') === nextSegment.replace(/\W/g, '')) {
                        throw Object.defineProperty(new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E499",
                            enumerable: false,
                            configurable: true
                        });
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`), "__NEXT_ERROR_CODE", {
                            value: "E299",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.optionalRestSlugName = segmentName;
                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
                    nextSegment = '[[...]]';
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                            value: "E300",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.restSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.restSlugName = segmentName;
                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
                    nextSegment = '[...]';
                }
            } else {
                if (isOptional) {
                    throw Object.defineProperty(new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                        value: "E435",
                        enumerable: false,
                        configurable: true
                    });
                }
                handleSlug(this.slugName, segmentName);
                // slugName is kept as it can only be one particular slugName
                this.slugName = segmentName;
                // nextSegment is overwritten to [] so that it can later be sorted specifically
                nextSegment = '[]';
            }
        }
        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
    // Only 1 dynamic segment per nesting level
    // So in the case that is test/integration/dynamic-routing it'll be this:
    // pages/[post]/comments.js
    // pages/blog/[post]/comment/[id].js
    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
    // So in this case `UrlNode` created here has `this.slugName === 'post'`
    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
    // Instead what has to be passed through is the upwards path's dynamic names
    const root = new UrlNode();
    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
    return root.smoosh();
}
function getSortedRouteObjects(objects, getter) {
    // We're assuming here that all the pathnames are unique, that way we can
    // sort the list and use the index as the key.
    const indexes = {};
    const pathnames = [];
    for(let i = 0; i < objects.length; i++){
        const pathname = getter(objects[i]);
        indexes[pathname] = i;
        pathnames[i] = pathname;
    }
    // Sort the pathnames.
    const sorted = getSortedRoutes(pathnames);
    // Map the sorted pathnames back to the original objects using the new sorted
    // index.
    return sorted.map((pathname)=>objects[indexes[pathname]]);
} //# sourceMappingURL=sorted-routes.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isDynamicRoute", {
    enumerable: true,
    get: function() {
        return isDynamicRoute;
    }
});
const _interceptionroutes = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [app-rsc] (ecmascript)");
// Identify /.*[param].*/ in route string
const TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
// Identify /[param]/ in route string
const TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
function isDynamicRoute(route, strict = true) {
    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
    }
    if (strict) {
        return TEST_STRICT_ROUTE.test(route);
    }
    return TEST_ROUTE.test(route);
} //# sourceMappingURL=is-dynamic.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getSortedRouteObjects: null,
    getSortedRoutes: null,
    isDynamicRoute: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return _sortedroutes.getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
    },
    isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
    }
});
const _sortedroutes = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js [app-rsc] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [app-rsc] (ecmascript)"); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    refresh: null,
    revalidatePath: null,
    revalidateTag: null,
    updateTag: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    refresh: function() {
        return refresh;
    },
    revalidatePath: function() {
        return revalidatePath;
    },
    revalidateTag: function() {
        return revalidateTag;
    },
    updateTag: function() {
        return updateTag;
    }
});
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/index.js [app-rsc] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/node_modules/next/dist/lib/constants.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _hooksservercontext = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/hooks-server-context.js [app-rsc] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _actionrevalidationkind = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/action-revalidation-kind.js [app-rsc] (ecmascript)");
function revalidateTag(tag, profile) {
    if (!profile) {
        console.warn('"revalidateTag" without the second argument is now deprecated, add second argument of "max" or use "updateTag". See more info here: https://nextjs.org/docs/messages/revalidate-tag-single-arg');
    }
    return revalidate([
        tag
    ], `revalidateTag ${tag}`, profile);
}
function updateTag(tag) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    // TODO: change this after investigating why phase: 'action' is
    // set for route handlers
    if (!workStore || workStore.page.endsWith('/route')) {
        throw Object.defineProperty(new Error('updateTag can only be called from within a Server Action. ' + 'To invalidate cache tags in Route Handlers or other contexts, use revalidateTag instead. ' + 'See more info here: https://nextjs.org/docs/app/api-reference/functions/updateTag'), "__NEXT_ERROR_CODE", {
            value: "E872",
            enumerable: false,
            configurable: true
        });
    }
    // updateTag uses immediate expiration (no profile) without deprecation warning
    return revalidate([
        tag
    ], `updateTag ${tag}`, undefined);
}
function refresh() {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore || workStore.page.endsWith('/route') || (workUnitStore == null ? void 0 : workUnitStore.phase) !== 'action') {
        throw Object.defineProperty(new Error('refresh can only be called from within a Server Action. ' + 'See more info here: https://nextjs.org/docs/app/api-reference/functions/refresh'), "__NEXT_ERROR_CODE", {
            value: "E870",
            enumerable: false,
            configurable: true
        });
    }
    if (workStore) {
        // The Server Action version of refresh() only revalidates the dynamic data
        // on the client. It doesn't affect cached data.
        workStore.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateDynamicOnly;
    }
}
function revalidatePath(originalPath, type) {
    if (originalPath.length > _constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH) {
        console.warn(`Warning: revalidatePath received "${originalPath}" which exceeded max length of ${_constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH}. See more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
        return;
    }
    let normalizedPath = `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}${originalPath || '/'}`;
    if (type) {
        normalizedPath += `${normalizedPath.endsWith('/') ? '' : '/'}${type}`;
    } else if ((0, _utils.isDynamicRoute)(originalPath)) {
        console.warn(`Warning: a dynamic page path "${originalPath}" was passed to "revalidatePath", but the "type" parameter is missing. This has no effect by default, see more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
    }
    const tags = [
        normalizedPath
    ];
    if (normalizedPath === `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`) {
        tags.push(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`);
    } else if (normalizedPath === `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`) {
        tags.push(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`);
    }
    return revalidate(tags, `revalidatePath ${originalPath}`);
}
function revalidate(tags, expression, profile) {
    var _store_cacheLifeProfiles;
    const store = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!store || !store.incrementalCache) {
        throw Object.defineProperty(new Error(`Invariant: static generation store missing in ${expression}`), "__NEXT_ERROR_CODE", {
            value: "E263",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        if (workUnitStore.phase === 'render') {
            throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" during render which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E7",
                enumerable: false,
                configurable: true
            });
        }
        switch(workUnitStore.type){
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside a "use cache" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                    value: "E181",
                    enumerable: false,
                    configurable: true
                });
            case 'unstable-cache':
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside a function cached with "unstable_cache(...)" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                    value: "E306",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender':
            case 'prerender-runtime':
                // cacheComponents Prerender
                const error = Object.defineProperty(new Error(`Route ${store.route} used ${expression} without first calling \`await connection()\`.`), "__NEXT_ERROR_CODE", {
                    value: "E406",
                    enumerable: false,
                    configurable: true
                });
                return (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(store.route, expression, error, workUnitStore);
            case 'prerender-client':
                throw Object.defineProperty(new _invarianterror.InvariantError(`${expression} must not be used within a client component. Next.js should be preventing ${expression} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E693",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-ppr':
                return (0, _dynamicrendering.postponeWithTracking)(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E558",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    // TODO: This is most likely incorrect. It would lead to the ISR
                    // status being flipped when revalidating a static page with a server
                    // action.
                    workUnitStore.usedDynamic = true;
                // TODO(restart-on-cache-miss): we should do a sync IO error here in dev
                // to match prerender behavior
                }
                break;
            default:
                workUnitStore;
        }
    }
    if (!store.pendingRevalidatedTags) {
        store.pendingRevalidatedTags = [];
    }
    for (const tag of tags){
        const existingIndex = store.pendingRevalidatedTags.findIndex((item)=>{
            if (item.tag !== tag) return false;
            // Compare profiles: both strings, both objects, or both undefined
            if (typeof item.profile === 'string' && typeof profile === 'string') {
                return item.profile === profile;
            }
            if (typeof item.profile === 'object' && typeof profile === 'object') {
                return JSON.stringify(item.profile) === JSON.stringify(profile);
            }
            return item.profile === profile;
        });
        if (existingIndex === -1) {
            store.pendingRevalidatedTags.push({
                tag,
                profile
            });
        }
    }
    // if profile is provided and this is a stale-while-revalidate
    // update we do not mark the path as revalidated so that server
    // actions don't pull their own writes
    const cacheLife = profile && typeof profile === 'object' ? profile : profile && typeof profile === 'string' && (store == null ? void 0 : (_store_cacheLifeProfiles = store.cacheLifeProfiles) == null ? void 0 : _store_cacheLifeProfiles[profile]) ? store.cacheLifeProfiles[profile] : undefined;
    if (!profile || (cacheLife == null ? void 0 : cacheLife.expire) === 0) {
        // TODO: only revalidate if the path matches
        store.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic;
    }
} //# sourceMappingURL=revalidate.js.map
}),
"[project]/node_modules/next/dist/server/web/spec-extension/unstable-no-store.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_noStore", {
    enumerable: true,
    get: function() {
        return unstable_noStore;
    }
});
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _dynamicrendering = __turbopack_context__.r("[project]/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-rsc] (ecmascript)");
function unstable_noStore() {
    const callingExpression = 'unstable_noStore()';
    const store = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!store) {
        // This generally implies we are being called in Pages router. We should probably not support
        // unstable_noStore in contexts outside of `react-server` condition but since we historically
        // have not errored here previously, we maintain that behavior for now.
        return;
    } else if (store.forceStatic) {
        return;
    } else {
        store.isUnstableNoStore = true;
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'prerender':
                case 'prerender-client':
                case 'prerender-runtime':
                    // unstable_noStore() is a noop in Dynamic I/O.
                    return;
                case 'prerender-ppr':
                case 'prerender-legacy':
                case 'request':
                case 'cache':
                case 'private-cache':
                case 'unstable-cache':
                    break;
                default:
                    workUnitStore;
            }
        }
        (0, _dynamicrendering.markCurrentScopeAsDynamic)(store, workUnitStore, callingExpression);
    }
} //# sourceMappingURL=unstable-no-store.js.map
}),
"[project]/node_modules/next/dist/server/use-cache/cache-life.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cacheLife", {
    enumerable: true,
    get: function() {
        return cacheLife;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/invariant-error.js [app-rsc] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
function validateCacheLife(profile) {
    if (profile.stale !== undefined) {
        if (profile.stale === false) {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you want to cache on the client forever ' + 'without checking with the server.'), "__NEXT_ERROR_CODE", {
                value: "E407",
                enumerable: false,
                configurable: true
            });
        } else if (typeof profile.stale !== 'number') {
            throw Object.defineProperty(new Error('The stale option must be a number of seconds.'), "__NEXT_ERROR_CODE", {
                value: "E308",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (profile.revalidate !== undefined) {
        if (profile.revalidate === false) {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you do not want to revalidate by time.'), "__NEXT_ERROR_CODE", {
                value: "E104",
                enumerable: false,
                configurable: true
            });
        } else if (typeof profile.revalidate !== 'number') {
            throw Object.defineProperty(new Error('The revalidate option must be a number of seconds.'), "__NEXT_ERROR_CODE", {
                value: "E233",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (profile.expire !== undefined) {
        if (profile.expire === false) {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you want to cache on the server forever ' + 'without checking with the origin.'), "__NEXT_ERROR_CODE", {
                value: "E658",
                enumerable: false,
                configurable: true
            });
        } else if (typeof profile.expire !== 'number') {
            throw Object.defineProperty(new Error('The expire option must be a number of seconds.'), "__NEXT_ERROR_CODE", {
                value: "E3",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (profile.revalidate !== undefined && profile.expire !== undefined) {
        if (profile.revalidate > profile.expire) {
            throw Object.defineProperty(new Error('If providing both the revalidate and expire options, ' + 'the expire option must be greater than the revalidate option. ' + 'The expire option indicates how many seconds from the start ' + 'until it can no longer be used.'), "__NEXT_ERROR_CODE", {
                value: "E656",
                enumerable: false,
                configurable: true
            });
        }
    }
}
function cacheLife(profile) {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error('`cacheLife()` is only available with the `cacheComponents` config.'), "__NEXT_ERROR_CODE", {
            value: "E887",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    switch(workUnitStore == null ? void 0 : workUnitStore.type){
        case 'prerender':
        case 'prerender-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'unstable-cache':
        case undefined:
            throw Object.defineProperty(new Error('`cacheLife()` can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
                value: "E818",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'private-cache':
            break;
        default:
            workUnitStore;
    }
    if (typeof profile === 'string') {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        if (!workStore) {
            throw Object.defineProperty(new Error('`cacheLife()` can only be called during App Router rendering at the moment.'), "__NEXT_ERROR_CODE", {
                value: "E820",
                enumerable: false,
                configurable: true
            });
        }
        if (!workStore.cacheLifeProfiles) {
            throw Object.defineProperty(new _invarianterror.InvariantError('`cacheLifeProfiles` should always be provided.'), "__NEXT_ERROR_CODE", {
                value: "E817",
                enumerable: false,
                configurable: true
            });
        }
        // TODO: This should be globally available and not require an AsyncLocalStorage.
        const configuredProfile = workStore.cacheLifeProfiles[profile];
        if (configuredProfile === undefined) {
            if (workStore.cacheLifeProfiles[profile.trim()]) {
                throw Object.defineProperty(new Error(`Unknown \`cacheLife()\` profile "${profile}" is not configured in next.config.js\n` + `Did you mean "${profile.trim()}" without the spaces?`), "__NEXT_ERROR_CODE", {
                    value: "E816",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new Error(`Unknown \`cacheLife()\` profile "${profile}" is not configured in next.config.js\n` + 'module.exports = {\n' + '  cacheLife: {\n' + `    "${profile}": ...\n` + '  }\n' + '}'), "__NEXT_ERROR_CODE", {
                value: "E888",
                enumerable: false,
                configurable: true
            });
        }
        profile = configuredProfile;
    } else if (typeof profile !== 'object' || profile === null || Array.isArray(profile)) {
        throw Object.defineProperty(new Error('Invalid `cacheLife()` option. Either pass a profile name or object.'), "__NEXT_ERROR_CODE", {
            value: "E814",
            enumerable: false,
            configurable: true
        });
    } else {
        validateCacheLife(profile);
    }
    if (profile.revalidate !== undefined) {
        // Track the explicit revalidate time.
        if (workUnitStore.explicitRevalidate === undefined || workUnitStore.explicitRevalidate > profile.revalidate) {
            workUnitStore.explicitRevalidate = profile.revalidate;
        }
    }
    if (profile.expire !== undefined) {
        // Track the explicit expire time.
        if (workUnitStore.explicitExpire === undefined || workUnitStore.explicitExpire > profile.expire) {
            workUnitStore.explicitExpire = profile.expire;
        }
    }
    if (profile.stale !== undefined) {
        // Track the explicit stale time.
        if (workUnitStore.explicitStale === undefined || workUnitStore.explicitStale > profile.stale) {
            workUnitStore.explicitStale = profile.stale;
        }
    }
} //# sourceMappingURL=cache-life.js.map
}),
"[project]/node_modules/next/dist/server/use-cache/cache-tag.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cacheTag", {
    enumerable: true,
    get: function() {
        return cacheTag;
    }
});
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _patchfetch = __turbopack_context__.r("[project]/node_modules/next/dist/server/lib/patch-fetch.js [app-rsc] (ecmascript)");
function cacheTag(...tags) {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error('`cacheTag()` is only available with the `cacheComponents` config.'), "__NEXT_ERROR_CODE", {
            value: "E886",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    switch(workUnitStore == null ? void 0 : workUnitStore.type){
        case 'prerender':
        case 'prerender-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'unstable-cache':
        case undefined:
            throw Object.defineProperty(new Error('`cacheTag()` can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
                value: "E819",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'private-cache':
            break;
        default:
            workUnitStore;
    }
    const validTags = (0, _patchfetch.validateTags)(tags, '`cacheTag()`');
    if (!workUnitStore.tags) {
        workUnitStore.tags = validTags;
    } else {
        workUnitStore.tags.push(...validTags);
    }
} //# sourceMappingURL=cache-tag.js.map
}),
"[project]/node_modules/next/cache.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const cacheExports = {
    unstable_cache: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/unstable-cache.js [app-rsc] (ecmascript)").unstable_cache,
    updateTag: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").updateTag,
    revalidateTag: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").revalidateTag,
    revalidatePath: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").revalidatePath,
    refresh: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/revalidate.js [app-rsc] (ecmascript)").refresh,
    unstable_noStore: __turbopack_context__.r("[project]/node_modules/next/dist/server/web/spec-extension/unstable-no-store.js [app-rsc] (ecmascript)").unstable_noStore,
    cacheLife: __turbopack_context__.r("[project]/node_modules/next/dist/server/use-cache/cache-life.js [app-rsc] (ecmascript)").cacheLife,
    cacheTag: __turbopack_context__.r("[project]/node_modules/next/dist/server/use-cache/cache-tag.js [app-rsc] (ecmascript)").cacheTag
};
let didWarnCacheLife = false;
function unstable_cacheLife() {
    if (!didWarnCacheLife) {
        didWarnCacheLife = true;
        const error = new Error('`unstable_cacheLife` was recently stabilized and should be imported as `cacheLife`. The `unstable` prefixed form will be removed in a future version of Next.js.');
        console.error(error);
    }
    return cacheExports.cacheLife.apply(this, arguments);
}
let didWarnCacheTag = false;
function unstable_cacheTag() {
    if (!didWarnCacheTag) {
        didWarnCacheTag = true;
        const error = new Error('`unstable_cacheTag` was recently stabilized and should be imported as `cacheTag`. The `unstable` prefixed form will be removed in a future version of Next.js.');
        console.error(error);
    }
    return cacheExports.cacheTag.apply(this, arguments);
}
cacheExports.unstable_cacheLife = unstable_cacheLife;
cacheExports.unstable_cacheTag = unstable_cacheTag;
// https://nodejs.org/api/esm.html#commonjs-namespaces
// When importing CommonJS modules, the module.exports object is provided as the default export
module.exports = cacheExports;
// make import { xxx } from 'next/cache' work
exports.unstable_cache = cacheExports.unstable_cache;
exports.revalidatePath = cacheExports.revalidatePath;
exports.revalidateTag = cacheExports.revalidateTag;
exports.updateTag = cacheExports.updateTag;
exports.unstable_noStore = cacheExports.unstable_noStore;
exports.cacheLife = cacheExports.cacheLife;
exports.unstable_cacheLife = cacheExports.unstable_cacheLife;
exports.cacheTag = cacheExports.cacheTag;
exports.unstable_cacheTag = cacheExports.unstable_cacheTag;
exports.refresh = cacheExports.refresh;
}),
"[project]/node_modules/qrcode/lib/can-promise.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function() {
    return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};
}),
"[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

let toSJISFunction;
const CODEWORDS_COUNT = [
    0,
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */ exports.getSymbolSize = function getSymbolSize(version) {
    if (!version) throw new Error('"version" cannot be null or undefined');
    if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
    return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */ exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
    return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */ exports.getBCHDigit = function(data) {
    let digit = 0;
    while(data !== 0){
        digit++;
        data >>>= 1;
    }
    return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
    if (typeof f !== 'function') {
        throw new Error('"toSJISFunc" is not a valid function.');
    }
    toSJISFunction = f;
};
exports.isKanjiModeEnabled = function() {
    return typeof toSJISFunction !== 'undefined';
};
exports.toSJIS = function toSJIS(kanji) {
    return toSJISFunction(kanji);
};
}),
"[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.L = {
    bit: 1
};
exports.M = {
    bit: 0
};
exports.Q = {
    bit: 3
};
exports.H = {
    bit: 2
};
function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'l':
        case 'low':
            return exports.L;
        case 'm':
        case 'medium':
            return exports.M;
        case 'q':
        case 'quartile':
            return exports.Q;
        case 'h':
        case 'high':
            return exports.H;
        default:
            throw new Error('Unknown EC Level: ' + string);
    }
}
exports.isValid = function isValid(level) {
    return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}),
"[project]/node_modules/qrcode/lib/core/bit-buffer.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

function BitBuffer() {
    this.buffer = [];
    this.length = 0;
}
BitBuffer.prototype = {
    get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
    },
    put: function(num, length) {
        for(let i = 0; i < length; i++){
            this.putBit((num >>> length - i - 1 & 1) === 1);
        }
    },
    getLengthInBits: function() {
        return this.length;
    },
    putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }
        if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        }
        this.length++;
    }
};
module.exports = BitBuffer;
}),
"[project]/node_modules/qrcode/lib/core/bit-matrix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */ function BitMatrix(size) {
    if (!size || size < 1) {
        throw new Error('BitMatrix size must be defined and greater than 0');
    }
    this.size = size;
    this.data = new Uint8Array(size * size);
    this.reservedBit = new Uint8Array(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */ BitMatrix.prototype.set = function(row, col, value, reserved) {
    const index = row * this.size + col;
    this.data[index] = value;
    if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */ BitMatrix.prototype.get = function(row, col) {
    return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */ BitMatrix.prototype.xor = function(row, col, value) {
    this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */ BitMatrix.prototype.isReserved = function(row, col) {
    return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;
}),
"[project]/node_modules/qrcode/lib/core/alignment-pattern.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */ const getSymbolSize = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)").getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */ exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    const posCount = Math.floor(version / 7) + 2;
    const size = getSymbolSize(version);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [
        size - 7
    ] // Last coord is always (size - 7)
    ;
    for(let i = 1; i < posCount - 1; i++){
        positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6); // First coord is always 6
    return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const coords = [];
    const pos = exports.getRowColCoords(version);
    const posLength = pos.length;
    for(let i = 0; i < posLength; i++){
        for(let j = 0; j < posLength; j++){
            // Skip if position is occupied by finder patterns
            if (i === 0 && j === 0 || i === 0 && j === posLength - 1 || i === posLength - 1 && j === 0) {
                continue;
            }
            coords.push([
                pos[i],
                pos[j]
            ]);
        }
    }
    return coords;
};
}),
"[project]/node_modules/qrcode/lib/core/finder-pattern.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const getSymbolSize = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)").getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const size = getSymbolSize(version);
    return [
        // top-left
        [
            0,
            0
        ],
        // top-right
        [
            size - FINDER_PATTERN_SIZE,
            0
        ],
        // bottom-left
        [
            0,
            size - FINDER_PATTERN_SIZE
        ]
    ];
};
}),
"[project]/node_modules/qrcode/lib/core/mask-pattern.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Data mask pattern reference
 * @type {Object}
 */ exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */ const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */ exports.isValid = function isValid(mask) {
    return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */ exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/ exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for(let row = 0; row < size; row++){
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for(let col = 0; col < size; col++){
            let module = data.get(row, col);
            if (module === lastCol) {
                sameCountCol++;
            } else {
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                lastCol = module;
                sameCountCol = 1;
            }
            module = data.get(col, row);
            if (module === lastRow) {
                sameCountRow++;
            } else {
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                lastRow = module;
                sameCountRow = 1;
            }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */ exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for(let row = 0; row < size - 1; row++){
        for(let col = 0; col < size - 1; col++){
            const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0) points++;
        }
    }
    return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */ exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for(let row = 0; row < size; row++){
        bitsCol = bitsRow = 0;
        for(let col = 0; col < size; col++){
            bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
            if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
            bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
            if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
        }
    }
    return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */ exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for(let i = 0; i < modulesCount; i++)darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */ function getMaskAt(maskPattern, i, j) {
    switch(maskPattern){
        case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
            return i % 2 === 0;
        case exports.Patterns.PATTERN010:
            return j % 3 === 0;
        case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
            throw new Error('bad maskPattern:' + maskPattern);
    }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */ exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for(let col = 0; col < size; col++){
        for(let row = 0; row < size; row++){
            if (data.isReserved(row, col)) continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
        }
    }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */ exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for(let p = 0; p < numPatterns; p++){
        setupFormatFunc(p);
        exports.applyMask(p, data);
        // Calculate penalty
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        // Undo previously applied mask
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
        }
    }
    return bestPattern;
};
}),
"[project]/node_modules/qrcode/lib/core/error-correction-code.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const ECLevel = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-rsc] (ecmascript)");
const EC_BLOCKS_TABLE = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
];
const EC_CODEWORDS_TABLE = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */ exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */ exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
}),
"[project]/node_modules/qrcode/lib/core/galois-field.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
    let x = 1;
    for(let i = 0; i < 255; i++){
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1; // multiply by 2
        // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
        // This means that when a number is 256 or larger, it should be XORed with 0x11D.
        if (x & 0x100) {
            x ^= 0x11D;
        }
    }
    // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
    // stay inside the bounds (because we will mainly use this table for the multiplication of
    // two GF numbers, no more).
    // @see {@link mul}
    for(let i = 255; i < 512; i++){
        EXP_TABLE[i] = EXP_TABLE[i - 255];
    }
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.log = function log(n) {
    if (n < 1) throw new Error('log(' + n + ')');
    return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.exp = function exp(n) {
    return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */ exports.mul = function mul(x, y) {
    if (x === 0 || y === 0) return 0;
    // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
    // @see {@link initTables}
    return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
}),
"[project]/node_modules/qrcode/lib/core/polynomial.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const GF = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/galois-field.js [app-rsc] (ecmascript)");
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */ exports.mul = function mul(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for(let i = 0; i < p1.length; i++){
        for(let j = 0; j < p2.length; j++){
            coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
    }
    return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */ exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while(result.length - divisor.length >= 0){
        const coeff = result[0];
        for(let i = 0; i < divisor.length; i++){
            result[i] ^= GF.mul(divisor[i], coeff);
        }
        // remove all zeros from buffer head
        let offset = 0;
        while(offset < result.length && result[offset] === 0)offset++;
        result = result.slice(offset);
    }
    return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */ exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([
        1
    ]);
    for(let i = 0; i < degree; i++){
        poly = exports.mul(poly, new Uint8Array([
            1,
            GF.exp(i)
        ]));
    }
    return poly;
};
}),
"[project]/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Polynomial = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/polynomial.js [app-rsc] (ecmascript)");
function ReedSolomonEncoder(degree) {
    this.genPoly = undefined;
    this.degree = degree;
    if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */ ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
    // create an irreducible generator polynomial
    this.degree = degree;
    this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */ ReedSolomonEncoder.prototype.encode = function encode(data) {
    if (!this.genPoly) {
        throw new Error('Encoder not initialized');
    }
    // Calculate EC for this data block
    // extends data size to data+genPoly size
    const paddedData = new Uint8Array(data.length + this.degree);
    paddedData.set(data);
    // The error correction codewords are the remainder after dividing the data codewords
    // by a generator polynomial
    const remainder = Polynomial.mod(paddedData, this.genPoly);
    // return EC data blocks (last n byte, where n is the degree of genPoly)
    // If coefficients number in remainder are less than genPoly degree,
    // pad with 0s to the left to reach the needed number of coefficients
    const start = this.degree - remainder.length;
    if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
    }
    return remainder;
};
module.exports = ReedSolomonEncoder;
}),
"[project]/node_modules/qrcode/lib/core/version-check.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */ exports.isValid = function isValid(version) {
    return !isNaN(version) && version >= 1 && version <= 40;
};
}),
"[project]/node_modules/qrcode/lib/core/regex.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');
const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
exports.testKanji = function testKanji(str) {
    return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
    return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
    return TEST_ALPHANUMERIC.test(str);
};
}),
"[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const VersionCheck = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/version-check.js [app-rsc] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/regex.js [app-rsc] (ecmascript)");
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */ exports.NUMERIC = {
    id: 'Numeric',
    bit: 1 << 0,
    ccBits: [
        10,
        12,
        14
    ]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */ exports.ALPHANUMERIC = {
    id: 'Alphanumeric',
    bit: 1 << 1,
    ccBits: [
        9,
        11,
        13
    ]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */ exports.BYTE = {
    id: 'Byte',
    bit: 1 << 2,
    ccBits: [
        8,
        16,
        16
    ]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */ exports.KANJI = {
    id: 'Kanji',
    bit: 1 << 3,
    ccBits: [
        8,
        10,
        12
    ]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */ exports.MIXED = {
    bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */ exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid version: ' + version);
    }
    if (version >= 1 && version < 10) return mode.ccBits[0];
    else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */ exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr)) return exports.KANJI;
    else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */ exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error('Invalid mode');
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */ exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */ function fromString(string) {
    if (typeof string !== 'string') {
        throw new Error('Param is not a string');
    }
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'numeric':
            return exports.NUMERIC;
        case 'alphanumeric':
            return exports.ALPHANUMERIC;
        case 'kanji':
            return exports.KANJI;
        case 'byte':
            return exports.BYTE;
        default:
            throw new Error('Unknown mode: ' + string);
    }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */ exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
        return value;
    }
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};
}),
"[project]/node_modules/qrcode/lib/core/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-code.js [app-rsc] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-rsc] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)");
const VersionCheck = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/version-check.js [app-rsc] (ecmascript)");
// Generator polynomial used to encode version information
const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
const G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
        }
    }
    return undefined;
}
function getReservedBitsCount(mode, version) {
    // Character count indicator + mode indicator bits
    return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
    let totalBits = 0;
    segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
        }
    }
    return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */ exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
    }
    return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */ exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
    if (!VersionCheck.isValid(version)) {
        throw new Error('Invalid QR Code version');
    }
    // Use Byte mode as default
    if (typeof mode === 'undefined') mode = Mode.BYTE;
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode === Mode.MIXED) return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
    // Return max number of storable codewords
    switch(mode){
        case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
            return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
            return Math.floor(usableBits / 8);
    }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */ exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
    let seg;
    const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
    if (Array.isArray(data)) {
        if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
            return 1;
        }
        seg = data[0];
    } else {
        seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */ exports.getEncodedBits = function getEncodedBits(version) {
    if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error('Invalid QR Code version');
    }
    let d = version << 12;
    while(Utils.getBCHDigit(d) - G18_BCH >= 0){
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
    }
    return version << 12 | d;
};
}),
"[project]/node_modules/qrcode/lib/core/format-info.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)");
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */ exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
    const data = errorCorrectionLevel.bit << 3 | mask;
    let d = data << 10;
    while(Utils.getBCHDigit(d) - G15_BCH >= 0){
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
    }
    // xor final data with mask pattern in order to ensure that
    // no combination of Error Correction Level and data mask pattern
    // will result in an all-zero data string
    return (data << 10 | d) ^ G15_MASK;
};
}),
"[project]/node_modules/qrcode/lib/core/numeric-data.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)");
function NumericData(data) {
    this.mode = Mode.NUMERIC;
    this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
    return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
    return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
    let i, group, value;
    // The input data string is divided into groups of three digits,
    // and each group is converted to its 10-bit binary equivalent.
    for(i = 0; i + 3 <= this.data.length; i += 3){
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
    }
    // If the number of input digits is not an exact multiple of three,
    // the final one or two digits are converted to 4 or 7 bits respectively.
    const remainingNum = this.data.length - i;
    if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
    }
};
module.exports = NumericData;
}),
"[project]/node_modules/qrcode/lib/core/alphanumeric-data.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)");
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */ const ALPHA_NUM_CHARS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    ' ',
    '$',
    '%',
    '*',
    '+',
    '-',
    '.',
    '/',
    ':'
];
function AlphanumericData(data) {
    this.mode = Mode.ALPHANUMERIC;
    this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
    return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
    return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
    let i;
    // Input data characters are divided into groups of two characters
    // and encoded as 11-bit binary codes.
    for(i = 0; i + 2 <= this.data.length; i += 2){
        // The character value of the first character is multiplied by 45
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        // The character value of the second digit is added to the product
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        // The sum is then stored as 11-bit binary number
        bitBuffer.put(value, 11);
    }
    // If the number of input data characters is not a multiple of two,
    // the character value of the final character is encoded as a 6-bit binary number.
    if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
    }
};
module.exports = AlphanumericData;
}),
"[project]/node_modules/qrcode/lib/core/byte-data.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)");
function ByteData(data) {
    this.mode = Mode.BYTE;
    if (typeof data === 'string') {
        this.data = new TextEncoder().encode(data);
    } else {
        this.data = new Uint8Array(data);
    }
}
ByteData.getBitsLength = function getBitsLength(length) {
    return length * 8;
};
ByteData.prototype.getLength = function getLength() {
    return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
    return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer) {
    for(let i = 0, l = this.data.length; i < l; i++){
        bitBuffer.put(this.data[i], 8);
    }
};
module.exports = ByteData;
}),
"[project]/node_modules/qrcode/lib/core/kanji-data.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)");
function KanjiData(data) {
    this.mode = Mode.KANJI;
    this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
    return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
    return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
    return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer) {
    let i;
    // In the Shift JIS system, Kanji characters are represented by a two byte combination.
    // These byte values are shifted from the JIS X 0208 values.
    // JIS X 0208 gives details of the shift coded representation.
    for(i = 0; i < this.data.length; i++){
        let value = Utils.toSJIS(this.data[i]);
        // For characters with Shift JIS values from 0x8140 to 0x9FFC:
        if (value >= 0x8140 && value <= 0x9FFC) {
            // Subtract 0x8140 from Shift JIS value
            value -= 0x8140;
        // For characters with Shift JIS values from 0xE040 to 0xEBBF
        } else if (value >= 0xE040 && value <= 0xEBBF) {
            // Subtract 0xC140 from Shift JIS value
            value -= 0xC140;
        } else {
            throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
        }
        // Multiply most significant byte of result by 0xC0
        // and add least significant byte to product
        value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);
        // Convert result to a 13-bit binary string
        bitBuffer.put(value, 13);
    }
};
module.exports = KanjiData;
}),
"[project]/node_modules/dijkstrajs/dijkstra.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/ var dijkstra = {
    single_source_shortest_paths: function(graph, s, d) {
        // Predecessor map for each node that has been encountered.
        // node ID => predecessor node ID
        var predecessors = {};
        // Costs of shortest paths from s to all nodes encountered.
        // node ID => cost
        var costs = {};
        costs[s] = 0;
        // Costs of shortest paths from s to all nodes encountered; differs from
        // `costs` in that it provides easy access to the node that currently has
        // the known shortest path from s.
        // XXX: Do we actually need both `costs` and `open`?
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while(!open.empty()){
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            // Get nodes adjacent to u...
            adjacent_nodes = graph[u] || {};
            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for(v in adjacent_nodes){
                if (adjacent_nodes.hasOwnProperty(v)) {
                    // Get the cost of the edge running from u to v.
                    cost_of_e = adjacent_nodes[v];
                    // Cost of s to u plus the cost of u to v across e--this is *a*
                    // cost from s to v that may or may not be less than the current
                    // known cost to v.
                    cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                    // If we haven't visited v yet OR if the current known cost from s to
                    // v is greater than the new cost we just found (cost of s to u plus
                    // cost of u to v across e), update v's cost in the cost list and
                    // update v's predecessor in the predecessor list (it's now u).
                    cost_of_s_to_v = costs[v];
                    first_visit = typeof costs[v] === 'undefined';
                    if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                        costs[v] = cost_of_s_to_u_plus_cost_of_e;
                        open.push(v, cost_of_s_to_u_plus_cost_of_e);
                        predecessors[v] = u;
                    }
                }
            }
        }
        if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
            var msg = [
                'Could not find a path from ',
                s,
                ' to ',
                d,
                '.'
            ].join('');
            throw new Error(msg);
        }
        return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while(u){
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
    },
    find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    /**
   * A very naive priority queue implementation.
   */ PriorityQueue: {
        make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for(key in T){
                if (T.hasOwnProperty(key)) {
                    t[key] = T[key];
                }
            }
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
        },
        default_sorter: function(a, b) {
            return a.cost - b.cost;
        },
        /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */ push: function(value, cost) {
            var item = {
                value: value,
                cost: cost
            };
            this.queue.push(item);
            this.queue.sort(this.sorter);
        },
        /**
     * Return the highest priority element in the queue.
     */ pop: function() {
            return this.queue.shift();
        },
        empty: function() {
            return this.queue.length === 0;
        }
    }
};
// node.js module exports
if ("TURBOPACK compile-time truthy", 1) {
    module.exports = dijkstra;
}
}),
"[project]/node_modules/qrcode/lib/core/segments.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)");
const NumericData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/numeric-data.js [app-rsc] (ecmascript)");
const AlphanumericData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/alphanumeric-data.js [app-rsc] (ecmascript)");
const ByteData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/byte-data.js [app-rsc] (ecmascript)");
const KanjiData = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/kanji-data.js [app-rsc] (ecmascript)");
const Regex = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/regex.js [app-rsc] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)");
const dijkstra = __turbopack_context__.r("[project]/node_modules/dijkstrajs/dijkstra.js [app-rsc] (ecmascript)");
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */ function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */ function getSegments(regex, mode, str) {
    const segments = [];
    let result;
    while((result = regex.exec(str)) !== null){
        segments.push({
            data: result[0],
            index: result.index,
            mode: mode,
            length: result[0].length
        });
    }
    return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */ function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
    } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
    }).map(function(obj) {
        return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
        };
    });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */ function getSegmentBitsLength(length, mode) {
    switch(mode){
        case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
            return KanjiData.getBitsLength(length);
        case Mode.BYTE:
            return ByteData.getBitsLength(length);
    }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
        }
        acc.push(curr);
        return acc;
    }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function buildNodes(segs) {
    const nodes = [];
    for(let i = 0; i < segs.length; i++){
        const seg = segs[i];
        switch(seg.mode){
            case Mode.NUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.ALPHANUMERIC,
                        length: seg.length
                    },
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.ALPHANUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.KANJI:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
                break;
            case Mode.BYTE:
                nodes.push([
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
        }
    }
    return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */ function buildGraph(nodes, version) {
    const table = {};
    const graph = {
        start: {}
    };
    let prevNodeIds = [
        'start'
    ];
    for(let i = 0; i < nodes.length; i++){
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for(let j = 0; j < nodeGroup.length; j++){
            const node = nodeGroup[j];
            const key = '' + i + j;
            currentNodeIds.push(key);
            table[key] = {
                node: node,
                lastCount: 0
            };
            graph[key] = {};
            for(let n = 0; n < prevNodeIds.length; n++){
                const prevNodeId = prevNodeIds[n];
                if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                    graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                    table[prevNodeId].lastCount += node.length;
                } else {
                    if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                    graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
                }
            }
        }
        prevNodeIds = currentNodeIds;
    }
    for(let n = 0; n < prevNodeIds.length; n++){
        graph[prevNodeIds[n]].end = 0;
    }
    return {
        map: graph,
        table: table
    };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */ function buildSingleSegment(data, modesHint) {
    let mode;
    const bestMode = Mode.getBestModeForData(data);
    mode = Mode.from(modesHint, bestMode);
    // Make sure data can be encoded
    if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
    }
    // Use Mode.BYTE if Kanji support is disabled
    if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
    }
    switch(mode){
        case Mode.NUMERIC:
            return new NumericData(data);
        case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
        case Mode.KANJI:
            return new KanjiData(data);
        case Mode.BYTE:
            return new ByteData(data);
    }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */ exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
        if (typeof seg === 'string') {
            acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
    }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */ exports.fromString = function fromString(data, version) {
    const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version);
    const path = dijkstra.find_path(graph.map, 'start', 'end');
    const optimizedSegs = [];
    for(let i = 1; i < path.length - 1; i++){
        optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */ exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};
}),
"[project]/node_modules/qrcode/lib/core/qrcode.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/utils.js [app-rsc] (ecmascript)");
const ECLevel = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-level.js [app-rsc] (ecmascript)");
const BitBuffer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/bit-buffer.js [app-rsc] (ecmascript)");
const BitMatrix = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/bit-matrix.js [app-rsc] (ecmascript)");
const AlignmentPattern = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/alignment-pattern.js [app-rsc] (ecmascript)");
const FinderPattern = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/finder-pattern.js [app-rsc] (ecmascript)");
const MaskPattern = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mask-pattern.js [app-rsc] (ecmascript)");
const ECCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/error-correction-code.js [app-rsc] (ecmascript)");
const ReedSolomonEncoder = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/reed-solomon-encoder.js [app-rsc] (ecmascript)");
const Version = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/version.js [app-rsc] (ecmascript)");
const FormatInfo = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/format-info.js [app-rsc] (ecmascript)");
const Mode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/mode.js [app-rsc] (ecmascript)");
const Segments = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/segments.js [app-rsc] (ecmascript)");
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/ /**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupFinderPattern(matrix, version) {
    const size = matrix.size;
    const pos = FinderPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -1; r <= 7; r++){
            if (row + r <= -1 || size <= row + r) continue;
            for(let c = -1; c <= 7; c++){
                if (col + c <= -1 || size <= col + c) continue;
                if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */ function setupTimingPattern(matrix) {
    const size = matrix.size;
    for(let r = 8; r < size - 8; r++){
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
    }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupAlignmentPattern(matrix, version) {
    const pos = AlignmentPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -2; r <= 2; r++){
            for(let c = -2; c <= 2; c++){
                if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                    matrix.set(row + r, col + c, true, true);
                } else {
                    matrix.set(row + r, col + c, false, true);
                }
            }
        }
    }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupVersionInfo(matrix, version) {
    const size = matrix.size;
    const bits = Version.getEncodedBits(version);
    let row, col, mod;
    for(let i = 0; i < 18; i++){
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
    }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */ function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
    const size = matrix.size;
    const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
    let i, mod;
    for(i = 0; i < 15; i++){
        mod = (bits >> i & 1) === 1;
        // vertical
        if (i < 6) {
            matrix.set(i, 8, mod, true);
        } else if (i < 8) {
            matrix.set(i + 1, 8, mod, true);
        } else {
            matrix.set(size - 15 + i, 8, mod, true);
        }
        // horizontal
        if (i < 8) {
            matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
            matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
            matrix.set(8, 15 - i - 1, mod, true);
        }
    }
    // fixed module
    matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */ function setupData(matrix, data) {
    const size = matrix.size;
    let inc = -1;
    let row = size - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for(let col = size - 1; col > 0; col -= 2){
        if (col === 6) col--;
        while(true){
            for(let c = 0; c < 2; c++){
                if (!matrix.isReserved(row, col - c)) {
                    let dark = false;
                    if (byteIndex < data.length) {
                        dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                    }
                    matrix.set(row, col - c, dark);
                    bitIndex--;
                    if (bitIndex === -1) {
                        byteIndex++;
                        bitIndex = 7;
                    }
                }
            }
            row += inc;
            if (row < 0 || size <= row) {
                row -= inc;
                inc = -inc;
                break;
            }
        }
    }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */ function createData(version, errorCorrectionLevel, segments) {
    // Prepare data buffer
    const buffer = new BitBuffer();
    segments.forEach(function(data) {
        // prefix data with mode indicator (4 bits)
        buffer.put(data.mode.bit, 4);
        // Prefix data with character count indicator.
        // The character count indicator is a string of bits that represents the
        // number of characters that are being encoded.
        // The character count indicator must be placed after the mode indicator
        // and must be a certain number of bits long, depending on the QR version
        // and data mode
        // @see {@link Mode.getCharCountIndicator}.
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        // add binary data sequence to buffer
        data.write(buffer);
    });
    // Calculate required number of bits
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    // Add a terminator.
    // If the bit string is shorter than the total number of required bits,
    // a terminator of up to four 0s must be added to the right side of the string.
    // If the bit string is more than four bits shorter than the required number of bits,
    // add four 0s to the end.
    if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
    }
    // If the bit string is fewer than four bits shorter, add only the number of 0s that
    // are needed to reach the required number of bits.
    // After adding the terminator, if the number of bits in the string is not a multiple of 8,
    // pad the string on the right with 0s to make the string's length a multiple of 8.
    while(buffer.getLengthInBits() % 8 !== 0){
        buffer.putBit(0);
    }
    // Add pad bytes if the string is still shorter than the total number of required bits.
    // Extend the buffer to fill the data capacity of the symbol corresponding to
    // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
    // and 00010001 (0x11) alternately.
    const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
    for(let i = 0; i < remainingByte; i++){
        buffer.put(i % 2 ? 0x11 : 0xEC, 8);
    }
    return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */ function createCodewords(bitBuffer, version, errorCorrectionLevel) {
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewords = totalCodewords - ecTotalCodewords;
    // Total number of blocks
    const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
    // Calculate how many blocks each group should contain
    const blocksInGroup2 = totalCodewords % ecTotalBlocks;
    const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
    const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
    // Number of EC codewords is the same for both groups
    const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
    // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
    const rs = new ReedSolomonEncoder(ecCount);
    let offset = 0;
    const dcData = new Array(ecTotalBlocks);
    const ecData = new Array(ecTotalBlocks);
    let maxDataSize = 0;
    const buffer = new Uint8Array(bitBuffer.buffer);
    // Divide the buffer into the required number of blocks
    for(let b = 0; b < ecTotalBlocks; b++){
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        // extract a block of data from buffer
        dcData[b] = buffer.slice(offset, offset + dataSize);
        // Calculate EC codewords for this data block
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
    }
    // Create final data
    // Interleave the data and error correction codewords from each block
    const data = new Uint8Array(totalCodewords);
    let index = 0;
    let i, r;
    // Add data codewords
    for(i = 0; i < maxDataSize; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            if (i < dcData[r].length) {
                data[index++] = dcData[r][i];
            }
        }
    }
    // Apped EC codewords
    for(i = 0; i < ecCount; i++){
        for(r = 0; r < ecTotalBlocks; r++){
            data[index++] = ecData[r][i];
        }
    }
    return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */ function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
    let segments;
    if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
    } else if (typeof data === 'string') {
        let estimatedVersion = version;
        if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            // Estimate best version that can contain raw splitted segments
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        // Build optimized segments
        // If estimated version is undefined, try with the highest version
        segments = Segments.fromString(data, estimatedVersion || 40);
    } else {
        throw new Error('Invalid data');
    }
    // Get the min version that can contain data
    const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
    // If no version is found, data cannot be stored
    if (!bestVersion) {
        throw new Error('The amount of data is too big to be stored in a QR Code');
    }
    // If not specified, use min version as default
    if (!version) {
        version = bestVersion;
    // Check if the specified version can contain the data
    } else if (version < bestVersion) {
        throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
    }
    const dataBits = createData(version, errorCorrectionLevel, segments);
    // Allocate matrix buffer
    const moduleCount = Utils.getSymbolSize(version);
    const modules = new BitMatrix(moduleCount);
    // Add function modules
    setupFinderPattern(modules, version);
    setupTimingPattern(modules);
    setupAlignmentPattern(modules, version);
    // Add temporary dummy bits for format info just to set them as reserved.
    // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
    // since the masking operation must be performed only on the encoding region.
    // These blocks will be replaced with correct values later in code.
    setupFormatInfo(modules, errorCorrectionLevel, 0);
    if (version >= 7) {
        setupVersionInfo(modules, version);
    }
    // Add data codewords
    setupData(modules, dataBits);
    if (isNaN(maskPattern)) {
        // Find best mask pattern
        maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
    }
    // Apply mask pattern
    MaskPattern.applyMask(maskPattern, modules);
    // Replace format info bits with correct values
    setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
    return {
        modules: modules,
        version: version,
        errorCorrectionLevel: errorCorrectionLevel,
        maskPattern: maskPattern,
        segments: segments
    };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */ exports.create = function create(data, options) {
    if (typeof data === 'undefined' || data === '') {
        throw new Error('No input text');
    }
    let errorCorrectionLevel = ECLevel.M;
    let version;
    let mask;
    if (typeof options !== 'undefined') {
        // Use higher error correction level as default
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
        }
    }
    return createSymbol(data, version, errorCorrectionLevel, mask);
};
}),
"[project]/node_modules/qrcode/lib/renderer/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

function hex2rgba(hex) {
    if (typeof hex === 'number') {
        hex = hex.toString();
    }
    if (typeof hex !== 'string') {
        throw new Error('Color should be defined as hex string');
    }
    let hexCode = hex.slice().replace('#', '').split('');
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error('Invalid hex color: ' + hex);
    }
    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
            return [
                c,
                c
            ];
        }));
    }
    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F');
    const hexValue = parseInt(hexCode.join(''), 16);
    return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: '#' + hexCode.slice(0, 6).join('')
    };
}
exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : undefined;
    const scale = options.scale || 4;
    return {
        width: width,
        scale: width ? 4 : scale,
        margin: margin,
        color: {
            dark: hex2rgba(options.color.dark || '#000000ff'),
            light: hex2rgba(options.color.light || '#ffffffff')
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
    };
};
exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [
        opts.color.light,
        opts.color.dark
    ];
    for(let i = 0; i < symbolSize; i++){
        for(let j = 0; j < symbolSize; j++){
            let posDst = (i * symbolSize + j) * 4;
            let pxColor = opts.color.light;
            if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
                const iSrc = Math.floor((i - scaledMargin) / scale);
                const jSrc = Math.floor((j - scaledMargin) / scale);
                pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
            }
            imgData[posDst++] = pxColor.r;
            imgData[posDst++] = pxColor.g;
            imgData[posDst++] = pxColor.b;
            imgData[posDst] = pxColor.a;
        }
    }
};
}),
"[project]/node_modules/qrcode/lib/renderer/canvas.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-rsc] (ecmascript)");
function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + 'px';
    canvas.style.width = size + 'px';
}
function getCanvasElement() {
    try {
        return document.createElement('canvas');
    } catch (e) {
        throw new Error('You need to specify a canvas element');
    }
}
exports.render = function render(qrData, canvas, options) {
    let opts = options;
    let canvasEl = canvas;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!canvas) {
        canvasEl = getCanvasElement();
    }
    opts = Utils.getOptions(opts);
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext('2d');
    const image = ctx.createImageData(size, size);
    Utils.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    let opts = options;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!opts) opts = {};
    const canvasEl = exports.render(qrData, canvas, opts);
    const type = opts.type || 'image/png';
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
};
}),
"[project]/node_modules/qrcode/lib/renderer/svg-tag.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-rsc] (ecmascript)");
function getColorAttrib(color, attrib) {
    const alpha = color.a / 255;
    const str = attrib + '="' + color.hex + '"';
    return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
    let str = cmd + x;
    if (typeof y !== 'undefined') str += ' ' + y;
    return str;
}
function qrToPath(data, size, margin) {
    let path = '';
    let moveBy = 0;
    let newRow = false;
    let lineLength = 0;
    for(let i = 0; i < data.length; i++){
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
                path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
                moveBy = 0;
                newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
                path += svgCmd('h', lineLength);
                lineLength = 0;
            }
        } else {
            moveBy++;
        }
    }
    return path;
}
exports.render = function render(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const qrcodesize = size + opts.margin * 2;
    const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
    const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
    const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
    const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
    const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
    if (typeof cb === 'function') {
        cb(null, svgTag);
    }
    return svgTag;
};
}),
"[project]/node_modules/qrcode/lib/browser.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const canPromise = __turbopack_context__.r("[project]/node_modules/qrcode/lib/can-promise.js [app-rsc] (ecmascript)");
const QRCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/qrcode.js [app-rsc] (ecmascript)");
const CanvasRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/canvas.js [app-rsc] (ecmascript)");
const SvgRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/svg-tag.js [app-rsc] (ecmascript)");
function renderCanvas(renderFunc, canvas, text, opts, cb) {
    const args = [].slice.call(arguments, 1);
    const argsNum = args.length;
    const isLastArgCb = typeof args[argsNum - 1] === 'function';
    if (!isLastArgCb && !canPromise()) {
        throw new Error('Callback required as last argument');
    }
    if (isLastArgCb) {
        if (argsNum < 2) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === 'undefined') {
                cb = opts;
                opts = undefined;
            } else {
                cb = opts;
                opts = text;
                text = canvas;
                canvas = undefined;
            }
        }
    } else {
        if (argsNum < 1) {
            throw new Error('Too few arguments provided');
        }
        if (argsNum === 1) {
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = undefined;
        }
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, opts);
                resolve(renderFunc(data, canvas, opts));
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
    } catch (e) {
        cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
// only svg for now.
exports.toString = renderCanvas.bind(null, function(data, _, opts) {
    return SvgRenderer.render(data, opts);
});
}),
"[project]/node_modules/pngjs/lib/chunkstream.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let ChunkStream = module.exports = function() {
    Stream.call(this);
    this._buffers = [];
    this._buffered = 0;
    this._reads = [];
    this._paused = false;
    this._encoding = "utf8";
    this.writable = true;
};
util.inherits(ChunkStream, Stream);
ChunkStream.prototype.read = function(length, callback) {
    this._reads.push({
        length: Math.abs(length),
        allowLess: length < 0,
        func: callback
    });
    process.nextTick((function() {
        this._process();
        // its paused and there is not enought data then ask for more
        if (this._paused && this._reads && this._reads.length > 0) {
            this._paused = false;
            this.emit("drain");
        }
    }).bind(this));
};
ChunkStream.prototype.write = function(data, encoding) {
    if (!this.writable) {
        this.emit("error", new Error("Stream not writable"));
        return false;
    }
    let dataBuffer;
    if (Buffer.isBuffer(data)) {
        dataBuffer = data;
    } else {
        dataBuffer = Buffer.from(data, encoding || this._encoding);
    }
    this._buffers.push(dataBuffer);
    this._buffered += dataBuffer.length;
    this._process();
    // ok if there are no more read requests
    if (this._reads && this._reads.length === 0) {
        this._paused = true;
    }
    return this.writable && !this._paused;
};
ChunkStream.prototype.end = function(data, encoding) {
    if (data) {
        this.write(data, encoding);
    }
    this.writable = false;
    // already destroyed
    if (!this._buffers) {
        return;
    }
    // enqueue or handle end
    if (this._buffers.length === 0) {
        this._end();
    } else {
        this._buffers.push(null);
        this._process();
    }
};
ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;
ChunkStream.prototype._end = function() {
    if (this._reads.length > 0) {
        this.emit("error", new Error("Unexpected end of input"));
    }
    this.destroy();
};
ChunkStream.prototype.destroy = function() {
    if (!this._buffers) {
        return;
    }
    this.writable = false;
    this._reads = null;
    this._buffers = null;
    this.emit("close");
};
ChunkStream.prototype._processReadAllowingLess = function(read) {
    // ok there is any data so that we can satisfy this request
    this._reads.shift(); // == read
    // first we need to peek into first buffer
    let smallerBuf = this._buffers[0];
    // ok there is more data than we need
    if (smallerBuf.length > read.length) {
        this._buffered -= read.length;
        this._buffers[0] = smallerBuf.slice(read.length);
        read.func.call(this, smallerBuf.slice(0, read.length));
    } else {
        // ok this is less than maximum length so use it all
        this._buffered -= smallerBuf.length;
        this._buffers.shift(); // == smallerBuf
        read.func.call(this, smallerBuf);
    }
};
ChunkStream.prototype._processRead = function(read) {
    this._reads.shift(); // == read
    let pos = 0;
    let count = 0;
    let data = Buffer.alloc(read.length);
    // create buffer for all data
    while(pos < read.length){
        let buf = this._buffers[count++];
        let len = Math.min(buf.length, read.length - pos);
        buf.copy(data, pos, 0, len);
        pos += len;
        // last buffer wasn't used all so just slice it and leave
        if (len !== buf.length) {
            this._buffers[--count] = buf.slice(len);
        }
    }
    // remove all used buffers
    if (count > 0) {
        this._buffers.splice(0, count);
    }
    this._buffered -= read.length;
    read.func.call(this, data);
};
ChunkStream.prototype._process = function() {
    try {
        // as long as there is any data and read requests
        while(this._buffered > 0 && this._reads && this._reads.length > 0){
            let read = this._reads[0];
            // read any data (but no more than length)
            if (read.allowLess) {
                this._processReadAllowingLess(read);
            } else if (this._buffered >= read.length) {
                // ok we can meet some expectations
                this._processRead(read);
            } else {
                break;
            }
        }
        if (this._buffers && !this.writable) {
            this._end();
        }
    } catch (ex) {
        this.emit("error", ex);
    }
};
}),
"[project]/node_modules/pngjs/lib/interlace.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Adam 7
//   0 1 2 3 4 5 6 7
// 0 x 6 4 6 x 6 4 6
// 1 7 7 7 7 7 7 7 7
// 2 5 6 5 6 5 6 5 6
// 3 7 7 7 7 7 7 7 7
// 4 3 6 4 6 3 6 4 6
// 5 7 7 7 7 7 7 7 7
// 6 5 6 5 6 5 6 5 6
// 7 7 7 7 7 7 7 7 7
let imagePasses = [
    {
        // pass 1 - 1px
        x: [
            0
        ],
        y: [
            0
        ]
    },
    {
        // pass 2 - 1px
        x: [
            4
        ],
        y: [
            0
        ]
    },
    {
        // pass 3 - 2px
        x: [
            0,
            4
        ],
        y: [
            4
        ]
    },
    {
        // pass 4 - 4px
        x: [
            2,
            6
        ],
        y: [
            0,
            4
        ]
    },
    {
        // pass 5 - 8px
        x: [
            0,
            2,
            4,
            6
        ],
        y: [
            2,
            6
        ]
    },
    {
        // pass 6 - 16px
        x: [
            1,
            3,
            5,
            7
        ],
        y: [
            0,
            2,
            4,
            6
        ]
    },
    {
        // pass 7 - 32px
        x: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ],
        y: [
            1,
            3,
            5,
            7
        ]
    }
];
exports.getImagePasses = function(width, height) {
    let images = [];
    let xLeftOver = width % 8;
    let yLeftOver = height % 8;
    let xRepeats = (width - xLeftOver) / 8;
    let yRepeats = (height - yLeftOver) / 8;
    for(let i = 0; i < imagePasses.length; i++){
        let pass = imagePasses[i];
        let passWidth = xRepeats * pass.x.length;
        let passHeight = yRepeats * pass.y.length;
        for(let j = 0; j < pass.x.length; j++){
            if (pass.x[j] < xLeftOver) {
                passWidth++;
            } else {
                break;
            }
        }
        for(let j = 0; j < pass.y.length; j++){
            if (pass.y[j] < yLeftOver) {
                passHeight++;
            } else {
                break;
            }
        }
        if (passWidth > 0 && passHeight > 0) {
            images.push({
                width: passWidth,
                height: passHeight,
                index: i
            });
        }
    }
    return images;
};
exports.getInterlaceIterator = function(width) {
    return function(x, y, pass) {
        let outerXLeftOver = x % imagePasses[pass].x.length;
        let outerX = (x - outerXLeftOver) / imagePasses[pass].x.length * 8 + imagePasses[pass].x[outerXLeftOver];
        let outerYLeftOver = y % imagePasses[pass].y.length;
        let outerY = (y - outerYLeftOver) / imagePasses[pass].y.length * 8 + imagePasses[pass].y[outerYLeftOver];
        return outerX * 4 + outerY * width * 4;
    };
};
}),
"[project]/node_modules/pngjs/lib/paeth-predictor.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function paethPredictor(left, above, upLeft) {
    let paeth = left + above - upLeft;
    let pLeft = Math.abs(paeth - left);
    let pAbove = Math.abs(paeth - above);
    let pUpLeft = Math.abs(paeth - upLeft);
    if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
    }
    if (pAbove <= pUpLeft) {
        return above;
    }
    return upLeft;
};
}),
"[project]/node_modules/pngjs/lib/filter-parse.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let interlaceUtils = __turbopack_context__.r("[project]/node_modules/pngjs/lib/interlace.js [app-rsc] (ecmascript)");
let paethPredictor = __turbopack_context__.r("[project]/node_modules/pngjs/lib/paeth-predictor.js [app-rsc] (ecmascript)");
function getByteWidth(width, bpp, depth) {
    let byteWidth = width * bpp;
    if (depth !== 8) {
        byteWidth = Math.ceil(byteWidth / (8 / depth));
    }
    return byteWidth;
}
let Filter = module.exports = function(bitmapInfo, dependencies) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let interlace = bitmapInfo.interlace;
    let bpp = bitmapInfo.bpp;
    let depth = bitmapInfo.depth;
    this.read = dependencies.read;
    this.write = dependencies.write;
    this.complete = dependencies.complete;
    this._imageIndex = 0;
    this._images = [];
    if (interlace) {
        let passes = interlaceUtils.getImagePasses(width, height);
        for(let i = 0; i < passes.length; i++){
            this._images.push({
                byteWidth: getByteWidth(passes[i].width, bpp, depth),
                height: passes[i].height,
                lineIndex: 0
            });
        }
    } else {
        this._images.push({
            byteWidth: getByteWidth(width, bpp, depth),
            height: height,
            lineIndex: 0
        });
    }
    // when filtering the line we look at the pixel to the left
    // the spec also says it is done on a byte level regardless of the number of pixels
    // so if the depth is byte compatible (8 or 16) we subtract the bpp in order to compare back
    // a pixel rather than just a different byte part. However if we are sub byte, we ignore.
    if (depth === 8) {
        this._xComparison = bpp;
    } else if (depth === 16) {
        this._xComparison = bpp * 2;
    } else {
        this._xComparison = 1;
    }
};
Filter.prototype.start = function() {
    this.read(this._images[this._imageIndex].byteWidth + 1, this._reverseFilterLine.bind(this));
};
Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        unfilteredLine[x] = rawByte + f1Left;
    }
};
Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f2Up = lastLine ? lastLine[x] : 0;
        unfilteredLine[x] = rawByte + f2Up;
    }
};
Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f3Up = lastLine ? lastLine[x] : 0;
        let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f3Add = Math.floor((f3Left + f3Up) / 2);
        unfilteredLine[x] = rawByte + f3Add;
    }
};
Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for(let x = 0; x < byteWidth; x++){
        let rawByte = rawData[1 + x];
        let f4Up = lastLine ? lastLine[x] : 0;
        let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
        let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
        unfilteredLine[x] = rawByte + f4Add;
    }
};
Filter.prototype._reverseFilterLine = function(rawData) {
    let filter = rawData[0];
    let unfilteredLine;
    let currentImage = this._images[this._imageIndex];
    let byteWidth = currentImage.byteWidth;
    if (filter === 0) {
        unfilteredLine = rawData.slice(1, byteWidth + 1);
    } else {
        unfilteredLine = Buffer.alloc(byteWidth);
        switch(filter){
            case 1:
                this._unFilterType1(rawData, unfilteredLine, byteWidth);
                break;
            case 2:
                this._unFilterType2(rawData, unfilteredLine, byteWidth);
                break;
            case 3:
                this._unFilterType3(rawData, unfilteredLine, byteWidth);
                break;
            case 4:
                this._unFilterType4(rawData, unfilteredLine, byteWidth);
                break;
            default:
                throw new Error("Unrecognised filter type - " + filter);
        }
    }
    this.write(unfilteredLine);
    currentImage.lineIndex++;
    if (currentImage.lineIndex >= currentImage.height) {
        this._lastLine = null;
        this._imageIndex++;
        currentImage = this._images[this._imageIndex];
    } else {
        this._lastLine = unfilteredLine;
    }
    if (currentImage) {
        // read, using the byte width that may be from the new current image
        this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
    } else {
        this._lastLine = null;
        this.complete();
    }
};
}),
"[project]/node_modules/pngjs/lib/filter-parse-async.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let ChunkStream = __turbopack_context__.r("[project]/node_modules/pngjs/lib/chunkstream.js [app-rsc] (ecmascript)");
let Filter = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse.js [app-rsc] (ecmascript)");
let FilterAsync = module.exports = function(bitmapInfo) {
    ChunkStream.call(this);
    let buffers = [];
    let that = this;
    this._filter = new Filter(bitmapInfo, {
        read: this.read.bind(this),
        write: function(buffer) {
            buffers.push(buffer);
        },
        complete: function() {
            that.emit("complete", Buffer.concat(buffers));
        }
    });
    this._filter.start();
};
util.inherits(FilterAsync, ChunkStream);
}),
"[project]/node_modules/pngjs/lib/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {
    PNG_SIGNATURE: [
        0x89,
        0x50,
        0x4e,
        0x47,
        0x0d,
        0x0a,
        0x1a,
        0x0a
    ],
    TYPE_IHDR: 0x49484452,
    TYPE_IEND: 0x49454e44,
    TYPE_IDAT: 0x49444154,
    TYPE_PLTE: 0x504c5445,
    TYPE_tRNS: 0x74524e53,
    TYPE_gAMA: 0x67414d41,
    // color-type bits
    COLORTYPE_GRAYSCALE: 0,
    COLORTYPE_PALETTE: 1,
    COLORTYPE_COLOR: 2,
    COLORTYPE_ALPHA: 4,
    // color-type combinations
    COLORTYPE_PALETTE_COLOR: 3,
    COLORTYPE_COLOR_ALPHA: 6,
    COLORTYPE_TO_BPP_MAP: {
        0: 1,
        2: 3,
        3: 1,
        4: 2,
        6: 4
    },
    GAMMA_DIVISION: 100000
};
}),
"[project]/node_modules/pngjs/lib/crc.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let crcTable = [];
(function() {
    for(let i = 0; i < 256; i++){
        let currentCrc = i;
        for(let j = 0; j < 8; j++){
            if (currentCrc & 1) {
                currentCrc = 0xedb88320 ^ currentCrc >>> 1;
            } else {
                currentCrc = currentCrc >>> 1;
            }
        }
        crcTable[i] = currentCrc;
    }
})();
let CrcCalculator = module.exports = function() {
    this._crc = -1;
};
CrcCalculator.prototype.write = function(data) {
    for(let i = 0; i < data.length; i++){
        this._crc = crcTable[(this._crc ^ data[i]) & 0xff] ^ this._crc >>> 8;
    }
    return true;
};
CrcCalculator.prototype.crc32 = function() {
    return this._crc ^ -1;
};
CrcCalculator.crc32 = function(buf) {
    let crc = -1;
    for(let i = 0; i < buf.length; i++){
        crc = crcTable[(crc ^ buf[i]) & 0xff] ^ crc >>> 8;
    }
    return crc ^ -1;
};
}),
"[project]/node_modules/pngjs/lib/parser.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-rsc] (ecmascript)");
let CrcCalculator = __turbopack_context__.r("[project]/node_modules/pngjs/lib/crc.js [app-rsc] (ecmascript)");
let Parser = module.exports = function(options, dependencies) {
    this._options = options;
    options.checkCRC = options.checkCRC !== false;
    this._hasIHDR = false;
    this._hasIEND = false;
    this._emittedHeadersFinished = false;
    // input flags/metadata
    this._palette = [];
    this._colorType = 0;
    this._chunks = {};
    this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
    this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
    this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
    this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
    this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
    this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);
    this.read = dependencies.read;
    this.error = dependencies.error;
    this.metadata = dependencies.metadata;
    this.gamma = dependencies.gamma;
    this.transColor = dependencies.transColor;
    this.palette = dependencies.palette;
    this.parsed = dependencies.parsed;
    this.inflateData = dependencies.inflateData;
    this.finished = dependencies.finished;
    this.simpleTransparency = dependencies.simpleTransparency;
    this.headersFinished = dependencies.headersFinished || function() {};
};
Parser.prototype.start = function() {
    this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
};
Parser.prototype._parseSignature = function(data) {
    let signature = constants.PNG_SIGNATURE;
    for(let i = 0; i < signature.length; i++){
        if (data[i] !== signature[i]) {
            this.error(new Error("Invalid file signature"));
            return;
        }
    }
    this.read(8, this._parseChunkBegin.bind(this));
};
Parser.prototype._parseChunkBegin = function(data) {
    // chunk content length
    let length = data.readUInt32BE(0);
    // chunk type
    let type = data.readUInt32BE(4);
    let name = "";
    for(let i = 4; i < 8; i++){
        name += String.fromCharCode(data[i]);
    }
    //console.log('chunk ', name, length);
    // chunk flags
    let ancillary = Boolean(data[4] & 0x20); // or critical
    //    priv = Boolean(data[5] & 0x20), // or public
    //    safeToCopy = Boolean(data[7] & 0x20); // or unsafe
    if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
        this.error(new Error("Expected IHDR on beggining"));
        return;
    }
    this._crc = new CrcCalculator();
    this._crc.write(Buffer.from(name));
    if (this._chunks[type]) {
        return this._chunks[type](length);
    }
    if (!ancillary) {
        this.error(new Error("Unsupported critical chunk type " + name));
        return;
    }
    this.read(length + 4, this._skipChunk.bind(this));
};
Parser.prototype._skipChunk = function() {
    this.read(8, this._parseChunkBegin.bind(this));
};
Parser.prototype._handleChunkEnd = function() {
    this.read(4, this._parseChunkEnd.bind(this));
};
Parser.prototype._parseChunkEnd = function(data) {
    let fileCrc = data.readInt32BE(0);
    let calcCrc = this._crc.crc32();
    // check CRC
    if (this._options.checkCRC && calcCrc !== fileCrc) {
        this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
        return;
    }
    if (!this._hasIEND) {
        this.read(8, this._parseChunkBegin.bind(this));
    }
};
Parser.prototype._handleIHDR = function(length) {
    this.read(length, this._parseIHDR.bind(this));
};
Parser.prototype._parseIHDR = function(data) {
    this._crc.write(data);
    let width = data.readUInt32BE(0);
    let height = data.readUInt32BE(4);
    let depth = data[8];
    let colorType = data[9]; // bits: 1 palette, 2 color, 4 alpha
    let compr = data[10];
    let filter = data[11];
    let interlace = data[12];
    // console.log('    width', width, 'height', height,
    //     'depth', depth, 'colorType', colorType,
    //     'compr', compr, 'filter', filter, 'interlace', interlace
    // );
    if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
        this.error(new Error("Unsupported bit depth " + depth));
        return;
    }
    if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
        this.error(new Error("Unsupported color type"));
        return;
    }
    if (compr !== 0) {
        this.error(new Error("Unsupported compression method"));
        return;
    }
    if (filter !== 0) {
        this.error(new Error("Unsupported filter method"));
        return;
    }
    if (interlace !== 0 && interlace !== 1) {
        this.error(new Error("Unsupported interlace method"));
        return;
    }
    this._colorType = colorType;
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];
    this._hasIHDR = true;
    this.metadata({
        width: width,
        height: height,
        depth: depth,
        interlace: Boolean(interlace),
        palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
        color: Boolean(colorType & constants.COLORTYPE_COLOR),
        alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
        bpp: bpp,
        colorType: colorType
    });
    this._handleChunkEnd();
};
Parser.prototype._handlePLTE = function(length) {
    this.read(length, this._parsePLTE.bind(this));
};
Parser.prototype._parsePLTE = function(data) {
    this._crc.write(data);
    let entries = Math.floor(data.length / 3);
    // console.log('Palette:', entries);
    for(let i = 0; i < entries; i++){
        this._palette.push([
            data[i * 3],
            data[i * 3 + 1],
            data[i * 3 + 2],
            0xff
        ]);
    }
    this.palette(this._palette);
    this._handleChunkEnd();
};
Parser.prototype._handleTRNS = function(length) {
    this.simpleTransparency();
    this.read(length, this._parseTRNS.bind(this));
};
Parser.prototype._parseTRNS = function(data) {
    this._crc.write(data);
    // palette
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
        if (this._palette.length === 0) {
            this.error(new Error("Transparency chunk must be after palette"));
            return;
        }
        if (data.length > this._palette.length) {
            this.error(new Error("More transparent colors than palette size"));
            return;
        }
        for(let i = 0; i < data.length; i++){
            this._palette[i][3] = data[i];
        }
        this.palette(this._palette);
    }
    // for colorType 0 (grayscale) and 2 (rgb)
    // there might be one gray/color defined as transparent
    if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
        // grey, 2 bytes
        this.transColor([
            data.readUInt16BE(0)
        ]);
    }
    if (this._colorType === constants.COLORTYPE_COLOR) {
        this.transColor([
            data.readUInt16BE(0),
            data.readUInt16BE(2),
            data.readUInt16BE(4)
        ]);
    }
    this._handleChunkEnd();
};
Parser.prototype._handleGAMA = function(length) {
    this.read(length, this._parseGAMA.bind(this));
};
Parser.prototype._parseGAMA = function(data) {
    this._crc.write(data);
    this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);
    this._handleChunkEnd();
};
Parser.prototype._handleIDAT = function(length) {
    if (!this._emittedHeadersFinished) {
        this._emittedHeadersFinished = true;
        this.headersFinished();
    }
    this.read(-length, this._parseIDAT.bind(this, length));
};
Parser.prototype._parseIDAT = function(length, data) {
    this._crc.write(data);
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
        throw new Error("Expected palette not found");
    }
    this.inflateData(data);
    let leftOverLength = length - data.length;
    if (leftOverLength > 0) {
        this._handleIDAT(leftOverLength);
    } else {
        this._handleChunkEnd();
    }
};
Parser.prototype._handleIEND = function(length) {
    this.read(length, this._parseIEND.bind(this));
};
Parser.prototype._parseIEND = function(data) {
    this._crc.write(data);
    this._hasIEND = true;
    this._handleChunkEnd();
    if (this.finished) {
        this.finished();
    }
};
}),
"[project]/node_modules/pngjs/lib/bitmapper.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let interlaceUtils = __turbopack_context__.r("[project]/node_modules/pngjs/lib/interlace.js [app-rsc] (ecmascript)");
let pixelBppMapper = [
    // 0 - dummy entry
    function() {},
    // 1 - L
    // 0: 0, 1: 0, 2: 0, 3: 0xff
    function(pxData, data, pxPos, rawPos) {
        if (rawPos === data.length) {
            throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = 0xff;
    },
    // 2 - LA
    // 0: 0, 1: 0, 2: 0, 3: 1
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 1 >= data.length) {
            throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = data[rawPos + 1];
    },
    // 3 - RGB
    // 0: 0, 1: 1, 2: 2, 3: 0xff
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 2 >= data.length) {
            throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = 0xff;
    },
    // 4 - RGBA
    // 0: 0, 1: 1, 2: 2, 3: 3
    function(pxData, data, pxPos, rawPos) {
        if (rawPos + 3 >= data.length) {
            throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = data[rawPos + 3];
    }
];
let pixelBppCustomMapper = [
    // 0 - dummy entry
    function() {},
    // 1 - L
    // 0: 0, 1: 0, 2: 0, 3: 0xff
    function(pxData, pixelData, pxPos, maxBit) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = maxBit;
    },
    // 2 - LA
    // 0: 0, 1: 0, 2: 0, 3: 1
    function(pxData, pixelData, pxPos) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = pixelData[1];
    },
    // 3 - RGB
    // 0: 0, 1: 1, 2: 2, 3: 0xff
    function(pxData, pixelData, pxPos, maxBit) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = maxBit;
    },
    // 4 - RGBA
    // 0: 0, 1: 1, 2: 2, 3: 3
    function(pxData, pixelData, pxPos) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = pixelData[3];
    }
];
function bitRetriever(data, depth) {
    let leftOver = [];
    let i = 0;
    function split() {
        if (i === data.length) {
            throw new Error("Ran out of data");
        }
        let byte = data[i];
        i++;
        let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
        switch(depth){
            default:
                throw new Error("unrecognised depth");
            case 16:
                byte2 = data[i];
                i++;
                leftOver.push((byte << 8) + byte2);
                break;
            case 4:
                byte2 = byte & 0x0f;
                byte1 = byte >> 4;
                leftOver.push(byte1, byte2);
                break;
            case 2:
                byte4 = byte & 3;
                byte3 = byte >> 2 & 3;
                byte2 = byte >> 4 & 3;
                byte1 = byte >> 6 & 3;
                leftOver.push(byte1, byte2, byte3, byte4);
                break;
            case 1:
                byte8 = byte & 1;
                byte7 = byte >> 1 & 1;
                byte6 = byte >> 2 & 1;
                byte5 = byte >> 3 & 1;
                byte4 = byte >> 4 & 1;
                byte3 = byte >> 5 & 1;
                byte2 = byte >> 6 & 1;
                byte1 = byte >> 7 & 1;
                leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
                break;
        }
    }
    return {
        get: function(count) {
            while(leftOver.length < count){
                split();
            }
            let returner = leftOver.slice(0, count);
            leftOver = leftOver.slice(count);
            return returner;
        },
        resetAfterLine: function() {
            leftOver.length = 0;
        },
        end: function() {
            if (i !== data.length) {
                throw new Error("extra data found");
            }
        }
    };
}
function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
    // eslint-disable-line max-params
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for(let y = 0; y < imageHeight; y++){
        for(let x = 0; x < imageWidth; x++){
            let pxPos = getPxPos(x, y, imagePass);
            pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
            rawPos += bpp; //eslint-disable-line no-param-reassign
        }
    }
    return rawPos;
}
function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
    // eslint-disable-line max-params
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for(let y = 0; y < imageHeight; y++){
        for(let x = 0; x < imageWidth; x++){
            let pixelData = bits.get(bpp);
            let pxPos = getPxPos(x, y, imagePass);
            pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
        }
        bits.resetAfterLine();
    }
}
exports.dataToBitMap = function(data, bitmapInfo) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let depth = bitmapInfo.depth;
    let bpp = bitmapInfo.bpp;
    let interlace = bitmapInfo.interlace;
    let bits;
    if (depth !== 8) {
        bits = bitRetriever(data, depth);
    }
    let pxData;
    if (depth <= 8) {
        pxData = Buffer.alloc(width * height * 4);
    } else {
        pxData = new Uint16Array(width * height * 4);
    }
    let maxBit = Math.pow(2, depth) - 1;
    let rawPos = 0;
    let images;
    let getPxPos;
    if (interlace) {
        images = interlaceUtils.getImagePasses(width, height);
        getPxPos = interlaceUtils.getInterlaceIterator(width, height);
    } else {
        let nonInterlacedPxPos = 0;
        getPxPos = function() {
            let returner = nonInterlacedPxPos;
            nonInterlacedPxPos += 4;
            return returner;
        };
        images = [
            {
                width: width,
                height: height
            }
        ];
    }
    for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
        if (depth === 8) {
            rawPos = mapImage8Bit(images[imageIndex], pxData, getPxPos, bpp, data, rawPos);
        } else {
            mapImageCustomBit(images[imageIndex], pxData, getPxPos, bpp, bits, maxBit);
        }
    }
    if (depth === 8) {
        if (rawPos !== data.length) {
            throw new Error("extra data found");
        }
    } else {
        bits.end();
    }
    return pxData;
};
}),
"[project]/node_modules/pngjs/lib/format-normaliser.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function dePalette(indata, outdata, width, height, palette) {
    let pxPos = 0;
    // use values from palette
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let color = palette[indata[pxPos]];
            if (!color) {
                throw new Error("index " + indata[pxPos] + " not in palette");
            }
            for(let i = 0; i < 4; i++){
                outdata[pxPos + i] = color[i];
            }
            pxPos += 4;
        }
    }
}
function replaceTransparentColor(indata, outdata, width, height, transColor) {
    let pxPos = 0;
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let makeTrans = false;
            if (transColor.length === 1) {
                if (transColor[0] === indata[pxPos]) {
                    makeTrans = true;
                }
            } else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
                makeTrans = true;
            }
            if (makeTrans) {
                for(let i = 0; i < 4; i++){
                    outdata[pxPos + i] = 0;
                }
            }
            pxPos += 4;
        }
    }
}
function scaleDepth(indata, outdata, width, height, depth) {
    let maxOutSample = 255;
    let maxInSample = Math.pow(2, depth) - 1;
    let pxPos = 0;
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            for(let i = 0; i < 4; i++){
                outdata[pxPos + i] = Math.floor(indata[pxPos + i] * maxOutSample / maxInSample + 0.5);
            }
            pxPos += 4;
        }
    }
}
module.exports = function(indata, imageData) {
    let depth = imageData.depth;
    let width = imageData.width;
    let height = imageData.height;
    let colorType = imageData.colorType;
    let transColor = imageData.transColor;
    let palette = imageData.palette;
    let outdata = indata; // only different for 16 bits
    if (colorType === 3) {
        // paletted
        dePalette(indata, outdata, width, height, palette);
    } else {
        if (transColor) {
            replaceTransparentColor(indata, outdata, width, height, transColor);
        }
        // if it needs scaling
        if (depth !== 8) {
            // if we need to change the buffer size
            if (depth === 16) {
                outdata = Buffer.alloc(width * height * 4);
            }
            scaleDepth(indata, outdata, width, height, depth);
        }
    }
    return outdata;
};
}),
"[project]/node_modules/pngjs/lib/parser-async.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let ChunkStream = __turbopack_context__.r("[project]/node_modules/pngjs/lib/chunkstream.js [app-rsc] (ecmascript)");
let FilterAsync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse-async.js [app-rsc] (ecmascript)");
let Parser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser.js [app-rsc] (ecmascript)");
let bitmapper = __turbopack_context__.r("[project]/node_modules/pngjs/lib/bitmapper.js [app-rsc] (ecmascript)");
let formatNormaliser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/format-normaliser.js [app-rsc] (ecmascript)");
let ParserAsync = module.exports = function(options) {
    ChunkStream.call(this);
    this._parser = new Parser(options, {
        read: this.read.bind(this),
        error: this._handleError.bind(this),
        metadata: this._handleMetaData.bind(this),
        gamma: this.emit.bind(this, "gamma"),
        palette: this._handlePalette.bind(this),
        transColor: this._handleTransColor.bind(this),
        finished: this._finished.bind(this),
        inflateData: this._inflateData.bind(this),
        simpleTransparency: this._simpleTransparency.bind(this),
        headersFinished: this._headersFinished.bind(this)
    });
    this._options = options;
    this.writable = true;
    this._parser.start();
};
util.inherits(ParserAsync, ChunkStream);
ParserAsync.prototype._handleError = function(err) {
    this.emit("error", err);
    this.writable = false;
    this.destroy();
    if (this._inflate && this._inflate.destroy) {
        this._inflate.destroy();
    }
    if (this._filter) {
        this._filter.destroy();
        // For backward compatibility with Node 7 and below.
        // Suppress errors due to _inflate calling write() even after
        // it's destroy()'ed.
        this._filter.on("error", function() {});
    }
    this.errord = true;
};
ParserAsync.prototype._inflateData = function(data) {
    if (!this._inflate) {
        if (this._bitmapInfo.interlace) {
            this._inflate = zlib.createInflate();
            this._inflate.on("error", this.emit.bind(this, "error"));
            this._filter.on("complete", this._complete.bind(this));
            this._inflate.pipe(this._filter);
        } else {
            let rowSize = (this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1;
            let imageSize = rowSize * this._bitmapInfo.height;
            let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);
            this._inflate = zlib.createInflate({
                chunkSize: chunkSize
            });
            let leftToInflate = imageSize;
            let emitError = this.emit.bind(this, "error");
            this._inflate.on("error", function(err) {
                if (!leftToInflate) {
                    return;
                }
                emitError(err);
            });
            this._filter.on("complete", this._complete.bind(this));
            let filterWrite = this._filter.write.bind(this._filter);
            this._inflate.on("data", function(chunk) {
                if (!leftToInflate) {
                    return;
                }
                if (chunk.length > leftToInflate) {
                    chunk = chunk.slice(0, leftToInflate);
                }
                leftToInflate -= chunk.length;
                filterWrite(chunk);
            });
            this._inflate.on("end", this._filter.end.bind(this._filter));
        }
    }
    this._inflate.write(data);
};
ParserAsync.prototype._handleMetaData = function(metaData) {
    this._metaData = metaData;
    this._bitmapInfo = Object.create(metaData);
    this._filter = new FilterAsync(this._bitmapInfo);
};
ParserAsync.prototype._handleTransColor = function(transColor) {
    this._bitmapInfo.transColor = transColor;
};
ParserAsync.prototype._handlePalette = function(palette) {
    this._bitmapInfo.palette = palette;
};
ParserAsync.prototype._simpleTransparency = function() {
    this._metaData.alpha = true;
};
ParserAsync.prototype._headersFinished = function() {
    // Up until this point, we don't know if we have a tRNS chunk (alpha)
    // so we can't emit metadata any earlier
    this.emit("metadata", this._metaData);
};
ParserAsync.prototype._finished = function() {
    if (this.errord) {
        return;
    }
    if (!this._inflate) {
        this.emit("error", "No Inflate block");
    } else {
        // no more data to inflate
        this._inflate.end();
    }
};
ParserAsync.prototype._complete = function(filteredData) {
    if (this.errord) {
        return;
    }
    let normalisedBitmapData;
    try {
        let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);
        normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo);
        bitmapData = null;
    } catch (ex) {
        this._handleError(ex);
        return;
    }
    this.emit("parsed", normalisedBitmapData);
};
}),
"[project]/node_modules/pngjs/lib/bitpacker.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-rsc] (ecmascript)");
module.exports = function(dataIn, width, height, options) {
    let outHasAlpha = [
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.colorType) !== -1;
    if (options.colorType === options.inputColorType) {
        let bigEndian = function() {
            let buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true);
            // Int16Array uses the platform's endianness.
            return new Int16Array(buffer)[0] !== 256;
        }();
        // If no need to convert to grayscale and alpha is present/absent in both, take a fast route
        if (options.bitDepth === 8 || options.bitDepth === 16 && bigEndian) {
            return dataIn;
        }
    }
    // map to a UInt16 array if data is 16bit, fix endianness below
    let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);
    let maxValue = 255;
    let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
    if (inBpp === 4 && !options.inputHasAlpha) {
        inBpp = 3;
    }
    let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
    if (options.bitDepth === 16) {
        maxValue = 65535;
        outBpp *= 2;
    }
    let outData = Buffer.alloc(width * height * outBpp);
    let inIndex = 0;
    let outIndex = 0;
    let bgColor = options.bgColor || {};
    if (bgColor.red === undefined) {
        bgColor.red = maxValue;
    }
    if (bgColor.green === undefined) {
        bgColor.green = maxValue;
    }
    if (bgColor.blue === undefined) {
        bgColor.blue = maxValue;
    }
    function getRGBA() {
        let red;
        let green;
        let blue;
        let alpha = maxValue;
        switch(options.inputColorType){
            case constants.COLORTYPE_COLOR_ALPHA:
                alpha = data[inIndex + 3];
                red = data[inIndex];
                green = data[inIndex + 1];
                blue = data[inIndex + 2];
                break;
            case constants.COLORTYPE_COLOR:
                red = data[inIndex];
                green = data[inIndex + 1];
                blue = data[inIndex + 2];
                break;
            case constants.COLORTYPE_ALPHA:
                alpha = data[inIndex + 1];
                red = data[inIndex];
                green = red;
                blue = red;
                break;
            case constants.COLORTYPE_GRAYSCALE:
                red = data[inIndex];
                green = red;
                blue = red;
                break;
            default:
                throw new Error("input color type:" + options.inputColorType + " is not supported at present");
        }
        if (options.inputHasAlpha) {
            if (!outHasAlpha) {
                alpha /= maxValue;
                red = Math.min(Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0), maxValue);
                green = Math.min(Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0), maxValue);
                blue = Math.min(Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0), maxValue);
            }
        }
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha
        };
    }
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let rgba = getRGBA(data, inIndex);
            switch(options.colorType){
                case constants.COLORTYPE_COLOR_ALPHA:
                case constants.COLORTYPE_COLOR:
                    if (options.bitDepth === 8) {
                        outData[outIndex] = rgba.red;
                        outData[outIndex + 1] = rgba.green;
                        outData[outIndex + 2] = rgba.blue;
                        if (outHasAlpha) {
                            outData[outIndex + 3] = rgba.alpha;
                        }
                    } else {
                        outData.writeUInt16BE(rgba.red, outIndex);
                        outData.writeUInt16BE(rgba.green, outIndex + 2);
                        outData.writeUInt16BE(rgba.blue, outIndex + 4);
                        if (outHasAlpha) {
                            outData.writeUInt16BE(rgba.alpha, outIndex + 6);
                        }
                    }
                    break;
                case constants.COLORTYPE_ALPHA:
                case constants.COLORTYPE_GRAYSCALE:
                    {
                        // Convert to grayscale and alpha
                        let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
                        if (options.bitDepth === 8) {
                            outData[outIndex] = grayscale;
                            if (outHasAlpha) {
                                outData[outIndex + 1] = rgba.alpha;
                            }
                        } else {
                            outData.writeUInt16BE(grayscale, outIndex);
                            if (outHasAlpha) {
                                outData.writeUInt16BE(rgba.alpha, outIndex + 2);
                            }
                        }
                        break;
                    }
                default:
                    throw new Error("unrecognised color Type " + options.colorType);
            }
            inIndex += inBpp;
            outIndex += outBpp;
        }
    }
    return outData;
};
}),
"[project]/node_modules/pngjs/lib/filter-pack.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let paethPredictor = __turbopack_context__.r("[project]/node_modules/pngjs/lib/paeth-predictor.js [app-rsc] (ecmascript)");
function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
    for(let x = 0; x < byteWidth; x++){
        rawData[rawPos + x] = pxData[pxPos + x];
    }
}
function filterSumNone(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for(let i = pxPos; i < length; i++){
        sum += Math.abs(pxData[i]);
    }
    return sum;
}
function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        rawData[rawPos + x] = val;
    }
}
function filterSumSub(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        sum += Math.abs(val);
    }
    return sum;
}
function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
    for(let x = 0; x < byteWidth; x++){
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - up;
        rawData[rawPos + x] = val;
    }
}
function filterSumUp(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for(let x = pxPos; x < length; x++){
        let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
        let val = pxData[x] - up;
        sum += Math.abs(val);
    }
    return sum;
}
function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        rawData[rawPos + x] = val;
    }
}
function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        sum += Math.abs(val);
    }
    return sum;
}
function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        rawData[rawPos + x] = val;
    }
}
function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for(let x = 0; x < byteWidth; x++){
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        sum += Math.abs(val);
    }
    return sum;
}
let filters = {
    0: filterNone,
    1: filterSub,
    2: filterUp,
    3: filterAvg,
    4: filterPaeth
};
let filterSums = {
    0: filterSumNone,
    1: filterSumSub,
    2: filterSumUp,
    3: filterSumAvg,
    4: filterSumPaeth
};
module.exports = function(pxData, width, height, options, bpp) {
    let filterTypes;
    if (!("filterType" in options) || options.filterType === -1) {
        filterTypes = [
            0,
            1,
            2,
            3,
            4
        ];
    } else if (typeof options.filterType === "number") {
        filterTypes = [
            options.filterType
        ];
    } else {
        throw new Error("unrecognised filter types");
    }
    if (options.bitDepth === 16) {
        bpp *= 2;
    }
    let byteWidth = width * bpp;
    let rawPos = 0;
    let pxPos = 0;
    let rawData = Buffer.alloc((byteWidth + 1) * height);
    let sel = filterTypes[0];
    for(let y = 0; y < height; y++){
        if (filterTypes.length > 1) {
            // find best filter for this line (with lowest sum of values)
            let min = Infinity;
            for(let i = 0; i < filterTypes.length; i++){
                let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
                if (sum < min) {
                    sel = filterTypes[i];
                    min = sum;
                }
            }
        }
        rawData[rawPos] = sel;
        rawPos++;
        filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
    }
    return rawData;
};
}),
"[project]/node_modules/pngjs/lib/packer.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-rsc] (ecmascript)");
let CrcStream = __turbopack_context__.r("[project]/node_modules/pngjs/lib/crc.js [app-rsc] (ecmascript)");
let bitPacker = __turbopack_context__.r("[project]/node_modules/pngjs/lib/bitpacker.js [app-rsc] (ecmascript)");
let filter = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-pack.js [app-rsc] (ecmascript)");
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let Packer = module.exports = function(options) {
    this._options = options;
    options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
    options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
    options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
    options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
    options.deflateFactory = options.deflateFactory || zlib.createDeflate;
    options.bitDepth = options.bitDepth || 8;
    // This is outputColorType
    options.colorType = typeof options.colorType === "number" ? options.colorType : constants.COLORTYPE_COLOR_ALPHA;
    options.inputColorType = typeof options.inputColorType === "number" ? options.inputColorType : constants.COLORTYPE_COLOR_ALPHA;
    if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.colorType) === -1) {
        throw new Error("option color type:" + options.colorType + " is not supported at present");
    }
    if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
    ].indexOf(options.inputColorType) === -1) {
        throw new Error("option input color type:" + options.inputColorType + " is not supported at present");
    }
    if (options.bitDepth !== 8 && options.bitDepth !== 16) {
        throw new Error("option bit depth:" + options.bitDepth + " is not supported at present");
    }
};
Packer.prototype.getDeflateOptions = function() {
    return {
        chunkSize: this._options.deflateChunkSize,
        level: this._options.deflateLevel,
        strategy: this._options.deflateStrategy
    };
};
Packer.prototype.createDeflate = function() {
    return this._options.deflateFactory(this.getDeflateOptions());
};
Packer.prototype.filterData = function(data, width, height) {
    // convert to correct format for filtering (e.g. right bpp and bit depth)
    let packedData = bitPacker(data, width, height, this._options);
    // filter pixel data
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
    let filteredData = filter(packedData, width, height, this._options, bpp);
    return filteredData;
};
Packer.prototype._packChunk = function(type, data) {
    let len = data ? data.length : 0;
    let buf = Buffer.alloc(len + 12);
    buf.writeUInt32BE(len, 0);
    buf.writeUInt32BE(type, 4);
    if (data) {
        data.copy(buf, 8);
    }
    buf.writeInt32BE(CrcStream.crc32(buf.slice(4, buf.length - 4)), buf.length - 4);
    return buf;
};
Packer.prototype.packGAMA = function(gamma) {
    let buf = Buffer.alloc(4);
    buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
    return this._packChunk(constants.TYPE_gAMA, buf);
};
Packer.prototype.packIHDR = function(width, height) {
    let buf = Buffer.alloc(13);
    buf.writeUInt32BE(width, 0);
    buf.writeUInt32BE(height, 4);
    buf[8] = this._options.bitDepth; // Bit depth
    buf[9] = this._options.colorType; // colorType
    buf[10] = 0; // compression
    buf[11] = 0; // filter
    buf[12] = 0; // interlace
    return this._packChunk(constants.TYPE_IHDR, buf);
};
Packer.prototype.packIDAT = function(data) {
    return this._packChunk(constants.TYPE_IDAT, data);
};
Packer.prototype.packIEND = function() {
    return this._packChunk(constants.TYPE_IEND, null);
};
}),
"[project]/node_modules/pngjs/lib/packer-async.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-rsc] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer.js [app-rsc] (ecmascript)");
let PackerAsync = module.exports = function(opt) {
    Stream.call(this);
    let options = opt || {};
    this._packer = new Packer(options);
    this._deflate = this._packer.createDeflate();
    this.readable = true;
};
util.inherits(PackerAsync, Stream);
PackerAsync.prototype.pack = function(data, width, height, gamma) {
    // Signature
    this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
    this.emit("data", this._packer.packIHDR(width, height));
    if (gamma) {
        this.emit("data", this._packer.packGAMA(gamma));
    }
    let filteredData = this._packer.filterData(data, width, height);
    // compress it
    this._deflate.on("error", this.emit.bind(this, "error"));
    this._deflate.on("data", (function(compressedData) {
        this.emit("data", this._packer.packIDAT(compressedData));
    }).bind(this));
    this._deflate.on("end", (function() {
        this.emit("data", this._packer.packIEND());
        this.emit("end");
    }).bind(this));
    this._deflate.end(filteredData);
};
}),
"[project]/node_modules/pngjs/lib/sync-inflate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let assert = __turbopack_context__.r("[externals]/assert [external] (assert, cjs)").ok;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let kMaxLength = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").kMaxLength;
function Inflate(opts) {
    if (!(this instanceof Inflate)) {
        return new Inflate(opts);
    }
    if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
        opts.chunkSize = zlib.Z_MIN_CHUNK;
    }
    zlib.Inflate.call(this, opts);
    // Node 8 --> 9 compatibility check
    this._offset = this._offset === undefined ? this._outOffset : this._offset;
    this._buffer = this._buffer || this._outBuffer;
    if (opts && opts.maxLength != null) {
        this._maxLength = opts.maxLength;
    }
}
function createInflate(opts) {
    return new Inflate(opts);
}
function _close(engine, callback) {
    if (callback) {
        process.nextTick(callback);
    }
    // Caller may invoke .close after a zlib error (which will null _handle).
    if (!engine._handle) {
        return;
    }
    engine._handle.close();
    engine._handle = null;
}
Inflate.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
    if (typeof asyncCb === "function") {
        return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
    }
    let self = this;
    let availInBefore = chunk && chunk.length;
    let availOutBefore = this._chunkSize - this._offset;
    let leftToInflate = this._maxLength;
    let inOff = 0;
    let buffers = [];
    let nread = 0;
    let error;
    this.on("error", function(err) {
        error = err;
    });
    function handleChunk(availInAfter, availOutAfter) {
        if (self._hadError) {
            return;
        }
        let have = availOutBefore - availOutAfter;
        assert(have >= 0, "have should not go down");
        if (have > 0) {
            let out = self._buffer.slice(self._offset, self._offset + have);
            self._offset += have;
            if (out.length > leftToInflate) {
                out = out.slice(0, leftToInflate);
            }
            buffers.push(out);
            nread += out.length;
            leftToInflate -= out.length;
            if (leftToInflate === 0) {
                return false;
            }
        }
        if (availOutAfter === 0 || self._offset >= self._chunkSize) {
            availOutBefore = self._chunkSize;
            self._offset = 0;
            self._buffer = Buffer.allocUnsafe(self._chunkSize);
        }
        if (availOutAfter === 0) {
            inOff += availInBefore - availInAfter;
            availInBefore = availInAfter;
            return true;
        }
        return false;
    }
    assert(this._handle, "zlib binding closed");
    let res;
    do {
        res = this._handle.writeSync(flushFlag, chunk, inOff, availInBefore, this._buffer, this._offset, availOutBefore); // out_len
        // Node 8 --> 9 compatibility check
        res = res || this._writeState;
    }while (!this._hadError && handleChunk(res[0], res[1]))
    if (this._hadError) {
        throw error;
    }
    if (nread >= kMaxLength) {
        _close(this);
        throw new RangeError("Cannot create final Buffer. It would be larger than 0x" + kMaxLength.toString(16) + " bytes");
    }
    let buf = Buffer.concat(buffers, nread);
    _close(this);
    return buf;
};
util.inherits(Inflate, zlib.Inflate);
function zlibBufferSync(engine, buffer) {
    if (typeof buffer === "string") {
        buffer = Buffer.from(buffer);
    }
    if (!(buffer instanceof Buffer)) {
        throw new TypeError("Not a string or buffer");
    }
    let flushFlag = engine._finishFlushFlag;
    if (flushFlag == null) {
        flushFlag = zlib.Z_FINISH;
    }
    return engine._processChunk(buffer, flushFlag);
}
function inflateSync(buffer, opts) {
    return zlibBufferSync(new Inflate(opts), buffer);
}
module.exports = exports = inflateSync;
exports.Inflate = Inflate;
exports.createInflate = createInflate;
exports.inflateSync = inflateSync;
}),
"[project]/node_modules/pngjs/lib/sync-reader.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let SyncReader = module.exports = function(buffer) {
    this._buffer = buffer;
    this._reads = [];
};
SyncReader.prototype.read = function(length, callback) {
    this._reads.push({
        length: Math.abs(length),
        allowLess: length < 0,
        func: callback
    });
};
SyncReader.prototype.process = function() {
    // as long as there is any data and read requests
    while(this._reads.length > 0 && this._buffer.length){
        let read = this._reads[0];
        if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {
            // ok there is any data so that we can satisfy this request
            this._reads.shift(); // == read
            let buf = this._buffer;
            this._buffer = buf.slice(read.length);
            read.func.call(this, buf.slice(0, read.length));
        } else {
            break;
        }
    }
    if (this._reads.length > 0) {
        return new Error("There are some read requests waitng on finished stream");
    }
    if (this._buffer.length > 0) {
        return new Error("unrecognised content at end of stream");
    }
};
}),
"[project]/node_modules/pngjs/lib/filter-parse-sync.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let SyncReader = __turbopack_context__.r("[project]/node_modules/pngjs/lib/sync-reader.js [app-rsc] (ecmascript)");
let Filter = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse.js [app-rsc] (ecmascript)");
exports.process = function(inBuffer, bitmapInfo) {
    let outBuffers = [];
    let reader = new SyncReader(inBuffer);
    let filter = new Filter(bitmapInfo, {
        read: reader.read.bind(reader),
        write: function(bufferPart) {
            outBuffers.push(bufferPart);
        },
        complete: function() {}
    });
    filter.start();
    reader.process();
    return Buffer.concat(outBuffers);
};
}),
"[project]/node_modules/pngjs/lib/parser-sync.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let hasSyncZlib = true;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
let inflateSync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/sync-inflate.js [app-rsc] (ecmascript)");
if (!zlib.deflateSync) {
    hasSyncZlib = false;
}
let SyncReader = __turbopack_context__.r("[project]/node_modules/pngjs/lib/sync-reader.js [app-rsc] (ecmascript)");
let FilterSync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/filter-parse-sync.js [app-rsc] (ecmascript)");
let Parser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser.js [app-rsc] (ecmascript)");
let bitmapper = __turbopack_context__.r("[project]/node_modules/pngjs/lib/bitmapper.js [app-rsc] (ecmascript)");
let formatNormaliser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/format-normaliser.js [app-rsc] (ecmascript)");
module.exports = function(buffer, options) {
    if (!hasSyncZlib) {
        throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let err;
    function handleError(_err_) {
        err = _err_;
    }
    let metaData;
    function handleMetaData(_metaData_) {
        metaData = _metaData_;
    }
    function handleTransColor(transColor) {
        metaData.transColor = transColor;
    }
    function handlePalette(palette) {
        metaData.palette = palette;
    }
    function handleSimpleTransparency() {
        metaData.alpha = true;
    }
    let gamma;
    function handleGamma(_gamma_) {
        gamma = _gamma_;
    }
    let inflateDataList = [];
    function handleInflateData(inflatedData) {
        inflateDataList.push(inflatedData);
    }
    let reader = new SyncReader(buffer);
    let parser = new Parser(options, {
        read: reader.read.bind(reader),
        error: handleError,
        metadata: handleMetaData,
        gamma: handleGamma,
        palette: handlePalette,
        transColor: handleTransColor,
        inflateData: handleInflateData,
        simpleTransparency: handleSimpleTransparency
    });
    parser.start();
    reader.process();
    if (err) {
        throw err;
    }
    //join together the inflate datas
    let inflateData = Buffer.concat(inflateDataList);
    inflateDataList.length = 0;
    let inflatedData;
    if (metaData.interlace) {
        inflatedData = zlib.inflateSync(inflateData);
    } else {
        let rowSize = (metaData.width * metaData.bpp * metaData.depth + 7 >> 3) + 1;
        let imageSize = rowSize * metaData.height;
        inflatedData = inflateSync(inflateData, {
            chunkSize: imageSize,
            maxLength: imageSize
        });
    }
    inflateData = null;
    if (!inflatedData || !inflatedData.length) {
        throw new Error("bad png - invalid inflate data response");
    }
    let unfilteredData = FilterSync.process(inflatedData, metaData);
    inflateData = null;
    let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
    unfilteredData = null;
    let normalisedBitmapData = formatNormaliser(bitmapData, metaData);
    metaData.data = normalisedBitmapData;
    metaData.gamma = gamma || 0;
    return metaData;
};
}),
"[project]/node_modules/pngjs/lib/packer-sync.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let hasSyncZlib = true;
let zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
if (!zlib.deflateSync) {
    hasSyncZlib = false;
}
let constants = __turbopack_context__.r("[project]/node_modules/pngjs/lib/constants.js [app-rsc] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer.js [app-rsc] (ecmascript)");
module.exports = function(metaData, opt) {
    if (!hasSyncZlib) {
        throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let options = opt || {};
    let packer = new Packer(options);
    let chunks = [];
    // Signature
    chunks.push(Buffer.from(constants.PNG_SIGNATURE));
    // Header
    chunks.push(packer.packIHDR(metaData.width, metaData.height));
    if (metaData.gamma) {
        chunks.push(packer.packGAMA(metaData.gamma));
    }
    let filteredData = packer.filterData(metaData.data, metaData.width, metaData.height);
    // compress it
    let compressedData = zlib.deflateSync(filteredData, packer.getDeflateOptions());
    filteredData = null;
    if (!compressedData || !compressedData.length) {
        throw new Error("bad png - invalid compressed data response");
    }
    chunks.push(packer.packIDAT(compressedData));
    // End
    chunks.push(packer.packIEND());
    return Buffer.concat(chunks);
};
}),
"[project]/node_modules/pngjs/lib/png-sync.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let parse = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser-sync.js [app-rsc] (ecmascript)");
let pack = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer-sync.js [app-rsc] (ecmascript)");
exports.read = function(buffer, options) {
    return parse(buffer, options || {});
};
exports.write = function(png, options) {
    return pack(png, options);
};
}),
"[project]/node_modules/pngjs/lib/png.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

let util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
let Parser = __turbopack_context__.r("[project]/node_modules/pngjs/lib/parser-async.js [app-rsc] (ecmascript)");
let Packer = __turbopack_context__.r("[project]/node_modules/pngjs/lib/packer-async.js [app-rsc] (ecmascript)");
let PNGSync = __turbopack_context__.r("[project]/node_modules/pngjs/lib/png-sync.js [app-rsc] (ecmascript)");
let PNG = exports.PNG = function(options) {
    Stream.call(this);
    options = options || {}; // eslint-disable-line no-param-reassign
    // coerce pixel dimensions to integers (also coerces undefined -> 0):
    this.width = options.width | 0;
    this.height = options.height | 0;
    this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null;
    if (options.fill && this.data) {
        this.data.fill(0);
    }
    this.gamma = 0;
    this.readable = this.writable = true;
    this._parser = new Parser(options);
    this._parser.on("error", this.emit.bind(this, "error"));
    this._parser.on("close", this._handleClose.bind(this));
    this._parser.on("metadata", this._metadata.bind(this));
    this._parser.on("gamma", this._gamma.bind(this));
    this._parser.on("parsed", (function(data) {
        this.data = data;
        this.emit("parsed", data);
    }).bind(this));
    this._packer = new Packer(options);
    this._packer.on("data", this.emit.bind(this, "data"));
    this._packer.on("end", this.emit.bind(this, "end"));
    this._parser.on("close", this._handleClose.bind(this));
    this._packer.on("error", this.emit.bind(this, "error"));
};
util.inherits(PNG, Stream);
PNG.sync = PNGSync;
PNG.prototype.pack = function() {
    if (!this.data || !this.data.length) {
        this.emit("error", "No data provided");
        return this;
    }
    process.nextTick((function() {
        this._packer.pack(this.data, this.width, this.height, this.gamma);
    }).bind(this));
    return this;
};
PNG.prototype.parse = function(data, callback) {
    if (callback) {
        let onParsed, onError;
        onParsed = (function(parsedData) {
            this.removeListener("error", onError);
            this.data = parsedData;
            callback(null, this);
        }).bind(this);
        onError = (function(err) {
            this.removeListener("parsed", onParsed);
            callback(err, null);
        }).bind(this);
        this.once("parsed", onParsed);
        this.once("error", onError);
    }
    this.end(data);
    return this;
};
PNG.prototype.write = function(data) {
    this._parser.write(data);
    return true;
};
PNG.prototype.end = function(data) {
    this._parser.end(data);
};
PNG.prototype._metadata = function(metadata) {
    this.width = metadata.width;
    this.height = metadata.height;
    this.emit("metadata", metadata);
};
PNG.prototype._gamma = function(gamma) {
    this.gamma = gamma;
};
PNG.prototype._handleClose = function() {
    if (!this._parser.writable && !this._packer.readable) {
        this.emit("close");
    }
};
PNG.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) {
    // eslint-disable-line max-params
    // coerce pixel dimensions to integers (also coerces undefined -> 0):
    /* eslint-disable no-param-reassign */ srcX |= 0;
    srcY |= 0;
    width |= 0;
    height |= 0;
    deltaX |= 0;
    deltaY |= 0;
    /* eslint-enable no-param-reassign */ if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
        throw new Error("bitblt reading outside image");
    }
    if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
        throw new Error("bitblt writing outside image");
    }
    for(let y = 0; y < height; y++){
        src.data.copy(dst.data, (deltaY + y) * dst.width + deltaX << 2, (srcY + y) * src.width + srcX << 2, (srcY + y) * src.width + srcX + width << 2);
    }
};
PNG.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) {
    // eslint-disable-line max-params
    PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
    return this;
};
PNG.adjustGamma = function(src) {
    if (src.gamma) {
        for(let y = 0; y < src.height; y++){
            for(let x = 0; x < src.width; x++){
                let idx = src.width * y + x << 2;
                for(let i = 0; i < 3; i++){
                    let sample = src.data[idx + i] / 255;
                    sample = Math.pow(sample, 1 / 2.2 / src.gamma);
                    src.data[idx + i] = Math.round(sample * 255);
                }
            }
        }
        src.gamma = 0;
    }
};
PNG.prototype.adjustGamma = function() {
    PNG.adjustGamma(this);
};
}),
"[project]/node_modules/qrcode/lib/renderer/png.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const PNG = __turbopack_context__.r("[project]/node_modules/pngjs/lib/png.js [app-rsc] (ecmascript)").PNG;
const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-rsc] (ecmascript)");
exports.render = function render(qrData, options) {
    const opts = Utils.getOptions(options);
    const pngOpts = opts.rendererOpts;
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    pngOpts.width = size;
    pngOpts.height = size;
    const pngImage = new PNG(pngOpts);
    Utils.qrToImageData(pngImage.data, qrData, opts);
    return pngImage;
};
exports.renderToDataURL = function renderToDataURL(qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    exports.renderToBuffer(qrData, options, function(err, output) {
        if (err) cb(err);
        let url = 'data:image/png;base64,';
        url += output.toString('base64');
        cb(null, url);
    });
};
exports.renderToBuffer = function renderToBuffer(qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const png = exports.render(qrData, options);
    const buffer = [];
    png.on('error', cb);
    png.on('data', function(data) {
        buffer.push(data);
    });
    png.on('end', function() {
        cb(null, Buffer.concat(buffer));
    });
    png.pack();
};
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    let called = false;
    const done = (...args)=>{
        if (called) return;
        called = true;
        cb.apply(null, args);
    };
    const stream = fs.createWriteStream(path);
    stream.on('error', done);
    stream.on('close', done);
    exports.renderToFileStream(stream, qrData, options);
};
exports.renderToFileStream = function renderToFileStream(stream, qrData, options) {
    const png = exports.render(qrData, options);
    png.pack().pipe(stream);
};
}),
"[project]/node_modules/qrcode/lib/renderer/utf8.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utils.js [app-rsc] (ecmascript)");
const BLOCK_CHAR = {
    WW: ' ',
    WB: '▄',
    BB: '█',
    BW: '▀'
};
const INVERTED_BLOCK_CHAR = {
    BB: ' ',
    BW: '▄',
    WW: '█',
    WB: '▀'
};
function getBlockChar(top, bottom, blocks) {
    if (top && bottom) return blocks.BB;
    if (top && !bottom) return blocks.BW;
    if (!top && bottom) return blocks.WB;
    return blocks.WW;
}
exports.render = function(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    let blocks = BLOCK_CHAR;
    if (opts.color.dark.hex === '#ffffff' || opts.color.light.hex === '#000000') {
        blocks = INVERTED_BLOCK_CHAR;
    }
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    let output = '';
    let hMargin = Array(size + opts.margin * 2 + 1).join(blocks.WW);
    hMargin = Array(opts.margin / 2 + 1).join(hMargin + '\n');
    const vMargin = Array(opts.margin + 1).join(blocks.WW);
    output += hMargin;
    for(let i = 0; i < size; i += 2){
        output += vMargin;
        for(let j = 0; j < size; j++){
            const topModule = data[i * size + j];
            const bottomModule = data[(i + 1) * size + j];
            output += getBlockChar(topModule, bottomModule, blocks);
        }
        output += vMargin + '\n';
    }
    output += hMargin.slice(0, -1);
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
};
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const utf8 = exports.render(qrData, options);
    fs.writeFile(path, utf8, cb);
};
}),
"[project]/node_modules/qrcode/lib/renderer/terminal/terminal.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// let Utils = require('./utils')
exports.render = function(qrData, options, cb) {
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    // let opts = Utils.getOptions(options)
    // use same scheme as https://github.com/gtanner/qrcode-terminal because it actually works! =)
    const black = '\x1b[40m  \x1b[0m';
    const white = '\x1b[47m  \x1b[0m';
    let output = '';
    const hMargin = Array(size + 3).join(white);
    const vMargin = Array(2).join(white);
    output += hMargin + '\n';
    for(let i = 0; i < size; ++i){
        output += white;
        for(let j = 0; j < size; j++){
            // let topModule = data[i * size + j]
            // let bottomModule = data[(i + 1) * size + j]
            output += data[i * size + j] ? black : white; // getBlockChar(topModule, bottomModule)
        }
        // output += white+'\n'
        output += vMargin + '\n';
    }
    output += hMargin + '\n';
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
}; /*
exports.renderToFile = function renderToFile (path, qrData, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options
    options = undefined
  }

  let fs = require('fs')
  let utf8 = exports.render(qrData, options)
  fs.writeFile(path, utf8, cb)
}
*/ 
}),
"[project]/node_modules/qrcode/lib/renderer/terminal/terminal-small.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const backgroundWhite = '\x1b[47m';
const backgroundBlack = '\x1b[40m';
const foregroundWhite = '\x1b[37m';
const foregroundBlack = '\x1b[30m';
const reset = '\x1b[0m';
const lineSetupNormal = backgroundWhite + foregroundBlack // setup colors
;
const lineSetupInverse = backgroundBlack + foregroundWhite // setup colors
;
const createPalette = function(lineSetup, foregroundWhite, foregroundBlack) {
    return {
        // 1 ... white, 2 ... black, 0 ... transparent (default)
        '00': reset + ' ' + lineSetup,
        '01': reset + foregroundWhite + '▄' + lineSetup,
        '02': reset + foregroundBlack + '▄' + lineSetup,
        10: reset + foregroundWhite + '▀' + lineSetup,
        11: ' ',
        12: '▄',
        20: reset + foregroundBlack + '▀' + lineSetup,
        21: '▀',
        22: '█'
    };
};
/**
 * Returns code for QR pixel
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {'0' | '1' | '2'}
 */ const mkCodePixel = function(modules, size, x, y) {
    const sizePlus = size + 1;
    if (x >= sizePlus || y >= sizePlus || y < -1 || x < -1) return '0';
    if (x >= size || y >= size || y < 0 || x < 0) return '1';
    const idx = y * size + x;
    return modules[idx] ? '2' : '1';
};
/**
 * Returns code for four QR pixels. Suitable as key in palette.
 * @param {boolean[][]} modules
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @return {keyof palette}
 */ const mkCode = function(modules, size, x, y) {
    return mkCodePixel(modules, size, x, y) + mkCodePixel(modules, size, x, y + 1);
};
exports.render = function(qrData, options, cb) {
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const inverse = !!(options && options.inverse);
    const lineSetup = options && options.inverse ? lineSetupInverse : lineSetupNormal;
    const white = inverse ? foregroundBlack : foregroundWhite;
    const black = inverse ? foregroundWhite : foregroundBlack;
    const palette = createPalette(lineSetup, white, black);
    const newLine = reset + '\n' + lineSetup;
    let output = lineSetup // setup colors
    ;
    for(let y = -1; y < size + 1; y += 2){
        for(let x = -1; x < size; x++){
            output += palette[mkCode(data, size, x, y)];
        }
        output += palette[mkCode(data, size, size, y)] + newLine;
    }
    output += reset;
    if (typeof cb === 'function') {
        cb(null, output);
    }
    return output;
};
}),
"[project]/node_modules/qrcode/lib/renderer/terminal.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const big = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/terminal/terminal.js [app-rsc] (ecmascript)");
const small = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/terminal/terminal-small.js [app-rsc] (ecmascript)");
exports.render = function(qrData, options, cb) {
    if (options && options.small) {
        return small.render(qrData, options, cb);
    }
    return big.render(qrData, options, cb);
};
}),
"[project]/node_modules/qrcode/lib/renderer/svg.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const svgTagRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/svg-tag.js [app-rsc] (ecmascript)");
exports.render = svgTagRenderer.render;
exports.renderToFile = function renderToFile(path, qrData, options, cb) {
    if (typeof cb === 'undefined') {
        cb = options;
        options = undefined;
    }
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const svgTag = exports.render(qrData, options);
    const xmlStr = '<?xml version="1.0" encoding="utf-8"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + svgTag;
    fs.writeFile(path, xmlStr, cb);
};
}),
"[project]/node_modules/qrcode/lib/server.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const canPromise = __turbopack_context__.r("[project]/node_modules/qrcode/lib/can-promise.js [app-rsc] (ecmascript)");
const QRCode = __turbopack_context__.r("[project]/node_modules/qrcode/lib/core/qrcode.js [app-rsc] (ecmascript)");
const PngRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/png.js [app-rsc] (ecmascript)");
const Utf8Renderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/utf8.js [app-rsc] (ecmascript)");
const TerminalRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/terminal.js [app-rsc] (ecmascript)");
const SvgRenderer = __turbopack_context__.r("[project]/node_modules/qrcode/lib/renderer/svg.js [app-rsc] (ecmascript)");
function checkParams(text, opts, cb) {
    if (typeof text === 'undefined') {
        throw new Error('String required as first argument');
    }
    if (typeof cb === 'undefined') {
        cb = opts;
        opts = {};
    }
    if (typeof cb !== 'function') {
        if (!canPromise()) {
            throw new Error('Callback required as last argument');
        } else {
            opts = cb || {};
            cb = null;
        }
    }
    return {
        opts: opts,
        cb: cb
    };
}
function getTypeFromFilename(path) {
    return path.slice((path.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
}
function getRendererFromType(type) {
    switch(type){
        case 'svg':
            return SvgRenderer;
        case 'txt':
        case 'utf8':
            return Utf8Renderer;
        case 'png':
        case 'image/png':
        default:
            return PngRenderer;
    }
}
function getStringRendererFromType(type) {
    switch(type){
        case 'svg':
            return SvgRenderer;
        case 'terminal':
            return TerminalRenderer;
        case 'utf8':
        default:
            return Utf8Renderer;
    }
}
function render(renderFunc, text, params) {
    if (!params.cb) {
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, params.opts);
                return renderFunc(data, params.opts, function(err, data) {
                    return err ? reject(err) : resolve(data);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, params.opts);
        return renderFunc(data, params.opts, params.cb);
    } catch (e) {
        params.cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = __turbopack_context__.r("[project]/node_modules/qrcode/lib/browser.js [app-rsc] (ecmascript)").toCanvas;
exports.toString = function toString(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const type = params.opts ? params.opts.type : undefined;
    const renderer = getStringRendererFromType(type);
    return render(renderer.render, text, params);
};
exports.toDataURL = function toDataURL(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const renderer = getRendererFromType(params.opts.type);
    return render(renderer.renderToDataURL, text, params);
};
exports.toBuffer = function toBuffer(text, opts, cb) {
    const params = checkParams(text, opts, cb);
    const renderer = getRendererFromType(params.opts.type);
    return render(renderer.renderToBuffer, text, params);
};
exports.toFile = function toFile(path, text, opts, cb) {
    if (typeof path !== 'string' || !(typeof text === 'string' || typeof text === 'object')) {
        throw new Error('Invalid argument');
    }
    if (arguments.length < 3 && !canPromise()) {
        throw new Error('Too few arguments provided');
    }
    const params = checkParams(text, opts, cb);
    const type = params.opts.type || getTypeFromFilename(path);
    const renderer = getRendererFromType(type);
    const renderToFile = renderer.renderToFile.bind(null, path);
    return render(renderToFile, text, params);
};
exports.toFileStream = function toFileStream(stream, text, opts) {
    if (arguments.length < 2) {
        throw new Error('Too few arguments provided');
    }
    const params = checkParams(text, opts, stream.emit.bind(stream, 'error'));
    const renderer = getRendererFromType('png') // Only png support for now
    ;
    const renderToFileStream = renderer.renderToFileStream.bind(null, stream);
    render(renderToFileStream, text, params);
};
}),
"[project]/node_modules/qrcode/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
*copyright Ryan Day 2012
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* this is the main server side application file for node-qrcode.
* these exports use serverside canvas api methods for file IO and buffers
*
*/ module.exports = __turbopack_context__.r("[project]/node_modules/qrcode/lib/server.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/nodemailer/lib/fetch/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// module to handle cookies
const urllib = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const SESSION_TIMEOUT = 1800; // 30 min
/**
 * Creates a biskviit cookie jar for managing cookie values in memory
 *
 * @constructor
 * @param {Object} [options] Optional options object
 */ class Cookies {
    constructor(options){
        this.options = options || {};
        this.cookies = [];
    }
    /**
     * Stores a cookie string to the cookie storage
     *
     * @param {String} cookieStr Value from the 'Set-Cookie:' header
     * @param {String} url Current URL
     */ set(cookieStr, url) {
        let urlparts = urllib.parse(url || '');
        let cookie = this.parse(cookieStr);
        let domain;
        if (cookie.domain) {
            domain = cookie.domain.replace(/^\./, '');
            // do not allow cross origin cookies
            if (// can't be valid if the requested domain is shorter than current hostname
            urlparts.hostname.length < domain.length || // prefix domains with dot to be sure that partial matches are not used
            ('.' + urlparts.hostname).substr(-domain.length + 1) !== '.' + domain) {
                cookie.domain = urlparts.hostname;
            }
        } else {
            cookie.domain = urlparts.hostname;
        }
        if (!cookie.path) {
            cookie.path = this.getPath(urlparts.pathname);
        }
        // if no expire date, then use sessionTimeout value
        if (!cookie.expires) {
            cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1000);
        }
        return this.add(cookie);
    }
    /**
     * Returns cookie string for the 'Cookie:' header.
     *
     * @param {String} url URL to check for
     * @returns {String} Cookie header or empty string if no matches were found
     */ get(url) {
        return this.list(url).map((cookie)=>cookie.name + '=' + cookie.value).join('; ');
    }
    /**
     * Lists all valied cookie objects for the specified URL
     *
     * @param {String} url URL to check for
     * @returns {Array} An array of cookie objects
     */ list(url) {
        let result = [];
        let i;
        let cookie;
        for(i = this.cookies.length - 1; i >= 0; i--){
            cookie = this.cookies[i];
            if (this.isExpired(cookie)) {
                this.cookies.splice(i, i);
                continue;
            }
            if (this.match(cookie, url)) {
                result.unshift(cookie);
            }
        }
        return result;
    }
    /**
     * Parses cookie string from the 'Set-Cookie:' header
     *
     * @param {String} cookieStr String from the 'Set-Cookie:' header
     * @returns {Object} Cookie object
     */ parse(cookieStr) {
        let cookie = {};
        (cookieStr || '').toString().split(';').forEach((cookiePart)=>{
            let valueParts = cookiePart.split('=');
            let key = valueParts.shift().trim().toLowerCase();
            let value = valueParts.join('=').trim();
            let domain;
            if (!key) {
                // skip empty parts
                return;
            }
            switch(key){
                case 'expires':
                    value = new Date(value);
                    // ignore date if can not parse it
                    if (value.toString() !== 'Invalid Date') {
                        cookie.expires = value;
                    }
                    break;
                case 'path':
                    cookie.path = value;
                    break;
                case 'domain':
                    domain = value.toLowerCase();
                    if (domain.length && domain.charAt(0) !== '.') {
                        domain = '.' + domain; // ensure preceeding dot for user set domains
                    }
                    cookie.domain = domain;
                    break;
                case 'max-age':
                    cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1000);
                    break;
                case 'secure':
                    cookie.secure = true;
                    break;
                case 'httponly':
                    cookie.httponly = true;
                    break;
                default:
                    if (!cookie.name) {
                        cookie.name = key;
                        cookie.value = value;
                    }
            }
        });
        return cookie;
    }
    /**
     * Checks if a cookie object is valid for a specified URL
     *
     * @param {Object} cookie Cookie object
     * @param {String} url URL to check for
     * @returns {Boolean} true if cookie is valid for specifiec URL
     */ match(cookie, url) {
        let urlparts = urllib.parse(url || '');
        // check if hostname matches
        // .foo.com also matches subdomains, foo.com does not
        if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== '.' || ('.' + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
            return false;
        }
        // check if path matches
        let path = this.getPath(urlparts.pathname);
        if (path.substr(0, cookie.path.length) !== cookie.path) {
            return false;
        }
        // check secure argument
        if (cookie.secure && urlparts.protocol !== 'https:') {
            return false;
        }
        return true;
    }
    /**
     * Adds (or updates/removes if needed) a cookie object to the cookie storage
     *
     * @param {Object} cookie Cookie value to be stored
     */ add(cookie) {
        let i;
        let len;
        // nothing to do here
        if (!cookie || !cookie.name) {
            return false;
        }
        // overwrite if has same params
        for(i = 0, len = this.cookies.length; i < len; i++){
            if (this.compare(this.cookies[i], cookie)) {
                // check if the cookie needs to be removed instead
                if (this.isExpired(cookie)) {
                    this.cookies.splice(i, 1); // remove expired/unset cookie
                    return false;
                }
                this.cookies[i] = cookie;
                return true;
            }
        }
        // add as new if not already expired
        if (!this.isExpired(cookie)) {
            this.cookies.push(cookie);
        }
        return true;
    }
    /**
     * Checks if two cookie objects are the same
     *
     * @param {Object} a Cookie to check against
     * @param {Object} b Cookie to check against
     * @returns {Boolean} True, if the cookies are the same
     */ compare(a, b) {
        return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
    }
    /**
     * Checks if a cookie is expired
     *
     * @param {Object} cookie Cookie object to check against
     * @returns {Boolean} True, if the cookie is expired
     */ isExpired(cookie) {
        return cookie.expires && cookie.expires < new Date() || !cookie.value;
    }
    /**
     * Returns normalized cookie path for an URL path argument
     *
     * @param {String} pathname
     * @returns {String} Normalized path
     */ getPath(pathname) {
        let path = (pathname || '/').split('/');
        path.pop(); // remove filename part
        path = path.join('/').trim();
        // ensure path prefix /
        if (path.charAt(0) !== '/') {
            path = '/' + path;
        }
        // ensure path suffix /
        if (path.substr(-1) !== '/') {
            path += '/';
        }
        return path;
    }
}
module.exports = Cookies;
}),
"[project]/node_modules/nodemailer/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"name":"nodemailer","version":"7.0.13","description":"Easy as cake e-mail sending from your Node.js applications","main":"lib/nodemailer.js","scripts":{"test":"node --test --test-concurrency=1 test/**/*.test.js test/**/*-test.js","test:coverage":"c8 node --test --test-concurrency=1 test/**/*.test.js test/**/*-test.js","format":"prettier --write \"**/*.{js,json,md}\"","format:check":"prettier --check \"**/*.{js,json,md}\"","lint":"eslint .","lint:fix":"eslint . --fix","update":"rm -rf node_modules/ package-lock.json && ncu -u && npm install"},"repository":{"type":"git","url":"https://github.com/nodemailer/nodemailer.git"},"keywords":["Nodemailer"],"author":"Andris Reinman","license":"MIT-0","bugs":{"url":"https://github.com/nodemailer/nodemailer/issues"},"homepage":"https://nodemailer.com/","devDependencies":{"@aws-sdk/client-sesv2":"3.975.0","bunyan":"1.8.15","c8":"10.1.3","eslint":"9.39.2","eslint-config-prettier":"10.1.8","globals":"17.1.0","libbase64":"1.3.0","libmime":"5.3.7","libqp":"2.1.1","nodemailer-ntlm-auth":"1.0.4","prettier":"3.8.1","proxy":"1.0.2","proxy-test-server":"1.0.0","smtp-server":"3.18.0"},"engines":{"node":">=6.0.0"}});}),
"[project]/node_modules/nodemailer/lib/fetch/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
const https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
const urllib = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
const PassThrough = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").PassThrough;
const Cookies = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/fetch/cookies.js [app-rsc] (ecmascript)");
const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const net = __turbopack_context__.r("[externals]/net [external] (net, cjs)");
const MAX_REDIRECTS = 5;
module.exports = function(url, options) {
    return nmfetch(url, options);
};
module.exports.Cookies = Cookies;
function nmfetch(url, options) {
    options = options || {};
    options.fetchRes = options.fetchRes || new PassThrough();
    options.cookies = options.cookies || new Cookies();
    options.redirects = options.redirects || 0;
    options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;
    if (options.cookie) {
        [].concat(options.cookie || []).forEach((cookie)=>{
            options.cookies.set(cookie, url);
        });
        options.cookie = false;
    }
    let fetchRes = options.fetchRes;
    let parsed = urllib.parse(url);
    let method = (options.method || '').toString().trim().toUpperCase() || 'GET';
    let finished = false;
    let cookies;
    let body;
    let handler = parsed.protocol === 'https:' ? https : http;
    let headers = {
        'accept-encoding': 'gzip,deflate',
        'user-agent': 'nodemailer/' + packageData.version
    };
    Object.keys(options.headers || {}).forEach((key)=>{
        headers[key.toLowerCase().trim()] = options.headers[key];
    });
    if (options.userAgent) {
        headers['user-agent'] = options.userAgent;
    }
    if (parsed.auth) {
        headers.Authorization = 'Basic ' + Buffer.from(parsed.auth).toString('base64');
    }
    if (cookies = options.cookies.get(url)) {
        headers.cookie = cookies;
    }
    if (options.body) {
        if (options.contentType !== false) {
            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
        }
        if (typeof options.body.pipe === 'function') {
            // it's a stream
            headers['Transfer-Encoding'] = 'chunked';
            body = options.body;
            body.on('error', (err)=>{
                if (finished) {
                    return;
                }
                finished = true;
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
            });
        } else {
            if (options.body instanceof Buffer) {
                body = options.body;
            } else if (typeof options.body === 'object') {
                try {
                    // encodeURIComponent can fail on invalid input (partial emoji etc.)
                    body = Buffer.from(Object.keys(options.body).map((key)=>{
                        let value = options.body[key].toString().trim();
                        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
                    }).join('&'));
                } catch (E) {
                    if (finished) {
                        return;
                    }
                    finished = true;
                    E.type = 'FETCH';
                    E.sourceUrl = url;
                    fetchRes.emit('error', E);
                    return;
                }
            } else {
                body = Buffer.from(options.body.toString().trim());
            }
            headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded';
            headers['Content-Length'] = body.length;
        }
        // if method is not provided, use POST instead of GET
        method = (options.method || '').toString().trim().toUpperCase() || 'POST';
    }
    let req;
    let reqOptions = {
        method,
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port ? parsed.port : parsed.protocol === 'https:' ? 443 : 80,
        headers,
        rejectUnauthorized: false,
        agent: false
    };
    if (options.tls) {
        Object.keys(options.tls).forEach((key)=>{
            reqOptions[key] = options.tls[key];
        });
    }
    if (parsed.protocol === 'https:' && parsed.hostname && parsed.hostname !== reqOptions.host && !net.isIP(parsed.hostname) && !reqOptions.servername) {
        reqOptions.servername = parsed.hostname;
    }
    try {
        req = handler.request(reqOptions);
    } catch (E) {
        finished = true;
        setImmediate(()=>{
            E.type = 'FETCH';
            E.sourceUrl = url;
            fetchRes.emit('error', E);
        });
        return fetchRes;
    }
    if (options.timeout) {
        req.setTimeout(options.timeout, ()=>{
            if (finished) {
                return;
            }
            finished = true;
            req.abort();
            let err = new Error('Request Timeout');
            err.type = 'FETCH';
            err.sourceUrl = url;
            fetchRes.emit('error', err);
        });
    }
    req.on('error', (err)=>{
        if (finished) {
            return;
        }
        finished = true;
        err.type = 'FETCH';
        err.sourceUrl = url;
        fetchRes.emit('error', err);
    });
    req.on('response', (res)=>{
        let inflate;
        if (finished) {
            return;
        }
        switch(res.headers['content-encoding']){
            case 'gzip':
            case 'deflate':
                inflate = zlib.createUnzip();
                break;
        }
        if (res.headers['set-cookie']) {
            [].concat(res.headers['set-cookie'] || []).forEach((cookie)=>{
                options.cookies.set(cookie, url);
            });
        }
        if ([
            301,
            302,
            303,
            307,
            308
        ].includes(res.statusCode) && res.headers.location) {
            // redirect
            options.redirects++;
            if (options.redirects > options.maxRedirects) {
                finished = true;
                let err = new Error('Maximum redirect count exceeded');
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
                req.abort();
                return;
            }
            // redirect does not include POST body
            options.method = 'GET';
            options.body = false;
            return nmfetch(urllib.resolve(url, res.headers.location), options);
        }
        fetchRes.statusCode = res.statusCode;
        fetchRes.headers = res.headers;
        if (res.statusCode >= 300 && !options.allowErrorResponse) {
            finished = true;
            let err = new Error('Invalid status code ' + res.statusCode);
            err.type = 'FETCH';
            err.sourceUrl = url;
            fetchRes.emit('error', err);
            req.abort();
            return;
        }
        res.on('error', (err)=>{
            if (finished) {
                return;
            }
            finished = true;
            err.type = 'FETCH';
            err.sourceUrl = url;
            fetchRes.emit('error', err);
            req.abort();
        });
        if (inflate) {
            res.pipe(inflate).pipe(fetchRes);
            inflate.on('error', (err)=>{
                if (finished) {
                    return;
                }
                finished = true;
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
                req.abort();
            });
        } else {
            res.pipe(fetchRes);
        }
    });
    setImmediate(()=>{
        if (body) {
            try {
                if (typeof body.pipe === 'function') {
                    return body.pipe(req);
                } else {
                    req.write(body);
                }
            } catch (err) {
                finished = true;
                err.type = 'FETCH';
                err.sourceUrl = url;
                fetchRes.emit('error', err);
                return;
            }
        }
        req.end();
    });
    return fetchRes;
}
}),
"[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint no-console: 0 */ const urllib = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const nmfetch = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/fetch/index.js [app-rsc] (ecmascript)");
const dns = __turbopack_context__.r("[externals]/dns [external] (dns, cjs)");
const net = __turbopack_context__.r("[externals]/net [external] (net, cjs)");
const os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
const DNS_TTL = 5 * 60 * 1000;
const CACHE_CLEANUP_INTERVAL = 30 * 1000; // Minimum 30 seconds between cleanups
const MAX_CACHE_SIZE = 1000; // Maximum number of entries in cache
let lastCacheCleanup = 0;
module.exports._lastCacheCleanup = ()=>lastCacheCleanup;
module.exports._resetCacheCleanup = ()=>{
    lastCacheCleanup = 0;
};
let networkInterfaces;
try {
    networkInterfaces = os.networkInterfaces();
} catch (_err) {
// fails on some systems
}
module.exports.networkInterfaces = networkInterfaces;
const isFamilySupported = (family, allowInternal)=>{
    let networkInterfaces = module.exports.networkInterfaces;
    if (!networkInterfaces) {
        // hope for the best
        return true;
    }
    const familySupported = // crux that replaces Object.values(networkInterfaces) as Object.values is not supported in nodejs v6
    Object.keys(networkInterfaces).map((key)=>networkInterfaces[key])// crux that replaces .flat() as it is not supported in older Node versions (v10 and older)
    .reduce((acc, val)=>acc.concat(val), []).filter((i)=>!i.internal || allowInternal).filter((i)=>i.family === 'IPv' + family || i.family === family).length > 0;
    return familySupported;
};
const resolver = (family, hostname, options, callback)=>{
    options = options || {};
    const familySupported = isFamilySupported(family, options.allowInternalNetworkInterfaces);
    if (!familySupported) {
        return callback(null, []);
    }
    const resolver = dns.Resolver ? new dns.Resolver(options) : dns;
    resolver['resolve' + family](hostname, (err, addresses)=>{
        if (err) {
            switch(err.code){
                case dns.NODATA:
                case dns.NOTFOUND:
                case dns.NOTIMP:
                case dns.SERVFAIL:
                case dns.CONNREFUSED:
                case dns.REFUSED:
                case 'EAI_AGAIN':
                    return callback(null, []);
            }
            return callback(err);
        }
        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
    });
};
const dnsCache = module.exports.dnsCache = new Map();
const formatDNSValue = (value, extra)=>{
    if (!value) {
        return Object.assign({}, extra || {});
    }
    return Object.assign({
        servername: value.servername,
        host: !value.addresses || !value.addresses.length ? null : value.addresses.length === 1 ? value.addresses[0] : value.addresses[Math.floor(Math.random() * value.addresses.length)]
    }, extra || {});
};
module.exports.resolveHostname = (options, callback)=>{
    options = options || {};
    if (!options.host && options.servername) {
        options.host = options.servername;
    }
    if (!options.host || net.isIP(options.host)) {
        // nothing to do here
        let value = {
            addresses: [
                options.host
            ],
            servername: options.servername || false
        };
        return callback(null, formatDNSValue(value, {
            cached: false
        }));
    }
    let cached;
    if (dnsCache.has(options.host)) {
        cached = dnsCache.get(options.host);
        // Lazy cleanup with time throttling
        const now = Date.now();
        if (now - lastCacheCleanup > CACHE_CLEANUP_INTERVAL) {
            lastCacheCleanup = now;
            // Clean up expired entries
            for (const [host, entry] of dnsCache.entries()){
                if (entry.expires && entry.expires < now) {
                    dnsCache.delete(host);
                }
            }
            // If cache is still too large, remove oldest entries
            if (dnsCache.size > MAX_CACHE_SIZE) {
                const toDelete = Math.floor(MAX_CACHE_SIZE * 0.1); // Remove 10% of entries
                const keys = Array.from(dnsCache.keys()).slice(0, toDelete);
                keys.forEach((key)=>dnsCache.delete(key));
            }
        }
        if (!cached.expires || cached.expires >= now) {
            return callback(null, formatDNSValue(cached.value, {
                cached: true
            }));
        }
    }
    resolver(4, options.host, options, (err, addresses)=>{
        if (err) {
            if (cached) {
                dnsCache.set(options.host, {
                    value: cached.value,
                    expires: Date.now() + (options.dnsTtl || DNS_TTL)
                });
                return callback(null, formatDNSValue(cached.value, {
                    cached: true,
                    error: err
                }));
            }
            return callback(err);
        }
        if (addresses && addresses.length) {
            let value = {
                addresses,
                servername: options.servername || options.host
            };
            dnsCache.set(options.host, {
                value,
                expires: Date.now() + (options.dnsTtl || DNS_TTL)
            });
            return callback(null, formatDNSValue(value, {
                cached: false
            }));
        }
        resolver(6, options.host, options, (err, addresses)=>{
            if (err) {
                if (cached) {
                    dnsCache.set(options.host, {
                        value: cached.value,
                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
                    });
                    return callback(null, formatDNSValue(cached.value, {
                        cached: true,
                        error: err
                    }));
                }
                return callback(err);
            }
            if (addresses && addresses.length) {
                let value = {
                    addresses,
                    servername: options.servername || options.host
                };
                dnsCache.set(options.host, {
                    value,
                    expires: Date.now() + (options.dnsTtl || DNS_TTL)
                });
                return callback(null, formatDNSValue(value, {
                    cached: false
                }));
            }
            try {
                dns.lookup(options.host, {
                    all: true
                }, (err, addresses)=>{
                    if (err) {
                        if (cached) {
                            dnsCache.set(options.host, {
                                value: cached.value,
                                expires: Date.now() + (options.dnsTtl || DNS_TTL)
                            });
                            return callback(null, formatDNSValue(cached.value, {
                                cached: true,
                                error: err
                            }));
                        }
                        return callback(err);
                    }
                    let address = addresses ? addresses.filter((addr)=>isFamilySupported(addr.family)).map((addr)=>addr.address).shift() : false;
                    if (addresses && addresses.length && !address) {
                        // there are addresses but none can be used
                        console.warn(`Failed to resolve IPv${addresses[0].family} addresses with current network`);
                    }
                    if (!address && cached) {
                        // nothing was found, fallback to cached value
                        return callback(null, formatDNSValue(cached.value, {
                            cached: true
                        }));
                    }
                    let value = {
                        addresses: address ? [
                            address
                        ] : [
                            options.host
                        ],
                        servername: options.servername || options.host
                    };
                    dnsCache.set(options.host, {
                        value,
                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
                    });
                    return callback(null, formatDNSValue(value, {
                        cached: false
                    }));
                });
            } catch (_err) {
                if (cached) {
                    dnsCache.set(options.host, {
                        value: cached.value,
                        expires: Date.now() + (options.dnsTtl || DNS_TTL)
                    });
                    return callback(null, formatDNSValue(cached.value, {
                        cached: true,
                        error: err
                    }));
                }
                return callback(err);
            }
        });
    });
};
/**
 * Parses connection url to a structured configuration object
 *
 * @param {String} str Connection url
 * @return {Object} Configuration object
 */ module.exports.parseConnectionUrl = (str)=>{
    str = str || '';
    let options = {};
    [
        urllib.parse(str, true)
    ].forEach((url)=>{
        let auth;
        switch(url.protocol){
            case 'smtp:':
                options.secure = false;
                break;
            case 'smtps:':
                options.secure = true;
                break;
            case 'direct:':
                options.direct = true;
                break;
        }
        if (!isNaN(url.port) && Number(url.port)) {
            options.port = Number(url.port);
        }
        if (url.hostname) {
            options.host = url.hostname;
        }
        if (url.auth) {
            auth = url.auth.split(':');
            if (!options.auth) {
                options.auth = {};
            }
            options.auth.user = auth.shift();
            options.auth.pass = auth.join(':');
        }
        Object.keys(url.query || {}).forEach((key)=>{
            let obj = options;
            let lKey = key;
            let value = url.query[key];
            if (!isNaN(value)) {
                value = Number(value);
            }
            switch(value){
                case 'true':
                    value = true;
                    break;
                case 'false':
                    value = false;
                    break;
            }
            // tls is nested object
            if (key.indexOf('tls.') === 0) {
                lKey = key.substr(4);
                if (!options.tls) {
                    options.tls = {};
                }
                obj = options.tls;
            } else if (key.indexOf('.') >= 0) {
                // ignore nested properties besides tls
                return;
            }
            if (!(lKey in obj)) {
                obj[lKey] = value;
            }
        });
    });
    return options;
};
module.exports._logFunc = (logger, level, defaults, data, message, ...args)=>{
    let entry = {};
    Object.keys(defaults || {}).forEach((key)=>{
        if (key !== 'level') {
            entry[key] = defaults[key];
        }
    });
    Object.keys(data || {}).forEach((key)=>{
        if (key !== 'level') {
            entry[key] = data[key];
        }
    });
    logger[level](entry, message, ...args);
};
/**
 * Returns a bunyan-compatible logger interface. Uses either provided logger or
 * creates a default console logger
 *
 * @param {Object} [options] Options object that might include 'logger' value
 * @return {Object} bunyan compatible logger
 */ module.exports.getLogger = (options, defaults)=>{
    options = options || {};
    let response = {};
    let levels = [
        'trace',
        'debug',
        'info',
        'warn',
        'error',
        'fatal'
    ];
    if (!options.logger) {
        // use vanity logger
        levels.forEach((level)=>{
            response[level] = ()=>false;
        });
        return response;
    }
    let logger = options.logger;
    if (options.logger === true) {
        // create console logger
        logger = createDefaultLogger(levels);
    }
    levels.forEach((level)=>{
        response[level] = (data, message, ...args)=>{
            module.exports._logFunc(logger, level, defaults, data, message, ...args);
        };
    });
    return response;
};
/**
 * Wrapper for creating a callback that either resolves or rejects a promise
 * based on input
 *
 * @param {Function} resolve Function to run if callback is called
 * @param {Function} reject Function to run if callback ends with an error
 */ module.exports.callbackPromise = (resolve, reject)=>function() {
        let args = Array.from(arguments);
        let err = args.shift();
        if (err) {
            reject(err);
        } else {
            resolve(...args);
        }
    };
module.exports.parseDataURI = (uri)=>{
    if (typeof uri !== 'string') {
        return null;
    }
    // Early return for non-data URIs to avoid unnecessary processing
    if (!uri.startsWith('data:')) {
        return null;
    }
    // Find the first comma safely - this prevents ReDoS
    const commaPos = uri.indexOf(',');
    if (commaPos === -1) {
        return null;
    }
    const data = uri.substring(commaPos + 1);
    const metaStr = uri.substring('data:'.length, commaPos);
    let encoding;
    const metaEntries = metaStr.split(';');
    if (metaEntries.length > 0) {
        const lastEntry = metaEntries[metaEntries.length - 1].toLowerCase().trim();
        // Only recognize valid encoding types to prevent manipulation
        if ([
            'base64',
            'utf8',
            'utf-8'
        ].includes(lastEntry) && lastEntry.indexOf('=') === -1) {
            encoding = lastEntry;
            metaEntries.pop();
        }
    }
    const contentType = metaEntries.length > 0 ? metaEntries.shift() : 'application/octet-stream';
    const params = {};
    for(let i = 0; i < metaEntries.length; i++){
        const entry = metaEntries[i];
        const sepPos = entry.indexOf('=');
        if (sepPos > 0) {
            // Ensure there's a key before the '='
            const key = entry.substring(0, sepPos).trim();
            const value = entry.substring(sepPos + 1).trim();
            if (key) {
                params[key] = value;
            }
        }
    }
    // Decode data based on encoding with proper error handling
    let bufferData;
    try {
        if (encoding === 'base64') {
            bufferData = Buffer.from(data, 'base64');
        } else {
            try {
                bufferData = Buffer.from(decodeURIComponent(data));
            } catch (_decodeError) {
                bufferData = Buffer.from(data);
            }
        }
    } catch (_bufferError) {
        bufferData = Buffer.alloc(0);
    }
    return {
        data: bufferData,
        encoding: encoding || null,
        contentType: contentType || 'application/octet-stream',
        params
    };
};
/**
 * Resolves a String or a Buffer value for content value. Useful if the value
 * is a Stream or a file or an URL. If the value is a Stream, overwrites
 * the stream object with the resolved value (you can't stream a value twice).
 *
 * This is useful when you want to create a plugin that needs a content value,
 * for example the `html` or `text` value as a String or a Buffer but not as
 * a file path or an URL.
 *
 * @param {Object} data An object or an Array you want to resolve an element for
 * @param {String|Number} key Property name or an Array index
 * @param {Function} callback Callback function with (err, value)
 */ module.exports.resolveContent = (data, key, callback)=>{
    let promise;
    if (!callback) {
        promise = new Promise((resolve, reject)=>{
            callback = module.exports.callbackPromise(resolve, reject);
        });
    }
    let content = data && data[key] && data[key].content || data[key];
    let contentStream;
    let encoding = (typeof data[key] === 'object' && data[key].encoding || 'utf8').toString().toLowerCase().replace(/[-_\s]/g, '');
    if (!content) {
        return callback(null, content);
    }
    if (typeof content === 'object') {
        if (typeof content.pipe === 'function') {
            return resolveStream(content, (err, value)=>{
                if (err) {
                    return callback(err);
                }
                // we can't stream twice the same content, so we need
                // to replace the stream object with the streaming result
                if (data[key].content) {
                    data[key].content = value;
                } else {
                    data[key] = value;
                }
                callback(null, value);
            });
        } else if (/^https?:\/\//i.test(content.path || content.href)) {
            contentStream = nmfetch(content.path || content.href);
            return resolveStream(contentStream, callback);
        } else if (/^data:/i.test(content.path || content.href)) {
            let parsedDataUri = module.exports.parseDataURI(content.path || content.href);
            if (!parsedDataUri || !parsedDataUri.data) {
                return callback(null, Buffer.from(0));
            }
            return callback(null, parsedDataUri.data);
        } else if (content.path) {
            return resolveStream(fs.createReadStream(content.path), callback);
        }
    }
    if (typeof data[key].content === 'string' && ![
        'utf8',
        'usascii',
        'ascii'
    ].includes(encoding)) {
        content = Buffer.from(data[key].content, encoding);
    }
    // default action, return as is
    setImmediate(()=>callback(null, content));
    return promise;
};
/**
 * Copies properties from source objects to target objects
 */ module.exports.assign = function() {
    let args = Array.from(arguments);
    let target = args.shift() || {};
    args.forEach((source)=>{
        Object.keys(source || {}).forEach((key)=>{
            if ([
                'tls',
                'auth'
            ].includes(key) && source[key] && typeof source[key] === 'object') {
                // tls and auth are special keys that need to be enumerated separately
                // other objects are passed as is
                if (!target[key]) {
                    // ensure that target has this key
                    target[key] = {};
                }
                Object.keys(source[key]).forEach((subKey)=>{
                    target[key][subKey] = source[key][subKey];
                });
            } else {
                target[key] = source[key];
            }
        });
    });
    return target;
};
module.exports.encodeXText = (str)=>{
    // ! 0x21
    // + 0x2B
    // = 0x3D
    // ~ 0x7E
    if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
        return str;
    }
    let buf = Buffer.from(str);
    let result = '';
    for(let i = 0, len = buf.length; i < len; i++){
        let c = buf[i];
        if (c < 0x21 || c > 0x7e || c === 0x2b || c === 0x3d) {
            result += '+' + (c < 0x10 ? '0' : '') + c.toString(16).toUpperCase();
        } else {
            result += String.fromCharCode(c);
        }
    }
    return result;
};
/**
 * Streams a stream value into a Buffer
 *
 * @param {Object} stream Readable stream
 * @param {Function} callback Callback function with (err, value)
 */ function resolveStream(stream, callback) {
    let responded = false;
    let chunks = [];
    let chunklen = 0;
    stream.on('error', (err)=>{
        if (responded) {
            return;
        }
        responded = true;
        callback(err);
    });
    stream.on('readable', ()=>{
        let chunk;
        while((chunk = stream.read()) !== null){
            chunks.push(chunk);
            chunklen += chunk.length;
        }
    });
    stream.on('end', ()=>{
        if (responded) {
            return;
        }
        responded = true;
        let value;
        try {
            value = Buffer.concat(chunks, chunklen);
        } catch (E) {
            return callback(E);
        }
        callback(null, value);
    });
}
/**
 * Generates a bunyan-like logger that prints to console
 *
 * @returns {Object} Bunyan logger instance
 */ function createDefaultLogger(levels) {
    let levelMaxLen = 0;
    let levelNames = new Map();
    levels.forEach((level)=>{
        if (level.length > levelMaxLen) {
            levelMaxLen = level.length;
        }
    });
    levels.forEach((level)=>{
        let levelName = level.toUpperCase();
        if (levelName.length < levelMaxLen) {
            levelName += ' '.repeat(levelMaxLen - levelName.length);
        }
        levelNames.set(level, levelName);
    });
    let print = (level, entry, message, ...args)=>{
        let prefix = '';
        if (entry) {
            if (entry.tnx === 'server') {
                prefix = 'S: ';
            } else if (entry.tnx === 'client') {
                prefix = 'C: ';
            }
            if (entry.sid) {
                prefix = '[' + entry.sid + '] ' + prefix;
            }
            if (entry.cid) {
                prefix = '[#' + entry.cid + '] ' + prefix;
            }
        }
        message = util.format(message, ...args);
        message.split(/\r?\n/).forEach((line)=>{
            console.log('[%s] %s %s', new Date().toISOString().substr(0, 19).replace(/T/, ' '), levelNames.get(level), prefix + line);
        });
    };
    let logger = {};
    levels.forEach((level)=>{
        logger[level] = print.bind(null, level);
    });
    return logger;
}
}),
"[project]/node_modules/nodemailer/lib/mime-funcs/mime-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint quote-props: 0 */ const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const defaultMimeType = 'application/octet-stream';
const defaultExtension = 'bin';
const mimeTypes = new Map([
    [
        'application/acad',
        'dwg'
    ],
    [
        'application/applixware',
        'aw'
    ],
    [
        'application/arj',
        'arj'
    ],
    [
        'application/atom+xml',
        'xml'
    ],
    [
        'application/atomcat+xml',
        'atomcat'
    ],
    [
        'application/atomsvc+xml',
        'atomsvc'
    ],
    [
        'application/base64',
        [
            'mm',
            'mme'
        ]
    ],
    [
        'application/binhex',
        'hqx'
    ],
    [
        'application/binhex4',
        'hqx'
    ],
    [
        'application/book',
        [
            'book',
            'boo'
        ]
    ],
    [
        'application/ccxml+xml,',
        'ccxml'
    ],
    [
        'application/cdf',
        'cdf'
    ],
    [
        'application/cdmi-capability',
        'cdmia'
    ],
    [
        'application/cdmi-container',
        'cdmic'
    ],
    [
        'application/cdmi-domain',
        'cdmid'
    ],
    [
        'application/cdmi-object',
        'cdmio'
    ],
    [
        'application/cdmi-queue',
        'cdmiq'
    ],
    [
        'application/clariscad',
        'ccad'
    ],
    [
        'application/commonground',
        'dp'
    ],
    [
        'application/cu-seeme',
        'cu'
    ],
    [
        'application/davmount+xml',
        'davmount'
    ],
    [
        'application/drafting',
        'drw'
    ],
    [
        'application/dsptype',
        'tsp'
    ],
    [
        'application/dssc+der',
        'dssc'
    ],
    [
        'application/dssc+xml',
        'xdssc'
    ],
    [
        'application/dxf',
        'dxf'
    ],
    [
        'application/ecmascript',
        [
            'js',
            'es'
        ]
    ],
    [
        'application/emma+xml',
        'emma'
    ],
    [
        'application/envoy',
        'evy'
    ],
    [
        'application/epub+zip',
        'epub'
    ],
    [
        'application/excel',
        [
            'xls',
            'xl',
            'xla',
            'xlb',
            'xlc',
            'xld',
            'xlk',
            'xll',
            'xlm',
            'xlt',
            'xlv',
            'xlw'
        ]
    ],
    [
        'application/exi',
        'exi'
    ],
    [
        'application/font-tdpfr',
        'pfr'
    ],
    [
        'application/fractals',
        'fif'
    ],
    [
        'application/freeloader',
        'frl'
    ],
    [
        'application/futuresplash',
        'spl'
    ],
    [
        'application/geo+json',
        'geojson'
    ],
    [
        'application/gnutar',
        'tgz'
    ],
    [
        'application/groupwise',
        'vew'
    ],
    [
        'application/hlp',
        'hlp'
    ],
    [
        'application/hta',
        'hta'
    ],
    [
        'application/hyperstudio',
        'stk'
    ],
    [
        'application/i-deas',
        'unv'
    ],
    [
        'application/iges',
        [
            'iges',
            'igs'
        ]
    ],
    [
        'application/inf',
        'inf'
    ],
    [
        'application/internet-property-stream',
        'acx'
    ],
    [
        'application/ipfix',
        'ipfix'
    ],
    [
        'application/java',
        'class'
    ],
    [
        'application/java-archive',
        'jar'
    ],
    [
        'application/java-byte-code',
        'class'
    ],
    [
        'application/java-serialized-object',
        'ser'
    ],
    [
        'application/java-vm',
        'class'
    ],
    [
        'application/javascript',
        'js'
    ],
    [
        'application/json',
        'json'
    ],
    [
        'application/lha',
        'lha'
    ],
    [
        'application/lzx',
        'lzx'
    ],
    [
        'application/mac-binary',
        'bin'
    ],
    [
        'application/mac-binhex',
        'hqx'
    ],
    [
        'application/mac-binhex40',
        'hqx'
    ],
    [
        'application/mac-compactpro',
        'cpt'
    ],
    [
        'application/macbinary',
        'bin'
    ],
    [
        'application/mads+xml',
        'mads'
    ],
    [
        'application/marc',
        'mrc'
    ],
    [
        'application/marcxml+xml',
        'mrcx'
    ],
    [
        'application/mathematica',
        'ma'
    ],
    [
        'application/mathml+xml',
        'mathml'
    ],
    [
        'application/mbedlet',
        'mbd'
    ],
    [
        'application/mbox',
        'mbox'
    ],
    [
        'application/mcad',
        'mcd'
    ],
    [
        'application/mediaservercontrol+xml',
        'mscml'
    ],
    [
        'application/metalink4+xml',
        'meta4'
    ],
    [
        'application/mets+xml',
        'mets'
    ],
    [
        'application/mime',
        'aps'
    ],
    [
        'application/mods+xml',
        'mods'
    ],
    [
        'application/mp21',
        'm21'
    ],
    [
        'application/mp4',
        'mp4'
    ],
    [
        'application/mspowerpoint',
        [
            'ppt',
            'pot',
            'pps',
            'ppz'
        ]
    ],
    [
        'application/msword',
        [
            'doc',
            'dot',
            'w6w',
            'wiz',
            'word'
        ]
    ],
    [
        'application/mswrite',
        'wri'
    ],
    [
        'application/mxf',
        'mxf'
    ],
    [
        'application/netmc',
        'mcp'
    ],
    [
        'application/octet-stream',
        [
            '*'
        ]
    ],
    [
        'application/oda',
        'oda'
    ],
    [
        'application/oebps-package+xml',
        'opf'
    ],
    [
        'application/ogg',
        'ogx'
    ],
    [
        'application/olescript',
        'axs'
    ],
    [
        'application/onenote',
        'onetoc'
    ],
    [
        'application/patch-ops-error+xml',
        'xer'
    ],
    [
        'application/pdf',
        'pdf'
    ],
    [
        'application/pgp-encrypted',
        'asc'
    ],
    [
        'application/pgp-signature',
        'pgp'
    ],
    [
        'application/pics-rules',
        'prf'
    ],
    [
        'application/pkcs-12',
        'p12'
    ],
    [
        'application/pkcs-crl',
        'crl'
    ],
    [
        'application/pkcs10',
        'p10'
    ],
    [
        'application/pkcs7-mime',
        [
            'p7c',
            'p7m'
        ]
    ],
    [
        'application/pkcs7-signature',
        'p7s'
    ],
    [
        'application/pkcs8',
        'p8'
    ],
    [
        'application/pkix-attr-cert',
        'ac'
    ],
    [
        'application/pkix-cert',
        [
            'cer',
            'crt'
        ]
    ],
    [
        'application/pkix-crl',
        'crl'
    ],
    [
        'application/pkix-pkipath',
        'pkipath'
    ],
    [
        'application/pkixcmp',
        'pki'
    ],
    [
        'application/plain',
        'text'
    ],
    [
        'application/pls+xml',
        'pls'
    ],
    [
        'application/postscript',
        [
            'ps',
            'ai',
            'eps'
        ]
    ],
    [
        'application/powerpoint',
        'ppt'
    ],
    [
        'application/pro_eng',
        [
            'part',
            'prt'
        ]
    ],
    [
        'application/prs.cww',
        'cww'
    ],
    [
        'application/pskc+xml',
        'pskcxml'
    ],
    [
        'application/rdf+xml',
        'rdf'
    ],
    [
        'application/reginfo+xml',
        'rif'
    ],
    [
        'application/relax-ng-compact-syntax',
        'rnc'
    ],
    [
        'application/resource-lists+xml',
        'rl'
    ],
    [
        'application/resource-lists-diff+xml',
        'rld'
    ],
    [
        'application/ringing-tones',
        'rng'
    ],
    [
        'application/rls-services+xml',
        'rs'
    ],
    [
        'application/rsd+xml',
        'rsd'
    ],
    [
        'application/rss+xml',
        'xml'
    ],
    [
        'application/rtf',
        [
            'rtf',
            'rtx'
        ]
    ],
    [
        'application/sbml+xml',
        'sbml'
    ],
    [
        'application/scvp-cv-request',
        'scq'
    ],
    [
        'application/scvp-cv-response',
        'scs'
    ],
    [
        'application/scvp-vp-request',
        'spq'
    ],
    [
        'application/scvp-vp-response',
        'spp'
    ],
    [
        'application/sdp',
        'sdp'
    ],
    [
        'application/sea',
        'sea'
    ],
    [
        'application/set',
        'set'
    ],
    [
        'application/set-payment-initiation',
        'setpay'
    ],
    [
        'application/set-registration-initiation',
        'setreg'
    ],
    [
        'application/shf+xml',
        'shf'
    ],
    [
        'application/sla',
        'stl'
    ],
    [
        'application/smil',
        [
            'smi',
            'smil'
        ]
    ],
    [
        'application/smil+xml',
        'smi'
    ],
    [
        'application/solids',
        'sol'
    ],
    [
        'application/sounder',
        'sdr'
    ],
    [
        'application/sparql-query',
        'rq'
    ],
    [
        'application/sparql-results+xml',
        'srx'
    ],
    [
        'application/srgs',
        'gram'
    ],
    [
        'application/srgs+xml',
        'grxml'
    ],
    [
        'application/sru+xml',
        'sru'
    ],
    [
        'application/ssml+xml',
        'ssml'
    ],
    [
        'application/step',
        [
            'step',
            'stp'
        ]
    ],
    [
        'application/streamingmedia',
        'ssm'
    ],
    [
        'application/tei+xml',
        'tei'
    ],
    [
        'application/thraud+xml',
        'tfi'
    ],
    [
        'application/timestamped-data',
        'tsd'
    ],
    [
        'application/toolbook',
        'tbk'
    ],
    [
        'application/vda',
        'vda'
    ],
    [
        'application/vnd.3gpp.pic-bw-large',
        'plb'
    ],
    [
        'application/vnd.3gpp.pic-bw-small',
        'psb'
    ],
    [
        'application/vnd.3gpp.pic-bw-var',
        'pvb'
    ],
    [
        'application/vnd.3gpp2.tcap',
        'tcap'
    ],
    [
        'application/vnd.3m.post-it-notes',
        'pwn'
    ],
    [
        'application/vnd.accpac.simply.aso',
        'aso'
    ],
    [
        'application/vnd.accpac.simply.imp',
        'imp'
    ],
    [
        'application/vnd.acucobol',
        'acu'
    ],
    [
        'application/vnd.acucorp',
        'atc'
    ],
    [
        'application/vnd.adobe.air-application-installer-package+zip',
        'air'
    ],
    [
        'application/vnd.adobe.fxp',
        'fxp'
    ],
    [
        'application/vnd.adobe.xdp+xml',
        'xdp'
    ],
    [
        'application/vnd.adobe.xfdf',
        'xfdf'
    ],
    [
        'application/vnd.ahead.space',
        'ahead'
    ],
    [
        'application/vnd.airzip.filesecure.azf',
        'azf'
    ],
    [
        'application/vnd.airzip.filesecure.azs',
        'azs'
    ],
    [
        'application/vnd.amazon.ebook',
        'azw'
    ],
    [
        'application/vnd.americandynamics.acc',
        'acc'
    ],
    [
        'application/vnd.amiga.ami',
        'ami'
    ],
    [
        'application/vnd.android.package-archive',
        'apk'
    ],
    [
        'application/vnd.anser-web-certificate-issue-initiation',
        'cii'
    ],
    [
        'application/vnd.anser-web-funds-transfer-initiation',
        'fti'
    ],
    [
        'application/vnd.antix.game-component',
        'atx'
    ],
    [
        'application/vnd.apple.installer+xml',
        'mpkg'
    ],
    [
        'application/vnd.apple.mpegurl',
        'm3u8'
    ],
    [
        'application/vnd.aristanetworks.swi',
        'swi'
    ],
    [
        'application/vnd.audiograph',
        'aep'
    ],
    [
        'application/vnd.blueice.multipass',
        'mpm'
    ],
    [
        'application/vnd.bmi',
        'bmi'
    ],
    [
        'application/vnd.businessobjects',
        'rep'
    ],
    [
        'application/vnd.chemdraw+xml',
        'cdxml'
    ],
    [
        'application/vnd.chipnuts.karaoke-mmd',
        'mmd'
    ],
    [
        'application/vnd.cinderella',
        'cdy'
    ],
    [
        'application/vnd.claymore',
        'cla'
    ],
    [
        'application/vnd.cloanto.rp9',
        'rp9'
    ],
    [
        'application/vnd.clonk.c4group',
        'c4g'
    ],
    [
        'application/vnd.cluetrust.cartomobile-config',
        'c11amc'
    ],
    [
        'application/vnd.cluetrust.cartomobile-config-pkg',
        'c11amz'
    ],
    [
        'application/vnd.commonspace',
        'csp'
    ],
    [
        'application/vnd.contact.cmsg',
        'cdbcmsg'
    ],
    [
        'application/vnd.cosmocaller',
        'cmc'
    ],
    [
        'application/vnd.crick.clicker',
        'clkx'
    ],
    [
        'application/vnd.crick.clicker.keyboard',
        'clkk'
    ],
    [
        'application/vnd.crick.clicker.palette',
        'clkp'
    ],
    [
        'application/vnd.crick.clicker.template',
        'clkt'
    ],
    [
        'application/vnd.crick.clicker.wordbank',
        'clkw'
    ],
    [
        'application/vnd.criticaltools.wbs+xml',
        'wbs'
    ],
    [
        'application/vnd.ctc-posml',
        'pml'
    ],
    [
        'application/vnd.cups-ppd',
        'ppd'
    ],
    [
        'application/vnd.curl.car',
        'car'
    ],
    [
        'application/vnd.curl.pcurl',
        'pcurl'
    ],
    [
        'application/vnd.data-vision.rdz',
        'rdz'
    ],
    [
        'application/vnd.denovo.fcselayout-link',
        'fe_launch'
    ],
    [
        'application/vnd.dna',
        'dna'
    ],
    [
        'application/vnd.dolby.mlp',
        'mlp'
    ],
    [
        'application/vnd.dpgraph',
        'dpg'
    ],
    [
        'application/vnd.dreamfactory',
        'dfac'
    ],
    [
        'application/vnd.dvb.ait',
        'ait'
    ],
    [
        'application/vnd.dvb.service',
        'svc'
    ],
    [
        'application/vnd.dynageo',
        'geo'
    ],
    [
        'application/vnd.ecowin.chart',
        'mag'
    ],
    [
        'application/vnd.enliven',
        'nml'
    ],
    [
        'application/vnd.epson.esf',
        'esf'
    ],
    [
        'application/vnd.epson.msf',
        'msf'
    ],
    [
        'application/vnd.epson.quickanime',
        'qam'
    ],
    [
        'application/vnd.epson.salt',
        'slt'
    ],
    [
        'application/vnd.epson.ssf',
        'ssf'
    ],
    [
        'application/vnd.eszigno3+xml',
        'es3'
    ],
    [
        'application/vnd.ezpix-album',
        'ez2'
    ],
    [
        'application/vnd.ezpix-package',
        'ez3'
    ],
    [
        'application/vnd.fdf',
        'fdf'
    ],
    [
        'application/vnd.fdsn.seed',
        'seed'
    ],
    [
        'application/vnd.flographit',
        'gph'
    ],
    [
        'application/vnd.fluxtime.clip',
        'ftc'
    ],
    [
        'application/vnd.framemaker',
        'fm'
    ],
    [
        'application/vnd.frogans.fnc',
        'fnc'
    ],
    [
        'application/vnd.frogans.ltf',
        'ltf'
    ],
    [
        'application/vnd.fsc.weblaunch',
        'fsc'
    ],
    [
        'application/vnd.fujitsu.oasys',
        'oas'
    ],
    [
        'application/vnd.fujitsu.oasys2',
        'oa2'
    ],
    [
        'application/vnd.fujitsu.oasys3',
        'oa3'
    ],
    [
        'application/vnd.fujitsu.oasysgp',
        'fg5'
    ],
    [
        'application/vnd.fujitsu.oasysprs',
        'bh2'
    ],
    [
        'application/vnd.fujixerox.ddd',
        'ddd'
    ],
    [
        'application/vnd.fujixerox.docuworks',
        'xdw'
    ],
    [
        'application/vnd.fujixerox.docuworks.binder',
        'xbd'
    ],
    [
        'application/vnd.fuzzysheet',
        'fzs'
    ],
    [
        'application/vnd.genomatix.tuxedo',
        'txd'
    ],
    [
        'application/vnd.geogebra.file',
        'ggb'
    ],
    [
        'application/vnd.geogebra.tool',
        'ggt'
    ],
    [
        'application/vnd.geometry-explorer',
        'gex'
    ],
    [
        'application/vnd.geonext',
        'gxt'
    ],
    [
        'application/vnd.geoplan',
        'g2w'
    ],
    [
        'application/vnd.geospace',
        'g3w'
    ],
    [
        'application/vnd.gmx',
        'gmx'
    ],
    [
        'application/vnd.google-earth.kml+xml',
        'kml'
    ],
    [
        'application/vnd.google-earth.kmz',
        'kmz'
    ],
    [
        'application/vnd.grafeq',
        'gqf'
    ],
    [
        'application/vnd.groove-account',
        'gac'
    ],
    [
        'application/vnd.groove-help',
        'ghf'
    ],
    [
        'application/vnd.groove-identity-message',
        'gim'
    ],
    [
        'application/vnd.groove-injector',
        'grv'
    ],
    [
        'application/vnd.groove-tool-message',
        'gtm'
    ],
    [
        'application/vnd.groove-tool-template',
        'tpl'
    ],
    [
        'application/vnd.groove-vcard',
        'vcg'
    ],
    [
        'application/vnd.hal+xml',
        'hal'
    ],
    [
        'application/vnd.handheld-entertainment+xml',
        'zmm'
    ],
    [
        'application/vnd.hbci',
        'hbci'
    ],
    [
        'application/vnd.hhe.lesson-player',
        'les'
    ],
    [
        'application/vnd.hp-hpgl',
        [
            'hgl',
            'hpg',
            'hpgl'
        ]
    ],
    [
        'application/vnd.hp-hpid',
        'hpid'
    ],
    [
        'application/vnd.hp-hps',
        'hps'
    ],
    [
        'application/vnd.hp-jlyt',
        'jlt'
    ],
    [
        'application/vnd.hp-pcl',
        'pcl'
    ],
    [
        'application/vnd.hp-pclxl',
        'pclxl'
    ],
    [
        'application/vnd.hydrostatix.sof-data',
        'sfd-hdstx'
    ],
    [
        'application/vnd.hzn-3d-crossword',
        'x3d'
    ],
    [
        'application/vnd.ibm.minipay',
        'mpy'
    ],
    [
        'application/vnd.ibm.modcap',
        'afp'
    ],
    [
        'application/vnd.ibm.rights-management',
        'irm'
    ],
    [
        'application/vnd.ibm.secure-container',
        'sc'
    ],
    [
        'application/vnd.iccprofile',
        'icc'
    ],
    [
        'application/vnd.igloader',
        'igl'
    ],
    [
        'application/vnd.immervision-ivp',
        'ivp'
    ],
    [
        'application/vnd.immervision-ivu',
        'ivu'
    ],
    [
        'application/vnd.insors.igm',
        'igm'
    ],
    [
        'application/vnd.intercon.formnet',
        'xpw'
    ],
    [
        'application/vnd.intergeo',
        'i2g'
    ],
    [
        'application/vnd.intu.qbo',
        'qbo'
    ],
    [
        'application/vnd.intu.qfx',
        'qfx'
    ],
    [
        'application/vnd.ipunplugged.rcprofile',
        'rcprofile'
    ],
    [
        'application/vnd.irepository.package+xml',
        'irp'
    ],
    [
        'application/vnd.is-xpr',
        'xpr'
    ],
    [
        'application/vnd.isac.fcs',
        'fcs'
    ],
    [
        'application/vnd.jam',
        'jam'
    ],
    [
        'application/vnd.jcp.javame.midlet-rms',
        'rms'
    ],
    [
        'application/vnd.jisp',
        'jisp'
    ],
    [
        'application/vnd.joost.joda-archive',
        'joda'
    ],
    [
        'application/vnd.kahootz',
        'ktz'
    ],
    [
        'application/vnd.kde.karbon',
        'karbon'
    ],
    [
        'application/vnd.kde.kchart',
        'chrt'
    ],
    [
        'application/vnd.kde.kformula',
        'kfo'
    ],
    [
        'application/vnd.kde.kivio',
        'flw'
    ],
    [
        'application/vnd.kde.kontour',
        'kon'
    ],
    [
        'application/vnd.kde.kpresenter',
        'kpr'
    ],
    [
        'application/vnd.kde.kspread',
        'ksp'
    ],
    [
        'application/vnd.kde.kword',
        'kwd'
    ],
    [
        'application/vnd.kenameaapp',
        'htke'
    ],
    [
        'application/vnd.kidspiration',
        'kia'
    ],
    [
        'application/vnd.kinar',
        'kne'
    ],
    [
        'application/vnd.koan',
        'skp'
    ],
    [
        'application/vnd.kodak-descriptor',
        'sse'
    ],
    [
        'application/vnd.las.las+xml',
        'lasxml'
    ],
    [
        'application/vnd.llamagraphics.life-balance.desktop',
        'lbd'
    ],
    [
        'application/vnd.llamagraphics.life-balance.exchange+xml',
        'lbe'
    ],
    [
        'application/vnd.lotus-1-2-3',
        '123'
    ],
    [
        'application/vnd.lotus-approach',
        'apr'
    ],
    [
        'application/vnd.lotus-freelance',
        'pre'
    ],
    [
        'application/vnd.lotus-notes',
        'nsf'
    ],
    [
        'application/vnd.lotus-organizer',
        'org'
    ],
    [
        'application/vnd.lotus-screencam',
        'scm'
    ],
    [
        'application/vnd.lotus-wordpro',
        'lwp'
    ],
    [
        'application/vnd.macports.portpkg',
        'portpkg'
    ],
    [
        'application/vnd.mcd',
        'mcd'
    ],
    [
        'application/vnd.medcalcdata',
        'mc1'
    ],
    [
        'application/vnd.mediastation.cdkey',
        'cdkey'
    ],
    [
        'application/vnd.mfer',
        'mwf'
    ],
    [
        'application/vnd.mfmp',
        'mfm'
    ],
    [
        'application/vnd.micrografx.flo',
        'flo'
    ],
    [
        'application/vnd.micrografx.igx',
        'igx'
    ],
    [
        'application/vnd.mif',
        'mif'
    ],
    [
        'application/vnd.mobius.daf',
        'daf'
    ],
    [
        'application/vnd.mobius.dis',
        'dis'
    ],
    [
        'application/vnd.mobius.mbk',
        'mbk'
    ],
    [
        'application/vnd.mobius.mqy',
        'mqy'
    ],
    [
        'application/vnd.mobius.msl',
        'msl'
    ],
    [
        'application/vnd.mobius.plc',
        'plc'
    ],
    [
        'application/vnd.mobius.txf',
        'txf'
    ],
    [
        'application/vnd.mophun.application',
        'mpn'
    ],
    [
        'application/vnd.mophun.certificate',
        'mpc'
    ],
    [
        'application/vnd.mozilla.xul+xml',
        'xul'
    ],
    [
        'application/vnd.ms-artgalry',
        'cil'
    ],
    [
        'application/vnd.ms-cab-compressed',
        'cab'
    ],
    [
        'application/vnd.ms-excel',
        [
            'xls',
            'xla',
            'xlc',
            'xlm',
            'xlt',
            'xlw',
            'xlb',
            'xll'
        ]
    ],
    [
        'application/vnd.ms-excel.addin.macroenabled.12',
        'xlam'
    ],
    [
        'application/vnd.ms-excel.sheet.binary.macroenabled.12',
        'xlsb'
    ],
    [
        'application/vnd.ms-excel.sheet.macroenabled.12',
        'xlsm'
    ],
    [
        'application/vnd.ms-excel.template.macroenabled.12',
        'xltm'
    ],
    [
        'application/vnd.ms-fontobject',
        'eot'
    ],
    [
        'application/vnd.ms-htmlhelp',
        'chm'
    ],
    [
        'application/vnd.ms-ims',
        'ims'
    ],
    [
        'application/vnd.ms-lrm',
        'lrm'
    ],
    [
        'application/vnd.ms-officetheme',
        'thmx'
    ],
    [
        'application/vnd.ms-outlook',
        'msg'
    ],
    [
        'application/vnd.ms-pki.certstore',
        'sst'
    ],
    [
        'application/vnd.ms-pki.pko',
        'pko'
    ],
    [
        'application/vnd.ms-pki.seccat',
        'cat'
    ],
    [
        'application/vnd.ms-pki.stl',
        'stl'
    ],
    [
        'application/vnd.ms-pkicertstore',
        'sst'
    ],
    [
        'application/vnd.ms-pkiseccat',
        'cat'
    ],
    [
        'application/vnd.ms-pkistl',
        'stl'
    ],
    [
        'application/vnd.ms-powerpoint',
        [
            'ppt',
            'pot',
            'pps',
            'ppa',
            'pwz'
        ]
    ],
    [
        'application/vnd.ms-powerpoint.addin.macroenabled.12',
        'ppam'
    ],
    [
        'application/vnd.ms-powerpoint.presentation.macroenabled.12',
        'pptm'
    ],
    [
        'application/vnd.ms-powerpoint.slide.macroenabled.12',
        'sldm'
    ],
    [
        'application/vnd.ms-powerpoint.slideshow.macroenabled.12',
        'ppsm'
    ],
    [
        'application/vnd.ms-powerpoint.template.macroenabled.12',
        'potm'
    ],
    [
        'application/vnd.ms-project',
        'mpp'
    ],
    [
        'application/vnd.ms-word.document.macroenabled.12',
        'docm'
    ],
    [
        'application/vnd.ms-word.template.macroenabled.12',
        'dotm'
    ],
    [
        'application/vnd.ms-works',
        [
            'wks',
            'wcm',
            'wdb',
            'wps'
        ]
    ],
    [
        'application/vnd.ms-wpl',
        'wpl'
    ],
    [
        'application/vnd.ms-xpsdocument',
        'xps'
    ],
    [
        'application/vnd.mseq',
        'mseq'
    ],
    [
        'application/vnd.musician',
        'mus'
    ],
    [
        'application/vnd.muvee.style',
        'msty'
    ],
    [
        'application/vnd.neurolanguage.nlu',
        'nlu'
    ],
    [
        'application/vnd.noblenet-directory',
        'nnd'
    ],
    [
        'application/vnd.noblenet-sealer',
        'nns'
    ],
    [
        'application/vnd.noblenet-web',
        'nnw'
    ],
    [
        'application/vnd.nokia.configuration-message',
        'ncm'
    ],
    [
        'application/vnd.nokia.n-gage.data',
        'ngdat'
    ],
    [
        'application/vnd.nokia.n-gage.symbian.install',
        'n-gage'
    ],
    [
        'application/vnd.nokia.radio-preset',
        'rpst'
    ],
    [
        'application/vnd.nokia.radio-presets',
        'rpss'
    ],
    [
        'application/vnd.nokia.ringing-tone',
        'rng'
    ],
    [
        'application/vnd.novadigm.edm',
        'edm'
    ],
    [
        'application/vnd.novadigm.edx',
        'edx'
    ],
    [
        'application/vnd.novadigm.ext',
        'ext'
    ],
    [
        'application/vnd.oasis.opendocument.chart',
        'odc'
    ],
    [
        'application/vnd.oasis.opendocument.chart-template',
        'otc'
    ],
    [
        'application/vnd.oasis.opendocument.database',
        'odb'
    ],
    [
        'application/vnd.oasis.opendocument.formula',
        'odf'
    ],
    [
        'application/vnd.oasis.opendocument.formula-template',
        'odft'
    ],
    [
        'application/vnd.oasis.opendocument.graphics',
        'odg'
    ],
    [
        'application/vnd.oasis.opendocument.graphics-template',
        'otg'
    ],
    [
        'application/vnd.oasis.opendocument.image',
        'odi'
    ],
    [
        'application/vnd.oasis.opendocument.image-template',
        'oti'
    ],
    [
        'application/vnd.oasis.opendocument.presentation',
        'odp'
    ],
    [
        'application/vnd.oasis.opendocument.presentation-template',
        'otp'
    ],
    [
        'application/vnd.oasis.opendocument.spreadsheet',
        'ods'
    ],
    [
        'application/vnd.oasis.opendocument.spreadsheet-template',
        'ots'
    ],
    [
        'application/vnd.oasis.opendocument.text',
        'odt'
    ],
    [
        'application/vnd.oasis.opendocument.text-master',
        'odm'
    ],
    [
        'application/vnd.oasis.opendocument.text-template',
        'ott'
    ],
    [
        'application/vnd.oasis.opendocument.text-web',
        'oth'
    ],
    [
        'application/vnd.olpc-sugar',
        'xo'
    ],
    [
        'application/vnd.oma.dd2+xml',
        'dd2'
    ],
    [
        'application/vnd.openofficeorg.extension',
        'oxt'
    ],
    [
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'pptx'
    ],
    [
        'application/vnd.openxmlformats-officedocument.presentationml.slide',
        'sldx'
    ],
    [
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        'ppsx'
    ],
    [
        'application/vnd.openxmlformats-officedocument.presentationml.template',
        'potx'
    ],
    [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xlsx'
    ],
    [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        'xltx'
    ],
    [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'docx'
    ],
    [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'dotx'
    ],
    [
        'application/vnd.osgeo.mapguide.package',
        'mgp'
    ],
    [
        'application/vnd.osgi.dp',
        'dp'
    ],
    [
        'application/vnd.palm',
        'pdb'
    ],
    [
        'application/vnd.pawaafile',
        'paw'
    ],
    [
        'application/vnd.pg.format',
        'str'
    ],
    [
        'application/vnd.pg.osasli',
        'ei6'
    ],
    [
        'application/vnd.picsel',
        'efif'
    ],
    [
        'application/vnd.pmi.widget',
        'wg'
    ],
    [
        'application/vnd.pocketlearn',
        'plf'
    ],
    [
        'application/vnd.powerbuilder6',
        'pbd'
    ],
    [
        'application/vnd.previewsystems.box',
        'box'
    ],
    [
        'application/vnd.proteus.magazine',
        'mgz'
    ],
    [
        'application/vnd.publishare-delta-tree',
        'qps'
    ],
    [
        'application/vnd.pvi.ptid1',
        'ptid'
    ],
    [
        'application/vnd.quark.quarkxpress',
        'qxd'
    ],
    [
        'application/vnd.realvnc.bed',
        'bed'
    ],
    [
        'application/vnd.recordare.musicxml',
        'mxl'
    ],
    [
        'application/vnd.recordare.musicxml+xml',
        'musicxml'
    ],
    [
        'application/vnd.rig.cryptonote',
        'cryptonote'
    ],
    [
        'application/vnd.rim.cod',
        'cod'
    ],
    [
        'application/vnd.rn-realmedia',
        'rm'
    ],
    [
        'application/vnd.rn-realplayer',
        'rnx'
    ],
    [
        'application/vnd.route66.link66+xml',
        'link66'
    ],
    [
        'application/vnd.sailingtracker.track',
        'st'
    ],
    [
        'application/vnd.seemail',
        'see'
    ],
    [
        'application/vnd.sema',
        'sema'
    ],
    [
        'application/vnd.semd',
        'semd'
    ],
    [
        'application/vnd.semf',
        'semf'
    ],
    [
        'application/vnd.shana.informed.formdata',
        'ifm'
    ],
    [
        'application/vnd.shana.informed.formtemplate',
        'itp'
    ],
    [
        'application/vnd.shana.informed.interchange',
        'iif'
    ],
    [
        'application/vnd.shana.informed.package',
        'ipk'
    ],
    [
        'application/vnd.simtech-mindmapper',
        'twd'
    ],
    [
        'application/vnd.smaf',
        'mmf'
    ],
    [
        'application/vnd.smart.teacher',
        'teacher'
    ],
    [
        'application/vnd.solent.sdkm+xml',
        'sdkm'
    ],
    [
        'application/vnd.spotfire.dxp',
        'dxp'
    ],
    [
        'application/vnd.spotfire.sfs',
        'sfs'
    ],
    [
        'application/vnd.stardivision.calc',
        'sdc'
    ],
    [
        'application/vnd.stardivision.draw',
        'sda'
    ],
    [
        'application/vnd.stardivision.impress',
        'sdd'
    ],
    [
        'application/vnd.stardivision.math',
        'smf'
    ],
    [
        'application/vnd.stardivision.writer',
        'sdw'
    ],
    [
        'application/vnd.stardivision.writer-global',
        'sgl'
    ],
    [
        'application/vnd.stepmania.stepchart',
        'sm'
    ],
    [
        'application/vnd.sun.xml.calc',
        'sxc'
    ],
    [
        'application/vnd.sun.xml.calc.template',
        'stc'
    ],
    [
        'application/vnd.sun.xml.draw',
        'sxd'
    ],
    [
        'application/vnd.sun.xml.draw.template',
        'std'
    ],
    [
        'application/vnd.sun.xml.impress',
        'sxi'
    ],
    [
        'application/vnd.sun.xml.impress.template',
        'sti'
    ],
    [
        'application/vnd.sun.xml.math',
        'sxm'
    ],
    [
        'application/vnd.sun.xml.writer',
        'sxw'
    ],
    [
        'application/vnd.sun.xml.writer.global',
        'sxg'
    ],
    [
        'application/vnd.sun.xml.writer.template',
        'stw'
    ],
    [
        'application/vnd.sus-calendar',
        'sus'
    ],
    [
        'application/vnd.svd',
        'svd'
    ],
    [
        'application/vnd.symbian.install',
        'sis'
    ],
    [
        'application/vnd.syncml+xml',
        'xsm'
    ],
    [
        'application/vnd.syncml.dm+wbxml',
        'bdm'
    ],
    [
        'application/vnd.syncml.dm+xml',
        'xdm'
    ],
    [
        'application/vnd.tao.intent-module-archive',
        'tao'
    ],
    [
        'application/vnd.tmobile-livetv',
        'tmo'
    ],
    [
        'application/vnd.trid.tpt',
        'tpt'
    ],
    [
        'application/vnd.triscape.mxs',
        'mxs'
    ],
    [
        'application/vnd.trueapp',
        'tra'
    ],
    [
        'application/vnd.ufdl',
        'ufd'
    ],
    [
        'application/vnd.uiq.theme',
        'utz'
    ],
    [
        'application/vnd.umajin',
        'umj'
    ],
    [
        'application/vnd.unity',
        'unityweb'
    ],
    [
        'application/vnd.uoml+xml',
        'uoml'
    ],
    [
        'application/vnd.vcx',
        'vcx'
    ],
    [
        'application/vnd.visio',
        'vsd'
    ],
    [
        'application/vnd.visionary',
        'vis'
    ],
    [
        'application/vnd.vsf',
        'vsf'
    ],
    [
        'application/vnd.wap.wbxml',
        'wbxml'
    ],
    [
        'application/vnd.wap.wmlc',
        'wmlc'
    ],
    [
        'application/vnd.wap.wmlscriptc',
        'wmlsc'
    ],
    [
        'application/vnd.webturbo',
        'wtb'
    ],
    [
        'application/vnd.wolfram.player',
        'nbp'
    ],
    [
        'application/vnd.wordperfect',
        'wpd'
    ],
    [
        'application/vnd.wqd',
        'wqd'
    ],
    [
        'application/vnd.wt.stf',
        'stf'
    ],
    [
        'application/vnd.xara',
        [
            'web',
            'xar'
        ]
    ],
    [
        'application/vnd.xfdl',
        'xfdl'
    ],
    [
        'application/vnd.yamaha.hv-dic',
        'hvd'
    ],
    [
        'application/vnd.yamaha.hv-script',
        'hvs'
    ],
    [
        'application/vnd.yamaha.hv-voice',
        'hvp'
    ],
    [
        'application/vnd.yamaha.openscoreformat',
        'osf'
    ],
    [
        'application/vnd.yamaha.openscoreformat.osfpvg+xml',
        'osfpvg'
    ],
    [
        'application/vnd.yamaha.smaf-audio',
        'saf'
    ],
    [
        'application/vnd.yamaha.smaf-phrase',
        'spf'
    ],
    [
        'application/vnd.yellowriver-custom-menu',
        'cmp'
    ],
    [
        'application/vnd.zul',
        'zir'
    ],
    [
        'application/vnd.zzazz.deck+xml',
        'zaz'
    ],
    [
        'application/vocaltec-media-desc',
        'vmd'
    ],
    [
        'application/vocaltec-media-file',
        'vmf'
    ],
    [
        'application/voicexml+xml',
        'vxml'
    ],
    [
        'application/widget',
        'wgt'
    ],
    [
        'application/winhlp',
        'hlp'
    ],
    [
        'application/wordperfect',
        [
            'wp',
            'wp5',
            'wp6',
            'wpd'
        ]
    ],
    [
        'application/wordperfect6.0',
        [
            'w60',
            'wp5'
        ]
    ],
    [
        'application/wordperfect6.1',
        'w61'
    ],
    [
        'application/wsdl+xml',
        'wsdl'
    ],
    [
        'application/wspolicy+xml',
        'wspolicy'
    ],
    [
        'application/x-123',
        'wk1'
    ],
    [
        'application/x-7z-compressed',
        '7z'
    ],
    [
        'application/x-abiword',
        'abw'
    ],
    [
        'application/x-ace-compressed',
        'ace'
    ],
    [
        'application/x-aim',
        'aim'
    ],
    [
        'application/x-authorware-bin',
        'aab'
    ],
    [
        'application/x-authorware-map',
        'aam'
    ],
    [
        'application/x-authorware-seg',
        'aas'
    ],
    [
        'application/x-bcpio',
        'bcpio'
    ],
    [
        'application/x-binary',
        'bin'
    ],
    [
        'application/x-binhex40',
        'hqx'
    ],
    [
        'application/x-bittorrent',
        'torrent'
    ],
    [
        'application/x-bsh',
        [
            'bsh',
            'sh',
            'shar'
        ]
    ],
    [
        'application/x-bytecode.elisp',
        'elc'
    ],
    [
        'application/x-bytecode.python',
        'pyc'
    ],
    [
        'application/x-bzip',
        'bz'
    ],
    [
        'application/x-bzip2',
        [
            'boz',
            'bz2'
        ]
    ],
    [
        'application/x-cdf',
        'cdf'
    ],
    [
        'application/x-cdlink',
        'vcd'
    ],
    [
        'application/x-chat',
        [
            'cha',
            'chat'
        ]
    ],
    [
        'application/x-chess-pgn',
        'pgn'
    ],
    [
        'application/x-cmu-raster',
        'ras'
    ],
    [
        'application/x-cocoa',
        'cco'
    ],
    [
        'application/x-compactpro',
        'cpt'
    ],
    [
        'application/x-compress',
        'z'
    ],
    [
        'application/x-compressed',
        [
            'tgz',
            'gz',
            'z',
            'zip'
        ]
    ],
    [
        'application/x-conference',
        'nsc'
    ],
    [
        'application/x-cpio',
        'cpio'
    ],
    [
        'application/x-cpt',
        'cpt'
    ],
    [
        'application/x-csh',
        'csh'
    ],
    [
        'application/x-debian-package',
        'deb'
    ],
    [
        'application/x-deepv',
        'deepv'
    ],
    [
        'application/x-director',
        [
            'dir',
            'dcr',
            'dxr'
        ]
    ],
    [
        'application/x-doom',
        'wad'
    ],
    [
        'application/x-dtbncx+xml',
        'ncx'
    ],
    [
        'application/x-dtbook+xml',
        'dtb'
    ],
    [
        'application/x-dtbresource+xml',
        'res'
    ],
    [
        'application/x-dvi',
        'dvi'
    ],
    [
        'application/x-elc',
        'elc'
    ],
    [
        'application/x-envoy',
        [
            'env',
            'evy'
        ]
    ],
    [
        'application/x-esrehber',
        'es'
    ],
    [
        'application/x-excel',
        [
            'xls',
            'xla',
            'xlb',
            'xlc',
            'xld',
            'xlk',
            'xll',
            'xlm',
            'xlt',
            'xlv',
            'xlw'
        ]
    ],
    [
        'application/x-font-bdf',
        'bdf'
    ],
    [
        'application/x-font-ghostscript',
        'gsf'
    ],
    [
        'application/x-font-linux-psf',
        'psf'
    ],
    [
        'application/x-font-otf',
        'otf'
    ],
    [
        'application/x-font-pcf',
        'pcf'
    ],
    [
        'application/x-font-snf',
        'snf'
    ],
    [
        'application/x-font-ttf',
        'ttf'
    ],
    [
        'application/x-font-type1',
        'pfa'
    ],
    [
        'application/x-font-woff',
        'woff'
    ],
    [
        'application/x-frame',
        'mif'
    ],
    [
        'application/x-freelance',
        'pre'
    ],
    [
        'application/x-futuresplash',
        'spl'
    ],
    [
        'application/x-gnumeric',
        'gnumeric'
    ],
    [
        'application/x-gsp',
        'gsp'
    ],
    [
        'application/x-gss',
        'gss'
    ],
    [
        'application/x-gtar',
        'gtar'
    ],
    [
        'application/x-gzip',
        [
            'gz',
            'gzip'
        ]
    ],
    [
        'application/x-hdf',
        'hdf'
    ],
    [
        'application/x-helpfile',
        [
            'help',
            'hlp'
        ]
    ],
    [
        'application/x-httpd-imap',
        'imap'
    ],
    [
        'application/x-ima',
        'ima'
    ],
    [
        'application/x-internet-signup',
        [
            'ins',
            'isp'
        ]
    ],
    [
        'application/x-internett-signup',
        'ins'
    ],
    [
        'application/x-inventor',
        'iv'
    ],
    [
        'application/x-ip2',
        'ip'
    ],
    [
        'application/x-iphone',
        'iii'
    ],
    [
        'application/x-java-class',
        'class'
    ],
    [
        'application/x-java-commerce',
        'jcm'
    ],
    [
        'application/x-java-jnlp-file',
        'jnlp'
    ],
    [
        'application/x-javascript',
        'js'
    ],
    [
        'application/x-koan',
        [
            'skd',
            'skm',
            'skp',
            'skt'
        ]
    ],
    [
        'application/x-ksh',
        'ksh'
    ],
    [
        'application/x-latex',
        [
            'latex',
            'ltx'
        ]
    ],
    [
        'application/x-lha',
        'lha'
    ],
    [
        'application/x-lisp',
        'lsp'
    ],
    [
        'application/x-livescreen',
        'ivy'
    ],
    [
        'application/x-lotus',
        'wq1'
    ],
    [
        'application/x-lotusscreencam',
        'scm'
    ],
    [
        'application/x-lzh',
        'lzh'
    ],
    [
        'application/x-lzx',
        'lzx'
    ],
    [
        'application/x-mac-binhex40',
        'hqx'
    ],
    [
        'application/x-macbinary',
        'bin'
    ],
    [
        'application/x-magic-cap-package-1.0',
        'mc$'
    ],
    [
        'application/x-mathcad',
        'mcd'
    ],
    [
        'application/x-meme',
        'mm'
    ],
    [
        'application/x-midi',
        [
            'mid',
            'midi'
        ]
    ],
    [
        'application/x-mif',
        'mif'
    ],
    [
        'application/x-mix-transfer',
        'nix'
    ],
    [
        'application/x-mobipocket-ebook',
        'prc'
    ],
    [
        'application/x-mplayer2',
        'asx'
    ],
    [
        'application/x-ms-application',
        'application'
    ],
    [
        'application/x-ms-wmd',
        'wmd'
    ],
    [
        'application/x-ms-wmz',
        'wmz'
    ],
    [
        'application/x-ms-xbap',
        'xbap'
    ],
    [
        'application/x-msaccess',
        'mdb'
    ],
    [
        'application/x-msbinder',
        'obd'
    ],
    [
        'application/x-mscardfile',
        'crd'
    ],
    [
        'application/x-msclip',
        'clp'
    ],
    [
        'application/x-msdownload',
        [
            'exe',
            'dll'
        ]
    ],
    [
        'application/x-msexcel',
        [
            'xls',
            'xla',
            'xlw'
        ]
    ],
    [
        'application/x-msmediaview',
        [
            'mvb',
            'm13',
            'm14'
        ]
    ],
    [
        'application/x-msmetafile',
        'wmf'
    ],
    [
        'application/x-msmoney',
        'mny'
    ],
    [
        'application/x-mspowerpoint',
        'ppt'
    ],
    [
        'application/x-mspublisher',
        'pub'
    ],
    [
        'application/x-msschedule',
        'scd'
    ],
    [
        'application/x-msterminal',
        'trm'
    ],
    [
        'application/x-mswrite',
        'wri'
    ],
    [
        'application/x-navi-animation',
        'ani'
    ],
    [
        'application/x-navidoc',
        'nvd'
    ],
    [
        'application/x-navimap',
        'map'
    ],
    [
        'application/x-navistyle',
        'stl'
    ],
    [
        'application/x-netcdf',
        [
            'cdf',
            'nc'
        ]
    ],
    [
        'application/x-newton-compatible-pkg',
        'pkg'
    ],
    [
        'application/x-nokia-9000-communicator-add-on-software',
        'aos'
    ],
    [
        'application/x-omc',
        'omc'
    ],
    [
        'application/x-omcdatamaker',
        'omcd'
    ],
    [
        'application/x-omcregerator',
        'omcr'
    ],
    [
        'application/x-pagemaker',
        [
            'pm4',
            'pm5'
        ]
    ],
    [
        'application/x-pcl',
        'pcl'
    ],
    [
        'application/x-perfmon',
        [
            'pma',
            'pmc',
            'pml',
            'pmr',
            'pmw'
        ]
    ],
    [
        'application/x-pixclscript',
        'plx'
    ],
    [
        'application/x-pkcs10',
        'p10'
    ],
    [
        'application/x-pkcs12',
        [
            'p12',
            'pfx'
        ]
    ],
    [
        'application/x-pkcs7-certificates',
        [
            'p7b',
            'spc'
        ]
    ],
    [
        'application/x-pkcs7-certreqresp',
        'p7r'
    ],
    [
        'application/x-pkcs7-mime',
        [
            'p7m',
            'p7c'
        ]
    ],
    [
        'application/x-pkcs7-signature',
        [
            'p7s',
            'p7a'
        ]
    ],
    [
        'application/x-pointplus',
        'css'
    ],
    [
        'application/x-portable-anymap',
        'pnm'
    ],
    [
        'application/x-project',
        [
            'mpc',
            'mpt',
            'mpv',
            'mpx'
        ]
    ],
    [
        'application/x-qpro',
        'wb1'
    ],
    [
        'application/x-rar-compressed',
        'rar'
    ],
    [
        'application/x-rtf',
        'rtf'
    ],
    [
        'application/x-sdp',
        'sdp'
    ],
    [
        'application/x-sea',
        'sea'
    ],
    [
        'application/x-seelogo',
        'sl'
    ],
    [
        'application/x-sh',
        'sh'
    ],
    [
        'application/x-shar',
        [
            'shar',
            'sh'
        ]
    ],
    [
        'application/x-shockwave-flash',
        'swf'
    ],
    [
        'application/x-silverlight-app',
        'xap'
    ],
    [
        'application/x-sit',
        'sit'
    ],
    [
        'application/x-sprite',
        [
            'spr',
            'sprite'
        ]
    ],
    [
        'application/x-stuffit',
        'sit'
    ],
    [
        'application/x-stuffitx',
        'sitx'
    ],
    [
        'application/x-sv4cpio',
        'sv4cpio'
    ],
    [
        'application/x-sv4crc',
        'sv4crc'
    ],
    [
        'application/x-tar',
        'tar'
    ],
    [
        'application/x-tbook',
        [
            'sbk',
            'tbk'
        ]
    ],
    [
        'application/x-tcl',
        'tcl'
    ],
    [
        'application/x-tex',
        'tex'
    ],
    [
        'application/x-tex-tfm',
        'tfm'
    ],
    [
        'application/x-texinfo',
        [
            'texi',
            'texinfo'
        ]
    ],
    [
        'application/x-troff',
        [
            'roff',
            't',
            'tr'
        ]
    ],
    [
        'application/x-troff-man',
        'man'
    ],
    [
        'application/x-troff-me',
        'me'
    ],
    [
        'application/x-troff-ms',
        'ms'
    ],
    [
        'application/x-troff-msvideo',
        'avi'
    ],
    [
        'application/x-ustar',
        'ustar'
    ],
    [
        'application/x-visio',
        [
            'vsd',
            'vst',
            'vsw'
        ]
    ],
    [
        'application/x-vnd.audioexplosion.mzz',
        'mzz'
    ],
    [
        'application/x-vnd.ls-xpix',
        'xpix'
    ],
    [
        'application/x-vrml',
        'vrml'
    ],
    [
        'application/x-wais-source',
        [
            'src',
            'wsrc'
        ]
    ],
    [
        'application/x-winhelp',
        'hlp'
    ],
    [
        'application/x-wintalk',
        'wtk'
    ],
    [
        'application/x-world',
        [
            'wrl',
            'svr'
        ]
    ],
    [
        'application/x-wpwin',
        'wpd'
    ],
    [
        'application/x-wri',
        'wri'
    ],
    [
        'application/x-x509-ca-cert',
        [
            'cer',
            'crt',
            'der'
        ]
    ],
    [
        'application/x-x509-user-cert',
        'crt'
    ],
    [
        'application/x-xfig',
        'fig'
    ],
    [
        'application/x-xpinstall',
        'xpi'
    ],
    [
        'application/x-zip-compressed',
        'zip'
    ],
    [
        'application/xcap-diff+xml',
        'xdf'
    ],
    [
        'application/xenc+xml',
        'xenc'
    ],
    [
        'application/xhtml+xml',
        'xhtml'
    ],
    [
        'application/xml',
        'xml'
    ],
    [
        'application/xml-dtd',
        'dtd'
    ],
    [
        'application/xop+xml',
        'xop'
    ],
    [
        'application/xslt+xml',
        'xslt'
    ],
    [
        'application/xspf+xml',
        'xspf'
    ],
    [
        'application/xv+xml',
        'mxml'
    ],
    [
        'application/yang',
        'yang'
    ],
    [
        'application/yin+xml',
        'yin'
    ],
    [
        'application/ynd.ms-pkipko',
        'pko'
    ],
    [
        'application/zip',
        'zip'
    ],
    [
        'audio/adpcm',
        'adp'
    ],
    [
        'audio/aiff',
        [
            'aiff',
            'aif',
            'aifc'
        ]
    ],
    [
        'audio/basic',
        [
            'snd',
            'au'
        ]
    ],
    [
        'audio/it',
        'it'
    ],
    [
        'audio/make',
        [
            'funk',
            'my',
            'pfunk'
        ]
    ],
    [
        'audio/make.my.funk',
        'pfunk'
    ],
    [
        'audio/mid',
        [
            'mid',
            'rmi'
        ]
    ],
    [
        'audio/midi',
        [
            'midi',
            'kar',
            'mid'
        ]
    ],
    [
        'audio/mod',
        'mod'
    ],
    [
        'audio/mp4',
        'mp4a'
    ],
    [
        'audio/mpeg',
        [
            'mpga',
            'mp3',
            'm2a',
            'mp2',
            'mpa',
            'mpg'
        ]
    ],
    [
        'audio/mpeg3',
        'mp3'
    ],
    [
        'audio/nspaudio',
        [
            'la',
            'lma'
        ]
    ],
    [
        'audio/ogg',
        'oga'
    ],
    [
        'audio/s3m',
        's3m'
    ],
    [
        'audio/tsp-audio',
        'tsi'
    ],
    [
        'audio/tsplayer',
        'tsp'
    ],
    [
        'audio/vnd.dece.audio',
        'uva'
    ],
    [
        'audio/vnd.digital-winds',
        'eol'
    ],
    [
        'audio/vnd.dra',
        'dra'
    ],
    [
        'audio/vnd.dts',
        'dts'
    ],
    [
        'audio/vnd.dts.hd',
        'dtshd'
    ],
    [
        'audio/vnd.lucent.voice',
        'lvp'
    ],
    [
        'audio/vnd.ms-playready.media.pya',
        'pya'
    ],
    [
        'audio/vnd.nuera.ecelp4800',
        'ecelp4800'
    ],
    [
        'audio/vnd.nuera.ecelp7470',
        'ecelp7470'
    ],
    [
        'audio/vnd.nuera.ecelp9600',
        'ecelp9600'
    ],
    [
        'audio/vnd.qcelp',
        'qcp'
    ],
    [
        'audio/vnd.rip',
        'rip'
    ],
    [
        'audio/voc',
        'voc'
    ],
    [
        'audio/voxware',
        'vox'
    ],
    [
        'audio/wav',
        'wav'
    ],
    [
        'audio/webm',
        'weba'
    ],
    [
        'audio/x-aac',
        'aac'
    ],
    [
        'audio/x-adpcm',
        'snd'
    ],
    [
        'audio/x-aiff',
        [
            'aiff',
            'aif',
            'aifc'
        ]
    ],
    [
        'audio/x-au',
        'au'
    ],
    [
        'audio/x-gsm',
        [
            'gsd',
            'gsm'
        ]
    ],
    [
        'audio/x-jam',
        'jam'
    ],
    [
        'audio/x-liveaudio',
        'lam'
    ],
    [
        'audio/x-mid',
        [
            'mid',
            'midi'
        ]
    ],
    [
        'audio/x-midi',
        [
            'midi',
            'mid'
        ]
    ],
    [
        'audio/x-mod',
        'mod'
    ],
    [
        'audio/x-mpeg',
        'mp2'
    ],
    [
        'audio/x-mpeg-3',
        'mp3'
    ],
    [
        'audio/x-mpegurl',
        'm3u'
    ],
    [
        'audio/x-mpequrl',
        'm3u'
    ],
    [
        'audio/x-ms-wax',
        'wax'
    ],
    [
        'audio/x-ms-wma',
        'wma'
    ],
    [
        'audio/x-nspaudio',
        [
            'la',
            'lma'
        ]
    ],
    [
        'audio/x-pn-realaudio',
        [
            'ra',
            'ram',
            'rm',
            'rmm',
            'rmp'
        ]
    ],
    [
        'audio/x-pn-realaudio-plugin',
        [
            'ra',
            'rmp',
            'rpm'
        ]
    ],
    [
        'audio/x-psid',
        'sid'
    ],
    [
        'audio/x-realaudio',
        'ra'
    ],
    [
        'audio/x-twinvq',
        'vqf'
    ],
    [
        'audio/x-twinvq-plugin',
        [
            'vqe',
            'vql'
        ]
    ],
    [
        'audio/x-vnd.audioexplosion.mjuicemediafile',
        'mjf'
    ],
    [
        'audio/x-voc',
        'voc'
    ],
    [
        'audio/x-wav',
        'wav'
    ],
    [
        'audio/xm',
        'xm'
    ],
    [
        'chemical/x-cdx',
        'cdx'
    ],
    [
        'chemical/x-cif',
        'cif'
    ],
    [
        'chemical/x-cmdf',
        'cmdf'
    ],
    [
        'chemical/x-cml',
        'cml'
    ],
    [
        'chemical/x-csml',
        'csml'
    ],
    [
        'chemical/x-pdb',
        [
            'pdb',
            'xyz'
        ]
    ],
    [
        'chemical/x-xyz',
        'xyz'
    ],
    [
        'drawing/x-dwf',
        'dwf'
    ],
    [
        'i-world/i-vrml',
        'ivr'
    ],
    [
        'image/bmp',
        [
            'bmp',
            'bm'
        ]
    ],
    [
        'image/cgm',
        'cgm'
    ],
    [
        'image/cis-cod',
        'cod'
    ],
    [
        'image/cmu-raster',
        [
            'ras',
            'rast'
        ]
    ],
    [
        'image/fif',
        'fif'
    ],
    [
        'image/florian',
        [
            'flo',
            'turbot'
        ]
    ],
    [
        'image/g3fax',
        'g3'
    ],
    [
        'image/gif',
        'gif'
    ],
    [
        'image/ief',
        [
            'ief',
            'iefs'
        ]
    ],
    [
        'image/jpeg',
        [
            'jpeg',
            'jpe',
            'jpg',
            'jfif',
            'jfif-tbnl'
        ]
    ],
    [
        'image/jutvision',
        'jut'
    ],
    [
        'image/ktx',
        'ktx'
    ],
    [
        'image/naplps',
        [
            'nap',
            'naplps'
        ]
    ],
    [
        'image/pict',
        [
            'pic',
            'pict'
        ]
    ],
    [
        'image/pipeg',
        'jfif'
    ],
    [
        'image/pjpeg',
        [
            'jfif',
            'jpe',
            'jpeg',
            'jpg'
        ]
    ],
    [
        'image/png',
        [
            'png',
            'x-png'
        ]
    ],
    [
        'image/prs.btif',
        'btif'
    ],
    [
        'image/svg+xml',
        'svg'
    ],
    [
        'image/tiff',
        [
            'tif',
            'tiff'
        ]
    ],
    [
        'image/vasa',
        'mcf'
    ],
    [
        'image/vnd.adobe.photoshop',
        'psd'
    ],
    [
        'image/vnd.dece.graphic',
        'uvi'
    ],
    [
        'image/vnd.djvu',
        'djvu'
    ],
    [
        'image/vnd.dvb.subtitle',
        'sub'
    ],
    [
        'image/vnd.dwg',
        [
            'dwg',
            'dxf',
            'svf'
        ]
    ],
    [
        'image/vnd.dxf',
        'dxf'
    ],
    [
        'image/vnd.fastbidsheet',
        'fbs'
    ],
    [
        'image/vnd.fpx',
        'fpx'
    ],
    [
        'image/vnd.fst',
        'fst'
    ],
    [
        'image/vnd.fujixerox.edmics-mmr',
        'mmr'
    ],
    [
        'image/vnd.fujixerox.edmics-rlc',
        'rlc'
    ],
    [
        'image/vnd.ms-modi',
        'mdi'
    ],
    [
        'image/vnd.net-fpx',
        [
            'fpx',
            'npx'
        ]
    ],
    [
        'image/vnd.rn-realflash',
        'rf'
    ],
    [
        'image/vnd.rn-realpix',
        'rp'
    ],
    [
        'image/vnd.wap.wbmp',
        'wbmp'
    ],
    [
        'image/vnd.xiff',
        'xif'
    ],
    [
        'image/webp',
        'webp'
    ],
    [
        'image/x-cmu-raster',
        'ras'
    ],
    [
        'image/x-cmx',
        'cmx'
    ],
    [
        'image/x-dwg',
        [
            'dwg',
            'dxf',
            'svf'
        ]
    ],
    [
        'image/x-freehand',
        'fh'
    ],
    [
        'image/x-icon',
        'ico'
    ],
    [
        'image/x-jg',
        'art'
    ],
    [
        'image/x-jps',
        'jps'
    ],
    [
        'image/x-niff',
        [
            'niff',
            'nif'
        ]
    ],
    [
        'image/x-pcx',
        'pcx'
    ],
    [
        'image/x-pict',
        [
            'pct',
            'pic'
        ]
    ],
    [
        'image/x-portable-anymap',
        'pnm'
    ],
    [
        'image/x-portable-bitmap',
        'pbm'
    ],
    [
        'image/x-portable-graymap',
        'pgm'
    ],
    [
        'image/x-portable-greymap',
        'pgm'
    ],
    [
        'image/x-portable-pixmap',
        'ppm'
    ],
    [
        'image/x-quicktime',
        [
            'qif',
            'qti',
            'qtif'
        ]
    ],
    [
        'image/x-rgb',
        'rgb'
    ],
    [
        'image/x-tiff',
        [
            'tif',
            'tiff'
        ]
    ],
    [
        'image/x-windows-bmp',
        'bmp'
    ],
    [
        'image/x-xbitmap',
        'xbm'
    ],
    [
        'image/x-xbm',
        'xbm'
    ],
    [
        'image/x-xpixmap',
        [
            'xpm',
            'pm'
        ]
    ],
    [
        'image/x-xwd',
        'xwd'
    ],
    [
        'image/x-xwindowdump',
        'xwd'
    ],
    [
        'image/xbm',
        'xbm'
    ],
    [
        'image/xpm',
        'xpm'
    ],
    [
        'message/rfc822',
        [
            'eml',
            'mht',
            'mhtml',
            'nws',
            'mime'
        ]
    ],
    [
        'model/iges',
        [
            'iges',
            'igs'
        ]
    ],
    [
        'model/mesh',
        'msh'
    ],
    [
        'model/vnd.collada+xml',
        'dae'
    ],
    [
        'model/vnd.dwf',
        'dwf'
    ],
    [
        'model/vnd.gdl',
        'gdl'
    ],
    [
        'model/vnd.gtw',
        'gtw'
    ],
    [
        'model/vnd.mts',
        'mts'
    ],
    [
        'model/vnd.vtu',
        'vtu'
    ],
    [
        'model/vrml',
        [
            'vrml',
            'wrl',
            'wrz'
        ]
    ],
    [
        'model/x-pov',
        'pov'
    ],
    [
        'multipart/x-gzip',
        'gzip'
    ],
    [
        'multipart/x-ustar',
        'ustar'
    ],
    [
        'multipart/x-zip',
        'zip'
    ],
    [
        'music/crescendo',
        [
            'mid',
            'midi'
        ]
    ],
    [
        'music/x-karaoke',
        'kar'
    ],
    [
        'paleovu/x-pv',
        'pvu'
    ],
    [
        'text/asp',
        'asp'
    ],
    [
        'text/calendar',
        'ics'
    ],
    [
        'text/css',
        'css'
    ],
    [
        'text/csv',
        'csv'
    ],
    [
        'text/ecmascript',
        'js'
    ],
    [
        'text/h323',
        '323'
    ],
    [
        'text/html',
        [
            'html',
            'htm',
            'stm',
            'acgi',
            'htmls',
            'htx',
            'shtml'
        ]
    ],
    [
        'text/iuls',
        'uls'
    ],
    [
        'text/javascript',
        'js'
    ],
    [
        'text/mcf',
        'mcf'
    ],
    [
        'text/n3',
        'n3'
    ],
    [
        'text/pascal',
        'pas'
    ],
    [
        'text/plain',
        [
            'txt',
            'bas',
            'c',
            'h',
            'c++',
            'cc',
            'com',
            'conf',
            'cxx',
            'def',
            'f',
            'f90',
            'for',
            'g',
            'hh',
            'idc',
            'jav',
            'java',
            'list',
            'log',
            'lst',
            'm',
            'mar',
            'pl',
            'sdml',
            'text'
        ]
    ],
    [
        'text/plain-bas',
        'par'
    ],
    [
        'text/prs.lines.tag',
        'dsc'
    ],
    [
        'text/richtext',
        [
            'rtx',
            'rt',
            'rtf'
        ]
    ],
    [
        'text/scriplet',
        'wsc'
    ],
    [
        'text/scriptlet',
        'sct'
    ],
    [
        'text/sgml',
        [
            'sgm',
            'sgml'
        ]
    ],
    [
        'text/tab-separated-values',
        'tsv'
    ],
    [
        'text/troff',
        't'
    ],
    [
        'text/turtle',
        'ttl'
    ],
    [
        'text/uri-list',
        [
            'uni',
            'unis',
            'uri',
            'uris'
        ]
    ],
    [
        'text/vnd.abc',
        'abc'
    ],
    [
        'text/vnd.curl',
        'curl'
    ],
    [
        'text/vnd.curl.dcurl',
        'dcurl'
    ],
    [
        'text/vnd.curl.mcurl',
        'mcurl'
    ],
    [
        'text/vnd.curl.scurl',
        'scurl'
    ],
    [
        'text/vnd.fly',
        'fly'
    ],
    [
        'text/vnd.fmi.flexstor',
        'flx'
    ],
    [
        'text/vnd.graphviz',
        'gv'
    ],
    [
        'text/vnd.in3d.3dml',
        '3dml'
    ],
    [
        'text/vnd.in3d.spot',
        'spot'
    ],
    [
        'text/vnd.rn-realtext',
        'rt'
    ],
    [
        'text/vnd.sun.j2me.app-descriptor',
        'jad'
    ],
    [
        'text/vnd.wap.wml',
        'wml'
    ],
    [
        'text/vnd.wap.wmlscript',
        'wmls'
    ],
    [
        'text/webviewhtml',
        'htt'
    ],
    [
        'text/x-asm',
        [
            'asm',
            's'
        ]
    ],
    [
        'text/x-audiosoft-intra',
        'aip'
    ],
    [
        'text/x-c',
        [
            'c',
            'cc',
            'cpp'
        ]
    ],
    [
        'text/x-component',
        'htc'
    ],
    [
        'text/x-fortran',
        [
            'for',
            'f',
            'f77',
            'f90'
        ]
    ],
    [
        'text/x-h',
        [
            'h',
            'hh'
        ]
    ],
    [
        'text/x-java-source',
        [
            'java',
            'jav'
        ]
    ],
    [
        'text/x-java-source,java',
        'java'
    ],
    [
        'text/x-la-asf',
        'lsx'
    ],
    [
        'text/x-m',
        'm'
    ],
    [
        'text/x-pascal',
        'p'
    ],
    [
        'text/x-script',
        'hlb'
    ],
    [
        'text/x-script.csh',
        'csh'
    ],
    [
        'text/x-script.elisp',
        'el'
    ],
    [
        'text/x-script.guile',
        'scm'
    ],
    [
        'text/x-script.ksh',
        'ksh'
    ],
    [
        'text/x-script.lisp',
        'lsp'
    ],
    [
        'text/x-script.perl',
        'pl'
    ],
    [
        'text/x-script.perl-module',
        'pm'
    ],
    [
        'text/x-script.phyton',
        'py'
    ],
    [
        'text/x-script.rexx',
        'rexx'
    ],
    [
        'text/x-script.scheme',
        'scm'
    ],
    [
        'text/x-script.sh',
        'sh'
    ],
    [
        'text/x-script.tcl',
        'tcl'
    ],
    [
        'text/x-script.tcsh',
        'tcsh'
    ],
    [
        'text/x-script.zsh',
        'zsh'
    ],
    [
        'text/x-server-parsed-html',
        [
            'shtml',
            'ssi'
        ]
    ],
    [
        'text/x-setext',
        'etx'
    ],
    [
        'text/x-sgml',
        [
            'sgm',
            'sgml'
        ]
    ],
    [
        'text/x-speech',
        [
            'spc',
            'talk'
        ]
    ],
    [
        'text/x-uil',
        'uil'
    ],
    [
        'text/x-uuencode',
        [
            'uu',
            'uue'
        ]
    ],
    [
        'text/x-vcalendar',
        'vcs'
    ],
    [
        'text/x-vcard',
        'vcf'
    ],
    [
        'text/xml',
        'xml'
    ],
    [
        'video/3gpp',
        '3gp'
    ],
    [
        'video/3gpp2',
        '3g2'
    ],
    [
        'video/animaflex',
        'afl'
    ],
    [
        'video/avi',
        'avi'
    ],
    [
        'video/avs-video',
        'avs'
    ],
    [
        'video/dl',
        'dl'
    ],
    [
        'video/fli',
        'fli'
    ],
    [
        'video/gl',
        'gl'
    ],
    [
        'video/h261',
        'h261'
    ],
    [
        'video/h263',
        'h263'
    ],
    [
        'video/h264',
        'h264'
    ],
    [
        'video/jpeg',
        'jpgv'
    ],
    [
        'video/jpm',
        'jpm'
    ],
    [
        'video/mj2',
        'mj2'
    ],
    [
        'video/mp4',
        'mp4'
    ],
    [
        'video/mpeg',
        [
            'mpeg',
            'mp2',
            'mpa',
            'mpe',
            'mpg',
            'mpv2',
            'm1v',
            'm2v',
            'mp3'
        ]
    ],
    [
        'video/msvideo',
        'avi'
    ],
    [
        'video/ogg',
        'ogv'
    ],
    [
        'video/quicktime',
        [
            'mov',
            'qt',
            'moov'
        ]
    ],
    [
        'video/vdo',
        'vdo'
    ],
    [
        'video/vivo',
        [
            'viv',
            'vivo'
        ]
    ],
    [
        'video/vnd.dece.hd',
        'uvh'
    ],
    [
        'video/vnd.dece.mobile',
        'uvm'
    ],
    [
        'video/vnd.dece.pd',
        'uvp'
    ],
    [
        'video/vnd.dece.sd',
        'uvs'
    ],
    [
        'video/vnd.dece.video',
        'uvv'
    ],
    [
        'video/vnd.fvt',
        'fvt'
    ],
    [
        'video/vnd.mpegurl',
        'mxu'
    ],
    [
        'video/vnd.ms-playready.media.pyv',
        'pyv'
    ],
    [
        'video/vnd.rn-realvideo',
        'rv'
    ],
    [
        'video/vnd.uvvu.mp4',
        'uvu'
    ],
    [
        'video/vnd.vivo',
        [
            'viv',
            'vivo'
        ]
    ],
    [
        'video/vosaic',
        'vos'
    ],
    [
        'video/webm',
        'webm'
    ],
    [
        'video/x-amt-demorun',
        'xdr'
    ],
    [
        'video/x-amt-showrun',
        'xsr'
    ],
    [
        'video/x-atomic3d-feature',
        'fmf'
    ],
    [
        'video/x-dl',
        'dl'
    ],
    [
        'video/x-dv',
        [
            'dif',
            'dv'
        ]
    ],
    [
        'video/x-f4v',
        'f4v'
    ],
    [
        'video/x-fli',
        'fli'
    ],
    [
        'video/x-flv',
        'flv'
    ],
    [
        'video/x-gl',
        'gl'
    ],
    [
        'video/x-isvideo',
        'isu'
    ],
    [
        'video/x-la-asf',
        [
            'lsf',
            'lsx'
        ]
    ],
    [
        'video/x-m4v',
        'm4v'
    ],
    [
        'video/x-motion-jpeg',
        'mjpg'
    ],
    [
        'video/x-mpeg',
        [
            'mp3',
            'mp2'
        ]
    ],
    [
        'video/x-mpeq2a',
        'mp2'
    ],
    [
        'video/x-ms-asf',
        [
            'asf',
            'asr',
            'asx'
        ]
    ],
    [
        'video/x-ms-asf-plugin',
        'asx'
    ],
    [
        'video/x-ms-wm',
        'wm'
    ],
    [
        'video/x-ms-wmv',
        'wmv'
    ],
    [
        'video/x-ms-wmx',
        'wmx'
    ],
    [
        'video/x-ms-wvx',
        'wvx'
    ],
    [
        'video/x-msvideo',
        'avi'
    ],
    [
        'video/x-qtc',
        'qtc'
    ],
    [
        'video/x-scm',
        'scm'
    ],
    [
        'video/x-sgi-movie',
        [
            'movie',
            'mv'
        ]
    ],
    [
        'windows/metafile',
        'wmf'
    ],
    [
        'www/mime',
        'mime'
    ],
    [
        'x-conference/x-cooltalk',
        'ice'
    ],
    [
        'x-music/x-midi',
        [
            'mid',
            'midi'
        ]
    ],
    [
        'x-world/x-3dmf',
        [
            '3dm',
            '3dmf',
            'qd3',
            'qd3d'
        ]
    ],
    [
        'x-world/x-svr',
        'svr'
    ],
    [
        'x-world/x-vrml',
        [
            'flr',
            'vrml',
            'wrl',
            'wrz',
            'xaf',
            'xof'
        ]
    ],
    [
        'x-world/x-vrt',
        'vrt'
    ],
    [
        'xgl/drawing',
        'xgz'
    ],
    [
        'xgl/movie',
        'xmz'
    ]
]);
const extensions = new Map([
    [
        '123',
        'application/vnd.lotus-1-2-3'
    ],
    [
        '323',
        'text/h323'
    ],
    [
        '*',
        'application/octet-stream'
    ],
    [
        '3dm',
        'x-world/x-3dmf'
    ],
    [
        '3dmf',
        'x-world/x-3dmf'
    ],
    [
        '3dml',
        'text/vnd.in3d.3dml'
    ],
    [
        '3g2',
        'video/3gpp2'
    ],
    [
        '3gp',
        'video/3gpp'
    ],
    [
        '7z',
        'application/x-7z-compressed'
    ],
    [
        'a',
        'application/octet-stream'
    ],
    [
        'aab',
        'application/x-authorware-bin'
    ],
    [
        'aac',
        'audio/x-aac'
    ],
    [
        'aam',
        'application/x-authorware-map'
    ],
    [
        'aas',
        'application/x-authorware-seg'
    ],
    [
        'abc',
        'text/vnd.abc'
    ],
    [
        'abw',
        'application/x-abiword'
    ],
    [
        'ac',
        'application/pkix-attr-cert'
    ],
    [
        'acc',
        'application/vnd.americandynamics.acc'
    ],
    [
        'ace',
        'application/x-ace-compressed'
    ],
    [
        'acgi',
        'text/html'
    ],
    [
        'acu',
        'application/vnd.acucobol'
    ],
    [
        'acx',
        'application/internet-property-stream'
    ],
    [
        'adp',
        'audio/adpcm'
    ],
    [
        'aep',
        'application/vnd.audiograph'
    ],
    [
        'afl',
        'video/animaflex'
    ],
    [
        'afp',
        'application/vnd.ibm.modcap'
    ],
    [
        'ahead',
        'application/vnd.ahead.space'
    ],
    [
        'ai',
        'application/postscript'
    ],
    [
        'aif',
        [
            'audio/aiff',
            'audio/x-aiff'
        ]
    ],
    [
        'aifc',
        [
            'audio/aiff',
            'audio/x-aiff'
        ]
    ],
    [
        'aiff',
        [
            'audio/aiff',
            'audio/x-aiff'
        ]
    ],
    [
        'aim',
        'application/x-aim'
    ],
    [
        'aip',
        'text/x-audiosoft-intra'
    ],
    [
        'air',
        'application/vnd.adobe.air-application-installer-package+zip'
    ],
    [
        'ait',
        'application/vnd.dvb.ait'
    ],
    [
        'ami',
        'application/vnd.amiga.ami'
    ],
    [
        'ani',
        'application/x-navi-animation'
    ],
    [
        'aos',
        'application/x-nokia-9000-communicator-add-on-software'
    ],
    [
        'apk',
        'application/vnd.android.package-archive'
    ],
    [
        'application',
        'application/x-ms-application'
    ],
    [
        'apr',
        'application/vnd.lotus-approach'
    ],
    [
        'aps',
        'application/mime'
    ],
    [
        'arc',
        'application/octet-stream'
    ],
    [
        'arj',
        [
            'application/arj',
            'application/octet-stream'
        ]
    ],
    [
        'art',
        'image/x-jg'
    ],
    [
        'asf',
        'video/x-ms-asf'
    ],
    [
        'asm',
        'text/x-asm'
    ],
    [
        'aso',
        'application/vnd.accpac.simply.aso'
    ],
    [
        'asp',
        'text/asp'
    ],
    [
        'asr',
        'video/x-ms-asf'
    ],
    [
        'asx',
        [
            'video/x-ms-asf',
            'application/x-mplayer2',
            'video/x-ms-asf-plugin'
        ]
    ],
    [
        'atc',
        'application/vnd.acucorp'
    ],
    [
        'atomcat',
        'application/atomcat+xml'
    ],
    [
        'atomsvc',
        'application/atomsvc+xml'
    ],
    [
        'atx',
        'application/vnd.antix.game-component'
    ],
    [
        'au',
        [
            'audio/basic',
            'audio/x-au'
        ]
    ],
    [
        'avi',
        [
            'video/avi',
            'video/msvideo',
            'application/x-troff-msvideo',
            'video/x-msvideo'
        ]
    ],
    [
        'avs',
        'video/avs-video'
    ],
    [
        'aw',
        'application/applixware'
    ],
    [
        'axs',
        'application/olescript'
    ],
    [
        'azf',
        'application/vnd.airzip.filesecure.azf'
    ],
    [
        'azs',
        'application/vnd.airzip.filesecure.azs'
    ],
    [
        'azw',
        'application/vnd.amazon.ebook'
    ],
    [
        'bas',
        'text/plain'
    ],
    [
        'bcpio',
        'application/x-bcpio'
    ],
    [
        'bdf',
        'application/x-font-bdf'
    ],
    [
        'bdm',
        'application/vnd.syncml.dm+wbxml'
    ],
    [
        'bed',
        'application/vnd.realvnc.bed'
    ],
    [
        'bh2',
        'application/vnd.fujitsu.oasysprs'
    ],
    [
        'bin',
        [
            'application/octet-stream',
            'application/mac-binary',
            'application/macbinary',
            'application/x-macbinary',
            'application/x-binary'
        ]
    ],
    [
        'bm',
        'image/bmp'
    ],
    [
        'bmi',
        'application/vnd.bmi'
    ],
    [
        'bmp',
        [
            'image/bmp',
            'image/x-windows-bmp'
        ]
    ],
    [
        'boo',
        'application/book'
    ],
    [
        'book',
        'application/book'
    ],
    [
        'box',
        'application/vnd.previewsystems.box'
    ],
    [
        'boz',
        'application/x-bzip2'
    ],
    [
        'bsh',
        'application/x-bsh'
    ],
    [
        'btif',
        'image/prs.btif'
    ],
    [
        'bz',
        'application/x-bzip'
    ],
    [
        'bz2',
        'application/x-bzip2'
    ],
    [
        'c',
        [
            'text/plain',
            'text/x-c'
        ]
    ],
    [
        'c++',
        'text/plain'
    ],
    [
        'c11amc',
        'application/vnd.cluetrust.cartomobile-config'
    ],
    [
        'c11amz',
        'application/vnd.cluetrust.cartomobile-config-pkg'
    ],
    [
        'c4g',
        'application/vnd.clonk.c4group'
    ],
    [
        'cab',
        'application/vnd.ms-cab-compressed'
    ],
    [
        'car',
        'application/vnd.curl.car'
    ],
    [
        'cat',
        [
            'application/vnd.ms-pkiseccat',
            'application/vnd.ms-pki.seccat'
        ]
    ],
    [
        'cc',
        [
            'text/plain',
            'text/x-c'
        ]
    ],
    [
        'ccad',
        'application/clariscad'
    ],
    [
        'cco',
        'application/x-cocoa'
    ],
    [
        'ccxml',
        'application/ccxml+xml,'
    ],
    [
        'cdbcmsg',
        'application/vnd.contact.cmsg'
    ],
    [
        'cdf',
        [
            'application/cdf',
            'application/x-cdf',
            'application/x-netcdf'
        ]
    ],
    [
        'cdkey',
        'application/vnd.mediastation.cdkey'
    ],
    [
        'cdmia',
        'application/cdmi-capability'
    ],
    [
        'cdmic',
        'application/cdmi-container'
    ],
    [
        'cdmid',
        'application/cdmi-domain'
    ],
    [
        'cdmio',
        'application/cdmi-object'
    ],
    [
        'cdmiq',
        'application/cdmi-queue'
    ],
    [
        'cdx',
        'chemical/x-cdx'
    ],
    [
        'cdxml',
        'application/vnd.chemdraw+xml'
    ],
    [
        'cdy',
        'application/vnd.cinderella'
    ],
    [
        'cer',
        [
            'application/pkix-cert',
            'application/x-x509-ca-cert'
        ]
    ],
    [
        'cgm',
        'image/cgm'
    ],
    [
        'cha',
        'application/x-chat'
    ],
    [
        'chat',
        'application/x-chat'
    ],
    [
        'chm',
        'application/vnd.ms-htmlhelp'
    ],
    [
        'chrt',
        'application/vnd.kde.kchart'
    ],
    [
        'cif',
        'chemical/x-cif'
    ],
    [
        'cii',
        'application/vnd.anser-web-certificate-issue-initiation'
    ],
    [
        'cil',
        'application/vnd.ms-artgalry'
    ],
    [
        'cla',
        'application/vnd.claymore'
    ],
    [
        'class',
        [
            'application/octet-stream',
            'application/java',
            'application/java-byte-code',
            'application/java-vm',
            'application/x-java-class'
        ]
    ],
    [
        'clkk',
        'application/vnd.crick.clicker.keyboard'
    ],
    [
        'clkp',
        'application/vnd.crick.clicker.palette'
    ],
    [
        'clkt',
        'application/vnd.crick.clicker.template'
    ],
    [
        'clkw',
        'application/vnd.crick.clicker.wordbank'
    ],
    [
        'clkx',
        'application/vnd.crick.clicker'
    ],
    [
        'clp',
        'application/x-msclip'
    ],
    [
        'cmc',
        'application/vnd.cosmocaller'
    ],
    [
        'cmdf',
        'chemical/x-cmdf'
    ],
    [
        'cml',
        'chemical/x-cml'
    ],
    [
        'cmp',
        'application/vnd.yellowriver-custom-menu'
    ],
    [
        'cmx',
        'image/x-cmx'
    ],
    [
        'cod',
        [
            'image/cis-cod',
            'application/vnd.rim.cod'
        ]
    ],
    [
        'com',
        [
            'application/octet-stream',
            'text/plain'
        ]
    ],
    [
        'conf',
        'text/plain'
    ],
    [
        'cpio',
        'application/x-cpio'
    ],
    [
        'cpp',
        'text/x-c'
    ],
    [
        'cpt',
        [
            'application/mac-compactpro',
            'application/x-compactpro',
            'application/x-cpt'
        ]
    ],
    [
        'crd',
        'application/x-mscardfile'
    ],
    [
        'crl',
        [
            'application/pkix-crl',
            'application/pkcs-crl'
        ]
    ],
    [
        'crt',
        [
            'application/pkix-cert',
            'application/x-x509-user-cert',
            'application/x-x509-ca-cert'
        ]
    ],
    [
        'cryptonote',
        'application/vnd.rig.cryptonote'
    ],
    [
        'csh',
        [
            'text/x-script.csh',
            'application/x-csh'
        ]
    ],
    [
        'csml',
        'chemical/x-csml'
    ],
    [
        'csp',
        'application/vnd.commonspace'
    ],
    [
        'css',
        [
            'text/css',
            'application/x-pointplus'
        ]
    ],
    [
        'csv',
        'text/csv'
    ],
    [
        'cu',
        'application/cu-seeme'
    ],
    [
        'curl',
        'text/vnd.curl'
    ],
    [
        'cww',
        'application/prs.cww'
    ],
    [
        'cxx',
        'text/plain'
    ],
    [
        'dae',
        'model/vnd.collada+xml'
    ],
    [
        'daf',
        'application/vnd.mobius.daf'
    ],
    [
        'davmount',
        'application/davmount+xml'
    ],
    [
        'dcr',
        'application/x-director'
    ],
    [
        'dcurl',
        'text/vnd.curl.dcurl'
    ],
    [
        'dd2',
        'application/vnd.oma.dd2+xml'
    ],
    [
        'ddd',
        'application/vnd.fujixerox.ddd'
    ],
    [
        'deb',
        'application/x-debian-package'
    ],
    [
        'deepv',
        'application/x-deepv'
    ],
    [
        'def',
        'text/plain'
    ],
    [
        'der',
        'application/x-x509-ca-cert'
    ],
    [
        'dfac',
        'application/vnd.dreamfactory'
    ],
    [
        'dif',
        'video/x-dv'
    ],
    [
        'dir',
        'application/x-director'
    ],
    [
        'dis',
        'application/vnd.mobius.dis'
    ],
    [
        'djvu',
        'image/vnd.djvu'
    ],
    [
        'dl',
        [
            'video/dl',
            'video/x-dl'
        ]
    ],
    [
        'dll',
        'application/x-msdownload'
    ],
    [
        'dms',
        'application/octet-stream'
    ],
    [
        'dna',
        'application/vnd.dna'
    ],
    [
        'doc',
        'application/msword'
    ],
    [
        'docm',
        'application/vnd.ms-word.document.macroenabled.12'
    ],
    [
        'docx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    [
        'dot',
        'application/msword'
    ],
    [
        'dotm',
        'application/vnd.ms-word.template.macroenabled.12'
    ],
    [
        'dotx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
    ],
    [
        'dp',
        [
            'application/commonground',
            'application/vnd.osgi.dp'
        ]
    ],
    [
        'dpg',
        'application/vnd.dpgraph'
    ],
    [
        'dra',
        'audio/vnd.dra'
    ],
    [
        'drw',
        'application/drafting'
    ],
    [
        'dsc',
        'text/prs.lines.tag'
    ],
    [
        'dssc',
        'application/dssc+der'
    ],
    [
        'dtb',
        'application/x-dtbook+xml'
    ],
    [
        'dtd',
        'application/xml-dtd'
    ],
    [
        'dts',
        'audio/vnd.dts'
    ],
    [
        'dtshd',
        'audio/vnd.dts.hd'
    ],
    [
        'dump',
        'application/octet-stream'
    ],
    [
        'dv',
        'video/x-dv'
    ],
    [
        'dvi',
        'application/x-dvi'
    ],
    [
        'dwf',
        [
            'model/vnd.dwf',
            'drawing/x-dwf'
        ]
    ],
    [
        'dwg',
        [
            'application/acad',
            'image/vnd.dwg',
            'image/x-dwg'
        ]
    ],
    [
        'dxf',
        [
            'application/dxf',
            'image/vnd.dwg',
            'image/vnd.dxf',
            'image/x-dwg'
        ]
    ],
    [
        'dxp',
        'application/vnd.spotfire.dxp'
    ],
    [
        'dxr',
        'application/x-director'
    ],
    [
        'ecelp4800',
        'audio/vnd.nuera.ecelp4800'
    ],
    [
        'ecelp7470',
        'audio/vnd.nuera.ecelp7470'
    ],
    [
        'ecelp9600',
        'audio/vnd.nuera.ecelp9600'
    ],
    [
        'edm',
        'application/vnd.novadigm.edm'
    ],
    [
        'edx',
        'application/vnd.novadigm.edx'
    ],
    [
        'efif',
        'application/vnd.picsel'
    ],
    [
        'ei6',
        'application/vnd.pg.osasli'
    ],
    [
        'el',
        'text/x-script.elisp'
    ],
    [
        'elc',
        [
            'application/x-elc',
            'application/x-bytecode.elisp'
        ]
    ],
    [
        'eml',
        'message/rfc822'
    ],
    [
        'emma',
        'application/emma+xml'
    ],
    [
        'env',
        'application/x-envoy'
    ],
    [
        'eol',
        'audio/vnd.digital-winds'
    ],
    [
        'eot',
        'application/vnd.ms-fontobject'
    ],
    [
        'eps',
        'application/postscript'
    ],
    [
        'epub',
        'application/epub+zip'
    ],
    [
        'es',
        [
            'application/ecmascript',
            'application/x-esrehber'
        ]
    ],
    [
        'es3',
        'application/vnd.eszigno3+xml'
    ],
    [
        'esf',
        'application/vnd.epson.esf'
    ],
    [
        'etx',
        'text/x-setext'
    ],
    [
        'evy',
        [
            'application/envoy',
            'application/x-envoy'
        ]
    ],
    [
        'exe',
        [
            'application/octet-stream',
            'application/x-msdownload'
        ]
    ],
    [
        'exi',
        'application/exi'
    ],
    [
        'ext',
        'application/vnd.novadigm.ext'
    ],
    [
        'ez2',
        'application/vnd.ezpix-album'
    ],
    [
        'ez3',
        'application/vnd.ezpix-package'
    ],
    [
        'f',
        [
            'text/plain',
            'text/x-fortran'
        ]
    ],
    [
        'f4v',
        'video/x-f4v'
    ],
    [
        'f77',
        'text/x-fortran'
    ],
    [
        'f90',
        [
            'text/plain',
            'text/x-fortran'
        ]
    ],
    [
        'fbs',
        'image/vnd.fastbidsheet'
    ],
    [
        'fcs',
        'application/vnd.isac.fcs'
    ],
    [
        'fdf',
        'application/vnd.fdf'
    ],
    [
        'fe_launch',
        'application/vnd.denovo.fcselayout-link'
    ],
    [
        'fg5',
        'application/vnd.fujitsu.oasysgp'
    ],
    [
        'fh',
        'image/x-freehand'
    ],
    [
        'fif',
        [
            'application/fractals',
            'image/fif'
        ]
    ],
    [
        'fig',
        'application/x-xfig'
    ],
    [
        'fli',
        [
            'video/fli',
            'video/x-fli'
        ]
    ],
    [
        'flo',
        [
            'image/florian',
            'application/vnd.micrografx.flo'
        ]
    ],
    [
        'flr',
        'x-world/x-vrml'
    ],
    [
        'flv',
        'video/x-flv'
    ],
    [
        'flw',
        'application/vnd.kde.kivio'
    ],
    [
        'flx',
        'text/vnd.fmi.flexstor'
    ],
    [
        'fly',
        'text/vnd.fly'
    ],
    [
        'fm',
        'application/vnd.framemaker'
    ],
    [
        'fmf',
        'video/x-atomic3d-feature'
    ],
    [
        'fnc',
        'application/vnd.frogans.fnc'
    ],
    [
        'for',
        [
            'text/plain',
            'text/x-fortran'
        ]
    ],
    [
        'fpx',
        [
            'image/vnd.fpx',
            'image/vnd.net-fpx'
        ]
    ],
    [
        'frl',
        'application/freeloader'
    ],
    [
        'fsc',
        'application/vnd.fsc.weblaunch'
    ],
    [
        'fst',
        'image/vnd.fst'
    ],
    [
        'ftc',
        'application/vnd.fluxtime.clip'
    ],
    [
        'fti',
        'application/vnd.anser-web-funds-transfer-initiation'
    ],
    [
        'funk',
        'audio/make'
    ],
    [
        'fvt',
        'video/vnd.fvt'
    ],
    [
        'fxp',
        'application/vnd.adobe.fxp'
    ],
    [
        'fzs',
        'application/vnd.fuzzysheet'
    ],
    [
        'g',
        'text/plain'
    ],
    [
        'g2w',
        'application/vnd.geoplan'
    ],
    [
        'g3',
        'image/g3fax'
    ],
    [
        'g3w',
        'application/vnd.geospace'
    ],
    [
        'gac',
        'application/vnd.groove-account'
    ],
    [
        'gdl',
        'model/vnd.gdl'
    ],
    [
        'geo',
        'application/vnd.dynageo'
    ],
    [
        'geojson',
        'application/geo+json'
    ],
    [
        'gex',
        'application/vnd.geometry-explorer'
    ],
    [
        'ggb',
        'application/vnd.geogebra.file'
    ],
    [
        'ggt',
        'application/vnd.geogebra.tool'
    ],
    [
        'ghf',
        'application/vnd.groove-help'
    ],
    [
        'gif',
        'image/gif'
    ],
    [
        'gim',
        'application/vnd.groove-identity-message'
    ],
    [
        'gl',
        [
            'video/gl',
            'video/x-gl'
        ]
    ],
    [
        'gmx',
        'application/vnd.gmx'
    ],
    [
        'gnumeric',
        'application/x-gnumeric'
    ],
    [
        'gph',
        'application/vnd.flographit'
    ],
    [
        'gqf',
        'application/vnd.grafeq'
    ],
    [
        'gram',
        'application/srgs'
    ],
    [
        'grv',
        'application/vnd.groove-injector'
    ],
    [
        'grxml',
        'application/srgs+xml'
    ],
    [
        'gsd',
        'audio/x-gsm'
    ],
    [
        'gsf',
        'application/x-font-ghostscript'
    ],
    [
        'gsm',
        'audio/x-gsm'
    ],
    [
        'gsp',
        'application/x-gsp'
    ],
    [
        'gss',
        'application/x-gss'
    ],
    [
        'gtar',
        'application/x-gtar'
    ],
    [
        'gtm',
        'application/vnd.groove-tool-message'
    ],
    [
        'gtw',
        'model/vnd.gtw'
    ],
    [
        'gv',
        'text/vnd.graphviz'
    ],
    [
        'gxt',
        'application/vnd.geonext'
    ],
    [
        'gz',
        [
            'application/x-gzip',
            'application/x-compressed'
        ]
    ],
    [
        'gzip',
        [
            'multipart/x-gzip',
            'application/x-gzip'
        ]
    ],
    [
        'h',
        [
            'text/plain',
            'text/x-h'
        ]
    ],
    [
        'h261',
        'video/h261'
    ],
    [
        'h263',
        'video/h263'
    ],
    [
        'h264',
        'video/h264'
    ],
    [
        'hal',
        'application/vnd.hal+xml'
    ],
    [
        'hbci',
        'application/vnd.hbci'
    ],
    [
        'hdf',
        'application/x-hdf'
    ],
    [
        'help',
        'application/x-helpfile'
    ],
    [
        'hgl',
        'application/vnd.hp-hpgl'
    ],
    [
        'hh',
        [
            'text/plain',
            'text/x-h'
        ]
    ],
    [
        'hlb',
        'text/x-script'
    ],
    [
        'hlp',
        [
            'application/winhlp',
            'application/hlp',
            'application/x-helpfile',
            'application/x-winhelp'
        ]
    ],
    [
        'hpg',
        'application/vnd.hp-hpgl'
    ],
    [
        'hpgl',
        'application/vnd.hp-hpgl'
    ],
    [
        'hpid',
        'application/vnd.hp-hpid'
    ],
    [
        'hps',
        'application/vnd.hp-hps'
    ],
    [
        'hqx',
        [
            'application/mac-binhex40',
            'application/binhex',
            'application/binhex4',
            'application/mac-binhex',
            'application/x-binhex40',
            'application/x-mac-binhex40'
        ]
    ],
    [
        'hta',
        'application/hta'
    ],
    [
        'htc',
        'text/x-component'
    ],
    [
        'htke',
        'application/vnd.kenameaapp'
    ],
    [
        'htm',
        'text/html'
    ],
    [
        'html',
        'text/html'
    ],
    [
        'htmls',
        'text/html'
    ],
    [
        'htt',
        'text/webviewhtml'
    ],
    [
        'htx',
        'text/html'
    ],
    [
        'hvd',
        'application/vnd.yamaha.hv-dic'
    ],
    [
        'hvp',
        'application/vnd.yamaha.hv-voice'
    ],
    [
        'hvs',
        'application/vnd.yamaha.hv-script'
    ],
    [
        'i2g',
        'application/vnd.intergeo'
    ],
    [
        'icc',
        'application/vnd.iccprofile'
    ],
    [
        'ice',
        'x-conference/x-cooltalk'
    ],
    [
        'ico',
        'image/x-icon'
    ],
    [
        'ics',
        'text/calendar'
    ],
    [
        'idc',
        'text/plain'
    ],
    [
        'ief',
        'image/ief'
    ],
    [
        'iefs',
        'image/ief'
    ],
    [
        'ifm',
        'application/vnd.shana.informed.formdata'
    ],
    [
        'iges',
        [
            'application/iges',
            'model/iges'
        ]
    ],
    [
        'igl',
        'application/vnd.igloader'
    ],
    [
        'igm',
        'application/vnd.insors.igm'
    ],
    [
        'igs',
        [
            'application/iges',
            'model/iges'
        ]
    ],
    [
        'igx',
        'application/vnd.micrografx.igx'
    ],
    [
        'iif',
        'application/vnd.shana.informed.interchange'
    ],
    [
        'iii',
        'application/x-iphone'
    ],
    [
        'ima',
        'application/x-ima'
    ],
    [
        'imap',
        'application/x-httpd-imap'
    ],
    [
        'imp',
        'application/vnd.accpac.simply.imp'
    ],
    [
        'ims',
        'application/vnd.ms-ims'
    ],
    [
        'inf',
        'application/inf'
    ],
    [
        'ins',
        [
            'application/x-internet-signup',
            'application/x-internett-signup'
        ]
    ],
    [
        'ip',
        'application/x-ip2'
    ],
    [
        'ipfix',
        'application/ipfix'
    ],
    [
        'ipk',
        'application/vnd.shana.informed.package'
    ],
    [
        'irm',
        'application/vnd.ibm.rights-management'
    ],
    [
        'irp',
        'application/vnd.irepository.package+xml'
    ],
    [
        'isp',
        'application/x-internet-signup'
    ],
    [
        'isu',
        'video/x-isvideo'
    ],
    [
        'it',
        'audio/it'
    ],
    [
        'itp',
        'application/vnd.shana.informed.formtemplate'
    ],
    [
        'iv',
        'application/x-inventor'
    ],
    [
        'ivp',
        'application/vnd.immervision-ivp'
    ],
    [
        'ivr',
        'i-world/i-vrml'
    ],
    [
        'ivu',
        'application/vnd.immervision-ivu'
    ],
    [
        'ivy',
        'application/x-livescreen'
    ],
    [
        'jad',
        'text/vnd.sun.j2me.app-descriptor'
    ],
    [
        'jam',
        [
            'application/vnd.jam',
            'audio/x-jam'
        ]
    ],
    [
        'jar',
        'application/java-archive'
    ],
    [
        'jav',
        [
            'text/plain',
            'text/x-java-source'
        ]
    ],
    [
        'java',
        [
            'text/plain',
            'text/x-java-source,java',
            'text/x-java-source'
        ]
    ],
    [
        'jcm',
        'application/x-java-commerce'
    ],
    [
        'jfif',
        [
            'image/pipeg',
            'image/jpeg',
            'image/pjpeg'
        ]
    ],
    [
        'jfif-tbnl',
        'image/jpeg'
    ],
    [
        'jisp',
        'application/vnd.jisp'
    ],
    [
        'jlt',
        'application/vnd.hp-jlyt'
    ],
    [
        'jnlp',
        'application/x-java-jnlp-file'
    ],
    [
        'joda',
        'application/vnd.joost.joda-archive'
    ],
    [
        'jpe',
        [
            'image/jpeg',
            'image/pjpeg'
        ]
    ],
    [
        'jpeg',
        [
            'image/jpeg',
            'image/pjpeg'
        ]
    ],
    [
        'jpg',
        [
            'image/jpeg',
            'image/pjpeg'
        ]
    ],
    [
        'jpgv',
        'video/jpeg'
    ],
    [
        'jpm',
        'video/jpm'
    ],
    [
        'jps',
        'image/x-jps'
    ],
    [
        'js',
        [
            'application/javascript',
            'application/ecmascript',
            'text/javascript',
            'text/ecmascript',
            'application/x-javascript'
        ]
    ],
    [
        'json',
        'application/json'
    ],
    [
        'jut',
        'image/jutvision'
    ],
    [
        'kar',
        [
            'audio/midi',
            'music/x-karaoke'
        ]
    ],
    [
        'karbon',
        'application/vnd.kde.karbon'
    ],
    [
        'kfo',
        'application/vnd.kde.kformula'
    ],
    [
        'kia',
        'application/vnd.kidspiration'
    ],
    [
        'kml',
        'application/vnd.google-earth.kml+xml'
    ],
    [
        'kmz',
        'application/vnd.google-earth.kmz'
    ],
    [
        'kne',
        'application/vnd.kinar'
    ],
    [
        'kon',
        'application/vnd.kde.kontour'
    ],
    [
        'kpr',
        'application/vnd.kde.kpresenter'
    ],
    [
        'ksh',
        [
            'application/x-ksh',
            'text/x-script.ksh'
        ]
    ],
    [
        'ksp',
        'application/vnd.kde.kspread'
    ],
    [
        'ktx',
        'image/ktx'
    ],
    [
        'ktz',
        'application/vnd.kahootz'
    ],
    [
        'kwd',
        'application/vnd.kde.kword'
    ],
    [
        'la',
        [
            'audio/nspaudio',
            'audio/x-nspaudio'
        ]
    ],
    [
        'lam',
        'audio/x-liveaudio'
    ],
    [
        'lasxml',
        'application/vnd.las.las+xml'
    ],
    [
        'latex',
        'application/x-latex'
    ],
    [
        'lbd',
        'application/vnd.llamagraphics.life-balance.desktop'
    ],
    [
        'lbe',
        'application/vnd.llamagraphics.life-balance.exchange+xml'
    ],
    [
        'les',
        'application/vnd.hhe.lesson-player'
    ],
    [
        'lha',
        [
            'application/octet-stream',
            'application/lha',
            'application/x-lha'
        ]
    ],
    [
        'lhx',
        'application/octet-stream'
    ],
    [
        'link66',
        'application/vnd.route66.link66+xml'
    ],
    [
        'list',
        'text/plain'
    ],
    [
        'lma',
        [
            'audio/nspaudio',
            'audio/x-nspaudio'
        ]
    ],
    [
        'log',
        'text/plain'
    ],
    [
        'lrm',
        'application/vnd.ms-lrm'
    ],
    [
        'lsf',
        'video/x-la-asf'
    ],
    [
        'lsp',
        [
            'application/x-lisp',
            'text/x-script.lisp'
        ]
    ],
    [
        'lst',
        'text/plain'
    ],
    [
        'lsx',
        [
            'video/x-la-asf',
            'text/x-la-asf'
        ]
    ],
    [
        'ltf',
        'application/vnd.frogans.ltf'
    ],
    [
        'ltx',
        'application/x-latex'
    ],
    [
        'lvp',
        'audio/vnd.lucent.voice'
    ],
    [
        'lwp',
        'application/vnd.lotus-wordpro'
    ],
    [
        'lzh',
        [
            'application/octet-stream',
            'application/x-lzh'
        ]
    ],
    [
        'lzx',
        [
            'application/lzx',
            'application/octet-stream',
            'application/x-lzx'
        ]
    ],
    [
        'm',
        [
            'text/plain',
            'text/x-m'
        ]
    ],
    [
        'm13',
        'application/x-msmediaview'
    ],
    [
        'm14',
        'application/x-msmediaview'
    ],
    [
        'm1v',
        'video/mpeg'
    ],
    [
        'm21',
        'application/mp21'
    ],
    [
        'm2a',
        'audio/mpeg'
    ],
    [
        'm2v',
        'video/mpeg'
    ],
    [
        'm3u',
        [
            'audio/x-mpegurl',
            'audio/x-mpequrl'
        ]
    ],
    [
        'm3u8',
        'application/vnd.apple.mpegurl'
    ],
    [
        'm4v',
        'video/x-m4v'
    ],
    [
        'ma',
        'application/mathematica'
    ],
    [
        'mads',
        'application/mads+xml'
    ],
    [
        'mag',
        'application/vnd.ecowin.chart'
    ],
    [
        'man',
        'application/x-troff-man'
    ],
    [
        'map',
        'application/x-navimap'
    ],
    [
        'mar',
        'text/plain'
    ],
    [
        'mathml',
        'application/mathml+xml'
    ],
    [
        'mbd',
        'application/mbedlet'
    ],
    [
        'mbk',
        'application/vnd.mobius.mbk'
    ],
    [
        'mbox',
        'application/mbox'
    ],
    [
        'mc$',
        'application/x-magic-cap-package-1.0'
    ],
    [
        'mc1',
        'application/vnd.medcalcdata'
    ],
    [
        'mcd',
        [
            'application/mcad',
            'application/vnd.mcd',
            'application/x-mathcad'
        ]
    ],
    [
        'mcf',
        [
            'image/vasa',
            'text/mcf'
        ]
    ],
    [
        'mcp',
        'application/netmc'
    ],
    [
        'mcurl',
        'text/vnd.curl.mcurl'
    ],
    [
        'mdb',
        'application/x-msaccess'
    ],
    [
        'mdi',
        'image/vnd.ms-modi'
    ],
    [
        'me',
        'application/x-troff-me'
    ],
    [
        'meta4',
        'application/metalink4+xml'
    ],
    [
        'mets',
        'application/mets+xml'
    ],
    [
        'mfm',
        'application/vnd.mfmp'
    ],
    [
        'mgp',
        'application/vnd.osgeo.mapguide.package'
    ],
    [
        'mgz',
        'application/vnd.proteus.magazine'
    ],
    [
        'mht',
        'message/rfc822'
    ],
    [
        'mhtml',
        'message/rfc822'
    ],
    [
        'mid',
        [
            'audio/mid',
            'audio/midi',
            'music/crescendo',
            'x-music/x-midi',
            'audio/x-midi',
            'application/x-midi',
            'audio/x-mid'
        ]
    ],
    [
        'midi',
        [
            'audio/midi',
            'music/crescendo',
            'x-music/x-midi',
            'audio/x-midi',
            'application/x-midi',
            'audio/x-mid'
        ]
    ],
    [
        'mif',
        [
            'application/vnd.mif',
            'application/x-mif',
            'application/x-frame'
        ]
    ],
    [
        'mime',
        [
            'message/rfc822',
            'www/mime'
        ]
    ],
    [
        'mj2',
        'video/mj2'
    ],
    [
        'mjf',
        'audio/x-vnd.audioexplosion.mjuicemediafile'
    ],
    [
        'mjpg',
        'video/x-motion-jpeg'
    ],
    [
        'mlp',
        'application/vnd.dolby.mlp'
    ],
    [
        'mm',
        [
            'application/base64',
            'application/x-meme'
        ]
    ],
    [
        'mmd',
        'application/vnd.chipnuts.karaoke-mmd'
    ],
    [
        'mme',
        'application/base64'
    ],
    [
        'mmf',
        'application/vnd.smaf'
    ],
    [
        'mmr',
        'image/vnd.fujixerox.edmics-mmr'
    ],
    [
        'mny',
        'application/x-msmoney'
    ],
    [
        'mod',
        [
            'audio/mod',
            'audio/x-mod'
        ]
    ],
    [
        'mods',
        'application/mods+xml'
    ],
    [
        'moov',
        'video/quicktime'
    ],
    [
        'mov',
        'video/quicktime'
    ],
    [
        'movie',
        'video/x-sgi-movie'
    ],
    [
        'mp2',
        [
            'video/mpeg',
            'audio/mpeg',
            'video/x-mpeg',
            'audio/x-mpeg',
            'video/x-mpeq2a'
        ]
    ],
    [
        'mp3',
        [
            'audio/mpeg',
            'audio/mpeg3',
            'video/mpeg',
            'audio/x-mpeg-3',
            'video/x-mpeg'
        ]
    ],
    [
        'mp4',
        [
            'video/mp4',
            'application/mp4'
        ]
    ],
    [
        'mp4a',
        'audio/mp4'
    ],
    [
        'mpa',
        [
            'video/mpeg',
            'audio/mpeg'
        ]
    ],
    [
        'mpc',
        [
            'application/vnd.mophun.certificate',
            'application/x-project'
        ]
    ],
    [
        'mpe',
        'video/mpeg'
    ],
    [
        'mpeg',
        'video/mpeg'
    ],
    [
        'mpg',
        [
            'video/mpeg',
            'audio/mpeg'
        ]
    ],
    [
        'mpga',
        'audio/mpeg'
    ],
    [
        'mpkg',
        'application/vnd.apple.installer+xml'
    ],
    [
        'mpm',
        'application/vnd.blueice.multipass'
    ],
    [
        'mpn',
        'application/vnd.mophun.application'
    ],
    [
        'mpp',
        'application/vnd.ms-project'
    ],
    [
        'mpt',
        'application/x-project'
    ],
    [
        'mpv',
        'application/x-project'
    ],
    [
        'mpv2',
        'video/mpeg'
    ],
    [
        'mpx',
        'application/x-project'
    ],
    [
        'mpy',
        'application/vnd.ibm.minipay'
    ],
    [
        'mqy',
        'application/vnd.mobius.mqy'
    ],
    [
        'mrc',
        'application/marc'
    ],
    [
        'mrcx',
        'application/marcxml+xml'
    ],
    [
        'ms',
        'application/x-troff-ms'
    ],
    [
        'mscml',
        'application/mediaservercontrol+xml'
    ],
    [
        'mseq',
        'application/vnd.mseq'
    ],
    [
        'msf',
        'application/vnd.epson.msf'
    ],
    [
        'msg',
        'application/vnd.ms-outlook'
    ],
    [
        'msh',
        'model/mesh'
    ],
    [
        'msl',
        'application/vnd.mobius.msl'
    ],
    [
        'msty',
        'application/vnd.muvee.style'
    ],
    [
        'mts',
        'model/vnd.mts'
    ],
    [
        'mus',
        'application/vnd.musician'
    ],
    [
        'musicxml',
        'application/vnd.recordare.musicxml+xml'
    ],
    [
        'mv',
        'video/x-sgi-movie'
    ],
    [
        'mvb',
        'application/x-msmediaview'
    ],
    [
        'mwf',
        'application/vnd.mfer'
    ],
    [
        'mxf',
        'application/mxf'
    ],
    [
        'mxl',
        'application/vnd.recordare.musicxml'
    ],
    [
        'mxml',
        'application/xv+xml'
    ],
    [
        'mxs',
        'application/vnd.triscape.mxs'
    ],
    [
        'mxu',
        'video/vnd.mpegurl'
    ],
    [
        'my',
        'audio/make'
    ],
    [
        'mzz',
        'application/x-vnd.audioexplosion.mzz'
    ],
    [
        'n-gage',
        'application/vnd.nokia.n-gage.symbian.install'
    ],
    [
        'n3',
        'text/n3'
    ],
    [
        'nap',
        'image/naplps'
    ],
    [
        'naplps',
        'image/naplps'
    ],
    [
        'nbp',
        'application/vnd.wolfram.player'
    ],
    [
        'nc',
        'application/x-netcdf'
    ],
    [
        'ncm',
        'application/vnd.nokia.configuration-message'
    ],
    [
        'ncx',
        'application/x-dtbncx+xml'
    ],
    [
        'ngdat',
        'application/vnd.nokia.n-gage.data'
    ],
    [
        'nif',
        'image/x-niff'
    ],
    [
        'niff',
        'image/x-niff'
    ],
    [
        'nix',
        'application/x-mix-transfer'
    ],
    [
        'nlu',
        'application/vnd.neurolanguage.nlu'
    ],
    [
        'nml',
        'application/vnd.enliven'
    ],
    [
        'nnd',
        'application/vnd.noblenet-directory'
    ],
    [
        'nns',
        'application/vnd.noblenet-sealer'
    ],
    [
        'nnw',
        'application/vnd.noblenet-web'
    ],
    [
        'npx',
        'image/vnd.net-fpx'
    ],
    [
        'nsc',
        'application/x-conference'
    ],
    [
        'nsf',
        'application/vnd.lotus-notes'
    ],
    [
        'nvd',
        'application/x-navidoc'
    ],
    [
        'nws',
        'message/rfc822'
    ],
    [
        'o',
        'application/octet-stream'
    ],
    [
        'oa2',
        'application/vnd.fujitsu.oasys2'
    ],
    [
        'oa3',
        'application/vnd.fujitsu.oasys3'
    ],
    [
        'oas',
        'application/vnd.fujitsu.oasys'
    ],
    [
        'obd',
        'application/x-msbinder'
    ],
    [
        'oda',
        'application/oda'
    ],
    [
        'odb',
        'application/vnd.oasis.opendocument.database'
    ],
    [
        'odc',
        'application/vnd.oasis.opendocument.chart'
    ],
    [
        'odf',
        'application/vnd.oasis.opendocument.formula'
    ],
    [
        'odft',
        'application/vnd.oasis.opendocument.formula-template'
    ],
    [
        'odg',
        'application/vnd.oasis.opendocument.graphics'
    ],
    [
        'odi',
        'application/vnd.oasis.opendocument.image'
    ],
    [
        'odm',
        'application/vnd.oasis.opendocument.text-master'
    ],
    [
        'odp',
        'application/vnd.oasis.opendocument.presentation'
    ],
    [
        'ods',
        'application/vnd.oasis.opendocument.spreadsheet'
    ],
    [
        'odt',
        'application/vnd.oasis.opendocument.text'
    ],
    [
        'oga',
        'audio/ogg'
    ],
    [
        'ogv',
        'video/ogg'
    ],
    [
        'ogx',
        'application/ogg'
    ],
    [
        'omc',
        'application/x-omc'
    ],
    [
        'omcd',
        'application/x-omcdatamaker'
    ],
    [
        'omcr',
        'application/x-omcregerator'
    ],
    [
        'onetoc',
        'application/onenote'
    ],
    [
        'opf',
        'application/oebps-package+xml'
    ],
    [
        'org',
        'application/vnd.lotus-organizer'
    ],
    [
        'osf',
        'application/vnd.yamaha.openscoreformat'
    ],
    [
        'osfpvg',
        'application/vnd.yamaha.openscoreformat.osfpvg+xml'
    ],
    [
        'otc',
        'application/vnd.oasis.opendocument.chart-template'
    ],
    [
        'otf',
        'application/x-font-otf'
    ],
    [
        'otg',
        'application/vnd.oasis.opendocument.graphics-template'
    ],
    [
        'oth',
        'application/vnd.oasis.opendocument.text-web'
    ],
    [
        'oti',
        'application/vnd.oasis.opendocument.image-template'
    ],
    [
        'otp',
        'application/vnd.oasis.opendocument.presentation-template'
    ],
    [
        'ots',
        'application/vnd.oasis.opendocument.spreadsheet-template'
    ],
    [
        'ott',
        'application/vnd.oasis.opendocument.text-template'
    ],
    [
        'oxt',
        'application/vnd.openofficeorg.extension'
    ],
    [
        'p',
        'text/x-pascal'
    ],
    [
        'p10',
        [
            'application/pkcs10',
            'application/x-pkcs10'
        ]
    ],
    [
        'p12',
        [
            'application/pkcs-12',
            'application/x-pkcs12'
        ]
    ],
    [
        'p7a',
        'application/x-pkcs7-signature'
    ],
    [
        'p7b',
        'application/x-pkcs7-certificates'
    ],
    [
        'p7c',
        [
            'application/pkcs7-mime',
            'application/x-pkcs7-mime'
        ]
    ],
    [
        'p7m',
        [
            'application/pkcs7-mime',
            'application/x-pkcs7-mime'
        ]
    ],
    [
        'p7r',
        'application/x-pkcs7-certreqresp'
    ],
    [
        'p7s',
        [
            'application/pkcs7-signature',
            'application/x-pkcs7-signature'
        ]
    ],
    [
        'p8',
        'application/pkcs8'
    ],
    [
        'par',
        'text/plain-bas'
    ],
    [
        'part',
        'application/pro_eng'
    ],
    [
        'pas',
        'text/pascal'
    ],
    [
        'paw',
        'application/vnd.pawaafile'
    ],
    [
        'pbd',
        'application/vnd.powerbuilder6'
    ],
    [
        'pbm',
        'image/x-portable-bitmap'
    ],
    [
        'pcf',
        'application/x-font-pcf'
    ],
    [
        'pcl',
        [
            'application/vnd.hp-pcl',
            'application/x-pcl'
        ]
    ],
    [
        'pclxl',
        'application/vnd.hp-pclxl'
    ],
    [
        'pct',
        'image/x-pict'
    ],
    [
        'pcurl',
        'application/vnd.curl.pcurl'
    ],
    [
        'pcx',
        'image/x-pcx'
    ],
    [
        'pdb',
        [
            'application/vnd.palm',
            'chemical/x-pdb'
        ]
    ],
    [
        'pdf',
        'application/pdf'
    ],
    [
        'pfa',
        'application/x-font-type1'
    ],
    [
        'pfr',
        'application/font-tdpfr'
    ],
    [
        'pfunk',
        [
            'audio/make',
            'audio/make.my.funk'
        ]
    ],
    [
        'pfx',
        'application/x-pkcs12'
    ],
    [
        'pgm',
        [
            'image/x-portable-graymap',
            'image/x-portable-greymap'
        ]
    ],
    [
        'pgn',
        'application/x-chess-pgn'
    ],
    [
        'pgp',
        'application/pgp-signature'
    ],
    [
        'pic',
        [
            'image/pict',
            'image/x-pict'
        ]
    ],
    [
        'pict',
        'image/pict'
    ],
    [
        'pkg',
        'application/x-newton-compatible-pkg'
    ],
    [
        'pki',
        'application/pkixcmp'
    ],
    [
        'pkipath',
        'application/pkix-pkipath'
    ],
    [
        'pko',
        [
            'application/ynd.ms-pkipko',
            'application/vnd.ms-pki.pko'
        ]
    ],
    [
        'pl',
        [
            'text/plain',
            'text/x-script.perl'
        ]
    ],
    [
        'plb',
        'application/vnd.3gpp.pic-bw-large'
    ],
    [
        'plc',
        'application/vnd.mobius.plc'
    ],
    [
        'plf',
        'application/vnd.pocketlearn'
    ],
    [
        'pls',
        'application/pls+xml'
    ],
    [
        'plx',
        'application/x-pixclscript'
    ],
    [
        'pm',
        [
            'text/x-script.perl-module',
            'image/x-xpixmap'
        ]
    ],
    [
        'pm4',
        'application/x-pagemaker'
    ],
    [
        'pm5',
        'application/x-pagemaker'
    ],
    [
        'pma',
        'application/x-perfmon'
    ],
    [
        'pmc',
        'application/x-perfmon'
    ],
    [
        'pml',
        [
            'application/vnd.ctc-posml',
            'application/x-perfmon'
        ]
    ],
    [
        'pmr',
        'application/x-perfmon'
    ],
    [
        'pmw',
        'application/x-perfmon'
    ],
    [
        'png',
        'image/png'
    ],
    [
        'pnm',
        [
            'application/x-portable-anymap',
            'image/x-portable-anymap'
        ]
    ],
    [
        'portpkg',
        'application/vnd.macports.portpkg'
    ],
    [
        'pot',
        [
            'application/vnd.ms-powerpoint',
            'application/mspowerpoint'
        ]
    ],
    [
        'potm',
        'application/vnd.ms-powerpoint.template.macroenabled.12'
    ],
    [
        'potx',
        'application/vnd.openxmlformats-officedocument.presentationml.template'
    ],
    [
        'pov',
        'model/x-pov'
    ],
    [
        'ppa',
        'application/vnd.ms-powerpoint'
    ],
    [
        'ppam',
        'application/vnd.ms-powerpoint.addin.macroenabled.12'
    ],
    [
        'ppd',
        'application/vnd.cups-ppd'
    ],
    [
        'ppm',
        'image/x-portable-pixmap'
    ],
    [
        'pps',
        [
            'application/vnd.ms-powerpoint',
            'application/mspowerpoint'
        ]
    ],
    [
        'ppsm',
        'application/vnd.ms-powerpoint.slideshow.macroenabled.12'
    ],
    [
        'ppsx',
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
    ],
    [
        'ppt',
        [
            'application/vnd.ms-powerpoint',
            'application/mspowerpoint',
            'application/powerpoint',
            'application/x-mspowerpoint'
        ]
    ],
    [
        'pptm',
        'application/vnd.ms-powerpoint.presentation.macroenabled.12'
    ],
    [
        'pptx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ],
    [
        'ppz',
        'application/mspowerpoint'
    ],
    [
        'prc',
        'application/x-mobipocket-ebook'
    ],
    [
        'pre',
        [
            'application/vnd.lotus-freelance',
            'application/x-freelance'
        ]
    ],
    [
        'prf',
        'application/pics-rules'
    ],
    [
        'prt',
        'application/pro_eng'
    ],
    [
        'ps',
        'application/postscript'
    ],
    [
        'psb',
        'application/vnd.3gpp.pic-bw-small'
    ],
    [
        'psd',
        [
            'application/octet-stream',
            'image/vnd.adobe.photoshop'
        ]
    ],
    [
        'psf',
        'application/x-font-linux-psf'
    ],
    [
        'pskcxml',
        'application/pskc+xml'
    ],
    [
        'ptid',
        'application/vnd.pvi.ptid1'
    ],
    [
        'pub',
        'application/x-mspublisher'
    ],
    [
        'pvb',
        'application/vnd.3gpp.pic-bw-var'
    ],
    [
        'pvu',
        'paleovu/x-pv'
    ],
    [
        'pwn',
        'application/vnd.3m.post-it-notes'
    ],
    [
        'pwz',
        'application/vnd.ms-powerpoint'
    ],
    [
        'py',
        'text/x-script.phyton'
    ],
    [
        'pya',
        'audio/vnd.ms-playready.media.pya'
    ],
    [
        'pyc',
        'application/x-bytecode.python'
    ],
    [
        'pyv',
        'video/vnd.ms-playready.media.pyv'
    ],
    [
        'qam',
        'application/vnd.epson.quickanime'
    ],
    [
        'qbo',
        'application/vnd.intu.qbo'
    ],
    [
        'qcp',
        'audio/vnd.qcelp'
    ],
    [
        'qd3',
        'x-world/x-3dmf'
    ],
    [
        'qd3d',
        'x-world/x-3dmf'
    ],
    [
        'qfx',
        'application/vnd.intu.qfx'
    ],
    [
        'qif',
        'image/x-quicktime'
    ],
    [
        'qps',
        'application/vnd.publishare-delta-tree'
    ],
    [
        'qt',
        'video/quicktime'
    ],
    [
        'qtc',
        'video/x-qtc'
    ],
    [
        'qti',
        'image/x-quicktime'
    ],
    [
        'qtif',
        'image/x-quicktime'
    ],
    [
        'qxd',
        'application/vnd.quark.quarkxpress'
    ],
    [
        'ra',
        [
            'audio/x-realaudio',
            'audio/x-pn-realaudio',
            'audio/x-pn-realaudio-plugin'
        ]
    ],
    [
        'ram',
        'audio/x-pn-realaudio'
    ],
    [
        'rar',
        'application/x-rar-compressed'
    ],
    [
        'ras',
        [
            'image/cmu-raster',
            'application/x-cmu-raster',
            'image/x-cmu-raster'
        ]
    ],
    [
        'rast',
        'image/cmu-raster'
    ],
    [
        'rcprofile',
        'application/vnd.ipunplugged.rcprofile'
    ],
    [
        'rdf',
        'application/rdf+xml'
    ],
    [
        'rdz',
        'application/vnd.data-vision.rdz'
    ],
    [
        'rep',
        'application/vnd.businessobjects'
    ],
    [
        'res',
        'application/x-dtbresource+xml'
    ],
    [
        'rexx',
        'text/x-script.rexx'
    ],
    [
        'rf',
        'image/vnd.rn-realflash'
    ],
    [
        'rgb',
        'image/x-rgb'
    ],
    [
        'rif',
        'application/reginfo+xml'
    ],
    [
        'rip',
        'audio/vnd.rip'
    ],
    [
        'rl',
        'application/resource-lists+xml'
    ],
    [
        'rlc',
        'image/vnd.fujixerox.edmics-rlc'
    ],
    [
        'rld',
        'application/resource-lists-diff+xml'
    ],
    [
        'rm',
        [
            'application/vnd.rn-realmedia',
            'audio/x-pn-realaudio'
        ]
    ],
    [
        'rmi',
        'audio/mid'
    ],
    [
        'rmm',
        'audio/x-pn-realaudio'
    ],
    [
        'rmp',
        [
            'audio/x-pn-realaudio-plugin',
            'audio/x-pn-realaudio'
        ]
    ],
    [
        'rms',
        'application/vnd.jcp.javame.midlet-rms'
    ],
    [
        'rnc',
        'application/relax-ng-compact-syntax'
    ],
    [
        'rng',
        [
            'application/ringing-tones',
            'application/vnd.nokia.ringing-tone'
        ]
    ],
    [
        'rnx',
        'application/vnd.rn-realplayer'
    ],
    [
        'roff',
        'application/x-troff'
    ],
    [
        'rp',
        'image/vnd.rn-realpix'
    ],
    [
        'rp9',
        'application/vnd.cloanto.rp9'
    ],
    [
        'rpm',
        'audio/x-pn-realaudio-plugin'
    ],
    [
        'rpss',
        'application/vnd.nokia.radio-presets'
    ],
    [
        'rpst',
        'application/vnd.nokia.radio-preset'
    ],
    [
        'rq',
        'application/sparql-query'
    ],
    [
        'rs',
        'application/rls-services+xml'
    ],
    [
        'rsd',
        'application/rsd+xml'
    ],
    [
        'rt',
        [
            'text/richtext',
            'text/vnd.rn-realtext'
        ]
    ],
    [
        'rtf',
        [
            'application/rtf',
            'text/richtext',
            'application/x-rtf'
        ]
    ],
    [
        'rtx',
        [
            'text/richtext',
            'application/rtf'
        ]
    ],
    [
        'rv',
        'video/vnd.rn-realvideo'
    ],
    [
        's',
        'text/x-asm'
    ],
    [
        's3m',
        'audio/s3m'
    ],
    [
        'saf',
        'application/vnd.yamaha.smaf-audio'
    ],
    [
        'saveme',
        'application/octet-stream'
    ],
    [
        'sbk',
        'application/x-tbook'
    ],
    [
        'sbml',
        'application/sbml+xml'
    ],
    [
        'sc',
        'application/vnd.ibm.secure-container'
    ],
    [
        'scd',
        'application/x-msschedule'
    ],
    [
        'scm',
        [
            'application/vnd.lotus-screencam',
            'video/x-scm',
            'text/x-script.guile',
            'application/x-lotusscreencam',
            'text/x-script.scheme'
        ]
    ],
    [
        'scq',
        'application/scvp-cv-request'
    ],
    [
        'scs',
        'application/scvp-cv-response'
    ],
    [
        'sct',
        'text/scriptlet'
    ],
    [
        'scurl',
        'text/vnd.curl.scurl'
    ],
    [
        'sda',
        'application/vnd.stardivision.draw'
    ],
    [
        'sdc',
        'application/vnd.stardivision.calc'
    ],
    [
        'sdd',
        'application/vnd.stardivision.impress'
    ],
    [
        'sdkm',
        'application/vnd.solent.sdkm+xml'
    ],
    [
        'sdml',
        'text/plain'
    ],
    [
        'sdp',
        [
            'application/sdp',
            'application/x-sdp'
        ]
    ],
    [
        'sdr',
        'application/sounder'
    ],
    [
        'sdw',
        'application/vnd.stardivision.writer'
    ],
    [
        'sea',
        [
            'application/sea',
            'application/x-sea'
        ]
    ],
    [
        'see',
        'application/vnd.seemail'
    ],
    [
        'seed',
        'application/vnd.fdsn.seed'
    ],
    [
        'sema',
        'application/vnd.sema'
    ],
    [
        'semd',
        'application/vnd.semd'
    ],
    [
        'semf',
        'application/vnd.semf'
    ],
    [
        'ser',
        'application/java-serialized-object'
    ],
    [
        'set',
        'application/set'
    ],
    [
        'setpay',
        'application/set-payment-initiation'
    ],
    [
        'setreg',
        'application/set-registration-initiation'
    ],
    [
        'sfd-hdstx',
        'application/vnd.hydrostatix.sof-data'
    ],
    [
        'sfs',
        'application/vnd.spotfire.sfs'
    ],
    [
        'sgl',
        'application/vnd.stardivision.writer-global'
    ],
    [
        'sgm',
        [
            'text/sgml',
            'text/x-sgml'
        ]
    ],
    [
        'sgml',
        [
            'text/sgml',
            'text/x-sgml'
        ]
    ],
    [
        'sh',
        [
            'application/x-shar',
            'application/x-bsh',
            'application/x-sh',
            'text/x-script.sh'
        ]
    ],
    [
        'shar',
        [
            'application/x-bsh',
            'application/x-shar'
        ]
    ],
    [
        'shf',
        'application/shf+xml'
    ],
    [
        'shtml',
        [
            'text/html',
            'text/x-server-parsed-html'
        ]
    ],
    [
        'sid',
        'audio/x-psid'
    ],
    [
        'sis',
        'application/vnd.symbian.install'
    ],
    [
        'sit',
        [
            'application/x-stuffit',
            'application/x-sit'
        ]
    ],
    [
        'sitx',
        'application/x-stuffitx'
    ],
    [
        'skd',
        'application/x-koan'
    ],
    [
        'skm',
        'application/x-koan'
    ],
    [
        'skp',
        [
            'application/vnd.koan',
            'application/x-koan'
        ]
    ],
    [
        'skt',
        'application/x-koan'
    ],
    [
        'sl',
        'application/x-seelogo'
    ],
    [
        'sldm',
        'application/vnd.ms-powerpoint.slide.macroenabled.12'
    ],
    [
        'sldx',
        'application/vnd.openxmlformats-officedocument.presentationml.slide'
    ],
    [
        'slt',
        'application/vnd.epson.salt'
    ],
    [
        'sm',
        'application/vnd.stepmania.stepchart'
    ],
    [
        'smf',
        'application/vnd.stardivision.math'
    ],
    [
        'smi',
        [
            'application/smil',
            'application/smil+xml'
        ]
    ],
    [
        'smil',
        'application/smil'
    ],
    [
        'snd',
        [
            'audio/basic',
            'audio/x-adpcm'
        ]
    ],
    [
        'snf',
        'application/x-font-snf'
    ],
    [
        'sol',
        'application/solids'
    ],
    [
        'spc',
        [
            'text/x-speech',
            'application/x-pkcs7-certificates'
        ]
    ],
    [
        'spf',
        'application/vnd.yamaha.smaf-phrase'
    ],
    [
        'spl',
        [
            'application/futuresplash',
            'application/x-futuresplash'
        ]
    ],
    [
        'spot',
        'text/vnd.in3d.spot'
    ],
    [
        'spp',
        'application/scvp-vp-response'
    ],
    [
        'spq',
        'application/scvp-vp-request'
    ],
    [
        'spr',
        'application/x-sprite'
    ],
    [
        'sprite',
        'application/x-sprite'
    ],
    [
        'src',
        'application/x-wais-source'
    ],
    [
        'sru',
        'application/sru+xml'
    ],
    [
        'srx',
        'application/sparql-results+xml'
    ],
    [
        'sse',
        'application/vnd.kodak-descriptor'
    ],
    [
        'ssf',
        'application/vnd.epson.ssf'
    ],
    [
        'ssi',
        'text/x-server-parsed-html'
    ],
    [
        'ssm',
        'application/streamingmedia'
    ],
    [
        'ssml',
        'application/ssml+xml'
    ],
    [
        'sst',
        [
            'application/vnd.ms-pkicertstore',
            'application/vnd.ms-pki.certstore'
        ]
    ],
    [
        'st',
        'application/vnd.sailingtracker.track'
    ],
    [
        'stc',
        'application/vnd.sun.xml.calc.template'
    ],
    [
        'std',
        'application/vnd.sun.xml.draw.template'
    ],
    [
        'step',
        'application/step'
    ],
    [
        'stf',
        'application/vnd.wt.stf'
    ],
    [
        'sti',
        'application/vnd.sun.xml.impress.template'
    ],
    [
        'stk',
        'application/hyperstudio'
    ],
    [
        'stl',
        [
            'application/vnd.ms-pkistl',
            'application/sla',
            'application/vnd.ms-pki.stl',
            'application/x-navistyle'
        ]
    ],
    [
        'stm',
        'text/html'
    ],
    [
        'stp',
        'application/step'
    ],
    [
        'str',
        'application/vnd.pg.format'
    ],
    [
        'stw',
        'application/vnd.sun.xml.writer.template'
    ],
    [
        'sub',
        'image/vnd.dvb.subtitle'
    ],
    [
        'sus',
        'application/vnd.sus-calendar'
    ],
    [
        'sv4cpio',
        'application/x-sv4cpio'
    ],
    [
        'sv4crc',
        'application/x-sv4crc'
    ],
    [
        'svc',
        'application/vnd.dvb.service'
    ],
    [
        'svd',
        'application/vnd.svd'
    ],
    [
        'svf',
        [
            'image/vnd.dwg',
            'image/x-dwg'
        ]
    ],
    [
        'svg',
        'image/svg+xml'
    ],
    [
        'svr',
        [
            'x-world/x-svr',
            'application/x-world'
        ]
    ],
    [
        'swf',
        'application/x-shockwave-flash'
    ],
    [
        'swi',
        'application/vnd.aristanetworks.swi'
    ],
    [
        'sxc',
        'application/vnd.sun.xml.calc'
    ],
    [
        'sxd',
        'application/vnd.sun.xml.draw'
    ],
    [
        'sxg',
        'application/vnd.sun.xml.writer.global'
    ],
    [
        'sxi',
        'application/vnd.sun.xml.impress'
    ],
    [
        'sxm',
        'application/vnd.sun.xml.math'
    ],
    [
        'sxw',
        'application/vnd.sun.xml.writer'
    ],
    [
        't',
        [
            'text/troff',
            'application/x-troff'
        ]
    ],
    [
        'talk',
        'text/x-speech'
    ],
    [
        'tao',
        'application/vnd.tao.intent-module-archive'
    ],
    [
        'tar',
        'application/x-tar'
    ],
    [
        'tbk',
        [
            'application/toolbook',
            'application/x-tbook'
        ]
    ],
    [
        'tcap',
        'application/vnd.3gpp2.tcap'
    ],
    [
        'tcl',
        [
            'text/x-script.tcl',
            'application/x-tcl'
        ]
    ],
    [
        'tcsh',
        'text/x-script.tcsh'
    ],
    [
        'teacher',
        'application/vnd.smart.teacher'
    ],
    [
        'tei',
        'application/tei+xml'
    ],
    [
        'tex',
        'application/x-tex'
    ],
    [
        'texi',
        'application/x-texinfo'
    ],
    [
        'texinfo',
        'application/x-texinfo'
    ],
    [
        'text',
        [
            'application/plain',
            'text/plain'
        ]
    ],
    [
        'tfi',
        'application/thraud+xml'
    ],
    [
        'tfm',
        'application/x-tex-tfm'
    ],
    [
        'tgz',
        [
            'application/gnutar',
            'application/x-compressed'
        ]
    ],
    [
        'thmx',
        'application/vnd.ms-officetheme'
    ],
    [
        'tif',
        [
            'image/tiff',
            'image/x-tiff'
        ]
    ],
    [
        'tiff',
        [
            'image/tiff',
            'image/x-tiff'
        ]
    ],
    [
        'tmo',
        'application/vnd.tmobile-livetv'
    ],
    [
        'torrent',
        'application/x-bittorrent'
    ],
    [
        'tpl',
        'application/vnd.groove-tool-template'
    ],
    [
        'tpt',
        'application/vnd.trid.tpt'
    ],
    [
        'tr',
        'application/x-troff'
    ],
    [
        'tra',
        'application/vnd.trueapp'
    ],
    [
        'trm',
        'application/x-msterminal'
    ],
    [
        'tsd',
        'application/timestamped-data'
    ],
    [
        'tsi',
        'audio/tsp-audio'
    ],
    [
        'tsp',
        [
            'application/dsptype',
            'audio/tsplayer'
        ]
    ],
    [
        'tsv',
        'text/tab-separated-values'
    ],
    [
        'ttf',
        'application/x-font-ttf'
    ],
    [
        'ttl',
        'text/turtle'
    ],
    [
        'turbot',
        'image/florian'
    ],
    [
        'twd',
        'application/vnd.simtech-mindmapper'
    ],
    [
        'txd',
        'application/vnd.genomatix.tuxedo'
    ],
    [
        'txf',
        'application/vnd.mobius.txf'
    ],
    [
        'txt',
        'text/plain'
    ],
    [
        'ufd',
        'application/vnd.ufdl'
    ],
    [
        'uil',
        'text/x-uil'
    ],
    [
        'uls',
        'text/iuls'
    ],
    [
        'umj',
        'application/vnd.umajin'
    ],
    [
        'uni',
        'text/uri-list'
    ],
    [
        'unis',
        'text/uri-list'
    ],
    [
        'unityweb',
        'application/vnd.unity'
    ],
    [
        'unv',
        'application/i-deas'
    ],
    [
        'uoml',
        'application/vnd.uoml+xml'
    ],
    [
        'uri',
        'text/uri-list'
    ],
    [
        'uris',
        'text/uri-list'
    ],
    [
        'ustar',
        [
            'application/x-ustar',
            'multipart/x-ustar'
        ]
    ],
    [
        'utz',
        'application/vnd.uiq.theme'
    ],
    [
        'uu',
        [
            'application/octet-stream',
            'text/x-uuencode'
        ]
    ],
    [
        'uue',
        'text/x-uuencode'
    ],
    [
        'uva',
        'audio/vnd.dece.audio'
    ],
    [
        'uvh',
        'video/vnd.dece.hd'
    ],
    [
        'uvi',
        'image/vnd.dece.graphic'
    ],
    [
        'uvm',
        'video/vnd.dece.mobile'
    ],
    [
        'uvp',
        'video/vnd.dece.pd'
    ],
    [
        'uvs',
        'video/vnd.dece.sd'
    ],
    [
        'uvu',
        'video/vnd.uvvu.mp4'
    ],
    [
        'uvv',
        'video/vnd.dece.video'
    ],
    [
        'vcd',
        'application/x-cdlink'
    ],
    [
        'vcf',
        'text/x-vcard'
    ],
    [
        'vcg',
        'application/vnd.groove-vcard'
    ],
    [
        'vcs',
        'text/x-vcalendar'
    ],
    [
        'vcx',
        'application/vnd.vcx'
    ],
    [
        'vda',
        'application/vda'
    ],
    [
        'vdo',
        'video/vdo'
    ],
    [
        'vew',
        'application/groupwise'
    ],
    [
        'vis',
        'application/vnd.visionary'
    ],
    [
        'viv',
        [
            'video/vivo',
            'video/vnd.vivo'
        ]
    ],
    [
        'vivo',
        [
            'video/vivo',
            'video/vnd.vivo'
        ]
    ],
    [
        'vmd',
        'application/vocaltec-media-desc'
    ],
    [
        'vmf',
        'application/vocaltec-media-file'
    ],
    [
        'voc',
        [
            'audio/voc',
            'audio/x-voc'
        ]
    ],
    [
        'vos',
        'video/vosaic'
    ],
    [
        'vox',
        'audio/voxware'
    ],
    [
        'vqe',
        'audio/x-twinvq-plugin'
    ],
    [
        'vqf',
        'audio/x-twinvq'
    ],
    [
        'vql',
        'audio/x-twinvq-plugin'
    ],
    [
        'vrml',
        [
            'model/vrml',
            'x-world/x-vrml',
            'application/x-vrml'
        ]
    ],
    [
        'vrt',
        'x-world/x-vrt'
    ],
    [
        'vsd',
        [
            'application/vnd.visio',
            'application/x-visio'
        ]
    ],
    [
        'vsf',
        'application/vnd.vsf'
    ],
    [
        'vst',
        'application/x-visio'
    ],
    [
        'vsw',
        'application/x-visio'
    ],
    [
        'vtu',
        'model/vnd.vtu'
    ],
    [
        'vxml',
        'application/voicexml+xml'
    ],
    [
        'w60',
        'application/wordperfect6.0'
    ],
    [
        'w61',
        'application/wordperfect6.1'
    ],
    [
        'w6w',
        'application/msword'
    ],
    [
        'wad',
        'application/x-doom'
    ],
    [
        'wav',
        [
            'audio/wav',
            'audio/x-wav'
        ]
    ],
    [
        'wax',
        'audio/x-ms-wax'
    ],
    [
        'wb1',
        'application/x-qpro'
    ],
    [
        'wbmp',
        'image/vnd.wap.wbmp'
    ],
    [
        'wbs',
        'application/vnd.criticaltools.wbs+xml'
    ],
    [
        'wbxml',
        'application/vnd.wap.wbxml'
    ],
    [
        'wcm',
        'application/vnd.ms-works'
    ],
    [
        'wdb',
        'application/vnd.ms-works'
    ],
    [
        'web',
        'application/vnd.xara'
    ],
    [
        'weba',
        'audio/webm'
    ],
    [
        'webm',
        'video/webm'
    ],
    [
        'webp',
        'image/webp'
    ],
    [
        'wg',
        'application/vnd.pmi.widget'
    ],
    [
        'wgt',
        'application/widget'
    ],
    [
        'wiz',
        'application/msword'
    ],
    [
        'wk1',
        'application/x-123'
    ],
    [
        'wks',
        'application/vnd.ms-works'
    ],
    [
        'wm',
        'video/x-ms-wm'
    ],
    [
        'wma',
        'audio/x-ms-wma'
    ],
    [
        'wmd',
        'application/x-ms-wmd'
    ],
    [
        'wmf',
        [
            'windows/metafile',
            'application/x-msmetafile'
        ]
    ],
    [
        'wml',
        'text/vnd.wap.wml'
    ],
    [
        'wmlc',
        'application/vnd.wap.wmlc'
    ],
    [
        'wmls',
        'text/vnd.wap.wmlscript'
    ],
    [
        'wmlsc',
        'application/vnd.wap.wmlscriptc'
    ],
    [
        'wmv',
        'video/x-ms-wmv'
    ],
    [
        'wmx',
        'video/x-ms-wmx'
    ],
    [
        'wmz',
        'application/x-ms-wmz'
    ],
    [
        'woff',
        'application/x-font-woff'
    ],
    [
        'word',
        'application/msword'
    ],
    [
        'wp',
        'application/wordperfect'
    ],
    [
        'wp5',
        [
            'application/wordperfect',
            'application/wordperfect6.0'
        ]
    ],
    [
        'wp6',
        'application/wordperfect'
    ],
    [
        'wpd',
        [
            'application/wordperfect',
            'application/vnd.wordperfect',
            'application/x-wpwin'
        ]
    ],
    [
        'wpl',
        'application/vnd.ms-wpl'
    ],
    [
        'wps',
        'application/vnd.ms-works'
    ],
    [
        'wq1',
        'application/x-lotus'
    ],
    [
        'wqd',
        'application/vnd.wqd'
    ],
    [
        'wri',
        [
            'application/mswrite',
            'application/x-wri',
            'application/x-mswrite'
        ]
    ],
    [
        'wrl',
        [
            'model/vrml',
            'x-world/x-vrml',
            'application/x-world'
        ]
    ],
    [
        'wrz',
        [
            'model/vrml',
            'x-world/x-vrml'
        ]
    ],
    [
        'wsc',
        'text/scriplet'
    ],
    [
        'wsdl',
        'application/wsdl+xml'
    ],
    [
        'wspolicy',
        'application/wspolicy+xml'
    ],
    [
        'wsrc',
        'application/x-wais-source'
    ],
    [
        'wtb',
        'application/vnd.webturbo'
    ],
    [
        'wtk',
        'application/x-wintalk'
    ],
    [
        'wvx',
        'video/x-ms-wvx'
    ],
    [
        'x-png',
        'image/png'
    ],
    [
        'x3d',
        'application/vnd.hzn-3d-crossword'
    ],
    [
        'xaf',
        'x-world/x-vrml'
    ],
    [
        'xap',
        'application/x-silverlight-app'
    ],
    [
        'xar',
        'application/vnd.xara'
    ],
    [
        'xbap',
        'application/x-ms-xbap'
    ],
    [
        'xbd',
        'application/vnd.fujixerox.docuworks.binder'
    ],
    [
        'xbm',
        [
            'image/xbm',
            'image/x-xbm',
            'image/x-xbitmap'
        ]
    ],
    [
        'xdf',
        'application/xcap-diff+xml'
    ],
    [
        'xdm',
        'application/vnd.syncml.dm+xml'
    ],
    [
        'xdp',
        'application/vnd.adobe.xdp+xml'
    ],
    [
        'xdr',
        'video/x-amt-demorun'
    ],
    [
        'xdssc',
        'application/dssc+xml'
    ],
    [
        'xdw',
        'application/vnd.fujixerox.docuworks'
    ],
    [
        'xenc',
        'application/xenc+xml'
    ],
    [
        'xer',
        'application/patch-ops-error+xml'
    ],
    [
        'xfdf',
        'application/vnd.adobe.xfdf'
    ],
    [
        'xfdl',
        'application/vnd.xfdl'
    ],
    [
        'xgz',
        'xgl/drawing'
    ],
    [
        'xhtml',
        'application/xhtml+xml'
    ],
    [
        'xif',
        'image/vnd.xiff'
    ],
    [
        'xl',
        'application/excel'
    ],
    [
        'xla',
        [
            'application/vnd.ms-excel',
            'application/excel',
            'application/x-msexcel',
            'application/x-excel'
        ]
    ],
    [
        'xlam',
        'application/vnd.ms-excel.addin.macroenabled.12'
    ],
    [
        'xlb',
        [
            'application/excel',
            'application/vnd.ms-excel',
            'application/x-excel'
        ]
    ],
    [
        'xlc',
        [
            'application/vnd.ms-excel',
            'application/excel',
            'application/x-excel'
        ]
    ],
    [
        'xld',
        [
            'application/excel',
            'application/x-excel'
        ]
    ],
    [
        'xlk',
        [
            'application/excel',
            'application/x-excel'
        ]
    ],
    [
        'xll',
        [
            'application/excel',
            'application/vnd.ms-excel',
            'application/x-excel'
        ]
    ],
    [
        'xlm',
        [
            'application/vnd.ms-excel',
            'application/excel',
            'application/x-excel'
        ]
    ],
    [
        'xls',
        [
            'application/vnd.ms-excel',
            'application/excel',
            'application/x-msexcel',
            'application/x-excel'
        ]
    ],
    [
        'xlsb',
        'application/vnd.ms-excel.sheet.binary.macroenabled.12'
    ],
    [
        'xlsm',
        'application/vnd.ms-excel.sheet.macroenabled.12'
    ],
    [
        'xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ],
    [
        'xlt',
        [
            'application/vnd.ms-excel',
            'application/excel',
            'application/x-excel'
        ]
    ],
    [
        'xltm',
        'application/vnd.ms-excel.template.macroenabled.12'
    ],
    [
        'xltx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
    ],
    [
        'xlv',
        [
            'application/excel',
            'application/x-excel'
        ]
    ],
    [
        'xlw',
        [
            'application/vnd.ms-excel',
            'application/excel',
            'application/x-msexcel',
            'application/x-excel'
        ]
    ],
    [
        'xm',
        'audio/xm'
    ],
    [
        'xml',
        [
            'application/xml',
            'text/xml',
            'application/atom+xml',
            'application/rss+xml'
        ]
    ],
    [
        'xmz',
        'xgl/movie'
    ],
    [
        'xo',
        'application/vnd.olpc-sugar'
    ],
    [
        'xof',
        'x-world/x-vrml'
    ],
    [
        'xop',
        'application/xop+xml'
    ],
    [
        'xpi',
        'application/x-xpinstall'
    ],
    [
        'xpix',
        'application/x-vnd.ls-xpix'
    ],
    [
        'xpm',
        [
            'image/xpm',
            'image/x-xpixmap'
        ]
    ],
    [
        'xpr',
        'application/vnd.is-xpr'
    ],
    [
        'xps',
        'application/vnd.ms-xpsdocument'
    ],
    [
        'xpw',
        'application/vnd.intercon.formnet'
    ],
    [
        'xslt',
        'application/xslt+xml'
    ],
    [
        'xsm',
        'application/vnd.syncml+xml'
    ],
    [
        'xspf',
        'application/xspf+xml'
    ],
    [
        'xsr',
        'video/x-amt-showrun'
    ],
    [
        'xul',
        'application/vnd.mozilla.xul+xml'
    ],
    [
        'xwd',
        [
            'image/x-xwd',
            'image/x-xwindowdump'
        ]
    ],
    [
        'xyz',
        [
            'chemical/x-xyz',
            'chemical/x-pdb'
        ]
    ],
    [
        'yang',
        'application/yang'
    ],
    [
        'yin',
        'application/yin+xml'
    ],
    [
        'z',
        [
            'application/x-compressed',
            'application/x-compress'
        ]
    ],
    [
        'zaz',
        'application/vnd.zzazz.deck+xml'
    ],
    [
        'zip',
        [
            'application/zip',
            'multipart/x-zip',
            'application/x-zip-compressed',
            'application/x-compressed'
        ]
    ],
    [
        'zir',
        'application/vnd.zul'
    ],
    [
        'zmm',
        'application/vnd.handheld-entertainment+xml'
    ],
    [
        'zoo',
        'application/octet-stream'
    ],
    [
        'zsh',
        'text/x-script.zsh'
    ]
]);
module.exports = {
    detectMimeType (filename) {
        if (!filename) {
            return defaultMimeType;
        }
        let parsed = path.parse(filename);
        let extension = (parsed.ext.substr(1) || parsed.name || '').split('?').shift().trim().toLowerCase();
        let value = defaultMimeType;
        if (extensions.has(extension)) {
            value = extensions.get(extension);
        }
        if (Array.isArray(value)) {
            return value[0];
        }
        return value;
    },
    detectExtension (mimeType) {
        if (!mimeType) {
            return defaultExtension;
        }
        let parts = (mimeType || '').toLowerCase().trim().split('/');
        let rootType = parts.shift().trim();
        let subType = parts.join('/').trim();
        if (mimeTypes.has(rootType + '/' + subType)) {
            let value = mimeTypes.get(rootType + '/' + subType);
            if (Array.isArray(value)) {
                return value[0];
            }
            return value;
        }
        switch(rootType){
            case 'text':
                return 'txt';
            default:
                return 'bin';
        }
    }
};
}),
"[project]/node_modules/nodemailer/lib/punycode/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*

Copied from https://github.com/mathiasbynens/punycode.js/blob/ef3505c8abb5143a00d53ce59077c9f7f4b2ac47/punycode.js

Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/ /* eslint callback-return: 0, no-bitwise: 0, eqeqeq: 0, prefer-arrow-callback: 0, object-shorthand: 0 */ /** Highest positive signed 32-bit float value */ const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
/** Bootstring parameters */ const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'
/** Regular expressions */ const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
/** Error messages */ const errors = {
    overflow: 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
};
/** Convenience shortcuts */ const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;
/*--------------------------------------------------------------------------*/ /**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */ function error(type) {
    throw new RangeError(errors[type]);
}
/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */ function map(array, callback) {
    const result = [];
    let length = array.length;
    while(length--){
        result[length] = callback(array[length]);
    }
    return result;
}
/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {String} A new string of characters returned by the callback
 * function.
 */ function mapDomain(domain, callback) {
    const parts = domain.split('@');
    let result = '';
    if (parts.length > 1) {
        // In email addresses, only the domain name should be punycoded. Leave
        // the local part (i.e. everything up to `@`) intact.
        result = parts[0] + '@';
        domain = parts[1];
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    domain = domain.replace(regexSeparators, '\x2E');
    const labels = domain.split('.');
    const encoded = map(labels, callback).join('.');
    return result + encoded;
}
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */ function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while(counter < length){
        const value = string.charCodeAt(counter++);
        if (value >= 0xd800 && value <= 0xdbff && counter < length) {
            // It's a high surrogate, and there is a next character.
            const extra = string.charCodeAt(counter++);
            if ((extra & 0xfc00) == 0xdc00) {
                // Low surrogate.
                output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
            } else {
                // It's an unmatched surrogate; only append this code unit, in case the
                // next code unit is the high surrogate of a surrogate pair.
                output.push(value);
                counter--;
            }
        } else {
            output.push(value);
        }
    }
    return output;
}
/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */ const ucs2encode = (codePoints)=>String.fromCodePoint(...codePoints);
/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */ const basicToDigit = function(codePoint) {
    if (codePoint >= 0x30 && codePoint < 0x3a) {
        return 26 + (codePoint - 0x30);
    }
    if (codePoint >= 0x41 && codePoint < 0x5b) {
        return codePoint - 0x41;
    }
    if (codePoint >= 0x61 && codePoint < 0x7b) {
        return codePoint - 0x61;
    }
    return base;
};
/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */ const digitToBasic = function(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};
/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */ const adapt = function(delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for(; delta > baseMinusTMin * tMax >> 1; k += base){
        delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */ const decode = function(input) {
    // Don't use UCS-2.
    const output = [];
    const inputLength = input.length;
    let i = 0;
    let n = initialN;
    let bias = initialBias;
    // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.
    let basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
        basic = 0;
    }
    for(let j = 0; j < basic; ++j){
        // if it's not a basic code point
        if (input.charCodeAt(j) >= 0x80) {
            error('not-basic');
        }
        output.push(input.charCodeAt(j));
    }
    // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.
    for(let index = basic > 0 ? basic + 1 : 0; index < inputLength /* no final expression */ ;){
        // `index` is the index of the next character to be consumed.
        // Decode a generalized variable-length integer into `delta`,
        // which gets added to `i`. The overflow checking is easier
        // if we increase `i` as we go, then subtract off its starting
        // value at the end to obtain `delta`.
        const oldi = i;
        for(let w = 1, k = base /* no condition */ ;; k += base){
            if (index >= inputLength) {
                error('invalid-input');
            }
            const digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base) {
                error('invalid-input');
            }
            if (digit > floor((maxInt - i) / w)) {
                error('overflow');
            }
            i += digit * w;
            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
                break;
            }
            const baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
                error('overflow');
            }
            w *= baseMinusT;
        }
        const out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        // `i` was supposed to wrap around from `out` to `0`,
        // incrementing `n` each time, so we'll fix that now:
        if (floor(i / out) > maxInt - n) {
            error('overflow');
        }
        n += floor(i / out);
        i %= out;
        // Insert `n` at position `i` of the output.
        output.splice(i++, 0, n);
    }
    return String.fromCodePoint(...output);
};
/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */ const encode = function(input) {
    const output = [];
    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);
    // Cache the length.
    const inputLength = input.length;
    // Initialize the state.
    let n = initialN;
    let delta = 0;
    let bias = initialBias;
    // Handle the basic code points.
    for (const currentValue of input){
        if (currentValue < 0x80) {
            output.push(stringFromCharCode(currentValue));
        }
    }
    const basicLength = output.length;
    let handledCPCount = basicLength;
    // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.
    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
        output.push(delimiter);
    }
    // Main encoding loop:
    while(handledCPCount < inputLength){
        // All non-basic code points < n have been handled already. Find the next
        // larger one:
        let m = maxInt;
        for (const currentValue of input){
            if (currentValue >= n && currentValue < m) {
                m = currentValue;
            }
        }
        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
        // but guard against overflow.
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error('overflow');
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (const currentValue of input){
            if (currentValue < n && ++delta > maxInt) {
                error('overflow');
            }
            if (currentValue === n) {
                // Represent delta as a generalized variable-length integer.
                let q = delta;
                for(let k = base /* no condition */ ;; k += base){
                    const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t) {
                        break;
                    }
                    const qMinusT = q - t;
                    const baseMinusT = base - t;
                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                    q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
                delta = 0;
                ++handledCPCount;
            }
        }
        ++delta;
        ++n;
    }
    return output.join('');
};
/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */ const toUnicode = function(input) {
    return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
};
/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */ const toASCII = function(input) {
    return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
};
/*--------------------------------------------------------------------------*/ /** Define the public API */ const punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */ version: '2.3.1',
    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */ ucs2: {
        decode: ucs2decode,
        encode: ucs2encode
    },
    decode: decode,
    encode: encode,
    toASCII: toASCII,
    toUnicode: toUnicode
};
module.exports = punycode;
}),
"[project]/node_modules/nodemailer/lib/base64/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Transform = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Transform;
/**
 * Encodes a Buffer into a base64 encoded string
 *
 * @param {Buffer} buffer Buffer to convert
 * @returns {String} base64 encoded string
 */ function encode(buffer) {
    if (typeof buffer === 'string') {
        buffer = Buffer.from(buffer, 'utf-8');
    }
    return buffer.toString('base64');
}
/**
 * Adds soft line breaks to a base64 string
 *
 * @param {String} str base64 encoded string that might need line wrapping
 * @param {Number} [lineLength=76] Maximum allowed length for a line
 * @returns {String} Soft-wrapped base64 encoded string
 */ function wrap(str, lineLength) {
    str = (str || '').toString();
    lineLength = lineLength || 76;
    if (str.length <= lineLength) {
        return str;
    }
    let result = [];
    let pos = 0;
    let chunkLength = lineLength * 1024;
    while(pos < str.length){
        let wrappedLines = str.substr(pos, chunkLength).replace(new RegExp('.{' + lineLength + '}', 'g'), '$&\r\n');
        result.push(wrappedLines);
        pos += chunkLength;
    }
    return result.join('');
}
/**
 * Creates a transform stream for encoding data to base64 encoding
 *
 * @constructor
 * @param {Object} options Stream options
 * @param {Number} [options.lineLength=76] Maximum length for lines, set to false to disable wrapping
 */ class Encoder extends Transform {
    constructor(options){
        super();
        this.options = options || {};
        if (this.options.lineLength !== false) {
            this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = '';
        this._remainingBytes = false;
        this.inputBytes = 0;
        this.outputBytes = 0;
    }
    _transform(chunk, encoding, done) {
        if (encoding !== 'buffer') {
            chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
            return setImmediate(done);
        }
        this.inputBytes += chunk.length;
        if (this._remainingBytes && this._remainingBytes.length) {
            chunk = Buffer.concat([
                this._remainingBytes,
                chunk
            ], this._remainingBytes.length + chunk.length);
            this._remainingBytes = false;
        }
        if (chunk.length % 3) {
            this._remainingBytes = chunk.slice(chunk.length - chunk.length % 3);
            chunk = chunk.slice(0, chunk.length - chunk.length % 3);
        } else {
            this._remainingBytes = false;
        }
        let b64 = this._curLine + encode(chunk);
        if (this.options.lineLength) {
            b64 = wrap(b64, this.options.lineLength);
            let lastLF = b64.lastIndexOf('\n');
            if (lastLF < 0) {
                this._curLine = b64;
                b64 = '';
            } else {
                this._curLine = b64.substring(lastLF + 1);
                b64 = b64.substring(0, lastLF + 1);
                if (b64 && !b64.endsWith('\r\n')) {
                    b64 += '\r\n';
                }
            }
        } else {
            this._curLine = '';
        }
        if (b64) {
            this.outputBytes += b64.length;
            this.push(Buffer.from(b64, 'ascii'));
        }
        setImmediate(done);
    }
    _flush(done) {
        if (this._remainingBytes && this._remainingBytes.length) {
            this._curLine += encode(this._remainingBytes);
        }
        if (this._curLine) {
            this.outputBytes += this._curLine.length;
            this.push(Buffer.from(this._curLine, 'ascii'));
            this._curLine = '';
        }
        done();
    }
}
module.exports = {
    encode,
    wrap,
    Encoder
};
}),
"[project]/node_modules/nodemailer/lib/qp/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Transform = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Transform;
/**
 * Encodes a Buffer into a Quoted-Printable encoded string
 *
 * @param {Buffer} buffer Buffer to convert
 * @returns {String} Quoted-Printable encoded string
 */ function encode(buffer) {
    if (typeof buffer === 'string') {
        buffer = Buffer.from(buffer, 'utf-8');
    }
    // usable characters that do not need encoding
    let ranges = [
        // https://tools.ietf.org/html/rfc2045#section-6.7
        [
            0x09
        ],
        [
            0x0a
        ],
        [
            0x0d
        ],
        [
            0x20,
            0x3c
        ],
        [
            0x3e,
            0x7e
        ] // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
    ];
    let result = '';
    let ord;
    for(let i = 0, len = buffer.length; i < len; i++){
        ord = buffer[i];
        // if the char is in allowed range, then keep as is, unless it is a WS in the end of a line
        if (checkRanges(ord, ranges) && !((ord === 0x20 || ord === 0x09) && (i === len - 1 || buffer[i + 1] === 0x0a || buffer[i + 1] === 0x0d))) {
            result += String.fromCharCode(ord);
            continue;
        }
        result += '=' + (ord < 0x10 ? '0' : '') + ord.toString(16).toUpperCase();
    }
    return result;
}
/**
 * Adds soft line breaks to a Quoted-Printable string
 *
 * @param {String} str Quoted-Printable encoded string that might need line wrapping
 * @param {Number} [lineLength=76] Maximum allowed length for a line
 * @returns {String} Soft-wrapped Quoted-Printable encoded string
 */ function wrap(str, lineLength) {
    str = (str || '').toString();
    lineLength = lineLength || 76;
    if (str.length <= lineLength) {
        return str;
    }
    let pos = 0;
    let len = str.length;
    let match, code, line;
    let lineMargin = Math.floor(lineLength / 3);
    let result = '';
    // insert soft linebreaks where needed
    while(pos < len){
        line = str.substr(pos, lineLength);
        if (match = line.match(/\r\n/)) {
            line = line.substr(0, match.index + match[0].length);
            result += line;
            pos += line.length;
            continue;
        }
        if (line.substr(-1) === '\n') {
            // nothing to change here
            result += line;
            pos += line.length;
            continue;
        } else if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
            // truncate to nearest line break
            line = line.substr(0, line.length - (match[0].length - 1));
            result += line;
            pos += line.length;
            continue;
        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
            // truncate to nearest space
            line = line.substr(0, line.length - (match[0].length - 1));
        } else if (line.match(/[=][\da-f]{0,2}$/i)) {
            // push incomplete encoding sequences to the next line
            if (match = line.match(/[=][\da-f]{0,1}$/i)) {
                line = line.substr(0, line.length - match[0].length);
            }
            // ensure that utf-8 sequences are not split
            while(line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))){
                code = parseInt(match[0].substr(1, 2), 16);
                if (code < 128) {
                    break;
                }
                line = line.substr(0, line.length - 3);
                if (code >= 0xc0) {
                    break;
                }
            }
        }
        if (pos + line.length < len && line.substr(-1) !== '\n') {
            if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
                line = line.substr(0, line.length - 3);
            } else if (line.length === lineLength) {
                line = line.substr(0, line.length - 1);
            }
            pos += line.length;
            line += '=\r\n';
        } else {
            pos += line.length;
        }
        result += line;
    }
    return result;
}
/**
 * Helper function to check if a number is inside provided ranges
 *
 * @param {Number} nr Number to check for
 * @param {Array} ranges An Array of allowed values
 * @returns {Boolean} True if the value was found inside allowed ranges, false otherwise
 */ function checkRanges(nr, ranges) {
    for(let i = ranges.length - 1; i >= 0; i--){
        if (!ranges[i].length) {
            continue;
        }
        if (ranges[i].length === 1 && nr === ranges[i][0]) {
            return true;
        }
        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
            return true;
        }
    }
    return false;
}
/**
 * Creates a transform stream for encoding data to Quoted-Printable encoding
 *
 * @constructor
 * @param {Object} options Stream options
 * @param {Number} [options.lineLength=76] Maximum length for lines, set to false to disable wrapping
 */ class Encoder extends Transform {
    constructor(options){
        super();
        // init Transform
        this.options = options || {};
        if (this.options.lineLength !== false) {
            this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = '';
        this.inputBytes = 0;
        this.outputBytes = 0;
    }
    _transform(chunk, encoding, done) {
        let qp;
        if (encoding !== 'buffer') {
            chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
            return done();
        }
        this.inputBytes += chunk.length;
        if (this.options.lineLength) {
            qp = this._curLine + encode(chunk);
            qp = wrap(qp, this.options.lineLength);
            qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine)=>{
                this._curLine = lastLine;
                return lineBreak;
            });
            if (qp) {
                this.outputBytes += qp.length;
                this.push(qp);
            }
        } else {
            qp = encode(chunk);
            this.outputBytes += qp.length;
            this.push(qp, 'ascii');
        }
        done();
    }
    _flush(done) {
        if (this._curLine) {
            this.outputBytes += this._curLine.length;
            this.push(this._curLine, 'ascii');
        }
        done();
    }
}
// expose to the world
module.exports = {
    encode,
    wrap,
    Encoder
};
}),
"[project]/node_modules/nodemailer/lib/mime-funcs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint no-control-regex:0 */ const base64 = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/base64/index.js [app-rsc] (ecmascript)");
const qp = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/qp/index.js [app-rsc] (ecmascript)");
const mimeTypes = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-funcs/mime-types.js [app-rsc] (ecmascript)");
module.exports = {
    /**
     * Checks if a value is plaintext string (uses only printable 7bit chars)
     *
     * @param {String} value String to be tested
     * @returns {Boolean} true if it is a plaintext string
     */ isPlainText (value, isParam) {
        const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
        if (typeof value !== 'string' || re.test(value)) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * Checks if a multi line string containes lines longer than the selected value.
     *
     * Useful when detecting if a mail message needs any processing at all –
     * if only plaintext characters are used and lines are short, then there is
     * no need to encode the values in any way. If the value is plaintext but has
     * longer lines then allowed, then use format=flowed
     *
     * @param {Number} lineLength Max line length to check for
     * @returns {Boolean} Returns true if there is at least one line longer than lineLength chars
     */ hasLongerLines (str, lineLength) {
        if (str.length > 128 * 1024) {
            // do not test strings longer than 128kB
            return true;
        }
        return new RegExp('^.{' + (lineLength + 1) + ',}', 'm').test(str);
    },
    /**
     * Encodes a string or an Buffer to an UTF-8 MIME Word (rfc2047)
     *
     * @param {String|Buffer} data String to be encoded
     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
     * @return {String} Single or several mime words joined together
     */ encodeWord (data, mimeWordEncoding, maxLength) {
        mimeWordEncoding = (mimeWordEncoding || 'Q').toString().toUpperCase().trim().charAt(0);
        maxLength = maxLength || 0;
        let encodedStr;
        let toCharset = 'UTF-8';
        if (maxLength && maxLength > 7 + toCharset.length) {
            maxLength -= 7 + toCharset.length;
        }
        if (mimeWordEncoding === 'Q') {
            // https://tools.ietf.org/html/rfc2047#section-5 rule (3)
            encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, (chr)=>{
                let ord = chr.charCodeAt(0).toString(16).toUpperCase();
                if (chr === ' ') {
                    return '_';
                } else {
                    return '=' + (ord.length === 1 ? '0' + ord : ord);
                }
            });
        } else if (mimeWordEncoding === 'B') {
            encodedStr = typeof data === 'string' ? data : base64.encode(data);
            maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
        }
        if (maxLength && (mimeWordEncoding !== 'B' ? encodedStr : base64.encode(data)).length > maxLength) {
            if (mimeWordEncoding === 'Q') {
                encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
            } else {
                // RFC2047 6.3 (2) states that encoded-word must include an integral number of characters, so no chopping unicode sequences
                let parts = [];
                let lpart = '';
                for(let i = 0, len = encodedStr.length; i < len; i++){
                    let chr = encodedStr.charAt(i);
                    if (/[\ud83c\ud83d\ud83e]/.test(chr) && i < len - 1) {
                        // composite emoji byte, so add the next byte as well
                        chr += encodedStr.charAt(++i);
                    }
                    // check if we can add this character to the existing string
                    // without breaking byte length limit
                    if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
                        lpart += chr;
                    } else {
                        // we hit the length limit, so push the existing string and start over
                        parts.push(base64.encode(lpart));
                        lpart = chr;
                    }
                }
                if (lpart) {
                    parts.push(base64.encode(lpart));
                }
                if (parts.length > 1) {
                    encodedStr = parts.join('?= =?' + toCharset + '?' + mimeWordEncoding + '?');
                } else {
                    encodedStr = parts.join('');
                }
            }
        } else if (mimeWordEncoding === 'B') {
            encodedStr = base64.encode(data);
        }
        return '=?' + toCharset + '?' + mimeWordEncoding + '?' + encodedStr + (encodedStr.substr(-2) === '?=' ? '' : '?=');
    },
    /**
     * Finds word sequences with non ascii text and converts these to mime words
     *
     * @param {String} value String to be encoded
     * @param {String} mimeWordEncoding='Q' Encoding for the mime word, either Q or B
     * @param {Number} [maxLength=0] If set, split mime words into several chunks if needed
     * @param {Boolean} [encodeAll=false] If true and the value needs encoding then encodes entire string, not just the smallest match
     * @return {String} String with possible mime words
     */ encodeWords (value, mimeWordEncoding, maxLength, encodeAll) {
        maxLength = maxLength || 0;
        let encodedValue;
        // find first word with a non-printable ascii or special symbol in it
        let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
        if (!firstMatch) {
            return value;
        }
        if (encodeAll) {
            // if it is requested to encode everything or the string contains something that resebles encoded word, then encode everything
            return this.encodeWord(value, mimeWordEncoding, maxLength);
        }
        // find the last word with a non-printable ascii in it
        let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
        if (!lastMatch) {
            // should not happen
            return value;
        }
        let startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
            index: 0
        }).index;
        let endIndex = lastMatch.index + (lastMatch[1] || '').length;
        encodedValue = (startIndex ? value.substr(0, startIndex) : '') + this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || 'Q', maxLength) + (endIndex < value.length ? value.substr(endIndex) : '');
        return encodedValue;
    },
    /**
     * Joins parsed header value together as 'value; param1=value1; param2=value2'
     * PS: We are following RFC 822 for the list of special characters that we need to keep in quotes.
     *      Refer: https://www.w3.org/Protocols/rfc1341/4_Content-Type.html
     * @param {Object} structured Parsed header value
     * @return {String} joined header value
     */ buildHeaderValue (structured) {
        let paramsArray = [];
        Object.keys(structured.params || {}).forEach((param)=>{
            // filename might include unicode characters so it is a special case
            // other values probably do not
            let value = structured.params[param];
            if (!this.isPlainText(value, true) || value.length >= 75) {
                this.buildHeaderParam(param, value, 50).forEach((encodedParam)=>{
                    if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === '*') {
                        paramsArray.push(encodedParam.key + '=' + encodedParam.value);
                    } else {
                        paramsArray.push(encodedParam.key + '=' + JSON.stringify(encodedParam.value));
                    }
                });
            } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
                paramsArray.push(param + '=' + JSON.stringify(value));
            } else {
                paramsArray.push(param + '=' + value);
            }
        });
        return structured.value + (paramsArray.length ? '; ' + paramsArray.join('; ') : '');
    },
    /**
     * Encodes a string or an Buffer to an UTF-8 Parameter Value Continuation encoding (rfc2231)
     * Useful for splitting long parameter values.
     *
     * For example
     *      title="unicode string"
     * becomes
     *     title*0*=utf-8''unicode
     *     title*1*=%20string
     *
     * @param {String|Buffer} data String to be encoded
     * @param {Number} [maxLength=50] Max length for generated chunks
     * @param {String} [fromCharset='UTF-8'] Source sharacter set
     * @return {Array} A list of encoded keys and headers
     */ buildHeaderParam (key, data, maxLength) {
        let list = [];
        let encodedStr = typeof data === 'string' ? data : (data || '').toString();
        let encodedStrArr;
        let chr, ord;
        let line;
        let startPos = 0;
        let i, len;
        maxLength = maxLength || 50;
        // process ascii only text
        if (this.isPlainText(data, true)) {
            // check if conversion is even needed
            if (encodedStr.length <= maxLength) {
                return [
                    {
                        key,
                        value: encodedStr
                    }
                ];
            }
            encodedStr = encodedStr.replace(new RegExp('.{' + maxLength + '}', 'g'), (str)=>{
                list.push({
                    line: str
                });
                return '';
            });
            if (encodedStr) {
                list.push({
                    line: encodedStr
                });
            }
        } else {
            if (/[\uD800-\uDBFF]/.test(encodedStr)) {
                // string containts surrogate pairs, so normalize it to an array of bytes
                encodedStrArr = [];
                for(i = 0, len = encodedStr.length; i < len; i++){
                    chr = encodedStr.charAt(i);
                    ord = chr.charCodeAt(0);
                    if (ord >= 0xd800 && ord <= 0xdbff && i < len - 1) {
                        chr += encodedStr.charAt(i + 1);
                        encodedStrArr.push(chr);
                        i++;
                    } else {
                        encodedStrArr.push(chr);
                    }
                }
                encodedStr = encodedStrArr;
            }
            // first line includes the charset and language info and needs to be encoded
            // even if it does not contain any unicode characters
            line = "utf-8''";
            let encoded = true;
            startPos = 0;
            // process text with unicode or special chars
            for(i = 0, len = encodedStr.length; i < len; i++){
                chr = encodedStr[i];
                if (encoded) {
                    chr = this.safeEncodeURIComponent(chr);
                } else {
                    // try to urlencode current char
                    chr = chr === ' ' ? chr : this.safeEncodeURIComponent(chr);
                    // By default it is not required to encode a line, the need
                    // only appears when the string contains unicode or special chars
                    // in this case we start processing the line over and encode all chars
                    if (chr !== encodedStr[i]) {
                        // Check if it is even possible to add the encoded char to the line
                        // If not, there is no reason to use this line, just push it to the list
                        // and start a new line with the char that needs encoding
                        if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
                            list.push({
                                line,
                                encoded
                            });
                            line = '';
                            startPos = i - 1;
                        } else {
                            encoded = true;
                            i = startPos;
                            line = '';
                            continue;
                        }
                    }
                }
                // if the line is already too long, push it to the list and start a new one
                if ((line + chr).length >= maxLength) {
                    list.push({
                        line,
                        encoded
                    });
                    line = chr = encodedStr[i] === ' ' ? ' ' : this.safeEncodeURIComponent(encodedStr[i]);
                    if (chr === encodedStr[i]) {
                        encoded = false;
                        startPos = i - 1;
                    } else {
                        encoded = true;
                    }
                } else {
                    line += chr;
                }
            }
            if (line) {
                list.push({
                    line,
                    encoded
                });
            }
        }
        return list.map((item, i)=>({
                // encoded lines: {name}*{part}*
                // unencoded lines: {name}*{part}
                // if any line needs to be encoded then the first line (part==0) is always encoded
                key: key + '*' + i + (item.encoded ? '*' : ''),
                value: item.line
            }));
    },
    /**
     * Parses a header value with key=value arguments into a structured
     * object.
     *
     *   parseHeaderValue('content-type: text/plain; CHARSET='UTF-8'') ->
     *   {
     *     'value': 'text/plain',
     *     'params': {
     *       'charset': 'UTF-8'
     *     }
     *   }
     *
     * @param {String} str Header value
     * @return {Object} Header value as a parsed structure
     */ parseHeaderValue (str) {
        let response = {
            value: false,
            params: {}
        };
        let key = false;
        let value = '';
        let type = 'value';
        let quote = false;
        let escaped = false;
        let chr;
        for(let i = 0, len = str.length; i < len; i++){
            chr = str.charAt(i);
            if (type === 'key') {
                if (chr === '=') {
                    key = value.trim().toLowerCase();
                    type = 'value';
                    value = '';
                    continue;
                }
                value += chr;
            } else {
                if (escaped) {
                    value += chr;
                } else if (chr === '\\') {
                    escaped = true;
                    continue;
                } else if (quote && chr === quote) {
                    quote = false;
                } else if (!quote && chr === '"') {
                    quote = chr;
                } else if (!quote && chr === ';') {
                    if (key === false) {
                        response.value = value.trim();
                    } else {
                        response.params[key] = value.trim();
                    }
                    type = 'key';
                    value = '';
                } else {
                    value += chr;
                }
                escaped = false;
            }
        }
        if (type === 'value') {
            if (key === false) {
                response.value = value.trim();
            } else {
                response.params[key] = value.trim();
            }
        } else if (value.trim()) {
            response.params[value.trim().toLowerCase()] = '';
        }
        // handle parameter value continuations
        // https://tools.ietf.org/html/rfc2231#section-3
        // preprocess values
        Object.keys(response.params).forEach((key)=>{
            let actualKey, nr, match, value;
            if (match = key.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
                actualKey = key.substr(0, match.index);
                nr = Number(match[2] || match[3]) || 0;
                if (!response.params[actualKey] || typeof response.params[actualKey] !== 'object') {
                    response.params[actualKey] = {
                        charset: false,
                        values: []
                    };
                }
                value = response.params[key];
                if (nr === 0 && match[0].substr(-1) === '*' && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
                    response.params[actualKey].charset = match[1] || 'iso-8859-1';
                    value = match[2];
                }
                response.params[actualKey].values[nr] = value;
                // remove the old reference
                delete response.params[key];
            }
        });
        // concatenate split rfc2231 strings and convert encoded strings to mime encoded words
        Object.keys(response.params).forEach((key)=>{
            let value;
            if (response.params[key] && Array.isArray(response.params[key].values)) {
                value = response.params[key].values.map((val)=>val || '').join('');
                if (response.params[key].charset) {
                    // convert "%AB" to "=?charset?Q?=AB?="
                    response.params[key] = '=?' + response.params[key].charset + '?Q?' + value// fix invalidly encoded chars
                    .replace(/[=?_\s]/g, (s)=>{
                        let c = s.charCodeAt(0).toString(16);
                        if (s === ' ') {
                            return '_';
                        } else {
                            return '%' + (c.length < 2 ? '0' : '') + c;
                        }
                    })// change from urlencoding to percent encoding
                    .replace(/%/g, '=') + '?=';
                } else {
                    response.params[key] = value;
                }
            }
        });
        return response;
    },
    /**
     * Returns file extension for a content type string. If no suitable extensions
     * are found, 'bin' is used as the default extension
     *
     * @param {String} mimeType Content type to be checked for
     * @return {String} File extension
     */ detectExtension: (mimeType)=>mimeTypes.detectExtension(mimeType),
    /**
     * Returns content type for a file extension. If no suitable content types
     * are found, 'application/octet-stream' is used as the default content type
     *
     * @param {String} extension Extension to be checked for
     * @return {String} File extension
     */ detectMimeType: (extension)=>mimeTypes.detectMimeType(extension),
    /**
     * Folds long lines, useful for folding header lines (afterSpace=false) and
     * flowed text (afterSpace=true)
     *
     * @param {String} str String to be folded
     * @param {Number} [lineLength=76] Maximum length of a line
     * @param {Boolean} afterSpace If true, leave a space in th end of a line
     * @return {String} String with folded lines
     */ foldLines (str, lineLength, afterSpace) {
        str = (str || '').toString();
        lineLength = lineLength || 76;
        let pos = 0, len = str.length, result = '', line, match;
        while(pos < len){
            line = str.substr(pos, lineLength);
            if (line.length < lineLength) {
                result += line;
                break;
            }
            if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
                line = match[0];
                result += line;
                pos += line.length;
                continue;
            } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || '').length : 0) < line.length) {
                line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || '').length : 0)));
            } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
                line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || '').length : 0));
            }
            result += line;
            pos += line.length;
            if (pos < len) {
                result += '\r\n';
            }
        }
        return result;
    },
    /**
     * Splits a mime encoded string. Needed for dividing mime words into smaller chunks
     *
     * @param {String} str Mime encoded string to be split up
     * @param {Number} maxlen Maximum length of characters for one part (minimum 12)
     * @return {Array} Split string
     */ splitMimeEncodedString: (str, maxlen)=>{
        let curLine, match, chr, done, lines = [];
        // require at least 12 symbols to fit possible 4 octet UTF-8 sequences
        maxlen = Math.max(maxlen || 0, 12);
        while(str.length){
            curLine = str.substr(0, maxlen);
            // move incomplete escaped char back to main
            if (match = curLine.match(/[=][0-9A-F]?$/i)) {
                curLine = curLine.substr(0, match.index);
            }
            done = false;
            while(!done){
                done = true;
                // check if not middle of a unicode char sequence
                if (match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i)) {
                    chr = parseInt(match[1], 16);
                    // invalid sequence, move one char back anc recheck
                    if (chr < 0xc2 && chr > 0x7f) {
                        curLine = curLine.substr(0, curLine.length - 3);
                        done = false;
                    }
                }
            }
            if (curLine.length) {
                lines.push(curLine);
            }
            str = str.substr(curLine.length);
        }
        return lines;
    },
    encodeURICharComponent: (chr)=>{
        let res = '';
        let ord = chr.charCodeAt(0).toString(16).toUpperCase();
        if (ord.length % 2) {
            ord = '0' + ord;
        }
        if (ord.length > 2) {
            for(let i = 0, len = ord.length / 2; i < len; i++){
                res += '%' + ord.substr(i, 2);
            }
        } else {
            res += '%' + ord;
        }
        return res;
    },
    safeEncodeURIComponent (str) {
        str = (str || '').toString();
        try {
            // might throw if we try to encode invalid sequences, eg. partial emoji
            str = encodeURIComponent(str);
        } catch (_E) {
            // should never run
            return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, '');
        }
        // ensure chars that are not handled by encodeURICompent are converted as well
        return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (chr)=>this.encodeURICharComponent(chr));
    }
};
}),
"[project]/node_modules/nodemailer/lib/addressparser/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Converts tokens for a single address into an address object
 *
 * @param {Array} tokens Tokens object
 * @param {Number} depth Current recursion depth for nested group protection
 * @return {Object} Address object
 */ function _handleAddress(tokens, depth) {
    let isGroup = false;
    let state = 'text';
    let address;
    let addresses = [];
    let data = {
        address: [],
        comment: [],
        group: [],
        text: [],
        textWasQuoted: [] // Track which text tokens came from inside quotes
    };
    let i;
    let len;
    let insideQuotes = false; // Track if we're currently inside a quoted string
    // Filter out <addresses>, (comments) and regular text
    for(i = 0, len = tokens.length; i < len; i++){
        let token = tokens[i];
        let prevToken = i ? tokens[i - 1] : null;
        if (token.type === 'operator') {
            switch(token.value){
                case '<':
                    state = 'address';
                    insideQuotes = false;
                    break;
                case '(':
                    state = 'comment';
                    insideQuotes = false;
                    break;
                case ':':
                    state = 'group';
                    isGroup = true;
                    insideQuotes = false;
                    break;
                case '"':
                    // Track quote state for text tokens
                    insideQuotes = !insideQuotes;
                    state = 'text';
                    break;
                default:
                    state = 'text';
                    insideQuotes = false;
                    break;
            }
        } else if (token.value) {
            if (state === 'address') {
                // handle use case where unquoted name includes a "<"
                // Apple Mail truncates everything between an unexpected < and an address
                // and so will we
                token.value = token.value.replace(/^[^<]*<\s*/, '');
            }
            if (prevToken && prevToken.noBreak && data[state].length) {
                // join values
                data[state][data[state].length - 1] += token.value;
                if (state === 'text' && insideQuotes) {
                    data.textWasQuoted[data.textWasQuoted.length - 1] = true;
                }
            } else {
                data[state].push(token.value);
                if (state === 'text') {
                    data.textWasQuoted.push(insideQuotes);
                }
            }
        }
    }
    // If there is no text but a comment, replace the two
    if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
    }
    if (isGroup) {
        // http://tools.ietf.org/html/rfc2822#appendix-A.1.3
        data.text = data.text.join(' ');
        // Parse group members, but flatten any nested groups (RFC 5322 doesn't allow nesting)
        let groupMembers = [];
        if (data.group.length) {
            let parsedGroup = addressparser(data.group.join(','), {
                _depth: depth + 1
            });
            // Flatten: if any member is itself a group, extract its members into the sequence
            parsedGroup.forEach((member)=>{
                if (member.group) {
                    // Nested group detected - flatten it by adding its members directly
                    groupMembers = groupMembers.concat(member.group);
                } else {
                    groupMembers.push(member);
                }
            });
        }
        addresses.push({
            name: data.text || address && address.name,
            group: groupMembers
        });
    } else {
        // If no address was found, try to detect one from regular text
        if (!data.address.length && data.text.length) {
            for(i = data.text.length - 1; i >= 0; i--){
                // Security fix: Do not extract email addresses from quoted strings
                // RFC 5321 allows @ inside quoted local-parts like "user@domain"@example.com
                // Extracting emails from quoted text leads to misrouting vulnerabilities
                if (!data.textWasQuoted[i] && data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
                    data.address = data.text.splice(i, 1);
                    data.textWasQuoted.splice(i, 1);
                    break;
                }
            }
            let _regexHandler = function(address) {
                if (!data.address.length) {
                    data.address = [
                        address.trim()
                    ];
                    return ' ';
                } else {
                    return address;
                }
            };
            // still no address
            if (!data.address.length) {
                for(i = data.text.length - 1; i >= 0; i--){
                    // Security fix: Do not extract email addresses from quoted strings
                    if (!data.textWasQuoted[i]) {
                        // fixed the regex to parse email address correctly when email address has more than one @
                        data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
                        if (data.address.length) {
                            break;
                        }
                    }
                }
            }
        }
        // If there's still is no text but a comment exixts, replace the two
        if (!data.text.length && data.comment.length) {
            data.text = data.comment;
            data.comment = [];
        }
        // Keep only the first address occurence, push others to regular text
        if (data.address.length > 1) {
            data.text = data.text.concat(data.address.splice(1));
        }
        // Join values with spaces
        data.text = data.text.join(' ');
        data.address = data.address.join(' ');
        if (!data.address && isGroup) {
            return [];
        } else {
            address = {
                address: data.address || data.text || '',
                name: data.text || data.address || ''
            };
            if (address.address === address.name) {
                if ((address.address || '').match(/@/)) {
                    address.name = '';
                } else {
                    address.address = '';
                }
            }
            addresses.push(address);
        }
    }
    return addresses;
}
/**
 * Creates a Tokenizer object for tokenizing address field strings
 *
 * @constructor
 * @param {String} str Address field string
 */ class Tokenizer {
    constructor(str){
        this.str = (str || '').toString();
        this.operatorCurrent = '';
        this.operatorExpecting = '';
        this.node = null;
        this.escaped = false;
        this.list = [];
        /**
         * Operator tokens and which tokens are expected to end the sequence
         */ this.operators = {
            '"': '"',
            '(': ')',
            '<': '>',
            ',': '',
            ':': ';',
            // Semicolons are not a legal delimiter per the RFC2822 grammar other
            // than for terminating a group, but they are also not valid for any
            // other use in this context.  Given that some mail clients have
            // historically allowed the semicolon as a delimiter equivalent to the
            // comma in their UI, it makes sense to treat them the same as a comma
            // when used outside of a group.
            ';': ''
        };
    }
    /**
     * Tokenizes the original input string
     *
     * @return {Array} An array of operator|text tokens
     */ tokenize() {
        let list = [];
        for(let i = 0, len = this.str.length; i < len; i++){
            let chr = this.str.charAt(i);
            let nextChr = i < len - 1 ? this.str.charAt(i + 1) : null;
            this.checkChar(chr, nextChr);
        }
        this.list.forEach((node)=>{
            node.value = (node.value || '').toString().trim();
            if (node.value) {
                list.push(node);
            }
        });
        return list;
    }
    /**
     * Checks if a character is an operator or text and acts accordingly
     *
     * @param {String} chr Character from the address field
     */ checkChar(chr, nextChr) {
        if (this.escaped) {
        // ignore next condition blocks
        } else if (chr === this.operatorExpecting) {
            this.node = {
                type: 'operator',
                value: chr
            };
            if (nextChr && ![
                ' ',
                '\t',
                '\r',
                '\n',
                ',',
                ';'
            ].includes(nextChr)) {
                this.node.noBreak = true;
            }
            this.list.push(this.node);
            this.node = null;
            this.operatorExpecting = '';
            this.escaped = false;
            return;
        } else if (!this.operatorExpecting && chr in this.operators) {
            this.node = {
                type: 'operator',
                value: chr
            };
            this.list.push(this.node);
            this.node = null;
            this.operatorExpecting = this.operators[chr];
            this.escaped = false;
            return;
        } else if ([
            '"',
            "'"
        ].includes(this.operatorExpecting) && chr === '\\') {
            this.escaped = true;
            return;
        }
        if (!this.node) {
            this.node = {
                type: 'text',
                value: ''
            };
            this.list.push(this.node);
        }
        if (chr === '\n') {
            // Convert newlines to spaces. Carriage return is ignored as \r and \n usually
            // go together anyway and there already is a WS for \n. Lone \r means something is fishy.
            chr = ' ';
        }
        if (chr.charCodeAt(0) >= 0x21 || [
            ' ',
            '\t'
        ].includes(chr)) {
            // skip command bytes
            this.node.value += chr;
        }
        this.escaped = false;
    }
}
/**
 * Maximum recursion depth for parsing nested groups.
 * RFC 5322 doesn't allow nested groups, so this is a safeguard against
 * malicious input that could cause stack overflow.
 */ const MAX_NESTED_GROUP_DEPTH = 50;
/**
 * Parses structured e-mail addresses from an address field
 *
 * Example:
 *
 *    'Name <address@domain>'
 *
 * will be converted to
 *
 *     [{name: 'Name', address: 'address@domain'}]
 *
 * @param {String} str Address field
 * @param {Object} options Optional options object
 * @param {Number} options._depth Internal recursion depth counter (do not set manually)
 * @return {Array} An array of address objects
 */ function addressparser(str, options) {
    options = options || {};
    let depth = options._depth || 0;
    // Prevent stack overflow from deeply nested groups (DoS protection)
    if (depth > MAX_NESTED_GROUP_DEPTH) {
        return [];
    }
    let tokenizer = new Tokenizer(str);
    let tokens = tokenizer.tokenize();
    let addresses = [];
    let address = [];
    let parsedAddresses = [];
    tokens.forEach((token)=>{
        if (token.type === 'operator' && (token.value === ',' || token.value === ';')) {
            if (address.length) {
                addresses.push(address);
            }
            address = [];
        } else {
            address.push(token);
        }
    });
    if (address.length) {
        addresses.push(address);
    }
    addresses.forEach((address)=>{
        address = _handleAddress(address, depth);
        if (address.length) {
            parsedAddresses = parsedAddresses.concat(address);
        }
    });
    if (options.flatten) {
        let addresses = [];
        let walkAddressList = (list)=>{
            list.forEach((address)=>{
                if (address.group) {
                    return walkAddressList(address.group);
                } else {
                    addresses.push(address);
                }
            });
        };
        walkAddressList(parsedAddresses);
        return addresses;
    }
    return parsedAddresses;
}
// expose to the world
module.exports = addressparser;
}),
"[project]/node_modules/nodemailer/lib/mime-node/last-newline.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Transform = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Transform;
class LastNewline extends Transform {
    constructor(){
        super();
        this.lastByte = false;
    }
    _transform(chunk, encoding, done) {
        if (chunk.length) {
            this.lastByte = chunk[chunk.length - 1];
        }
        this.push(chunk);
        done();
    }
    _flush(done) {
        if (this.lastByte === 0x0a) {
            return done();
        }
        if (this.lastByte === 0x0d) {
            this.push(Buffer.from('\n'));
            return done();
        }
        this.push(Buffer.from('\r\n'));
        return done();
    }
}
module.exports = LastNewline;
}),
"[project]/node_modules/nodemailer/lib/mime-node/le-windows.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const Transform = stream.Transform;
/**
 * Ensures that only <CR><LF> sequences are used for linebreaks
 *
 * @param {Object} options Stream options
 */ class LeWindows extends Transform {
    constructor(options){
        super(options);
        // init Transform
        this.options = options || {};
        this.lastByte = false;
    }
    /**
     * Escapes dots
     */ _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for(let i = 0, len = chunk.length; i < len; i++){
            if (chunk[i] === 0x0a) {
                // \n
                if (i && chunk[i - 1] !== 0x0d || !i && this.lastByte !== 0x0d) {
                    if (i > lastPos) {
                        buf = chunk.slice(lastPos, i);
                        this.push(buf);
                    }
                    this.push(Buffer.from('\r\n'));
                    lastPos = i + 1;
                }
            }
        }
        if (lastPos && lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            this.push(buf);
        } else if (!lastPos) {
            this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
    }
}
module.exports = LeWindows;
}),
"[project]/node_modules/nodemailer/lib/mime-node/le-unix.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const Transform = stream.Transform;
/**
 * Ensures that only <LF> is used for linebreaks
 *
 * @param {Object} options Stream options
 */ class LeWindows extends Transform {
    constructor(options){
        super(options);
        // init Transform
        this.options = options || {};
    }
    /**
     * Escapes dots
     */ _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for(let i = 0, len = chunk.length; i < len; i++){
            if (chunk[i] === 0x0d) {
                // \n
                buf = chunk.slice(lastPos, i);
                lastPos = i + 1;
                this.push(buf);
            }
        }
        if (lastPos && lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            this.push(buf);
        } else if (!lastPos) {
            this.push(chunk);
        }
        done();
    }
}
module.exports = LeWindows;
}),
"[project]/node_modules/nodemailer/lib/mime-node/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint no-undefined: 0, prefer-spread: 0, no-control-regex: 0 */ const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const punycode = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/punycode/index.js [app-rsc] (ecmascript)");
const PassThrough = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").PassThrough;
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
const mimeFuncs = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-funcs/index.js [app-rsc] (ecmascript)");
const qp = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/qp/index.js [app-rsc] (ecmascript)");
const base64 = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/base64/index.js [app-rsc] (ecmascript)");
const addressparser = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/addressparser/index.js [app-rsc] (ecmascript)");
const nmfetch = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/fetch/index.js [app-rsc] (ecmascript)");
const LastNewline = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-node/last-newline.js [app-rsc] (ecmascript)");
const LeWindows = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-node/le-windows.js [app-rsc] (ecmascript)");
const LeUnix = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-node/le-unix.js [app-rsc] (ecmascript)");
/**
 * Creates a new mime tree node. Assumes 'multipart/*' as the content type
 * if it is a branch, anything else counts as leaf. If rootNode is missing from
 * the options, assumes this is the root.
 *
 * @param {String} contentType Define the content type for the node. Can be left blank for attachments (derived from filename)
 * @param {Object} [options] optional options
 * @param {Object} [options.rootNode] root node for this tree
 * @param {Object} [options.parentNode] immediate parent for this node
 * @param {Object} [options.filename] filename for an attachment node
 * @param {String} [options.baseBoundary] shared part of the unique multipart boundary
 * @param {Boolean} [options.keepBcc] If true, do not exclude Bcc from the generated headers
 * @param {Function} [options.normalizeHeaderKey] method to normalize header keys for custom caseing
 * @param {String} [options.textEncoding] either 'Q' (the default) or 'B'
 */ class MimeNode {
    constructor(contentType, options){
        this.nodeCounter = 0;
        options = options || {};
        /**
         * shared part of the unique multipart boundary
         */ this.baseBoundary = options.baseBoundary || crypto.randomBytes(8).toString('hex');
        this.boundaryPrefix = options.boundaryPrefix || '--_NmP';
        this.disableFileAccess = !!options.disableFileAccess;
        this.disableUrlAccess = !!options.disableUrlAccess;
        this.normalizeHeaderKey = options.normalizeHeaderKey;
        /**
         * If date headers is missing and current node is the root, this value is used instead
         */ this.date = new Date();
        /**
         * Root node for current mime tree
         */ this.rootNode = options.rootNode || this;
        /**
         * If true include Bcc in generated headers (if available)
         */ this.keepBcc = !!options.keepBcc;
        /**
         * If filename is specified but contentType is not (probably an attachment)
         * detect the content type from filename extension
         */ if (options.filename) {
            /**
             * Filename for this node. Useful with attachments
             */ this.filename = options.filename;
            if (!contentType) {
                contentType = mimeFuncs.detectMimeType(this.filename.split('.').pop());
            }
        }
        /**
         * Indicates which encoding should be used for header strings: "Q" or "B"
         */ this.textEncoding = (options.textEncoding || '').toString().trim().charAt(0).toUpperCase();
        /**
         * Immediate parent for this node (or undefined if not set)
         */ this.parentNode = options.parentNode;
        /**
         * Hostname for default message-id values
         */ this.hostname = options.hostname;
        /**
         * If set to 'win' then uses \r\n, if 'linux' then \n. If not set (or `raw` is used) then newlines are kept as is.
         */ this.newline = options.newline;
        /**
         * An array for possible child nodes
         */ this.childNodes = [];
        /**
         * Used for generating unique boundaries (prepended to the shared base)
         */ this._nodeId = ++this.rootNode.nodeCounter;
        /**
         * A list of header values for this node in the form of [{key:'', value:''}]
         */ this._headers = [];
        /**
         * True if the content only uses ASCII printable characters
         * @type {Boolean}
         */ this._isPlainText = false;
        /**
         * True if the content is plain text but has longer lines than allowed
         * @type {Boolean}
         */ this._hasLongLines = false;
        /**
         * If set, use instead this value for envelopes instead of generating one
         * @type {Boolean}
         */ this._envelope = false;
        /**
         * If set then use this value as the stream content instead of building it
         * @type {String|Buffer|Stream}
         */ this._raw = false;
        /**
         * Additional transform streams that the message will be piped before
         * exposing by createReadStream
         * @type {Array}
         */ this._transforms = [];
        /**
         * Additional process functions that the message will be piped through before
         * exposing by createReadStream. These functions are run after transforms
         * @type {Array}
         */ this._processFuncs = [];
        /**
         * If content type is set (or derived from the filename) add it to headers
         */ if (contentType) {
            this.setHeader('Content-Type', contentType);
        }
    }
    /////// PUBLIC METHODS
    /**
     * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
     *
     * @param {String} [contentType] Optional content type
     * @param {Object} [options] Optional options object
     * @return {Object} Created node object
     */ createChild(contentType, options) {
        if (!options && typeof contentType === 'object') {
            options = contentType;
            contentType = undefined;
        }
        let node = new MimeNode(contentType, options);
        this.appendChild(node);
        return node;
    }
    /**
     * Appends an existing node to the mime tree. Removes the node from an existing
     * tree if needed
     *
     * @param {Object} childNode node to be appended
     * @return {Object} Appended node object
     */ appendChild(childNode) {
        if (childNode.rootNode !== this.rootNode) {
            childNode.rootNode = this.rootNode;
            childNode._nodeId = ++this.rootNode.nodeCounter;
        }
        childNode.parentNode = this;
        this.childNodes.push(childNode);
        return childNode;
    }
    /**
     * Replaces current node with another node
     *
     * @param {Object} node Replacement node
     * @return {Object} Replacement node
     */ replace(node) {
        if (node === this) {
            return this;
        }
        this.parentNode.childNodes.forEach((childNode, i)=>{
            if (childNode === this) {
                node.rootNode = this.rootNode;
                node.parentNode = this.parentNode;
                node._nodeId = this._nodeId;
                this.rootNode = this;
                this.parentNode = undefined;
                node.parentNode.childNodes[i] = node;
            }
        });
        return node;
    }
    /**
     * Removes current node from the mime tree
     *
     * @return {Object} removed node
     */ remove() {
        if (!this.parentNode) {
            return this;
        }
        for(let i = this.parentNode.childNodes.length - 1; i >= 0; i--){
            if (this.parentNode.childNodes[i] === this) {
                this.parentNode.childNodes.splice(i, 1);
                this.parentNode = undefined;
                this.rootNode = this;
                return this;
            }
        }
    }
    /**
     * Sets a header value. If the value for selected key exists, it is overwritten.
     * You can set multiple values as well by using [{key:'', value:''}] or
     * {key: 'value'} as the first argument.
     *
     * @param {String|Array|Object} key Header key or a list of key value pairs
     * @param {String} value Header value
     * @return {Object} current node
     */ setHeader(key, value) {
        let added = false, headerValue;
        // Allow setting multiple headers at once
        if (!value && key && typeof key === 'object') {
            // allow {key:'content-type', value: 'text/plain'}
            if (key.key && 'value' in key) {
                this.setHeader(key.key, key.value);
            } else if (Array.isArray(key)) {
                // allow [{key:'content-type', value: 'text/plain'}]
                key.forEach((i)=>{
                    this.setHeader(i.key, i.value);
                });
            } else {
                // allow {'content-type': 'text/plain'}
                Object.keys(key).forEach((i)=>{
                    this.setHeader(i, key[i]);
                });
            }
            return this;
        }
        key = this._normalizeHeaderKey(key);
        headerValue = {
            key,
            value
        };
        // Check if the value exists and overwrite
        for(let i = 0, len = this._headers.length; i < len; i++){
            if (this._headers[i].key === key) {
                if (!added) {
                    // replace the first match
                    this._headers[i] = headerValue;
                    added = true;
                } else {
                    // remove following matches
                    this._headers.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
        // match not found, append the value
        if (!added) {
            this._headers.push(headerValue);
        }
        return this;
    }
    /**
     * Adds a header value. If the value for selected key exists, the value is appended
     * as a new field and old one is not touched.
     * You can set multiple values as well by using [{key:'', value:''}] or
     * {key: 'value'} as the first argument.
     *
     * @param {String|Array|Object} key Header key or a list of key value pairs
     * @param {String} value Header value
     * @return {Object} current node
     */ addHeader(key, value) {
        // Allow setting multiple headers at once
        if (!value && key && typeof key === 'object') {
            // allow {key:'content-type', value: 'text/plain'}
            if (key.key && key.value) {
                this.addHeader(key.key, key.value);
            } else if (Array.isArray(key)) {
                // allow [{key:'content-type', value: 'text/plain'}]
                key.forEach((i)=>{
                    this.addHeader(i.key, i.value);
                });
            } else {
                // allow {'content-type': 'text/plain'}
                Object.keys(key).forEach((i)=>{
                    this.addHeader(i, key[i]);
                });
            }
            return this;
        } else if (Array.isArray(value)) {
            value.forEach((val)=>{
                this.addHeader(key, val);
            });
            return this;
        }
        this._headers.push({
            key: this._normalizeHeaderKey(key),
            value
        });
        return this;
    }
    /**
     * Retrieves the first mathcing value of a selected key
     *
     * @param {String} key Key to search for
     * @retun {String} Value for the key
     */ getHeader(key) {
        key = this._normalizeHeaderKey(key);
        for(let i = 0, len = this._headers.length; i < len; i++){
            if (this._headers[i].key === key) {
                return this._headers[i].value;
            }
        }
    }
    /**
     * Sets body content for current node. If the value is a string, charset is added automatically
     * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
     * the charset yourself
     *
     * @param (String|Buffer) content Body content
     * @return {Object} current node
     */ setContent(content) {
        this.content = content;
        if (typeof this.content.pipe === 'function') {
            // pre-stream handler. might be triggered if a stream is set as content
            // and 'error' fires before anything is done with this stream
            this._contentErrorHandler = (err)=>{
                this.content.removeListener('error', this._contentErrorHandler);
                this.content = err;
            };
            this.content.once('error', this._contentErrorHandler);
        } else if (typeof this.content === 'string') {
            this._isPlainText = mimeFuncs.isPlainText(this.content);
            if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
                // If there are lines longer than 76 symbols/bytes do not use 7bit
                this._hasLongLines = true;
            }
        }
        return this;
    }
    build(callback) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject)=>{
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        let stream = this.createReadStream();
        let buf = [];
        let buflen = 0;
        let returned = false;
        stream.on('readable', ()=>{
            let chunk;
            while((chunk = stream.read()) !== null){
                buf.push(chunk);
                buflen += chunk.length;
            }
        });
        stream.once('error', (err)=>{
            if (returned) {
                return;
            }
            returned = true;
            return callback(err);
        });
        stream.once('end', (chunk)=>{
            if (returned) {
                return;
            }
            returned = true;
            if (chunk && chunk.length) {
                buf.push(chunk);
                buflen += chunk.length;
            }
            return callback(null, Buffer.concat(buf, buflen));
        });
        return promise;
    }
    getTransferEncoding() {
        let transferEncoding = false;
        let contentType = (this.getHeader('Content-Type') || '').toString().toLowerCase().trim();
        if (this.content) {
            transferEncoding = (this.getHeader('Content-Transfer-Encoding') || '').toString().toLowerCase().trim();
            if (!transferEncoding || ![
                'base64',
                'quoted-printable'
            ].includes(transferEncoding)) {
                if (/^text\//i.test(contentType)) {
                    // If there are no special symbols, no need to modify the text
                    if (this._isPlainText && !this._hasLongLines) {
                        transferEncoding = '7bit';
                    } else if (typeof this.content === 'string' || this.content instanceof Buffer) {
                        // detect preferred encoding for string value
                        transferEncoding = this._getTextEncoding(this.content) === 'Q' ? 'quoted-printable' : 'base64';
                    } else {
                        // we can not check content for a stream, so either use preferred encoding or fallback to QP
                        transferEncoding = this.textEncoding === 'B' ? 'base64' : 'quoted-printable';
                    }
                } else if (!/^(multipart|message)\//i.test(contentType)) {
                    transferEncoding = transferEncoding || 'base64';
                }
            }
        }
        return transferEncoding;
    }
    /**
     * Builds the header block for the mime node. Append \r\n\r\n before writing the content
     *
     * @returns {String} Headers
     */ buildHeaders() {
        let transferEncoding = this.getTransferEncoding();
        let headers = [];
        if (transferEncoding) {
            this.setHeader('Content-Transfer-Encoding', transferEncoding);
        }
        if (this.filename && !this.getHeader('Content-Disposition')) {
            this.setHeader('Content-Disposition', 'attachment');
        }
        // Ensure mandatory header fields
        if (this.rootNode === this) {
            if (!this.getHeader('Date')) {
                this.setHeader('Date', this.date.toUTCString().replace(/GMT/, '+0000'));
            }
            // ensure that Message-Id is present
            this.messageId();
            if (!this.getHeader('MIME-Version')) {
                this.setHeader('MIME-Version', '1.0');
            }
            // Ensure that Content-Type is the last header for the root node
            for(let i = this._headers.length - 2; i >= 0; i--){
                let header = this._headers[i];
                if (header.key === 'Content-Type') {
                    this._headers.splice(i, 1);
                    this._headers.push(header);
                }
            }
        }
        this._headers.forEach((header)=>{
            let key = header.key;
            let value = header.value;
            let structured;
            let param;
            let options = {};
            let formattedHeaders = [
                'From',
                'Sender',
                'To',
                'Cc',
                'Bcc',
                'Reply-To',
                'Date',
                'References'
            ];
            if (value && typeof value === 'object' && !formattedHeaders.includes(key)) {
                Object.keys(value).forEach((key)=>{
                    if (key !== 'value') {
                        options[key] = value[key];
                    }
                });
                value = (value.value || '').toString();
                if (!value.trim()) {
                    return;
                }
            }
            if (options.prepared) {
                // header value is
                if (options.foldLines) {
                    headers.push(mimeFuncs.foldLines(key + ': ' + value));
                } else {
                    headers.push(key + ': ' + value);
                }
                return;
            }
            switch(header.key){
                case 'Content-Disposition':
                    structured = mimeFuncs.parseHeaderValue(value);
                    if (this.filename) {
                        structured.params.filename = this.filename;
                    }
                    value = mimeFuncs.buildHeaderValue(structured);
                    break;
                case 'Content-Type':
                    structured = mimeFuncs.parseHeaderValue(value);
                    this._handleContentType(structured);
                    if (structured.value.match(/^text\/plain\b/) && typeof this.content === 'string' && /[\u0080-\uFFFF]/.test(this.content)) {
                        structured.params.charset = 'utf-8';
                    }
                    value = mimeFuncs.buildHeaderValue(structured);
                    if (this.filename) {
                        // add support for non-compliant clients like QQ webmail
                        // we can't build the value with buildHeaderValue as the value is non standard and
                        // would be converted to parameter continuation encoding that we do not want
                        param = this._encodeWords(this.filename);
                        if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
                            // include value in quotes if needed
                            param = '"' + param + '"';
                        }
                        value += '; name=' + param;
                    }
                    break;
                case 'Bcc':
                    if (!this.keepBcc) {
                        // skip BCC values
                        return;
                    }
                    break;
            }
            value = this._encodeHeaderValue(key, value);
            // skip empty lines
            if (!(value || '').toString().trim()) {
                return;
            }
            if (typeof this.normalizeHeaderKey === 'function') {
                let normalized = this.normalizeHeaderKey(key, value);
                if (normalized && typeof normalized === 'string' && normalized.length) {
                    key = normalized;
                }
            }
            headers.push(mimeFuncs.foldLines(key + ': ' + value, 76));
        });
        return headers.join('\r\n');
    }
    /**
     * Streams the rfc2822 message from the current node. If this is a root node,
     * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
     *
     * @return {String} Compiled message
     */ createReadStream(options) {
        options = options || {};
        let stream = new PassThrough(options);
        let outputStream = stream;
        let transform;
        this.stream(stream, options, (err)=>{
            if (err) {
                outputStream.emit('error', err);
                return;
            }
            stream.end();
        });
        for(let i = 0, len = this._transforms.length; i < len; i++){
            transform = typeof this._transforms[i] === 'function' ? this._transforms[i]() : this._transforms[i];
            outputStream.once('error', (err)=>{
                transform.emit('error', err);
            });
            outputStream = outputStream.pipe(transform);
        }
        // ensure terminating newline after possible user transforms
        transform = new LastNewline();
        outputStream.once('error', (err)=>{
            transform.emit('error', err);
        });
        outputStream = outputStream.pipe(transform);
        // dkim and stuff
        for(let i = 0, len = this._processFuncs.length; i < len; i++){
            transform = this._processFuncs[i];
            outputStream = transform(outputStream);
        }
        if (this.newline) {
            const winbreak = [
                'win',
                'windows',
                'dos',
                '\r\n'
            ].includes(this.newline.toString().toLowerCase());
            const newlineTransform = winbreak ? new LeWindows() : new LeUnix();
            const stream = outputStream.pipe(newlineTransform);
            outputStream.on('error', (err)=>stream.emit('error', err));
            return stream;
        }
        return outputStream;
    }
    /**
     * Appends a transform stream object to the transforms list. Final output
     * is passed through this stream before exposing
     *
     * @param {Object} transform Read-Write stream
     */ transform(transform) {
        this._transforms.push(transform);
    }
    /**
     * Appends a post process function. The functon is run after transforms and
     * uses the following syntax
     *
     *   processFunc(input) -> outputStream
     *
     * @param {Object} processFunc Read-Write stream
     */ processFunc(processFunc) {
        this._processFuncs.push(processFunc);
    }
    stream(outputStream, options, done) {
        let transferEncoding = this.getTransferEncoding();
        let contentStream;
        let localStream;
        // protect actual callback against multiple triggering
        let returned = false;
        let callback = (err)=>{
            if (returned) {
                return;
            }
            returned = true;
            done(err);
        };
        // for multipart nodes, push child nodes
        // for content nodes end the stream
        let finalize = ()=>{
            let childId = 0;
            let processChildNode = ()=>{
                if (childId >= this.childNodes.length) {
                    outputStream.write('\r\n--' + this.boundary + '--\r\n');
                    return callback();
                }
                let child = this.childNodes[childId++];
                outputStream.write((childId > 1 ? '\r\n' : '') + '--' + this.boundary + '\r\n');
                child.stream(outputStream, options, (err)=>{
                    if (err) {
                        return callback(err);
                    }
                    setImmediate(processChildNode);
                });
            };
            if (this.multipart) {
                setImmediate(processChildNode);
            } else {
                return callback();
            }
        };
        // pushes node content
        let sendContent = ()=>{
            if (this.content) {
                if (Object.prototype.toString.call(this.content) === '[object Error]') {
                    // content is already errored
                    return callback(this.content);
                }
                if (typeof this.content.pipe === 'function') {
                    this.content.removeListener('error', this._contentErrorHandler);
                    this._contentErrorHandler = (err)=>callback(err);
                    this.content.once('error', this._contentErrorHandler);
                }
                let createStream = ()=>{
                    if ([
                        'quoted-printable',
                        'base64'
                    ].includes(transferEncoding)) {
                        contentStream = new (transferEncoding === 'base64' ? base64 : qp).Encoder(options);
                        contentStream.pipe(outputStream, {
                            end: false
                        });
                        contentStream.once('end', finalize);
                        contentStream.once('error', (err)=>callback(err));
                        localStream = this._getStream(this.content);
                        localStream.pipe(contentStream);
                    } else {
                        // anything that is not QP or Base54 passes as-is
                        localStream = this._getStream(this.content);
                        localStream.pipe(outputStream, {
                            end: false
                        });
                        localStream.once('end', finalize);
                    }
                    localStream.once('error', (err)=>callback(err));
                };
                if (this.content._resolve) {
                    let chunks = [];
                    let chunklen = 0;
                    let returned = false;
                    let sourceStream = this._getStream(this.content);
                    sourceStream.on('error', (err)=>{
                        if (returned) {
                            return;
                        }
                        returned = true;
                        callback(err);
                    });
                    sourceStream.on('readable', ()=>{
                        let chunk;
                        while((chunk = sourceStream.read()) !== null){
                            chunks.push(chunk);
                            chunklen += chunk.length;
                        }
                    });
                    sourceStream.on('end', ()=>{
                        if (returned) {
                            return;
                        }
                        returned = true;
                        this.content._resolve = false;
                        this.content._resolvedValue = Buffer.concat(chunks, chunklen);
                        setImmediate(createStream);
                    });
                } else {
                    setImmediate(createStream);
                }
                return;
            } else {
                return setImmediate(finalize);
            }
        };
        if (this._raw) {
            setImmediate(()=>{
                if (Object.prototype.toString.call(this._raw) === '[object Error]') {
                    // content is already errored
                    return callback(this._raw);
                }
                // remove default error handler (if set)
                if (typeof this._raw.pipe === 'function') {
                    this._raw.removeListener('error', this._contentErrorHandler);
                }
                let raw = this._getStream(this._raw);
                raw.pipe(outputStream, {
                    end: false
                });
                raw.on('error', (err)=>outputStream.emit('error', err));
                raw.on('end', finalize);
            });
        } else {
            outputStream.write(this.buildHeaders() + '\r\n\r\n');
            setImmediate(sendContent);
        }
    }
    /**
     * Sets envelope to be used instead of the generated one
     *
     * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
     */ setEnvelope(envelope) {
        let list;
        this._envelope = {
            from: false,
            to: []
        };
        if (envelope.from) {
            list = [];
            this._convertAddresses(this._parseAddresses(envelope.from), list);
            list = list.filter((address)=>address && address.address);
            if (list.length && list[0]) {
                this._envelope.from = list[0].address;
            }
        }
        [
            'to',
            'cc',
            'bcc'
        ].forEach((key)=>{
            if (envelope[key]) {
                this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
            }
        });
        this._envelope.to = this._envelope.to.map((to)=>to.address).filter((address)=>address);
        let standardFields = [
            'to',
            'cc',
            'bcc',
            'from'
        ];
        Object.keys(envelope).forEach((key)=>{
            if (!standardFields.includes(key)) {
                this._envelope[key] = envelope[key];
            }
        });
        return this;
    }
    /**
     * Generates and returns an object with parsed address fields
     *
     * @return {Object} Address object
     */ getAddresses() {
        let addresses = {};
        this._headers.forEach((header)=>{
            let key = header.key.toLowerCase();
            if ([
                'from',
                'sender',
                'reply-to',
                'to',
                'cc',
                'bcc'
            ].includes(key)) {
                if (!Array.isArray(addresses[key])) {
                    addresses[key] = [];
                }
                this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
            }
        });
        return addresses;
    }
    /**
     * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
     *
     * @return {Object} SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
     */ getEnvelope() {
        if (this._envelope) {
            return this._envelope;
        }
        let envelope = {
            from: false,
            to: []
        };
        this._headers.forEach((header)=>{
            let list = [];
            if (header.key === 'From' || !envelope.from && [
                'Reply-To',
                'Sender'
            ].includes(header.key)) {
                this._convertAddresses(this._parseAddresses(header.value), list);
                if (list.length && list[0]) {
                    envelope.from = list[0].address;
                }
            } else if ([
                'To',
                'Cc',
                'Bcc'
            ].includes(header.key)) {
                this._convertAddresses(this._parseAddresses(header.value), envelope.to);
            }
        });
        envelope.to = envelope.to.map((to)=>to.address);
        return envelope;
    }
    /**
     * Returns Message-Id value. If it does not exist, then creates one
     *
     * @return {String} Message-Id value
     */ messageId() {
        let messageId = this.getHeader('Message-ID');
        // You really should define your own Message-Id field!
        if (!messageId) {
            messageId = this._generateMessageId();
            this.setHeader('Message-ID', messageId);
        }
        return messageId;
    }
    /**
     * Sets pregenerated content that will be used as the output of this node
     *
     * @param {String|Buffer|Stream} Raw MIME contents
     */ setRaw(raw) {
        this._raw = raw;
        if (this._raw && typeof this._raw.pipe === 'function') {
            // pre-stream handler. might be triggered if a stream is set as content
            // and 'error' fires before anything is done with this stream
            this._contentErrorHandler = (err)=>{
                this._raw.removeListener('error', this._contentErrorHandler);
                this._raw = err;
            };
            this._raw.once('error', this._contentErrorHandler);
        }
        return this;
    }
    /////// PRIVATE METHODS
    /**
     * Detects and returns handle to a stream related with the content.
     *
     * @param {Mixed} content Node content
     * @returns {Object} Stream object
     */ _getStream(content) {
        let contentStream;
        if (content._resolvedValue) {
            // pass string or buffer content as a stream
            contentStream = new PassThrough();
            setImmediate(()=>{
                try {
                    contentStream.end(content._resolvedValue);
                } catch (_err) {
                    contentStream.emit('error', _err);
                }
            });
            return contentStream;
        } else if (typeof content.pipe === 'function') {
            // assume as stream
            return content;
        } else if (content && typeof content.path === 'string' && !content.href) {
            if (this.disableFileAccess) {
                contentStream = new PassThrough();
                setImmediate(()=>contentStream.emit('error', new Error('File access rejected for ' + content.path)));
                return contentStream;
            }
            // read file
            return fs.createReadStream(content.path);
        } else if (content && typeof content.href === 'string') {
            if (this.disableUrlAccess) {
                contentStream = new PassThrough();
                setImmediate(()=>contentStream.emit('error', new Error('Url access rejected for ' + content.href)));
                return contentStream;
            }
            // fetch URL
            return nmfetch(content.href, {
                headers: content.httpHeaders
            });
        } else {
            // pass string or buffer content as a stream
            contentStream = new PassThrough();
            setImmediate(()=>{
                try {
                    contentStream.end(content || '');
                } catch (_err) {
                    contentStream.emit('error', _err);
                }
            });
            return contentStream;
        }
    }
    /**
     * Parses addresses. Takes in a single address or an array or an
     * array of address arrays (eg. To: [[first group], [second group],...])
     *
     * @param {Mixed} addresses Addresses to be parsed
     * @return {Array} An array of address objects
     */ _parseAddresses(addresses) {
        return [].concat.apply([], [].concat(addresses).map((address)=>{
            if (address && address.address) {
                address.address = this._normalizeAddress(address.address);
                address.name = address.name || '';
                return [
                    address
                ];
            }
            return addressparser(address);
        }));
    }
    /**
     * Normalizes a header key, uses Camel-Case form, except for uppercase MIME-
     *
     * @param {String} key Key to be normalized
     * @return {String} key in Camel-Case form
     */ _normalizeHeaderKey(key) {
        key = (key || '').toString()// no newlines in keys
        .replace(/\r?\n|\r/g, ' ').trim().toLowerCase()// use uppercase words, except MIME
        .replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (c)=>c.toUpperCase())// special case
        .replace(/^Content-Features$/i, 'Content-features');
        return key;
    }
    /**
     * Checks if the content type is multipart and defines boundary if needed.
     * Doesn't return anything, modifies object argument instead.
     *
     * @param {Object} structured Parsed header value for 'Content-Type' key
     */ _handleContentType(structured) {
        this.contentType = structured.value.trim().toLowerCase();
        this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf('/') + 1) : false;
        if (this.multipart) {
            this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
        } else {
            this.boundary = false;
        }
    }
    /**
     * Generates a multipart boundary value
     *
     * @return {String} boundary value
     */ _generateBoundary() {
        return this.rootNode.boundaryPrefix + '-' + this.rootNode.baseBoundary + '-Part_' + this._nodeId;
    }
    /**
     * Encodes a header value for use in the generated rfc2822 email.
     *
     * @param {String} key Header key
     * @param {String} value Header value
     */ _encodeHeaderValue(key, value) {
        key = this._normalizeHeaderKey(key);
        switch(key){
            // Structured headers
            case 'From':
            case 'Sender':
            case 'To':
            case 'Cc':
            case 'Bcc':
            case 'Reply-To':
                return this._convertAddresses(this._parseAddresses(value));
            // values enclosed in <>
            case 'Message-ID':
            case 'In-Reply-To':
            case 'Content-Id':
                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
                if (value.charAt(0) !== '<') {
                    value = '<' + value;
                }
                if (value.charAt(value.length - 1) !== '>') {
                    value = value + '>';
                }
                return value;
            // space separated list of values enclosed in <>
            case 'References':
                value = [].concat.apply([], [].concat(value || '').map((elm)=>{
                    elm = (elm || '').toString().replace(/\r?\n|\r/g, ' ').trim();
                    return elm.replace(/<[^>]*>/g, (str)=>str.replace(/\s/g, '')).split(/\s+/);
                })).map((elm)=>{
                    if (elm.charAt(0) !== '<') {
                        elm = '<' + elm;
                    }
                    if (elm.charAt(elm.length - 1) !== '>') {
                        elm = elm + '>';
                    }
                    return elm;
                });
                return value.join(' ').trim();
            case 'Date':
                if (Object.prototype.toString.call(value) === '[object Date]') {
                    return value.toUTCString().replace(/GMT/, '+0000');
                }
                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
                return this._encodeWords(value);
            case 'Content-Type':
            case 'Content-Disposition':
                // if it includes a filename then it is already encoded
                return (value || '').toString().replace(/\r?\n|\r/g, ' ');
            default:
                value = (value || '').toString().replace(/\r?\n|\r/g, ' ');
                // encodeWords only encodes if needed, otherwise the original string is returned
                return this._encodeWords(value);
        }
    }
    /**
     * Rebuilds address object using punycode and other adjustments
     *
     * @param {Array} addresses An array of address objects
     * @param {Array} [uniqueList] An array to be populated with addresses
     * @return {String} address string
     */ _convertAddresses(addresses, uniqueList) {
        let values = [];
        uniqueList = uniqueList || [];
        [].concat(addresses || []).forEach((address)=>{
            if (address.address) {
                address.address = this._normalizeAddress(address.address);
                if (!address.name) {
                    values.push(address.address.indexOf(' ') >= 0 ? `<${address.address}>` : `${address.address}`);
                } else if (address.name) {
                    values.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
                }
                if (address.address) {
                    if (!uniqueList.filter((a)=>a.address === address.address).length) {
                        uniqueList.push(address);
                    }
                }
            } else if (address.group) {
                let groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList) : '').trim();
                values.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
            }
        });
        return values.join(', ');
    }
    /**
     * Normalizes an email address
     *
     * @param {Array} address An array of address objects
     * @return {String} address string
     */ _normalizeAddress(address) {
        address = (address || '').toString().replace(/[\x00-\x1F<>]+/g, ' ') // remove unallowed characters
        .trim();
        let lastAt = address.lastIndexOf('@');
        if (lastAt < 0) {
            // Bare username
            return address;
        }
        let user = address.substr(0, lastAt);
        let domain = address.substr(lastAt + 1);
        // Usernames are not touched and are kept as is even if these include unicode
        // Domains are punycoded by default
        // 'jõgeva.ee' will be converted to 'xn--jgeva-dua.ee'
        // non-unicode domains are left as is
        let encodedDomain;
        try {
            encodedDomain = punycode.toASCII(domain.toLowerCase());
        } catch (_err) {
        // keep as is?
        }
        if (user.indexOf(' ') >= 0) {
            if (user.charAt(0) !== '"') {
                user = '"' + user;
            }
            if (user.substr(-1) !== '"') {
                user = user + '"';
            }
        }
        return `${user}@${encodedDomain}`;
    }
    /**
     * If needed, mime encodes the name part
     *
     * @param {String} name Name part of an address
     * @returns {String} Mime word encoded string if needed
     */ _encodeAddressName(name) {
        if (!/^[\w ]*$/.test(name)) {
            if (/^[\x20-\x7e]*$/.test(name)) {
                return '"' + name.replace(/([\\"])/g, '\\$1') + '"';
            } else {
                return mimeFuncs.encodeWord(name, this._getTextEncoding(name), 52);
            }
        }
        return name;
    }
    /**
     * If needed, mime encodes the name part
     *
     * @param {String} name Name part of an address
     * @returns {String} Mime word encoded string if needed
     */ _encodeWords(value) {
        // set encodeAll parameter to true even though it is against the recommendation of RFC2047,
        // by default only words that include non-ascii should be converted into encoded words
        // but some clients (eg. Zimbra) do not handle it properly and remove surrounding whitespace
        return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
    }
    /**
     * Detects best mime encoding for a text value
     *
     * @param {String} value Value to check for
     * @return {String} either 'Q' or 'B'
     */ _getTextEncoding(value) {
        value = (value || '').toString();
        let encoding = this.textEncoding;
        let latinLen;
        let nonLatinLen;
        if (!encoding) {
            // count latin alphabet symbols and 8-bit range symbols + control symbols
            // if there are more latin characters, then use quoted-printable
            // encoding, otherwise use base64
            nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
            latinLen = (value.match(/[a-z]/gi) || []).length;
            // if there are more latin symbols than binary/unicode, then prefer Q, otherwise B
            encoding = nonLatinLen < latinLen ? 'Q' : 'B';
        }
        return encoding;
    }
    /**
     * Generates a message id
     *
     * @return {String} Random Message-ID value
     */ _generateMessageId() {
        return '<' + [
            2,
            2,
            2,
            6
        ].reduce(// crux to generate UUID-like random strings
        (prev, len)=>prev + '-' + crypto.randomBytes(len).toString('hex'), crypto.randomBytes(4).toString('hex')) + '@' + // try to use the domain of the FROM address or fallback to server hostname
        (this.getEnvelope().from || this.hostname || 'localhost').split('@').pop() + '>';
    }
}
module.exports = MimeNode;
}),
"[project]/node_modules/nodemailer/lib/mail-composer/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint no-undefined: 0 */ const MimeNode = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-node/index.js [app-rsc] (ecmascript)");
const mimeFuncs = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-funcs/index.js [app-rsc] (ecmascript)");
const parseDataURI = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)").parseDataURI;
/**
 * Creates the object for composing a MimeNode instance out from the mail options
 *
 * @constructor
 * @param {Object} mail Mail options
 */ class MailComposer {
    constructor(mail){
        this.mail = mail || {};
        this.message = false;
    }
    /**
     * Builds MimeNode instance
     */ compile() {
        this._alternatives = this.getAlternatives();
        this._htmlNode = this._alternatives.filter((alternative)=>/^text\/html\b/i.test(alternative.contentType)).pop();
        this._attachments = this.getAttachments(!!this._htmlNode);
        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
        this._useAlternative = this._alternatives.length > 1;
        this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1;
        // Compose MIME tree
        if (this.mail.raw) {
            this.message = new MimeNode('message/rfc822', {
                newline: this.mail.newline
            }).setRaw(this.mail.raw);
        } else if (this._useMixed) {
            this.message = this._createMixed();
        } else if (this._useAlternative) {
            this.message = this._createAlternative();
        } else if (this._useRelated) {
            this.message = this._createRelated();
        } else {
            this.message = this._createContentNode(false, [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
                contentType: 'text/plain',
                content: ''
            });
        }
        // Add custom headers
        if (this.mail.headers) {
            this.message.addHeader(this.mail.headers);
        }
        // Add headers to the root node, always overrides custom headers
        [
            'from',
            'sender',
            'to',
            'cc',
            'bcc',
            'reply-to',
            'in-reply-to',
            'references',
            'subject',
            'message-id',
            'date'
        ].forEach((header)=>{
            let key = header.replace(/-(\w)/g, (o, c)=>c.toUpperCase());
            if (this.mail[key]) {
                this.message.setHeader(header, this.mail[key]);
            }
        });
        // Sets custom envelope
        if (this.mail.envelope) {
            this.message.setEnvelope(this.mail.envelope);
        }
        // ensure Message-Id value
        this.message.messageId();
        return this.message;
    }
    /**
     * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
     *
     * @param {Boolean} findRelated If true separate related attachments from attached ones
     * @returns {Object} An object of arrays (`related` and `attached`)
     */ getAttachments(findRelated) {
        let icalEvent, eventObject;
        let attachments = [].concat(this.mail.attachments || []).map((attachment, i)=>{
            let data;
            if (/^data:/i.test(attachment.path || attachment.href)) {
                attachment = this._processDataUrl(attachment);
            }
            let contentType = attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin');
            let isImage = /^image\//i.test(contentType);
            let isMessageNode = /^message\//i.test(contentType);
            let contentDisposition = attachment.contentDisposition || (isMessageNode || isImage && attachment.cid ? 'inline' : 'attachment');
            let contentTransferEncoding;
            if ('contentTransferEncoding' in attachment) {
                // also contains `false`, to set
                contentTransferEncoding = attachment.contentTransferEncoding;
            } else if (isMessageNode) {
                // the content might include non-ASCII bytes but at this point we do not know it yet
                contentTransferEncoding = '8bit';
            } else {
                contentTransferEncoding = 'base64'; // the default
            }
            data = {
                contentType,
                contentDisposition,
                contentTransferEncoding
            };
            if (attachment.filename) {
                data.filename = attachment.filename;
            } else if (!isMessageNode && attachment.filename !== false) {
                data.filename = (attachment.path || attachment.href || '').split('/').pop().split('?').shift() || 'attachment-' + (i + 1);
                if (data.filename.indexOf('.') < 0) {
                    data.filename += '.' + mimeFuncs.detectExtension(data.contentType);
                }
            }
            if (/^https?:\/\//i.test(attachment.path)) {
                attachment.href = attachment.path;
                attachment.path = undefined;
            }
            if (attachment.cid) {
                data.cid = attachment.cid;
            }
            if (attachment.raw) {
                data.raw = attachment.raw;
            } else if (attachment.path) {
                data.content = {
                    path: attachment.path
                };
            } else if (attachment.href) {
                data.content = {
                    href: attachment.href,
                    httpHeaders: attachment.httpHeaders
                };
            } else {
                data.content = attachment.content || '';
            }
            if (attachment.encoding) {
                data.encoding = attachment.encoding;
            }
            if (attachment.headers) {
                data.headers = attachment.headers;
            }
            return data;
        });
        if (this.mail.icalEvent) {
            if (typeof this.mail.icalEvent === 'object' && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
                icalEvent = this.mail.icalEvent;
            } else {
                icalEvent = {
                    content: this.mail.icalEvent
                };
            }
            eventObject = {};
            Object.keys(icalEvent).forEach((key)=>{
                eventObject[key] = icalEvent[key];
            });
            eventObject.contentType = 'application/ics';
            if (!eventObject.headers) {
                eventObject.headers = {};
            }
            eventObject.filename = eventObject.filename || 'invite.ics';
            eventObject.headers['Content-Disposition'] = 'attachment';
            eventObject.headers['Content-Transfer-Encoding'] = 'base64';
        }
        if (!findRelated) {
            return {
                attached: attachments.concat(eventObject || []),
                related: []
            };
        } else {
            return {
                attached: attachments.filter((attachment)=>!attachment.cid).concat(eventObject || []),
                related: attachments.filter((attachment)=>!!attachment.cid)
            };
        }
    }
    /**
     * List alternatives. Resulting objects can be used as input for MimeNode nodes
     *
     * @returns {Array} An array of alternative elements. Includes the `text` and `html` values as well
     */ getAlternatives() {
        let alternatives = [], text, html, watchHtml, amp, icalEvent, eventObject;
        if (this.mail.text) {
            if (typeof this.mail.text === 'object' && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
                text = this.mail.text;
            } else {
                text = {
                    content: this.mail.text
                };
            }
            text.contentType = 'text/plain; charset=utf-8';
        }
        if (this.mail.watchHtml) {
            if (typeof this.mail.watchHtml === 'object' && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)) {
                watchHtml = this.mail.watchHtml;
            } else {
                watchHtml = {
                    content: this.mail.watchHtml
                };
            }
            watchHtml.contentType = 'text/watch-html; charset=utf-8';
        }
        if (this.mail.amp) {
            if (typeof this.mail.amp === 'object' && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)) {
                amp = this.mail.amp;
            } else {
                amp = {
                    content: this.mail.amp
                };
            }
            amp.contentType = 'text/x-amp-html; charset=utf-8';
        }
        // NB! when including attachments with a calendar alternative you might end up in a blank screen on some clients
        if (this.mail.icalEvent) {
            if (typeof this.mail.icalEvent === 'object' && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
                icalEvent = this.mail.icalEvent;
            } else {
                icalEvent = {
                    content: this.mail.icalEvent
                };
            }
            eventObject = {};
            Object.keys(icalEvent).forEach((key)=>{
                eventObject[key] = icalEvent[key];
            });
            if (eventObject.content && typeof eventObject.content === 'object') {
                // we are going to have the same attachment twice, so mark this to be
                // resolved just once
                eventObject.content._resolve = true;
            }
            eventObject.filename = false;
            eventObject.contentType = 'text/calendar; charset=utf-8; method=' + (eventObject.method || 'PUBLISH').toString().trim().toUpperCase();
            if (!eventObject.headers) {
                eventObject.headers = {};
            }
        }
        if (this.mail.html) {
            if (typeof this.mail.html === 'object' && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
                html = this.mail.html;
            } else {
                html = {
                    content: this.mail.html
                };
            }
            html.contentType = 'text/html; charset=utf-8';
        }
        [].concat(text || []).concat(watchHtml || []).concat(amp || []).concat(html || []).concat(eventObject || []).concat(this.mail.alternatives || []).forEach((alternative)=>{
            let data;
            if (/^data:/i.test(alternative.path || alternative.href)) {
                alternative = this._processDataUrl(alternative);
            }
            data = {
                contentType: alternative.contentType || mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || 'txt'),
                contentTransferEncoding: alternative.contentTransferEncoding
            };
            if (alternative.filename) {
                data.filename = alternative.filename;
            }
            if (/^https?:\/\//i.test(alternative.path)) {
                alternative.href = alternative.path;
                alternative.path = undefined;
            }
            if (alternative.raw) {
                data.raw = alternative.raw;
            } else if (alternative.path) {
                data.content = {
                    path: alternative.path
                };
            } else if (alternative.href) {
                data.content = {
                    href: alternative.href
                };
            } else {
                data.content = alternative.content || '';
            }
            if (alternative.encoding) {
                data.encoding = alternative.encoding;
            }
            if (alternative.headers) {
                data.headers = alternative.headers;
            }
            alternatives.push(data);
        });
        return alternatives;
    }
    /**
     * Builds multipart/mixed node. It should always contain different type of elements on the same level
     * eg. text + attachments
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @returns {Object} MimeNode node element
     */ _createMixed(parentNode) {
        let node;
        if (!parentNode) {
            node = new MimeNode('multipart/mixed', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild('multipart/mixed', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }
        if (this._useAlternative) {
            this._createAlternative(node);
        } else if (this._useRelated) {
            this._createRelated(node);
        }
        [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((element)=>{
            // if the element is a html node from related subpart then ignore it
            if (!this._useRelated || element !== this._htmlNode) {
                this._createContentNode(node, element);
            }
        });
        return node;
    }
    /**
     * Builds multipart/alternative node. It should always contain same type of elements on the same level
     * eg. text + html view of the same data
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @returns {Object} MimeNode node element
     */ _createAlternative(parentNode) {
        let node;
        if (!parentNode) {
            node = new MimeNode('multipart/alternative', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild('multipart/alternative', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }
        this._alternatives.forEach((alternative)=>{
            if (this._useRelated && this._htmlNode === alternative) {
                this._createRelated(node);
            } else {
                this._createContentNode(node, alternative);
            }
        });
        return node;
    }
    /**
     * Builds multipart/related node. It should always contain html node with related attachments
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @returns {Object} MimeNode node element
     */ _createRelated(parentNode) {
        let node;
        if (!parentNode) {
            node = new MimeNode('multipart/related; type="text/html"', {
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild('multipart/related; type="text/html"', {
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }
        this._createContentNode(node, this._htmlNode);
        this._attachments.related.forEach((alternative)=>this._createContentNode(node, alternative));
        return node;
    }
    /**
     * Creates a regular node with contents
     *
     * @param {Object} parentNode Parent for this note. If it does not exist, a root node is created
     * @param {Object} element Node data
     * @returns {Object} MimeNode node element
     */ _createContentNode(parentNode, element) {
        element = element || {};
        element.content = element.content || '';
        let node;
        let encoding = (element.encoding || 'utf8').toString().toLowerCase().replace(/[-_\s]/g, '');
        if (!parentNode) {
            node = new MimeNode(element.contentType, {
                filename: element.filename,
                baseBoundary: this.mail.baseBoundary,
                textEncoding: this.mail.textEncoding,
                boundaryPrefix: this.mail.boundaryPrefix,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        } else {
            node = parentNode.createChild(element.contentType, {
                filename: element.filename,
                textEncoding: this.mail.textEncoding,
                disableUrlAccess: this.mail.disableUrlAccess,
                disableFileAccess: this.mail.disableFileAccess,
                normalizeHeaderKey: this.mail.normalizeHeaderKey,
                newline: this.mail.newline
            });
        }
        // add custom headers
        if (element.headers) {
            node.addHeader(element.headers);
        }
        if (element.cid) {
            node.setHeader('Content-Id', '<' + element.cid.replace(/[<>]/g, '') + '>');
        }
        if (element.contentTransferEncoding) {
            node.setHeader('Content-Transfer-Encoding', element.contentTransferEncoding);
        } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
            node.setHeader('Content-Transfer-Encoding', this.mail.encoding);
        }
        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
            node.setHeader('Content-Disposition', element.contentDisposition || (element.cid && /^image\//i.test(element.contentType) ? 'inline' : 'attachment'));
        }
        if (typeof element.content === 'string' && ![
            'utf8',
            'usascii',
            'ascii'
        ].includes(encoding)) {
            element.content = Buffer.from(element.content, encoding);
        }
        // prefer pregenerated raw content
        if (element.raw) {
            node.setRaw(element.raw);
        } else {
            node.setContent(element.content);
        }
        return node;
    }
    /**
     * Parses data uri and converts it to a Buffer
     *
     * @param {Object} element Content element
     * @return {Object} Parsed element
     */ _processDataUrl(element) {
        const dataUrl = element.path || element.href;
        // Early validation to prevent ReDoS
        if (!dataUrl || typeof dataUrl !== 'string') {
            return element;
        }
        if (!dataUrl.startsWith('data:')) {
            return element;
        }
        if (dataUrl.length > 52428800) {
            // 52428800 chars = 50MB limit for data URL string (~37.5MB decoded image)
            // Extract content type before rejecting to preserve MIME type
            let detectedType = 'application/octet-stream';
            const commaPos = dataUrl.indexOf(',');
            if (commaPos > 0 && commaPos < 200) {
                // Parse header safely with size limit
                const header = dataUrl.substring(5, commaPos); // skip 'data:'
                const parts = header.split(';');
                if (parts[0] && parts[0].includes('/')) {
                    detectedType = parts[0].trim();
                }
            }
            // Return empty content for excessively long data URLs
            return Object.assign({}, element, {
                path: false,
                href: false,
                content: Buffer.alloc(0),
                contentType: element.contentType || detectedType
            });
        }
        let parsedDataUri;
        try {
            parsedDataUri = parseDataURI(dataUrl);
        } catch (_err) {
            return element;
        }
        if (!parsedDataUri) {
            return element;
        }
        element.content = parsedDataUri.data;
        element.contentType = element.contentType || parsedDataUri.contentType;
        if ('path' in element) {
            element.path = false;
        }
        if ('href' in element) {
            element.href = false;
        }
        return element;
    }
}
module.exports = MailComposer;
}),
"[project]/node_modules/nodemailer/lib/dkim/message-parser.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Transform = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Transform;
/**
 * MessageParser instance is a transform stream that separates message headers
 * from the rest of the body. Headers are emitted with the 'headers' event. Message
 * body is passed on as the resulting stream.
 */ class MessageParser extends Transform {
    constructor(options){
        super(options);
        this.lastBytes = Buffer.alloc(4);
        this.headersParsed = false;
        this.headerBytes = 0;
        this.headerChunks = [];
        this.rawHeaders = false;
        this.bodySize = 0;
    }
    /**
     * Keeps count of the last 4 bytes in order to detect line breaks on chunk boundaries
     *
     * @param {Buffer} data Next data chunk from the stream
     */ updateLastBytes(data) {
        let lblen = this.lastBytes.length;
        let nblen = Math.min(data.length, lblen);
        // shift existing bytes
        for(let i = 0, len = lblen - nblen; i < len; i++){
            this.lastBytes[i] = this.lastBytes[i + nblen];
        }
        // add new bytes
        for(let i = 1; i <= nblen; i++){
            this.lastBytes[lblen - i] = data[data.length - i];
        }
    }
    /**
     * Finds and removes message headers from the remaining body. We want to keep
     * headers separated until final delivery to be able to modify these
     *
     * @param {Buffer} data Next chunk of data
     * @return {Boolean} Returns true if headers are already found or false otherwise
     */ checkHeaders(data) {
        if (this.headersParsed) {
            return true;
        }
        let lblen = this.lastBytes.length;
        let headerPos = 0;
        this.curLinePos = 0;
        for(let i = 0, len = this.lastBytes.length + data.length; i < len; i++){
            let chr;
            if (i < lblen) {
                chr = this.lastBytes[i];
            } else {
                chr = data[i - lblen];
            }
            if (chr === 0x0a && i) {
                let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
                let pr2 = i > 1 ? i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen] : false;
                if (pr1 === 0x0a) {
                    this.headersParsed = true;
                    headerPos = i - lblen + 1;
                    this.headerBytes += headerPos;
                    break;
                } else if (pr1 === 0x0d && pr2 === 0x0a) {
                    this.headersParsed = true;
                    headerPos = i - lblen + 1;
                    this.headerBytes += headerPos;
                    break;
                }
            }
        }
        if (this.headersParsed) {
            this.headerChunks.push(data.slice(0, headerPos));
            this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
            this.headerChunks = null;
            this.emit('headers', this.parseHeaders());
            if (data.length - 1 > headerPos) {
                let chunk = data.slice(headerPos);
                this.bodySize += chunk.length;
                // this would be the first chunk of data sent downstream
                setImmediate(()=>this.push(chunk));
            }
            return false;
        } else {
            this.headerBytes += data.length;
            this.headerChunks.push(data);
        }
        // store last 4 bytes to catch header break
        this.updateLastBytes(data);
        return false;
    }
    _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
            return callback();
        }
        if (typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
        }
        let headersFound;
        try {
            headersFound = this.checkHeaders(chunk);
        } catch (E) {
            return callback(E);
        }
        if (headersFound) {
            this.bodySize += chunk.length;
            this.push(chunk);
        }
        setImmediate(callback);
    }
    _flush(callback) {
        if (this.headerChunks) {
            let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
            this.bodySize += chunk.length;
            this.push(chunk);
            this.headerChunks = null;
        }
        callback();
    }
    parseHeaders() {
        let lines = (this.rawHeaders || '').toString().split(/\r?\n/);
        for(let i = lines.length - 1; i > 0; i--){
            if (/^\s/.test(lines[i])) {
                lines[i - 1] += '\n' + lines[i];
                lines.splice(i, 1);
            }
        }
        return lines.filter((line)=>line.trim()).map((line)=>({
                key: line.substr(0, line.indexOf(':')).trim().toLowerCase(),
                line
            }));
    }
}
module.exports = MessageParser;
}),
"[project]/node_modules/nodemailer/lib/dkim/relaxed-body.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// streams through a message body and calculates relaxed body hash
const Transform = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Transform;
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
class RelaxedBody extends Transform {
    constructor(options){
        super();
        options = options || {};
        this.chunkBuffer = [];
        this.chunkBufferLen = 0;
        this.bodyHash = crypto.createHash(options.hashAlgo || 'sha1');
        this.remainder = '';
        this.byteLength = 0;
        this.debug = options.debug;
        this._debugBody = options.debug ? [] : false;
    }
    updateHash(chunk) {
        let bodyStr;
        // find next remainder
        let nextRemainder = '';
        // This crux finds and removes the spaces from the last line and the newline characters after the last non-empty line
        // If we get another chunk that does not match this description then we can restore the previously processed data
        let state = 'file';
        for(let i = chunk.length - 1; i >= 0; i--){
            let c = chunk[i];
            if (state === 'file' && (c === 0x0a || c === 0x0d)) {
            // do nothing, found \n or \r at the end of chunk, stil end of file
            } else if (state === 'file' && (c === 0x09 || c === 0x20)) {
                // switch to line ending mode, this is the last non-empty line
                state = 'line';
            } else if (state === 'line' && (c === 0x09 || c === 0x20)) {
            // do nothing, found ' ' or \t at the end of line, keep processing the last non-empty line
            } else if (state === 'file' || state === 'line') {
                // non line/file ending character found, switch to body mode
                state = 'body';
                if (i === chunk.length - 1) {
                    break;
                }
            }
            if (i === 0) {
                // reached to the beginning of the chunk, check if it is still about the ending
                // and if the remainder also matches
                if (state === 'file' && (!this.remainder || /[\r\n]$/.test(this.remainder)) || state === 'line' && (!this.remainder || /[ \t]$/.test(this.remainder))) {
                    // keep everything
                    this.remainder += chunk.toString('binary');
                    return;
                } else if (state === 'line' || state === 'file') {
                    // process existing remainder as normal line but store the current chunk
                    nextRemainder = chunk.toString('binary');
                    chunk = false;
                    break;
                }
            }
            if (state !== 'body') {
                continue;
            }
            // reached first non ending byte
            nextRemainder = chunk.slice(i + 1).toString('binary');
            chunk = chunk.slice(0, i + 1);
            break;
        }
        let needsFixing = !!this.remainder;
        if (chunk && !needsFixing) {
            // check if we even need to change anything
            for(let i = 0, len = chunk.length; i < len; i++){
                if (i && chunk[i] === 0x0a && chunk[i - 1] !== 0x0d) {
                    // missing \r before \n
                    needsFixing = true;
                    break;
                } else if (i && chunk[i] === 0x0d && chunk[i - 1] === 0x20) {
                    // trailing WSP found
                    needsFixing = true;
                    break;
                } else if (i && chunk[i] === 0x20 && chunk[i - 1] === 0x20) {
                    // multiple spaces found, needs to be replaced with just one
                    needsFixing = true;
                    break;
                } else if (chunk[i] === 0x09) {
                    // TAB found, needs to be replaced with a space
                    needsFixing = true;
                    break;
                }
            }
        }
        if (needsFixing) {
            bodyStr = this.remainder + (chunk ? chunk.toString('binary') : '');
            this.remainder = nextRemainder;
            bodyStr = bodyStr.replace(/\r?\n/g, '\n') // use js line endings
            .replace(/[ \t]*$/gm, '') // remove line endings, rtrim
            .replace(/[ \t]+/gm, ' ') // single spaces
            .replace(/\n/g, '\r\n'); // restore rfc822 line endings
            chunk = Buffer.from(bodyStr, 'binary');
        } else if (nextRemainder) {
            this.remainder = nextRemainder;
        }
        if (this.debug) {
            this._debugBody.push(chunk);
        }
        this.bodyHash.update(chunk);
    }
    _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
            return callback();
        }
        if (typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
        }
        this.updateHash(chunk);
        this.byteLength += chunk.length;
        this.push(chunk);
        callback();
    }
    _flush(callback) {
        // generate final hash and emit it
        if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
            // add terminating line end
            this.bodyHash.update(Buffer.from('\r\n'));
        }
        if (!this.byteLength) {
            // emit empty line buffer to keep the stream flowing
            this.push(Buffer.from('\r\n'));
        // this.bodyHash.update(Buffer.from('\r\n'));
        }
        this.emit('hash', this.bodyHash.digest('base64'), this.debug ? Buffer.concat(this._debugBody) : false);
        callback();
    }
}
module.exports = RelaxedBody;
}),
"[project]/node_modules/nodemailer/lib/dkim/sign.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const punycode = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/punycode/index.js [app-rsc] (ecmascript)");
const mimeFuncs = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-funcs/index.js [app-rsc] (ecmascript)");
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
/**
 * Returns DKIM signature header line
 *
 * @param {Object} headers Parsed headers object from MessageParser
 * @param {String} bodyHash Base64 encoded hash of the message
 * @param {Object} options DKIM options
 * @param {String} options.domainName Domain name to be signed for
 * @param {String} options.keySelector DKIM key selector to use
 * @param {String} options.privateKey DKIM private key to use
 * @return {String} Complete header line
 */ module.exports = (headers, hashAlgo, bodyHash, options)=>{
    options = options || {};
    // all listed fields from RFC4871 #5.5
    let defaultFieldNames = 'From:Sender:Reply-To:Subject:Date:Message-ID:To:' + 'Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:' + 'Content-Description:Resent-Date:Resent-From:Resent-Sender:' + 'Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:' + 'List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:' + 'List-Owner:List-Archive';
    let fieldNames = options.headerFieldNames || defaultFieldNames;
    let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
    let dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
    let signer, signature;
    canonicalizedHeaderData.headers += 'dkim-signature:' + relaxedHeaderLine(dkimHeader);
    signer = crypto.createSign(('rsa-' + hashAlgo).toUpperCase());
    signer.update(canonicalizedHeaderData.headers);
    try {
        signature = signer.sign(options.privateKey, 'base64');
    } catch (_E) {
        return false;
    }
    return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, '$&\r\n ').trim();
};
module.exports.relaxedHeaders = relaxedHeaders;
function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
    let dkim = [
        'v=1',
        'a=rsa-' + hashAlgo,
        'c=relaxed/relaxed',
        'd=' + punycode.toASCII(domainName),
        'q=dns/txt',
        's=' + keySelector,
        'bh=' + bodyHash,
        'h=' + fieldNames
    ].join('; ');
    return mimeFuncs.foldLines('DKIM-Signature: ' + dkim, 76) + ';\r\n b=';
}
function relaxedHeaders(headers, fieldNames, skipFields) {
    let includedFields = new Set();
    let skip = new Set();
    let headerFields = new Map();
    (skipFields || '').toLowerCase().split(':').forEach((field)=>{
        skip.add(field.trim());
    });
    (fieldNames || '').toLowerCase().split(':').filter((field)=>!skip.has(field.trim())).forEach((field)=>{
        includedFields.add(field.trim());
    });
    for(let i = headers.length - 1; i >= 0; i--){
        let line = headers[i];
        // only include the first value from bottom to top
        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
            headerFields.set(line.key, relaxedHeaderLine(line.line));
        }
    }
    let headersList = [];
    let fields = [];
    includedFields.forEach((field)=>{
        if (headerFields.has(field)) {
            fields.push(field);
            headersList.push(field + ':' + headerFields.get(field));
        }
    });
    return {
        headers: headersList.join('\r\n') + '\r\n',
        fieldNames: fields.join(':')
    };
}
function relaxedHeaderLine(line) {
    return line.substr(line.indexOf(':') + 1).replace(/\r?\n/g, '').replace(/\s+/g, ' ').trim();
}
}),
"[project]/node_modules/nodemailer/lib/dkim/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// FIXME:
// replace this Transform mess with a method that pipes input argument to output argument
const MessageParser = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/dkim/message-parser.js [app-rsc] (ecmascript)");
const RelaxedBody = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/dkim/relaxed-body.js [app-rsc] (ecmascript)");
const sign = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/dkim/sign.js [app-rsc] (ecmascript)");
const PassThrough = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").PassThrough;
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const DKIM_ALGO = 'sha256';
const MAX_MESSAGE_SIZE = 2 * 1024 * 1024; // buffer messages larger than this to disk
/*
// Usage:

let dkim = new DKIM({
    domainName: 'example.com',
    keySelector: 'key-selector',
    privateKey,
    cacheDir: '/tmp'
});
dkim.sign(input).pipe(process.stdout);

// Where inputStream is a rfc822 message (either a stream, string or Buffer)
// and outputStream is a DKIM signed rfc822 message
*/ class DKIMSigner {
    constructor(options, keys, input, output){
        this.options = options || {};
        this.keys = keys;
        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
        this.cacheDir = this.options.cacheDir || false;
        this.chunks = [];
        this.chunklen = 0;
        this.readPos = 0;
        this.cachePath = this.cacheDir ? path.join(this.cacheDir, 'message.' + Date.now() + '-' + crypto.randomBytes(14).toString('hex')) : false;
        this.cache = false;
        this.headers = false;
        this.bodyHash = false;
        this.parser = false;
        this.relaxedBody = false;
        this.input = input;
        this.output = output;
        this.output.usingCache = false;
        this.hasErrored = false;
        this.input.on('error', (err)=>{
            this.hasErrored = true;
            this.cleanup();
            output.emit('error', err);
        });
    }
    cleanup() {
        if (!this.cache || !this.cachePath) {
            return;
        }
        fs.unlink(this.cachePath, ()=>false);
    }
    createReadCache() {
        // pipe remainings to cache file
        this.cache = fs.createReadStream(this.cachePath);
        this.cache.once('error', (err)=>{
            this.cleanup();
            this.output.emit('error', err);
        });
        this.cache.once('close', ()=>{
            this.cleanup();
        });
        this.cache.pipe(this.output);
    }
    sendNextChunk() {
        if (this.hasErrored) {
            return;
        }
        if (this.readPos >= this.chunks.length) {
            if (!this.cache) {
                return this.output.end();
            }
            return this.createReadCache();
        }
        let chunk = this.chunks[this.readPos++];
        if (this.output.write(chunk) === false) {
            return this.output.once('drain', ()=>{
                this.sendNextChunk();
            });
        }
        setImmediate(()=>this.sendNextChunk());
    }
    sendSignedOutput() {
        let keyPos = 0;
        let signNextKey = ()=>{
            if (keyPos >= this.keys.length) {
                this.output.write(this.parser.rawHeaders);
                return setImmediate(()=>this.sendNextChunk());
            }
            let key = this.keys[keyPos++];
            let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
                domainName: key.domainName,
                keySelector: key.keySelector,
                privateKey: key.privateKey,
                headerFieldNames: this.options.headerFieldNames,
                skipFields: this.options.skipFields
            });
            if (dkimField) {
                this.output.write(Buffer.from(dkimField + '\r\n'));
            }
            return setImmediate(signNextKey);
        };
        if (this.bodyHash && this.headers) {
            return signNextKey();
        }
        this.output.write(this.parser.rawHeaders);
        this.sendNextChunk();
    }
    createWriteCache() {
        this.output.usingCache = true;
        // pipe remainings to cache file
        this.cache = fs.createWriteStream(this.cachePath);
        this.cache.once('error', (err)=>{
            this.cleanup();
            // drain input
            this.relaxedBody.unpipe(this.cache);
            this.relaxedBody.on('readable', ()=>{
                while(this.relaxedBody.read() !== null){
                // do nothing
                }
            });
            this.hasErrored = true;
            // emit error
            this.output.emit('error', err);
        });
        this.cache.once('close', ()=>{
            this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners('readable');
        this.relaxedBody.pipe(this.cache);
    }
    signStream() {
        this.parser = new MessageParser();
        this.relaxedBody = new RelaxedBody({
            hashAlgo: this.hashAlgo
        });
        this.parser.on('headers', (value)=>{
            this.headers = value;
        });
        this.relaxedBody.on('hash', (value)=>{
            this.bodyHash = value;
        });
        this.relaxedBody.on('readable', ()=>{
            let chunk;
            if (this.cache) {
                return;
            }
            while((chunk = this.relaxedBody.read()) !== null){
                this.chunks.push(chunk);
                this.chunklen += chunk.length;
                if (this.chunklen >= this.cacheTreshold && this.cachePath) {
                    return this.createWriteCache();
                }
            }
        });
        this.relaxedBody.on('end', ()=>{
            if (this.cache) {
                return;
            }
            this.sendSignedOutput();
        });
        this.parser.pipe(this.relaxedBody);
        setImmediate(()=>this.input.pipe(this.parser));
    }
}
class DKIM {
    constructor(options){
        this.options = options || {};
        this.keys = [].concat(this.options.keys || {
            domainName: options.domainName,
            keySelector: options.keySelector,
            privateKey: options.privateKey
        });
    }
    sign(input, extraOptions) {
        let output = new PassThrough();
        let inputStream = input;
        let writeValue = false;
        if (Buffer.isBuffer(input)) {
            writeValue = input;
            inputStream = new PassThrough();
        } else if (typeof input === 'string') {
            writeValue = Buffer.from(input);
            inputStream = new PassThrough();
        }
        let options = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
            options = {};
            Object.keys(this.options || {}).forEach((key)=>{
                options[key] = this.options[key];
            });
            Object.keys(extraOptions || {}).forEach((key)=>{
                if (!(key in options)) {
                    options[key] = extraOptions[key];
                }
            });
        }
        let signer = new DKIMSigner(options, this.keys, inputStream, output);
        setImmediate(()=>{
            signer.signStream();
            if (writeValue) {
                setImmediate(()=>{
                    inputStream.end(writeValue);
                });
            }
        });
        return output;
    }
}
module.exports = DKIM;
}),
"[project]/node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Minimal HTTP/S proxy client
 */ const net = __turbopack_context__.r("[externals]/net [external] (net, cjs)");
const tls = __turbopack_context__.r("[externals]/tls [external] (tls, cjs)");
const urllib = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
/**
 * Establishes proxied connection to destinationPort
 *
 * httpProxyClient("http://localhost:3128/", 80, "google.com", function(err, socket){
 *     socket.write("GET / HTTP/1.0\r\n\r\n");
 * });
 *
 * @param {String} proxyUrl proxy configuration, etg "http://proxy.host:3128/"
 * @param {Number} destinationPort Port to open in destination host
 * @param {String} destinationHost Destination hostname
 * @param {Function} callback Callback to run with the rocket object once connection is established
 */ function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
    let proxy = urllib.parse(proxyUrl);
    // create a socket connection to the proxy server
    let options;
    let connect;
    let socket;
    options = {
        host: proxy.hostname,
        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === 'https:' ? 443 : 80
    };
    if (proxy.protocol === 'https:') {
        // we can use untrusted proxies as long as we verify actual SMTP certificates
        options.rejectUnauthorized = false;
        connect = tls.connect.bind(tls);
    } else {
        connect = net.connect.bind(net);
    }
    // Error harness for initial connection. Once connection is established, the responsibility
    // to handle errors is passed to whoever uses this socket
    let finished = false;
    let tempSocketErr = (err)=>{
        if (finished) {
            return;
        }
        finished = true;
        try {
            socket.destroy();
        } catch (_E) {
        // ignore
        }
        callback(err);
    };
    let timeoutErr = ()=>{
        let err = new Error('Proxy socket timed out');
        err.code = 'ETIMEDOUT';
        tempSocketErr(err);
    };
    socket = connect(options, ()=>{
        if (finished) {
            return;
        }
        let reqHeaders = {
            Host: destinationHost + ':' + destinationPort,
            Connection: 'close'
        };
        if (proxy.auth) {
            reqHeaders['Proxy-Authorization'] = 'Basic ' + Buffer.from(proxy.auth).toString('base64');
        }
        socket.write(// HTTP method
        'CONNECT ' + destinationHost + ':' + destinationPort + ' HTTP/1.1\r\n' + // HTTP request headers
        Object.keys(reqHeaders).map((key)=>key + ': ' + reqHeaders[key]).join('\r\n') + // End request
        '\r\n\r\n');
        let headers = '';
        let onSocketData = (chunk)=>{
            let match;
            let remainder;
            if (finished) {
                return;
            }
            headers += chunk.toString('binary');
            if (match = headers.match(/\r\n\r\n/)) {
                socket.removeListener('data', onSocketData);
                remainder = headers.substr(match.index + match[0].length);
                headers = headers.substr(0, match.index);
                if (remainder) {
                    socket.unshift(Buffer.from(remainder, 'binary'));
                }
                // proxy connection is now established
                finished = true;
                // check response code
                match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
                if (!match || (match[1] || '').charAt(0) !== '2') {
                    try {
                        socket.destroy();
                    } catch (_E) {
                    // ignore
                    }
                    return callback(new Error('Invalid response from proxy' + (match && ': ' + match[1] || '')));
                }
                socket.removeListener('error', tempSocketErr);
                socket.removeListener('timeout', timeoutErr);
                socket.setTimeout(0);
                return callback(null, socket);
            }
        };
        socket.on('data', onSocketData);
    });
    socket.setTimeout(httpProxyClient.timeout || 30 * 1000);
    socket.on('timeout', timeoutErr);
    socket.once('error', tempSocketErr);
}
module.exports = httpProxyClient;
}),
"[project]/node_modules/nodemailer/lib/mailer/mail-message.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
const MimeNode = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-node/index.js [app-rsc] (ecmascript)");
const mimeFuncs = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-funcs/index.js [app-rsc] (ecmascript)");
class MailMessage {
    constructor(mailer, data){
        this.mailer = mailer;
        this.data = {};
        this.message = null;
        data = data || {};
        let options = mailer.options || {};
        let defaults = mailer._defaults || {};
        Object.keys(data).forEach((key)=>{
            this.data[key] = data[key];
        });
        this.data.headers = this.data.headers || {};
        // apply defaults
        Object.keys(defaults).forEach((key)=>{
            if (!(key in this.data)) {
                this.data[key] = defaults[key];
            } else if (key === 'headers') {
                // headers is a special case. Allow setting individual default headers
                Object.keys(defaults.headers).forEach((key)=>{
                    if (!(key in this.data.headers)) {
                        this.data.headers[key] = defaults.headers[key];
                    }
                });
            }
        });
        // force specific keys from transporter options
        [
            'disableFileAccess',
            'disableUrlAccess',
            'normalizeHeaderKey'
        ].forEach((key)=>{
            if (key in options) {
                this.data[key] = options[key];
            }
        });
    }
    resolveContent(...args) {
        return shared.resolveContent(...args);
    }
    resolveAll(callback) {
        let keys = [
            [
                this.data,
                'html'
            ],
            [
                this.data,
                'text'
            ],
            [
                this.data,
                'watchHtml'
            ],
            [
                this.data,
                'amp'
            ],
            [
                this.data,
                'icalEvent'
            ]
        ];
        if (this.data.alternatives && this.data.alternatives.length) {
            this.data.alternatives.forEach((alternative, i)=>{
                keys.push([
                    this.data.alternatives,
                    i
                ]);
            });
        }
        if (this.data.attachments && this.data.attachments.length) {
            this.data.attachments.forEach((attachment, i)=>{
                if (!attachment.filename) {
                    attachment.filename = (attachment.path || attachment.href || '').split('/').pop().split('?').shift() || 'attachment-' + (i + 1);
                    if (attachment.filename.indexOf('.') < 0) {
                        attachment.filename += '.' + mimeFuncs.detectExtension(attachment.contentType);
                    }
                }
                if (!attachment.contentType) {
                    attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || 'bin');
                }
                keys.push([
                    this.data.attachments,
                    i
                ]);
            });
        }
        let mimeNode = new MimeNode();
        let addressKeys = [
            'from',
            'to',
            'cc',
            'bcc',
            'sender',
            'replyTo'
        ];
        addressKeys.forEach((address)=>{
            let value;
            if (this.message) {
                value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === 'replyTo' ? 'reply-to' : address)) || []);
            } else if (this.data[address]) {
                value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
            }
            if (value && value.length) {
                this.data[address] = value;
            } else if (address in this.data) {
                this.data[address] = null;
            }
        });
        let singleKeys = [
            'from',
            'sender'
        ];
        singleKeys.forEach((address)=>{
            if (this.data[address]) {
                this.data[address] = this.data[address].shift();
            }
        });
        let pos = 0;
        let resolveNext = ()=>{
            if (pos >= keys.length) {
                return callback(null, this.data);
            }
            let args = keys[pos++];
            if (!args[0] || !args[0][args[1]]) {
                return resolveNext();
            }
            shared.resolveContent(...args, (err, value)=>{
                if (err) {
                    return callback(err);
                }
                let node = {
                    content: value
                };
                if (args[0][args[1]] && typeof args[0][args[1]] === 'object' && !Buffer.isBuffer(args[0][args[1]])) {
                    Object.keys(args[0][args[1]]).forEach((key)=>{
                        if (!(key in node) && ![
                            'content',
                            'path',
                            'href',
                            'raw'
                        ].includes(key)) {
                            node[key] = args[0][args[1]][key];
                        }
                    });
                }
                args[0][args[1]] = node;
                resolveNext();
            });
        };
        setImmediate(()=>resolveNext());
    }
    normalize(callback) {
        let envelope = this.data.envelope || this.message.getEnvelope();
        let messageId = this.message.messageId();
        this.resolveAll((err, data)=>{
            if (err) {
                return callback(err);
            }
            data.envelope = envelope;
            data.messageId = messageId;
            [
                'html',
                'text',
                'watchHtml',
                'amp'
            ].forEach((key)=>{
                if (data[key] && data[key].content) {
                    if (typeof data[key].content === 'string') {
                        data[key] = data[key].content;
                    } else if (Buffer.isBuffer(data[key].content)) {
                        data[key] = data[key].content.toString();
                    }
                }
            });
            if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
                data.icalEvent.content = data.icalEvent.content.toString('base64');
                data.icalEvent.encoding = 'base64';
            }
            if (data.alternatives && data.alternatives.length) {
                data.alternatives.forEach((alternative)=>{
                    if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
                        alternative.content = alternative.content.toString('base64');
                        alternative.encoding = 'base64';
                    }
                });
            }
            if (data.attachments && data.attachments.length) {
                data.attachments.forEach((attachment)=>{
                    if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
                        attachment.content = attachment.content.toString('base64');
                        attachment.encoding = 'base64';
                    }
                });
            }
            data.normalizedHeaders = {};
            Object.keys(data.headers || {}).forEach((key)=>{
                let value = [].concat(data.headers[key] || []).shift();
                value = value && value.value || value;
                if (value) {
                    if ([
                        'references',
                        'in-reply-to',
                        'message-id',
                        'content-id'
                    ].includes(key)) {
                        value = this.message._encodeHeaderValue(key, value);
                    }
                    data.normalizedHeaders[key] = value;
                }
            });
            if (data.list && typeof data.list === 'object') {
                let listHeaders = this._getListHeaders(data.list);
                listHeaders.forEach((entry)=>{
                    data.normalizedHeaders[entry.key] = entry.value.map((val)=>val && val.value || val).join(', ');
                });
            }
            if (data.references) {
                data.normalizedHeaders.references = this.message._encodeHeaderValue('references', data.references);
            }
            if (data.inReplyTo) {
                data.normalizedHeaders['in-reply-to'] = this.message._encodeHeaderValue('in-reply-to', data.inReplyTo);
            }
            return callback(null, data);
        });
    }
    setMailerHeader() {
        if (!this.message || !this.data.xMailer) {
            return;
        }
        this.message.setHeader('X-Mailer', this.data.xMailer);
    }
    setPriorityHeaders() {
        if (!this.message || !this.data.priority) {
            return;
        }
        switch((this.data.priority || '').toString().toLowerCase()){
            case 'high':
                this.message.setHeader('X-Priority', '1 (Highest)');
                this.message.setHeader('X-MSMail-Priority', 'High');
                this.message.setHeader('Importance', 'High');
                break;
            case 'low':
                this.message.setHeader('X-Priority', '5 (Lowest)');
                this.message.setHeader('X-MSMail-Priority', 'Low');
                this.message.setHeader('Importance', 'Low');
                break;
            default:
        }
    }
    setListHeaders() {
        if (!this.message || !this.data.list || typeof this.data.list !== 'object') {
            return;
        }
        // add optional List-* headers
        if (this.data.list && typeof this.data.list === 'object') {
            this._getListHeaders(this.data.list).forEach((listHeader)=>{
                listHeader.value.forEach((value)=>{
                    this.message.addHeader(listHeader.key, value);
                });
            });
        }
    }
    _getListHeaders(listData) {
        // make sure an url looks like <protocol:url>
        return Object.keys(listData).map((key)=>({
                key: 'list-' + key.toLowerCase().trim(),
                value: [].concat(listData[key] || []).map((value)=>({
                        prepared: true,
                        foldLines: true,
                        value: [].concat(value || []).map((value)=>{
                            if (typeof value === 'string') {
                                value = {
                                    url: value
                                };
                            }
                            if (value && value.url) {
                                if (key.toLowerCase().trim() === 'id') {
                                    // List-ID: "comment" <domain>
                                    let comment = value.comment || '';
                                    if (mimeFuncs.isPlainText(comment)) {
                                        comment = '"' + comment + '"';
                                    } else {
                                        comment = mimeFuncs.encodeWord(comment);
                                    }
                                    return (value.comment ? comment + ' ' : '') + this._formatListUrl(value.url).replace(/^<[^:]+\/{,2}/, '');
                                }
                                // List-*: <http://domain> (comment)
                                let comment = value.comment || '';
                                if (!mimeFuncs.isPlainText(comment)) {
                                    comment = mimeFuncs.encodeWord(comment);
                                }
                                return this._formatListUrl(value.url) + (value.comment ? ' (' + comment + ')' : '');
                            }
                            return '';
                        }).filter((value)=>value).join(', ')
                    }))
            }));
    }
    _formatListUrl(url) {
        url = url.replace(/[\s<]+|[\s>]+/g, '');
        if (/^(https?|mailto|ftp):/.test(url)) {
            return '<' + url + '>';
        }
        if (/^[^@]+@[^@]+$/.test(url)) {
            return '<mailto:' + url + '>';
        }
        return '<http://' + url + '>';
    }
}
module.exports = MailMessage;
}),
"[project]/node_modules/nodemailer/lib/mailer/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
const mimeTypes = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-funcs/mime-types.js [app-rsc] (ecmascript)");
const MailComposer = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mail-composer/index.js [app-rsc] (ecmascript)");
const DKIM = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/dkim/index.js [app-rsc] (ecmascript)");
const httpProxyClient = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js [app-rsc] (ecmascript)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const urllib = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const MailMessage = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mailer/mail-message.js [app-rsc] (ecmascript)");
const net = __turbopack_context__.r("[externals]/net [external] (net, cjs)");
const dns = __turbopack_context__.r("[externals]/dns [external] (dns, cjs)");
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
/**
 * Creates an object for exposing the Mail API
 *
 * @constructor
 * @param {Object} transporter Transport object instance to pass the mails to
 */ class Mail extends EventEmitter {
    constructor(transporter, options, defaults){
        super();
        this.options = options || {};
        this._defaults = defaults || {};
        this._defaultPlugins = {
            compile: [
                (...args)=>this._convertDataImages(...args)
            ],
            stream: []
        };
        this._userPlugins = {
            compile: [],
            stream: []
        };
        this.meta = new Map();
        this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;
        this.transporter = transporter;
        this.transporter.mailer = this;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'mail'
        });
        this.logger.debug({
            tnx: 'create'
        }, 'Creating transport: %s', this.getVersionString());
        // setup emit handlers for the transporter
        if (typeof this.transporter.on === 'function') {
            // deprecated log interface
            this.transporter.on('log', (log)=>{
                this.logger.debug({
                    tnx: 'transport'
                }, '%s: %s', log.type, log.message);
            });
            // transporter errors
            this.transporter.on('error', (err)=>{
                this.logger.error({
                    err,
                    tnx: 'transport'
                }, 'Transport Error: %s', err.message);
                this.emit('error', err);
            });
            // indicates if the sender has became idle
            this.transporter.on('idle', (...args)=>{
                this.emit('idle', ...args);
            });
            // indicates if the sender has became idle and all connections are terminated
            this.transporter.on('clear', (...args)=>{
                this.emit('clear', ...args);
            });
        }
        /**
         * Optional methods passed to the underlying transport object
         */ [
            'close',
            'isIdle',
            'verify'
        ].forEach((method)=>{
            this[method] = (...args)=>{
                if (typeof this.transporter[method] === 'function') {
                    if (method === 'verify' && typeof this.getSocket === 'function') {
                        this.transporter.getSocket = this.getSocket;
                        this.getSocket = false;
                    }
                    return this.transporter[method](...args);
                } else {
                    this.logger.warn({
                        tnx: 'transport',
                        methodName: method
                    }, 'Non existing method %s called for transport', method);
                    return false;
                }
            };
        });
        // setup proxy handling
        if (this.options.proxy && typeof this.options.proxy === 'string') {
            this.setupProxy(this.options.proxy);
        }
    }
    use(step, plugin) {
        step = (step || '').toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
            this._userPlugins[step] = [
                plugin
            ];
        } else {
            this._userPlugins[step].push(plugin);
        }
        return this;
    }
    /**
     * Sends an email using the preselected transport object
     *
     * @param {Object} data E-data description
     * @param {Function?} callback Callback to run once the sending succeeded or failed
     */ sendMail(data, callback = null) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject)=>{
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        if (typeof this.getSocket === 'function') {
            this.transporter.getSocket = this.getSocket;
            this.getSocket = false;
        }
        let mail = new MailMessage(this, data);
        this.logger.debug({
            tnx: 'transport',
            name: this.transporter.name,
            version: this.transporter.version,
            action: 'send'
        }, 'Sending mail using %s/%s', this.transporter.name, this.transporter.version);
        this._processPlugins('compile', mail, (err)=>{
            if (err) {
                this.logger.error({
                    err,
                    tnx: 'plugin',
                    action: 'compile'
                }, 'PluginCompile Error: %s', err.message);
                return callback(err);
            }
            mail.message = new MailComposer(mail.data).compile();
            mail.setMailerHeader();
            mail.setPriorityHeaders();
            mail.setListHeaders();
            this._processPlugins('stream', mail, (err)=>{
                if (err) {
                    this.logger.error({
                        err,
                        tnx: 'plugin',
                        action: 'stream'
                    }, 'PluginStream Error: %s', err.message);
                    return callback(err);
                }
                if (mail.data.dkim || this.dkim) {
                    mail.message.processFunc((input)=>{
                        let dkim = mail.data.dkim ? new DKIM(mail.data.dkim) : this.dkim;
                        this.logger.debug({
                            tnx: 'DKIM',
                            messageId: mail.message.messageId(),
                            dkimDomains: dkim.keys.map((key)=>key.keySelector + '.' + key.domainName).join(', ')
                        }, 'Signing outgoing message with %s keys', dkim.keys.length);
                        return dkim.sign(input, mail.data._dkim);
                    });
                }
                this.transporter.send(mail, (...args)=>{
                    if (args[0]) {
                        this.logger.error({
                            err: args[0],
                            tnx: 'transport',
                            action: 'send'
                        }, 'Send Error: %s', args[0].message);
                    }
                    callback(...args);
                });
            });
        });
        return promise;
    }
    getVersionString() {
        return util.format('%s (%s; +%s; %s/%s)', packageData.name, packageData.version, packageData.homepage, this.transporter.name, this.transporter.version);
    }
    _processPlugins(step, mail, callback) {
        step = (step || '').toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
            return callback();
        }
        let userPlugins = this._userPlugins[step] || [];
        let defaultPlugins = this._defaultPlugins[step] || [];
        if (userPlugins.length) {
            this.logger.debug({
                tnx: 'transaction',
                pluginCount: userPlugins.length,
                step
            }, 'Using %s plugins for %s', userPlugins.length, step);
        }
        if (userPlugins.length + defaultPlugins.length === 0) {
            return callback();
        }
        let pos = 0;
        let block = 'default';
        let processPlugins = ()=>{
            let curplugins = block === 'default' ? defaultPlugins : userPlugins;
            if (pos >= curplugins.length) {
                if (block === 'default' && userPlugins.length) {
                    block = 'user';
                    pos = 0;
                    curplugins = userPlugins;
                } else {
                    return callback();
                }
            }
            let plugin = curplugins[pos++];
            plugin(mail, (err)=>{
                if (err) {
                    return callback(err);
                }
                processPlugins();
            });
        };
        processPlugins();
    }
    /**
     * Sets up proxy handler for a Nodemailer object
     *
     * @param {String} proxyUrl Proxy configuration url
     */ setupProxy(proxyUrl) {
        let proxy = urllib.parse(proxyUrl);
        // setup socket handler for the mailer object
        this.getSocket = (options, callback)=>{
            let protocol = proxy.protocol.replace(/:$/, '').toLowerCase();
            if (this.meta.has('proxy_handler_' + protocol)) {
                return this.meta.get('proxy_handler_' + protocol)(proxy, options, callback);
            }
            switch(protocol){
                // Connect using a HTTP CONNECT method
                case 'http':
                case 'https':
                    httpProxyClient(proxy.href, options.port, options.host, (err, socket)=>{
                        if (err) {
                            return callback(err);
                        }
                        return callback(null, {
                            connection: socket
                        });
                    });
                    return;
                case 'socks':
                case 'socks5':
                case 'socks4':
                case 'socks4a':
                    {
                        if (!this.meta.has('proxy_socks_module')) {
                            return callback(new Error('Socks module not loaded'));
                        }
                        let connect = (ipaddress)=>{
                            let proxyV2 = !!this.meta.get('proxy_socks_module').SocksClient;
                            let socksClient = proxyV2 ? this.meta.get('proxy_socks_module').SocksClient : this.meta.get('proxy_socks_module');
                            let proxyType = Number(proxy.protocol.replace(/\D/g, '')) || 5;
                            let connectionOpts = {
                                proxy: {
                                    ipaddress,
                                    port: Number(proxy.port),
                                    type: proxyType
                                },
                                [proxyV2 ? 'destination' : 'target']: {
                                    host: options.host,
                                    port: options.port
                                },
                                command: 'connect'
                            };
                            if (proxy.auth) {
                                let username = decodeURIComponent(proxy.auth.split(':').shift());
                                let password = decodeURIComponent(proxy.auth.split(':').pop());
                                if (proxyV2) {
                                    connectionOpts.proxy.userId = username;
                                    connectionOpts.proxy.password = password;
                                } else if (proxyType === 4) {
                                    connectionOpts.userid = username;
                                } else {
                                    connectionOpts.authentication = {
                                        username,
                                        password
                                    };
                                }
                            }
                            socksClient.createConnection(connectionOpts, (err, info)=>{
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                    connection: info.socket || info
                                });
                            });
                        };
                        if (net.isIP(proxy.hostname)) {
                            return connect(proxy.hostname);
                        }
                        return dns.resolve(proxy.hostname, (err, address)=>{
                            if (err) {
                                return callback(err);
                            }
                            connect(Array.isArray(address) ? address[0] : address);
                        });
                    }
            }
            callback(new Error('Unknown proxy configuration'));
        };
    }
    _convertDataImages(mail, callback) {
        if (!this.options.attachDataUrls && !mail.data.attachDataUrls || !mail.data.html) {
            return callback();
        }
        mail.resolveContent(mail.data, 'html', (err, html)=>{
            if (err) {
                return callback(err);
            }
            let cidCounter = 0;
            html = (html || '').toString().replace(/(<img\b[^<>]{0,1024} src\s{0,20}=[\s"']{0,20})(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType)=>{
                let cid = crypto.randomBytes(10).toString('hex') + '@localhost';
                if (!mail.data.attachments) {
                    mail.data.attachments = [];
                }
                if (!Array.isArray(mail.data.attachments)) {
                    mail.data.attachments = [].concat(mail.data.attachments || []);
                }
                mail.data.attachments.push({
                    path: dataUri,
                    cid,
                    filename: 'image-' + ++cidCounter + '.' + mimeTypes.detectExtension(mimeType)
                });
                return prefix + 'cid:' + cid;
            });
            mail.data.html = html;
            callback();
        });
    }
    set(key, value) {
        return this.meta.set(key, value);
    }
    get(key) {
        return this.meta.get(key);
    }
}
module.exports = Mail;
}),
"[project]/node_modules/nodemailer/lib/smtp-connection/data-stream.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const Transform = stream.Transform;
/**
 * Escapes dots in the beginning of lines. Ends the stream with <CR><LF>.<CR><LF>
 * Also makes sure that only <CR><LF> sequences are used for linebreaks
 *
 * @param {Object} options Stream options
 */ class DataStream extends Transform {
    constructor(options){
        super(options);
        // init Transform
        this.options = options || {};
        this._curLine = '';
        this.inByteCount = 0;
        this.outByteCount = 0;
        this.lastByte = false;
    }
    /**
     * Escapes dots
     */ _transform(chunk, encoding, done) {
        let chunks = [];
        let chunklen = 0;
        let i, len, lastPos = 0;
        let buf;
        if (!chunk || !chunk.length) {
            return done();
        }
        if (typeof chunk === 'string') {
            chunk = Buffer.from(chunk);
        }
        this.inByteCount += chunk.length;
        for(i = 0, len = chunk.length; i < len; i++){
            if (chunk[i] === 0x2e) {
                // .
                if (i && chunk[i - 1] === 0x0a || !i && (!this.lastByte || this.lastByte === 0x0a)) {
                    buf = chunk.slice(lastPos, i + 1);
                    chunks.push(buf);
                    chunks.push(Buffer.from('.'));
                    chunklen += buf.length + 1;
                    lastPos = i + 1;
                }
            } else if (chunk[i] === 0x0a) {
                // .
                if (i && chunk[i - 1] !== 0x0d || !i && this.lastByte !== 0x0d) {
                    if (i > lastPos) {
                        buf = chunk.slice(lastPos, i);
                        chunks.push(buf);
                        chunklen += buf.length + 2;
                    } else {
                        chunklen += 2;
                    }
                    chunks.push(Buffer.from('\r\n'));
                    lastPos = i + 1;
                }
            }
        }
        if (chunklen) {
            // add last piece
            if (lastPos < chunk.length) {
                buf = chunk.slice(lastPos);
                chunks.push(buf);
                chunklen += buf.length;
            }
            this.outByteCount += chunklen;
            this.push(Buffer.concat(chunks, chunklen));
        } else {
            this.outByteCount += chunk.length;
            this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
    }
    /**
     * Finalizes the stream with a dot on a single line
     */ _flush(done) {
        let buf;
        if (this.lastByte === 0x0a) {
            buf = Buffer.from('.\r\n');
        } else if (this.lastByte === 0x0d) {
            buf = Buffer.from('\n.\r\n');
        } else {
            buf = Buffer.from('\r\n.\r\n');
        }
        this.outByteCount += buf.length;
        this.push(buf);
        done();
    }
}
module.exports = DataStream;
}),
"[project]/node_modules/nodemailer/lib/smtp-connection/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const packageInfo = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)").EventEmitter;
const net = __turbopack_context__.r("[externals]/net [external] (net, cjs)");
const tls = __turbopack_context__.r("[externals]/tls [external] (tls, cjs)");
const os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const DataStream = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-connection/data-stream.js [app-rsc] (ecmascript)");
const PassThrough = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").PassThrough;
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
// default timeout values in ms
const CONNECTION_TIMEOUT = 2 * 60 * 1000; // how much to wait for the connection to be established
const SOCKET_TIMEOUT = 10 * 60 * 1000; // how much to wait for socket inactivity before disconnecting the client
const GREETING_TIMEOUT = 30 * 1000; // how much to wait after connection is established but SMTP greeting is not receieved
const DNS_TIMEOUT = 30 * 1000; // how much to wait for resolveHostname
/**
 * Generates a SMTP connection object
 *
 * Optional options object takes the following possible properties:
 *
 *  * **port** - is the port to connect to (defaults to 587 or 465)
 *  * **host** - is the hostname or IP address to connect to (defaults to 'localhost')
 *  * **secure** - use SSL
 *  * **ignoreTLS** - ignore server support for STARTTLS
 *  * **requireTLS** - forces the client to use STARTTLS
 *  * **name** - the name of the client server
 *  * **localAddress** - outbound address to bind to (see: http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener)
 *  * **greetingTimeout** - Time to wait in ms until greeting message is received from the server (defaults to 10000)
 *  * **connectionTimeout** - how many milliseconds to wait for the connection to establish
 *  * **socketTimeout** - Time of inactivity until the connection is closed (defaults to 1 hour)
 *  * **dnsTimeout** - Time to wait in ms for the DNS requests to be resolved (defaults to 30 seconds)
 *  * **lmtp** - if true, uses LMTP instead of SMTP protocol
 *  * **logger** - bunyan compatible logger interface
 *  * **debug** - if true pass SMTP traffic to the logger
 *  * **tls** - options for createCredentials
 *  * **socket** - existing socket to use instead of creating a new one (see: http://nodejs.org/api/net.html#net_class_net_socket)
 *  * **secured** - boolean indicates that the provided socket has already been upgraded to tls
 *
 * @constructor
 * @namespace SMTP Client module
 * @param {Object} [options] Option properties
 */ class SMTPConnection extends EventEmitter {
    constructor(options){
        super(options);
        this.id = crypto.randomBytes(8).toString('base64').replace(/\W/g, '');
        this.stage = 'init';
        this.options = options || {};
        this.secureConnection = !!this.options.secure;
        this.alreadySecured = !!this.options.secured;
        this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
        this.host = this.options.host || 'localhost';
        this.servername = this.options.servername ? this.options.servername : !net.isIP(this.host) ? this.host : false;
        this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || false;
        if (typeof this.options.secure === 'undefined' && this.port === 465) {
            // if secure option is not set but port is 465, then default to secure
            this.secureConnection = true;
        }
        this.name = this.options.name || this._getHostname();
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'smtp-connection',
            sid: this.id
        });
        this.customAuth = new Map();
        Object.keys(this.options.customAuth || {}).forEach((key)=>{
            let mapKey = (key || '').toString().trim().toUpperCase();
            if (!mapKey) {
                return;
            }
            this.customAuth.set(mapKey, this.options.customAuth[key]);
        });
        /**
         * Expose version nr, just for the reference
         * @type {String}
         */ this.version = packageInfo.version;
        /**
         * If true, then the user is authenticated
         * @type {Boolean}
         */ this.authenticated = false;
        /**
         * If set to true, this instance is no longer active
         * @private
         */ this.destroyed = false;
        /**
         * Defines if the current connection is secure or not. If not,
         * STARTTLS can be used if available
         * @private
         */ this.secure = !!this.secureConnection;
        /**
         * Store incomplete messages coming from the server
         * @private
         */ this._remainder = '';
        /**
         * Unprocessed responses from the server
         * @type {Array}
         */ this._responseQueue = [];
        this.lastServerResponse = false;
        /**
         * The socket connecting to the server
         * @public
         */ this._socket = false;
        /**
         * Lists supported auth mechanisms
         * @private
         */ this._supportedAuth = [];
        /**
         * Set to true, if EHLO response includes "AUTH".
         * If false then authentication is not tried
         */ this.allowsAuth = false;
        /**
         * Includes current envelope (from, to)
         * @private
         */ this._envelope = false;
        /**
         * Lists supported extensions
         * @private
         */ this._supportedExtensions = [];
        /**
         * Defines the maximum allowed size for a single message
         * @private
         */ this._maxAllowedSize = 0;
        /**
         * Function queue to run if a data chunk comes from the server
         * @private
         */ this._responseActions = [];
        this._recipientQueue = [];
        /**
         * Timeout variable for waiting the greeting
         * @private
         */ this._greetingTimeout = false;
        /**
         * Timeout variable for waiting the connection to start
         * @private
         */ this._connectionTimeout = false;
        /**
         * If the socket is deemed already closed
         * @private
         */ this._destroyed = false;
        /**
         * If the socket is already being closed
         * @private
         */ this._closing = false;
        /**
         * Callbacks for socket's listeners
         */ this._onSocketData = (chunk)=>this._onData(chunk);
        this._onSocketError = (error)=>this._onError(error, 'ESOCKET', false, 'CONN');
        this._onSocketClose = ()=>this._onClose();
        this._onSocketEnd = ()=>this._onEnd();
        this._onSocketTimeout = ()=>this._onTimeout();
    }
    /**
     * Creates a connection to a SMTP server and sets up connection
     * listener
     */ connect(connectCallback) {
        if (typeof connectCallback === 'function') {
            this.once('connect', ()=>{
                this.logger.debug({
                    tnx: 'smtp'
                }, 'SMTP handshake finished');
                connectCallback();
            });
            const isDestroyedMessage = this._isDestroyedMessage('connect');
            if (isDestroyedMessage) {
                return connectCallback(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'CONN'));
            }
        }
        let opts = {
            port: this.port,
            host: this.host,
            allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces,
            timeout: this.options.dnsTimeout || DNS_TIMEOUT
        };
        if (this.options.localAddress) {
            opts.localAddress = this.options.localAddress;
        }
        let setupConnectionHandlers = ()=>{
            this._connectionTimeout = setTimeout(()=>{
                this._onError('Connection timeout', 'ETIMEDOUT', false, 'CONN');
            }, this.options.connectionTimeout || CONNECTION_TIMEOUT);
            this._socket.on('error', this._onSocketError);
        };
        if (this.options.connection) {
            // connection is already opened
            this._socket = this.options.connection;
            setupConnectionHandlers();
            if (this.secureConnection && !this.alreadySecured) {
                setImmediate(()=>this._upgradeConnection((err)=>{
                        if (err) {
                            this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'CONN');
                            return;
                        }
                        this._onConnect();
                    }));
            } else {
                setImmediate(()=>this._onConnect());
            }
            return;
        } else if (this.options.socket) {
            // socket object is set up but not yet connected
            this._socket = this.options.socket;
            return shared.resolveHostname(opts, (err, resolved)=>{
                if (err) {
                    return setImmediate(()=>this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug({
                    tnx: 'dns',
                    source: opts.host,
                    resolved: resolved.host,
                    cached: !!resolved.cached
                }, 'Resolved %s as %s [cache %s]', opts.host, resolved.host, resolved.cached ? 'hit' : 'miss');
                Object.keys(resolved).forEach((key)=>{
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket.connect(this.port, this.host, ()=>{
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(()=>this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        } else if (this.secureConnection) {
            // connect using tls
            if (this.options.tls) {
                Object.keys(this.options.tls).forEach((key)=>{
                    opts[key] = this.options.tls[key];
                });
            }
            // ensure servername for SNI
            if (this.servername && !opts.servername) {
                opts.servername = this.servername;
            }
            return shared.resolveHostname(opts, (err, resolved)=>{
                if (err) {
                    return setImmediate(()=>this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug({
                    tnx: 'dns',
                    source: opts.host,
                    resolved: resolved.host,
                    cached: !!resolved.cached
                }, 'Resolved %s as %s [cache %s]', opts.host, resolved.host, resolved.cached ? 'hit' : 'miss');
                Object.keys(resolved).forEach((key)=>{
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket = tls.connect(opts, ()=>{
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(()=>this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        } else {
            // connect using plaintext
            return shared.resolveHostname(opts, (err, resolved)=>{
                if (err) {
                    return setImmediate(()=>this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug({
                    tnx: 'dns',
                    source: opts.host,
                    resolved: resolved.host,
                    cached: !!resolved.cached
                }, 'Resolved %s as %s [cache %s]', opts.host, resolved.host, resolved.cached ? 'hit' : 'miss');
                Object.keys(resolved).forEach((key)=>{
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket = net.connect(opts, ()=>{
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(()=>this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        }
    }
    /**
     * Sends QUIT
     */ quit() {
        this._sendCommand('QUIT');
        this._responseActions.push(this.close);
    }
    /**
     * Closes the connection to the server
     */ close() {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        this._responseActions = [];
        // allow to run this function only once
        if (this._closing) {
            return;
        }
        this._closing = true;
        let closeMethod = 'end';
        if (this.stage === 'init') {
            // Close the socket immediately when connection timed out
            closeMethod = 'destroy';
        }
        this.logger.debug({
            tnx: 'smtp'
        }, 'Closing connection to the server using "%s"', closeMethod);
        let socket = this._socket && this._socket.socket || this._socket;
        if (socket && !socket.destroyed) {
            try {
                socket[closeMethod]();
            } catch (_E) {
            // just ignore
            }
        }
        this._destroy();
    }
    /**
     * Authenticate user
     */ login(authData, callback) {
        const isDestroyedMessage = this._isDestroyedMessage('login');
        if (isDestroyedMessage) {
            return callback(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'API'));
        }
        this._auth = authData || {};
        // Select SASL authentication method
        this._authMethod = (this._auth.method || '').toString().trim().toUpperCase() || false;
        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
            this._authMethod = 'XOAUTH2';
        } else if (!this._authMethod || this._authMethod === 'XOAUTH2' && !this._auth.oauth2) {
            // use first supported
            this._authMethod = (this._supportedAuth[0] || 'PLAIN').toUpperCase().trim();
        }
        if (this._authMethod !== 'XOAUTH2' && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
            if (this._auth.user && this._auth.pass || this.customAuth.has(this._authMethod)) {
                this._auth.credentials = {
                    user: this._auth.user,
                    pass: this._auth.pass,
                    options: this._auth.options
                };
            } else {
                return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', 'EAUTH', false, 'API'));
            }
        }
        if (this.customAuth.has(this._authMethod)) {
            let handler = this.customAuth.get(this._authMethod);
            let lastResponse;
            let returned = false;
            let resolve = ()=>{
                if (returned) {
                    return;
                }
                returned = true;
                this.logger.info({
                    tnx: 'smtp',
                    username: this._auth.user,
                    action: 'authenticated',
                    method: this._authMethod
                }, 'User %s authenticated', JSON.stringify(this._auth.user));
                this.authenticated = true;
                callback(null, true);
            };
            let reject = (err)=>{
                if (returned) {
                    return;
                }
                returned = true;
                callback(this._formatError(err, 'EAUTH', lastResponse, 'AUTH ' + this._authMethod));
            };
            let handlerResponse = handler({
                auth: this._auth,
                method: this._authMethod,
                extensions: [].concat(this._supportedExtensions),
                authMethods: [].concat(this._supportedAuth),
                maxAllowedSize: this._maxAllowedSize || false,
                sendCommand: (cmd, done)=>{
                    let promise;
                    if (!done) {
                        promise = new Promise((resolve, reject)=>{
                            done = shared.callbackPromise(resolve, reject);
                        });
                    }
                    this._responseActions.push((str)=>{
                        lastResponse = str;
                        let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
                        let data = {
                            command: cmd,
                            response: str
                        };
                        if (codes) {
                            data.status = Number(codes[1]) || 0;
                            if (codes[2]) {
                                data.code = codes[2];
                            }
                            data.text = str.substr(codes[0].length);
                        } else {
                            data.text = str;
                            data.status = 0; // just in case we need to perform numeric comparisons
                        }
                        done(null, data);
                    });
                    setImmediate(()=>this._sendCommand(cmd));
                    return promise;
                },
                resolve,
                reject
            });
            if (handlerResponse && typeof handlerResponse.catch === 'function') {
                // a promise was returned
                handlerResponse.then(resolve).catch(reject);
            }
            return;
        }
        switch(this._authMethod){
            case 'XOAUTH2':
                this._handleXOauth2Token(false, callback);
                return;
            case 'LOGIN':
                this._responseActions.push((str)=>{
                    this._actionAUTH_LOGIN_USER(str, callback);
                });
                this._sendCommand('AUTH LOGIN');
                return;
            case 'PLAIN':
                this._responseActions.push((str)=>{
                    this._actionAUTHComplete(str, callback);
                });
                this._sendCommand('AUTH PLAIN ' + Buffer.from(//this._auth.user+'\u0000'+
                '\u0000' + // skip authorization identity as it causes problems with some servers
                this._auth.credentials.user + '\u0000' + this._auth.credentials.pass, 'utf-8').toString('base64'), // log entry without passwords
                'AUTH PLAIN ' + Buffer.from(//this._auth.user+'\u0000'+
                '\u0000' + // skip authorization identity as it causes problems with some servers
                this._auth.credentials.user + '\u0000' + '/* secret */', 'utf-8').toString('base64'));
                return;
            case 'CRAM-MD5':
                this._responseActions.push((str)=>{
                    this._actionAUTH_CRAM_MD5(str, callback);
                });
                this._sendCommand('AUTH CRAM-MD5');
                return;
        }
        return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', 'EAUTH', false, 'API'));
    }
    /**
     * Sends a message
     *
     * @param {Object} envelope Envelope object, {from: addr, to: [addr]}
     * @param {Object} message String, Buffer or a Stream
     * @param {Function} callback Callback to return once sending is completed
     */ send(envelope, message, done) {
        if (!message) {
            return done(this._formatError('Empty message', 'EMESSAGE', false, 'API'));
        }
        const isDestroyedMessage = this._isDestroyedMessage('send message');
        if (isDestroyedMessage) {
            return done(this._formatError(isDestroyedMessage, 'ECONNECTION', false, 'API'));
        }
        // reject larger messages than allowed
        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
            return setImmediate(()=>{
                done(this._formatError('Message size larger than allowed ' + this._maxAllowedSize, 'EMESSAGE', false, 'MAIL FROM'));
            });
        }
        // ensure that callback is only called once
        let returned = false;
        let callback = function() {
            if (returned) {
                return;
            }
            returned = true;
            done(...arguments);
        };
        if (typeof message.on === 'function') {
            message.on('error', (err)=>callback(this._formatError(err, 'ESTREAM', false, 'API')));
        }
        let startTime = Date.now();
        this._setEnvelope(envelope, (err, info)=>{
            if (err) {
                // create passthrough stream to consume to prevent OOM
                let stream = new PassThrough();
                if (typeof message.pipe === 'function') {
                    message.pipe(stream);
                } else {
                    stream.write(message);
                    stream.end();
                }
                return callback(err);
            }
            let envelopeTime = Date.now();
            let stream = this._createSendStream((err, str)=>{
                if (err) {
                    return callback(err);
                }
                info.envelopeTime = envelopeTime - startTime;
                info.messageTime = Date.now() - envelopeTime;
                info.messageSize = stream.outByteCount;
                info.response = str;
                return callback(null, info);
            });
            if (typeof message.pipe === 'function') {
                message.pipe(stream);
            } else {
                stream.write(message);
                stream.end();
            }
        });
    }
    /**
     * Resets connection state
     *
     * @param {Function} callback Callback to return once connection is reset
     */ reset(callback) {
        this._sendCommand('RSET');
        this._responseActions.push((str)=>{
            if (str.charAt(0) !== '2') {
                return callback(this._formatError('Could not reset session state. response=' + str, 'EPROTOCOL', str, 'RSET'));
            }
            this._envelope = false;
            return callback(null, true);
        });
    }
    /**
     * Connection listener that is run when the connection to
     * the server is opened
     *
     * @event
     */ _onConnect() {
        clearTimeout(this._connectionTimeout);
        this.logger.info({
            tnx: 'network',
            localAddress: this._socket.localAddress,
            localPort: this._socket.localPort,
            remoteAddress: this._socket.remoteAddress,
            remotePort: this._socket.remotePort
        }, '%s established to %s:%s', this.secure ? 'Secure connection' : 'Connection', this._socket.remoteAddress, this._socket.remotePort);
        if (this._destroyed) {
            // Connection was established after we already had canceled it
            this.close();
            return;
        }
        this.stage = 'connected';
        // clear existing listeners for the socket
        this._socket.removeListener('data', this._onSocketData);
        this._socket.removeListener('timeout', this._onSocketTimeout);
        this._socket.removeListener('close', this._onSocketClose);
        this._socket.removeListener('end', this._onSocketEnd);
        this._socket.on('data', this._onSocketData);
        this._socket.once('close', this._onSocketClose);
        this._socket.once('end', this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on('timeout', this._onSocketTimeout);
        this._greetingTimeout = setTimeout(()=>{
            // if still waiting for greeting, give up
            if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
                this._onError('Greeting never received', 'ETIMEDOUT', false, 'CONN');
            }
        }, this.options.greetingTimeout || GREETING_TIMEOUT);
        this._responseActions.push(this._actionGreeting);
        // we have a 'data' listener set up so resume socket if it was paused
        this._socket.resume();
    }
    /**
     * 'data' listener for data coming from the server
     *
     * @event
     * @param {Buffer} chunk Data chunk coming from the server
     */ _onData(chunk) {
        if (this._destroyed || !chunk || !chunk.length) {
            return;
        }
        let data = (chunk || '').toString('binary');
        let lines = (this._remainder + data).split(/\r?\n/);
        let lastline;
        this._remainder = lines.pop();
        for(let i = 0, len = lines.length; i < len; i++){
            if (this._responseQueue.length) {
                lastline = this._responseQueue[this._responseQueue.length - 1];
                if (/^\d+-/.test(lastline.split('\n').pop())) {
                    this._responseQueue[this._responseQueue.length - 1] += '\n' + lines[i];
                    continue;
                }
            }
            this._responseQueue.push(lines[i]);
        }
        if (this._responseQueue.length) {
            lastline = this._responseQueue[this._responseQueue.length - 1];
            if (/^\d+-/.test(lastline.split('\n').pop())) {
                return;
            }
        }
        this._processResponse();
    }
    /**
     * 'error' listener for the socket
     *
     * @event
     * @param {Error} err Error object
     * @param {String} type Error name
     */ _onError(err, type, data, command) {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        if (this._destroyed) {
            // just ignore, already closed
            // this might happen when a socket is canceled because of reached timeout
            // but the socket timeout error itself receives only after
            return;
        }
        err = this._formatError(err, type, data, command);
        const transientCodes = [
            'ETIMEDOUT',
            'ESOCKET',
            'ECONNECTION'
        ];
        if (transientCodes.includes(err.code)) {
            this.logger.warn(data, err.message);
        } else {
            this.logger.error(data, err.message);
        }
        this.emit('error', err);
        this.close();
    }
    _formatError(message, type, response, command) {
        let err;
        if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
            err = message;
        } else {
            err = new Error(message);
        }
        if (type && type !== 'Error') {
            err.code = type;
        }
        if (response) {
            err.response = response;
            err.message += ': ' + response;
        }
        let responseCode = typeof response === 'string' && Number((response.match(/^\d+/) || [])[0]) || false;
        if (responseCode) {
            err.responseCode = responseCode;
        }
        if (command) {
            err.command = command;
        }
        return err;
    }
    /**
     * 'close' listener for the socket
     *
     * @event
     */ _onClose() {
        let serverResponse = false;
        if (this._remainder && this._remainder.trim()) {
            if (this.options.debug || this.options.transactionLog) {
                this.logger.debug({
                    tnx: 'server'
                }, this._remainder.replace(/\r?\n$/, ''));
            }
            this.lastServerResponse = serverResponse = this._remainder.trim();
        }
        this.logger.info({
            tnx: 'network'
        }, 'Connection closed');
        if (this.upgrading && !this._destroyed) {
            return this._onError(new Error('Connection closed unexpectedly'), 'ETLS', serverResponse, 'CONN');
        } else if (![
            this._actionGreeting,
            this.close
        ].includes(this._responseActions[0]) && !this._destroyed) {
            return this._onError(new Error('Connection closed unexpectedly'), 'ECONNECTION', serverResponse, 'CONN');
        } else if (/^[45]\d{2}\b/.test(serverResponse)) {
            return this._onError(new Error('Connection closed unexpectedly'), 'ECONNECTION', serverResponse, 'CONN');
        }
        this._destroy();
    }
    /**
     * 'end' listener for the socket
     *
     * @event
     */ _onEnd() {
        if (this._socket && !this._socket.destroyed) {
            this._socket.destroy();
        }
    }
    /**
     * 'timeout' listener for the socket
     *
     * @event
     */ _onTimeout() {
        return this._onError(new Error('Timeout'), 'ETIMEDOUT', false, 'CONN');
    }
    /**
     * Destroys the client, emits 'end'
     */ _destroy() {
        if (this._destroyed) {
            return;
        }
        this._destroyed = true;
        this.emit('end');
    }
    /**
     * Upgrades the connection to TLS
     *
     * @param {Function} callback Callback function to run when the connection
     *        has been secured
     */ _upgradeConnection(callback) {
        // do not remove all listeners or it breaks node v0.10 as there's
        // apparently a 'finish' event set that would be cleared as well
        // we can safely keep 'error', 'end', 'close' etc. events
        this._socket.removeListener('data', this._onSocketData); // incoming data is going to be gibberish from this point onwards
        this._socket.removeListener('timeout', this._onSocketTimeout); // timeout will be re-set for the new socket object
        let socketPlain = this._socket;
        let opts = {
            socket: this._socket,
            host: this.host
        };
        Object.keys(this.options.tls || {}).forEach((key)=>{
            opts[key] = this.options.tls[key];
        });
        // ensure servername for SNI
        if (this.servername && !opts.servername) {
            opts.servername = this.servername;
        }
        this.upgrading = true;
        // tls.connect is not an asynchronous function however it may still throw errors and requires to be wrapped with try/catch
        try {
            this._socket = tls.connect(opts, ()=>{
                this.secure = true;
                this.upgrading = false;
                this._socket.on('data', this._onSocketData);
                socketPlain.removeListener('close', this._onSocketClose);
                socketPlain.removeListener('end', this._onSocketEnd);
                return callback(null, true);
            });
        } catch (err) {
            return callback(err);
        }
        this._socket.on('error', this._onSocketError);
        this._socket.once('close', this._onSocketClose);
        this._socket.once('end', this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT); // 10 min.
        this._socket.on('timeout', this._onSocketTimeout);
        // resume in case the socket was paused
        socketPlain.resume();
    }
    /**
     * Processes queued responses from the server
     *
     * @param {Boolean} force If true, ignores _processing flag
     */ _processResponse() {
        if (!this._responseQueue.length) {
            return false;
        }
        let str = this.lastServerResponse = (this._responseQueue.shift() || '').toString();
        if (/^\d+-/.test(str.split('\n').pop())) {
            // keep waiting for the final part of multiline response
            return;
        }
        if (this.options.debug || this.options.transactionLog) {
            this.logger.debug({
                tnx: 'server'
            }, str.replace(/\r?\n$/, ''));
        }
        if (!str.trim()) {
            // skip unexpected empty lines
            setImmediate(()=>this._processResponse());
        }
        let action = this._responseActions.shift();
        if (typeof action === 'function') {
            action.call(this, str);
            setImmediate(()=>this._processResponse());
        } else {
            return this._onError(new Error('Unexpected Response'), 'EPROTOCOL', str, 'CONN');
        }
    }
    /**
     * Send a command to the server, append \r\n
     *
     * @param {String} str String to be sent to the server
     * @param {String} logStr Optional string to be used for logging instead of the actual string
     */ _sendCommand(str, logStr) {
        if (this._destroyed) {
            // Connection already closed, can't send any more data
            return;
        }
        if (this._socket.destroyed) {
            return this.close();
        }
        if (this.options.debug || this.options.transactionLog) {
            this.logger.debug({
                tnx: 'client'
            }, (logStr || str || '').toString().replace(/\r?\n$/, ''));
        }
        this._socket.write(Buffer.from(str + '\r\n', 'utf-8'));
    }
    /**
     * Initiates a new message by submitting envelope data, starting with
     * MAIL FROM: command
     *
     * @param {Object} envelope Envelope object in the form of
     *        {from:'...', to:['...']}
     *        or
     *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
     */ _setEnvelope(envelope, callback) {
        let args = [];
        let useSmtpUtf8 = false;
        this._envelope = envelope || {};
        this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || '').toString().trim();
        this._envelope.to = [].concat(this._envelope.to || []).map((to)=>(to && to.address || to || '').toString().trim());
        if (!this._envelope.to.length) {
            return callback(this._formatError('No recipients defined', 'EENVELOPE', false, 'API'));
        }
        if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
            return callback(this._formatError('Invalid sender ' + JSON.stringify(this._envelope.from), 'EENVELOPE', false, 'API'));
        }
        // check if the sender address uses only ASCII characters,
        // otherwise require usage of SMTPUTF8 extension
        if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
            useSmtpUtf8 = true;
        }
        for(let i = 0, len = this._envelope.to.length; i < len; i++){
            if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
                return callback(this._formatError('Invalid recipient ' + JSON.stringify(this._envelope.to[i]), 'EENVELOPE', false, 'API'));
            }
            // check if the recipients addresses use only ASCII characters,
            // otherwise require usage of SMTPUTF8 extension
            if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
                useSmtpUtf8 = true;
            }
        }
        // clone the recipients array for latter manipulation
        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
        this._envelope.rejected = [];
        this._envelope.rejectedErrors = [];
        this._envelope.accepted = [];
        if (this._envelope.dsn) {
            try {
                this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
            } catch (err) {
                return callback(this._formatError('Invalid DSN ' + err.message, 'EENVELOPE', false, 'API'));
            }
        }
        this._responseActions.push((str)=>{
            this._actionMAIL(str, callback);
        });
        // If the server supports SMTPUTF8 and the envelope includes an internationalized
        // email address then append SMTPUTF8 keyword to the MAIL FROM command
        if (useSmtpUtf8 && this._supportedExtensions.includes('SMTPUTF8')) {
            args.push('SMTPUTF8');
            this._usingSmtpUtf8 = true;
        }
        // If the server supports 8BITMIME and the message might contain non-ascii bytes
        // then append the 8BITMIME keyword to the MAIL FROM command
        if (this._envelope.use8BitMime && this._supportedExtensions.includes('8BITMIME')) {
            args.push('BODY=8BITMIME');
            this._using8BitMime = true;
        }
        if (this._envelope.size && this._supportedExtensions.includes('SIZE')) {
            args.push('SIZE=' + this._envelope.size);
        }
        // If the server supports DSN and the envelope includes an DSN prop
        // then append DSN params to the MAIL FROM command
        if (this._envelope.dsn && this._supportedExtensions.includes('DSN')) {
            if (this._envelope.dsn.ret) {
                args.push('RET=' + shared.encodeXText(this._envelope.dsn.ret));
            }
            if (this._envelope.dsn.envid) {
                args.push('ENVID=' + shared.encodeXText(this._envelope.dsn.envid));
            }
        }
        // RFC 8689: If the envelope requests REQUIRETLS extension
        // then append REQUIRETLS keyword to the MAIL FROM command
        // Note: REQUIRETLS can only be used over TLS connections and requires server support
        if (this._envelope.requireTLSExtensionEnabled) {
            if (!this.secure) {
                return callback(this._formatError('REQUIRETLS can only be used over TLS connections (RFC 8689)', 'EREQUIRETLS', false, 'MAIL FROM'));
            }
            if (!this._supportedExtensions.includes('REQUIRETLS')) {
                return callback(this._formatError('Server does not support REQUIRETLS extension (RFC 8689)', 'EREQUIRETLS', false, 'MAIL FROM'));
            }
            args.push('REQUIRETLS');
        }
        this._sendCommand('MAIL FROM:<' + this._envelope.from + '>' + (args.length ? ' ' + args.join(' ') : ''));
    }
    _setDsnEnvelope(params) {
        let ret = (params.ret || params.return || '').toString().toUpperCase() || null;
        if (ret) {
            switch(ret){
                case 'HDRS':
                case 'HEADERS':
                    ret = 'HDRS';
                    break;
                case 'FULL':
                case 'BODY':
                    ret = 'FULL';
                    break;
            }
        }
        if (ret && ![
            'FULL',
            'HDRS'
        ].includes(ret)) {
            throw new Error('ret: ' + JSON.stringify(ret));
        }
        let envid = (params.envid || params.id || '').toString() || null;
        let notify = params.notify || null;
        if (notify) {
            if (typeof notify === 'string') {
                notify = notify.split(',');
            }
            notify = notify.map((n)=>n.trim().toUpperCase());
            let validNotify = [
                'NEVER',
                'SUCCESS',
                'FAILURE',
                'DELAY'
            ];
            let invalidNotify = notify.filter((n)=>!validNotify.includes(n));
            if (invalidNotify.length || notify.length > 1 && notify.includes('NEVER')) {
                throw new Error('notify: ' + JSON.stringify(notify.join(',')));
            }
            notify = notify.join(',');
        }
        let orcpt = (params.recipient || params.orcpt || '').toString() || null;
        if (orcpt && orcpt.indexOf(';') < 0) {
            orcpt = 'rfc822;' + orcpt;
        }
        return {
            ret,
            envid,
            notify,
            orcpt
        };
    }
    _getDsnRcptToArgs() {
        let args = [];
        // If the server supports DSN and the envelope includes an DSN prop
        // then append DSN params to the RCPT TO command
        if (this._envelope.dsn && this._supportedExtensions.includes('DSN')) {
            if (this._envelope.dsn.notify) {
                args.push('NOTIFY=' + shared.encodeXText(this._envelope.dsn.notify));
            }
            if (this._envelope.dsn.orcpt) {
                args.push('ORCPT=' + shared.encodeXText(this._envelope.dsn.orcpt));
            }
        }
        return args.length ? ' ' + args.join(' ') : '';
    }
    _createSendStream(callback) {
        let dataStream = new DataStream();
        let logStream;
        if (this.options.lmtp) {
            this._envelope.accepted.forEach((recipient, i)=>{
                let final = i === this._envelope.accepted.length - 1;
                this._responseActions.push((str)=>{
                    this._actionLMTPStream(recipient, final, str, callback);
                });
            });
        } else {
            this._responseActions.push((str)=>{
                this._actionSMTPStream(str, callback);
            });
        }
        dataStream.pipe(this._socket, {
            end: false
        });
        if (this.options.debug) {
            logStream = new PassThrough();
            logStream.on('readable', ()=>{
                let chunk;
                while(chunk = logStream.read()){
                    this.logger.debug({
                        tnx: 'message'
                    }, chunk.toString('binary').replace(/\r?\n$/, ''));
                }
            });
            dataStream.pipe(logStream);
        }
        dataStream.once('end', ()=>{
            this.logger.info({
                tnx: 'message',
                inByteCount: dataStream.inByteCount,
                outByteCount: dataStream.outByteCount
            }, '<%s bytes encoded mime message (source size %s bytes)>', dataStream.outByteCount, dataStream.inByteCount);
        });
        return dataStream;
    }
    /** ACTIONS **/ /**
     * Will be run after the connection is created and the server sends
     * a greeting. If the incoming message starts with 220 initiate
     * SMTP session by sending EHLO command
     *
     * @param {String} str Message from the server
     */ _actionGreeting(str) {
        clearTimeout(this._greetingTimeout);
        if (str.substr(0, 3) !== '220') {
            this._onError(new Error('Invalid greeting. response=' + str), 'EPROTOCOL', str, 'CONN');
            return;
        }
        if (this.options.lmtp) {
            this._responseActions.push(this._actionLHLO);
            this._sendCommand('LHLO ' + this.name);
        } else {
            this._responseActions.push(this._actionEHLO);
            this._sendCommand('EHLO ' + this.name);
        }
    }
    /**
     * Handles server response for LHLO command. If it yielded in
     * error, emit 'error', otherwise treat this as an EHLO response
     *
     * @param {String} str Message from the server
     */ _actionLHLO(str) {
        if (str.charAt(0) !== '2') {
            this._onError(new Error('Invalid LHLO. response=' + str), 'EPROTOCOL', str, 'LHLO');
            return;
        }
        this._actionEHLO(str);
    }
    /**
     * Handles server response for EHLO command. If it yielded in
     * error, try HELO instead, otherwise initiate TLS negotiation
     * if STARTTLS is supported by the server or move into the
     * authentication phase.
     *
     * @param {String} str Message from the server
     */ _actionEHLO(str) {
        let match;
        if (str.substr(0, 3) === '421') {
            this._onError(new Error('Server terminates connection. response=' + str), 'ECONNECTION', str, 'EHLO');
            return;
        }
        if (str.charAt(0) !== '2') {
            if (this.options.requireTLS) {
                this._onError(new Error('EHLO failed but HELO does not support required STARTTLS. response=' + str), 'ECONNECTION', str, 'EHLO');
                return;
            }
            // Try HELO instead
            this._responseActions.push(this._actionHELO);
            this._sendCommand('HELO ' + this.name);
            return;
        }
        this._ehloLines = str.split(/\r?\n/).map((line)=>line.replace(/^\d+[ -]/, '').trim()).filter((line)=>line).slice(1);
        // Detect if the server supports STARTTLS
        if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
            this._sendCommand('STARTTLS');
            this._responseActions.push(this._actionSTARTTLS);
            return;
        }
        // Detect if the server supports SMTPUTF8
        if (/[ -]SMTPUTF8\b/im.test(str)) {
            this._supportedExtensions.push('SMTPUTF8');
        }
        // Detect if the server supports DSN
        if (/[ -]DSN\b/im.test(str)) {
            this._supportedExtensions.push('DSN');
        }
        // Detect if the server supports 8BITMIME
        if (/[ -]8BITMIME\b/im.test(str)) {
            this._supportedExtensions.push('8BITMIME');
        }
        // Detect if the server supports REQUIRETLS (RFC 8689)
        if (/[ -]REQUIRETLS\b/im.test(str)) {
            this._supportedExtensions.push('REQUIRETLS');
        }
        // Detect if the server supports PIPELINING
        if (/[ -]PIPELINING\b/im.test(str)) {
            this._supportedExtensions.push('PIPELINING');
        }
        // Detect if the server supports AUTH
        if (/[ -]AUTH\b/i.test(str)) {
            this.allowsAuth = true;
        }
        // Detect if the server supports PLAIN auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
            this._supportedAuth.push('PLAIN');
        }
        // Detect if the server supports LOGIN auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
            this._supportedAuth.push('LOGIN');
        }
        // Detect if the server supports CRAM-MD5 auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
            this._supportedAuth.push('CRAM-MD5');
        }
        // Detect if the server supports XOAUTH2 auth
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
            this._supportedAuth.push('XOAUTH2');
        }
        // Detect if the server supports SIZE extensions (and the max allowed size)
        if (match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) {
            this._supportedExtensions.push('SIZE');
            this._maxAllowedSize = Number(match[1]) || 0;
        }
        this.emit('connect');
    }
    /**
     * Handles server response for HELO command. If it yielded in
     * error, emit 'error', otherwise move into the authentication phase.
     *
     * @param {String} str Message from the server
     */ _actionHELO(str) {
        if (str.charAt(0) !== '2') {
            this._onError(new Error('Invalid HELO. response=' + str), 'EPROTOCOL', str, 'HELO');
            return;
        }
        // assume that authentication is enabled (most probably is not though)
        this.allowsAuth = true;
        this.emit('connect');
    }
    /**
     * Handles server response for STARTTLS command. If there's an error
     * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
     * succeedes restart the EHLO
     *
     * @param {String} str Message from the server
     */ _actionSTARTTLS(str) {
        if (str.charAt(0) !== '2') {
            if (this.options.opportunisticTLS) {
                this.logger.info({
                    tnx: 'smtp'
                }, 'Failed STARTTLS upgrade, continuing unencrypted');
                return this.emit('connect');
            }
            this._onError(new Error('Error upgrading connection with STARTTLS'), 'ETLS', str, 'STARTTLS');
            return;
        }
        this._upgradeConnection((err, secured)=>{
            if (err) {
                this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'STARTTLS');
                return;
            }
            this.logger.info({
                tnx: 'smtp'
            }, 'Connection upgraded with STARTTLS');
            if (secured) {
                // restart session
                if (this.options.lmtp) {
                    this._responseActions.push(this._actionLHLO);
                    this._sendCommand('LHLO ' + this.name);
                } else {
                    this._responseActions.push(this._actionEHLO);
                    this._sendCommand('EHLO ' + this.name);
                }
            } else {
                this.emit('connect');
            }
        });
    }
    /**
     * Handle the response for AUTH LOGIN command. We are expecting
     * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
     * response needs to be base64 encoded username. We do not need
     * exact match but settle with 334 response in general as some
     * hosts invalidly use a longer message than VXNlcm5hbWU6
     *
     * @param {String} str Message from the server
     */ _actionAUTH_LOGIN_USER(str, callback) {
        if (!/^334[ -]/.test(str)) {
            // expecting '334 VXNlcm5hbWU6'
            callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', 'EAUTH', str, 'AUTH LOGIN'));
            return;
        }
        this._responseActions.push((str)=>{
            this._actionAUTH_LOGIN_PASS(str, callback);
        });
        this._sendCommand(Buffer.from(this._auth.credentials.user + '', 'utf-8').toString('base64'));
    }
    /**
     * Handle the response for AUTH CRAM-MD5 command. We are expecting
     * '334 <challenge string>'. Data to be sent as response needs to be
     * base64 decoded challenge string, MD5 hashed using the password as
     * a HMAC key, prefixed by the username and a space, and finally all
     * base64 encoded again.
     *
     * @param {String} str Message from the server
     */ _actionAUTH_CRAM_MD5(str, callback) {
        let challengeMatch = str.match(/^334\s+(.+)$/);
        let challengeString = '';
        if (!challengeMatch) {
            return callback(this._formatError('Invalid login sequence while waiting for server challenge string', 'EAUTH', str, 'AUTH CRAM-MD5'));
        } else {
            challengeString = challengeMatch[1];
        }
        // Decode from base64
        let base64decoded = Buffer.from(challengeString, 'base64').toString('ascii'), hmacMD5 = crypto.createHmac('md5', this._auth.credentials.pass);
        hmacMD5.update(base64decoded);
        let prepended = this._auth.credentials.user + ' ' + hmacMD5.digest('hex');
        this._responseActions.push((str)=>{
            this._actionAUTH_CRAM_MD5_PASS(str, callback);
        });
        this._sendCommand(Buffer.from(prepended).toString('base64'), // hidden hash for logs
        Buffer.from(this._auth.credentials.user + ' /* secret */').toString('base64'));
    }
    /**
     * Handles the response to CRAM-MD5 authentication, if there's no error,
     * the user can be considered logged in. Start waiting for a message to send
     *
     * @param {String} str Message from the server
     */ _actionAUTH_CRAM_MD5_PASS(str, callback) {
        if (!str.match(/^235\s+/)) {
            return callback(this._formatError('Invalid login sequence while waiting for "235"', 'EAUTH', str, 'AUTH CRAM-MD5'));
        }
        this.logger.info({
            tnx: 'smtp',
            username: this._auth.user,
            action: 'authenticated',
            method: this._authMethod
        }, 'User %s authenticated', JSON.stringify(this._auth.user));
        this.authenticated = true;
        callback(null, true);
    }
    /**
     * Handle the response for AUTH LOGIN command. We are expecting
     * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
     * response needs to be base64 encoded password.
     *
     * @param {String} str Message from the server
     */ _actionAUTH_LOGIN_PASS(str, callback) {
        if (!/^334[ -]/.test(str)) {
            // expecting '334 UGFzc3dvcmQ6'
            return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', 'EAUTH', str, 'AUTH LOGIN'));
        }
        this._responseActions.push((str)=>{
            this._actionAUTHComplete(str, callback);
        });
        this._sendCommand(Buffer.from((this._auth.credentials.pass || '').toString(), 'utf-8').toString('base64'), // Hidden pass for logs
        Buffer.from('/* secret */', 'utf-8').toString('base64'));
    }
    /**
     * Handles the response for authentication, if there's no error,
     * the user can be considered logged in. Start waiting for a message to send
     *
     * @param {String} str Message from the server
     */ _actionAUTHComplete(str, isRetry, callback) {
        if (!callback && typeof isRetry === 'function') {
            callback = isRetry;
            isRetry = false;
        }
        if (str.substr(0, 3) === '334') {
            this._responseActions.push((str)=>{
                if (isRetry || this._authMethod !== 'XOAUTH2') {
                    this._actionAUTHComplete(str, true, callback);
                } else {
                    // fetch a new OAuth2 access token
                    setImmediate(()=>this._handleXOauth2Token(true, callback));
                }
            });
            this._sendCommand('');
            return;
        }
        if (str.charAt(0) !== '2') {
            this.logger.info({
                tnx: 'smtp',
                username: this._auth.user,
                action: 'authfail',
                method: this._authMethod
            }, 'User %s failed to authenticate', JSON.stringify(this._auth.user));
            return callback(this._formatError('Invalid login', 'EAUTH', str, 'AUTH ' + this._authMethod));
        }
        this.logger.info({
            tnx: 'smtp',
            username: this._auth.user,
            action: 'authenticated',
            method: this._authMethod
        }, 'User %s authenticated', JSON.stringify(this._auth.user));
        this.authenticated = true;
        callback(null, true);
    }
    /**
     * Handle response for a MAIL FROM: command
     *
     * @param {String} str Message from the server
     */ _actionMAIL(str, callback) {
        let message, curRecipient;
        if (Number(str.charAt(0)) !== 2) {
            if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
                message = 'Internationalized mailbox name not allowed';
            } else {
                message = 'Mail command failed';
            }
            return callback(this._formatError(message, 'EENVELOPE', str, 'MAIL FROM'));
        }
        if (!this._envelope.rcptQueue.length) {
            return callback(this._formatError("Can't send mail - no recipients defined", 'EENVELOPE', false, 'API'));
        } else {
            this._recipientQueue = [];
            if (this._supportedExtensions.includes('PIPELINING')) {
                while(this._envelope.rcptQueue.length){
                    curRecipient = this._envelope.rcptQueue.shift();
                    this._recipientQueue.push(curRecipient);
                    this._responseActions.push((str)=>{
                        this._actionRCPT(str, callback);
                    });
                    this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
                }
            } else {
                curRecipient = this._envelope.rcptQueue.shift();
                this._recipientQueue.push(curRecipient);
                this._responseActions.push((str)=>{
                    this._actionRCPT(str, callback);
                });
                this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
            }
        }
    }
    /**
     * Handle response for a RCPT TO: command
     *
     * @param {String} str Message from the server
     */ _actionRCPT(str, callback) {
        let message, err, curRecipient = this._recipientQueue.shift();
        if (Number(str.charAt(0)) !== 2) {
            // this is a soft error
            if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
                message = 'Internationalized mailbox name not allowed';
            } else {
                message = 'Recipient command failed';
            }
            this._envelope.rejected.push(curRecipient);
            // store error for the failed recipient
            err = this._formatError(message, 'EENVELOPE', str, 'RCPT TO');
            err.recipient = curRecipient;
            this._envelope.rejectedErrors.push(err);
        } else {
            this._envelope.accepted.push(curRecipient);
        }
        if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
            if (this._envelope.rejected.length < this._envelope.to.length) {
                this._responseActions.push((str)=>{
                    this._actionDATA(str, callback);
                });
                this._sendCommand('DATA');
            } else {
                err = this._formatError("Can't send mail - all recipients were rejected", 'EENVELOPE', str, 'RCPT TO');
                err.rejected = this._envelope.rejected;
                err.rejectedErrors = this._envelope.rejectedErrors;
                return callback(err);
            }
        } else if (this._envelope.rcptQueue.length) {
            curRecipient = this._envelope.rcptQueue.shift();
            this._recipientQueue.push(curRecipient);
            this._responseActions.push((str)=>{
                this._actionRCPT(str, callback);
            });
            this._sendCommand('RCPT TO:<' + curRecipient + '>' + this._getDsnRcptToArgs());
        }
    }
    /**
     * Handle response for a DATA command
     *
     * @param {String} str Message from the server
     */ _actionDATA(str, callback) {
        // response should be 354 but according to this issue https://github.com/eleith/emailjs/issues/24
        // some servers might use 250 instead, so lets check for 2 or 3 as the first digit
        if (!/^[23]/.test(str)) {
            return callback(this._formatError('Data command failed', 'EENVELOPE', str, 'DATA'));
        }
        let response = {
            accepted: this._envelope.accepted,
            rejected: this._envelope.rejected
        };
        if (this._ehloLines && this._ehloLines.length) {
            response.ehlo = this._ehloLines;
        }
        if (this._envelope.rejectedErrors.length) {
            response.rejectedErrors = this._envelope.rejectedErrors;
        }
        callback(null, response);
    }
    /**
     * Handle response for a DATA stream when using SMTP
     * We expect a single response that defines if the sending succeeded or failed
     *
     * @param {String} str Message from the server
     */ _actionSMTPStream(str, callback) {
        if (Number(str.charAt(0)) !== 2) {
            // Message failed
            return callback(this._formatError('Message failed', 'EMESSAGE', str, 'DATA'));
        } else {
            // Message sent succesfully
            return callback(null, str);
        }
    }
    /**
     * Handle response for a DATA stream
     * We expect a separate response for every recipient. All recipients can either
     * succeed or fail separately
     *
     * @param {String} recipient The recipient this response applies to
     * @param {Boolean} final Is this the final recipient?
     * @param {String} str Message from the server
     */ _actionLMTPStream(recipient, final, str, callback) {
        let err;
        if (Number(str.charAt(0)) !== 2) {
            // Message failed
            err = this._formatError('Message failed for recipient ' + recipient, 'EMESSAGE', str, 'DATA');
            err.recipient = recipient;
            this._envelope.rejected.push(recipient);
            this._envelope.rejectedErrors.push(err);
            for(let i = 0, len = this._envelope.accepted.length; i < len; i++){
                if (this._envelope.accepted[i] === recipient) {
                    this._envelope.accepted.splice(i, 1);
                }
            }
        }
        if (final) {
            return callback(null, str);
        }
    }
    _handleXOauth2Token(isRetry, callback) {
        this._auth.oauth2.getToken(isRetry, (err, accessToken)=>{
            if (err) {
                this.logger.info({
                    tnx: 'smtp',
                    username: this._auth.user,
                    action: 'authfail',
                    method: this._authMethod
                }, 'User %s failed to authenticate', JSON.stringify(this._auth.user));
                return callback(this._formatError(err, 'EAUTH', false, 'AUTH XOAUTH2'));
            }
            this._responseActions.push((str)=>{
                this._actionAUTHComplete(str, isRetry, callback);
            });
            this._sendCommand('AUTH XOAUTH2 ' + this._auth.oauth2.buildXOAuth2Token(accessToken), //  Hidden for logs
            'AUTH XOAUTH2 ' + this._auth.oauth2.buildXOAuth2Token('/* secret */'));
        });
    }
    /**
     *
     * @param {string} command
     * @private
     */ _isDestroyedMessage(command) {
        if (this._destroyed) {
            return 'Cannot ' + command + ' - smtp connection is already destroyed.';
        }
        if (this._socket) {
            if (this._socket.destroyed) {
                return 'Cannot ' + command + ' - smtp connection socket is already destroyed.';
            }
            if (!this._socket.writable) {
                return 'Cannot ' + command + ' - smtp connection socket is already half-closed.';
            }
        }
    }
    _getHostname() {
        // defaul hostname is machine hostname or [IP]
        let defaultHostname;
        try {
            defaultHostname = os.hostname() || '';
        } catch (_err) {
            // fails on windows 7
            defaultHostname = 'localhost';
        }
        // ignore if not FQDN
        if (!defaultHostname || defaultHostname.indexOf('.') < 0) {
            defaultHostname = '[127.0.0.1]';
        }
        // IP should be enclosed in []
        if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
            defaultHostname = '[' + defaultHostname + ']';
        }
        return defaultHostname;
    }
}
module.exports = SMTPConnection;
}),
"[project]/node_modules/nodemailer/lib/xoauth2/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Stream;
const nmfetch = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/fetch/index.js [app-rsc] (ecmascript)");
const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
/**
 * XOAUTH2 access_token generator for Gmail.
 * Create client ID for web applications in Google API console to use it.
 * See Offline Access for receiving the needed refreshToken for an user
 * https://developers.google.com/accounts/docs/OAuth2WebServer#offline
 *
 * Usage for generating access tokens with a custom method using provisionCallback:
 * provisionCallback(user, renew, callback)
 *   * user is the username to get the token for
 *   * renew is a boolean that if true indicates that existing token failed and needs to be renewed
 *   * callback is the callback to run with (error, accessToken [, expires])
 *     * accessToken is a string
 *     * expires is an optional expire time in milliseconds
 * If provisionCallback is used, then Nodemailer does not try to attempt generating the token by itself
 *
 * @constructor
 * @param {Object} options Client information for token generation
 * @param {String} options.user User e-mail address
 * @param {String} options.clientId Client ID value
 * @param {String} options.clientSecret Client secret value
 * @param {String} options.refreshToken Refresh token for an user
 * @param {String} options.accessUrl Endpoint for token generation, defaults to 'https://accounts.google.com/o/oauth2/token'
 * @param {String} options.accessToken An existing valid accessToken
 * @param {String} options.privateKey Private key for JSW
 * @param {Number} options.expires Optional Access Token expire time in ms
 * @param {Number} options.timeout Optional TTL for Access Token in seconds
 * @param {Function} options.provisionCallback Function to run when a new access token is required
 */ class XOAuth2 extends Stream {
    constructor(options, logger){
        super();
        this.options = options || {};
        if (options && options.serviceClient) {
            if (!options.privateKey || !options.user) {
                setImmediate(()=>this.emit('error', new Error('Options "privateKey" and "user" are required for service account!')));
                return;
            }
            let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
            this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
        }
        this.logger = shared.getLogger({
            logger
        }, {
            component: this.options.component || 'OAuth2'
        });
        this.provisionCallback = typeof this.options.provisionCallback === 'function' ? this.options.provisionCallback : false;
        this.options.accessUrl = this.options.accessUrl || 'https://accounts.google.com/o/oauth2/token';
        this.options.customHeaders = this.options.customHeaders || {};
        this.options.customParams = this.options.customParams || {};
        this.accessToken = this.options.accessToken || false;
        if (this.options.expires && Number(this.options.expires)) {
            this.expires = this.options.expires;
        } else {
            let timeout = Math.max(Number(this.options.timeout) || 0, 0);
            this.expires = timeout && Date.now() + timeout * 1000 || 0;
        }
        this.renewing = false; // Track if renewal is in progress
        this.renewalQueue = []; // Queue for pending requests during renewal
    }
    /**
     * Returns or generates (if previous has expired) a XOAuth2 token
     *
     * @param {Boolean} renew If false then use cached access token (if available)
     * @param {Function} callback Callback function with error object and token string
     */ getToken(renew, callback) {
        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
            this.logger.debug({
                tnx: 'OAUTH2',
                user: this.options.user,
                action: 'reuse'
            }, 'Reusing existing access token for %s', this.options.user);
            return callback(null, this.accessToken);
        }
        // check if it is possible to renew, if not, return the current token or error
        if (!this.provisionCallback && !this.options.refreshToken && !this.options.serviceClient) {
            if (this.accessToken) {
                this.logger.debug({
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'reuse'
                }, 'Reusing existing access token (no refresh capability) for %s', this.options.user);
                return callback(null, this.accessToken);
            }
            this.logger.error({
                tnx: 'OAUTH2',
                user: this.options.user,
                action: 'renew'
            }, 'Cannot renew access token for %s: No refresh mechanism available', this.options.user);
            return callback(new Error("Can't create new access token for user"));
        }
        // If renewal already in progress, queue this request instead of starting another
        if (this.renewing) {
            return this.renewalQueue.push({
                renew,
                callback
            });
        }
        this.renewing = true;
        // Handles token renewal completion - processes queued requests and cleans up
        const generateCallback = (err, accessToken)=>{
            this.renewalQueue.forEach((item)=>item.callback(err, accessToken));
            this.renewalQueue = [];
            this.renewing = false;
            if (err) {
                this.logger.error({
                    err,
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'renew'
                }, 'Failed generating new Access Token for %s', this.options.user);
            } else {
                this.logger.info({
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'renew'
                }, 'Generated new Access Token for %s', this.options.user);
            }
            // Complete original request
            callback(err, accessToken);
        };
        if (this.provisionCallback) {
            this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires)=>{
                if (!err && accessToken) {
                    this.accessToken = accessToken;
                    this.expires = expires || 0;
                }
                generateCallback(err, accessToken);
            });
        } else {
            this.generateToken(generateCallback);
        }
    }
    /**
     * Updates token values
     *
     * @param {String} accessToken New access token
     * @param {Number} timeout Access token lifetime in seconds
     *
     * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
     */ updateToken(accessToken, timeout) {
        this.accessToken = accessToken;
        timeout = Math.max(Number(timeout) || 0, 0);
        this.expires = timeout && Date.now() + timeout * 1000 || 0;
        this.emit('token', {
            user: this.options.user,
            accessToken: accessToken || '',
            expires: this.expires
        });
    }
    /**
     * Generates a new XOAuth2 token with the credentials provided at initialization
     *
     * @param {Function} callback Callback function with error object and token string
     */ generateToken(callback) {
        let urlOptions;
        let loggedUrlOptions;
        if (this.options.serviceClient) {
            // service account - https://developers.google.com/identity/protocols/OAuth2ServiceAccount
            let iat = Math.floor(Date.now() / 1000); // unix time
            let tokenData = {
                iss: this.options.serviceClient,
                scope: this.options.scope || 'https://mail.google.com/',
                sub: this.options.user,
                aud: this.options.accessUrl,
                iat,
                exp: iat + this.options.serviceRequestTimeout
            };
            let token;
            try {
                token = this.jwtSignRS256(tokenData);
            } catch (_err) {
                return callback(new Error("Can't generate token. Check your auth options"));
            }
            urlOptions = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: token
            };
            loggedUrlOptions = {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: tokenData
            };
        } else {
            if (!this.options.refreshToken) {
                return callback(new Error("Can't create new access token for user"));
            }
            // web app - https://developers.google.com/identity/protocols/OAuth2WebServer
            urlOptions = {
                client_id: this.options.clientId || '',
                client_secret: this.options.clientSecret || '',
                refresh_token: this.options.refreshToken,
                grant_type: 'refresh_token'
            };
            loggedUrlOptions = {
                client_id: this.options.clientId || '',
                client_secret: (this.options.clientSecret || '').substr(0, 6) + '...',
                refresh_token: (this.options.refreshToken || '').substr(0, 6) + '...',
                grant_type: 'refresh_token'
            };
        }
        Object.keys(this.options.customParams).forEach((key)=>{
            urlOptions[key] = this.options.customParams[key];
            loggedUrlOptions[key] = this.options.customParams[key];
        });
        this.logger.debug({
            tnx: 'OAUTH2',
            user: this.options.user,
            action: 'generate'
        }, 'Requesting token using: %s', JSON.stringify(loggedUrlOptions));
        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body)=>{
            let data;
            if (error) {
                return callback(error);
            }
            try {
                data = JSON.parse(body.toString());
            } catch (E) {
                return callback(E);
            }
            if (!data || typeof data !== 'object') {
                this.logger.debug({
                    tnx: 'OAUTH2',
                    user: this.options.user,
                    action: 'post'
                }, 'Response: %s', (body || '').toString());
                return callback(new Error('Invalid authentication response'));
            }
            let logData = {};
            Object.keys(data).forEach((key)=>{
                if (key !== 'access_token') {
                    logData[key] = data[key];
                } else {
                    logData[key] = (data[key] || '').toString().substr(0, 6) + '...';
                }
            });
            this.logger.debug({
                tnx: 'OAUTH2',
                user: this.options.user,
                action: 'post'
            }, 'Response: %s', JSON.stringify(logData));
            if (data.error) {
                // Error Response : https://tools.ietf.org/html/rfc6749#section-5.2
                let errorMessage = data.error;
                if (data.error_description) {
                    errorMessage += ': ' + data.error_description;
                }
                if (data.error_uri) {
                    errorMessage += ' (' + data.error_uri + ')';
                }
                return callback(new Error(errorMessage));
            }
            if (data.access_token) {
                this.updateToken(data.access_token, data.expires_in);
                return callback(null, this.accessToken);
            }
            return callback(new Error('No access token'));
        });
    }
    /**
     * Converts an access_token and user id into a base64 encoded XOAuth2 token
     *
     * @param {String} [accessToken] Access token string
     * @return {String} Base64 encoded token for IMAP or SMTP login
     */ buildXOAuth2Token(accessToken) {
        let authData = [
            'user=' + (this.options.user || ''),
            'auth=Bearer ' + (accessToken || this.accessToken),
            '',
            ''
        ];
        return Buffer.from(authData.join('\x01'), 'utf-8').toString('base64');
    }
    /**
     * Custom POST request handler.
     * This is only needed to keep paths short in Windows – usually this module
     * is a dependency of a dependency and if it tries to require something
     * like the request module the paths get way too long to handle for Windows.
     * As we do only a simple POST request we do not actually require complicated
     * logic support (no redirects, no nothing) anyway.
     *
     * @param {String} url Url to POST to
     * @param {String|Buffer} payload Payload to POST
     * @param {Function} callback Callback function with (err, buff)
     */ postRequest(url, payload, params, callback) {
        let returned = false;
        let chunks = [];
        let chunklen = 0;
        let req = nmfetch(url, {
            method: 'post',
            headers: params.customHeaders,
            body: payload,
            allowErrorResponse: true
        });
        req.on('readable', ()=>{
            let chunk;
            while((chunk = req.read()) !== null){
                chunks.push(chunk);
                chunklen += chunk.length;
            }
        });
        req.once('error', (err)=>{
            if (returned) {
                return;
            }
            returned = true;
            return callback(err);
        });
        req.once('end', ()=>{
            if (returned) {
                return;
            }
            returned = true;
            return callback(null, Buffer.concat(chunks, chunklen));
        });
    }
    /**
     * Encodes a buffer or a string into Base64url format
     *
     * @param {Buffer|String} data The data to convert
     * @return {String} The encoded string
     */ toBase64URL(data) {
        if (typeof data === 'string') {
            data = Buffer.from(data);
        }
        return data.toString('base64').replace(/[=]+/g, '') // remove '='s
        .replace(/\+/g, '-') // '+' → '-'
        .replace(/\//g, '_'); // '/' → '_'
    }
    /**
     * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
     *
     * @param {Object} payload The payload to include in the generated token
     * @return {String} The generated and signed token
     */ jwtSignRS256(payload) {
        payload = [
            '{"alg":"RS256","typ":"JWT"}',
            JSON.stringify(payload)
        ].map((val)=>this.toBase64URL(val)).join('.');
        let signature = crypto.createSign('RSA-SHA256').update(payload).sign(this.options.privateKey);
        return payload + '.' + this.toBase64URL(signature);
    }
}
module.exports = XOAuth2;
}),
"[project]/node_modules/nodemailer/lib/smtp-pool/pool-resource.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SMTPConnection = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-connection/index.js [app-rsc] (ecmascript)");
const assign = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)").assign;
const XOAuth2 = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/xoauth2/index.js [app-rsc] (ecmascript)");
const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
/**
 * Creates an element for the pool
 *
 * @constructor
 * @param {Object} options SMTPPool instance
 */ class PoolResource extends EventEmitter {
    constructor(pool){
        super();
        this.pool = pool;
        this.options = pool.options;
        this.logger = this.pool.logger;
        if (this.options.auth) {
            switch((this.options.auth.type || '').toString().toUpperCase()){
                case 'OAUTH2':
                    {
                        let oauth2 = new XOAuth2(this.options.auth, this.logger);
                        oauth2.provisionCallback = this.pool.mailer && this.pool.mailer.get('oauth2_provision_cb') || oauth2.provisionCallback;
                        this.auth = {
                            type: 'OAUTH2',
                            user: this.options.auth.user,
                            oauth2,
                            method: 'XOAUTH2'
                        };
                        oauth2.on('token', (token)=>this.pool.mailer.emit('token', token));
                        oauth2.on('error', (err)=>this.emit('error', err));
                        break;
                    }
                default:
                    if (!this.options.auth.user && !this.options.auth.pass) {
                        break;
                    }
                    this.auth = {
                        type: (this.options.auth.type || '').toString().toUpperCase() || 'LOGIN',
                        user: this.options.auth.user,
                        credentials: {
                            user: this.options.auth.user || '',
                            pass: this.options.auth.pass,
                            options: this.options.auth.options
                        },
                        method: (this.options.auth.method || '').trim().toUpperCase() || this.options.authMethod || false
                    };
            }
        }
        this._connection = false;
        this._connected = false;
        this.messages = 0;
        this.available = true;
    }
    /**
     * Initiates a connection to the SMTP server
     *
     * @param {Function} callback Callback function to run once the connection is established or failed
     */ connect(callback) {
        this.pool.getSocket(this.options, (err, socketOptions)=>{
            if (err) {
                return callback(err);
            }
            let returned = false;
            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info({
                    tnx: 'proxy',
                    remoteAddress: socketOptions.connection.remoteAddress,
                    remotePort: socketOptions.connection.remotePort,
                    destHost: options.host || '',
                    destPort: options.port || '',
                    action: 'connected'
                }, 'Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
                options = assign(false, options);
                Object.keys(socketOptions).forEach((key)=>{
                    options[key] = socketOptions[key];
                });
            }
            this.connection = new SMTPConnection(options);
            this.connection.once('error', (err)=>{
                this.emit('error', err);
                if (returned) {
                    return;
                }
                returned = true;
                return callback(err);
            });
            this.connection.once('end', ()=>{
                this.close();
                if (returned) {
                    return;
                }
                returned = true;
                let timer = setTimeout(()=>{
                    if (returned) {
                        return;
                    }
                    // still have not returned, this means we have an unexpected connection close
                    let err = new Error('Unexpected socket close');
                    if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
                        // starttls connection errors
                        err.code = 'ETLS';
                    }
                    callback(err);
                }, 1000);
                try {
                    timer.unref();
                } catch (_E) {
                // Ignore. Happens on envs with non-node timer implementation
                }
            });
            this.connection.connect(()=>{
                if (returned) {
                    return;
                }
                if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
                    this.connection.login(this.auth, (err)=>{
                        if (returned) {
                            return;
                        }
                        returned = true;
                        if (err) {
                            this.connection.close();
                            this.emit('error', err);
                            return callback(err);
                        }
                        this._connected = true;
                        callback(null, true);
                    });
                } else {
                    returned = true;
                    this._connected = true;
                    return callback(null, true);
                }
            });
        });
    }
    /**
     * Sends an e-mail to be sent using the selected settings
     *
     * @param {Object} mail Mail object
     * @param {Function} callback Callback function
     */ send(mail, callback) {
        if (!this._connected) {
            return this.connect((err)=>{
                if (err) {
                    return callback(err);
                }
                return this.send(mail, callback);
            });
        }
        let envelope = mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId,
            cid: this.id
        }, 'Sending message %s using #%s to <%s>', messageId, this.id, recipients.join(', '));
        if (mail.data.dsn) {
            envelope.dsn = mail.data.dsn;
        }
        // RFC 8689: Pass requireTLSExtensionEnabled to envelope for MAIL FROM parameter
        if (mail.data.requireTLSExtensionEnabled) {
            envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
        }
        this.connection.send(envelope, mail.message.createReadStream(), (err, info)=>{
            this.messages++;
            if (err) {
                this.connection.close();
                this.emit('error', err);
                return callback(err);
            }
            info.envelope = {
                from: envelope.from,
                to: envelope.to
            };
            info.messageId = messageId;
            setImmediate(()=>{
                let err;
                if (this.messages >= this.options.maxMessages) {
                    err = new Error('Resource exhausted');
                    err.code = 'EMAXLIMIT';
                    this.connection.close();
                    this.emit('error', err);
                } else {
                    this.pool._checkRateLimit(()=>{
                        this.available = true;
                        this.emit('available');
                    });
                }
            });
            callback(null, info);
        });
    }
    /**
     * Closes the connection
     */ close() {
        this._connected = false;
        if (this.auth && this.auth.oauth2) {
            this.auth.oauth2.removeAllListeners();
        }
        if (this.connection) {
            this.connection.close();
        }
        this.emit('close');
    }
}
module.exports = PoolResource;
}),
"[project]/node_modules/nodemailer/lib/well-known/services.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"1und1\":{\"description\":\"1&1 Mail (German hosting provider)\",\"host\":\"smtp.1und1.de\",\"port\":465,\"secure\":true,\"authMethod\":\"LOGIN\"},\"126\":{\"description\":\"126 Mail (NetEase)\",\"host\":\"smtp.126.com\",\"port\":465,\"secure\":true},\"163\":{\"description\":\"163 Mail (NetEase)\",\"host\":\"smtp.163.com\",\"port\":465,\"secure\":true},\"Aliyun\":{\"description\":\"Alibaba Cloud Mail\",\"domains\":[\"aliyun.com\"],\"host\":\"smtp.aliyun.com\",\"port\":465,\"secure\":true},\"AliyunQiye\":{\"description\":\"Alibaba Cloud Enterprise Mail\",\"host\":\"smtp.qiye.aliyun.com\",\"port\":465,\"secure\":true},\"AOL\":{\"description\":\"AOL Mail\",\"domains\":[\"aol.com\"],\"host\":\"smtp.aol.com\",\"port\":587},\"Aruba\":{\"description\":\"Aruba PEC (Italian email provider)\",\"domains\":[\"aruba.it\",\"pec.aruba.it\"],\"aliases\":[\"Aruba PEC\"],\"host\":\"smtps.aruba.it\",\"port\":465,\"secure\":true,\"authMethod\":\"LOGIN\"},\"Bluewin\":{\"description\":\"Bluewin (Swiss email provider)\",\"host\":\"smtpauths.bluewin.ch\",\"domains\":[\"bluewin.ch\"],\"port\":465},\"BOL\":{\"description\":\"BOL Mail (Brazilian provider)\",\"domains\":[\"bol.com.br\"],\"host\":\"smtp.bol.com.br\",\"port\":587,\"requireTLS\":true},\"DebugMail\":{\"description\":\"DebugMail (email testing service)\",\"host\":\"debugmail.io\",\"port\":25},\"Disroot\":{\"description\":\"Disroot (privacy-focused provider)\",\"domains\":[\"disroot.org\"],\"host\":\"disroot.org\",\"port\":587,\"secure\":false,\"authMethod\":\"LOGIN\"},\"DynectEmail\":{\"description\":\"Dyn Email Delivery\",\"aliases\":[\"Dynect\"],\"host\":\"smtp.dynect.net\",\"port\":25},\"ElasticEmail\":{\"description\":\"Elastic Email\",\"aliases\":[\"Elastic Email\"],\"host\":\"smtp.elasticemail.com\",\"port\":465,\"secure\":true},\"Ethereal\":{\"description\":\"Ethereal Email (email testing service)\",\"aliases\":[\"ethereal.email\"],\"host\":\"smtp.ethereal.email\",\"port\":587},\"FastMail\":{\"description\":\"FastMail\",\"domains\":[\"fastmail.fm\"],\"host\":\"smtp.fastmail.com\",\"port\":465,\"secure\":true},\"Feishu Mail\":{\"description\":\"Feishu Mail (Lark)\",\"aliases\":[\"Feishu\",\"FeishuMail\"],\"domains\":[\"www.feishu.cn\"],\"host\":\"smtp.feishu.cn\",\"port\":465,\"secure\":true},\"Forward Email\":{\"description\":\"Forward Email (email forwarding service)\",\"aliases\":[\"FE\",\"ForwardEmail\"],\"domains\":[\"forwardemail.net\"],\"host\":\"smtp.forwardemail.net\",\"port\":465,\"secure\":true},\"GandiMail\":{\"description\":\"Gandi Mail\",\"aliases\":[\"Gandi\",\"Gandi Mail\"],\"host\":\"mail.gandi.net\",\"port\":587},\"Gmail\":{\"description\":\"Gmail\",\"aliases\":[\"Google Mail\"],\"domains\":[\"gmail.com\",\"googlemail.com\"],\"host\":\"smtp.gmail.com\",\"port\":465,\"secure\":true},\"GMX\":{\"description\":\"GMX Mail\",\"domains\":[\"gmx.com\",\"gmx.net\",\"gmx.de\"],\"host\":\"mail.gmx.com\",\"port\":587},\"Godaddy\":{\"description\":\"GoDaddy Email (US)\",\"host\":\"smtpout.secureserver.net\",\"port\":25},\"GodaddyAsia\":{\"description\":\"GoDaddy Email (Asia)\",\"host\":\"smtp.asia.secureserver.net\",\"port\":25},\"GodaddyEurope\":{\"description\":\"GoDaddy Email (Europe)\",\"host\":\"smtp.europe.secureserver.net\",\"port\":25},\"hot.ee\":{\"description\":\"Hot.ee (Estonian email provider)\",\"host\":\"mail.hot.ee\"},\"Hotmail\":{\"description\":\"Outlook.com / Hotmail\",\"aliases\":[\"Outlook\",\"Outlook.com\",\"Hotmail.com\"],\"domains\":[\"hotmail.com\",\"outlook.com\"],\"host\":\"smtp-mail.outlook.com\",\"port\":587},\"iCloud\":{\"description\":\"iCloud Mail\",\"aliases\":[\"Me\",\"Mac\"],\"domains\":[\"me.com\",\"mac.com\"],\"host\":\"smtp.mail.me.com\",\"port\":587},\"Infomaniak\":{\"description\":\"Infomaniak Mail (Swiss hosting provider)\",\"host\":\"mail.infomaniak.com\",\"domains\":[\"ik.me\",\"ikmail.com\",\"etik.com\"],\"port\":587},\"KolabNow\":{\"description\":\"KolabNow (secure email service)\",\"domains\":[\"kolabnow.com\"],\"aliases\":[\"Kolab\"],\"host\":\"smtp.kolabnow.com\",\"port\":465,\"secure\":true,\"authMethod\":\"LOGIN\"},\"Loopia\":{\"description\":\"Loopia (Swedish hosting provider)\",\"host\":\"mailcluster.loopia.se\",\"port\":465},\"Loops\":{\"description\":\"Loops\",\"host\":\"smtp.loops.so\",\"port\":587},\"mail.ee\":{\"description\":\"Mail.ee (Estonian email provider)\",\"host\":\"smtp.mail.ee\"},\"Mail.ru\":{\"description\":\"Mail.ru\",\"host\":\"smtp.mail.ru\",\"port\":465,\"secure\":true},\"Mailcatch.app\":{\"description\":\"Mailcatch (email testing service)\",\"host\":\"sandbox-smtp.mailcatch.app\",\"port\":2525},\"Maildev\":{\"description\":\"MailDev (local email testing)\",\"port\":1025,\"ignoreTLS\":true},\"MailerSend\":{\"description\":\"MailerSend\",\"host\":\"smtp.mailersend.net\",\"port\":587},\"Mailgun\":{\"description\":\"Mailgun\",\"host\":\"smtp.mailgun.org\",\"port\":465,\"secure\":true},\"Mailjet\":{\"description\":\"Mailjet\",\"host\":\"in.mailjet.com\",\"port\":587},\"Mailosaur\":{\"description\":\"Mailosaur (email testing service)\",\"host\":\"mailosaur.io\",\"port\":25},\"Mailtrap\":{\"description\":\"Mailtrap\",\"host\":\"live.smtp.mailtrap.io\",\"port\":587},\"Mandrill\":{\"description\":\"Mandrill (by Mailchimp)\",\"host\":\"smtp.mandrillapp.com\",\"port\":587},\"Naver\":{\"description\":\"Naver Mail (Korean email provider)\",\"host\":\"smtp.naver.com\",\"port\":587},\"OhMySMTP\":{\"description\":\"OhMySMTP (email delivery service)\",\"host\":\"smtp.ohmysmtp.com\",\"port\":587,\"secure\":false},\"One\":{\"description\":\"One.com Email\",\"host\":\"send.one.com\",\"port\":465,\"secure\":true},\"OpenMailBox\":{\"description\":\"OpenMailBox\",\"aliases\":[\"OMB\",\"openmailbox.org\"],\"host\":\"smtp.openmailbox.org\",\"port\":465,\"secure\":true},\"Outlook365\":{\"description\":\"Microsoft 365 / Office 365\",\"host\":\"smtp.office365.com\",\"port\":587,\"secure\":false},\"Postmark\":{\"description\":\"Postmark\",\"aliases\":[\"PostmarkApp\"],\"host\":\"smtp.postmarkapp.com\",\"port\":2525},\"Proton\":{\"description\":\"Proton Mail\",\"aliases\":[\"ProtonMail\",\"Proton.me\",\"Protonmail.com\",\"Protonmail.ch\"],\"domains\":[\"proton.me\",\"protonmail.com\",\"pm.me\",\"protonmail.ch\"],\"host\":\"smtp.protonmail.ch\",\"port\":587,\"requireTLS\":true},\"qiye.aliyun\":{\"description\":\"Alibaba Mail Enterprise Edition\",\"host\":\"smtp.mxhichina.com\",\"port\":\"465\",\"secure\":true},\"QQ\":{\"description\":\"QQ Mail\",\"domains\":[\"qq.com\"],\"host\":\"smtp.qq.com\",\"port\":465,\"secure\":true},\"QQex\":{\"description\":\"QQ Enterprise Mail\",\"aliases\":[\"QQ Enterprise\"],\"domains\":[\"exmail.qq.com\"],\"host\":\"smtp.exmail.qq.com\",\"port\":465,\"secure\":true},\"Resend\":{\"description\":\"Resend\",\"host\":\"smtp.resend.com\",\"port\":465,\"secure\":true},\"Runbox\":{\"description\":\"Runbox (Norwegian email provider)\",\"domains\":[\"runbox.com\"],\"host\":\"smtp.runbox.com\",\"port\":465,\"secure\":true},\"SendCloud\":{\"description\":\"SendCloud (Chinese email delivery)\",\"host\":\"smtp.sendcloud.net\",\"port\":2525},\"SendGrid\":{\"description\":\"SendGrid\",\"host\":\"smtp.sendgrid.net\",\"port\":587},\"SendinBlue\":{\"description\":\"Brevo (formerly Sendinblue)\",\"aliases\":[\"Brevo\"],\"host\":\"smtp-relay.brevo.com\",\"port\":587},\"SendPulse\":{\"description\":\"SendPulse\",\"host\":\"smtp-pulse.com\",\"port\":465,\"secure\":true},\"SES\":{\"description\":\"AWS SES US East (N. Virginia)\",\"host\":\"email-smtp.us-east-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-AP-NORTHEAST-1\":{\"description\":\"AWS SES Asia Pacific (Tokyo)\",\"host\":\"email-smtp.ap-northeast-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-AP-NORTHEAST-2\":{\"description\":\"AWS SES Asia Pacific (Seoul)\",\"host\":\"email-smtp.ap-northeast-2.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-AP-NORTHEAST-3\":{\"description\":\"AWS SES Asia Pacific (Osaka)\",\"host\":\"email-smtp.ap-northeast-3.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-AP-SOUTH-1\":{\"description\":\"AWS SES Asia Pacific (Mumbai)\",\"host\":\"email-smtp.ap-south-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-AP-SOUTHEAST-1\":{\"description\":\"AWS SES Asia Pacific (Singapore)\",\"host\":\"email-smtp.ap-southeast-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-AP-SOUTHEAST-2\":{\"description\":\"AWS SES Asia Pacific (Sydney)\",\"host\":\"email-smtp.ap-southeast-2.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-CA-CENTRAL-1\":{\"description\":\"AWS SES Canada (Central)\",\"host\":\"email-smtp.ca-central-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-EU-CENTRAL-1\":{\"description\":\"AWS SES Europe (Frankfurt)\",\"host\":\"email-smtp.eu-central-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-EU-NORTH-1\":{\"description\":\"AWS SES Europe (Stockholm)\",\"host\":\"email-smtp.eu-north-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-EU-WEST-1\":{\"description\":\"AWS SES Europe (Ireland)\",\"host\":\"email-smtp.eu-west-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-EU-WEST-2\":{\"description\":\"AWS SES Europe (London)\",\"host\":\"email-smtp.eu-west-2.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-EU-WEST-3\":{\"description\":\"AWS SES Europe (Paris)\",\"host\":\"email-smtp.eu-west-3.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-SA-EAST-1\":{\"description\":\"AWS SES South America (São Paulo)\",\"host\":\"email-smtp.sa-east-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-US-EAST-1\":{\"description\":\"AWS SES US East (N. Virginia)\",\"host\":\"email-smtp.us-east-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-US-EAST-2\":{\"description\":\"AWS SES US East (Ohio)\",\"host\":\"email-smtp.us-east-2.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-US-GOV-EAST-1\":{\"description\":\"AWS SES GovCloud (US-East)\",\"host\":\"email-smtp.us-gov-east-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-US-GOV-WEST-1\":{\"description\":\"AWS SES GovCloud (US-West)\",\"host\":\"email-smtp.us-gov-west-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-US-WEST-1\":{\"description\":\"AWS SES US West (N. California)\",\"host\":\"email-smtp.us-west-1.amazonaws.com\",\"port\":465,\"secure\":true},\"SES-US-WEST-2\":{\"description\":\"AWS SES US West (Oregon)\",\"host\":\"email-smtp.us-west-2.amazonaws.com\",\"port\":465,\"secure\":true},\"Seznam\":{\"description\":\"Seznam Email (Czech email provider)\",\"aliases\":[\"Seznam Email\"],\"domains\":[\"seznam.cz\",\"email.cz\",\"post.cz\",\"spoluzaci.cz\"],\"host\":\"smtp.seznam.cz\",\"port\":465,\"secure\":true},\"SMTP2GO\":{\"description\":\"SMTP2GO\",\"host\":\"mail.smtp2go.com\",\"port\":2525},\"Sparkpost\":{\"description\":\"SparkPost\",\"aliases\":[\"SparkPost\",\"SparkPost Mail\"],\"domains\":[\"sparkpost.com\"],\"host\":\"smtp.sparkpostmail.com\",\"port\":587,\"secure\":false},\"Tipimail\":{\"description\":\"Tipimail (email delivery service)\",\"host\":\"smtp.tipimail.com\",\"port\":587},\"Tutanota\":{\"description\":\"Tutanota (Tuta Mail)\",\"domains\":[\"tutanota.com\",\"tuta.com\",\"tutanota.de\",\"tuta.io\"],\"host\":\"smtp.tutanota.com\",\"port\":465,\"secure\":true},\"Yahoo\":{\"description\":\"Yahoo Mail\",\"domains\":[\"yahoo.com\"],\"host\":\"smtp.mail.yahoo.com\",\"port\":465,\"secure\":true},\"Yandex\":{\"description\":\"Yandex Mail\",\"domains\":[\"yandex.ru\"],\"host\":\"smtp.yandex.ru\",\"port\":465,\"secure\":true},\"Zimbra\":{\"description\":\"Zimbra Mail Server\",\"aliases\":[\"Zimbra Collaboration\"],\"host\":\"smtp.zimbra.com\",\"port\":587,\"requireTLS\":true},\"Zoho\":{\"description\":\"Zoho Mail\",\"host\":\"smtp.zoho.com\",\"port\":465,\"secure\":true,\"authMethod\":\"LOGIN\"}}"));}),
"[project]/node_modules/nodemailer/lib/well-known/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const services = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/well-known/services.json (json)");
const normalized = {};
Object.keys(services).forEach((key)=>{
    let service = services[key];
    normalized[normalizeKey(key)] = normalizeService(service);
    [].concat(service.aliases || []).forEach((alias)=>{
        normalized[normalizeKey(alias)] = normalizeService(service);
    });
    [].concat(service.domains || []).forEach((domain)=>{
        normalized[normalizeKey(domain)] = normalizeService(service);
    });
});
function normalizeKey(key) {
    return key.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase();
}
function normalizeService(service) {
    let filter = [
        'domains',
        'aliases'
    ];
    let response = {};
    Object.keys(service).forEach((key)=>{
        if (filter.indexOf(key) < 0) {
            response[key] = service[key];
        }
    });
    return response;
}
/**
 * Resolves SMTP config for given key. Key can be a name (like 'Gmail'), alias (like 'Google Mail') or
 * an email address (like 'test@googlemail.com').
 *
 * @param {String} key [description]
 * @returns {Object} SMTP config or false if not found
 */ module.exports = function(key) {
    key = normalizeKey(key.split('@').pop());
    return normalized[key] || false;
};
}),
"[project]/node_modules/nodemailer/lib/smtp-pool/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const PoolResource = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-pool/pool-resource.js [app-rsc] (ecmascript)");
const SMTPConnection = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-connection/index.js [app-rsc] (ecmascript)");
const wellKnown = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/well-known/index.js [app-rsc] (ecmascript)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
/**
 * Creates a SMTP pool transport object for Nodemailer
 *
 * @constructor
 * @param {Object} options SMTP Connection options
 */ class SMTPPool extends EventEmitter {
    constructor(options){
        super();
        options = options || {};
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === 'function') {
            this.getSocket = options.getSocket;
        }
        if (options.url) {
            urlData = shared.parseConnectionUrl(options.url);
            service = service || urlData.service;
        }
        this.options = shared.assign(false, options, urlData, service && wellKnown(service) // wellknown options
        );
        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'smtp-pool'
        });
        // temporary object
        let connection = new SMTPConnection(this.options);
        this.name = 'SMTP (pool)';
        this.version = packageData.version + '[client:' + connection.version + ']';
        this._rateLimit = {
            counter: 0,
            timeout: null,
            waiting: [],
            checkpoint: false,
            delta: Number(this.options.rateDelta) || 1000,
            limit: Number(this.options.rateLimit) || 0
        };
        this._closed = false;
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;
        this.idling = true;
        setImmediate(()=>{
            if (this.idling) {
                this.emit('idle');
            }
        });
    }
    /**
     * Placeholder function for creating proxy sockets. This method immediatelly returns
     * without a socket
     *
     * @param {Object} options Connection options
     * @param {Function} callback Callback function to run with the socket keys
     */ getSocket(options, callback) {
        // return immediatelly
        return setImmediate(()=>callback(null, false));
    }
    /**
     * Queues an e-mail to be sent using the selected settings
     *
     * @param {Object} mail Mail object
     * @param {Function} callback Callback function
     */ send(mail, callback) {
        if (this._closed) {
            return false;
        }
        this._queue.push({
            mail,
            requeueAttempts: 0,
            callback
        });
        if (this.idling && this._queue.length >= this.options.maxConnections) {
            this.idling = false;
        }
        setImmediate(()=>this._processMessages());
        return true;
    }
    /**
     * Closes all connections in the pool. If there is a message being sent, the connection
     * is closed later
     */ close() {
        let connection;
        let len = this._connections.length;
        this._closed = true;
        // clear rate limit timer if it exists
        clearTimeout(this._rateLimit.timeout);
        if (!len && !this._queue.length) {
            return;
        }
        // remove all available connections
        for(let i = len - 1; i >= 0; i--){
            if (this._connections[i] && this._connections[i].available) {
                connection = this._connections[i];
                connection.close();
                this.logger.info({
                    tnx: 'connection',
                    cid: connection.id,
                    action: 'removed'
                }, 'Connection #%s removed', connection.id);
            }
        }
        if (len && !this._connections.length) {
            this.logger.debug({
                tnx: 'connection'
            }, 'All connections removed');
        }
        if (!this._queue.length) {
            return;
        }
        // make sure that entire queue would be cleaned
        let invokeCallbacks = ()=>{
            if (!this._queue.length) {
                this.logger.debug({
                    tnx: 'connection'
                }, 'Pending queue entries cleared');
                return;
            }
            let entry = this._queue.shift();
            if (entry && typeof entry.callback === 'function') {
                try {
                    entry.callback(new Error('Connection pool was closed'));
                } catch (E) {
                    this.logger.error({
                        err: E,
                        tnx: 'callback',
                        cid: connection.id
                    }, 'Callback error for #%s: %s', connection.id, E.message);
                }
            }
            setImmediate(invokeCallbacks);
        };
        setImmediate(invokeCallbacks);
    }
    /**
     * Check the queue and available connections. If there is a message to be sent and there is
     * an available connection, then use this connection to send the mail
     */ _processMessages() {
        let connection;
        let i, len;
        // do nothing if already closed
        if (this._closed) {
            return;
        }
        // do nothing if queue is empty
        if (!this._queue.length) {
            if (!this.idling) {
                // no pending jobs
                this.idling = true;
                this.emit('idle');
            }
            return;
        }
        // find first available connection
        for(i = 0, len = this._connections.length; i < len; i++){
            if (this._connections[i].available) {
                connection = this._connections[i];
                break;
            }
        }
        if (!connection && this._connections.length < this.options.maxConnections) {
            connection = this._createConnection();
        }
        if (!connection) {
            // no more free connection slots available
            this.idling = false;
            return;
        }
        // check if there is free space in the processing queue
        if (!this.idling && this._queue.length < this.options.maxConnections) {
            this.idling = true;
            this.emit('idle');
        }
        let entry = connection.queueEntry = this._queue.shift();
        entry.messageId = (connection.queueEntry.mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
        connection.available = false;
        this.logger.debug({
            tnx: 'pool',
            cid: connection.id,
            messageId: entry.messageId,
            action: 'assign'
        }, 'Assigned message <%s> to #%s (%s)', entry.messageId, connection.id, connection.messages + 1);
        if (this._rateLimit.limit) {
            this._rateLimit.counter++;
            if (!this._rateLimit.checkpoint) {
                this._rateLimit.checkpoint = Date.now();
            }
        }
        connection.send(entry.mail, (err, info)=>{
            // only process callback if current handler is not changed
            if (entry === connection.queueEntry) {
                try {
                    entry.callback(err, info);
                } catch (E) {
                    this.logger.error({
                        err: E,
                        tnx: 'callback',
                        cid: connection.id
                    }, 'Callback error for #%s: %s', connection.id, E.message);
                }
                connection.queueEntry = false;
            }
        });
    }
    /**
     * Creates a new pool resource
     */ _createConnection() {
        let connection = new PoolResource(this);
        connection.id = ++this._connectionCounter;
        this.logger.info({
            tnx: 'pool',
            cid: connection.id,
            action: 'conection'
        }, 'Created new pool resource #%s', connection.id);
        // resource comes available
        connection.on('available', ()=>{
            this.logger.debug({
                tnx: 'connection',
                cid: connection.id,
                action: 'available'
            }, 'Connection #%s became available', connection.id);
            if (this._closed) {
                // if already closed run close() that will remove this connections from connections list
                this.close();
            } else {
                // check if there's anything else to send
                this._processMessages();
            }
        });
        // resource is terminated with an error
        connection.once('error', (err)=>{
            if (err.code !== 'EMAXLIMIT') {
                this.logger.warn({
                    err,
                    tnx: 'pool',
                    cid: connection.id
                }, 'Pool Error for #%s: %s', connection.id, err.message);
            } else {
                this.logger.debug({
                    tnx: 'pool',
                    cid: connection.id,
                    action: 'maxlimit'
                }, 'Max messages limit exchausted for #%s', connection.id);
            }
            if (connection.queueEntry) {
                try {
                    connection.queueEntry.callback(err);
                } catch (E) {
                    this.logger.error({
                        err: E,
                        tnx: 'callback',
                        cid: connection.id
                    }, 'Callback error for #%s: %s', connection.id, E.message);
                }
                connection.queueEntry = false;
            }
            // remove the erroneus connection from connections list
            this._removeConnection(connection);
            this._continueProcessing();
        });
        connection.once('close', ()=>{
            this.logger.info({
                tnx: 'connection',
                cid: connection.id,
                action: 'closed'
            }, 'Connection #%s was closed', connection.id);
            this._removeConnection(connection);
            if (connection.queueEntry) {
                // If the connection closed when sending, add the message to the queue again
                // if max number of requeues is not reached yet
                // Note that we must wait a bit.. because the callback of the 'error' handler might be called
                // in the next event loop
                setTimeout(()=>{
                    if (connection.queueEntry) {
                        if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
                            this._requeueEntryOnConnectionClose(connection);
                        } else {
                            this._failDeliveryOnConnectionClose(connection);
                        }
                    }
                    this._continueProcessing();
                }, 50);
            } else {
                if (!this._closed && this.idling && !this._connections.length) {
                    this.emit('clear');
                }
                this._continueProcessing();
            }
        });
        this._connections.push(connection);
        return connection;
    }
    _shouldRequeuOnConnectionClose(queueEntry) {
        if (this.options.maxRequeues === undefined || this.options.maxRequeues < 0) {
            return true;
        }
        return queueEntry.requeueAttempts < this.options.maxRequeues;
    }
    _failDeliveryOnConnectionClose(connection) {
        if (connection.queueEntry && connection.queueEntry.callback) {
            try {
                connection.queueEntry.callback(new Error('Reached maximum number of retries after connection was closed'));
            } catch (E) {
                this.logger.error({
                    err: E,
                    tnx: 'callback',
                    messageId: connection.queueEntry.messageId,
                    cid: connection.id
                }, 'Callback error for #%s: %s', connection.id, E.message);
            }
            connection.queueEntry = false;
        }
    }
    _requeueEntryOnConnectionClose(connection) {
        connection.queueEntry.requeueAttempts = connection.queueEntry.requeueAttempts + 1;
        this.logger.debug({
            tnx: 'pool',
            cid: connection.id,
            messageId: connection.queueEntry.messageId,
            action: 'requeue'
        }, 'Re-queued message <%s> for #%s. Attempt: #%s', connection.queueEntry.messageId, connection.id, connection.queueEntry.requeueAttempts);
        this._queue.unshift(connection.queueEntry);
        connection.queueEntry = false;
    }
    /**
     * Continue to process message if the pool hasn't closed
     */ _continueProcessing() {
        if (this._closed) {
            this.close();
        } else {
            setTimeout(()=>this._processMessages(), 100);
        }
    }
    /**
     * Remove resource from pool
     *
     * @param {Object} connection The PoolResource to remove
     */ _removeConnection(connection) {
        let index = this._connections.indexOf(connection);
        if (index !== -1) {
            this._connections.splice(index, 1);
        }
    }
    /**
     * Checks if connections have hit current rate limit and if so, queues the availability callback
     *
     * @param {Function} callback Callback function to run once rate limiter has been cleared
     */ _checkRateLimit(callback) {
        if (!this._rateLimit.limit) {
            return callback();
        }
        let now = Date.now();
        if (this._rateLimit.counter < this._rateLimit.limit) {
            return callback();
        }
        this._rateLimit.waiting.push(callback);
        if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
            return this._clearRateLimit();
        } else if (!this._rateLimit.timeout) {
            this._rateLimit.timeout = setTimeout(()=>this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
            this._rateLimit.checkpoint = now;
        }
    }
    /**
     * Clears current rate limit limitation and runs paused callback
     */ _clearRateLimit() {
        clearTimeout(this._rateLimit.timeout);
        this._rateLimit.timeout = null;
        this._rateLimit.counter = 0;
        this._rateLimit.checkpoint = false;
        // resume all paused connections
        while(this._rateLimit.waiting.length){
            let cb = this._rateLimit.waiting.shift();
            setImmediate(cb);
        }
    }
    /**
     * Returns true if there are free slots in the queue
     */ isIdle() {
        return this.idling;
    }
    /**
     * Verifies SMTP configuration
     *
     * @param {Function} callback Callback function
     */ verify(callback) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject)=>{
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        let auth = new PoolResource(this).auth;
        this.getSocket(this.options, (err, socketOptions)=>{
            if (err) {
                return callback(err);
            }
            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info({
                    tnx: 'proxy',
                    remoteAddress: socketOptions.connection.remoteAddress,
                    remotePort: socketOptions.connection.remotePort,
                    destHost: options.host || '',
                    destPort: options.port || '',
                    action: 'connected'
                }, 'Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
                options = shared.assign(false, options);
                Object.keys(socketOptions).forEach((key)=>{
                    options[key] = socketOptions[key];
                });
            }
            let connection = new SMTPConnection(options);
            let returned = false;
            connection.once('error', (err)=>{
                if (returned) {
                    return;
                }
                returned = true;
                connection.close();
                return callback(err);
            });
            connection.once('end', ()=>{
                if (returned) {
                    return;
                }
                returned = true;
                return callback(new Error('Connection closed'));
            });
            let finalize = ()=>{
                if (returned) {
                    return;
                }
                returned = true;
                connection.quit();
                return callback(null, true);
            };
            connection.connect(()=>{
                if (returned) {
                    return;
                }
                if (auth && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(auth, (err)=>{
                        if (returned) {
                            return;
                        }
                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }
                        finalize();
                    });
                } else if (!auth && connection.allowsAuth && options.forceAuth) {
                    let err = new Error('Authentication info was not provided');
                    err.code = 'NoAuth';
                    returned = true;
                    connection.close();
                    return callback(err);
                } else {
                    finalize();
                }
            });
        });
        return promise;
    }
}
// expose to the world
module.exports = SMTPPool;
}),
"[project]/node_modules/nodemailer/lib/smtp-transport/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const SMTPConnection = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-connection/index.js [app-rsc] (ecmascript)");
const wellKnown = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/well-known/index.js [app-rsc] (ecmascript)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
const XOAuth2 = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/xoauth2/index.js [app-rsc] (ecmascript)");
const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
/**
 * Creates a SMTP transport object for Nodemailer
 *
 * @constructor
 * @param {Object} options Connection options
 */ class SMTPTransport extends EventEmitter {
    constructor(options){
        super();
        options = options || {};
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === 'function') {
            this.getSocket = options.getSocket;
        }
        if (options.url) {
            urlData = shared.parseConnectionUrl(options.url);
            service = service || urlData.service;
        }
        this.options = shared.assign(false, options, urlData, service && wellKnown(service) // wellknown options
        );
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'smtp-transport'
        });
        // temporary object
        let connection = new SMTPConnection(this.options);
        this.name = 'SMTP';
        this.version = packageData.version + '[client:' + connection.version + ']';
        if (this.options.auth) {
            this.auth = this.getAuth({});
        }
    }
    /**
     * Placeholder function for creating proxy sockets. This method immediatelly returns
     * without a socket
     *
     * @param {Object} options Connection options
     * @param {Function} callback Callback function to run with the socket keys
     */ getSocket(options, callback) {
        // return immediatelly
        return setImmediate(()=>callback(null, false));
    }
    getAuth(authOpts) {
        if (!authOpts) {
            return this.auth;
        }
        let hasAuth = false;
        let authData = {};
        if (this.options.auth && typeof this.options.auth === 'object') {
            Object.keys(this.options.auth).forEach((key)=>{
                hasAuth = true;
                authData[key] = this.options.auth[key];
            });
        }
        if (authOpts && typeof authOpts === 'object') {
            Object.keys(authOpts).forEach((key)=>{
                hasAuth = true;
                authData[key] = authOpts[key];
            });
        }
        if (!hasAuth) {
            return false;
        }
        switch((authData.type || '').toString().toUpperCase()){
            case 'OAUTH2':
                {
                    if (!authData.service && !authData.user) {
                        return false;
                    }
                    let oauth2 = new XOAuth2(authData, this.logger);
                    oauth2.provisionCallback = this.mailer && this.mailer.get('oauth2_provision_cb') || oauth2.provisionCallback;
                    oauth2.on('token', (token)=>this.mailer.emit('token', token));
                    oauth2.on('error', (err)=>this.emit('error', err));
                    return {
                        type: 'OAUTH2',
                        user: authData.user,
                        oauth2,
                        method: 'XOAUTH2'
                    };
                }
            default:
                return {
                    type: (authData.type || '').toString().toUpperCase() || 'LOGIN',
                    user: authData.user,
                    credentials: {
                        user: authData.user || '',
                        pass: authData.pass,
                        options: authData.options
                    },
                    method: (authData.method || '').trim().toUpperCase() || this.options.authMethod || false
                };
        }
    }
    /**
     * Sends an e-mail using the selected settings
     *
     * @param {Object} mail Mail object
     * @param {Function} callback Callback function
     */ send(mail, callback) {
        this.getSocket(this.options, (err, socketOptions)=>{
            if (err) {
                return callback(err);
            }
            let returned = false;
            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info({
                    tnx: 'proxy',
                    remoteAddress: socketOptions.connection.remoteAddress,
                    remotePort: socketOptions.connection.remotePort,
                    destHost: options.host || '',
                    destPort: options.port || '',
                    action: 'connected'
                }, 'Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
                // only copy options if we need to modify it
                options = shared.assign(false, options);
                Object.keys(socketOptions).forEach((key)=>{
                    options[key] = socketOptions[key];
                });
            }
            let connection = new SMTPConnection(options);
            connection.once('error', (err)=>{
                if (returned) {
                    return;
                }
                returned = true;
                connection.close();
                return callback(err);
            });
            connection.once('end', ()=>{
                if (returned) {
                    return;
                }
                let timer = setTimeout(()=>{
                    if (returned) {
                        return;
                    }
                    returned = true;
                    // still have not returned, this means we have an unexpected connection close
                    let err = new Error('Unexpected socket close');
                    if (connection && connection._socket && connection._socket.upgrading) {
                        // starttls connection errors
                        err.code = 'ETLS';
                    }
                    callback(err);
                }, 1000);
                try {
                    timer.unref();
                } catch (_E) {
                // Ignore. Happens on envs with non-node timer implementation
                }
            });
            let sendMessage = ()=>{
                let envelope = mail.message.getEnvelope();
                let messageId = mail.message.messageId();
                let recipients = [].concat(envelope.to || []);
                if (recipients.length > 3) {
                    recipients.push('...and ' + recipients.splice(2).length + ' more');
                }
                if (mail.data.dsn) {
                    envelope.dsn = mail.data.dsn;
                }
                // RFC 8689: Pass requireTLSExtensionEnabled to envelope for MAIL FROM parameter
                if (mail.data.requireTLSExtensionEnabled) {
                    envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
                }
                this.logger.info({
                    tnx: 'send',
                    messageId
                }, 'Sending message %s to <%s>', messageId, recipients.join(', '));
                connection.send(envelope, mail.message.createReadStream(), (err, info)=>{
                    returned = true;
                    connection.close();
                    if (err) {
                        this.logger.error({
                            err,
                            tnx: 'send'
                        }, 'Send error for %s: %s', messageId, err.message);
                        return callback(err);
                    }
                    info.envelope = {
                        from: envelope.from,
                        to: envelope.to
                    };
                    info.messageId = messageId;
                    try {
                        return callback(null, info);
                    } catch (E) {
                        this.logger.error({
                            err: E,
                            tnx: 'callback'
                        }, 'Callback error for %s: %s', messageId, E.message);
                    }
                });
            };
            connection.connect(()=>{
                if (returned) {
                    return;
                }
                let auth = this.getAuth(mail.data.auth);
                if (auth && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(auth, (err)=>{
                        if (auth && auth !== this.auth && auth.oauth2) {
                            auth.oauth2.removeAllListeners();
                        }
                        if (returned) {
                            return;
                        }
                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }
                        sendMessage();
                    });
                } else {
                    sendMessage();
                }
            });
        });
    }
    /**
     * Verifies SMTP configuration
     *
     * @param {Function} callback Callback function
     */ verify(callback) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject)=>{
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        this.getSocket(this.options, (err, socketOptions)=>{
            if (err) {
                return callback(err);
            }
            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                this.logger.info({
                    tnx: 'proxy',
                    remoteAddress: socketOptions.connection.remoteAddress,
                    remotePort: socketOptions.connection.remotePort,
                    destHost: options.host || '',
                    destPort: options.port || '',
                    action: 'connected'
                }, 'Using proxied socket from %s:%s to %s:%s', socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || '', options.port || '');
                options = shared.assign(false, options);
                Object.keys(socketOptions).forEach((key)=>{
                    options[key] = socketOptions[key];
                });
            }
            let connection = new SMTPConnection(options);
            let returned = false;
            connection.once('error', (err)=>{
                if (returned) {
                    return;
                }
                returned = true;
                connection.close();
                return callback(err);
            });
            connection.once('end', ()=>{
                if (returned) {
                    return;
                }
                returned = true;
                return callback(new Error('Connection closed'));
            });
            let finalize = ()=>{
                if (returned) {
                    return;
                }
                returned = true;
                connection.quit();
                return callback(null, true);
            };
            connection.connect(()=>{
                if (returned) {
                    return;
                }
                let authData = this.getAuth({});
                if (authData && (connection.allowsAuth || options.forceAuth)) {
                    connection.login(authData, (err)=>{
                        if (returned) {
                            return;
                        }
                        if (err) {
                            returned = true;
                            connection.close();
                            return callback(err);
                        }
                        finalize();
                    });
                } else if (!authData && connection.allowsAuth && options.forceAuth) {
                    let err = new Error('Authentication info was not provided');
                    err.code = 'NoAuth';
                    returned = true;
                    connection.close();
                    return callback(err);
                } else {
                    finalize();
                }
            });
        });
        return promise;
    }
    /**
     * Releases resources
     */ close() {
        if (this.auth && this.auth.oauth2) {
            this.auth.oauth2.removeAllListeners();
        }
        this.emit('close');
    }
}
// expose to the world
module.exports = SMTPTransport;
}),
"[project]/node_modules/nodemailer/lib/sendmail-transport/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const spawn = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)").spawn;
const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
/**
 * Generates a Transport object for Sendmail
 *
 * Possible options can be the following:
 *
 *  * **path** optional path to sendmail binary
 *  * **newline** either 'windows' or 'unix'
 *  * **args** an array of arguments for the sendmail binary
 *
 * @constructor
 * @param {Object} optional config parameter for Sendmail
 */ class SendmailTransport {
    constructor(options){
        options = options || {};
        // use a reference to spawn for mocking purposes
        this._spawn = spawn;
        this.options = options || {};
        this.name = 'Sendmail';
        this.version = packageData.version;
        this.path = 'sendmail';
        this.args = false;
        this.winbreak = false;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'sendmail'
        });
        if (options) {
            if (typeof options === 'string') {
                this.path = options;
            } else if (typeof options === 'object') {
                if (options.path) {
                    this.path = options.path;
                }
                if (Array.isArray(options.args)) {
                    this.args = options.args;
                }
                this.winbreak = [
                    'win',
                    'windows',
                    'dos',
                    '\r\n'
                ].includes((options.newline || '').toString().toLowerCase());
            }
        }
    }
    /**
     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */ send(mail, done) {
        // Sendmail strips this header line by itself
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let args;
        let sendmail;
        let returned;
        const hasInvalidAddresses = [].concat(envelope.from || []).concat(envelope.to || []).some((addr)=>/^-/.test(addr));
        if (hasInvalidAddresses) {
            return done(new Error('Can not send mail. Invalid envelope addresses.'));
        }
        if (this.args) {
            // force -i to keep single dots
            args = [
                '-i'
            ].concat(this.args).concat(envelope.to);
        } else {
            args = [
                '-i'
            ].concat(envelope.from ? [
                '-f',
                envelope.from
            ] : []).concat(envelope.to);
        }
        let callback = (err)=>{
            if (returned) {
                // ignore any additional responses, already done
                return;
            }
            returned = true;
            if (typeof done === 'function') {
                if (err) {
                    return done(err);
                } else {
                    return done(null, {
                        envelope: mail.data.envelope || mail.message.getEnvelope(),
                        messageId,
                        response: 'Messages queued for delivery'
                    });
                }
            }
        };
        try {
            sendmail = this._spawn(this.path, args);
        } catch (E) {
            this.logger.error({
                err: E,
                tnx: 'spawn',
                messageId
            }, 'Error occurred while spawning sendmail. %s', E.message);
            return callback(E);
        }
        if (sendmail) {
            sendmail.on('error', (err)=>{
                this.logger.error({
                    err,
                    tnx: 'spawn',
                    messageId
                }, 'Error occurred when sending message %s. %s', messageId, err.message);
                callback(err);
            });
            sendmail.once('exit', (code)=>{
                if (!code) {
                    return callback();
                }
                let err;
                if (code === 127) {
                    err = new Error('Sendmail command not found, process exited with code ' + code);
                } else {
                    err = new Error('Sendmail exited with code ' + code);
                }
                this.logger.error({
                    err,
                    tnx: 'stdin',
                    messageId
                }, 'Error sending message %s to sendmail. %s', messageId, err.message);
                callback(err);
            });
            sendmail.once('close', callback);
            sendmail.stdin.on('error', (err)=>{
                this.logger.error({
                    err,
                    tnx: 'stdin',
                    messageId
                }, 'Error occurred when piping message %s to sendmail. %s', messageId, err.message);
                callback(err);
            });
            let recipients = [].concat(envelope.to || []);
            if (recipients.length > 3) {
                recipients.push('...and ' + recipients.splice(2).length + ' more');
            }
            this.logger.info({
                tnx: 'send',
                messageId
            }, 'Sending message %s to <%s>', messageId, recipients.join(', '));
            let sourceStream = mail.message.createReadStream();
            sourceStream.once('error', (err)=>{
                this.logger.error({
                    err,
                    tnx: 'stdin',
                    messageId
                }, 'Error occurred when generating message %s. %s', messageId, err.message);
                sendmail.kill('SIGINT'); // do not deliver the message
                callback(err);
            });
            sourceStream.pipe(sendmail.stdin);
        } else {
            return callback(new Error('sendmail was not found'));
        }
    }
}
module.exports = SendmailTransport;
}),
"[project]/node_modules/nodemailer/lib/stream-transport/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
/**
 * Generates a Transport object for streaming
 *
 * Possible options can be the following:
 *
 *  * **buffer** if true, then returns the message as a Buffer object instead of a stream
 *  * **newline** either 'windows' or 'unix'
 *
 * @constructor
 * @param {Object} optional config parameter
 */ class StreamTransport {
    constructor(options){
        options = options || {};
        this.options = options || {};
        this.name = 'StreamTransport';
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'stream-transport'
        });
        this.winbreak = [
            'win',
            'windows',
            'dos',
            '\r\n'
        ].includes((options.newline || '').toString().toLowerCase());
    }
    /**
     * Compiles a mailcomposer message and forwards it to handler that sends it
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */ send(mail, done) {
        // We probably need this in the output
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId
        }, 'Sending message %s to <%s> using %s line breaks', messageId, recipients.join(', '), this.winbreak ? '<CR><LF>' : '<LF>');
        setImmediate(()=>{
            let stream;
            try {
                stream = mail.message.createReadStream();
            } catch (E) {
                this.logger.error({
                    err: E,
                    tnx: 'send',
                    messageId
                }, 'Creating send stream failed for %s. %s', messageId, E.message);
                return done(E);
            }
            if (!this.options.buffer) {
                stream.once('error', (err)=>{
                    this.logger.error({
                        err,
                        tnx: 'send',
                        messageId
                    }, 'Failed creating message for %s. %s', messageId, err.message);
                });
                return done(null, {
                    envelope: mail.data.envelope || mail.message.getEnvelope(),
                    messageId,
                    message: stream
                });
            }
            let chunks = [];
            let chunklen = 0;
            stream.on('readable', ()=>{
                let chunk;
                while((chunk = stream.read()) !== null){
                    chunks.push(chunk);
                    chunklen += chunk.length;
                }
            });
            stream.once('error', (err)=>{
                this.logger.error({
                    err,
                    tnx: 'send',
                    messageId
                }, 'Failed creating message for %s. %s', messageId, err.message);
                return done(err);
            });
            stream.on('end', ()=>done(null, {
                    envelope: mail.data.envelope || mail.message.getEnvelope(),
                    messageId,
                    message: Buffer.concat(chunks, chunklen)
                }));
        });
    }
}
module.exports = StreamTransport;
}),
"[project]/node_modules/nodemailer/lib/json-transport/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
/**
 * Generates a Transport object to generate JSON output
 *
 * @constructor
 * @param {Object} optional config parameter
 */ class JSONTransport {
    constructor(options){
        options = options || {};
        this.options = options || {};
        this.name = 'JSONTransport';
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'json-transport'
        });
    }
    /**
     * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */ send(mail, done) {
        // Sendmail strips this header line by itself
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId
        }, 'Composing JSON structure of %s to <%s>', messageId, recipients.join(', '));
        setImmediate(()=>{
            mail.normalize((err, data)=>{
                if (err) {
                    this.logger.error({
                        err,
                        tnx: 'send',
                        messageId
                    }, 'Failed building JSON structure for %s. %s', messageId, err.message);
                    return done(err);
                }
                delete data.envelope;
                delete data.normalizedHeaders;
                return done(null, {
                    envelope,
                    messageId,
                    message: this.options.skipEncoding ? data : JSON.stringify(data)
                });
            });
        });
    }
}
module.exports = JSONTransport;
}),
"[project]/node_modules/nodemailer/lib/ses-transport/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
const LeWindows = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-node/le-windows.js [app-rsc] (ecmascript)");
const MimeNode = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mime-node/index.js [app-rsc] (ecmascript)");
/**
 * Generates a Transport object for AWS SES
 *
 * @constructor
 * @param {Object} optional config parameter
 */ class SESTransport extends EventEmitter {
    constructor(options){
        super();
        options = options || {};
        this.options = options || {};
        this.ses = this.options.SES;
        this.name = 'SESTransport';
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
            component: this.options.component || 'ses-transport'
        });
    }
    getRegion(cb) {
        if (this.ses.sesClient.config && typeof this.ses.sesClient.config.region === 'function') {
            // promise
            return this.ses.sesClient.config.region().then((region)=>cb(null, region)).catch((err)=>cb(err));
        }
        return cb(null, false);
    }
    /**
     * Compiles a mailcomposer message and forwards it to SES
     *
     * @param {Object} emailMessage MailComposer object
     * @param {Function} callback Callback function to run when the sending is completed
     */ send(mail, callback) {
        let statObject = {
            ts: Date.now(),
            pending: true
        };
        let fromHeader = mail.message._headers.find((header)=>/^from$/i.test(header.key));
        if (fromHeader) {
            let mimeNode = new MimeNode('text/plain');
            fromHeader = mimeNode._convertAddresses(mimeNode._parseAddresses(fromHeader.value));
        }
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
            recipients.push('...and ' + recipients.splice(2).length + ' more');
        }
        this.logger.info({
            tnx: 'send',
            messageId
        }, 'Sending message %s to <%s>', messageId, recipients.join(', '));
        let getRawMessage = (next)=>{
            // do not use Message-ID and Date in DKIM signature
            if (!mail.data._dkim) {
                mail.data._dkim = {};
            }
            if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === 'string') {
                mail.data._dkim.skipFields += ':date:message-id';
            } else {
                mail.data._dkim.skipFields = 'date:message-id';
            }
            let sourceStream = mail.message.createReadStream();
            let stream = sourceStream.pipe(new LeWindows());
            let chunks = [];
            let chunklen = 0;
            stream.on('readable', ()=>{
                let chunk;
                while((chunk = stream.read()) !== null){
                    chunks.push(chunk);
                    chunklen += chunk.length;
                }
            });
            sourceStream.once('error', (err)=>stream.emit('error', err));
            stream.once('error', (err)=>{
                next(err);
            });
            stream.once('end', ()=>next(null, Buffer.concat(chunks, chunklen)));
        };
        setImmediate(()=>getRawMessage((err, raw)=>{
                if (err) {
                    this.logger.error({
                        err,
                        tnx: 'send',
                        messageId
                    }, 'Failed creating message for %s. %s', messageId, err.message);
                    statObject.pending = false;
                    return callback(err);
                }
                let sesMessage = {
                    Content: {
                        Raw: {
                            // required
                            Data: raw // required
                        }
                    },
                    FromEmailAddress: fromHeader ? fromHeader : envelope.from,
                    Destination: {
                        ToAddresses: envelope.to
                    }
                };
                Object.keys(mail.data.ses || {}).forEach((key)=>{
                    sesMessage[key] = mail.data.ses[key];
                });
                this.getRegion((err, region)=>{
                    if (err || !region) {
                        region = 'us-east-1';
                    }
                    const command = new this.ses.SendEmailCommand(sesMessage);
                    const sendPromise = this.ses.sesClient.send(command);
                    sendPromise.then((data)=>{
                        if (region === 'us-east-1') {
                            region = 'email';
                        }
                        statObject.pending = true;
                        callback(null, {
                            envelope: {
                                from: envelope.from,
                                to: envelope.to
                            },
                            messageId: '<' + data.MessageId + (!/@/.test(data.MessageId) ? '@' + region + '.amazonses.com' : '') + '>',
                            response: data.MessageId,
                            raw
                        });
                    }).catch((err)=>{
                        this.logger.error({
                            err,
                            tnx: 'send'
                        }, 'Send error for %s: %s', messageId, err.message);
                        statObject.pending = false;
                        callback(err);
                    });
                });
            }));
    }
    /**
     * Verifies SES configuration
     *
     * @param {Function} callback Callback function
     */ verify(callback) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject)=>{
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        const cb = (err)=>{
            if (err && ![
                'InvalidParameterValue',
                'MessageRejected'
            ].includes(err.code || err.Code || err.name)) {
                return callback(err);
            }
            return callback(null, true);
        };
        const sesMessage = {
            Content: {
                Raw: {
                    Data: Buffer.from('From: <invalid@invalid>\r\nTo: <invalid@invalid>\r\n Subject: Invalid\r\n\r\nInvalid')
                }
            },
            FromEmailAddress: 'invalid@invalid',
            Destination: {
                ToAddresses: [
                    'invalid@invalid'
                ]
            }
        };
        this.getRegion((err, region)=>{
            if (err || !region) {
                region = 'us-east-1';
            }
            const command = new this.ses.SendEmailCommand(sesMessage);
            const sendPromise = this.ses.sesClient.send(command);
            sendPromise.then((data)=>cb(null, data)).catch((err)=>cb(err));
        });
        return promise;
    }
}
module.exports = SESTransport;
}),
"[project]/node_modules/nodemailer/lib/nodemailer.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Mailer = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/mailer/index.js [app-rsc] (ecmascript)");
const shared = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/shared/index.js [app-rsc] (ecmascript)");
const SMTPPool = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-pool/index.js [app-rsc] (ecmascript)");
const SMTPTransport = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/smtp-transport/index.js [app-rsc] (ecmascript)");
const SendmailTransport = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/sendmail-transport/index.js [app-rsc] (ecmascript)");
const StreamTransport = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/stream-transport/index.js [app-rsc] (ecmascript)");
const JSONTransport = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/json-transport/index.js [app-rsc] (ecmascript)");
const SESTransport = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/ses-transport/index.js [app-rsc] (ecmascript)");
const nmfetch = __turbopack_context__.r("[project]/node_modules/nodemailer/lib/fetch/index.js [app-rsc] (ecmascript)");
const packageData = __turbopack_context__.r("[project]/node_modules/nodemailer/package.json (json)");
const ETHEREAL_API = (process.env.ETHEREAL_API || 'https://api.nodemailer.com').replace(/\/+$/, '');
const ETHEREAL_WEB = (process.env.ETHEREAL_WEB || 'https://ethereal.email').replace(/\/+$/, '');
const ETHEREAL_API_KEY = (process.env.ETHEREAL_API_KEY || '').replace(/\s*/g, '') || null;
const ETHEREAL_CACHE = [
    'true',
    'yes',
    'y',
    '1'
].includes((process.env.ETHEREAL_CACHE || 'yes').toString().trim().toLowerCase());
let testAccount = false;
module.exports.createTransport = function(transporter, defaults) {
    let urlConfig;
    let options;
    let mailer;
    if (// provided transporter is a configuration object, not transporter plugin
    typeof transporter === 'object' && typeof transporter.send !== 'function' || typeof transporter === 'string' && /^(smtps?|direct):/i.test(transporter)) {
        if (urlConfig = typeof transporter === 'string' ? transporter : transporter.url) {
            // parse a configuration URL into configuration options
            options = shared.parseConnectionUrl(urlConfig);
        } else {
            options = transporter;
        }
        if (options.pool) {
            transporter = new SMTPPool(options);
        } else if (options.sendmail) {
            transporter = new SendmailTransport(options);
        } else if (options.streamTransport) {
            transporter = new StreamTransport(options);
        } else if (options.jsonTransport) {
            transporter = new JSONTransport(options);
        } else if (options.SES) {
            if (options.SES.ses && options.SES.aws) {
                let error = new Error('Using legacy SES configuration, expecting @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/');
                error.code = 'LegacyConfig';
                throw error;
            }
            transporter = new SESTransport(options);
        } else {
            transporter = new SMTPTransport(options);
        }
    }
    mailer = new Mailer(transporter, options, defaults);
    return mailer;
};
module.exports.createTestAccount = function(apiUrl, callback) {
    let promise;
    if (!callback && typeof apiUrl === 'function') {
        callback = apiUrl;
        apiUrl = false;
    }
    if (!callback) {
        promise = new Promise((resolve, reject)=>{
            callback = shared.callbackPromise(resolve, reject);
        });
    }
    if (ETHEREAL_CACHE && testAccount) {
        setImmediate(()=>callback(null, testAccount));
        return promise;
    }
    apiUrl = apiUrl || ETHEREAL_API;
    let chunks = [];
    let chunklen = 0;
    let requestHeaders = {};
    let requestBody = {
        requestor: packageData.name,
        version: packageData.version
    };
    if (ETHEREAL_API_KEY) {
        requestHeaders.Authorization = 'Bearer ' + ETHEREAL_API_KEY;
    }
    let req = nmfetch(apiUrl + '/user', {
        contentType: 'application/json',
        method: 'POST',
        headers: requestHeaders,
        body: Buffer.from(JSON.stringify(requestBody))
    });
    req.on('readable', ()=>{
        let chunk;
        while((chunk = req.read()) !== null){
            chunks.push(chunk);
            chunklen += chunk.length;
        }
    });
    req.once('error', (err)=>callback(err));
    req.once('end', ()=>{
        let res = Buffer.concat(chunks, chunklen);
        let data;
        let err;
        try {
            data = JSON.parse(res.toString());
        } catch (E) {
            err = E;
        }
        if (err) {
            return callback(err);
        }
        if (data.status !== 'success' || data.error) {
            return callback(new Error(data.error || 'Request failed'));
        }
        delete data.status;
        testAccount = data;
        callback(null, testAccount);
    });
    return promise;
};
module.exports.getTestMessageUrl = function(info) {
    if (!info || !info.response) {
        return false;
    }
    let infoProps = new Map();
    info.response.replace(/\[([^\]]+)\]$/, (m, props)=>{
        props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m, key, value)=>{
            infoProps.set(key, value);
        });
    });
    if (infoProps.has('STATUS') && infoProps.has('MSGID')) {
        return (testAccount.web || ETHEREAL_WEB) + '/message/' + infoProps.get('MSGID');
    }
    return false;
};
}),
"[externals]/puppeteer [external] (puppeteer, esm_import, [project]/node_modules/puppeteer)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("puppeteer-582bc9288a971b4a");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__feb9a4bc._.js.map