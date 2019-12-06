import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Button } from 'react-bootstrap';
import {fetchInventory} from "../../actions";

class InvControls extends Component {
    newRow = () => {
        console.log('NEW ITEM');
        const { inventory } = this.props.inventory;
        inventory.push({'name':'test'});
        console.log(inventory);
    };

    PlusButton = () => {

        return (
            <Button onClick={this.newRow}>
                +
            </Button>
        );
    };

    render() {
        return (
            <>
                <this.PlusButton inventory={this.props.inventory}/>
            </>
        )
    }
}

function mapStateToProps({ inventory }) {
    return { inventory };
}

export default compose(connect(mapStateToProps, { }))(InvControls);
