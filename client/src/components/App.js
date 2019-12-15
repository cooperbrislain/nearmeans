import React from 'react';
import Header from './../containers/Header';
import Footer from './../containers/Footer';
import { Container } from 'react-bootstrap';

export default ({ children }) => {
    return (
        <div>
            <Header/>
            <Container>
                <main>
                    {children}
                </main>
            </Container>
            <Footer/>
        </div>
    );
};
