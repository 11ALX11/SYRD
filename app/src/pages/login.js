import React from "react";
import { Navigate, Link } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.logged_in) {
            return (
                <>
                    <h1>Log in.</h1>

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
