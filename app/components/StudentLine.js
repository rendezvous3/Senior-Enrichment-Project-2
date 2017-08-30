import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { deleteStudent } from '../storeExample';

export default class StudentLine extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState();
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleDelete() {
        const studentId = this.props.student.id;
        const deleteStudentThunk = deleteStudent(studentId);
        store.dispatch(deleteStudentThunk);
    }

    render() {
        const student = this.props.student
        if (Object.keys(student.campus).length) {
            var campusName = student.campus.name;
        } else {
            var campusName = "N/A";
        }
        return(<div><p><Link to={`/student/${student.id}`}><img className='profile-img' 
               src="https://image.flaticon.com/icons/png/128/149/149071.png"/>
                  
                  <span> </span>{student.name} | { student.email } | { campusName }
                   </Link>
                  <div className="pull-right">
                    <Link to={`/student/${student.id}`}><button className="btn btn-default">View</button></Link> 
                    <button className="btn btn-default">Edit</button>
                    <button className="btn btn-default"
                            onClick={this.handleDelete}>Delete</button>
                  </div></p></div>)
    }
}

