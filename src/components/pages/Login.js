import React, { Component } from 'react'
import './Login.css';
import SignIn from '../SignIn';

export class Login extends Component {

    constructor() {
        super();
        // props.liftState(false);
    }

    render() {
        return (
            <div className="container">
                <div className="login-form">
                    <SignIn loginLiftState = {this.props.liftState}/>
                </div>
                <div className="login-img">
                    <img src={`${process.env.PUBLIC_URL}/images/blood-donor.png`} alt="" />
                </div>
            </div>
        )
    }
}

export default Login
