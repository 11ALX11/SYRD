import React from "react";
import { getCookie, setCookie, eraseCookie } from "../../helpers/cookies.js";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

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
            errors: [],
            validation_errors: [],
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
        this.popValidationError("account_exist");
        this.popValidationError("username_mask");
        let err = this.validateUsernameMask(event.target.value);
        this.setState({ username: event.target.value, errors: err });
    }
    handleChangePasswordInput(event) {
        this.popValidationError("repeat_password");
        this.popValidationError("password_mask");
        let err = this.validatePasswordMask(event.target.value);
        this.setState({ password: event.target.value, errors: err });
    }
    handleChangeRepeatPasswordInput(event) {
        this.popValidationError("repeat_password");
        this.popValidationError("repeat_password_mask");
        let err = this.validateRepeatPasswordMask(event.target.value);
        this.setState({ repeat_password: event.target.value, errors: err });
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

    // validates repeat_password
    validateRepeatPasswordMask(password) {
        let err = this.state.errors;

        if (password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            if (err.indexOf("repeat_password_mask") === -1) err.push("repeat_password_mask");
        } else {
            let filtered = err.filter((el) => el !== "repeat_password_mask");
            err = filtered;
        }

        return err;
    }

    handleSignupSubmit(data, event) {
        event.preventDefault();

        if (!this.props.logged_in && data.errors.length === 0) {
            fetch(HOST + "/api/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    repeat_password: data.repeat_password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.errors && data.errors.length > 0) {
                        // add errors to state if there any (dont change state if there is no errors)
                        this.setState({ validation_errors: data.errors });
                    } else {
                        const token = data.token;
                        const user = data.user;

                        // save state by setting cookie
                        setCookie(
                            "AccountState",
                            JSON.stringify({
                                token: token,
                            }),
                            // set 1 day cookie, or set session cookie
                            data.remember_me ? 1 : 0
                        );
                        // log in by setting states
                        this.props.setAppState({
                            logged_in: true,
                            token: token,
                            account: {
                                username: user.username,
                                role: user.role,
                                registration_date: user.registration_date,
                            },
                        });

                        // clear validation errors
                        this.setState({ validation_errors: [] });

                        // clear form cookies
                        eraseCookie("LoginFormState");
                        eraseCookie("SignupFormState");
                    }
                })
                .catch((error) => {
                    // Обработка ошибки
                    console.error("Failed to signup.", error);
                    alert("Failed to signup. Please check your Internet connection.");
                });

            // In case of errors, they will be transmitted through validation_errors state
            // currently in validation function
        }
    }

    // Pops validation error (element) from array if present.
    popValidationError(element) {
        let err = this.state.validation_errors;
        let filtered = err.filter((el) => el !== element);

        // if pop does nothing, we dont want to update state
        if (JSON.stringify(filtered) !== JSON.stringify(err)) {
            this.setState({ validation_errors: filtered });
        }
    }

    render() {
        return (
            <form
                className="mb-4"
                onSubmit={(event) => {
                    let err = [
                        ...this.validateUsernameMask(this.state.username),
                        ...this.validatePasswordMask(this.state.password),
                        ...this.validateRepeatPasswordMask(this.state.repeat_password),
                    ];
                    this.setState({ errors: err });
                    // validate everything before submiting
                    this.handleSignupSubmit(this.state, event);
                }}
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
                            (this.state.validation_errors.includes("account_exist") ||
                            this.state.validation_errors.includes("username_mask") ||
                            this.state.errors.includes("username_mask")
                                ? " is-invalid"
                                : "")
                        }
                        type="text"
                        name="signup-form-username"
                        value={this.state.username}
                        onChange={this.handleChangeUsernameInput}
                        required
                    ></input>
                    <div className="invalid-feedback">
                        {this.state.validation_errors.includes("account_exist")
                            ? "Account with such username already exist."
                            : ""}
                    </div>
                    <div className="invalid-feedback">
                        {this.state.validation_errors.includes("username_mask") ||
                        this.state.errors.includes("username_mask")
                            ? "Username needs to be 1-30 long and consisting of [a-zA-Z0-9._]"
                            : ""}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="signup-form-password" className="form-label">
                        Password:
                    </label>
                    <input
                        id="signup-form-password"
                        className={
                            "form-control" +
                            (this.state.validation_errors.includes("password_mask") ||
                            this.state.errors.includes("password_mask")
                                ? " is-invalid"
                                : "")
                        }
                        type="password"
                        name="signup-form-password"
                        value={this.state.password}
                        onChange={this.handleChangePasswordInput}
                        required
                    ></input>
                    <div className="invalid-feedback">
                        {this.state.validation_errors.includes("password_mask") ||
                        this.state.errors.includes("password_mask")
                            ? "Password needs to be 4-30 long and consisting of [a-zA-Z0-9._]"
                            : ""}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="signup-form-repeat-password" className="form-label">
                        Repeat password:
                    </label>
                    <input
                        id="signup-form-repeat-password"
                        className={
                            "form-control" +
                            (this.state.validation_errors.includes("repeat_password") ||
                            this.state.validation_errors.includes("repeat_password_mask") ||
                            this.state.errors.includes("repeat_password_mask")
                                ? " is-invalid"
                                : "")
                        }
                        type="password"
                        name="signup-form-repeat-password"
                        value={this.state.repeat_password}
                        onChange={this.handleChangeRepeatPasswordInput}
                        required
                    ></input>
                    <div className="invalid-feedback">
                        {this.state.validation_errors.includes("repeat_password")
                            ? "Passwords are mismatching."
                            : ""}
                    </div>
                    <div className="invalid-feedback">
                        {this.state.validation_errors.includes("repeat_password_mask") ||
                        this.state.errors.includes("repeat_password_mask")
                            ? "Password needs to be 4-30 long and consisting of [a-zA-Z0-9._]"
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
