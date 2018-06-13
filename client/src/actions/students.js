import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_STUDENTS = "GET_STUDENTS";

// export const getStudents = batchId => {
//   console.log("action--");
//   return {
//     type: GET_STUDENTS,
//     payload: batchId
//   };
// };

export const getStudents = batchId => (dispatch, getState) => {
  //change functionname + parameter
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;
  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/studentBatch/${batchId}`)
    .then(response =>
      dispatch({
        type: GET_STUDENTS, //change type
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

//http get :4000/studentBatch/2
