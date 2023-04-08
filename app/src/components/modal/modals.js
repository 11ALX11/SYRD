import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal.js";
import { eraseCookie } from "../../helpers/cookies.js";

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
            </div>
        );
    }

    handleLogoutSubmit(event) {
        // ToDo post request
        event.preventDefault();

        // post logout here

        if (this.props.logged_in) {
            // reset cookie state
            eraseCookie("AccountState");
            // reset app state
            this.props.setAppState({
                logged_in: false,
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
