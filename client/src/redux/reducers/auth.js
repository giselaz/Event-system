import { AUTH, LOGOUT } from "../const/actionTypes";
import Cookies from 'js-cookie';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH: 
      Cookies.set('profile', JSON.stringify({ ...action?.data }), { expires: 1 });
      return { ...state, authData: action?.data };
    case LOGOUT:
      Cookies.remove('profile');
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
