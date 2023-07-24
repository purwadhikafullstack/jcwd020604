import { Route } from "react-router-dom";
import CollectionPage from "../pages/user/ProductCollectionPage";
import DetailPage from "../pages/user/ProductDetailPage";
import AdminManageDataPage from "../pages/admin/AdminManageDataPage";
import AdminProductPage from "../pages/admin/AdminProductPage";

const routes = [
	//user
	<Route path="/collection" element={<CollectionPage />}></Route>,
	<Route path="/collection/:uuid" element={<DetailPage />}></Route>,

	// Admin Page
	<Route path="/admin/managedata" element={<AdminManageDataPage />}></Route>,
	<Route path="/admin/product" element={<AdminProductPage />}></Route>,
];

export default routes;
