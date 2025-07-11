chunk-6VWAHX6D.js?v=b1fff8c5:21551 Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
supabaseAdmin.ts:11 Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.
_GoTrueClient @ @supabase_supabase-js.js?v=b1fff8c5:5163
SupabaseAuthClient @ @supabase_supabase-js.js?v=b1fff8c5:7142
_initSupabaseAuthClient @ @supabase_supabase-js.js?v=b1fff8c5:7340
SupabaseClient @ @supabase_supabase-js.js?v=b1fff8c5:7213
createClient @ @supabase_supabase-js.js?v=b1fff8c5:7380
(anonymous) @ supabaseAdmin.ts:11
main.tsx:6 ENV: {BASE_URL: '/', DEV: true, MODE: 'development', PROD: false, SSR: false, …}
react-router-dom.js?v=b1fff8c5:4393 ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
warnOnce @ react-router-dom.js?v=b1fff8c5:4393
logDeprecation @ react-router-dom.js?v=b1fff8c5:4396
logV6DeprecationWarnings @ react-router-dom.js?v=b1fff8c5:4399
(anonymous) @ react-router-dom.js?v=b1fff8c5:5271
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
performSyncWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18868
flushSyncCallbacks @ chunk-6VWAHX6D.js?v=b1fff8c5:9119
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19432
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18805
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
react-router-dom.js?v=b1fff8c5:4393 ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath.
warnOnce @ react-router-dom.js?v=b1fff8c5:4393
logDeprecation @ react-router-dom.js?v=b1fff8c5:4396
logV6DeprecationWarnings @ react-router-dom.js?v=b1fff8c5:4402
(anonymous) @ react-router-dom.js?v=b1fff8c5:5271
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
performSyncWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18868
flushSyncCallbacks @ chunk-6VWAHX6D.js?v=b1fff8c5:9119
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19432
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18805
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
ProductList.tsx:153 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)
printWarning @ chunk-6VWAHX6D.js?v=b1fff8c5:521
error @ chunk-6VWAHX6D.js?v=b1fff8c5:505
checkForNestedUpdates @ chunk-6VWAHX6D.js?v=b1fff8c5:19665
scheduleUpdateOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18533
dispatchSetState @ chunk-6VWAHX6D.js?v=b1fff8c5:12403
fetchFormattedSizes @ ProductList.tsx:153
(anonymous) @ ProductList.tsx:155
commitHookEffectListMount @ chunk-6VWAHX6D.js?v=b1fff8c5:16915
commitPassiveMountOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:18156
commitPassiveMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:18129
commitPassiveMountEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:18119
commitPassiveMountEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:18109
flushPassiveEffectsImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19490
flushPassiveEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:19447
(anonymous) @ chunk-6VWAHX6D.js?v=b1fff8c5:19328
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18678
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at HTMLUnknownElement.callCallback2 (chunk-6VWAHX6D.js?v=b1fff8c5:3674:22)
    at Object.invokeGuardedCallbackDev (chunk-6VWAHX6D.js?v=b1fff8c5:3699:24)
    at invokeGuardedCallback (chunk-6VWAHX6D.js?v=b1fff8c5:3733:39)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19765:15)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
