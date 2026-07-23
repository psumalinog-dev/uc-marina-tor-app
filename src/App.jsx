<<<<<<< Updated upstream
import { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPassword'
import MainLayoutPage from './pages/main/MainLayoutPage'
import DashboardPage from './pages/main/DashboardPage'
import AccountPage from './pages/main/AccountPage'
import NotificationPage from './pages/main/NotificationPage'
import MarinaTOR from './pages/main/MarinaTOR'

import { getStoredUser, login, logout } from './services/authService'
=======
import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";

import MainLayoutPage from "@/pages/main/MainLayoutPage";

import DashboardPage from "@/pages/main/Dashboard/DashboardPage";
import AccountPage from "@/pages/main/Account/AccountPage";
import NotificationPage from "@/pages/main/Notifications/NotificationPage";
import StudentManagement from "@/pages/main/Students/StudentManagement";
import UserManagement from "@/pages/main/Users/UserManagement";
import MarinaTOR from "@/pages/main/MarinaTOR/MarinaTOR";
import TorRequestPage from "@/pages/main/TorRequest/TorRequestPage";
import AuditTrailPage from "@/pages/main/AuditTrail/AuditTrailPage";

import { getStoredUser, login, logout } from "@/services/authService";
>>>>>>> Stashed changes

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

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route element={mainLayout}>
            <Route path="/dashboard" element={this.renderMainPage(DashboardPage)} />
            <Route path="/account" element={this.renderMainPage(AccountPage)} />
            <Route path="/notifications" element={this.renderMainPage(NotificationPage)} />
            <Route path="/marina-tor" element={this.renderMainPage(MarinaTOR)} />
          </Route>

<<<<<<< Updated upstream
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
=======
    render() {
        const { user, isAuthenticated } = this.state;

        const mainLayout = (
            <MainLayoutPage
                user={user}
                isAuthenticated={isAuthenticated}
                onLogout={this.handleLogout}
            />
        );

        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                                isAuthenticated={isAuthenticated}
                                onLogin={this.handleLogin}
                            />
                        }
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />

                    <Route
                        path="/reset-password"
                        element={<ResetPasswordPage />}
                    />

                    <Route element={mainLayout}>
                        <Route
                            path="/dashboard"
                            element={this.renderMainPage(DashboardPage)}
                        />

                        <Route
                            path="/account"
                            element={this.renderMainPage(AccountPage)}
                        />

                        <Route
                            path="/notifications"
                            element={this.renderMainPage(NotificationPage)}
                        />
                        <Route
                            path="/audit-trail"
                            element={
                                isAuthenticated
                                    ? this.renderMainPage(AuditTrailPage)
                                    : <Navigate to="/login" replace />
                            }
                        />

                        <Route
                            path="/students"
                            element={
                                isAuthenticated
                                    ? this.renderMainPage(StudentManagement)
                                    : <Navigate to="/login" replace />
                            }
                        />

                        <Route
                            path="/users"
                            element={
                                isAuthenticated
                                    ? this.renderMainPage(UserManagement)
                                    : <Navigate to="/login" replace />
                            }
                        />

                        <Route
                            path="/marina-tor"
                            element={this.renderMainPage(MarinaTOR)}
                        />
                        <Route
                            path="/tor-requests"
                            element={
                                isAuthenticated
                                    ? this.renderMainPage(TorRequestPage)
                                    : <Navigate to="/login" replace />
                            }
                        />
                    </Route>
                  
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to={isAuthenticated ? "/dashboard" : "/login"}
                                replace
                            />
                        }
                    />

                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </BrowserRouter>
        );
    }
>>>>>>> Stashed changes
}

export default App