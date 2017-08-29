import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddCampus from './AddCampus';


const CampusList = (props) => {
    //console.log(props)
    const campusList = props.campuses.map((campus, i) => {
        return (<div key={i} className="col-xs-6 col-md-3">
                    <a href="#" className="thumbnail">
                    <img src={campus.imageUrl} alt={campus.name} className="img-responsive" />
                    <p>{ campus.name }</p>
                    </a>
                </div>)
    });
    return(<div className="row">
        <div className="col-sm-8">
            <h4>Campus List</h4>
            <hr />
            <div className="row">
            {campusList}
            </div>
        </div>
        <div className="col-sm-4">
            <AddCampus />
        </div>
        </div>)
}

export default CampusList;