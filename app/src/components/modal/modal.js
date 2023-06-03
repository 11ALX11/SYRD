import "./modal.css";

function Modal({ children, id, dialogClassName }) {
    return (
        <div
            id={id ? id : null}
            className="modal fade"
            tabIndex="-1"
            aria-hidden="true"
            data-dismiss="modal"
            onClick={(e) => dismissModal(e)}
        >
            <div className={"modal-dialog" + (dialogClassName ? " " + dialogClassName : "")}>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
}

function ModalHeader({ children }) {
    return (
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
                {children}
            </h1>
            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
    );
}

function ModalBody({ children }) {
    return <div className="modal-body">{children}</div>;
}

function ModalFooter({ children }) {
    return (
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
            </button>
            {children}
        </div>
    );
}

function openModal(event) {
    if (event.target.attributes["data-target"] !== undefined) {
        let el = document.getElementById(event.target.attributes["data-target"].value);
        if (el !== null) {
            el.classList.add("show");
            let focusEl = [...el.getElementsByClassName("focus")];
            if (focusEl[0] !== undefined) focusEl[0].focus();
        }
    }
}

function openModalById(id) {
    let el = document.getElementById(id);
    if (el !== null) {
        el.classList.add("show");
        let focusEl = [...el.getElementsByClassName("focus")];
        if (focusEl[0] !== undefined) focusEl[0].focus();
        else el.getElementsByClassName("btn")[0].focus();
    }
}

function dismissModal(event) {
    if (event.target.attributes["data-dismiss"] !== undefined) {
        let el = event.target.closest("." + event.target.attributes["data-dismiss"].value);
        if (el !== null) {
            el.classList.remove("show");
        }
        let focusEl = [...el.getElementsByClassName("focus")];
        if (focusEl[0] !== undefined) focusEl[0].focus();
        else el.getElementsByClassName("btn")[0].focus();
    }
}

export { Modal, ModalHeader, ModalBody, ModalFooter, openModal, openModalById, dismissModal };
