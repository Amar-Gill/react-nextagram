import React from 'react'

import {
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';
import { withRouter } from 'react-router'
import Axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state
        console.log(username)
        console.log(password)
        //axios call
        Axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: username,
                password: password
            }
        })
            .then(response => {
                console.log(response)
                console.log(response.data.auth_token)
                localStorage.setItem('JWT', response.data.auth_token)
                this.props.updateUserLoggedIn()
                this.props.toggle()
                this.props.history.push('/profile')
            })
            .catch(error => {
                console.error(error.response)
                alert('No such user name or password. Try again.')
            })

        this.setState({
            username: '',
            password: ''
        })
    }

    render() {

        const { username, password } = this.state
        const { toggle, toggleSignUpForm } = this.props

        return (
            <>
                <ModalHeader>Log In</ModalHeader>
                <ModalBody>
                    <Form id="login-form" onSubmit={this.handleSubmit}>
                        <FormGroup >
                            <Label>Username</Label>
                            <Input value={username} onChange={this.handleInput} type='username' name='username'></Input>
                        </FormGroup>
                        <FormGroup >
                            <Label>Password</Label>
                            <Input value={password} onChange={this.handleInput} type='password' name='password'></Input>
                        </FormGroup>
                        <FormText color="muted">
                            New member? <a onClick={toggleSignUpForm} href='#'>Sign up here.</a>
                        </FormText>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <input disabled={!username || !password}
                        className="btn btn-primary"
                        form="login-form"
                        color="primary"
                        value={'Log In'}
                        type="submit"
                    />{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </>
        )
    }
}

export default withRouter(LoginForm);