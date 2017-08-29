import { createStore } from 'redux';

// ACTION TYPES
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
const WRITE_CAMPUS = 'WRITE_CAMPUS';
const WRITE_CAMPUS_IMG_URL = 'WRITE_CAMPUS_IMG_URL';
const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS';


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

export function writeCampus(inputName) {
    return {
        type: WRITE_CAMPUS,
        currentCampusEntry: inputName

    }
}

export function gotNewCampus(campus){
    return {
        type: GOT_NEW_CAMPUS,
        newCampus: campus
    }
}

export function writeCampusImgUrl(imageUrl){
    return {
        type: WRITE_CAMPUS_IMG_URL,
        currentImgUrl: imageUrl
    }
}


const InitialState = {
    students: [],
    campuses: [],
    currentCampusEntry: '',
    currentImgUrl: ''
}

// REDUCER

function reducer(state=InitialState, action) {
    switch(action.type) {
        case GOT_STUDENTS_FROM_SERVER:
            return Object.assign({}, state, { students: action.students });
        case GOT_CAMPUSES_FROM_SERVER:
            return Object.assign({}, state, { campuses: action.campuses });
        case WRITE_CAMPUS:
            return Object.assign({}, state, { currentCampusEntry: action.currentCampusEntry });
        case GOT_NEW_CAMPUS:
            return Object.assign({}, state, { campuses: state.campuses.concat(action.newCampus) });
        case WRITE_CAMPUS_IMG_URL:
            return Object.assign({}, state, { currentImgUrl: action.currentImgUrl });                 
        default:
            return state    
    }
}

const store = createStore(reducer);
export default store;