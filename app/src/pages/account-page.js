import React from "react";
import { Navigate } from "react-router-dom";
import { openModal } from "../components/modal/modal.js";
import { openModalById } from "../components/modal/modal.js";

const HOST = process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            validation_errors: [],
            password: "",
            repeat_password: "",
        };
        this.handleChangePasswordInput = this.handleChangePasswordInput.bind(this);
        this.handleChangeRepeatPasswordInput = this.handleChangeRepeatPasswordInput.bind(this);
    }

    handleChangePasswordInput(event) {
        this.popValidationError("repeat_password");
        this.popValidationError("password_mask");
        this.popValidationError("password_same");
        let err = this.validatePasswordMask(event.target.value);
        this.setState({ password: event.target.value, errors: err });
    }
    handleChangeRepeatPasswordInput(event) {
        this.popValidationError("repeat_password");
        this.popValidationError("repeat_password_mask");
        let err = this.validateRepeatPasswordMask(event.target.value);
        this.setState({ repeat_password: event.target.value, errors: err });
    }

    // validates password
    validatePasswordMask(password) {
        let err = this.state.errors;

        if (password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            if (err.indexOf("password_mask") === -1) err.push("password_mask");
        } else {
            let filtered = err.filter((el) => el !== "password_mask");
            err = filtered;
        }

        return err;
    }

    // validates repeat_password
    validateRepeatPasswordMask(password) {
        let err = this.state.errors;

        if (password.match("^(?=.{4,30}$)[a-zA-Z0-9]+$") === null) {
            if (err.indexOf("repeat_password_mask") === -1) err.push("repeat_password_mask");
        } else {
            let filtered = err.filter((el) => el !== "repeat_password_mask");
            err = filtered;
        }

        return err;
    }

    // Pops validation error (element) from array if present.
    popValidationError(element) {
        let err = this.state.validation_errors;
        let filtered = err.filter((el) => el !== element);

        // if pop does nothing, we dont want to update state
        if (JSON.stringify(filtered) !== JSON.stringify(err)) {
            this.setState({ validation_errors: filtered });
        }
    }

    handleChangeSubmit(data, event) {
        event.preventDefault();

        if (this.props.logged_in && data.errors.length === 0) {
            fetch(HOST + "/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.props.token, // Добавление токена в заголовок Authorization
                },
                body: JSON.stringify({
                    password: data.password,
                    repeat_password: data.repeat_password,
                }),
            })
                .then((response) => response.json())
                .then((_data) => {
                    if (_data.errors && _data.errors.length > 0) {
                        // add errors to state if there any (dont change state if there is no errors)
                        this.setState({ validation_errors: _data.errors });
                    } else {
                        if (_data.status) {
                            // alert of success
                            openModalById("alertSuccess");
                            // clear validation errors and passwords
                            this.setState({ validation_errors: [], password: "", repeat_password: "" });
                        }
                    }
                })
                .catch((error) => {
                    // Обработка ошибки
                    console.error("Failed to change password.", error);
                    openModalById("networkError");
                });
        }
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

                        <h2 className="h3 mt-4 mb-3">Change password:</h2>
                        <form
                            onSubmit={(event) => {
                                let err = [
                                    ...this.validatePasswordMask(this.state.password),
                                    ...this.validateRepeatPasswordMask(this.state.repeat_password),
                                ];
                                this.setState({ errors: err });
                                // validate everything before submiting
                                this.handleChangeSubmit(this.state, event);
                            }}
                        >
                            <div>
                                <label>Password:</label>
                                <input
                                    id="change-password"
                                    className={
                                        "form-control" +
                                        (this.state.validation_errors.includes("password_mask") ||
                                        this.state.validation_errors.includes("password_same") ||
                                        this.state.errors.includes("password_mask")
                                            ? " is-invalid"
                                            : "")
                                    }
                                    name="change-password"
                                    value={this.state.password}
                                    type="password"
                                    onChange={this.handleChangePasswordInput}
                                    required
                                ></input>
                                <div className="invalid-feedback">
                                    {this.state.validation_errors.includes("password_mask") ||
                                    this.state.errors.includes("password_mask")
                                        ? "Password needs to be 4-30 long and consisting of [a-zA-Z0-9._]"
                                        : ""}
                                </div>
                                <div className="invalid-feedback">
                                    {this.state.validation_errors.includes("password_same")
                                        ? "This is the same as the old password."
                                        : ""}
                                </div>
                                <label className="mt-2">Repeat password:</label>
                                <input
                                    id="change-repeat-password"
                                    className={
                                        "form-control" +
                                        (this.state.validation_errors.includes("repeat_password") ||
                                        this.state.validation_errors.includes("repeat_password_mask") ||
                                        this.state.errors.includes("repeat_password_mask")
                                            ? " is-invalid"
                                            : "")
                                    }
                                    name="change-repeat-password"
                                    value={this.state.repeat_password}
                                    type="password"
                                    onChange={this.handleChangeRepeatPasswordInput}
                                    required
                                ></input>
                                <div className="invalid-feedback">
                                    {this.state.validation_errors.includes("repeat_password")
                                        ? "Passwords are mismatching."
                                        : ""}
                                </div>
                                <div className="invalid-feedback">
                                    {this.state.validation_errors.includes("repeat_password_mask") ||
                                    this.state.errors.includes("repeat_password_mask")
                                        ? "Password needs to be 4-30 long and consisting of [a-zA-Z0-9._]"
                                        : ""}
                                </div>
                            </div>
                            <button className="btn btn-danger mt-3">Confirm</button>
                        </form>
                    </div>

                    <button
                        className="btn btn-primary mt-4"
                        data-target="logoutConfirm"
                        onClick={(e) => openModal(e)}
                    >
                        Logout
                    </button>
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
