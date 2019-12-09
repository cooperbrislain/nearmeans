import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signUp } from './../../actions';

class SignUp extends Component {
    onSubmit = formProps => this.props.signUp(formProps, () => this.props.history.push('/'));
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name='email'
                        type='text'
                        component='input'
                        autoComplete='none'
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name='password'
                        type='password'                        
                        component='input'
                        autoComplete='none'
                    />
                </fieldset>
                <div>
                    {this.props.errorMessage}
                </div>
                <button>Signup</button>
            </form>
        );
    }
}

const mapStateToProps = state => ({ errorMessage: state.auth.errorMessage });
export default compose(
    connect(mapStateToProps, { signUp }),
    reduxForm({ form: 'signup'})
)(SignUp);
