import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { deleteStudent } from '../storeExample';

export default class StudentLine extends Component {
    constructor(props) {
        super(props)
        //this.state = store.getState();
        this.state = {
            editing: false,
            currName: this.props.student.name,
            currImg: this.props.student.imageUrl,
            currEmail: this.props.student.email
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
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

    renderEdit(){
        this.setState({ editing: !this.state.editing })
    }

    render() {
        const student = this.props.student
        if(!this.state.editing){
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
                    <button className="btn btn-default"
                            onClick={this.renderEdit}>Edit</button>
                    <button className="btn btn-default"
                            onClick={this.handleDelete}>Delete</button>
                  </div></p></div>)
        } else {
            return(<form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="exampleInputName2">Name</label>
                        <input type="text"
                               className="form-control student-form-edit"
                               id="exampleInputName2"
                               value={this.state.currName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleImage">ImageURL</label>
                        <input type="email"
                               className="form-control student-form-edit"
                               id="exampleImage" 
                               value={this.state.currImg}/>
                    </div>
                     <div className="form-group">
                        <label htmlFor="exampleInputEmail2">Email</label>
                        <input type="email"
                               className="form-control student-form-edit"
                               id="exampleInputEmail2"
                               value={this.state.currEmail} />
                    </div>
                    <button type="submit" className="btn btn-default">Update</button>
                    <button type="button" 
                                className="close"
                                aria-label="Close"
                                onClick={this.renderEdit}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </form>)
        }
    }
}

