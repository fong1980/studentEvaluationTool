import { GET_BATCHS, CREATE_BATCH } from "../actions/batchs";

export default (state = null, action) => {
  switch (action.type) {
    case GET_BATCHS:
      return action.payload;

    case CREATE_BATCH:
      return [...state, action.payload];
    default:
      return state;
  }
};
