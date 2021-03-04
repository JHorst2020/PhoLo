import { fetch } from "../util/csrf.js";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const login = ({ credential, password }) => async (dispatch) => {
  const res = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  return res
};
export const loginPhone = ({phoneNumber}) => async (dispatch) => {
  const res = await fetch("/api/session/phone", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });
  return res
};

export const updateLoggedInUser = (user) => async(dispatch) => {
  console.log("this is the user     ",user)
  dispatch(setUser(user));
}

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setUser(res.data.user));
};

export const createUser = (user) => async (dispatch) => {
  console.log("this is the created user:     ", user)
  const {username, image, email, password, firstName, lastName, phoneNumber} = user;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("firstName",firstName);
  formData.append("lastName", lastName);
  formData.append("phoneNumber", phoneNumber);

  // for multiple files
  // if (images && images.length !== 0) {
  //   for (var i = 0; i < images.length; i++) {
  //     formData.append("images", images[i]);
  //   }
  // }

  // for single file
  if (image) formData.append("image", image);

  const res = await fetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
return res
};

export const logout = () => async (dispatch) => {
  const res = await fetch("/api/session", {
    method: "DELETE",
  });

  if (res.data.message === "success") {
    dispatch(removeUser());
  }
};

const initialState = { user: {id:"0"} };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
