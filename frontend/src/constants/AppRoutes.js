import SignIn from "../pages/Auth/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProductManagement from "../pages/ProductManagement";
import PromotionManagement from "../pages/PromotionManagement";
import * as urls from "./AppUrls";

const route = [
  //UNPROTECTED ROUTES
  {
    path: urls.SIGNIN,
    Element: SignIn,
    isIndexUrl: true,
    isProtected: false,
  },
  //PROTECTED ROUTES
  {
    path: urls.DASHBOARD,
    Element: Dashboard,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.PRODUCT_MANAGEMENT,
    Element: ProductManagement,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.ROUTES.PROMOTION_MANAGEMENT,
    Element: PromotionManagement,
    isIndexUrl: false,
    isProtected: true,
  },
];

export default route;
