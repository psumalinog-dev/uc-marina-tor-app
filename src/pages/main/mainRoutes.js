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
=======
    {
        path: '/dashboard',
        label: 'Dashboard',
        icon: 'bi bi-speedometer',
        title: 'Dashboard',
        breadcrumb: 'Dashboard',
    },
    {
        path: '/students',
        label: 'Student Management',
        icon: 'bi bi-people-fill',
        title: 'Student Management',
        breadcrumb: 'Student Management',
    },
    {
        path: '/users',
        label: 'User Management',
        icon: 'bi bi-person-gear',
        title: 'User Management',
        breadcrumb: 'User Management',
    },
    {
        path: '/tor-requests',
        label: 'TOR Requests',
        icon: 'bi bi-file-earmark-check',
        title: 'TOR Requests',
        breadcrumb: 'TOR Requests',
    },
    {
        path: '/marina-tor',
        label: 'Marina TOR',
        icon: 'bi bi-file-earmark-text',
        title: 'Marina TOR',
        breadcrumb: 'Marina TOR',
    },
    {
        path: '/notifications',
        label: 'Notifications',
        icon: 'bi bi-bell',
        title: 'Notifications',
        breadcrumb: 'Notifications',
    },
    {
        path: '/audit-trail',
        label: 'Audit Trail',
        icon: 'bi bi-clock-history',
        title: 'Audit Trail',
        breadcrumb: 'Audit Trail',
    },
    {
        path: '/account',
        label: 'Account',
        icon: 'bi bi-person-circle',
        title: 'Account',
        breadcrumb: 'Account',
    },
];


export function getMainPageMeta(pathname) {
    const match = MAIN_NAV_ITEMS.find((item) => item.path === pathname)

    return match || {
        title: 'Dashboard',
        breadcrumb: 'Dashboard',
    }
}