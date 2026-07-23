import { Component } from "react";
import {
    getTorRequests,
    createTorRequest,
    updateTorRequestStatus
} from "@/services/torRequestService";
import { getStudents } from "@/services/studentService";
import "./TorRequestPage.css";

class TorRequestPage extends Component {

    state = {
        requests: [],
        students: [],
        filteredRequests: [],
        loading: false,
        search: "",
        filter: "All",
        showModal: false,

        alert: {
            show: false,
            type: "",
            message: ""
        },

        newRequest: {
            studentId: "",
            purpose: ""
        },

        statistics: {
            total: 0,
            pending: 0,
            processing: 0,
            released: 0
        }
    };

    componentDidMount() {
        this.loadTorRequests();
        this.loadStudents();
    }

    loadTorRequests = async () => {
        this.setState({ loading: true });

        try {
            const requests = await getTorRequests();

            this.setState({
                requests,
                filteredRequests: requests,
                statistics: {
                    total: requests.length,
                    pending: requests.filter(x => x.status === "Pending").length,
                    processing: requests.filter(x => x.status === "Processing").length,
                    released: requests.filter(x => x.status === "Released").length
                }
            });
        } catch (error) {
            console.error(error);
        }

        this.setState({ loading: false });
    };

    loadStudents = async () => {
        try {
            this.setState({
                students: await getStudents()
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleSearch = (e) => {
        const search = e.target.value.toLowerCase();

        this.setState({
            search: e.target.value,
            filteredRequests: this.state.requests.filter(x =>
                x.studentName.toLowerCase().includes(search) ||
                x.purpose.toLowerCase().includes(search)
            )
        });
    };

    handleFilter = (e) => {
        const filter = e.target.value;

        this.setState({
            filter,
            filteredRequests:
                filter === "All"
                    ? this.state.requests
                    : this.state.requests.filter(x => x.status === filter)
        });
    };

    releaseRequest = async ({ torRequestId }) => {
        try {
            await updateTorRequestStatus(torRequestId, {
                torRequestId,
                status: "Released"
            });

            this.loadTorRequests();
        } catch (error) {
            console.error(error);
        }
    };

    openModal = () => this.setState({ showModal: true });

    closeModal = () =>
        this.setState({
            showModal: false,
            newRequest: {
                studentId: "",
                purpose: ""
            }
        });

    handleInput = ({ target: { name, value } }) => {
        this.setState({
            newRequest: {
                ...this.state.newRequest,
                [name]: value
            }
        });
    };

    showAlert = (type, message) => {
        this.setState({
            alert: { show: true, type, message }
        });

        setTimeout(() => {
            this.setState({
                alert: {
                    show: false,
                    type: "",
                    message: ""
                }
            });
        }, 3000);
    };

    saveRequest = async () => {
        try {
            await createTorRequest(this.state.newRequest);

            this.closeModal();
            this.loadTorRequests();

            this.showAlert(
                "success",
                "TOR Request submitted successfully."
            );
        } catch {
            this.showAlert(
                "danger",
                "Unable to submit TOR Request."
            );
        }
    };

    render() {
        const {
            filteredRequests,
            statistics,
            search,
            filter,
            loading
        } = this.state;

        return (
            <div className="tor-page">
                <div className="tor-header">
                    <div>
                        <h2>TOR Requests</h2>
                        <p>Manage and monitor Transcript of Records requests.</p>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={this.openModal}>
                        <i className="bi bi-plus-circle me-2"></i>
                        New Request
                    </button>
                </div>

                <div className="tor-statistics">
                    <div className="stat-card">
                        <span>Total</span>
                        <h3>{statistics.total}</h3>
                    </div>

                    <div className="stat-card pending">
                        <span>Pending</span>
                        <h3>{statistics.pending}</h3>
                    </div>

                    <div className="stat-card processing">
                        <span>Processing</span>
                        <h3>{statistics.processing}</h3>
                    </div>

                    <div className="stat-card released">
                        <span>Released</span>
                        <h3>{statistics.released}</h3>
                    </div>
                </div>

                <div className="tor-toolbar">
                    <div className="search-box">
                        <i className="bi bi-search"></i>

                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={this.handleSearch}
                        />
                    </div>

                    <select
                        className="form-select status-filter"
                        value={filter}
                        onChange={this.handleFilter}
                    >
                        {["All", "Pending", "Processing", "Released"].map(status => (
                            <option key={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {loading && (
                    <div className="loading">
                        Loading...
                    </div>
                )}

                <div className="table-container">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student</th>
                                <th>Purpose</th>
                                <th>Status</th>
                                <th>Requested</th>
                                <th>Released</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No TOR Requests Found
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((request, index) => (
                                    <tr key={request.torRequestId}>
                                        <td>{index + 1}</td>
                                        <td>{request.studentName}</td>
                                        <td>{request.purpose}</td>

                                        <td>
                                            <span className={`status-badge ${request.status.toLowerCase()}`}>
                                                {request.status}
                                            </span>
                                        </td>

                                        <td>
                                            {new Date(request.requestedDate).toLocaleDateString()}
                                        </td>

                                        <td>
                                            {request.releasedDate
                                                ? new Date(request.releasedDate).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td className="text-center">
                                            {request.status === "Released" ? (
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    disabled
                                                >
                                                    Released
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => this.releaseRequest(request)}
                                                >
                                                    Release
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {this.state.showModal && (
                    <div className="modal-overlay">
                        <div className="request-modal">

                            <div className="modal-header">
                                <h5>Create TOR Request</h5>

                                <button
                                    className="btn-close"
                                    onClick={this.closeModal}
                                ></button>
                            </div>

                            <div className="modal-body">

                                <div className="mb-3">
                                    <label className="form-label">Student</label>

                                    <select
                                        className="form-select"
                                        name="studentId"
                                        value={this.state.newRequest.studentId}
                                        onChange={this.handleInput}
                                    >
                                        <option value="">Select Student</option>

                                        {this.state.students.map(student => (
                                            <option
                                                key={student.studentId}
                                                value={student.studentId}
                                            >
                                                {student.lastName}, {student.firstName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Purpose</label>

                                    <select
                                        className="form-select"
                                        name="purpose"
                                        value={this.state.newRequest.purpose}
                                        onChange={this.handleInput}
                                    >
                                        {[
                                            "",
                                            "Employment",
                                            "Board Examination",
                                            "Scholarship",
                                            "Transfer",
                                            "Visa Application",
                                            "Personal Copy",
                                            "Others"
                                        ].map(item => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item || "Select Purpose"}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {this.state.newRequest.purpose === "Others" && (
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Specify Purpose
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="purpose"
                                            placeholder="Enter purpose..."
                                            onChange={this.handleInput}
                                        />
                                    </div>
                                )}

                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.closeModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={this.saveRequest}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        );
    }
}

export default TorRequestPage;