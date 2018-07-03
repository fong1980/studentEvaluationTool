import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_STUDENTS = "GET_STUDENTS";
export const CREATE_STUDENT = "CREATE_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";

export const getStudents = batchId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;
  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/studentBatch/${batchId}`)
    .then(response =>
      dispatch({
        type: GET_STUDENTS,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

//http get :4000/studentBatch/2 //get student from batch

export const createStudent = (batchId, studInfo) => (dispatch, getState) => {
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

export const deleteStudent = studId => (dispatch, getState) => {
  request.delete(`${baseUrl}/student/${studId}`).then(response =>
    dispatch({
      type: DELETE_STUDENT,
      payload: studId
    })
  );
};
//http delete :4000/student/2
