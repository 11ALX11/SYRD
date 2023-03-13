import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal.js";

function AppModals(props) {
    return (
        <div className="app-modals" data-bs-theme="dark">
            <Modal id="logoutConfirm" dialogClassName="modal-dialog-centered">
                <ModalHeader>Alert</ModalHeader>
                <ModalBody>Do you want to logout?</ModalBody>
                <ModalFooter>
                    <form onSubmit={(e) => props.handleLogoutSubmit(e)} method="post">
                        <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">
                            Confirm
                        </button>
                    </form>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AppModals;
