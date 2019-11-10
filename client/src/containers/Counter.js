import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './../actions';

import requireAuth from './../hoc/requireAuth';

import App from '../components/App';

class Counter extends Component {
    render() {
        return (
            <div>
                <p>Current counter state: {this.props.counter}</p>
                <button onClick={this.props.increment}>Increment</button>
                <button onClick={this.props.decrement}>Decrement</button>  
                <App/>          
            </div>
        );
    }
}

// This state is equivalent to the object that's inside our reducers/index.js
function mapStateToProps(state){
    return { counter: state.counter.counter };
}   

export default requireAuth(connect(mapStateToProps, {increment, decrement})(Counter));





