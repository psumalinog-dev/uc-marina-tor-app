import { Component } from "react";

class UserTable extends Component {
    render() {
        const { users, loading, onEdit, onDelete } = this.props;

        if (loading) {
            return (
                <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="mt-3 text-muted">
                        Loading users...
                    </p>
                </div>
            );
        }

        return (
            <div className="table-responsive">

                <table className="table align-middle">

                    <thead>

                        <tr>

                            <th width="70">ID</th>

                            <th>First Name</th>

                            <th>Last Name</th>

                            <th>Username</th>

                            <th width="120">Role</th>

                            <th width="150" className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.length === 0 && (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-5"
                                >

                                    <i
                                        className="bi bi-people"
                                        style={{
                                            fontSize: "55px",
                                            color: "#cbd5e1"
                                        }}
                                    ></i>

                                    <h5 className="mt-3 mb-1">
                                        No Users Found
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Click "Add User" to create one.
                                    </p>

                                </td>

                            </tr>

                        )}

                        {users.map(user => (

                            <tr key={user.userId}>

                                <td>
                                    <strong>#{user.userId}</strong>
                                </td>

                                <td>{user.firstName}</td>

                                <td>{user.lastName}</td>

                                <td>{user.username}</td>

                                <td>

                                    <span
                                        className={
                                            user.role === "Admin"
                                                ? "badge badge-admin"
                                                : "badge badge-staff"
                                        }
                                    >
                                        {user.role}
                                    </span>

                                </td>

                                <td className="text-center">

                                    <button
                                        className="btn-action btn-edit"
                                        title="Edit User"
                                        onClick={() => onEdit(user)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        className="btn-action btn-delete"
                                        title="Delete User"
                                        onClick={() => onDelete(user)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        );
    }
}

export default UserTable;