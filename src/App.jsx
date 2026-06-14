import { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainLayoutPage from './pages/main/MainLayoutPage'
import DashboardPage from './pages/main/DashboardPage'
import AccountPage from './pages/main/AccountPage'
import NotificationPage from './pages/main/NotificationPage'
import { getStoredUser, login, logout } from './services/authService'

class App extends Component {
  constructor(props) {
    super(props)
    const user = getStoredUser()

    this.state = {
      user,
      isAuthenticated: Boolean(user),
    }
  }

  handleLogin = async (credentials) => {
    const user = await login(credentials)
    this.setState({ user, isAuthenticated: true })
    return user
  }

  handleLogout = () => {
    logout()
    this.setState({ user: null, isAuthenticated: false })
  }

  renderMainPage = (PageComponent) => {
    const { user } = this.state
    return <PageComponent user={user} />
  }

  render() {
    const { user, isAuthenticated } = this.state
    const mainLayout = (
      <MainLayoutPage
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={this.handleLogout}
      />
    )

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage isAuthenticated={isAuthenticated} onLogin={this.handleLogin} />
            }
          />

          <Route element={mainLayout}>
            <Route path="/dashboard" element={this.renderMainPage(DashboardPage)} />
            <Route path="/account" element={this.renderMainPage(AccountPage)} />
            <Route path="/notifications" element={this.renderMainPage(NotificationPage)} />
          </Route>

          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
