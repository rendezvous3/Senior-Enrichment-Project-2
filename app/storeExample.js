import { createStore } from 'redux';

// ACTION TYPES
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';


// ACTION CREATOR
export function gotStudentsFromServer(students) {
    return {
        type: GOT_STUDENTS_FROM_SERVER,
        students
    }
}

export function gotCampusesFromServer(campuses) {
    return {
        type: GOT_CAMPUSES_FROM_SERVER,
        campuses
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
        case GOT_CAMPUSES_FROM_SERVER:
            return Object.assign({}, state, { campuses: action.campuses });
        default:
            return state    
    }
}

const store = createStore(reducer);
export default store;