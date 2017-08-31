import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
    return(<nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to='/campus'>Margaret Hamilton Interplanetary Academy of JavaScript</Link>
                        </div>
                        <ul className="nav navbar-nav">
                        <li className="active"><Link to="/campus">Home</Link></li>
                        <li><Link to="/student">Students</Link></li>
                    </ul>
                </div>
            </nav>)
    }
}