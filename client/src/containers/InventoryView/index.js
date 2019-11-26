import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'

class InventoryView extends Component {
    renderInventory() {
        
        console.log(this.props);
        if (this.props.inventory.length === 0) {
            return (
                <Loader
                    type="Oval"
                    color="purple"
                    height={100}
                    width={100}
                />
            )
        } else {
            return (
                <ul>
                    {
                        this.props.parts.map(part => {
                            return (
                                <li key={part._id}>
                                    <Link to={`/parts/${part._id}`}>{part.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            )
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

function mapStateToProps(state) {
    return {state};
}

export default compose(
    connect(mapStateToProps, { }),
)(InventoryView);
