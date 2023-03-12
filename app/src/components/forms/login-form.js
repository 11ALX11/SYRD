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
    }

    handleChangeUsernameInput(event) {
        this.setState({ username: event.target.value });
        this.props.popValidationError("username_password");
    }
    handleChangePasswordInput(event) {
        this.setState({ password: event.target.value });
        this.props.popValidationError("username_password");
    }
    handleChangeRememberMeInput(event) {
        this.setState({ remember_me: event.target.checked });
    }

    render() {
        return (
            <form
                className="mb-4"
                onSubmit={(event) => this.props.handleLoginSubmit(this.state, event)}
                method="post"
            >
                <div className="mb-3">
                    <label htmlFor="login-form-username" className="form-label">
                        Username:
                    </label>
                    <input
                        id="login-form-username"
                        className={
                            "form-control" +
                            (this.props.validation_errors.includes("username_password")
                                ? " is-invalid"
                                : "")
                        }
                        type="text"
                        name="login-form-username"
                        value={this.state.username}
                        onChange={this.handleChangeUsernameInput}
                        required
                    ></input>
                    <div className="invalid-feedback">
                        {this.props.validation_errors.includes("username_password")
                            ? "Wrong username or password."
                            : ""}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="login-form-password" className="form-label">
                        Password:
                    </label>
                    <input
                        id="login-form-password"
                        className={
                            "form-control" +
                            (this.props.validation_errors.includes("username_password")
                                ? " is-invalid"
                                : "")
                        }
                        type="password"
                        name="login-form-password"
                        value={this.state.password}
                        onChange={this.handleChangePasswordInput}
                        required
                    ></input>
                    <div className="invalid-feedback">
                        {this.props.validation_errors.includes("username_password")
                            ? "Wrong username or password."
                            : ""}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="login-form-remember-me" className="form-label me-2">
                        RememberMe:
                    </label>
                    <input
                        id="login-form-remember-me"
                        className="form-check-input"
                        type="checkbox"
                        name="login-form-remember-me"
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
