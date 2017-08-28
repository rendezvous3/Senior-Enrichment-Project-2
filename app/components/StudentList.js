import React, { Component } from 'react';
import { connect } from 'react-redux';


const StudentList = (props) => {
    console.log(props)
    const studentList = props.students.map((student, i) => {
        return (<p key={i}>{student.name}</p>)
    });
    return(<div className="col-sm-8 col-sm-offset-2">
            <h4>Student List</h4>
            <hr />
            {studentList}
        </div>)
}

export default StudentList;