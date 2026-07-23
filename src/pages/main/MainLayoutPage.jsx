import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AdminLayout from '@/components/layout/AdminLayout'

function MainLayoutPage({ user, isAuthenticated, onLogout }) {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <AdminLayout user={user} location={location.pathname} onLogout={onLogout}>
      <Outlet />
    </AdminLayout>
  )
}

export default MainLayoutPage
