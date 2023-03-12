import React from "react";
import { getCookie, setCookie } from "../../helpers/cookies.js";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        let saved_state = JSON.parse(getCookie("SignupFormState"));
        if (saved_state === null) {
            saved_state = {};
        }
        this.state = {
            username: "username" in saved_state ? saved_state.username : "",
            password: "password" in saved_state ? saved_state.password : "",
            repeat_password: "repeat_password" in saved_state ? saved_state.repeat_password : "",
            remember_me: "remember_me" in saved_state ? saved_state.remember_me : false,
        };

        this.handleChangeUsernameInput = this.handleChangeUsernameInput.bind(this);
        this.handleChangePasswordInput = this.handleChangePasswordInput.bind(this);
        this.handleChangeRepeatPasswordInput = this.handleChangeRepeatPasswordInput.bind(this);
        this.handleChangeRememberMeInput = this.handleChangeRememberMeInput.bind(this);
    }

    setState(state) {
        setCookie("SignupFormState", JSON.stringify({ ...this.state, ...state }));
        super.setState(state);
    }

    handleChangeUsernameInput(event) {
        this.setState({ username: event.target.value });
        this.props.popValidationError("account_exist");
    }
    handleChangePasswordInput(event) {
        this.setState({ password: event.target.value });
        this.props.popValidationError("repeat_password");
    }
    handleChangeRepeatPasswordInput(event) {
        this.setState({ repeat_password: event.target.value });
        this.props.popValidationError("repeat_password");
    }
    handleChangeRememberMeInput(event) {
        this.setState({ remember_me: event.target.checked });
    }

    render() {
        return (
            <form
                className="mb-4"
                onSubmit={(event) => this.props.handleSignupSubmit(this.state, event)}
                method="post"
            >
                <div className="mb-3">
                    <label htmlFor="signup-form-username" className="form-label">
                        Username:
                    </label>
                    <input
                        id="signup-form-username"
                        className={
                            "form-control" +
                            (this.props.validation_errors.includes("account_exist") ? " is-invalid" : "")
                        }
                        type="text"
                        name="signup-form-username"
                        value={this.state.username}
                        onChange={this.handleChangeUsernameInput}
                        required
                    ></input>
                    <div className="invalid-feedback">
                        {this.props.validation_errors.includes("account_exist")
                            ? "Account with such username already exist."
                            : ""}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-form-password" className="form-label">
                        Password:
                    </label>
                    <input
                        id="signup-form-password"
                        className="form-control"
                        type="password"
                        name="signup-form-password"
                        value={this.state.password}
                        onChange={this.handleChangePasswordInput}
                        required
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-form-repeat-password" className="form-label">
                        Repeat password:
                    </label>
                    <input
                        id="signup-form-repeat-password"
                        className={
                            "form-control" +
                            (this.props.validation_errors.includes("repeat_password") ? " is-invalid" : "")
                        }
                        type="password"
                        name="signup-form-repeat-password"
                        value={this.state.repeat_password}
                        onChange={this.handleChangeRepeatPasswordInput}
                        required
                    ></input>
                    <div className="invalid-feedback">
                        {this.props.validation_errors.includes("repeat_password")
                            ? "Passwords are mismatching."
                            : ""}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="signup-form-remember-me" className="form-label me-2">
                        RememberMe:
                    </label>
                    <input
                        id="signup-form-remember-me"
                        className="form-check-input"
                        type="checkbox"
                        name="signup-form-remember-me"
                        checked={this.state.remember_me}
                        onChange={this.handleChangeRememberMeInput}
                    ></input>
                </div>

                <button className="btn btn-primary" type="submit">
                    Sign up
                </button>
            </form>
        );
    }
}

export default SignupForm;
