import { Component } from 'react'

class DashboardPage extends Component {
  render() {
    const { user } = this.props

    const stats = [
      {
        value: '12',
        label: 'Active projects',
        bgClass: 'text-bg-primary',
        iconClass: 'bi bi-kanban',
        footerClass: 'link-light link-underline-opacity-0 link-underline-opacity-50-hover',
      },
      {
        value: '48',
        label: 'Open tasks',
        bgClass: 'text-bg-success',
        iconClass: 'bi bi-list-check',
        footerClass: 'link-light link-underline-opacity-0 link-underline-opacity-50-hover',
      },
      {
        value: '5',
        label: 'Unread messages',
        bgClass: 'text-bg-warning',
        iconClass: 'bi bi-envelope',
        footerClass: 'link-dark link-underline-opacity-0 link-underline-opacity-50-hover',
      },
    ]

    return (
      <>
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-1">Welcome back</h5>
                <p className="card-text text-muted mb-0">
                  Hello, <strong>{user?.name || user?.email}</strong>. You are signed in to Marina
                  Tor App.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {stats.map((stat) => (
            <div key={stat.label} className="col-lg-4 col-md-6 col-12">
              <div className={`small-box ${stat.bgClass}`}>
                <div className="inner">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
                <i className={`small-box-icon ${stat.iconClass}`}></i>
                <a href="#" className={`small-box-footer ${stat.footerClass}`}>
                  More info <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default DashboardPage
