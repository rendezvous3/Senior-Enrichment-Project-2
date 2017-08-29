import React, { Component } from 'react';
import AddStudent from './AddStudent';
import store from '../storeExample';


const StudentList = (props) =>{
    const studentList = props.students.map((student, i) => {
        return (<p key={i}>{student.name} - {student.campus.name}</p>)
    });
    return(<div className="row">
        <div className="col-sm-9">
            <div className="col-sm-8 col-sm-offset-2">   
            <h4>Student List</h4>
            <hr />
            {studentList}
            </div>
        </div>
        <div className="col-sm-3">
            <AddStudent />
        </div>
    </div>)
}

export default StudentList


// export default class StudentList extends Component{
//     constructor(props) {
//         super(props);
//         this.state = store.getState()
//     }

//     componentDidMount(){
//         this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
//     }

//     componentWillUnmount() {
//         this.unsubscribe();
//     }

//     render(){
//         const studentList = this.state.students.map((student, i) => {
//             return (<p key={i}>{student.name} - {student.campus.name}</p>)
//         });
//         return(<div className="row">
//             <div className="col-sm-9">
//                 <div className="col-sm-8 col-sm-offset-2">   
//                 <h4>Student List</h4>
//                 <hr />
//                 {studentList}
//                 </div>
//             </div>
//             <div className="col-sm-3">
//                 <AddStudent />
//             </div>
//         </div>)
//     }
// }