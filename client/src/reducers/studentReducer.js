import { GET_STUDENT, EDIT_STUDENT } from "../actions/student";

export default (state = null, action) => {
  switch (action.type) {
    case GET_STUDENT:
      return action.payload;
    case EDIT_STUDENT:
      return action.payload;

    default:
      return state;
  }
};
