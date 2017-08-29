import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

// ACTION TYPES
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
// CAMPUSES
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
const WRITE_CAMPUS = 'WRITE_CAMPUS';
const WRITE_CAMPUS_IMG_URL = 'WRITE_CAMPUS_IMG_URL';
const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS';

// STUDENTS
const WRITE_STUDENT = 'WRITE_STUDENT';
const WRITE_STUDENT_IMG_URL = 'WRITE_STUDENT_IMG_URL';
const WRITE_STUDENT_EMAIL = 'WRITE_STUDENT_EMAIL';
const WRITE_STUDENT_CAMPUS_ID = 'WRITE_STUDENT_CAMPUS_ID';
const GOT_NEW_STUDENT = 'GOT_NEW_STUDENT';


// ACTION CREATORS STUDENTS

export function writeStudentCampusId(campusId) {
    return {
        type: WRITE_STUDENT_CAMPUS_ID,
        campusId
    }
}

export function writeStudent(currentStudentName) {
    return {
        type: WRITE_STUDENT,
        currentStudentName
    }
}

export function writeStudentImg(currentStudentImg) {
    return {
        type: WRITE_STUDENT_IMG_URL,
        currentStudentImg
    }
}

export function writeStudentEmail(currentStudentEmail) {
    return {
        type: WRITE_STUDENT_EMAIL,
        currentStudentEmail
    }
}

export function gotNewStudent(student) {
    return {
        type: GOT_NEW_STUDENT,
        newStudent: student
    }
}


// ACTION CREATORS
export function gotStudentsFromServer(students) {
    return {
        type: GOT_STUDENTS_FROM_SERVER,
        students
    }
}

// ACTION CREATORS CAMPUSES

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


// THUNK CREATORS

export function fetchCampuses(){

    // THUNK
    return function thunk(dispatch, getState) {
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => { 
            const gotCampusesAction = gotCampusesFromServer(campuses);
            dispatch(gotCampusesAction);
            if(campuses.length) {
                dispatch(writeStudentCampusId(campuses[0].id))
            }
        })
    }
}

export function fetchStudents() {
    return function thunk(dispatch, getState) {
        axios.get('/api/student')
        .then(res => res.data)
        .then(students => { 
            const gotStudentsAction = gotStudentsFromServer(students);
            dispatch(gotStudentsAction);
        })        
    }
}

export function postCampus(campusData) {
    return function thunk(dispatch, getState){
        axios.post('/api/campus', campusData)
        .then(res => res.data)
        .then(newCampus => {
            dispatch(gotNewCampus(newCampus));
        })
        .catch(console.error)
    }
}

export function postStudent(studentData) {
    return function(dispatch, getState) {
        axios.post('/api/student', studentData)
        .then(res => res.data)
        .then(newStudent => {
            dispatch(gotNewStudent(newStudent))
        })
        .catch(console.error)         
    }
}


const InitialState = {
    students: [],
    campuses: [],
    currentCampusEntry: '',
    currentImgUrl: '',
    currentStudentName: '',
    currentStudentImg: '',
    currentStudentEmail: '',
    campusId: 1
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
        case WRITE_STUDENT:
            return Object.assign({}, state, { currentStudentName: action.currentStudentName })
        case WRITE_STUDENT_IMG_URL:
            return Object.assign({}, state, { currentStudentImg: action.currentStudentImg })
        case WRITE_STUDENT_EMAIL:
            return Object.assign({}, state, { currentStudentEmail: action.currentStudentEmail }) 
        case GOT_NEW_STUDENT:
            return Object.assign({}, state, { students: state.students.concat(action.newStudent) });
        case WRITE_STUDENT_CAMPUS_ID:
            return Object.assign({}, state, { campusId: action.campusId });                        
        default:
            return state    
    }
}

//const store = createStore(reducer, applyMiddleware(logger));
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(
//     createLogger()
//   )));


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;