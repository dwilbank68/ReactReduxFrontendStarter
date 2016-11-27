import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

    // constructor(props){
    //     super(props);
    //     this.handleFormSubmit = this.handleFormSubmit.bind(this)
    // }

    componentWillMount() {
        this.props.signoutUser();
        // UNAUTH_USER
    }


    render() {

        return (
            <div>
                Sorry to see you go
            </div>
        );
    }

}

Signout.propTypes = {};
Signout.defaultProps = {};

export default connect( null, actions )(Signout);

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
