import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { fetchInventory } from './../../actions';

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
                <ul>
                    { inventory.map((invItem) => {
                        console.log(invItem);
                        return (
                            <li key={invItem._id}>
                                <Link to={`/parts/${invItem.item._id}`}>{invItem.item.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            );
        }
    }

    render() {
        return (
            <div id="inventory">
                { this.renderInventory() }
            </div>
        );
    }
}

function mapStateToProps({ inventory }) {
    return { inventory: inventory.inventory };
}

export default compose(connect(mapStateToProps, { fetchInventory }))(InventoryView);
