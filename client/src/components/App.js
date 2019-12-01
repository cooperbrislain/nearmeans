import React, { Component } from 'react';
import Header from './../containers/Header';
import Footer from './../containers/Footer';
import { Jumbotron } from 'react-bootstrap';

export default ({ children }) => {
    return (
        <div>
            <Header/>
            <Jumbotron>
                {children}
            </Jumbotron>
            <Footer/>
        </div>
    );
};
