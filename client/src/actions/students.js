import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_STUDENTS = "GET_STUDENTS";

export const CREATE_STUDENT = "CREATE_STUDENT";

// export const createStudent = (batchId,studInfo) => {
//   console.log("action--");
//   return {
//     type: CREATE_STUDENT,
//     payload: "studId"
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

//http get :4000/studentBatch/2 //get student from batch

export const createStudent = (batchId, studInfo) => (dispatch, getState) => {
  console.log(studInfo, "ik ben in de ationcreator");
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/addStudent/${batchId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(studInfo)
    .then(response =>
      dispatch({
        type: CREATE_STUDENT,
        payload: response.body
      })
    )
    .catch(err => console.error(err));
};
//http post :4000/addStudent/2 firstName=henk lastName=nietsnuts photo="thisIsaPic.nl" 2=batchid
