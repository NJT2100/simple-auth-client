import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './routing/MainRouter'
import { AuthenticationContext } from '../context/AuthenticationContext'
import auth from '../auth/auth'
import './App.css'

class App extends Component {
    constructor() {
        super()

    }

    componentDidMount() {
        //Need to update the function to verify JWT against server

    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <MainRouter/>
                </BrowserRouter>
            </div>
        )
    }

}

export default hot(module)(App)