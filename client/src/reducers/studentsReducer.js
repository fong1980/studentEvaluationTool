import { GET_STUDENTS } from "../actions/students";

export default (state = null, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return action.payload;

    default:
      return state;
  }
};
