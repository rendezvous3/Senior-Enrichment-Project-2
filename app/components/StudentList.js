import React, { Component } from 'react';
import AddStudent from './AddStudent';
import store, { fetchStudents, fetchCampuses } from '../storeExample';
import { Link } from 'react-router-dom';
import StudentLine from './StudentLine';

export default class StudentList extends Component{
    constructor(props) {
        super(props);
        this.state = store.getState()
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
        const fetchStudentsThunk = fetchStudents();
        store.dispatch(fetchStudentsThunk);
        // const fetchCampusesThunk = fetchCampuses();
        // store.dispatch(fetchCampusesThunk);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render(){
        if(this.state.students.length && this.state.campuses.length) {
        console.log(this.state);
        const studentList = this.state.students.map((student, i) => {
            if (!student.campusId) {
                student.campus = {};
            } 
            return (<div key={i}>
                        <StudentLine student={student} />
                        <hr />
                    </div>)
        });
            return(<div className="row">
                <div className="col-sm-9">
                    <div className="col-sm-11 col-sm-offset-1">
                        <h4>Student List</h4>
                    <hr />
                    {studentList}
                    </div>
                </div>
                <div className="col-sm-3">
                    <AddStudent />
                </div>
            </div>)
        } else {
            return (<div className="row">
                <div className="col-sm-9">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Student List</h4>
                    <hr />
                    </div>
                </div>
                <div className="col-sm-3">
                    <AddStudent />
                </div>
            </div>)
        }

    }
}


// { this.state.campuses.filter(campus => campus.id === student.id)[0].name }