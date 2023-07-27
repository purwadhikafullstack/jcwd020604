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
import ConfirmResetPassword from "../pages/reset/ConfirmResetPassword";
import ProtectedPages from "./ProtectedPages";

const routes = [
	//Sandi
	<Route path="/collection" element={<CollectionPage />}></Route>,
	<Route path="/collection/:uuid" element={<DetailPage />}></Route>,

	// Admin Page
	<Route path="/admin/managedata" element={<ProtectedPages needLoginAdmin={true}><AdminManageDataPage /></ProtectedPages>}></Route>,
	<Route path="/admin/product" element={<ProtectedPages needLoginAdmin={true}><AdminProductPage /></ProtectedPages>}></Route>,

	// Martin
	<Route path="/" element={<HomePage />}></Route>,
	<Route path="/register" element={<ProtectedPages guestOnly={true}><Register /></ProtectedPages>}></Route>,
	<Route path="/login" element={<ProtectedPages guestOnly={true}><Login /></ProtectedPages>}></Route>,
	<Route path="/verify" element={<ProtectedPages guestOnly={true}><Verify /></ProtectedPages>}></Route>,
	<Route path="/reset_password" element={<ProtectedPages guestOnly={true}><ResetPassword /></ProtectedPages>}></Route>,
	<Route path="/reset-password/:token" element={<ProtectedPages guestOnly={true}><ConfirmResetPassword /></ProtectedPages>}></Route>,


	<Route path="/user_profile" element={<ProtectedPages needLogin={true}><UserProfile /></ProtectedPages>}></Route>,
	<Route path="/user_list" element={<ProtectedPages needLoginAdmin={true} needLogin={true}><UserList /></ProtectedPages>}></Route>,
	<Route path="/add_user" element={<ProtectedPages needLoginAdmin={true} needLogin={true}><AddUser /></ProtectedPages>}></Route>,
	<Route path="/edit_user" element={<ProtectedPages needLoginAdmin={true} needLogin={true}><EditUser /></ProtectedPages>}></Route>,
	<Route path="/admin_profile" element={<ProtectedPages needLoginAdmin={true}><AdminProfile /></ProtectedPages>}></Route>,
];

export default routes;
