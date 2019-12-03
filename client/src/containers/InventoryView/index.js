import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchInventory } from './../../actions';
import InvControls from './invControls';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class InventoryView extends Component {
    componentDidMount(){
        this.props.fetchInventory();
    }

    renderInventory() {
        const { inventory } = this.props;
        if (inventory.length === 0) {
            return (
                <Loader
                    type="Oval"
                    color="purple"
                    height={100}
                    width={100}
                />
            );
        } else {
            return (
                <BootstrapTable data={inventory} striped hover>
                    <TableHeaderColumn isKey dataField='_id'>Part ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Part Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='qty'>Quantity</TableHeaderColumn>
                </BootstrapTable>
            );
        }
    }

    render() {
        return (
            <div id="inventory">
                { this.renderInventory() }
                <InvControls />
            </div>
        );
    }
}

function mapStateToProps({ inventory }) {
    return { inventory: inventory.inventory };
}

export default compose(connect(mapStateToProps, { fetchInventory }))(InventoryView);
