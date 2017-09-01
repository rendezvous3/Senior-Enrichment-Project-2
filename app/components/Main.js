import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Match } from 'react-router-dom';
import StudentList from './StudentList';
import CampusList from './CampusList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Navbar from './Navbar';
import store, { gotStudentsFromServer, gotCampusesFromServer, fetchCampuses, fetchStudents } from '../storeExample';
import axios from 'axios';


export default class Main extends Component {
    constructor() {
        super()
        this.state = store.getState();
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));

        const fetchCampusesThunk = fetchCampuses();
        store.dispatch(fetchCampusesThunk);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (<Router>
                    <div>
                        <Navbar />
                        <div className="container">
                        <Switch>
                            <Route exact path ="/" render={()=> <CampusList campuses={this.state.campuses} />} />
                            <Route path ="/campus/:campusId" component={SingleCampus} />} />
                            <Route exact path ="/campus" render={()=> <CampusList campuses={this.state.campuses} />} />
                            <Route exact path ="/student/:studentId" component={SingleStudent} /> />
                            <Route exact path ="/student" render={() => <StudentList /> } />
                        </Switch>
                        </div>
                    </div>
                </Router>)
    }
}