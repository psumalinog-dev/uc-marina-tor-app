import { Component } from "react";
import ChangePasswordModal from "@/components/account/ChangePasswordModal";
import { changePassword, getStoredUser } from "@/services/authService";

class AccountPage extends Component {

    state = {
        showChangePassword: false,
        loading: false,

        form: {
            username: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    };

    openModal = () => {
        const storedUser = getStoredUser();

        this.setState({
            showChangePassword: true,
            form: {
                username:
                    storedUser?.username ||
                    storedUser?.email ||
                    storedUser?.userName ||
                    "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            }
        });
    };

    closeModal = () => {
        if (this.state.loading) return;

        this.setState({
            showChangePassword: false
        });
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    handleChangePassword = async () => {

        const { form } = this.state;

        if (!form.currentPassword) {
            alert("Current Password is required.");
            return;
        }

        if (!form.newPassword) {
            alert("New Password is required.");
            return;
        }

        if (!form.confirmPassword) {
            alert("Confirm Password is required.");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            alert("New Password and Confirm Password do not match.");
            return;
        }

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordPattern.test(form.newPassword)) {
            alert(
                "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character."
            );
            return;
        }

        this.setState({
            loading: true
        });

        try {

            await changePassword({
                username: form.username,
                currentPassword: form.currentPassword,
                newPassword: form.newPassword
            });

            alert("Password changed successfully.");

            this.setState({
                loading: false,
                showChangePassword: false,
                form: {
                    username: form.username,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }
            });

        } catch (error) {

            this.setState({
                loading: false
            });

            alert(
                error.response?.data?.message ||
                "Failed to change password."
            );
        }
    };

    render() {

        const {
            showChangePassword,
            form,
            loading
        } = this.state;

        const { user } = this.props;

        return (
            <>
                <div className="row">

                    <div className="col-lg-8">

                        <div className="card">

                            <div className="card-header d-flex justify-content-between align-items-center">

                                <h3 className="card-title">
                                    Profile Information
                                </h3>

                                <button
                                    className="btn btn-primary"
                                    onClick={this.openModal}
                                >
                                    <i className="bi bi-key me-2"></i>
                                    Change Password
                                </button>

                            </div>

                            <div className="card-body">

                                <dl className="row">

                                    <dt className="col-sm-3">
                                        Name
                                    </dt>

                                    <dd className="col-sm-9">
                                        {user?.name || "N/A"}
                                    </dd>

                                    <dt className="col-sm-3">
                                        Username
                                    </dt>

                                    <dd className="col-sm-9">
                                        {user?.username || user?.email || user?.userName || "N/A"}
                                    </dd>

                                    <dt className="col-sm-3">
                                        Role
                                    </dt>

                                    <dd className="col-sm-9">
                                        <span className="badge bg-primary">
                                            Administrator
                                        </span>
                                    </dd>

                                    <dt className="col-sm-3">
                                        Status
                                    </dt>

                                    <dd className="col-sm-9">
                                        <span className="badge bg-success">
                                            Active
                                        </span>
                                    </dd>

                                </dl>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="card">

                            <div className="card-body text-center">

                                <div
                                    className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        fontSize: "32px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {(user?.username || user?.email || "?")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <h5>
                                    {user?.name || "User"}
                                </h5>

                                <p className="text-muted">
                                    {user?.username || user?.email || user?.userName}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <ChangePasswordModal
                    show={showChangePassword}
                    form={form}
                    loading={loading}
                    onChange={this.handleChange}
                    onClose={this.closeModal}
                    onSave={this.handleChangePassword}
                />
            </>
        );
    }
}

export default AccountPage;