import React, { Component } from 'react';
import requiredAuth from './../../../requiredAuth';

import Navbar from './../../../components/Admin/Navbar';
import Sidebar from './../../../components/Admin/Sidebar';
import Footer from './../../../components/Admin/Footer';
import Edit from './../../../components/Admin/TranshipmentOffice/Edit';
import Header from './../../../components/Admin/Header';
class EditTranshipmentOfficePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="content-wrapper" >
                    <Header title="Transhipment Office Manager"/>
                    <Edit id={this.props.match.params.id}/>
                </div>
                <Footer /> 
            </div>
        );
    }
}

export default requiredAuth(EditTranshipmentOfficePage);