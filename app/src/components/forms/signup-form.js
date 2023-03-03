import React from "react";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            repeat_password: "",
        };
        this.handleChangeUsernameInput = this.handleChangeUsernameInput.bind(this);
        this.handleChangePasswordInput = this.handleChangePasswordInput.bind(this);
        this.handleChangeRepeatPasswordInput = this.handleChangeRepeatPasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsernameInput(event) {
        this.setState({ username: event.target.value });
    }
    handleChangePasswordInput(event) {
        this.setState({ password: event.target.value });
    }
    handleChangeRepeatPasswordInput(event) {
        this.setState({ repeat_password: event.target.value });
    }
    handleSubmit(event) {
        //ToDo validation, post request
        if (this.state.password === this.state.repeat_password) {
            alert("Отправленное имя: " + this.state.username);
        } else {
            alert("Passwords are mismatching!");
        }
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
                    <label>Repeat password:</label>
                    <input
                        type="password"
                        value={this.state.repeat_password}
                        onChange={this.handleChangeRepeatPasswordInput}
                    ></input>
                </div>

                <button type="submit">Sign up</button>
            </form>
        );
    }
}

export default SignupForm;
