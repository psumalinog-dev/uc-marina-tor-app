import { Component } from "react";

class UserFormModal extends Component {
    render() {
        const { show, editing, form, onChange, onClose, onSave } = this.props;

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
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className={`bi ${editing ? "bi-pencil-square" : "bi-person-plus"} me-2`}></i>
                                {editing ? "Edit User" : "Create New User"}
                            </h5>

                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={onChange}
                                    />
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={form.username}
                                        onChange={onChange}
                                    />
                                </div>

                                {!editing && (
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={form.password}
                                            onChange={onChange}
                                        />
                                    </div>
                                )}

                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Role</label>
                                    <select
                                        className="form-select"
                                        name="role"
                                        value={form.role}
                                        onChange={onChange}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Staff">Staff</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>

                            <button className="btn btn-primary" onClick={onSave}>
                                <i className={`bi ${editing ? "bi-check-circle" : "bi-plus-circle"} me-2`}></i>
                                {editing ? "Update User" : "Create User"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UserFormModal;