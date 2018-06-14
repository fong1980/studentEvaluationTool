import {
  GET_STUDENTS,
  CREATE_STUDENT,
  DELETE_STUDENT
} from "../actions/students";

export default (state = null, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return action.payload;
    case CREATE_STUDENT:
      return [...state, action.payload];
    case DELETE_STUDENT:
      console.log(action.payload, "dit is payload");
      const checkId = student => student.id !== action.payload;
      return state.filter(checkId);
    default:
      return state;
  }
};

// console.log("=========begin---------");
// const age = [{ id: 32, woord: 99 }, { id: 6 }, { id: 7 }, { id: 1000 }];
// const checkAdult = age => age.id == 18;
// const age2 = age.filter(checkAdult);
// console.log(age2, "twee");
// console.log("=========end---------");
