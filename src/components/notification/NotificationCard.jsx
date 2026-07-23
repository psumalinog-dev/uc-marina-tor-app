import { Component } from "react";
import "./Notification.css";

class NotificationCard extends Component {

    handleClick = () => {
        const { notification, onMarkAsRead } = this.props;

        if (!notification.isRead) {
            onMarkAsRead(notification.notificationId);
        }
    };

    getIcon = () => {
        const { notification } = this.props;

        const title = notification.title.toLowerCase();

        if (title.includes("tor")) {
            return "bi-file-earmark-text-fill";
        }

        if (title.includes("password")) {
            return "bi-shield-lock-fill";
        }

        if (title.includes("account")) {
            return "bi-person-fill";
        }

        return "bi-bell-fill";
    };

    getColor = () => {
        const { notification } = this.props;

        if (notification.isRead) {
            return "bg-success";
        }

        return "bg-primary";
    };

    render() {

        const { notification } = this.props;

        return (

            <div
                className={`notification-item ${!notification.isRead ? "unread" : ""
                    }`}
            >

                <div className={`icon-box ${this.getColor()}`}>

                    <i className={`bi ${this.getIcon()}`}></i>

                </div>

                <div className="notification-content">

                    <div className="notification-top">

                        <div>

                            <h5>

                                {notification.title}

                                {
                                    !notification.isRead && (

                                        <span className="new-badge">
                                            NEW
                                        </span>

                                    )
                                }

                            </h5>

                        </div>

                        <small>

                            <i className="bi bi-clock me-1"></i>

                            {
                                new Date(
                                    notification.createdDate
                                ).toLocaleString()
                            }

                        </small>

                    </div>

                    <p>

                        {notification.message}

                    </p>

                    <div className="d-flex justify-content-end mt-3">

                        {
                            notification.isRead ? (

                                <span className="badge bg-success">

                                    <i className="bi bi-check-circle-fill me-1"></i>

                                    Read

                                </span>

                            ) : (

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={this.handleClick}
                                >

                                    <i className="bi bi-check2-circle me-2"></i>

                                    Mark as Read

                                </button>

                            )
                        }

                    </div>

                </div>

            </div>

        );

    }

}

export default NotificationCard;