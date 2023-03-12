import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <h1>Home page</h1>
                <p className="lead">This is a start page!</p>
                <p>
                    You probably want to <Link to="/login">log in</Link> or{" "}
                    <Link to="/signup">sign up</Link> to start working with app.
                </p>
                <p>
                    Use <small className="font-monospace text-muted">user/user</small> or{" "}
                    <small className="font-monospace text-muted">admin/admin</small> to{" "}
                    <Link to="/login">log in</Link> as a tester.
                </p>
            </>
        );
    }
}

export default Home;
