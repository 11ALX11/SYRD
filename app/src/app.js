import React from "react";
import "./app.css";
import { eraseCookie, getCookie } from "./helpers/cookies.js";
import Pages from "./pages/pages.js";
import Clock from "./components/clock/clock.js";
import Navbar from "./components/navbar/navbar.js";
import AppModals from "./components/modal/modals";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

class App extends React.Component {
    constructor(props) {
        super(props);

        let saved_account_state = {};
        let token_cookie = JSON.parse(getCookie("AccountState"));
        let token = "";
        if (token_cookie) token = token_cookie.token;
        let loading;

        if (token !== null && token !== "") {
            loading = true;

            fetch(HOST + "/api/get-user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token, // Добавление токена в заголовок Authorization
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // Обработка ответа сервера
                    if (!data.message) {
                        this.setState({
                            logged_in: true,
                            token: token,
                            loading: false,
                            account: {
                                username: data.user.username,
                                role: data.user.role,
                                registration_date: data.user.registration_date,
                            },
                        });
                    } else {
                        eraseCookie("AccountState");
                        this.setState({
                            logged_in: false,
                            token: "",
                            loading: false,
                            account: {
                                username: "",
                                role: "GUEST",
                                registration_date: "",
                            },
                        });
                    }
                })
                .catch((error) => {
                    // Обработка ошибок
                    console.error("Error getting user data:", error);
                });
        } else {
            loading = false;
        }

        this.state = {
            logged_in: token !== null && token !== "",
            token: "token" in saved_account_state ? token : "",
            loading: loading,
            account: {
                username: "username" in saved_account_state ? saved_account_state.username : "",
                role: "role" in saved_account_state ? saved_account_state.role : "GUEST",
                registration_date:
                    "registration_date" in saved_account_state ? saved_account_state.registration_date : "",
            },
        };
    }

    render() {
        return (
            <>
                <header className="fixed-top">
                    <Navbar
                        logged_in={this.state.logged_in}
                        username={this.state.account.username}
                        role={this.state.account.role}
                    />
                </header>

                <main id="pages" className="container overflow-auto">
                    <Pages
                        token={this.state.token}
                        loading={this.state.loading}
                        logged_in={this.state.logged_in}
                        account={this.state.account}
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

                <AppModals
                    logged_in={this.state.logged_in}
                    token={this.state.token}
                    setAppState={(state) => this.setState(state)}
                />
            </>
        );
    }
}

export default App;
