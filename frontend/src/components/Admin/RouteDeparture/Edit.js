import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import * as actions from '../../../actions/route_departure';
import * as notices from './../../../constants/Notice';
import * as configs from '../../../constants/Config';
class Edit extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
			hotline: '',
            name: '',
            address: '',
            status: 'active',
            ordering: 0,
            msg: '',
            categories_schedule: [],
            category_schedule_id: ''
        };
    }

    loadCategorySchedule() {
        let url = `${configs.BASE_URL}category-schedule`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                categories_schedule: data,
            });
        });
    }

    loadRouteDeparture(id) {
        let url = `${configs.BASE_URL}route-departure/${id}`;
        axios.get(url).then(response => {
            let data = response.data;
            this.setState({
                name: data.name,
                address: data.address,
                hotline: data.hotline,
                status: data.status,
                ordering: data.ordering,
                category_schedule_id: data.category_schedule_id
            });
        });
    }
    
    componentWillMount() {
        this.loadRouteDeparture(this.props.id);
        this.loadCategorySchedule();
    }
    
    handleSubmit = (event) => {
        let {hotline, status, ordering, category_schedule_id, name, address} = this.state;
        if(name === "") {
            this.setState({
                msg: 'Please input name'
            });
        }
        else if(address === "") {
            this.setState({
                msg: 'Please input address'
            });
        }
        else if(hotline === "") {
            this.setState({
                msg: 'Please input hotline'
            });
        }
        else {
            let formProps = {
                hotline,
                name,
                address, 
                status,
                ordering,
                category_schedule_id
            };
            this.props.editRouteDeparture(this.props.id,formProps, () => {
                this.context.router.history.push('/admin/route-departure');
            });
        }
        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });
    }

    renderSelectedCategorySchedule = (categories_schedule) => {
        let xhtml = null;
        if(categories_schedule.length > 0) {
            xhtml = categories_schedule.map((category, index) => {
                return (
                    <option key={index} value={category._id}>{category.name}</option>                        
                );
            });
        }
        return xhtml;
    }

    render() {
        let {categories_schedule} = this.state;
        let xhtml = null;
        let styleAlert = 'danger';
        if(this.props.message) {
            if(this.props.message !== notices.ERROR_MESSAGE_CREATE_GROUP && this.props.message !== notices.EXISTING_NAME_GROUP) styleAlert = 'success';
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.props.message}
                    </div>;
        }
        else if(this.state.msg) {
            xhtml = <div className={`alert alert-${styleAlert} alert-dismissible`}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {this.state.msg}
                    </div>;
        }

        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Edit Group</h3>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="card-body">
                                        {xhtml}
                                        <div className="form-group">
                                            <label>Category Schedule</label>
                                            <select onChange={this.handleChange} value={this.state.category_schedule_id} name="category_schedule_id" className="form-control">
                                                {this.renderSelectedCategorySchedule(categories_schedule)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input required value={this.state.name} onChange={this.handleChange} name="name" type="text" className="form-control" id="name" placeholder="Enter name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="hotline">Hotline</label>
                                            <input required value={this.state.hotline} onChange={this.handleChange} name="hotline" type="text" className="form-control" id="hotline" placeholder="Enter hotline" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input required value={this.state.address} onChange={this.handleChange} name="address" type="text" className="form-control" id="address" placeholder="Enter address" />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select onChange={this.handleChange} value={this.state.status} name="status" className="form-control">
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ordering">Ordering</label>
                                            <input required value={this.state.ordering} onChange={this.handleChange} name="ordering" type="number" className="form-control" id="ordering" placeholder="Enter ordering" />
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{marginRight:'10px'}}>Submit</button>      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return { 
        message: state.route_departure.message,
    };
}

export default connect(mapStateToProps, actions)(Edit);