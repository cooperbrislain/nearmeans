import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Loader from 'react-loader-spinner';
import { fetchInventory } from './../../actions';
import InvControls from './invControls';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactDataGrid from 'react-data-grid';

class InventoryView extends Component {
    componentDidMount(){
        this.props.fetchInventory();
    }

    renderInventory() {
        const { inventory } = this.props;
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'name', name: 'Part Name' },
            { key: 'qty', name: 'Quantity' },
            { key: 'location', name: 'Location' }
            ];

        const rows = inventory.map((invItem) => {
            console.log(invItem);
            return { ...invItem,
                _id: invItem._id,
                name: invItem.item.name,
                location: `lat: ${invItem.location} lon: ${invItem.location}`
            }
        });
        if (false && inventory.length === 0) {
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
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => rows[i]}
                    rowsCount={3}
                    minHeight={150} />
                // <BootstrapTable data={rows} striped hover>
                //     <TableHeaderColumn isKey dataField='_id'>Part ID</TableHeaderColumn>
                //     <TableHeaderColumn dataField='name'>Part Name</TableHeaderColumn>
                //     <TableHeaderColumn dataField='qty'>Quantity</TableHeaderColumn>
                //     <TableHeaderColumn dataField='location'>Location</TableHeaderColumn>
                // </BootstrapTable>
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
