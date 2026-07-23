import { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
<<<<<<< Updated upstream
  destroySidebarScrollbars,
  initColorModeToggle,
  initSidebarScrollbars,
  setBodyClass,
} from '../../lib/adminlte'
import { getMainPageMeta, MAIN_NAV_ITEMS } from '../../pages/main/mainRoutes'

class AdminLayout extends Component {
  componentDidMount() {
    setBodyClass('layout-fixed sidebar-expand-lg bg-body-tertiary')
    initSidebarScrollbars()
    initColorModeToggle()
  }
=======
    destroySidebarScrollbars,
    initColorModeToggle,
    initSidebarScrollbars,
    setBodyClass,
} from "@/lib/adminlte";

import {
    getMainPageMeta,
    MAIN_NAV_ITEMS,
} from "@/pages/main/mainRoutes";

import NotificationBadge from "@/components/notification/NotificationBadge";
import { getStoredUser } from "@/services/authService";

class AdminLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: getStoredUser(),
        };
    }

    componentDidMount() {
        setBodyClass("layout-fixed sidebar-expand-lg");
        initSidebarScrollbars();
        initColorModeToggle();
    }
>>>>>>> Stashed changes

  componentDidUpdate() {
    initSidebarScrollbars()
  }

  componentWillUnmount() {
    destroySidebarScrollbars()
    setBodyClass('')
  }

  handleLogoutClick = (event) => {
    event.preventDefault()
    this.props.onLogout()
  }

  render() {
    const { user, children, location } = this.props
    const { title, breadcrumb } = getMainPageMeta(location)

<<<<<<< Updated upstream
    return (
      <div className="app-wrapper">
        <nav className="app-header navbar navbar-expand bg-body">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button">
                  <i className="bi bi-list"></i>
                </a>
              </li>
              <li className="nav-item d-none d-md-block">
                <Link to="/dashboard" className="nav-link">
                  <i className="bi bi-speedometer2 me-1" aria-hidden="true"></i>
                  Dashboard
                </Link>
              </li>
            </ul>
=======
    render() {
        const { children, location } = this.props;
        const { title, breadcrumb } = getMainPageMeta(location);
        const { user } = this.state;
>>>>>>> Stashed changes

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/notifications" className="nav-link">
                  <i className="bi bi-bell"></i>
                  <span className="navbar-badge badge text-bg-warning">2</span>
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#" data-lte-toggle="fullscreen">
                  <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
                  <i data-lte-icon="minimize" className="bi bi-fullscreen-exit d-none"></i>
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="bd-theme"
                  aria-label="Toggle color scheme"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-sun-fill" data-lte-theme-icon="light"></i>
                  <i className="bi bi-moon-fill d-none" data-lte-theme-icon="dark"></i>
                  <i className="bi bi-circle-half d-none" data-lte-theme-icon="auto"></i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="bd-theme"
                  style={{ '--bs-dropdown-min-width': '8rem' }}
                >
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-theme-value="light"
                      aria-pressed="false"
                    >
                      <i className="bi bi-sun-fill me-2"></i>
                      Light
                      <i className="bi bi-check-lg ms-auto d-none"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-theme-value="dark"
                      aria-pressed="false"
                    >
                      <i className="bi bi-moon-fill me-2"></i>
                      Dark
                      <i className="bi bi-check-lg ms-auto d-none"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center active"
                      data-bs-theme-value="auto"
                      aria-pressed="true"
                    >
                      <i className="bi bi-circle-half me-2"></i>
                      Auto
                      <i className="bi bi-check-lg ms-auto d-none"></i>
                    </button>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown user-menu">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  <span className="user-image rounded-circle shadow bg-primary d-inline-flex align-items-center justify-content-center text-white fw-semibold">
                    {(user?.name || user?.email || '?').charAt(0).toUpperCase()}
                  </span>
                  <span className="d-none d-md-inline">{user?.name || user?.email}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                  <li className="user-header text-bg-primary">
                    <span className="user-image rounded-circle shadow bg-white text-primary d-inline-flex align-items-center justify-content-center fw-bold fs-4">
                      {(user?.name || user?.email || '?').charAt(0).toUpperCase()}
                    </span>
                    <p className="mb-0 mt-2">
                      {user?.name || 'User'}
                      <small>{user?.email}</small>
                    </p>
                  </li>
                  <li className="user-body">
                    <div className="row">
                      <div className="col-12 text-center">
                        <Link to="/account">Account</Link>
                      </div>
                    </div>
                  </li>
                  <li className="user-footer">
                    <Link to="/account" className="btn btn-outline-secondary">
                      Profile
                    </Link>
                    <button
                      type="button"
                      className="btn btn-outline-danger float-end"
                      onClick={this.handleLogoutClick}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <Link to="/dashboard" className="brand-link">
              <span className="brand-image opacity-75 shadow rounded bg-primary d-inline-flex align-items-center justify-content-center text-white fw-bold">
                MT
              </span>
              <span className="brand-text fw-light">Marina Tor</span>
            </Link>
          </div>

<<<<<<< Updated upstream
          <div className="sidebar-wrapper">
            <nav className="mt-2" aria-label="Main navigation">
              <ul
                className="nav sidebar-menu flex-column"
                data-lte-toggle="treeview"
                data-accordion="false"
              >
                {MAIN_NAV_ITEMS.map((item) => (
                  <li key={item.path} className="nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                      <i className={`nav-icon ${item.icon}`}></i>
                      <p>{item.label}</p>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
=======
                                {MAIN_NAV_ITEMS.map((item) => (
                                    <li
                                        key={item.path}
                                        className="nav-item"
                                    >
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `nav-link${isActive ? " active" : ""}`
                                            }
                                        >
                                            <i
                                                className={`nav-icon ${item.icon}`}
                                            ></i>

                                            <p className="d-flex justify-content-between align-items-center w-100 mb-0">

                                                <span>
                                                    {item.label}
                                                </span>

                                                {item.path === "/notifications" &&
                                                    user && (
                                                        <NotificationBadge
                                                            userId={user.userId}
                                                        />
                                                    )}

                                            </p>

                                        </NavLink>
                                    </li>
                                ))}

                            </ul>
                        </nav>
                    </div>
                </aside>

                <main className="app-main uc-main">

                    <div className="app-content-header">
                        <div className="container-fluid">

                            <div className="row">

                                <div className="col-sm-6">
                                    <h3 className="mb-0">
                                        {title}
                                    </h3>
                                </div>

                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-end">
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard">
                                                Home
                                            </Link>
                                        </li>

                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            {breadcrumb}
                                        </li>
                                    </ol>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="app-content">
                        <div className="container-fluid">
                            {children}
                        </div>
                    </div>

                </main>

                <footer className="app-footer uc-footer">
                    <div className="float-end d-none d-sm-inline">
                        Marina TOR App
                    </div>

                    <strong>
                        Copyright &copy; 2026 Marina TOR.
                    </strong>
                </footer>
>>>>>>> Stashed changes

        <main className="app-main">
          <div className="app-content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <h3 className="mb-0">{title}</h3>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-end">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {breadcrumb}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="app-content">
            <div className="container-fluid">{children}</div>
          </div>
        </main>

        <footer className="app-footer">
          <div className="float-end d-none d-sm-inline">Marina Tor App</div>
          <strong>
            Copyright &copy; 2026&nbsp;
            <a href="https://adminlte.io" className="text-decoration-none">
              AdminLTE.io
            </a>
            .
          </strong>{' '}
          All rights reserved.
        </footer>
      </div>
    )
  }
}

export default AdminLayout
