import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from '../core/Menu/Menu'
import Content from '../core/Content/Content'
import Signup from '../auth/signup/Signup'
import Signin from '../auth/signin/Signin'

class MainRouter extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Content>
                    <Switch>
                        {/* Change to Home component later */} 
                        <Route path="/signup" component={Signup}/>
                        <Route path="/signin" component={Signin}/>                   
                    </Switch>
                </Content>
            </div>
        )
    }
}

export default MainRouter