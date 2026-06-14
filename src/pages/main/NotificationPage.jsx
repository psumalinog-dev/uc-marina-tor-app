import { Component } from 'react'

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
    ]

    const unreadCount = notifications.filter((item) => item.unread).length

    return (
      <>
        <div className="row mb-4">
          <div className="col-12">
            <div className="info-box">
              <span className="info-box-icon text-bg-info">
                <i className="bi bi-bell"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Unread notifications</span>
                <span className="info-box-number">{unreadCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Notifications</h3>
          </div>
          <ul className="list-group list-group-flush">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`list-group-item ${notification.unread ? 'list-group-item-light' : ''}`}
              >
                <div className="d-flex align-items-start gap-3">
                  <span
                    className={`badge text-bg-${notification.type} rounded-pill p-2 d-inline-flex align-items-center justify-content-center`}
                  >
                    <i className={notification.icon}></i>
                  </span>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <h6 className="mb-1">
                        {notification.title}
                        {notification.unread && (
                          <span className="badge text-bg-danger ms-2">New</span>
                        )}
                      </h6>
                      <small className="text-muted text-nowrap">{notification.time}</small>
                    </div>
                    <p className="mb-0 text-muted">{notification.message}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default NotificationPage
