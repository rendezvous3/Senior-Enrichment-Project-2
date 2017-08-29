import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddCampus from './AddCampus';
import { Link } from 'react-router-dom';


const CampusList = (props) => {
    //console.log(props)
    const campusList = props.campuses.map((campus, i) => {
        return (<div key={i} className="col-xs-6 col-md-3">
                    <Link to={`/campus/${campus.id}`} className="thumbnail">
                    <img src={campus.imageUrl} alt={campus.name} className="img-responsive" />
                    <p>{ campus.name }</p>
                    </Link>
                </div>)
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

export default CampusList;