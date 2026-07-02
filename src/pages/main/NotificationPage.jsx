import { Component } from 'react';
import './NotificationPage.css';

class NotificationPage extends Component {
    render() {
        const notifications = [
            {
                id: 1,
                title: 'New task assigned',
                message: 'You have been assigned to review the marina safety checklist.',
                time: '5 minutes ago',
                type: 'primary',
                icon: 'bi bi-list-check',
                unread: true,
            },
            {
                id: 2,
                title: 'System update',
                message: 'Scheduled maintenance will occur tonight at 11:00 PM.',
                time: '1 hour ago',
                type: 'warning',
                icon: 'bi bi-exclamation-triangle',
                unread: true,
            },
            {
                id: 3,
                title: 'Welcome',
                message: 'Your account was successfully created. Explore the dashboard to get started.',
                time: 'Yesterday',
                type: 'success',
                icon: 'bi bi-check-circle',
                unread: false,
            },
        ];

        const unreadCount = notifications.filter(
            (item) => item.unread
        ).length;

        return (
            <>
                <div className="uc-header mb-4">
                    <div>
                        <h2>Notifications Center</h2>
                        <p>University of Cebu - Lapu-Lapu and Mandaue</p>
                    </div>

                    <div className="notification-counter">
                        <i className="bi bi-bell-fill"></i>
                        <span>{unreadCount}</span>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="summary-card">
                            <i className="bi bi-bell-fill"></i>

                            <div>
                                <h5>Unread Notifications</h5>
                                <h2>{unreadCount}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card notification-card">
                    <div className="card-header uc-card-header">
                        <h3>Recent Notifications</h3>
                    </div>

                    <div className="card-body p-0">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.unread ? 'unread' : ''
                                    }`}
                            >
                                <div
                                    className={`icon-box bg-${notification.type}`}
                                >
                                    <i className={notification.icon}></i>
                                </div>

                                <div className="notification-content">
                                    <div className="notification-top">
                                        <h5>
                                            {notification.title}

                                            {notification.unread && (
                                                <span className="new-badge">
                                                    NEW
                                                </span>
                                            )}
                                        </h5>

                                        <small>{notification.time}</small>
                                    </div>

                                    <p>{notification.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default NotificationPage;