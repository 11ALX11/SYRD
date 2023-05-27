import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home.js";
import AccountPage from "./account-page.js";
import Login from "./login.js";
import Signup from "./signup.js";
import Error404 from "./error404.js";
import Accounts from "./accounts.js";
import Loader from "../components/loader/loader.js";

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.loading) {
            return (
                <>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/account"
                            element={
                                <AccountPage
                                    logged_in={this.props.logged_in}
                                    account={this.props.account}
                                />
                            }
                        />
                        <Route path="/accounts" element={<Navigate to="/accounts/0"></Navigate>}></Route>
                        <Route
                            path="/accounts/:page"
                            element={
                                <Accounts
                                    token={this.props.token}
                                    logged_in={this.props.logged_in}
                                    account_role={this.props.account.role}
                                />
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    logged_in={this.props.logged_in}
                                    setAppState={(s) => this.props.setAppState(s)}
                                />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <Signup
                                    logged_in={this.props.logged_in}
                                    setAppState={(s) => this.props.setAppState(s)}
                                />
                            }
                        />

                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </>
            );
        } else {
            return <Loader text="App is loading"></Loader>;
        }
    }
}
export default Pages;
