import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

class Signup extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            username: '',
            password_1: '',
            password_2: '',
            emailValid: false,
            emailMessage: '',
            usernameValid: false,
            usernameMessage: '',
            passwordValid: false,
            passwordMessage: '',
            passwordMatch: false,
            passwordMatchMessage: '',
            formValid: true
        }
    }

    handleOnChange = e => {
        const { target: { value, name } } = e
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit = e => {
        //Prevent default behaviour of onSubmit
        e.preventDefault()
        this.setState((state) => ({
            formValid: state.emailValid && state.usernameValid &&
                state.passwordValid && state.passwordMatch 
        }))
        if (!this.state.formValid) return
        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password_1
        }
        const url = "http://localhost:4000/api/users"
        postData(url, data)
            .then(response => {
                console.log(response)
            })
    }

    validateEmail = e => {
        //Validate that email was entered
        if (this.state.email.length > 0) {
            this.setState(({
                emailMessage: '',
                emailValid: true
            }) )
        } else {
            this.setState({
                emailMessage: 'Email required.',
                emailValid: false
            }) 
        }
    }

    validateUsername = e => {
        //Validate that the user name meets the length requirement
        if (this.state.username.length < 6 || this.state.username.length > 20) {
            this.setState({
                usernameMessage: 'Username must be 6 - 20 characters.',
                usernameValid: false
            })
        } else {
            this.setState({
                usernameMessage: '',
                usernameValid: true
            })
        }
    }

    validatePassword = e => {
        //Validate that the password meets length requirement
        if (this.state.password_1.length < 6) {
            this.setState({
                passwordMessage: 'Password must consist of atleast 6 characters.',
                passwordValid: false
            })
            return
        } else {
            this.setState({
                passwordMessage: '',
                passwordValid: true
            })
        }

        //Validate that password contains atleast one letter and one number
        if (/\d/.test(this.state.password_1) && /[a-zA-Z]/.test(this.state.password_1)) {
            this.setState({
                passwordMessage: '',
                passwordValid: true
            })
        } else {
            this.setState({
                passwordMessage: 'Password must consist of at least 1 letter and 1 number.',
                passwordValid: false
            })
        }
    }

    validatePasswordMatch = e => {
        //Valdiate that the passwords match
        if (this.state.password_1 === this.state.password_2) {
            this.setState({
                passwordMatch: true,
                passwordMatchMessage: ''
            })
        } else {
            this.setState({
                passwordMatch: false,
                passwordMatchMessage: 'Passwords do not match.'
            })
        }
    }

    render() {   
        return (
            <div className="signup-container">
                <h1>Register</h1>
                <form className="form-horizontal" onSubmit={this.handleOnSubmit} noValidate>
                    {
                        !this.state.formValid && (<div className="error-message">There are errors in the registration form.</div>)
                    }
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={this.state.email}
                                onChange={this.handleOnChange}
                                onBlur={this.validateEmail}
                            />
                            {
                                !this.state.emailValid && (<div className="error-message">{this.state.emailMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleOnChange}
                                onBlur={this.validateUsername}
                            />
                            {
                                !this.state.usernameValid && (<div className="error-message">{this.state.usernameMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="password"
                                name="password_1"
                                placeholder="Password"
                                value={this.state.password_1}
                                onChange={this.handleOnChange}
                                onBlur={this.validatePassword}
                            />
                            {
                                !this.state.passwordValid && (<div className="error-message">{this.state.passwordMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <input
                                type="password"
                                name="password_2"
                                placeholder="Confirm Password"
                                value={this.state.password_2}
                                onChange={this.handleOnChange}
                                onBlur={this.validatePasswordMatch}
                            />
                            {
                                !this.state.passwordMatch && (<div className="error-message">{this.state.passwordMatchMessage}</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <button type="submit" className="btn-submit">REGISTER</button>
                        </div>
                    </div>
                    <span>Already have an account? <Link to="/signin">Sign in</Link></span>
                </form>
            </div>
        )
    }
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode:'cors',
        cache:'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    return response
}

export default Signup