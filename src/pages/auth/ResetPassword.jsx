import { Component } from 'react'
import { Link } from 'react-router-dom'
import { verifyResetToken, resetPassword } from "../../services/authService";

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props)
    const params = new URLSearchParams(window.location.search)
    this.token = params.get('token')
    this.state = { valid: null, email: '', password: '', confirm: '', isSubmitting: false, error: '', message: '' }
  }

  async componentDidMount() {
    if (!this.token) return this.setState({ valid: false })
    const res = await verifyResetToken(this.token)
    this.setState({ valid: res.valid, email: res.email || '' })
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, error: '', message: '' })

  handleSubmit = async (e) => {
    e.preventDefault()
    const { password, confirm } = this.state
    if (!password) return this.setState({ error: 'Please enter a new password.' })
    if (password !== confirm) return this.setState({ error: 'Passwords do not match.' })

    this.setState({ isSubmitting: true })
    try {
      await resetPassword(this.token, password)
      this.setState({ message: 'Password updated. You can now sign in.', isSubmitting: false })
    } catch (err) {
      this.setState({ error: err.message || 'Failed to reset password', isSubmitting: false })
    }
  }

  render() {
    const { valid, email, password, confirm, isSubmitting, error, message } = this.state
    if (valid === null) return null
    if (!valid) {
      return (
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-body login-card-body text-center">
              <p className="text-danger">Invalid or expired reset link.</p>
              <p>
                <Link to="/forgot-password">Request a new reset link</Link>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h1 className="mb-0"><b>Marina</b> TOR</h1>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">Reset password for <strong>{email}</strong></p>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <div className="form-floating">
                  <input
                    id="rpPassword"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="New password"
                    value={password}
                    onChange={this.handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="rpPassword">New password</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-lock-fill"></span>
                </div>
              </div>

              <div className="input-group mb-3">
                <div className="form-floating">
                  <input
                    id="rpConfirm"
                    name="confirm"
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={this.handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="rpConfirm">Confirm password</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-lock-fill"></span>
                </div>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'Updating…' : 'Update password'}
                </button>
              </div>
            </form>

            <p className="text-center mt-3">
              <Link to="/login">Back to sign in</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ResetPasswordPage
