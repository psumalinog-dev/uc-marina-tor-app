import { Component } from "react";
import "./ChangePasswordModal.css";

class ChangePasswordModal extends Component {

    state = {
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
    };

    toggleCurrentPassword = () => {
        this.setState(prev => ({
            showCurrentPassword: !prev.showCurrentPassword
        }));
    };

    toggleNewPassword = () => {
        this.setState(prev => ({
            showNewPassword: !prev.showNewPassword
        }));
    };

    toggleConfirmPassword = () => {
        this.setState(prev => ({
            showConfirmPassword: !prev.showConfirmPassword
        }));
    };

    render() {

        const {
            show,
            form,
            onChange,
            onClose,
            onSave,
            loading
        } = this.props;

        if (!show) return null;

        return (
            <div
                className="modal fade show"
                style={{
                    display: "block",
                    background: "rgba(0,0,0,.55)"
                }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content change-password-modal">

                        <div className="modal-header change-password-header">

                            <div>
                                <h4>
                                    <i className="bi bi-shield-lock-fill me-2"></i>
                                    Change Password
                                </h4>

                                <p>
                                    Update your account password securely.
                                </p>
                            </div>

                            <button
                                className="btn-close btn-close-white"
                                onClick={onClose}
                                disabled={loading}
                            ></button>

                        </div>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">
                                    Username
                                </label>

                                <input
                                    className="form-control"
                                    value={form.username}
                                    readOnly
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Current Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={
                                            this.state.showCurrentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control"
                                        name="currentPassword"
                                        value={form.currentPassword}
                                        onChange={onChange}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.toggleCurrentPassword}
                                    >
                                        <i
                                            className={
                                                this.state.showCurrentPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }
                                        ></i>
                                    </button>

                                </div>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    New Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={
                                            this.state.showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control"
                                        name="newPassword"
                                        value={form.newPassword}
                                        onChange={onChange}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.toggleNewPassword}
                                    >
                                        <i
                                            className={
                                                this.state.showNewPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }
                                        ></i>
                                    </button>

                                </div>

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={
                                            this.state.showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={onChange}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.toggleConfirmPassword}
                                    >
                                        <i
                                            className={
                                                this.state.showConfirmPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }
                                        ></i>
                                    </button>

                                </div>

                            </div>

                            <div className="password-guide">

                                <h6>
                                    <i className="bi bi-info-circle-fill me-2"></i>
                                    Password Requirements
                                </h6>

                                <ul>
                                    <li>Minimum of 8 characters</li>
                                    <li>At least one uppercase letter</li>
                                    <li>At least one lowercase letter</li>
                                    <li>At least one number</li>
                                    <li>At least one special character</li>
                                </ul>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-light"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={onSave}
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Saving...
                                            </>
                                        )
                                        : (
                                            <>
                                                <i className="bi bi-check-circle me-2"></i>
                                                Change Password
                                            </>
                                        )
                                }
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePasswordModal;