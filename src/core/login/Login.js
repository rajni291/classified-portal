import React, { Component } from 'react';
import { auth } from '../firebase';
import './Login.css';



class Login extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        email: '',
        password: ''
    }
    onChangeHandler = event => {
        var currentval = event.currentTarget;
        if (currentval.name === 'userEmail')
            this.setState({ email: currentval.value });
        if (currentval.name === 'userPassword')
            this.setState({ password: currentval.value });
    }

    signInWithEmailAndPasswordHandler = (event, email, password) => {
        // auth.signInWithPopup(provider)
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user, 'sign in');
                // this.props.navigation.navigate('/home')
                // Signed in 
                // ...
            })
            .catch(error => {
                console.error("Error signing in with password and email", error);
            });
    }

    render() {
        return (
            this.props.isLoggedIn === null &&
            <div className="container">
            <div className="signIn-title">Sign In</div>
                <div className="login-form">
                    <label htmlFor="userEmail" className="block">
                        Email:
                     </label>
                    <input
                        type="email"
                        className="control-width ctrl-padding{"
                        name="userEmail"
                        width="100%"
                        value={this.state.email}
                        placeholder="E.g: user@capita.co.uk"
                        id="userEmail"
                        onChange={(event) => this.onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword" className="block">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="control-width ctrl-padding"
                        name="userPassword"
                        value={this.state.password}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={(event) => this.onChangeHandler(event)}
                    />
                    <div className="signin-container">
                        <button className="signIn block" onClick={(event) => { this.signInWithEmailAndPasswordHandler(event, this.state.email, this.state.password) }}>
                            Sign in </button>
                    </div>

                </div>
            </div>
        )
    }

}
export default Login;