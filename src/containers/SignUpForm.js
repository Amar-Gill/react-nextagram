import React from 'react'
import axios from 'axios'

import {
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    FormFeedback
} from 'reactstrap';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            usernameValid: null
        }
    }

    validateEmail(z) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(z);
      }

    handleInput = e => {
        let x = { ...e }
        console.log(x)
        let delay = setTimeout(() => this.handleUsernameCheck(x), 300)
        this.setState({
            [e.target.name]: e.target.value,
            delay
        })
    }

    handleUsernameCheck = e => {
        const newUsername = e.target.value;
        if (newUsername.length >= 5) {
            axios.get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            ).then(response => {
                if (response.data.valid) {
                    this.setState({
                        usernameValid: true
                    });
                } else {
                    this.setState({
                        usernameValid: false
                    });
                }
            });
        }
    };

    handleSubmit = e => {
        e.preventDefault()

        const { username, email, password, confirmPassword } = this.state

        //handle passwords matching
        if (password != confirmPassword) {
            alert('Passwords do not match. Please try again.')
            return
        }

        //handle username and password length requirements
        if (username.length < 5 || 20 < username.length) {
            alert('Username must be between 5-20 characters. Please try again')
            return
        }
        if (password.length < 8 || 50 < password.length) {
            alert('Password must be between 8-50 characters. Please try again')
            return
        }

        //handle post request
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: username,
                email: email,
                password: password
            }
        })
            .then(response => {
                console.log(response)
                alert('thanks for signing up!')
            })
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
                //catch username exists error
                //catch email in use error
                alert(error.response.data.message)
            })

        //close log in modal and toggle signupform
        this.props.toggleSignUpForm()
        this.props.toggle()

        //clear forms
        this.setState({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })

        //close modal
        this.props.toggle()
    }

    render() {

        const { toggle, toggleSignUpForm } = this.props
        const { username, password, email, confirmPassword, usernameValid } = this.state
        return (
            <div>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form id='signup-form' onSubmit={this.handleSubmit}>

                            <FormGroup >
                                <Label>Username</Label>
                                <Input value={username}
                                    type='text'
                                    name='username'
                                    placeholder='Choose a username min 5 characters'
                                    onChange={e => {
                                        if (this.state.delay) {
                                            clearTimeout(this.state.delay);
                                        }
                                        this.handleInput(e);
                                    }}
                                    {...(username.length >= 5
                                        ? usernameValid
                                            ? { valid: true }
                                            : { invalid: true }
                                        : username.length > 0
                                            ? { invalid: true }
                                            : "")} />
                                <FormFeedback
                                    {...(username.length > 0 && username.length >= 5
                                        ? usernameValid
                                            ? { valid: true }
                                            : { invalid: true }
                                        : { invalid: true })}
                                >
                                    {username.length >= 5
                                        ? usernameValid
                                            ? "Sweet, this username is available!"
                                            : "Sorry, this username is taken!"
                                        : "Minimum 5 characters"}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup >
                                <Label>Email</Label>
                                <Input value={email}
                                    type='email'
                                    name='email'
                                    onChange={this.handleInput} 
                                    {...(email
                                        ?this.validateEmail(email)
                                            ?{valid:true}
                                            :{invalid:true}
                                        :'')}/>
                            </FormGroup>
                            <FormFeedback>
                                {this.validateEmail(email)
                                ?'lit'
                                :'not lit'}
                            </FormFeedback>

                            <FormGroup >
                                <Label>Password</Label>
                                <Input value={password}
                                    type='password'
                                    name='password'
                                    placeholder='Choose a password min 8 characters'
                                    onChange={this.handleInput}
                                    {...(password.length >0
                                        ? password.length<8
                                            ?{invalid:true}
                                            :{valid:true}
                                        : '')} />
                                <FormFeedback>
                                    {password.length >0 
                                        ? password.length<8
                                            ?'Minimum 8 characters'
                                            :''
                                        : ''}
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup >
                                <Label>Confirm Password</Label>
                                <Input value={confirmPassword}
                                    type='password'
                                    name='confirmPassword'
                                    onChange={this.handleInput}
                                    disabled = {!password}
                                    {...(confirmPassword.length>0
                                        ?password == confirmPassword
                                            ?{valid:true}
                                            :{invalid:true}
                                        :'')}/>
                                <FormFeedback>
                                    {password == confirmPassword
                                    ?'LIT'
                                    :'Passwords nah match fam'}
                                </FormFeedback>
                            </FormGroup>

                            <FormText color="muted">
                                Already a member? <a onClick={toggleSignUpForm} href='#'>Log in here.</a>
                            </FormText>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <input disabled={!username || !password || !email || !confirmPassword}
                            className="btn btn-primary"
                            form="signup-form"
                            color="primary"
                            value={'Sign Up'}
                            type="submit"
                        />{' '}
                        <Button color="secondary" onClick={toggle} >Cancel</Button>
                    </ModalFooter>
            </div >
        )
    }
}

export default SignUpForm;