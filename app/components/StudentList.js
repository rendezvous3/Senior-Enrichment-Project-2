import React, { Component } from 'react';
import AddStudent from './AddStudent';
import store, { fetchStudents, fetchCampuses } from '../storeExample';
import { Link } from 'react-router-dom';


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
            return (<Link to={`/student/${student.id}`}  key={i}>
                <p><img className='profile-img' 
               src="https://image.flaticon.com/icons/png/128/149/149071.png"/>
                  <span> </span>{student.name}  - { student.campus.name }</p></Link>)
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
        } else {
            return (<div>Loading...</div>)
        }

    }
}


// { this.state.campuses.filter(campus => campus.id === student.id)[0].name }