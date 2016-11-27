import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
// import { bindActionCreators } from 'redux';

class Header extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         'whatever':{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }

    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }

    renderLinks(){
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link to="/signout" className="nav-link">Sign Out</Link>
                </li>
            )
        } else {
            return [
                <li className="nav-item" key="signin">
                    <Link to="/signin" className="nav-link">Sign In</Link>
                </li>,
                <li className="nav-item" key="signup">
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
            ]

        }

    }
}

Header.propTypes = {};
Header.defaultProps = {};

//function mapDispatchToProps(dispatch) {
//  return bindActionCreators(
//        { nameYouWantOnProps:nameOfImportedAction },
//        dispatch
//  );
//}

function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps)(Header);
