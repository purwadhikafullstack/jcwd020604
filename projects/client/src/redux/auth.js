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
      fullname: action.payload.fullname,
      email: action.payload.email,
      role: action.payload.role,
      avatar_url: action.payload.avatar_url,
      // password: action.payload.password,
    };
  } else if (action.type === "logout") {
    console.log('tess');
    return init;
  }

  return state;
}

export default userReducer;
