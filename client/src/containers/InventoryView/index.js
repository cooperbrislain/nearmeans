import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import { fetchInventory, updateInvItem } from './../../actions';
import InvControls from './invControls';
import ReactDataGrid from 'react-data-grid';
import { Editors } from 'react-data-grid-addons';
import ReactDOM from 'react-dom';
import axios from 'axios';

const { DropDownEditor } = Editors;

class InventoryView extends Component {
    componentDidMount(){
        this.props.fetchInventory();
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const { inventory } = this.props.inventory;
            const rows = inventory;
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
                this.props.updateInvItem(rows[i]);
            }
            return { rows };
        });
    };

    renderInventory() {
        const { inventory } = this.props.inventory;
        console.log('INVENTORY VIEW');
        const columns = [
            { key: '_id', name: 'ID' },
            {
                key: 'name',
                name: 'Part Name',
                editable: true,
                editor: PartPicker,
                events: {
                    onChange: (e) => console.log('change')
                }
            },
            { key: 'qty', name: 'Quantity', editable: true },
            { key: 'location', name: 'Location', editable: true }
            ];
        const rows = inventory.map((invItem) => {
            const defaultLocation = { location: { lat: 0, lng: 0 }};
            const { location } = invItem;
            const item = invItem.item;
            return { ...invItem,
                _id: invItem._id,
                name: item? item.name: '',
                location: location? `lat: ${location.lat} lng: ${location.lng}`: 'nowhere'
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
                        onGridRowsUpdated={this.onGridRowsUpdated}
                        enableCellSelect={true}
                    />
                </>
            );
        }
    }

    render() {
        console.log('render inventory view');
        return (
            <div id="inventory">
                { this.renderInventory() }
                <InvControls />
            </div>
        );
    }
}

class PartPicker extends React.Component {
    autoComplete = async (e) => {
        const str = e.target.value;
        const { data } = await axios.get(`/api/util/autocomplete/part?q=${str}`);
        console.log(data);
    };

    constructor(props) {
        super(props);
        this.state = { color: props.value };
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    }

    // handleChange = e => {
    //     console.log(e.target.value);
    //
    // };

    render() {
        return (
            <input type="text" onChange={this.autoComplete}/>
        );
    }
}

class LocationPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { color: props.value };
    }

    getInputNode() {
        return ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    }

    // handleChange = e => {
    //     console.log(e.target.value);
    //
    // };

    render() {
        return (
            <input type="text"/>
        );
    }
}

function mapStateToProps({ inventory, autocomplete }) {
    return { inventory, autocomplete };
}

export default compose(connect(mapStateToProps, { fetchInventory, updateInvItem }))(InventoryView);
