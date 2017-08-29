import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, Match } from 'react-router-dom';
import StudentList from './StudentList';
import CampusList from './CampusList';
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

        // const fetchStudentsThunk = fetchStudents();
        // store.dispatch(fetchStudentsThunk);

        // Promise.all([
        // axios.get('/api/student')
        // .then(res => res.data)
        // .then(students => { 
        //     const gotStudentsAction = gotStudentsFromServer(students);
        //     store.dispatch(gotStudentsAction);
        // }),
        // axios.get('/api/campus')
        // .then(res => res.data)
        // .then(campuses => { 
        //     const gotCampusesAction = gotCampusesFromServer(campuses);
        //     store.dispatch(gotCampusesAction);
        // })]
        // )
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
                            <Route exact path ="/campus" render={()=> <CampusList campuses={this.state.campuses} />} />
                            <Route exact path ="/student" render={() => <StudentList students={this.state.students} /> } />
                        </Switch>
                        </div>
                    </div>
                </Router>)
    }
}

 
// <Route exact path ="/student" component={StudentList} />
// <Route exact path ="/campus" component={CampusList} />
//