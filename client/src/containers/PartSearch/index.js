import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import { searchPart } from './../../actions';

class PartSearch extends Component {
    onSubmit(formProps) {
        this.props.searchPart(formProps);
    }

    renderInput({ input }) {
        return (
            <div>
                <input {...input}/>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <fieldset>
                        <label>Part</label>
                        <Field
                            name='partname'
                            label='Search for a Part'
                            type='text'
                            component={this.renderInput}
                            autoComplete="none"
                        />
                        <label>Zip Code</label>
                        <Field
                            name='zipcode'
                            label='Zipcode'
                            type='number'
                            component={this.renderInput}
                            autoComplete="none"
                        />
                    </fieldset>
                    <button type='submit'>Search</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default compose(
    connect(mapStateToProps, { searchPart }),
    reduxForm({ form: 'partsearch' })
)(PartSearch);



