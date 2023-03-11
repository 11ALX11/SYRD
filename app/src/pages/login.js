import React from "react";
import { Navigate, Link } from "react-router-dom";
import { LoginForm } from "../components/forms/forms.js";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.logged_in) {
            return (
                <>
                    <h1>Log in</h1>

                    <LoginForm handleLoginSubmit={this.props.handleLoginSubmit} />

                    <p>
                        Or <Link to="/signup">sign up</Link>.
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <Navigate to="/account" />
                </>
            );
        }
    }
}

export default Login;
