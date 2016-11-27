import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'; // redux-form@4.1.3
import * as actions from '../../actions';

class Signin extends Component {

    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit({email, password}){
        this.props.signinUser({email, password});
    }

    render() {

        const {handleSubmit} = this.props;
        const {email, password} = this.props.fields;

        return (
            <form className="signin" onSubmit={handleSubmit(this.handleFormSubmit )}>
                <fieldset className="form-group">
                    <label> Email: </label>
                    <input {...email} className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                    <label> Password: </label>
                    <input {...password} type="password" className="form-control"/>
                </fieldset>
                {this.renderAlert()}
                <button className="btn btn-primary" action="submit">
                    Sign in
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

Signin.propTypes = {};
Signin.defaultProps = {};

function mapStateToProps(state){
    return {errorMessage: state.auth.error};
}

const formOptions = {
    form: 'signin',
    fields: ['email','password']
}

export default reduxForm( formOptions, mapStateToProps, actions )(Signin);