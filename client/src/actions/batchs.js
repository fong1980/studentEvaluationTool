import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_BATCHS = "GET_BATCHS";
export const CREATE_BATCH = "CREATE_BATCH";

export const getBatchs = () => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;
  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/batchs`)
    .then(response =>
      dispatch({
        type: GET_BATCHS,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

// export const createBatch = newBatch => {
//   return {
//     type: CREATE_BATCH,
//     payload: newBatch
//   };
// };

export const createBatch = newBatch => (dispatch, getState) => {
  console.log(newBatch, "ik ben in de ationcreator");
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/batch`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(newBatch)
    .then(response =>
      dispatch({
        type: CREATE_BATCH,
        payload: response.body
      })
    )
    .catch(err => console.error(err));
};

//Creact new bach
// http post :4000/batch/ batchnr=10 startdate="22-04-2019" enddate="22-06-2019"

//http post :4000/batch/ batchNr: "1" startDate: "0011-11-11" enddate: "0011-11-11"
