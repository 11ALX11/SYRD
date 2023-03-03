import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            remember_me: false,
        };
        this.handleChangeUsernameInput = this.handleChangeUsernameInput.bind(this);
        this.handleChangePasswordInput = this.handleChangePasswordInput.bind(this);
        this.handleChangeRememberMeInput = this.handleChangeRememberMeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsernameInput(event) {
        this.setState({ username: event.target.value });
    }
    handleChangePasswordInput(event) {
        this.setState({ password: event.target.value });
    }
    handleChangeRememberMeInput(event) {
        this.setState({ remember_me: event.target.checked });
    }
    handleSubmit(event) {
        //ToDo validation, post request
        alert("Отправленное имя: " + this.state.username + " " + this.state.remember_me);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChangeUsernameInput}
                    ></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChangePasswordInput}
                    ></input>
                </div>
                <div>
                    <label>RememberMe:</label>
                    <input
                        type="checkbox"
                        value={this.state.remember_me}
                        onChange={this.handleChangeRememberMeInput}
                    ></input>
                </div>
                <button type="submit">Log in</button>
            </form>
        );
    }
}

export default LoginForm;
