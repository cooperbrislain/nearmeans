import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import {compose} from "redux";
import {connect} from "react-redux";
import { searchPart } from './../../actions';

class PartSearch extends Component {
    onSubmit = formProps => {
        this.props.searchPart(formProps);
    };

    renderInput = ({ input }) => {
        return (
            <div>
                <input {...input}/>
            </div>
        )
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <fieldset>
                        <label>Part</label>
                        <Field
                            name='partName'
                            component={this.renderInput}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Zipcode</label>
                        <Field
                            name='searchZip'
                            component={this.renderInput}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Distance</label>
                        <Field
                            name='searchDistance'
                            component={this.renderInput}
                        />
                    </fieldset>
                    <button type='submit'>Search</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {state};
}

export default compose(
    connect(mapStateToProps, { searchPart }),
    reduxForm({ form: 'searchForm' })
)(PartSearch);
