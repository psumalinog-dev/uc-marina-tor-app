import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { setBodyClass } from '../lib/adminlte'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
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

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value, error: '' })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { username, password } = this.state
        const { onLogin } = this.props

        if (!username.trim() || !password.trim()) {
            this.setState({ error: 'Please enter both username and password.' })
            return
        }

        this.setState({ isSubmitting: true, error: '' })

        try {
            await onLogin({ username: username.trim(), password })
        } catch (err) {
            this.setState({
                error: err.message || 'Login failed. Please try again.',
                isSubmitting: false,
            })
        }
    }

    render() {
        const { isAuthenticated } = this.props
        const { username, password, error, isSubmitting } = this.state

        if (isAuthenticated) {
            return <Navigate to="/dashboard" replace />
        }

        return (
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <div className="text-center">
                            <h1 className="mb-0">
                                <b>Marina</b> TOR
                            </h1>
                        </div>
                    </div>
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={this.handleSubmit}>
                            {error && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input
                                        id="loginUsername"
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        autoComplete="username"
                                        value={username}
                                        onChange={this.handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor="loginUsername">Username</label>
                                </div>
                                <div className="input-group-text">
                                    <span className="bi bi-person-fill"></span>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input
                                        id="loginPassword"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={this.handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor="loginPassword">Password</label>
                                </div>
                                <div className="input-group-text">
                                    <span className="bi bi-lock-fill"></span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8 d-inline-flex align-items-center">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="rememberMe"
                                            disabled={isSubmitting}
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {isSubmitting ? 'Signing in…' : 'Sign In'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <p className="text-muted text-center small mt-4 mb-0">
                            Demo: <code>admin@example.com</code> / <code>password123</code>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage