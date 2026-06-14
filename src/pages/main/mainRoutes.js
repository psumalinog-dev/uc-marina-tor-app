export const MAIN_NAV_ITEMS = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'bi bi-speedometer',
    title: 'Dashboard',
    breadcrumb: 'Dashboard',
  },
  {
    path: '/account',
    label: 'Account',
    icon: 'bi bi-person',
    title: 'Account',
    breadcrumb: 'Account',
  },
  {
    path: '/notifications',
    label: 'Notifications',
    icon: 'bi bi-bell',
    title: 'Notifications',
    breadcrumb: 'Notifications',
  },
]

export function getMainPageMeta(pathname) {
  const match = MAIN_NAV_ITEMS.find((item) => item.path === pathname)
  return match || { title: 'Dashboard', breadcrumb: 'Dashboard' }
}
