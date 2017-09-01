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

const CURRENT_CAMPUS = 'CURRENT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// STUDENTS
const WRITE_STUDENT = 'WRITE_STUDENT';
const WRITE_STUDENT_IMG_URL = 'WRITE_STUDENT_IMG_URL';
const WRITE_STUDENT_EMAIL = 'WRITE_STUDENT_EMAIL';
const WRITE_STUDENT_CAMPUS_ID = 'WRITE_STUDENT_CAMPUS_ID';
const GOT_NEW_STUDENT = 'GOT_NEW_STUDENT';

const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';



// ACTION CREATORS STUDENTS

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

export function deleteStudentAction(studentId) {
    return {
        type: DELETE_STUDENT,
        studentId
    }
}  

export function gotStudentsFromServer(students) {
    return {
        type: GOT_STUDENTS_FROM_SERVER,
        students
    }
}

export function updateStudentAction(updatedStudent) {
    return {
        type: UPDATE_STUDENT,
        updatedStudent
    }    
}

// ACTION CREATORS CAMPUSES

export function currentCampus(currentCampus) {
    return {
        type: CURRENT_CAMPUS,
        currentCampus
    }
}

export function writeStudentCampusId(campusId) {
    return {
        type: WRITE_STUDENT_CAMPUS_ID,
        campusId
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

 export function deleteCampusAction(campusId) {
    return {
        type: DELETE_CAMPUS,
        campusId
    }
 }

 export function updateCampusAction(updatedCampus){
     return {
         type: UPDATE_CAMPUS,
         updatedCampus
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
                dispatch(currentCampus(campuses[0]))
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
            dispatch(writeCampus(''));
            dispatch(writeCampusImgUrl(''));
            newCampus.campus = store.getState().currentCampus
            dispatch(gotNewCampus(newCampus));
        })
        .catch(console.error)
    }
}

export function updateCampus(campusId, newData, campStudents) {
    return function thunk(dispatch, getState){
        axios.put(`/api/campus/${campusId}`, newData)
        .then(res => res.data)
        .then(updatedCampus => {
            console.log(updatedCampus[1][0]);
            const uptCampus = updatedCampus[1][0];
            uptCampus.students = campStudents
            dispatch(updateCampusAction(uptCampus));
        })
        .catch(console.error)
    }
}

export function postStudent(studentData, currentCampus) {
    return function(dispatch, getState) {
        axios.post('/api/student', studentData)
        .then(res => res.data)
        .then(newStudent => {
            newStudent.campus = currentCampus;
            dispatch(gotNewStudent(newStudent))
            dispatch(writeStudent(''));
            dispatch(writeStudentImg(''));
            dispatch(writeStudentEmail(''));
        })
        .catch(console.error)         
    }
}

export function updateStudent(studentId, studentNewData, currentCampus) {
    return function(dispatch, getState){
        axios.put(`/api/student/${studentId}`, studentNewData)
        .then(res => res.data)
        .then(updatedStudent => {
            console.log(updatedStudent[1][0]);
            const upStudent = updatedStudent[1][0];
            upStudent.campus = currentCampus;
            upStudent.campusId = +currentCampus.id;
            dispatch(updateStudentAction(upStudent));
        })
    }
}

export function deleteStudent(studentId) {
    return function(dispatch, getState) {
        axios.delete(`api/student/${studentId}`)
        .then(res => res.data)
        .then(() => dispatch(deleteStudentAction(studentId)))
        .catch(console.error)
    }
}

export function deleteCampus(campusId) {
    return function(dispatch, getState) {
        axios.delete(`api/campus/${campusId}`)
        .then(res => res.data)
        .then(() => dispatch(deleteCampusAction(campusId)))
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
        case DELETE_STUDENT:
            return Object.assign({}, state, { students: state.students.filter((student) => student.id !== action.studentId) })
        case DELETE_CAMPUS:
            return Object.assign({}, state, { campuses: state.campuses.filter((campus) => campus.id !== action.campusId) })
        case CURRENT_CAMPUS:
            return Object.assign({}, state, { currentCampus: action.currentCampus }) 
        case UPDATE_CAMPUS:
            return Object.assign({}, state, { campuses:
            state.campuses.map((campus) => {
                if (campus.id === action.updatedCampus.id) {
                    return action.updatedCampus
                }
                return campus 
            }) })
        case UPDATE_STUDENT:
            return Object.assign({}, state, {
                students: state.students.map(student => {
                    if(student.id === action.updatedStudent.id) {
                        return action.updatedStudent
                    }
                    return student
                })
            })                                                     
        default:
            return state    
    }
}


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger()
  ))
);

export default store;