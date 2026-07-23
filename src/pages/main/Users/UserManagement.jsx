import { Component } from "react";
import { getUsers, updateUser, deleteUser } from "@/services/userService";
import { register } from "@/services/authService";

import UserTable from "@/components/users/UserTable";
import UserFormModal from "@/components/users/UserFormModal";
import DeleteUserModal from "@/components/users/DeleteUserModal";
import SearchUser from "@/components/users/SearchUser";

import "./UserManagement.css";

class UserManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            filteredUsers: [],
            loading: true,
            search: "",
            showForm: false,
            showDelete: false,
            editing: false,
            selectedUser: null,
            form: {
                userId: 0,
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                role: "Staff"
            }
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = async () => {
        this.setState({ loading: true });

        try {
            const users = await getUsers();

            this.setState({
                users,
                filteredUsers: users,
                loading: false
            });
        } catch (error) {
            this.setState({ loading: false });
            alert(error.response?.data?.message || "Unable to load users.");
        }
    };

    handleSearch = (value) => {
        const keyword = value.toLowerCase();

        const filtered = this.state.users.filter(user =>
            user.firstName.toLowerCase().includes(keyword) ||
            user.lastName.toLowerCase().includes(keyword) ||
            user.username.toLowerCase().includes(keyword)
        );

        this.setState({
            search: value,
            filteredUsers: filtered
        });
    };

    openAddModal = () => {
        this.setState({
            editing: false,
            showForm: true,
            form: {
                userId: 0,
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                role: "Staff"
            }
        });
    };

    openEditModal = (user) => {
        this.setState({
            editing: true,
            showForm: true,
            form: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: "",
                role: user.role
            }
        });
    };

    closeForm = () => {
        this.setState({ showForm: false });
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState(prev => ({
            form: {
                ...prev.form,
                [name]: value
            }
        }));
    };

    saveUser = async () => {
        const { editing, form } = this.state;

        try {
            if (editing) {
                await updateUser(form.userId, {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    username: form.username,
                    role: form.role
                });
            } else {
                await register({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    username: form.username,
                    password: form.password,
                    role: form.role
                });
            }

            this.closeForm();
            this.loadUsers();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to save user.");
        }
    };

    openDelete = (user) => {
        this.setState({
            showDelete: true,
            selectedUser: user
        });
    };

    closeDelete = () => {
        this.setState({
            showDelete: false,
            selectedUser: null
        });
    };

    confirmDelete = async () => {
        const { selectedUser } = this.state;

        try {
            await deleteUser(selectedUser.userId);

            this.closeDelete();
            this.loadUsers();
        } catch (error) {
            alert(error.response?.data?.message || "Unable to delete user.");
        }
    };

    render() {
        const {
            filteredUsers,
            loading,
            search,
            showForm,
            showDelete,
            editing,
            form,
            selectedUser
        } = this.state;

        return (
            <div className="user-management-page">

                <div className="user-management-card">

                    <div className="user-header">

                        <div>
                            <h3>
                                <i className="bi bi-people-fill me-2"></i>
                                User Management
                            </h3>

                            <p>
                                Manage administrator and staff accounts.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary add-user-btn"
                            onClick={this.openAddModal}
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Add User
                        </button>

                    </div>

                    <div className="search-user">
                        <SearchUser
                            value={search}
                            onChange={this.handleSearch}
                        />
                    </div>

                    <UserTable
                        loading={loading}
                        users={filteredUsers}
                        onEdit={this.openEditModal}
                        onDelete={this.openDelete}
                    />

                </div>

                <UserFormModal
                    show={showForm}
                    editing={editing}
                    form={form}
                    onClose={this.closeForm}
                    onChange={this.handleChange}
                    onSave={this.saveUser}
                />

                <DeleteUserModal
                    show={showDelete}
                    user={selectedUser}
                    onClose={this.closeDelete}
                    onDelete={this.confirmDelete}
                />

            </div>
        );
    }
}

export default UserManagement;