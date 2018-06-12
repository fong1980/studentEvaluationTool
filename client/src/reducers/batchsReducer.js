import { GET_BATCHS } from "../actions/batchs";

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, { type, payload }) => {
  switch (type) {
    case GET_BATCHS:
      return {
        payload
      };

    default:
      return state;
  }
};
