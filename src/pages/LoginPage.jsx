import { Component } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { setBodyClass } from '../lib/adminlte'
import './LoginPage.css'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showPassword: false,
      error: '',
      isSubmitting: false,
    }
  }

  componentDidMount() {
    setBodyClass('login-page bg-body-secondary')
  }

  componentWillUnmount() {
    setBodyClass('')
  }

  toggleShowPassword = () => {
    this.setState((s) => ({ showPassword: !s.showPassword }))
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value, error: '' })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { email, password } = this.state
    const { onLogin } = this.props

    if (!email.trim() || !password.trim()) {
      this.setState({ error: 'Please enter both email and password.' })
      return
    }

    this.setState({ isSubmitting: true, error: '' })

    try {
      await onLogin({ email: email.trim(), password })
    } catch (err) {
      this.setState({ error: err.message || 'Login failed. Please try again.', isSubmitting: false })
    }
  }

  render() {
    const { isAuthenticated } = this.props
    const { email, password, error, isSubmitting } = this.state

    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />
    }

    return (
      <div className="tor-login-shell">
        <div className="login-box tor-login-box">
          <div className="card card-outline card-primary tor-login-card">
            <div className="card-header tor-login-header">
              <div className="text-center">
                <h1 className="mb-0 tor-login-title">MARINA TOR</h1>
                <div className="tor-wheel-wrap" aria-hidden="true">
                  <img
                    className="tor-wheel"
                    src="https://cdn.postimage.me/2026/07/22/FINALLOGO.png"
                    alt="University of Cebu Marina TOR logo"
                  />
                </div>
                <p className="tor-login-subtitle mb-0">
                  <span className="tor-subtitle-line"></span>
                  <span>UNIVERSITY OF CEBU</span>
                  <span className="tor-subtitle-line"></span>
                </p>
              </div>
            </div>

            <div className="card-body login-card-body tor-login-body">
              <p className="login-box-msg tor-login-msg">Sign in to start your session</p>

              <form onSubmit={this.handleSubmit} className="tor-login-form">
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                <div className="input-group mb-3 tor-input-group">
                  <div className="input-group-text tor-input-icon tor-input-icon-left tor-input-icon-accent">
                    <span className="bi bi-envelope"></span>
                  </div>
                  <div className="form-floating">
                    <input
                      id="loginEmail"
                      name="email"
                      type="email"
                      className="form-control tor-input"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={this.handleChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="loginEmail">Email</label>
                  </div>
                  <div className="input-group-text tor-input-icon tor-input-icon-right">
                    <span className="bi bi-envelope"></span>
                  </div>
                </div>

                <div className="input-group mb-3 tor-input-group">
                  <div className="input-group-text tor-input-icon tor-input-icon-left tor-input-icon-accent">
                    <span className="bi bi-lock"></span>
                  </div>
                  <div className="form-floating">
                    <input
                      id="loginPassword"
                      name="password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      className="form-control tor-input"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={this.handleChange}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="loginPassword">Password</label>
                  </div>
                  <div className="input-group-text tor-input-icon tor-input-icon-right">
                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0 tor-password-toggle"
                      onClick={this.toggleShowPassword}
                      aria-label={this.state.showPassword ? 'Hide password' : 'Show password'}
                      disabled={isSubmitting}
                    >
                      <span className={`bi ${this.state.showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></span>
                    </button>
                  </div>
                </div>

                <div className="row tor-actions-row">
                  <div className="col-12 d-inline-flex align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" disabled={isSubmitting} />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>

                <div className="tor-login-submit-row">
                  <button type="submit" className="btn btn-primary tor-login-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Signing in...'
                    ) : (
                      <>
                        Sign In <span className="bi bi-box-arrow-in-right ms-2" aria-hidden="true"></span>
                      </>
                    )}
                  </button>
                </div>

                <div className="tor-divider" aria-hidden="true">
                  <span className="bi bi-anchor-fill"></span>
                </div>
              </form>

              <p className="text-muted text-center small mt-4 mb-0 tor-demo-credentials">
                Demo: <code>admin@example.com</code> / <code>password123</code>
              </p>
            </div>
          </div>

          <div className="tor-login-meta-links text-center" aria-label="Additional account links">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
