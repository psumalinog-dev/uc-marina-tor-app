import { Component } from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import { getDashboardStatistics } from "@/services/dashboardService";

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
            const statistics = await getDashboardStatistics();

            this.setState({
                statistics: {
                    totalStudents: statistics.totalStudents,
                    totalUsers: statistics.totalStaff,
                    totalTorRequests: statistics.totalTorRequests,
                    releasedTorRequests: statistics.totalReleasedTor
                }
            });

        } catch (error) {
            console.error("Dashboard Error:", error);
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
                        <Link to="/students" className="stat-card-link">
                            <div className="stat-card">
                                <div>
                                    <h6>Total Students</h6>
                                    <h2>{statistics.totalStudents}</h2>
                                </div>

                                <i className="bi bi-people stat-icon"></i>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <Link to="/users" className="stat-card-link">
                            <div className="stat-card">
                                <div>
                                    <h6>Total Staff</h6>
                                    <h2>{statistics.totalUsers}</h2>
                                </div>

                                <i className="bi bi-person-badge stat-icon"></i>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <Link to="/tor-requests" className="stat-card-link">
                            <div className="stat-card">
                                <div>
                                    <h6>TOR Requests</h6>
                                    <h2>{statistics.totalTorRequests}</h2>
                                </div>

                                <i className="bi bi-file-earmark-text stat-icon"></i>
                            </div>
                        </Link>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <Link to="/tor-requests" className="stat-card-link">
                            <div className="stat-card">
                                <div>
                                    <h6>Released TOR</h6>
                                    <h2>{statistics.releasedTorRequests}</h2>
                                </div>

                                <i className="bi bi-check-circle stat-icon"></i>
                            </div>
                        </Link>
                    </div>

                </div>
            </>
        );
    }
}

export default DashboardPage;