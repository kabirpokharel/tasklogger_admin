const initialState = {
  blocks: [],
  locations: [],
  drawerOpen: false,
  userLoggedIn: false,
};

const cleanerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INITILIZE_LOCATIONS": {
      return { ...state, locations: payload };
    }
    case "LOGIN_USER": {
      return { ...state, userLoggedIn: true };
    }
    default:
      return state;
  }
};

export default cleanerReducer;
