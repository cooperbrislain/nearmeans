import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from "redux";
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { fetchInventory, updateInvItem, addInvItem } from './../../actions';
import ReactDataGrid from 'react-data-grid';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Dropdown, FormControl } from 'react-bootstrap';
import styles from './index.css';

class InventoryView extends Component {
    componentDidMount = () => this.props.fetchInventory();
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        console.log('GridRowsUpdated', updated);
        this.setState(state => {
            const { inventory } = this.props.inventory;
            for (let i = fromRow; i <= toRow; i++) {
                inventory[i] = { ...inventory[i], ...updated };
                this.props.updateInvItem(inventory[i]);
            }
            return { inventory };
        });
    };
    renderInventory() {
        const { inventory } = this.props.inventory;
        const columns = [
            { key: '_id', name: 'ID' },
            { key: 'partId', name: 'Part', editor: PartPicker },
            { key: 'qty', name: 'Quantity', editable: true },
            { key: 'location', name: 'Location', editor: LocationPicker }
            ];
        const rows = inventory.map((invItem) => {
            const { location } = invItem;
            const item = invItem.item;
            return { ...invItem,
                _id: invItem._id,
                partId: invItem.item? invItem.item._id : '',
                location: location? `lat: ${location.lat} lng: ${location.lng}`: 'nowhere'
            }
        });
        if (false && inventory.length === 0) { // come back to this later, temporarily disabled
            return (<Loader type="Oval" color="purple" height={100} width={100} />);
        } else {
            return (
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => rows[i]}
                    rowsCount={inventory.length}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    enableCellSelect={true}
                />
            );
        }
    }
    render() {
        return (
            <div id="inventory">
                { this.renderInventory() }
                <Button onClick={this.props.addInvItem}>+</Button>
            </div>
        );
    };
}

class PartPicker extends React.Component {
    autoComplete = async (e) => {
        const { data } = await axios.get(`/api/util/autocomplete/part?q=${e.target.value}`);
        this.setState({ autocomplete: data });
    };
    getInputNode = () => ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    getValue = () => ({ item: this.props.value });
    selectPart = (e) => {
        this.setState({ value: e.target.getAttribute('value')});
        this.props.onCommit();
    };
    render() {
        const { autocomplete } = this.state || { autocomplete: [] };
        return (
            <Dropdown show={true}>
                <input type="text" onChange={this.autoComplete} />
                <Dropdown.Menu className="part-picker-dropdown" show={true}>
                    { autocomplete.map((part, i) => {
                        return <Dropdown.Item key={i} onClick={this.selectPart} value={part._id}>{part.name}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    };
}

class LocationPicker extends React.Component {
    getInputNode = () => ReactDOM.findDOMNode(this).getElementsByTagName("input")[0];
    getValue = () => ({location: this.props.value});
    render() {
        return (<input type="text" />);
    }
}

const mapStateToProps = ({ inventory, autocomplete }) => ({ inventory, autocomplete });
export default compose(connect(mapStateToProps, { fetchInventory, updateInvItem, addInvItem }))(InventoryView);
