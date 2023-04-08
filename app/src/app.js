import React from "react";
import "./app.css";
import { getCookie } from "./helpers/cookies.js";
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
                        accounts={this.state.accounts}
                        setAppState={(state) => this.setState(state)}
                    />
                </main>

                <footer className="container-fluid fixed-bottom bg-dark p-3" data-bs-theme="dark">
                    <address className="mb-1">
                        SYRD app by{" "}
                        <a href="mailto:po000915@g.bstu.by">Misijuk Aleksey Sergeevich (Group PO-9)</a>
                    </address>
                    <Clock />
                </footer>

                <AppModals logged_in={this.state.logged_in} setAppState={(state) => this.setState(state)} />
            </>
        );
    }
}

export default App;
