import { Component } from "react";
import "./DashboardPage.css";
import { getStudents } from "../../services/studentService";

class DashboardPage extends Component {

    state = {
        statistics: {
            totalStudents: 0,
            totalUsers: 0,
            totalTorRequests: 0,
            releasedTorRequests: 0
        }
    };

    componentDidMount() {
        this.loadDashboard();
    }

    loadDashboard = async () => {
        try {
            const students = await getStudents();

            this.setState({
                statistics: {
                    ...this.state.statistics,
                    totalStudents: students.length
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    };

    render() {

        const { statistics } = this.state;

        return (
            <>
                <div className="dashboard-title mb-4">
                    <h2>Dashboard Overview</h2>
                    <p>Welcome to Marina TOR Management System</p>
                </div>

                <div className="row">

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="stat-card">
                            <div>
                                <h6>Total Students</h6>
                                <h2>{statistics.totalStudents}</h2>
                            </div>

                            <i className="bi bi-people stat-icon"></i>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="stat-card">
                            <div>
                                <h6>Total Staff</h6>
                                <h2>{statistics.totalUsers}</h2>
                            </div>

                            <i className="bi bi-person-badge stat-icon"></i>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="stat-card">
                            <div>
                                <h6>TOR Requests</h6>
                                <h2>{statistics.totalTorRequests}</h2>
                            </div>

                            <i className="bi bi-file-earmark-text stat-icon"></i>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="stat-card">
                            <div>
                                <h6>Released TOR</h6>
                                <h2>{statistics.releasedTorRequests}</h2>
                            </div>

                            <i className="bi bi-check-circle stat-icon"></i>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default DashboardPage;