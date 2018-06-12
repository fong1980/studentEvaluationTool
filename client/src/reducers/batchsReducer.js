import { GET_BATCHS } from "../actions/batchs";

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, action) => {
  switch (action.type) {
    case GET_BATCHS:
      return action.payload;

    default:
      return state;
  }
};
