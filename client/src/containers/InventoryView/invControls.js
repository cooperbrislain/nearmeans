import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Button } from 'react-bootstrap';
import { addInvItem } from "../../actions";

class InvControls extends Component {
    newRow = () => this.props.addInvItem();
    PlusButton = () => <Button onClick={this.newRow}>+</Button>;
    render() {
        return (<this.PlusButton inventory={this.props.inventory}/>);
    }
}

function mapStateToProps({ inventory }) {
    return { inventory };
}
export default compose(connect(mapStateToProps, { addInvItem }))(InvControls);
