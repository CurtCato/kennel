import React, { Component } from "react"


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        remember: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleChecked = evt => {
        this.setState({remember: evt.target.checked})
    }

    // Simplistic handler for login submit
    handleLogin = event => {
        event.preventDefault();
        if (this.state.remember === "on") {
          console.log("I will be saving in local storage");
          localStorage.setItem(
            "credentials",
            JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
          );
        } else {
          console.log("I will be saving in session storage");
          sessionStorage.setItem(
            "credentials",
            JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
          );
        }
      };

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                       id="email"
                       placeholder="Email address"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                       <p>Remember Me?
                <input type="checkbox" id="remember" onChange={this.handleChecked}></input>
                </p>
                <button type="submit">
                    Sign in
                </button>
            </form>
        )
    }
}