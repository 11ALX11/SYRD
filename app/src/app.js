import React from "react";
import "./app.css";
import Pages from "./pages/pages.js";
import Clock from "./components/clock/clock.js";
import Navbar from "./components/navbar/navbar.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
            account: {
                username: "",
                role: "USER",
                registration_date: "",
            },
            validation_errors: [],

            //fake BD for tests
            accounts: [
                {
                    username: "user",
                    password: "user",
                    role: "USER",
                    registration_date: new Date("May 30, 2023"),
                },
                {
                    username: "admin",
                    password: "admin",
                    role: "ADMIN",
                    registration_date: new Date("December 21, 2012"),
                },
            ],
        };
    }

    render() {
        return (
            <>
                <header className="fixed-top">
                    <Navbar logged_in={this.state.logged_in} />
                </header>

                <main id="pages" className="container overflow-scroll">
                    <Pages
                        logged_in={this.state.logged_in}
                        account={this.state.account}
                        validation_errors={this.state.validation_errors}

                        popValidationError={(el) => this.popValidationError(el)}
                        handleLoginSubmit={(d, e) => this.handleLoginSubmit(d, e)}
                        handleLogoutSubmit={(e) => this.handleLogoutSubmit(e)}
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
            </>
        );
    }

    handleLoginSubmit(data, event) {
        // ToDo post request
        event.preventDefault();

        // find user in accounts
        // (using fake BD)
        let user_account = this.state.accounts.find((i) => i.username === data.username);

        if (!this.state.logged_in) {
            // validate
            if (this.validateLoginForm(data, user_account)) {
                // log in by setting states
                this.setState({
                    logged_in: true,
                    account: {
                        username: user_account.username,
                        role: user_account.role,
                        registration_date: user_account.registration_date,
                    },
                });
            }
            // In case of errors, they will be transmitted through validation_errors state
            // in validation function
        }
    }

    handleSignupSubmit(data, event) {
        // ToDo post request
        event.preventDefault();

        // fake server side:

        // try to get user
        // (using fake BD)
        let user_account = this.state.accounts.find((i) => i.username === data.username);

        // validate
        if (this.validateSignupForm(data, user_account)) {
            // create user
            this.state.accounts.push({
                username: data.username,
                password: data.password,
                role: "USER",
                registration_date: new Date(),
            });

            // fake server end.

            // then log in
            this.handleLoginSubmit(data, event);
        }
        // In case of errors, they will be transmitted through validation_errors state
        // in validation function
    }

    handleLogoutSubmit(event) {
        // ToDo post request
        event.preventDefault();

        // post logout here

        if (this.state.logged_in) {
            this.setState({
                logged_in: false,
                account: {
                    username: "",
                    registration_date: "",
                },
            });
        }
    }

    validateLoginForm(data, user_account) {
        let errors = [...this.state.validation_errors];

        // if not found add error or if passwords mismatch
        if (user_account === undefined || user_account.password !== data.password) {
            errors.push("username_password");
        }

        if (errors.length !== 0) this.setState({ validation_errors: errors });

        return errors.length === 0;
    }

    validateSignupForm(data, user_account) {
        let errors = [...this.state.validation_errors];

        // if found add error
        if (user_account !== undefined) {
            errors.push("account_exist");
        }

        // check passwords (dont check objects with !==)
        if (data.password != data.repeat_password) {
            errors.push("repeat_password");
        }

        // add errors to state if there any (dont change state if there is no errors)
        if (errors.length !== 0) this.setState({ validation_errors: errors });

        return errors.length === 0;
    }

    // Pops validation error (element) from array if present.
    popValidationError(element) {
        let err = this.state.validation_errors;
        let filtered = err.filter(el => el !== element);

        // if pop does nothing, we dont want to update state
        if (filtered !== err) {
            this.setState({ validation_errors: filtered });
        }
    }
}

export default App;
