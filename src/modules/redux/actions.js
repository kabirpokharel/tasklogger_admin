import { CREATE_LOCATION, CREATE_BLOCK, INITILIZE_LOCATIONS, LOGIN_USER } from "./actionConst";

export const loginUser = () => {
  console.log("I am at login user action creator");
  return {
    type: LOGIN_USER,
  };
};

export const createLocaiton = () => ({
  type: CREATE_LOCATION,
  payload: null,
});

export const createBlock = () => ({
  type: CREATE_BLOCK,
  payload: null,
});

export const initilizeLocations = (locations) => ({
  type: INITILIZE_LOCATIONS,
  payload: locations,
});
