import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { deleteCampus, updateCampus, fetchCampuses } from '../storeExample';

export default class StudentLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            currCampus: this.props.campus.name,
            currImg: this.props.campus.imageUrl,
            campusId: this.props.campus.id
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));      
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleDelete() {
        const campusId = this.props.campus.id;
        const deleteCampusThunk = deleteCampus(campusId);
        store.dispatch(deleteCampusThunk);
    }

    renderEdit() {
        this.setState({ editing: !this.state.editing });
    }

    handleChangeName(e) {
        this.setState({
            currCampus: e.target.value,
        })
        console.log(this.state);
    }

    handleImgChange(e){
        this.setState({
            currImg: e.target.value
        })        
    }

    handleSubmit(e) {
        e.preventDefault();
        let ID = this.props.campus.id
        const updatedData = {
            name: this.state.currCampus,
            imageUrl: this.state.currImg
        }
        const students = this.props.campus.students
        const updateCampusThunk = updateCampus(ID, updatedData, students);
        store.dispatch(updateCampusThunk);
        this.setState({
            editing: false,
        })
        //store.getState()
    }

    render() {
        const campus = this.props.campus
        console.log(campus);
        if(!this.state.editing){
            return(<div className="col-xs-12 col-sm-6 col-md-3">
                        <Link to={`/campus/${campus.id}`} className="thumbnail">
                        <img src={campus.imageUrl} alt={campus.name} className="img-responsive" />
                        <p>{ campus.name }</p>
                        </Link>
                        <Link to={`/campus/${campus.id}`}>
                        <button className="btn btn-default">View</button>
                        </Link>
                        <button className ="btn btn-default"
                                onClick={this.renderEdit} >Edit</button>
                        <button className="btn btn-default"
                            onClick={this.handleDelete}>Delete</button>
                    </div>)
            } else {
            return (<div className="text-center col-sm-3">
                    <h5>Update Campus 
                        <button type="button" 
                                className="close"
                                aria-label="Close"
                                onClick={this.renderEdit}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                    <hr />
                    <form onSubmit={this.handleSubmit} className='editForm'>
                    <div className="form-group">
                        <label htmlFor="campusNameInput">Campus Name</label>
                        <input id="campusNameInput"
                               className="form-control"
                               value={this.state.currCampus}
                               onChange={ this.handleChangeName } type="text" />
                        <label htmlFor="campusImgInput">Image URL</label>
                        <input id="campusImgInput"
                               className="form-control"
                               value={this.state.currImg}
                               onChange={ this.handleImgChange }
                               type="text" />
                    </div>
                    <button type="submit" className='btn-block btn-sm btn btn-info'>Update Campus</button>
                    </form>
                </div>)
            }    
        }            
}

