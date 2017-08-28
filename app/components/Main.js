import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, Match } from 'react-router-dom';
import StudentList from './StudentList';
import CampusList from './CampusList';
import Navbar from './Navbar';
import store, { gotStudentsFromServer } from '../storeExample';
import axios from 'axios';


export default class Main extends Component {
    constructor() {
        super()
        this.state = store.getState();
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));

        axios.get('/api/student')
        .then(res => res.data)
        .then(students => { 
            const gotStudentsAction = gotStudentsFromServer(students);
            store.dispatch(gotStudentsAction);
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (<Router>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route exact path ="/" component={CampusList} />
                            <Route exact path ="/campus" component={CampusList} />
                            <Route exact path ="/student" render={() => <StudentList students={this.state.students} /> } />
                        </Switch>
                    </div>
                </Router>)
    }
}

 
// <Route exact path ="/student" component={StudentList} />
//