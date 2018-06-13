import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_BATCHS = "GET_BATCHS";
export const DELETE_BATCH = "DELETE_BATCH";

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

// export const getBatchs = () => {
//   return {
//     type: GET_BATCHS,
//     payload: "dit is een payload"
//   };
// };

// export const getGames = () => (dispatch, getState) => {
//   const state = getState();
//   if (!state.currentUser) return null;
//   const jwt = state.currentUser.jwt;

//   if (isExpired(jwt)) return dispatch(logout());

//   request
//     .get(`${baseUrl}/games`)
//     .set("Authorization", `Bearer ${jwt}`)
//     .then(result => dispatch(updateGames(result.body)))
//     .catch(err => console.error(err));
// };
