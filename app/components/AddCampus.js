import React, { Component } from 'react';
import axios from 'axios';
import store, { writeCampus, gotNewCampus, writeCampusImgUrl, postCampus } from '../storeExample';


export default class AddCampus extends Component {
    constructor(props){
        super(props)
        this.state = store.getState();

        this.handleChangeImg = this.handleChangeImg.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }    

    handleChangeName(e){
        const inputValue = e.target.value;
        const action =  writeCampus(inputValue);
        store.dispatch(action);
    }

    handleChangeImg(e) {
        const inputValue = e.target.value;
        const action = writeCampusImgUrl(inputValue);
        store.dispatch(action);
    }

    handleSubmit(e){
        e.preventDefault();
        const name = this.state.currentCampusEntry
        const imageUrl = this.state.currentImgUrl
        const campusData = { name, imageUrl }
        const postMessageThunk = postCampus(campusData);
        store.dispatch(postMessageThunk);
    }

    render() {
        //console.log(this.props.addCampus)
        return(<div className="text-center">
                <h4>Add a Campus</h4>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="campusNameInput">Campus Name</label>
                        <input id="campusNameInput"
                               className="form-control"
                               value={this.state.currentName}
                               onChange={ this.handleChangeName } type="text" />
                        <label htmlFor="campusImgInput">Image URL</label>
                        <input id="campusImgInput"
                               className="form-control"
                               onChange={ this.handleChangeImg }
                               type="text" />
                    </div>
                    <button type="submit" className='btn-block btn btn-info'>Add Campus</button>
                    </form>
                </div>)
    }

}