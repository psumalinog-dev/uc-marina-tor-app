import { Component } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../services/authService'
import { setBodyClass } from '../lib/adminlte'
import './LoginPage.css'

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', message: '', isSubmitting: false, token: null, error: '' }
  }

  componentDidMount() {
    setBodyClass('login-page bg-body-secondary')
  }

  componentWillUnmount() {
    setBodyClass('')
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
      <div className="tor-login-shell">
        <div className="login-box tor-login-box">
          <div className="card card-outline card-primary tor-login-card">
            <div className="card-header tor-login-header tor-login-header-compact text-center">
              <h1 className="mb-0 tor-login-title">Marina TOR</h1>
            </div>
            <div className="card-body login-card-body tor-login-body">
              <p className="login-box-msg tor-login-msg">Enter your email to reset your password</p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={this.handleSubmit} className="tor-login-form">
                <div className="input-group mb-3 tor-input-group">
                  <div className="form-floating">
                    <input
                      id="fpEmail"
                      name="email"
                      type="email"
                      className="form-control tor-input"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="fpEmail">Email</label>
                  </div>
                  <div className="input-group-text tor-input-icon tor-input-icon-right">
                    <span className="bi bi-envelope"></span>
                  </div>
                </div>

                <div className="d-grid tor-login-submit-row">
                  <button className="btn btn-primary tor-login-submit" disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Sending…' : 'Send reset link'}
                  </button>
                </div>

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
              </form>

              <p className="text-center mt-3 mb-0">
                <Link className="tor-forgot-link" to="/login">
                  Back to sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPasswordPage
