import React, { Component } from 'react';
import axios from 'axios';
import store, { writeStudentCampusId,
                writeStudent,
                writeStudentImg,
                writeStudentEmail,
                gotNewStudent } from '../storeExample';


export default class AddStudent extends Component {
    constructor(props){
        super(props)
        this.state = store.getState();
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleImgChange = this.handleImgChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleChangeCampusId = this.handleChangeCampusId.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> {
            this.setState(store.getState());
            console.log(this.state);
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleChangeName(e){
        store.dispatch(writeStudent(e.target.value))
    }

    handleImgChange(e){
        store.dispatch(writeStudentImg(e.target.value))
    }

    handleEmailChange(e) {
        store.dispatch(writeStudentEmail(e.target.value))
    }

    handleChangeCampusId(e) {
        store.dispatch(writeStudentCampusId(e.target.value))
    }

    handleSubmit(e) {
        e.preventDefault();
        const name = this.state.currentStudentName
        const imgUrl = this.state.currentImgUrl
        const email = this.state.currentStudentEmail
        const campusId = this.state.campusId
        console.log(name,imgUrl, email, campusId);
        axios.post('/api/student', 
        { 'name': name,
          'imageUrl':imgUrl,
          'email': email,
          'campusId': campusId})
        .then(res => res.data)
        .then(newStudent => {
            store.dispatch(gotNewStudent(newStudent))
        })
        .catch(console.error)  

    }

//     const InitialState = {
//     students: [],
//     campuses: [],
//     currentCampusEntry: '',
//     currentImgUrl: '',
//     currentStudentName: '',
//     currentStudentImg: '',
//     currentStudentEmail: '',
//     campusId: ''
// }

    render() {
        if(this.state.campuses.length){
        const campusOptions = this.state.campuses.map((campus, i) => {
            return (<option key={i} value={campus.id}>{campus.name}</option>)
        })
        const selectOptions = (<div className="form-group">
                <label htmlFor="selectCampus">Select Campus</label>
                <select value={this.state.campusId || this.state.campuses[0].id || ''}
                        onChange={this.handleChangeCampusId}
                        className="selectpicker form-control"
                        data-live-search="true" 
                        id="selectCampus">
                    { campusOptions }
                </select>
        </div>)
        return (<div className="text-center">
                    <h4>Add a Student</h4>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                    <label htmlFor="studentNameInput">Student Name</label>
                    <div className="form-group">
                        <input id="studentNameInput"
                            className="form-control"
                            value={this.state.currentStudentName}
                            onChange={ this.handleChangeName } type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="studentImg">Image URL</label>
                        <input id="studentImg"
                            className="form-control"
                            value={this.state.currentStudentImg}
                            onChange={ this.handleImgChange } type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email"
                            className="form-control"
                            value={this.state.currentStudentEmail}
                            onChange={ this.handleEmailChange } type="text" />
                    </div>
                        { selectOptions }
                    <button type="submit" className='btn-block btn btn-info'>Add Student</button> 
                    </form>   
                </div>)
        } else {
            return (<div>Loading...</div>);
        }
    }
}