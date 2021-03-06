const initialState = JSON.parse(localStorage.getItem("loginDetails"));

const changeSession = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    
    default:
      return state;
  }
};

export default changeSession;
