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
                    { console.log(inventory) }
                    { inventory.map((item) => {
                        console.log(item);
                        return (
                            <li key={item.part._id}>
                                <Link to={`/parts/${item.part._id}`}>{item.part.name}</Link>
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
