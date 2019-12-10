import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchUser } from './../../actions';

class Dashboard extends Component {
    componentDidMount = () => this.props.fetchUser();

    render() {
        console.log(this.props.state.user.activeUser._id);
        return (
            <div>
                UserId: {this.props.state.user.activeUser._id}
            </div>
        );
    }
}

const mapStateToProps = state => ({ state });
export default compose(connect(mapStateToProps, { fetchUser }))(Dashboard);
