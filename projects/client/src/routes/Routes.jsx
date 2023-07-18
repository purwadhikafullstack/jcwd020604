import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CollectionPage from "../pages/user/ProductCollectionPage";
import DetailPage from "../pages/user/ProductDetailPage";
import AddProductPage from "../pages/admin/AddProductPage";
import AdminProductPage from "../pages/admin/AdminProductPage";

const routes = [
	<Route path="/" element={<HomePage />}></Route>,
	<Route path="/collection" element={<CollectionPage />}></Route>,
	<Route path="/collection/:uuid" element={<DetailPage />}></Route>,

	// Admin Page
	<Route path="/admin/product/addproduct" element={<AddProductPage />}></Route>,
	<Route path="/admin/product" element={<AdminProductPage />}></Route>,
];

export default routes;
