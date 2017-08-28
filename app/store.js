import { createStore } from 'redux';

// ACTION TYPES
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER';


// ACTION CREATOR
export function gotStudentsFromServer(students) {
    return {
        type: GOT_STUDENT_FROM_SERVER,
        students
    }
}


const InitialState = {
    students: [],
    campuses: []
}

// REDUCER

function reducer(state=InitialState, action) {
    switch(action.type) {
        case GOT_STUDENTS_FROM_SERVER:
            return Object.assign({}, state, { students: action.students });
        default:
            return state    
    }
}

const store = createStore(reducer);
export default store;