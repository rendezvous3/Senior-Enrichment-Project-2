import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses, deleteCampus } from '../storeExample';
import StudentLine from './StudentLine';


export default class SingleCampus extends Component {
    constructor() {
        super()
        this.state = store.getState()

        this.handleDelete = this.handleDelete.bind(this)
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

    handleDelete(){
        let campusId = +this.props.match.params.campusId;
        const deleteCampusThunk = deleteCampus(campusId);
        store.dispatch(deleteCampusThunk);
    }

    render() {
        //console.log(this.state);
        if(Object.keys(this.state.campuses).length && Object.keys(this.state.students).length) {        
        const campusId = +this.props.match.params.campusId
        console.log(this.state)
        const campus = this.state.campuses.filter(campus => campus.id ===  campusId)[0];
        //const studentsForCampus = this.state.students.filter(student => student.id ===  campusId);
        console.log(campusId);
        console.log(campus);
        console.log(studentsForCampus);
        const studentsForCampus = campus.students;
        const students = studentsForCampus.map((student, i)=>
        <Link key={i} to={`/student/${student.id}`}>
            <p><img className='profile-img' src="https://image.flaticon.com/icons/png/128/149/149071.png"/> { student.name } | { student.email }</p>
        </Link>)
        let studentList = <ul>{ students }</ul>
        if(!studentsForCampus.length) {
            return (studentList = 
                    <div>
                    <h4>{campus.name}</h4>
                    <p>This Campus does not have any students yet.</p>                
                    <hr/>
                    <div>
                        <button className="btn btn-default">Edit</button>
                        <button className="btn btn-default"
                                onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>)
        } else {
            return(
                <div>
                <h4>{campus.name}</h4>
                <hr/>
                { studentList }
                <hr/>
                </div>);
        }
    }else {
     return (<div>Loading...</div>);   
    }
    }     
}