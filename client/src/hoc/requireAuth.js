import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
    class ComposedComponent extends Component {
        componentDidMount = () => this.shouldNavigateAway();
        componentDidUpdate = () => this.shouldNavigateAway();
        shouldNavigateAway = () => {
            if(!this.props.auth) {
                this.props.history.push('/signin');
            }
        };
        render() {
            return <ChildComponent {...this.props}/>
        }
    }

    const mapStateToProps = ({ auth }) => ({ auth: auth.authenticated });
    return connect(mapStateToProps, null)(ComposedComponent);
}
