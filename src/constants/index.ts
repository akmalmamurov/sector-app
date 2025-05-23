export const DOMAIN = "https://api.sectortechnology.uz";
export const GET_CATALOG =
  "/user/catalog/all?catalog=true&subcatalog=true&category=true";
export const GET_BRANDS = "/user/brand/all";
export const GET_BRAND_POPULAR = "/user/brand/all?isPopular=true";
export const GET_BRAND_SINGLE = "/user/brand";
export const GET_BANNER = "/user/banner/all";
export const GET_POPULAR = "/user/popular/all";
export const GET_PRODUCTS = "/user/product/all";
export const GET_PROMOTION = "/user/promotion/all";
export const GET_PRODUCT_CATEGORY = "/user/product/by-slug";
export const GET_PRODUCT_SINGLE = "/user/product/by-slug";
export const LOGIN_PASSWORD = "/user/auth/login";
export const GET_PROMOTION_SINGLE = "/user/promotion";
export const GET_REGION = "/user/region/all";
export const GET_ME = "/user/auth/me";
export const UPDATE_ME = "/user/auth/update";
export const UPDATE_ME_PASSWORD = "/user/auth/update-password";
export const GET_PRODUCT_FILTER = "/user/filter";
export const CREATE_AGENT = "/user/kontragent/create";
export const CREATE_AGENT_ADDRESS = "/user/kontragent-address/create";
export const UPDATE_AGENT_ADDRESS = "/user/kontragent-address/update";
export const DELETE_AGENT_ADDRESS = "/user/kontragent-address/delete";
export const GET_AGENT = "/user/kontragent/all";
export const UPDATE_AGENT = "/user/kontragent/update";
export const SINGLE_AGENT_ADDRESS = "/user/kontragent";
export const DELETE_AGENT = "/user/kontragent/delete";
export const GET_ADDRESS = "/user/kontragent/location";
export const TOGGLE_CART = "/user/cart/toggle-cart";
export const GET_CART = "/user/cart/all";
export const DELETE_CART = "/user/cart/delete";
export const UPDATE_CART = "/user/cart/update-amount";
export const TOGGLE_FAVORITES = "/user/product/toggle-saved";
export const GET_SAVED = "/user/product/saved-products";
export const DELETE_FAVORITES = "/user/product/delete-saved";
export const THRESHOLD = 500;
export const CART_ORDER_CREATE = "/user/orders/create";
export const GET_CART_ORDER = "/user/orders/get-all";
export const GET_LAST_ORDER = "/user/orders/get-all?last=true";
export const CANCEL_ORDER = "/user/orders/cancel";
export const GET_SINGLE_ORDER = "/user/orders/get-by-id";
export const DUPLICATE_ORDER = "/user/orders/dublicate";
export const USER_PRODUCT_SEARCH = "/user/product/search";
export const ORDER_LIMIT = 10;
export const CREATE_ISSUE = "/user/request/create";
export const GET_ISSUES = "/user/request/all";
export const UPDATE_ISSUES = "/user/request";
export const GET_NEWS = "/user/news/all";
export const GET_NEWS_BY_SLUG = (slug: string) => `/user/news/by-slug/${slug}`;
export const GET_PRODUCT_COMMENTS = "/user/comment/by-productId";
export const CREATE_PRODUCT_COMMENTS = "/user/comment/add";
export const GET_PRODUCT_QUESTIONS = "/user/question/by-productId";
export const CREATE_PRODUCT_QUESTIONS = "/user/question/add";