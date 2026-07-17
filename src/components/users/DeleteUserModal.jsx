import { Component } from "react";

class DeleteUserModal extends Component {
    render() {
        const { show, user, onClose, onDelete } = this.props;

        if (!show) return null;

        return (
            <div
                className="modal fade show"
                style={{
                    display: "block",
                    background: "rgba(15,23,42,.45)",
                    backdropFilter: "blur(4px)"
                }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-body text-center p-5">

                            <div className="delete-icon">
                                <i className="bi bi-trash"></i>
                            </div>

                            <h4 className="mt-4 mb-2">
                                Delete User?
                            </h4>

                            <p className="text-muted">
                                Are you sure you want to delete
                                <br />
                                <strong>
                                    {user ? `${user.firstName} ${user.lastName}` : ""}
                                </strong>
                            </p>

                            <p className="text-danger">
                                This action cannot be undone.
                            </p>

                        </div>

                        <div className="modal-footer justify-content-center">

                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={onDelete}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Delete
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteUserModal;