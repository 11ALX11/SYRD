import React from "react";
import { getCookie, setCookie, eraseCookie } from "../../helpers/cookies.js";

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
        // ToDo post request
        event.preventDefault();

        if (!this.props.logged_in && data.errors.length === 0) {
            // fake server side:

            // try to get user
            // (using fake BD)
            let user_account = this.props.accounts.find((i) => i.username === data.username);

            // validate
            if (this.validateSignupForm(data, user_account)) {
                // create user
                let new_accounts = this.props.accounts;
                new_accounts.push({
                    username: data.username,
                    password: data.password,
                    role: "USER",
                    registration_date: new Date(),
                });
                // save user
                window.localStorage.setItem("AccountsBD", JSON.stringify(new_accounts));
                this.props.setAppState({ accounts: new_accounts });

                // fake server end.

                // then log in

                // find user in accounts
                // (using fake BD)
                let user_account = this.props.accounts.find((i) => i.username === data.username);

                // save state by setting cookie
                setCookie(
                    "AccountState",
                    JSON.stringify({
                        logged_in: true,
                        username: user_account.username,
                        role: user_account.role,
                        registration_date: user_account.registration_date,
                    }),
                    // set 1 day cookie, or set session cookie
                    data.remember_me ? 1 : 0
                );
                // log in by setting states
                this.props.setAppState({
                    logged_in: true,
                    account: {
                        username: user_account.username,
                        role: user_account.role,
                        registration_date: user_account.registration_date,
                    },
                });

                // clear validation errors
                this.setState({ validation_errors: [] });

                // clear forms cookies
                eraseCookie("LoginFormState");
                eraseCookie("SignupFormState");
            }
            // In case of errors, they will be transmitted through validation_errors state
            // currently in validation function
        }
    }

    validateSignupForm(data, user_account) {
        let errors = [];

        // if found add error
        if (user_account !== undefined) {
            errors.push("account_exist");
        }

        // check passwords (dont check objects with !==)
        if (JSON.stringify(data.password) !== JSON.stringify(data.repeat_password)) {
            errors.push("repeat_password");
        }

        if (data.username.match("^(?=.{1,30}$)[a-zA-Z0-9._]+$") === null) {
            errors.push("username_mask");
        }
        if (data.password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            errors.push("password_mask");
        }
        if (data.repeat_password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            errors.push("repeat_password_mask");
        }

        // add errors to state if there any (dont change state if there is no errors)
        if (errors.length !== 0) this.setState({ validation_errors: errors });

        return errors.length === 0;
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
