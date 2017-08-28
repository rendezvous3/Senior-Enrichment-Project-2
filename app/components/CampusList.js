import React, { Component } from 'react';
import { connect } from 'react-redux';


const CampusList = (props) => {
    console.log(props)
    const campusList = props.campuses.map((campus, i) => {
        return (<p key={i}>{campus.name}</p>)
    });
    return(<div className="col-sm-8 col-sm-offset-2">
            <h4>Campus List</h4>
            <hr />
            {campusList}
        </div>)
}

export default CampusList;