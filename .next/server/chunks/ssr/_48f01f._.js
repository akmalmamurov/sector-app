module.exports = {

"[project]/src/context/store.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "hydrateStore": (()=>hydrateStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/react.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zustand/esm/middleware.mjs [app-rsc] (ecmascript)");
;
;
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        auth: false,
        contact: "",
        favorites: [],
        cart: [],
        rowCol: false,
        compares: [],
        selected: [],
        user: null,
        setUser: (user)=>set({
                user
            }),
        setAuth: (value)=>set({
                auth: value
            }),
        toggleRowCol: (value)=>set((state)=>({
                    rowCol: typeof value === "boolean" ? value : !state.rowCol
                })),
        selectedCardsList: (products)=>{
            set(()=>({
                    selected: products
                }));
        },
        setContact: (info)=>set({
                contact: info
            }),
        toggleFavorites: (product)=>{
            set((state)=>{
                const isFavorite = state.favorites.some((item)=>item.id === product.id);
                return isFavorite ? {
                    favorites: state.favorites.filter((item)=>item.id !== product.id)
                } : {
                    favorites: [
                        ...state.favorites,
                        product
                    ]
                };
            });
        },
        resetFavorites: ()=>set({
                favorites: []
            }),
        addToCart: (product)=>set((state)=>{
                const existingProduct = state.cart.find((item)=>item.id === product.id);
                if (existingProduct) {
                    return {
                        cart: state.cart.map((item)=>item.id === product.id ? {
                                ...item,
                                quantity: (item.quantity || 1) + (product.quantity || 1)
                            } : item)
                    };
                }
                return {
                    cart: [
                        ...state.cart,
                        {
                            ...product,
                            quantity: product.quantity || 1
                        }
                    ]
                };
            }),
        setQuantity: (id, quantity)=>{
            set((state)=>({
                    cart: state.cart.map((item)=>item.id === id ? {
                            ...item,
                            quantity: Math.max(quantity, 1)
                        } : item)
                }));
        },
        toggleCompare: (product)=>{
            set((state)=>{
                const isCompare = state.compares.some((item)=>item.id === product.id);
                return isCompare ? {
                    compares: state.compares.filter((item)=>item.id !== product.id)
                } : {
                    compares: [
                        ...state.compares,
                        product
                    ]
                };
            });
        },
        deleteFavorites: (id)=>{
            set((state)=>({
                    favorites: state.favorites.filter((item)=>item.id !== id)
                }));
        },
        deleteCart: (id)=>{
            set((state)=>({
                    cart: state.cart.filter((item)=>item.id !== id)
                }));
        },
        resetCart: ()=>set({
                cart: []
            }),
        removeFromCompares: (id)=>{
            set((state)=>({
                    compares: state.compares.filter((item)=>item.id !== id)
                }));
        },
        resetCompares: ()=>set({
                compares: []
            }),
        getTotalPrice: ()=>{
            return get().cart.reduce((total, item)=>total + (item.price ?? 0) * (item.quantity ?? 1), 0);
        },
        getGroupedItems: ()=>get().cart,
        logOut: ()=>{
            set({
                auth: false,
                contact: ""
            });
            localStorage.removeItem("sector-token");
        },
        clearDataAfterTimeout: ()=>{
            if (!get().auth) {
                setTimeout(()=>{
                    get().resetCart();
                    get().resetFavorites();
                    get().resetCompares();
                }, 604800000);
            }
        }
    }), {
    name: "sector-app",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage)
}));
const __TURBOPACK__default__export__ = useStore;
const hydrateStore = ()=>{
    useStore.persist.rehydrate();
    if ("undefined" !== "undefined" && localStorage.getItem("sector-token")) {
        "TURBOPACK unreachable";
    }
};
}}),
"[project]/src/app/cart/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MyCart": (()=>MyCart),
    "default": (()=>__TURBOPACK__default__export__),
    "metadata": (()=>metadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../loader'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './MyCartLeft'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../order-cart/OrderCart'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../toast/Toast'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$react$2d$server$2e$esm$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hook-form/dist/react-server.esm.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
const metadata = {
    title: "Корзина | Sector App",
    description: "Системная интеграция от Sector"
};
"use client";
;
;
;
;
;
;
;
;
const MyCart = ()=>{
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("");
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const { cart, setQuantity, deleteCart, resetCart, auth, clearDataAfterTimeout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
    const [selectedItems, setSelectedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(cart.map((item)=>item.id));
    const { handleSubmit, control, setValue, watch, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$react$2d$server$2e$esm$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useForm"])();
    const [prevCartLength, setPrevCartLength] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(cart.length);
    const isAllChecked = cart.length > 0 && selectedItems.length === cart.length;
    const selectedCards = cart.filter((item)=>selectedItems.includes(item.id));
    const authErrorShown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!auth) {
            clearDataAfterTimeout();
        }
    }, [
        auth,
        clearDataAfterTimeout
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            if (auth === false && !authErrorShown.current) {
                showError("Вы не авторизованы, рекомендуем авторизоваться");
                authErrorShown.current = true;
            }
        }, 500);
        return ()=>clearTimeout(timer);
    }, [
        auth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (cart.length !== prevCartLength) {
            setSelectedItems(cart.map((item)=>item.id));
            setPrevCartLength(cart.length);
        }
    }, [
        cart,
        prevCartLength
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>setIsClient(true), []);
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PageLoader, {}, void 0, false, {
            fileName: "[project]/src/app/cart/page.tsx",
            lineNumber: 57,
            columnNumber: 12
        }, this);
    }
    const onSubmit = (data)=>{
        console.log(data);
        router.push("/cart/contacts");
    };
    const toggleAllItems = ()=>{
        if (isAllChecked) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map((item)=>item.id));
        }
    };
    const toggleSingleItem = (id)=>{
        setSelectedItems((prev)=>prev.includes(id) ? prev.filter((itemId)=>itemId !== id) : [
                ...prev,
                id
            ]);
    };
    const props = {
        toggleSingleItem,
        toggleAllItems,
        isAllChecked,
        setQuantity,
        city,
        setCity,
        cart,
        selectedItems,
        deleteCart,
        resetCart,
        errors,
        control,
        setValue,
        watch
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit(onSubmit),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-4 gap-[23px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(MyCartLeft, {
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/cart/page.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderCart, {
                        selectedCards: selectedCards
                    }, void 0, false, {
                        fileName: "[project]/src/app/cart/page.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/cart/page.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/cart/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/cart/page.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = CartPage;
}}),
"[project]/src/app/cart/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/src/app/cart/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/cart/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_48f01f._.js.map