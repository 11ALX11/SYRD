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
        this.handleSubmit = this.props.handleLogoutSubmit.bind(this);
    }

    render() {
        if (this.props.logged_in) {
            return (
                <>
                    <h1>Account page</h1>
                    <div className="mt-4 mb-4">
                        <h2 className="h3">Account info:</h2>
                        <table className="table mt-3">
                            <tr>
                                <th className="col-sm-2">Name:</th>
                                <td>{this.state.account.name}</td>
                            </tr>
                            <tr>
                                <th>Registration date:</th>
                                <td>{this.state.account.registration_date.toLocaleDateString()}</td>
                            </tr>
                        </table>
                    </div>
                    <form className="mt-4" onSubmit={this.handleSubmit}>
                        <button className="btn btn-primary" type="submit">
                            Logout
                        </button>
                    </form>
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
