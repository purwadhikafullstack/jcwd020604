import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CollectionPage from "../pages/user/ProductCollectionPage";
import DetailPage from "../pages/user/ProductDetailPage";

const routes = [
	<Route path="/" element={<HomePage />}></Route>,
	<Route path="/collection" element={<CollectionPage />}></Route>,
	<Route path="/collection/:id" element={<DetailPage />}></Route>,
];

export default routes;
