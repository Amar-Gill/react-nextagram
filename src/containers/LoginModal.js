import React from 'react'

import { Modal } from 'reactstrap';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm';

class LoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignUpForm: false
        }
    }

    toggleSignUpForm = () => { 
        this.setState({
            isSignUpForm: !this.state.isSignUpForm
        })
    }

    render() {
        const { isOpen, toggle, updateUserLoggedIn } = this.props
        const { isSignUpForm } = this.state

        let form;

        (isSignUpForm)
            ? (form = <SignUpForm toggle={toggle} toggleSignUpForm={this.toggleSignUpForm}/>)
            : (form = <LoginForm toggle={toggle} toggleSignUpForm={this.toggleSignUpForm} updateUserLoggedIn={updateUserLoggedIn}/>)    

        return (
            <div>
                <Modal isOpen={isOpen} toggle={toggle} className={this.props.className}>

                    {form}

                </Modal>
            </div>
        )
    }
}

export default LoginModal;