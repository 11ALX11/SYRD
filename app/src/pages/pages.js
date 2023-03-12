import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home.js";
import AccountPage from "./account-page.js";
import Login from "./login.js";
import Signup from "./signup.js";
import Error404 from "./error404.js";

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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
                                handleLogoutSubmit={(e) => this.props.handleLogoutSubmit(e)}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                logged_in={this.props.logged_in}
                                validation_errors={this.props.validation_errors}
                                popValidationError={(el) => this.props.popValidationError(el)}
                                handleLoginSubmit={(d, e) => this.props.handleLoginSubmit(d, e)}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Signup
                                logged_in={this.props.logged_in}
                                validation_errors={this.props.validation_errors}
                                popValidationError={(el) => this.props.popValidationError(el)}
                                handleSignupSubmit={(d, e) => this.props.handleSignupSubmit(d, e)}
                            />
                        }
                    />

                    <Route path="*" element={<Error404 />} />
                </Routes>
            </>
        );
    }
}
export default Pages;
