import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses } from '../storeExample';


export default class SingleCampus extends Component {
    constructor() {
        super()
        this.state = store.getState()
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
        const fetchStudentsThunk = fetchStudents();
        store.dispatch(fetchStudentsThunk);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const campusId = +this.props.match.params.campusId
        const campus = this.state.campuses.filter(campus => campus.id ===  campusId)[0];
        const studentsForCampus = this.state.students.filter(student => student.id ===  campusId)
        const students = studentsForCampus.map((student, i)=>
        <Link key={i} to={`/student/${student.id}`}>
            <p><img className='profile-img' src="https://image.flaticon.com/icons/png/128/149/149071.png"/> { student.name } | { student.email }</p>
        </Link>)
        let studentList = <ul>{ students }</ul>
        if(!studentsForCampus.length) {
            return (studentList = <p>This Campus does not have any students yet.</p>)
        } else {
            return(
                <div>
                <h4>{campus.name}</h4>
                <hr/>
                { studentList }
                </div>);
        }
    }    
}