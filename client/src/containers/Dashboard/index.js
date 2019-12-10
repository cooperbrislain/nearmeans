import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";

class Dashboard extends Component {
    componentDidMount = () => this.props.fetchUser();

    render() {
        const { userId } = this.props;
        return (
            <div>
                UserId: {userId}
            </div>
        );
    }
}

const mapStateToProps = state => ({ state });
export default compose(connect(mapStateToProps, { fetchUser }))(Dashboard);