callCallback2 @ chunk-6VWAHX6D.js?v=b1fff8c5:3674
invokeGuardedCallbackDev @ chunk-6VWAHX6D.js?v=b1fff8c5:3699
invokeGuardedCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:3733
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19765
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <span> component:

    at span
    at div
    at div
    at div
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:14032 The above error occurred in the <div> component:

    at div
    at td
    at tr
    at tbody
    at table
    at div
    at div
    at div
    at ProductList (http://localhost:5173/src/components/Products/ProductList.tsx?t=1751995327642:34:35)
    at div
    at ProductList
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Outlet (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4494:26)
    at main
    at div
    at div
    at div
    at Layout (http://localhost:5173/src/components/Layout/Layout.tsx:23:45)
    at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4088:5)
    at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4558:5)
    at GlobalModals (http://localhost:5173/src/components/GlobalModals.tsx?t=1751994511202:21:25)
    at KeyboardShortcutsProvider (http://localhost:5173/src/components/KeyboardShortcutsProvider.tsx:21:38)
    at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:4501:15)
    at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=b1fff8c5:5247:5)
    at ThemeProvider (http://localhost:5173/src/hooks/useTheme.tsx:21:33)
    at App (http://localhost:5173/src/App.tsx?t=1751995327642:72:46)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ chunk-6VWAHX6D.js?v=b1fff8c5:14032
update.callback @ chunk-6VWAHX6D.js?v=b1fff8c5:14052
callCallback @ chunk-6VWAHX6D.js?v=b1fff8c5:11248
commitUpdateQueue @ chunk-6VWAHX6D.js?v=b1fff8c5:11265
commitLayoutEffectOnFiber @ chunk-6VWAHX6D.js?v=b1fff8c5:17093
commitLayoutMountEffects_complete @ chunk-6VWAHX6D.js?v=b1fff8c5:17980
commitLayoutEffects_begin @ chunk-6VWAHX6D.js?v=b1fff8c5:17969
commitLayoutEffects @ chunk-6VWAHX6D.js?v=b1fff8c5:17920
commitRootImpl @ chunk-6VWAHX6D.js?v=b1fff8c5:19353
commitRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:19277
finishConcurrentRender @ chunk-6VWAHX6D.js?v=b1fff8c5:18760
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18718
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
chunk-6VWAHX6D.js?v=b1fff8c5:9934 Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (chunk-6VWAHX6D.js?v=b1fff8c5:9934:17)
    at reconcileChildFibers2 (chunk-6VWAHX6D.js?v=b1fff8c5:10564:15)
    at reconcileChildren (chunk-6VWAHX6D.js?v=b1fff8c5:14290:37)
    at updateHostComponent (chunk-6VWAHX6D.js?v=b1fff8c5:14807:11)
    at beginWork (chunk-6VWAHX6D.js?v=b1fff8c5:15935:22)
    at beginWork$1 (chunk-6VWAHX6D.js?v=b1fff8c5:19753:22)
    at performUnitOfWork (chunk-6VWAHX6D.js?v=b1fff8c5:19198:20)
    at workLoopSync (chunk-6VWAHX6D.js?v=b1fff8c5:19137:13)
    at renderRootSync (chunk-6VWAHX6D.js?v=b1fff8c5:19116:15)
    at recoverFromConcurrentError (chunk-6VWAHX6D.js?v=b1fff8c5:18736:28)
throwOnInvalidObjectType @ chunk-6VWAHX6D.js?v=b1fff8c5:9934
reconcileChildFibers2 @ chunk-6VWAHX6D.js?v=b1fff8c5:10564
reconcileChildren @ chunk-6VWAHX6D.js?v=b1fff8c5:14290
updateHostComponent @ chunk-6VWAHX6D.js?v=b1fff8c5:14807
beginWork @ chunk-6VWAHX6D.js?v=b1fff8c5:15935
beginWork$1 @ chunk-6VWAHX6D.js?v=b1fff8c5:19753
performUnitOfWork @ chunk-6VWAHX6D.js?v=b1fff8c5:19198
workLoopSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19137
renderRootSync @ chunk-6VWAHX6D.js?v=b1fff8c5:19116
recoverFromConcurrentError @ chunk-6VWAHX6D.js?v=b1fff8c5:18736
performConcurrentWorkOnRoot @ chunk-6VWAHX6D.js?v=b1fff8c5:18684
workLoop @ chunk-6VWAHX6D.js?v=b1fff8c5:197
flushWork @ chunk-6VWAHX6D.js?v=b1fff8c5:176
performWorkUntilDeadline @ chunk-6VWAHX6D.js?v=b1fff8c5:384
