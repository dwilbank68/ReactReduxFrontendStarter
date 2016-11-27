import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form'; // redux-form@4.1.3
import * as actions from '../../actions';

const FIELDS = {
    email: {
        type: 'input',
        label: 'Email:'
    },
    password: {
        type: 'input',
        label: 'Password:'

    },
    passwordConfirm: {
        type: 'input',
        label: 'Confirm Password:'
    }
}


class Signup extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderField = this.renderField.bind(this)
    }

    handleFormSubmit({email, password}) {
        this.props.signupUser({email, password});
    }

    render() {

        const {handleSubmit} = this.props;

        return (
            <form className="signin" onSubmit={handleSubmit(this.handleFormSubmit)}>

                {_.map(FIELDS, this.renderField)}

                {this.renderAlert()}
                <button className="btn btn-primary" action="submit">
                    Sign up
                </button>
            </form>
        );
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    renderField(fieldConfig, field){
        const fieldHelper = this.props.fields[field];
        return (
            <fieldset className="form-group" key={fieldConfig.label}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type {...fieldHelper} className="form-control"/>
                {fieldHelper.touched && fieldHelper.error && <div className="error">{fieldHelper.error}</div>}
            </fieldset>
        )
    }
}

Signup.propTypes = {};
Signup.defaultProps = {};

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

const formOptions = {
    form: 'signup',
    fields: _.keys(FIELDS),
    validate
}

function validate(formProps) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if (!formProps[field]) {
            errors[field] = `Enter ${field}`;
        }
    })

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }
    return errors;
}

export default reduxForm(formOptions, mapStateToProps, actions)(Signup);

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

