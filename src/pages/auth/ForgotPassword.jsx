import { Component } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from "../../services/authService";

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', message: '', isSubmitting: false, token: null, error: '' }
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value, message: '', error: '' })

  handleSubmit = async (e) => {
    e.preventDefault()
    const { email } = this.state
    if (!email.trim()) return this.setState({ error: 'Please enter your email.' })

    this.setState({ isSubmitting: true, error: '', message: '' })
    try {
      await requestPasswordReset(email.trim())
      this.setState({ message: 'If an account exists for that email, a reset link was sent.', isSubmitting: false })
    } catch (err) {
      this.setState({ error: err.message || 'Failed to request reset', isSubmitting: false })
    }
  }

  render() {
    const { email, message, token, isSubmitting, error } = this.state
    return (
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h1 className="mb-0"><b>Marina</b> TOR</h1>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">Enter your email to reset your password</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <div className="form-floating">
                  <input
                    id="fpEmail"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="fpEmail">Email</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-envelope"></span>
                </div>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" disabled={isSubmitting} type="submit">
                  {isSubmitting ? 'Sending…' : 'Send reset link'}
                </button>
              </div>
            </form>

            {message && (
              <div className="mt-3">
                <p className="small text-muted">{message}</p>
                {token && (
                  <p>
                    <a href={token}>{token}</a>
                  </p>
                )}
              </div>
            )}

            <p className="text-center mt-3">
              <Link to="/login">Back to sign in</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPasswordPage
