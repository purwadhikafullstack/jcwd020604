import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CollectionPage from "../pages/user/ProductCollectionPage";
import DetailPage from "../pages/user/ProductDetailPage";
import AdminProductPage from "../pages/admin/AdminProductPage";
import AddProductPage from "../pages/admin/AddProductPage";
import AddCategoryPage from "../pages/admin/AddCategoryPage";

const routes = [
	<Route path="/" element={<HomePage />}></Route>,
	<Route path="/collection" element={<CollectionPage />}></Route>,
	<Route path="/collection/:uuid" element={<DetailPage />}></Route>,

	// Admin Page
	<Route path="/admin/product" element={<AdminProductPage />}></Route>,
	<Route path="/admin/product/addproduct" element={<AddProductPage />}></Route>,
	<Route
		path="/admin/product/addcategory"
		element={<AddCategoryPage />}
	></Route>,
];

export default routes;
