import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

class UserInfo extends Component {
    renderUserInfo() {
        // const { user } = this.props;
        return (
            <div>
                test
            </div>
        );
    }

    render() {
        console.log(this.props);
        return(
            <div id='user-info'>
                { this.renderUserInfo() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {  user: state.user };
}

export default compose(
    connect(mapStateToProps, { }),
)(UserInfo);
