import React from 'react'
import {
    Nav,
    Navbar,
    NavItem,
    NavbarBrand,
    Collapse,
    NavbarToggler
} from 'reactstrap'
import LoginModal from './LoginModal';
import SignInSignOutBtn from '../components/SignInSignOutBtn';

import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class MyNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            isOpen: false,
            userLoggedIn: null
        }
    }

    componentDidMount() {
        this.updateUserLoggedIn()
    }

    goToHome = e => {
        e.preventDefault()
        this.props.history.push('/')
    }

    showModal = () => {
        // display modal
        this.setState({
            showModal: !this.state.showModal
        })
    }

    toggleNavMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    updateUserLoggedIn = () => {
        if (localStorage.getItem('JWT')) {
            this.setState({
                userLoggedIn: true
            })
        }
        else {
            this.setState({
                userLoggedIn: false
            })
        }
    }

    MyProfileLink() {
        if (this.state.userLoggedIn) {
            return (
                <NavItem>
                    <Link className='nav-link' to="/profile">
                        My Profile
                            </Link>
                </NavItem>
            )
        }
    }

    render() {


        return (
            <>
                <LoginModal updateUserLoggedIn={this.updateUserLoggedIn} toggle={this.showModal} isOpen={this.state.showModal} />

                <Navbar expand='md' fixed='top' light className='bg-white'>
                    <NavbarBrand onClick={this.goToHome} href="#">
                        <img src="http://insta.nextacademy.com/static/favicon.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                        Nextagram
                </NavbarBrand>

                    <NavbarToggler onClick={this.toggleNavMenu} />
                    <Collapse navbar isOpen={this.state.isOpen} id="navbarSupportedContent">

                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to='/'>
                                    Home
                             </Link>
                            </NavItem>

                            {/* Only render My Profile Link if user is logged in */}
                            {this.MyProfileLink()}

                            <SignInSignOutBtn
                                userLoggedIn={this.state.userLoggedIn}
                                updateUserLoggedIn={this.updateUserLoggedIn}
                                showModal={this.showModal} />

                        </Nav>

                    </Collapse>

                </Navbar >

            </>
        )

    }

}

export default withRouter(MyNavbar);