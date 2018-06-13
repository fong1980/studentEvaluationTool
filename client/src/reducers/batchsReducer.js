import { GET_BATCHS, CREATE_BATCH } from "../actions/batchs";

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, action) => {
  console.log(state, "ik ben in console.log");
  switch (action.type) {
    case GET_BATCHS:
      return action.payload;

    case CREATE_BATCH:
      return [...state, action.payload];
    default:
      return state;
  }
};
