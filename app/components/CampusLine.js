import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { deleteCampus } from '../storeExample';

export default class StudentLine extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=> this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleDelete() {
        const campusId = this.props.campus.id;
        const deleteCampusThunk = deleteCampus(campusId);
        store.dispatch(deleteCampusThunk);
    }

    render() {
        const campus = this.props.campus
        return(<div className="col-xs-6 col-md-3">
                        <Link to={`/campus/${campus.id}`} className="thumbnail">
                        <img src={campus.imageUrl} alt={campus.name} className="img-responsive" />
                        <p>{ campus.name }</p>
                        </Link>
                        <button className="btn btn-default">Edit</button>
                        <button className="btn btn-default"
                            onClick={this.handleDelete}>Delete</button>
                    </div>)
    }
}

