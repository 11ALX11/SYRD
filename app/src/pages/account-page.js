import React from "react";
import { Navigate } from "react-router-dom";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.props.handleLogoutSubmit.bind(this);
    }

    render() {
        if (this.props.logged_in) {
            return (
                <>
                    <h1>Account page</h1>
                    <div className="mt-4 mb-4">
                        <h2 className="h3">Account info:</h2>
                        <table className="table table-hover mt-3">
                            <tbody>
                                <tr>
                                    <th className="col-sm-2">Username:</th>
                                    <td>{this.props.account.username}</td>
                                </tr>
                                {this.props.account.role !== "USER" && (
                                    <tr>
                                        <th>Role:</th>
                                        <td>
                                            {this.props.account.role === "ADMIN"
                                                ? "Admin"
                                                : this.props.account.role}
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <th>Registration date:</th>
                                    <td>
                                        {new Date(
                                            this.props.account.registration_date
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <form className="mt-4" onSubmit={this.handleSubmit} method="post">
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
