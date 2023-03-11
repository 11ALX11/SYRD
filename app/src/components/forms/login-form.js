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
        this.handleSubmit = this.props.handleLoginSubmit.bind(this);
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

    render() {
        return (
            <form className="mb-4" onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <label for="login-form-username" className="form-label">
                        Username:
                    </label>
                    <input
                        id="login-form-username"
                        className="form-control"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChangeUsernameInput}
                    ></input>
                </div>
                <div className="mb-3">
                    <label for="login-form-password" className="form-label">
                        Password:
                    </label>
                    <input
                        id="login-form-password"
                        className="form-control"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChangePasswordInput}
                    ></input>
                </div>
                <div className="mb-3">
                    <label for="login-form-remember-me" className="form-label me-2">
                        RememberMe:
                    </label>
                    <input
                        id="login-form-remember-me"
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.remember_me}
                        onChange={this.handleChangeRememberMeInput}
                    ></input>
                </div>
                <button className="btn btn-primary" type="submit">
                    Log in
                </button>
            </form>
        );
    }
}

export default LoginForm;
