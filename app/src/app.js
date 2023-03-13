import React from "react";
import "./app.css";
import { setCookie, getCookie, eraseCookie } from "./helpers/cookies.js";
import Pages from "./pages/pages.js";
import Clock from "./components/clock/clock.js";
import Navbar from "./components/navbar/navbar.js";
import AppModals from "./components/modal/modals";

class App extends React.Component {
    constructor(props) {
        super(props);

        let saved_account_state = JSON.parse(getCookie("AccountState"));
        if (saved_account_state === null) {
            saved_account_state = {};
        }

        let saved_accounts = JSON.parse(window.localStorage.getItem("AccountsBD"));
        if (saved_accounts === null) {
            saved_accounts = [
                {
                    username: "user",
                    password: "user",
                    role: "USER",
                    registration_date: "May 30, 2023",
                },
                {
                    username: "admin",
                    password: "admin",
                    role: "ADMIN",
                    registration_date: "December 21, 2012",
                },
            ];
            window.localStorage.setItem("AccountsBD", JSON.stringify(saved_accounts));
        }

        this.state = {
            logged_in: "logged_in" in saved_account_state ? saved_account_state.logged_in : false,
            account: {
                username: "username" in saved_account_state ? saved_account_state.username : "",
                role: "role" in saved_account_state ? saved_account_state.role : "GUEST",
                registration_date:
                    "registration_date" in saved_account_state ? saved_account_state.registration_date : "",
            },
            validation_errors: [],

            //fake BD for tests
            accounts: saved_accounts,
        };
    }

    render() {
        return (
            <>
                <header className="fixed-top">
                    <Navbar logged_in={this.state.logged_in} username={this.state.account.username} />
                </header>

                <main id="pages" className="container overflow-auto">
                    <Pages
                        logged_in={this.state.logged_in}
                        account={this.state.account}
                        validation_errors={this.state.validation_errors}
                        popValidationError={(el) => this.popValidationError(el)}
                        handleLoginSubmit={(d, e) => this.handleLoginSubmit(d, e)}
                        handleSignupSubmit={(d, e) => this.handleSignupSubmit(d, e)}
                    />
                </main>

                <footer className="container-fluid fixed-bottom bg-dark p-3" data-bs-theme="dark">
                    <address className="mb-1">
                        SYRD app by{" "}
                        <a href="mailto:po000915@g.bstu.by">Misijuk Aleksey Sergeevich (Group PO-9)</a>
                    </address>
                    <Clock />
                </footer>

                <AppModals handleLogoutSubmit={(e) => this.handleLogoutSubmit(e)} />
            </>
        );
    }

    handleLoginSubmit(data, event) {
        // ToDo post request
        event.preventDefault();

        if (!this.state.logged_in && data.errors.length === 0) {
            // fake server side:

            // find user in accounts
            // (using fake BD)
            let user_account = this.state.accounts.find((i) => i.username === data.username);

            // validate
            if (this.validateLoginForm(data, user_account)) {
                // fake server side end.

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
                this.setState({
                    logged_in: true,
                    account: {
                        username: user_account.username,
                        role: user_account.role,
                        registration_date: user_account.registration_date,
                    },
                    // clear validation errors
                    validation_errors: [],
                });

                // clear form cookies
                eraseCookie("LoginFormState");
            }
            // In case of errors, they will be transmitted through validation_errors state
            // currently in validation function
        }
    }

    handleSignupSubmit(data, event) {
        // ToDo post request
        event.preventDefault();

        if (!this.state.logged_in && data.errors.length === 0) {
            // fake server side:

            // try to get user
            // (using fake BD)
            let user_account = this.state.accounts.find((i) => i.username === data.username);

            // validate
            if (this.validateSignupForm(data, user_account)) {
                // create user
                let new_accounts = this.state.accounts;
                new_accounts.push({
                    username: data.username,
                    password: data.password,
                    role: "USER",
                    registration_date: new Date(),
                });
                // save user
                window.localStorage.setItem("AccountsBD", JSON.stringify(new_accounts));
                this.setState({ accounts: new_accounts });

                // fake server end.

                // then log in
                this.handleLoginSubmit(data, event);

                // clear form cookies
                eraseCookie("SignupFormState");
            }
            // In case of errors, they will be transmitted through validation_errors state
            // currently in validation function
        }
    }

    handleLogoutSubmit(event) {
        // ToDo post request
        event.preventDefault();

        // post logout here

        if (this.state.logged_in) {
            // reset cookie state
            eraseCookie("AccountState");
            // reset app state
            this.setState({
                logged_in: false,
                account: {
                    username: "",
                    role: "GUEST",
                    registration_date: "",
                },
            });
        }
    }

    validateLoginForm(data, user_account) {
        let errors = [];

        // if not found add error or if passwords mismatch
        if (user_account === undefined || user_account.password !== data.password) {
            errors.push("username_password");
        }

        if (data.username.match("^(?=.{1,30}$)[a-zA-Z0-9._]+$") === null) {
            errors.push("username_mask");
        }
        if (data.password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            errors.push("password_mask");
        }

        // add errors to state if there any (dont change state if there is no errors)
        if (errors.length !== 0) this.setState({ validation_errors: errors });

        return errors.length === 0;
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
}

export default App;
