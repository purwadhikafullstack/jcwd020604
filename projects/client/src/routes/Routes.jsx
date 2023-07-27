import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CollectionPage from "../pages/user/ProductCollectionPage";
import DetailPage from "../pages/user/ProductDetailPage";
import AdminManageDataPage from "../pages/admin/AdminManageDataPage";
import AdminProductPage from "../pages/admin/AdminProductPage";
import Register from "../components/Register";
import Login from "../components/Login";
import Verify from "../components/RegisterVerify";
import UserProfile from "../pages/user/UserProfile";
import UserList from "../pages/user/UserList";
import AdminProfile from "../pages/user/UserProfile";
import AddUser from "../pages/user/AddUser";
import EditUser from "../pages/user/EditUser";
import ResetPassword from "../pages/reset/ResetPassword";
import StockHistoryPage from "../pages/admin/StockHistoryPage";
// import ProtectedPages from "./ProtectedPages";

const routes = [
	//Sandi
	<Route path="/collection" element={<CollectionPage />}></Route>,
	<Route path="/collection/:uuid" element={<DetailPage />}></Route>,

	// Admin Page
	<Route path="/admin/managedata" element={<AdminManageDataPage />}></Route>,
	<Route path="/admin/product" element={<AdminProductPage />}></Route>,
	<Route path="/admin/stockhistory" element={<StockHistoryPage />}></Route>,

	// Martin
	<Route path="/" element={<HomePage />}></Route>,
	<Route path="/register" element={<Register />}></Route>,
	<Route path="/login" element={<Login />}></Route>,
	<Route path="/verify" element={<Verify />}></Route>,
	<Route path="/reset_password" element={<ResetPassword />}></Route>,

	<Route path="/user_profile" element={<UserProfile />}></Route>,
	<Route path="/user_list" element={<UserList />}></Route>,
	<Route path="/add_user" element={<AddUser />}></Route>,
	<Route path="/edit_user" element={<EditUser />}></Route>,
	<Route path="/admin_profile" element={<AdminProfile />}></Route>,
];

export default routes;
