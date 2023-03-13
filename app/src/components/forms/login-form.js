import React from "react";
import { getCookie, setCookie } from "../../helpers/cookies.js";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        let saved_state = JSON.parse(getCookie("LoginFormState"));
        if (saved_state === null) {
            saved_state = {};
        }
        this.state = {
            username: "username" in saved_state ? saved_state.username : "",
            password: "password" in saved_state ? saved_state.password : "",
            remember_me: "remember_me" in saved_state ? saved_state.remember_me : false,
            errors: [],
        };

        this.handleChangeUsernameInput = this.handleChangeUsernameInput.bind(this);
        this.handleChangePasswordInput = this.handleChangePasswordInput.bind(this);
        this.handleChangeRememberMeInput = this.handleChangeRememberMeInput.bind(this);
    }

    setState(state) {
        setCookie("LoginFormState", JSON.stringify({ ...this.state, ...state }));
        super.setState(state);
    }

    handleChangeUsernameInput(event) {
        this.props.popValidationError("username_password");
        this.props.popValidationError("username_mask");
        let err = this.validateUsernameMask(event.target.value);
        this.setState({ username: event.target.value, errors: err });
    }
    handleChangePasswordInput(event) {
        this.props.popValidationError("username_password");
        this.props.popValidationError("password_mask");
        let err = this.validatePasswordMask(event.target.value);
        this.setState({ password: event.target.value, errors: err });
    }
    handleChangeRememberMeInput(event) {
        this.setState({ remember_me: event.target.checked });
    }

    // validates username
    validateUsernameMask(username) {
        let err = this.state.errors;

        if (username.match("^(?=.{1,30}$)[a-zA-Z0-9._]+$") === null) {
            if (err.indexOf("username_mask") === -1) err.push("username_mask");
        } else {
            let filtered = err.filter((el) => el !== "username_mask");
            err = filtered;
        }

        return err;
    }

    // validates password
    validatePasswordMask(password) {
        let err = this.state.errors;

        if (password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            if (err.indexOf("password_mask") === -1) err.push("password_mask");
        } else {
            let filtered = err.filter((el) => el !== "password_mask");
            err = filtered;
        }

        return err;
    }

    render() {
        return (
            <form
                className="mb-4"
                onSubmit={(event) => {
                    let err = [
                        ...this.validateUsernameMask(this.state.username),
                        ...this.validatePasswordMask(this.state.password),
                    ];
                    this.setState({ errors: err });
                    // validate everything before submiting
                    this.props.handleLoginSubmit(this.state, event);
                }}
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
                            (this.props.validation_errors.includes("username_password") ||
                            this.props.validation_errors.includes("username_mask") ||
                            this.state.errors.includes("username_mask")
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
                    <div className="invalid-feedback">
                        {this.props.validation_errors.includes("username_mask") ||
                        this.state.errors.includes("username_mask")
                            ? "Username needs to be 1-30 long and consisting of [a-zA-Z0-9._]"
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
                            (this.props.validation_errors.includes("username_password") ||
                            this.props.validation_errors.includes("password_mask") ||
                            this.state.errors.includes("password_mask")
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
                        {this.props.validation_errors.includes("username_password") ||
                        this.props.validation_errors.includes("password_mask")
                            ? "Wrong username or password."
                            : ""}
                    </div>
                    <div className="invalid-feedback">
                        {this.props.validation_errors.includes("password_mask") ||
                        this.state.errors.includes("password_mask")
                            ? "Password needs to be 4-30 long and consisting of [a-zA-Z0-9._]"
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
                        checked={this.state.remember_me}
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
