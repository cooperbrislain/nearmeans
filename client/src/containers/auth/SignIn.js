import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signIn } from './../../actions';

class SignIn extends Component {
    onSubmit = formProps => {
        console.log(formProps);
        this.props.signIn(formProps, () => {
            this.props.history.push('/counter');
        });
    }

    renderInput = ({ input }) => {                        
        return (
            <div>
                <h1>I am so cool</h1>
                <p>Custom form Component</p>
                <input {...input}/>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name='email'
                        type='text'                        
                        component={this.renderInput}
                        autoComplete="none"
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name='password'
                        type='password'
                        component={this.renderInput}
                        autoComplete="none"
                    />
                </fieldset>
                <div>
                    {this.props.errorMessage}
                </div>
                <button>Sign In</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, {signIn}),
    reduxForm({ form: 'signin' })
)(SignIn);