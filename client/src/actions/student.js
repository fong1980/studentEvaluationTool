import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_STUDENT = "GET_STUDENT";
export const EDIT_STUDENT = "EDIT_STUDENT";

// export const editStudent = content => {
//   console.log("action--");
//   return {
//     type: EDIT_STUDENT,
//     payload: "studId"
//   };
// };

export const editStudent = (editedInfo, studentId) => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;
  if (isExpired(jwt)) return dispatch(logout());

  request
    .put(`${baseUrl}/students/${studentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(editedInfo)
    .then(result =>
      dispatch({
        type: EDIT_STUDENT,
        payload: result.body
      })
    )
    .catch(err => console.error(err));
};
//  @Put("/students/:id")

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
