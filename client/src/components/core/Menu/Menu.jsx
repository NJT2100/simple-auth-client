import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import auth from '../../../auth/auth'
import './Menu.css'

const Menu = withRouter(({history}) => (
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
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">My Profile</a>
                        <ul className="dropdown-menu">
                            <li><Link to='/'>Profile</Link></li>
                            <li onClick={auth.signout}><Link to='/'>Sign out</Link></li>
                        </ul>
                    </li>
                </ul>
            }
        </div>
    </nav>
))

export default Menu