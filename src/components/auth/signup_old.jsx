import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'; // redux-form@4.1.3
import * as actions from '../../actions';

class Signup extends Component {

    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit({email, password}){
        this.props.signupUser({email, password});
    }

    render() {

        const {handleSubmit} = this.props;
        const {email, password, passwordConfirm} = this.props.fields;

        return (
            <form className="signin" onSubmit={handleSubmit(this.handleFormSubmit )}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input {...email} className="form-control"/>
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input {...password} type="password" className="form-control"/>
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input {...passwordConfirm} type="password" className="form-control"/>
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button className="btn btn-primary" action="submit">
                    Sign up
                </button>
            </form>
        );
    }

    renderAlert(){
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
}

Signup.propTypes = {};
Signup.defaultProps = {};

function mapStateToProps(state){
    return {errorMessage: state.auth.error};
}

const formOptions = {
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}

function validate(formProps){
    const errors = {};
    if (!formProps.email) { errors.email = 'Enter an email' };
    if (!formProps.password) { errors.password = 'Enter a password' };
    if (!formProps.passwordConfirm) { errors.passwordConfirm = 'Enter a password' };

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
        // errors.passwordConfirm = 'Passwords must match';
    }
    return errors;
}

export default reduxForm( formOptions, mapStateToProps, actions )(Signup);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )


// reducers/index.js
//
// import { reducer as formReducer} from 'redux-form';
//
// const rootReducer = combineReducers({
//     form: formReducer
// });



