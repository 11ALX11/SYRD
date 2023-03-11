import React from "react";
import "./app.css";
import Pages from "./pages/pages.js";
import Clock from "./components/clock/clock.js";
import Navbar from "./components/navbar/navbar.js";

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
                <header className="fixed-top">
                    <Navbar logged_in={this.state.logged_in} />
                </header>

                <main id="pages" className="container overflow-scroll">
                    <Pages
                        logged_in={this.state.logged_in}
                        handleLoginSubmit={(e) => this.handleLoginSubmit(e)}
                        handleLogoutSubmit={(e) => this.handleLogoutSubmit(e)}
                        handleSignupSubmit={(e) => this.handleSignupSubmit(e)}
                    />
                </main>

                <footer className="container-fluid fixed-bottom bg-dark p-3" data-bs-theme="dark">
                    <p className="mb-1">
                        <copy>SYRD app by Misijuk Aleksey Sergeevich (Group PO-9)</copy>
                    </p>
                    <Clock />
                </footer>
            </>
        );
    }

    handleLoginSubmit(event) {
        //ToDo validation, post request
        if (this.state.logged_in) {
            console.log(this.state.logged_in);
        } else {
            this.setState({ logged_in: true });
        }
        event.preventDefault();
    }

    handleSignupSubmit(event) {
        //ToDo validation, post request
        this.handleLoginSubmit(event);
        event.preventDefault();
    }

    handleLogoutSubmit(event) {
        //ToDo post request
        if (!this.state.logged_in) {
            console.log(this.state.logged_in);
        } else {
            this.setState({ logged_in: false });
        }
        event.preventDefault();
    }
}

export default App;
