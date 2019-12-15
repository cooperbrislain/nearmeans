import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

const welcomeStyle = {
    width: '70%',
    margin:'auto',
    fontFamily: '"Lato",sans-serif',
    backgroundColor:'rgba(255,255,255,0.8)',
    padding:'10px',
    borderRadius:'10px',
    marginBottom:'25px',
    boxShadow: '3px 3px 3px rgba(0,0,0,0.5)'
};

const Welcome = () =>
    <p className='welcome-blurb' style={welcomeStyle}>
        Welcome to NearMeans, a platform for local collaboration through the sharing of the means of production.
        NearMeans allows makers, fixers, technologists, and DIY folks better access the resources local to them
        and within their community to accomplish their needs. By enabling local collaboration and exchange of
        resources, more sustainable practices can be achieved by reducing waste and redundant production.
    </p>;

const mapStateToProps = state => ({ state });
export default compose(connect(mapStateToProps, { }))(Welcome);
