import React from "react";
import { NavLink } from "react-router-dom";
import { openModal } from "../modal/modal.js";
import "./navbar.css";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <nav className="navbar navbar-expand bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink
                        className="navbar-brand d-flex justify-content-center align-items-center"
                        to="/"
                    >
                        <img className="me-1" src="/android-chrome-192x192.png" alt="ReactImg" />
                        <p className="m-0">SYRD app</p>
                    </NavLink>
                    <div className="me-auto navbar-nav-wrapper overflow-hidden">
                        <ul className="navbar-nav flex-row overflow-auto text-nowrap">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            {this.props.role === "ADMIN" && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/accounts/0">
                                        Accounts
                                    </NavLink>
                                </li>
                            )}
                            {this.props.logged_in && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/account">
                                            Account ({this.props.username})
                                        </NavLink>
                                    </li>
                                    <li className="d-flex align-items-center mx-2">
                                        <button
                                            className="btn btn-sm btn-outline-light"
                                            data-target="logoutConfirm"
                                            onClick={(e) => openModal(e)}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            {!this.props.logged_in && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">
                                            Log in
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/signup">
                                            Sign up
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
