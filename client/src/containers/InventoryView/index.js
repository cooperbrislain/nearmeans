import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Loader from 'react-loader-spinner';
import { fetchInventory } from './../../actions';
import InvControls from './invControls';
import ReactDataGrid from 'react-data-grid';

class InventoryView extends Component {
    componentDidMount(){
        this.props.fetchInventory();
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };

    renderInventory() {
        const { inventory } = this.props.inventory;
        console.log('INVENTORY VIEW');
        console.log(inventory);
        const columns = [
            { key: '_id', name: 'ID' },
            { key: 'name', name: 'Part Name', editable: true },
            { key: 'qty', name: 'Quantity', editable: true },
            { key: 'location', name: 'Location', editable: true }
            ];

        const rows = inventory.map((invItem) => {
            const defaultLocation = { location: { lat: 0, lng: 0 }};
            const { location } = invItem;
            return { ...invItem,
                _id: invItem._id,
                name: invItem.item.name,
                location: `lat: ${location.lat} lng: ${location.lng}`
            }
        });

        if (false && inventory.length === 0) { // come back to this later, temporarily disabled
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
                <>
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={i => rows[i]}
                        rowsCount={inventory.length}
                        minHeight={150} />
                </>
            );
        }
    }

    render() {
        console.log('render');
        return (
            <div id="inventory">
                { this.renderInventory() }
                <InvControls />
            </div>
        );
    }
}

function mapStateToProps({ inventory }) {
    return { inventory };
}

export default compose(connect(mapStateToProps, { fetchInventory }))(InventoryView);
