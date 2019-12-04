import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchInventory } from './../../actions';
import InvControls from './invControls';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ModalInvAdd from './invAddPart';

class InventoryView extends Component {
    componentDidMount(){
        this.props.fetchInventory();
    }

    renderInventory() {
        const { inventory } = this.props;
        const rows = inventory.map((invItem) => {
            return { ...invItem,
                _id: invItem._id,
                name: invItem.item.name,
                location: `lat: ${invItem.location.latitude} lon: ${invItem.location.longitude}`
            }
        });
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
                <BootstrapTable data={rows} striped hover>
                    <TableHeaderColumn isKey dataField='_id'>Part ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Part Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='qty'>Quantity</TableHeaderColumn>
                    <TableHeaderColumn dataField='location'>Location</TableHeaderColumn>
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
