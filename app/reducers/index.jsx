import { combineReducers } from 'redux';
import axios from 'axios';

const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER';

// ACTION CREATOR
export function gotStudentsFromServer(students) {
    return {
        type: GOT_STUDENT_FROM_SERVER,
        students
    }
}

// THUNK CREATOR
export function fetchStudents() {
    return function(dispatch){
      axios.get('/api/student/')
      .then(res => res.data)
      .then(students => dispatch(gotStudentsFromServer(students)))
    }
}


const InitialState = {
    students: [],
    campuses: []
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GOT_STUDENTS_FROM_SERVER:
      return {
        ...state,
        students: action.students
      }
    default: return state
  }
};

export default rootReducer

// export default combineReducers({
//   rootReducer
// })
