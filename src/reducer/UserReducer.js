const reducer = (state, action) => {
  if (action.type === "AUTH") {
    console.log(action.payload);

    localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

    return { ...state, googleUser: action.payload };
  }
  if (action.type === "LOGOUT") {
    localStorage.clear();
    return { ...state, googleUser: null };
  }

  return state;
};

export default reducer;
