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

                    <LoginForm
                        validation_errors={this.props.validation_errors}
                        popValidationError={(el) => this.props.popValidationError(el)}
                        handleLoginSubmit={(d, e) => this.props.handleLoginSubmit(d, e)}
                    />

                    <p>
                        If you don't have an account already created, you can{" "}
                        <Link to="/signup">sign up</Link>.
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
