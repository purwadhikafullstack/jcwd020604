const init = {
	email: "",
	password: "",
};

function userReducer(state = init, action) {
	//action adalah event yang terjadi
	if (action.type === "login") {
		return {
			...state,
			id: action.payload.id,
			uuid: action.payload.uuid,
			fullname: action.payload.fullname,
			email: action.payload.email,
			role: action.payload.role,
			avatar_url: action.payload.avatar_url,
			verified: action.payload.verified,
			warehouse_id: action.payload.warehouse_id,
			address: action.payload.address
			// password: action.payload.password,
		};
	} else if (action.type === "logout") {
		console.log("tess");
		return init;
	}

	return state;
}

export default userReducer;
