import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { deleteStudent, fetchCampuses, updateStudent } from '../storeExample';

export default class StudentLine extends Component {
    constructor(props) {
        super(props)
        //this.state = store.getState();
        this.state = {
            editing: false,
            currName: this.props.student.name,
            currImg: this.props.student.imageUrl,
            currEmail: this.props.student.email,
            campuses: store.getState().campuses,
            currentlySelectedCampus: this.props.student.campus,
            currentlySelectedCampusId: this.props.student.campus.id,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeImg = this.handleChangeImg.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeCampusId = this.handleChangeCampusId.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
        const fetchCampusesThunk = fetchCampuses();
        store.dispatch(fetchCampusesThunk);
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

    handleChangeName(e){
        this.setState({ currName: e.target.value })
    }

    handleChangeImg(e) {
        this.setState({ currImg: e.target.value })
    }

    handleChangeEmail(e){
        this.setState({ currEmail: e.target.value })
    }

    handleChangeCampusId(e){
        const campusId = +e.target.value
        const campus = this.state.campuses.find((campus) => campus.id === campusId)   
        this.setState({ 
            currentlySelectedCampus: campus,
            currentlySelectedCampusId: campusId
         }) 
    }

    handleSubmit(e){
        e.preventDefault();
        const updatedData = {
            name: this.state.currName,
            imageUrl: this.state.currImg,
            email: this.state.currEmail,
            campusId: +this.state.currentlySelectedCampusId
        }
        const studentId = +this.props.student.id
        const campus = this.state.currentlySelectedCampus
        const updateStudentThunk = updateStudent(studentId, updatedData, campus)
        store.dispatch(updateStudentThunk);
        this.setState({ editing:false })
    }

    render() {
        const student = this.props.student
        if(this.state.campuses.length){
        const campusOptions = this.state.campuses.map((campus, i) => {
            return (<option key={i} value={campus.id}>{campus.name}</option>)
        })

        var selectOptions = (<div className="form-group">
                <label htmlFor="selectCampusEdit">Campus</label>
                <select value={this.state.currentlySelectedCampusId}
                        onChange={this.handleChangeCampusId}
                        className="selectpicker form-control"
                        data-live-search="true" 
                        id="selectCampusEdit">
                    { campusOptions }
                </select>
        </div>)}

        if(!this.state.editing){
        if (Object.keys(student.campus).length) {
            var campusName = student.campus.name;
            var campusId = student.campus.id
        } else {
            var campusName = "N/A";
        }
        return(<div><p><Link to={`/student/${student.id}`}><img className='profile-img' 
               src="https://image.flaticon.com/icons/png/128/149/149071.png"/></Link>
                  
                  <span> </span>
                  <Link to={`/student/${student.id}`}>{student.name}</Link> | { student.email } |
                   <span> </span> 
                  <Link to={`/campus/${campusId}`}>{ campusName }</Link>
                   
                  <div className="pull-right">
                    <Link to={`/student/${student.id}`}><button className="btn btn-default">View</button></Link> 
                    <button className="btn btn-default"
                            onClick={this.renderEdit}>Edit</button>
                    <button className="btn btn-default"
                            onClick={this.handleDelete}>Delete</button>
                  </div></p></div>)
        } else {
            return(<form className="form-inline row" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="InputNameEdit">Name</label>
                        <input type="text"
                               className="form-control student-form-edit"
                               id="InputNameEdit"
                               value={this.state.currName}
                               onChange={this.handleChangeName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputImageEdit">ImageURL</label>
                        <input type="text"
                               className="form-control"
                               id="InputImageEdit" 
                               value={this.state.currImg}
                               onChange={this.handleChangeImg}/>
                    </div>
                     <div className="form-group">
                        <label htmlFor="inputEmailEdit">Email</label>
                        <input type="email"
                               className="form-control student-form-edit"
                               id="inputEmailEdit"
                               value={this.state.currEmail}
                               onChange={this.handleChangeEmail} />
                    </div>
                    { selectOptions }
                    <button type="submit" className="btn btn-default">Update</button>
                    <button type="button" 
                                className="close pull-right"
                                aria-label="Close"
                                onClick={this.renderEdit}>
                            <span aria-hidden="true">&times;</span>
                        </button>   
                    </form>)
        }
    }
}

