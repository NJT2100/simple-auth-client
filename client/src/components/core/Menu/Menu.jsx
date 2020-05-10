import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import auth from '../../../auth/auth'
import './Menu.css'

class Menu extends Component {
    constructor() {
        super()

        this.state = {
            userId: '',
            username: ''
        }
    }

    componentDidMount() {
        const jwt = auth.isAuthenticated()
        if (jwt) {
            const url = 'http://localhost:4000/api/auth/id'
            getData(url, jwt)
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            this.setState({
                                userId: json.id,
                                username: json.username
                            })
                        })
                    } else {
                        //Change later
                        console.log('error')
                    }
                })
        }
    }

    componentDidUpdate() {
        this.componentDidMount()
    }

    handleSignout = e => {
        auth.signout()
        this.setState({
            userId: '',
            username: ''
        })
    }

    render() {
        
        return (

            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to='/' className="navbar-brand">ClientName</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to='/'>Page 1</Link></li>
                        <li><Link to='/'>Page 2</Link></li>
                    </ul>
                    {!auth.isAuthenticated() && 
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to='/signup'><span className="glyphicon glyphicon-user"></span> Sign up</Link></li>
                            <li><Link to='/signin'><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        </ul>
                    }
                    {auth.isAuthenticated() && 
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <span className="glyphicon glyphicon-user"></span> {this.state.username}</a>
                                <ul className="dropdown-menu">
                                    <li><Link to={'user/' + this.state.userId}>Profile</Link></li>
                                    <li onClick={this.handleSignout}><Link to='/'>Sign out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    }
                </div>
            </nav>
        )
    }
}

async function getData(url = '', token) {
    const response = await fetch(url, {
        method: 'GET',
        mode:'cors',
        cache:'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
    return response
}


export default withRouter(Menu)