import { Component } from 'react'

class AccountPage extends Component {
  render() {
    const { user } = this.props

    return (
      <div className="row">
        <div className="col-lg-8 col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Profile Information</h3>
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{user?.name || '—'}</dd>

                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{user?.email || '—'}</dd>

                <dt className="col-sm-3">Role</dt>
                <dd className="col-sm-9">
                  <span className="badge text-bg-primary">Administrator</span>
                </dd>

                <dt className="col-sm-3">Status</dt>
                <dd className="col-sm-9">
                  <span className="badge text-bg-success">Active</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-12">
          <div className="card">
            <div className="card-body text-center">
              <span className="user-image rounded-circle shadow bg-primary d-inline-flex align-items-center justify-content-center text-white fw-bold fs-2 mb-3">
                {(user?.name || user?.email || '?').charAt(0).toUpperCase()}
              </span>
              <h5 className="mb-1">{user?.name || 'User'}</h5>
              <p className="text-muted mb-0">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountPage
