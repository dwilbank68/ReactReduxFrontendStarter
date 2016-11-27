import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    render() {
        return (
            <div className="feature">
                Here is your feature
                <p>{this.props.user.email}</p>
                <p>{this.props.user.id}</p>
            </div>
        );
    }

}

Feature.propTypes = {};
Feature.defaultProps = {};

function mapStateToProps(state) {
    return { user: state.auth.user }
}

export default connect(mapStateToProps, actions)(Feature);
