import React from "react";
import { NavLink } from "react-router-dom";
import "./app.css";
import Pages from "./components/pages/pages.js";
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
                            <li>
                                <NavLink to="/account">
                                    Account{this.state.logged_in ? " (logout)" : ""}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Pages />
                </main>

                <footer>
                    <Clock />
                </footer>
            </>
        );
    }
}

export default App;
