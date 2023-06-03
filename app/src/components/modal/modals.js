import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal.js";
import { eraseCookie } from "../../helpers/cookies.js";
import NetworkErrorIcon from "../icons/network-error-icon.js";

class AppModals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="app-modals" data-bs-theme="dark">
                <Modal id="logoutConfirm" dialogClassName="modal-dialog-centered">
                    <ModalHeader>Alert</ModalHeader>
                    <ModalBody>Do you want to logout?</ModalBody>
                    <ModalFooter>
                        <form onSubmit={(e) => this.handleLogoutSubmit(e)} method="post">
                            <button type="submit" className="btn btn-danger focus" data-dismiss="modal">
                                Confirm
                            </button>
                        </form>
                    </ModalFooter>
                </Modal>
                <Modal id="networkError" dialogClassName="modal-dialog-centered">
                    <ModalHeader>
                        <NetworkErrorIcon></NetworkErrorIcon>Network error
                    </ModalHeader>
                    <ModalBody>Please check your Internet connection.</ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
                <Modal id="alertSuccess" dialogClassName="modal-dialog-centered">
                    <ModalHeader>Alert</ModalHeader>
                    <ModalBody>Success!</ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
            </div>
        );
    }

    handleLogoutSubmit(event) {
        event.preventDefault();

        if (this.props.logged_in) {
            // Обработка ответа сервера
            // reset cookie state
            eraseCookie("AccountState");
            // reset app state
            this.props.setAppState({
                logged_in: false,
                loading: false,
                token: "",
                account: {
                    username: "",
                    role: "GUEST",
                    registration_date: "",
                },
            });
        }
    }
}

export default AppModals;
