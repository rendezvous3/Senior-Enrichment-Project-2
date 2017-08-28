import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, Match } from 'react-router-dom';
import StudentList from './StudentList';
import CampusList from './CampusList';
import Navbar from './Navbar';


export default class Main extends Component {
    constructor() {
        super()
        this.state ={

        }
    }

    render() {
        return (<Router>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route exact path ="/" component={CampusList} />
                            <Route exact path ="/campus" component={CampusList} />
                            <Route exact path ="/student" component={StudentList} />
                        </Switch>
                    </div>
                </Router>)
    }
}