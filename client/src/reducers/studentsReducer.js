import { GET_STUDENTS, CREATE_STUDENT } from "../actions/students";

export default (state = null, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return action.payload;
    case CREATE_STUDENT:
      return [...state, action.payload];

    default:
      return state;
  }
};
