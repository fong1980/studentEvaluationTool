import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";
import { getStudent } from "../actions/student";

export const ADD_EVALUATION = "ADD_EVALUATION";

export const addEvaluation = (teachterId, studId, newEvaluation) => (
  dispatch,
  getState
) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/evaluation/${studId}/${teachterId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(newEvaluation)
    .then(response =>
      dispatch({
        type: "GET_STUDENT",
        payload: response.body
      })
    )
    .catch(err => console.error(err));
};

// http post :4000/evaluation/11/1 remark=favorstudent date="22-04-2019" color=green
// @Post("/evaluation/:stuId/:userId")
