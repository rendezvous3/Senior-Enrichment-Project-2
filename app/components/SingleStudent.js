import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddStudent from './AddStudent';
import store, { fetchStudents, fetchCampuses } from '../storeExample';

export default class SingleStudent extends Component {
    constructor(props){
        super(props)
        this.state = store.getState();
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
        const fetchStudentsThunk = fetchStudents();
        store.dispatch(fetchStudentsThunk);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render(){
        const studentId = +this.props.match.params.studentId
        const student = this.state.students.filter(student => student.id ===  studentId)[0];
        if(student) {
            return(<div className="row">
                <div className="col-sm-8">
                    <h4><img className='profile-img-profile' src="https://image.flaticon.com/icons/png/128/149/149071.png"/>  {student.name}</h4>
                    <hr/>
                    <p>Campus: <Link to={`/campus/${student.campus.id}`} >{student.campus.name}</Link></p>
                    <p>Email: {student.campus.name}</p>
                </div>
                <div className="col-sm-4">
                </div>
              </div>)
        } else {
            return(<div>Loading...</div>);
        }

    }
}

