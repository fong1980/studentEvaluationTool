import { ADD_EVALUATION } from "../actions/evaluations";

export default (state = null, action) => {
  switch (action.type) {
    case ADD_EVALUATION:
      return action.payload;
    default:
      return state;
  }
};
