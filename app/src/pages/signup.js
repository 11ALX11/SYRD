import React from "react";
import { Navigate, Link } from "react-router-dom";
import { SignupForm } from "../components/forms/forms.js";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.logged_in) {
            return (
                <>
                    <h1>Sign up</h1>

                    <SignupForm />

                    <p>
                        Or <Link to="/login">log in</Link>.
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

export default Signup;
