import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";
import { getStudent } from "../actions/student";

export const ADD_EVALUATION = "ADD_EVALUATION";

// export const addEvaluation = () => {
//   return {
//     type: ADD_EVALUATION,
//     payload: "ADD_EVALUATION"
//   };
// };

export const addEvaluation = (teachterId, studId, newEvaluation) => (
  //userId later toevoegen
  dispatch,
  getState
) => {
  console.log(newEvaluation, "actioncretor addevaluation");
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());
  console.log("-9999999999-");
  console.log(studId, "------", teachterId);

  request
    .post(`${baseUrl}/evaluation/${studId}/${teachterId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(newEvaluation)
    .then(response =>
      dispatch(
        // console.log(response.body, "doet iksfgsdgfsfg het?", studId),

        {
          type: "GET_STUDENT",
          //ADD_EVALUATION,
          payload: response.body
        }
      )
    )
    .catch(err => console.error(err));
};

// http post :4000/evaluation/11/1 remark=favorstudent date="22-04-2019" color=green
// @Post("/evaluation/:stuId/:userId")
