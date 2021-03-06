import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddCampus from './AddCampus';
import CampusLine from './CampusLine';
import { Link } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses, deleteCampus } from '../storeExample';


export default class CampusList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
        const fetchCampusThunk = fetchCampuses();
        store.dispatch(fetchCampusThunk)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const campusList = this.props.campuses.map((campus, i) => {
            return (<div key={i}><CampusLine campus={campus}/></div>)
        });
        return(<div className="row">
            <div className="col-sm-9">
                <h4>Campus List</h4>
                <hr />
                <div className="row">
                {campusList}
                </div>
            </div>
            <div className="col-sm-3">
                <AddCampus />
            </div>
            </div>)
    }    
}