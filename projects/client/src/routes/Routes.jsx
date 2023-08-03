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
import AdminHistoryPage from "../pages/admin/AdminHistoryPage";
import AdminMutationPage from "../pages/admin/AdminMutationPage";
import ConfirmResetPassword from "../pages/reset/ConfirmResetPassword";
// import ProtectedPages from "./ProtectedPages";
import EditAddressUser from "../pages/user/EditAddressUser";
import AddressUser from "../pages/user/AddressUser";

const routes = [
	//Sandi
	<Route path="/collection" element={<CollectionPage />}></Route>,
	<Route path="/collection/:uuid" element={<DetailPage />}></Route>,

	// Admin Page
	// <Route path="/admin/managedata" element={<ProtectedPages needLoginAdmin={true}><AdminManageDataPage /></ProtectedPages>}></Route>,
	// <Route path="/admin/product" element={<ProtectedPages needLoginAdmin={true}><AdminProductPage /></ProtectedPages>}></Route>,
	<Route path="/admin/product" element={<AdminProductPage />}></Route>,
	<Route path="/admin/stockhistory" element={<AdminHistoryPage />}></Route>,
	<Route path="/admin/managedata" element={<AdminManageDataPage />}></Route>,
	<Route path="/admin/mutation" element={<AdminMutationPage />}></Route>,

	// Martin
	// <Route path="/" element={<HomePage />}></Route>,
	// <Route path="/register" element={<ProtectedPages guestOnly={true}><Register /></ProtectedPages>}></Route>,
	// <Route path="/login" element={<ProtectedPages guestOnly={true}><Login /></ProtectedPages>}></Route>,
	// <Route path="/verify" element={<ProtectedPages guestOnly={true}><Verify /></ProtectedPages>}></Route>,
	// <Route path="/reset_password" element={<ProtectedPages guestOnly={true}><ResetPassword /></ProtectedPages>}></Route>,
	// <Route path="/reset-password/:token" element={<ProtectedPages guestOnly={true}><ConfirmResetPassword /></ProtectedPages>}></Route>,

	<Route path="/" element={<HomePage />}></Route>,
	<Route path="/register" element={<Register />}></Route>,
	<Route path="/login" element={<Login />}></Route>,
	<Route path="/verify" element={<Verify />}></Route>,
	<Route path="/reset_password" element={<ResetPassword />}></Route>,
	<Route
		path="/reset-password/:token"
		element={<ConfirmResetPassword />}
	></Route>,

	<Route path="/user_profile" element={<UserProfile />}></Route>,
	<Route path="/user_list" element={<UserList />}></Route>,
	<Route path="/add_user" element={<AddUser />}></Route>,
	<Route path="/edit_user" element={<EditUser />}></Route>,
	<Route path="/admin_profile" element={<AdminProfile />}></Route>,
	<Route path="/edit_user_profile" element={<EditAddressUser />}></Route>,
	<Route path="/edit_user_address" element={<AddressUser />}></Route>,

	// <Route path="/user_profile" element={<ProtectedPages needLogin={true}><UserProfile /></ProtectedPages>}></Route>,
	// <Route path="/user_list" element={<ProtectedPages needLoginAdmin={true} needLogin={true}><UserList /></ProtectedPages>}></Route>,
	// <Route path="/add_user" element={<ProtectedPages needLoginAdmin={true} needLogin={true}><AddUser /></ProtectedPages>}></Route>,
	// <Route path="/edit_user" element={<ProtectedPages needLoginAdmin={true} needLogin={true}><EditUser /></ProtectedPages>}></Route>,
	// <Route path="/admin_profile" element={<ProtectedPages needLoginAdmin={true}><AdminProfile /></ProtectedPages>}></Route>,
];

export default routes;
