import { Component } from "react";
import {
    getNotifications,
    markAsRead,
} from "@/services/notificationService";
import { getStoredUser } from "@/services/authService";
import NotificationCard from "@/components/notification/NotificationCard";
import "@/components/notification/Notification.css";

class NotificationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            loading: true,
            user: getStoredUser(),
        };
    }

    componentDidMount() {
        this.loadNotifications();

        this.interval = setInterval(() => {
            this.loadNotifications();
        }, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadNotifications = async () => {
        try {
            const { user } = this.state;

            if (!user) {
                this.setState({
                    notifications: [],
                    loading: false,
                });

                return;
            }

            const notifications = await getNotifications(user.userId);

            this.setState({
                notifications,
                loading: false,
            });
        } catch (error) {
            console.error(error);

            this.setState({
                loading: false,
            });
        }
    };

    handleMarkAsRead = async (notificationId) => {
        try {
            await markAsRead(notificationId);

            this.setState((prevState) => ({
                notifications: prevState.notifications.map((notification) =>
                    notification.notificationId === notificationId
                        ? {
                            ...notification,
                            isRead: true,
                        }
                        : notification
                ),
            }));
        } catch (error) {
            console.error(error);
            alert("Unable to mark notification as read.");
        }
    };

    getUnreadCount = () => {
        return this.state.notifications.filter(
            (notification) => !notification.isRead
        ).length;
    };

    formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    render() {
        const { notifications, loading } = this.state;
        const unreadCount = this.getUnreadCount();

        return (
            <div className="container-fluid py-4">

                <div className="uc-header">

                    <div>

                        <h2>
                            <i className="bi bi-bell-fill me-2"></i>
                            Notifications
                        </h2>

                        <p>
                            View your latest announcements, updates, and system activities.
                        </p>

                    </div>

                    <div className="notification-counter">

                        <span>{unreadCount}</span>

                        <small>Unread</small>

                    </div>

                </div>

                <div className="row mb-4">

                    <div className="col-lg-4 mb-3">

                        <div className="summary-card">

                            <i className="bi bi-envelope-paper-fill"></i>

                            <div>

                                <h5>Total Notifications</h5>

                                <h2>{notifications.length}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 mb-3">

                        <div className="summary-card">

                            <i className="bi bi-bell-fill"></i>

                            <div>

                                <h5>Unread</h5>

                                <h2>{unreadCount}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 mb-3">

                        <div className="summary-card d-flex justify-content-between">

                            <div>

                                <h5>Refresh Notifications</h5>

                                <small className="text-muted">
                                    Last updated automatically every 30 seconds
                                </small>

                            </div>

                            <button
                                className="btn btn-primary notification-refresh"
                                onClick={this.loadNotifications}
                            >
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Refresh
                            </button>

                        </div>

                    </div>

                </div>

                <div className="notification-card">

                    <div className="uc-card-header">

                        <h3>

                            <i className="bi bi-list-ul me-2"></i>

                            Notification List

                        </h3>

                    </div>

                    {loading && (

                        <div className="notification-loading">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                        </div>

                    )}

                    {!loading && notifications.length === 0 && (

                        <div className="notification-empty">

                            <i
                                className="bi bi-bell-slash"
                                style={{
                                    fontSize: "60px",
                                    color: "#003DA5",
                                }}
                            ></i>

                            <h4 className="mt-4">

                                No Notifications Yet

                            </h4>

                            <p className="text-muted">

                                You're all caught up.
                                New notifications will appear here.

                            </p>

                        </div>

                    )}

                    {!loading &&
                        notifications.length > 0 &&
                        notifications.map((notification) => (

                            <NotificationCard
                                key={notification.notificationId}
                                notification={notification}
                                onMarkAsRead={this.handleMarkAsRead}
                            />

                        ))}

                </div>

            </div>
        );
    }
}

export default NotificationPage;