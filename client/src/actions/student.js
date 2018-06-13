import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_STUDENT = "GET_STUDENT";
export const CREATE_STUDENT = "CREATE_STUDENT";

export const create = studId => {
  console.log("action--");
  return {
    type: CREATE_STUDENT,
    payload: "studId"
  };
};

export const getStudent = studId => (dispatch, getState) => {
  //change functionname + parameter
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;
  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/students/${studId}`)
    .then(response =>
      dispatch({
        type: GET_STUDENT, //change type
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

//http get :4000/students/2
