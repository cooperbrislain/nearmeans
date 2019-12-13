import React, { Component } from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {fetchUser} from "../actions";

const Welcome = () =>
        <p className='welcome-blurb'>
            Welcome to NearMeans, a platform for local collaboration through the sharing of the means of production.
            NearMeans allows makers, fixers, technologists, and DIY folks better access the resources local to them
            and within their community to accomplish their needs. By enabling local collaboration and exchange of
            resources, more sustainable practices can be achieved by reducing waste and redundant production.
        </p>;

const mapStateToProps = state => ({ state });
export default compose(connect(mapStateToProps, { }))(Welcome);
