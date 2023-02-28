import React from "react";
import { Navigate } from "react-router-dom";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                name: "Untitled",
                registration_date: new Date("December 21, 2012"),
            },
        };
    }

    render() {
        if (this.props.logged_in) {
            return (
                <>
                    <h1>Account page</h1>
                    <div>
                        <p>Account info:</p>
                        <p>Name: {this.state.account.name}</p>
                        <p>
                            Registration date: {this.state.account.registration_date.toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <button>Logout</button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Navigate to="/login" />
                </>
            );
        }
    }
}

export default AccountPage;
