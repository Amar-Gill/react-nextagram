import React from 'react'

import { NavItem } from 'reactstrap'

import { withRouter } from 'react-router'

class SignInSignOutBtn extends React.Component {

    logOut = e => {
        e.preventDefault()
        localStorage.removeItem('JWT')
        this.props.updateUserLoggedIn()
        this.props.history.push('/')
    }

    render() {


        if (this.props.userLoggedIn) {
            return (
                <>
                    <NavItem>
                        <a onClick={this.logOut} className="nav-link" href='#'>Log Out</a>
                    </NavItem>
                </>

            )
        }
        else {
            return (
                <>
                    <NavItem>
                        <a onClick={this.props.showModal} className="nav-link" href="#">Sign In</a>
                    </NavItem>
                </>
            )
        }
    }

}


export default withRouter(SignInSignOutBtn);