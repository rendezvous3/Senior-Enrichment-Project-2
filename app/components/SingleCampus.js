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
        if(Object.keys(this.state.campuses).length && Object.keys(this.state.students).length) {        
        const campusId = +this.props.match.params.campusId
        const campus = this.state.campuses.filter(campus => campus.id ===  campusId)[0];
        //const studentsForCampus = this.state.students.filter(student => student.id ===  campusId);
        var studentsForCampus = [];
        if (campus.students !== undefined) {
            studentsForCampus = campus.students;
            const students = studentsForCampus.map((student, i)=>
            <div key={i}>
            <p><Link  to={`/student/${student.id}`}><img className='profile-img' src="https://image.flaticon.com/icons/png/128/149/149071.png"/></Link> <Link  to={`/student/${student.id}`}>{ student.name }</Link> | { student.email }</p>
            <hr/>
            </div>)
            var studentList = <ul>{ students }</ul>
        }
        if(!studentsForCampus.length) {
            return (studentList = 
                    <div className='col-sm-8 col-sm-offset-2'>
                    <h4>{campus.name}</h4>
                    <hr/>
                    <div className='row'>
                    <div className="col-sm-4 pull-left">
                        <div className='thumbnail'>
                        <img className="img-responsive" src={campus.imageUrl} />
                        </div>
                    </div>
                    </div>
                    <hr/>
                    <p>This Campus does not have any students yet.</p>                
                </div>)
        } else {
            return(
                
                <div className='col-sm-8 col-sm-offset-2'>
                    <h4>{campus.name}</h4>
                    <hr/>
                <div className="row">
                    <div className="col-sm-4 pull-left">
                    <div className='thumbnail'>
                        <img className="img-responsive" src={campus.imageUrl} />
                    </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                { studentList }
                </div>
                </div>);
        }
    }else {
     return (<div>This Campus does not have any students yet.</div>);   
        }
    }     
}