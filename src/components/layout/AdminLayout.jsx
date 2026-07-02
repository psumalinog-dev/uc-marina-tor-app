import { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './AdminLayout.css'
<<<<<<< HEAD
=======

>>>>>>> 9fe70a0 (Refining Marina TOR & Export PDF)
import {
    destroySidebarScrollbars,
    initColorModeToggle,
    initSidebarScrollbars,
    setBodyClass,
} from '../../lib/adminlte'

import {
    getMainPageMeta,
    MAIN_NAV_ITEMS,
} from '../../pages/main/mainRoutes'

class AdminLayout extends Component {
<<<<<<< HEAD
   componentDidMount() {
     setBodyClass('layout-fixed sidebar-expand-lg')
     initSidebarScrollbars()
     initColorModeToggle()
=======
    componentDidMount() {
        setBodyClass('layout-fixed sidebar-expand-lg')
        initSidebarScrollbars()
        initColorModeToggle()
>>>>>>> 9fe70a0 (Refining Marina TOR & Export PDF)
    }

    componentDidUpdate() {
        initSidebarScrollbars()
    }

    componentWillUnmount() {
        destroySidebarScrollbars()
        setBodyClass('')
    }

    handleLogoutClick = (event) => {
        event.preventDefault()

        if (this.props.onLogout) {
            this.props.onLogout()
        }
    }

<<<<<<< HEAD
    return (
      <div className="app-wrapper">
         <nav className="app-header navbar navbar-expand uc-navbar">
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
        const { children, location } = this.props
        const { title, breadcrumb } = getMainPageMeta(location)
>>>>>>> 9fe70a0 (Refining Marina TOR & Export PDF)

        return (
            <div className="app-wrapper">

                <nav className="app-header navbar navbar-expand uc-navbar">
                    <div className="container-fluid">

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-light"
                                    onClick={this.handleLogoutClick}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>

                    </div>
                </nav>

<<<<<<< HEAD
        <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <Link to="/dashboard" className="brand-link">
              <img src="https://lmportal.uc.edu.ph/static/media/uc-logo-bg-160x83.c24343b851e5b064daf9.png" alt="UCLM" className="brand-image opacity-75 shadow rounded bg-white d-inline-flex align-items-center justify-content-center" />
              <span className="brand-text fw-light">Marina Tor</span>
            </Link>
          </div>
=======
                <aside
                    className="app-sidebar bg-body-secondary shadow"
                    data-bs-theme="dark"
                >
                    <div className="sidebar-brand">
                        <Link to="/dashboard" className="brand-link">
                            <span className="brand-text fw-light">
                                Marina TOR
                            </span>
                        </Link>
                    </div>
>>>>>>> 9fe70a0 (Refining Marina TOR & Export PDF)

                    <div className="sidebar-wrapper">
                        <nav className="mt-2">
                            <ul className="nav sidebar-menu flex-column">

                                {MAIN_NAV_ITEMS.map((item) => (
                                    <li key={item.path} className="nav-item">

                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `nav-link${isActive ? ' active' : ''}`
                                            }
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

                <main className="app-main uc-main">

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
                        Marina Tor App
                    </div>

                    <strong>
                        Copyright &copy; 2026 Marina TOR.
                    </strong>
                </footer>

<<<<<<< HEAD
         <main className="app-main uc-main">
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

         <footer className="app-footer uc-footer">
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
=======
            </div>
        )
    }
>>>>>>> 9fe70a0 (Refining Marina TOR & Export PDF)
}

export default AdminLayout