import React from "react";
import { NavLink } from "react-router-dom";
import "./app.css";
import Pages from "./pages/pages.js";
import Clock from "./components/clock/clock.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
        };
    }

    render() {
        return (
            <>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            {this.state.logged_in && (
                                <li>
                                    <NavLink to="/account">Account</NavLink>
                                </li>
                            )}
                            {!this.state.logged_in && (
                                <>
                                    <li>
                                        <NavLink to="/login">Log in</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup">Sign up</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </header>

                <main>
                    <Pages logged_in={this.state.logged_in} />
                </main>

                <footer>
                    <Clock />
                </footer>
            </>
        );
    }
}

export default App;
