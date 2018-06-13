import { GET_STUDENT } from "../actions/student";

export default (state = null, action) => {
  switch (action.type) {
    case GET_STUDENT:
      return action.payload;

    default:
      return state;
  }
};
