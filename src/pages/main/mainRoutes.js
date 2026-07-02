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
    {
        path: '/marina-tor',
        label: 'Marina TOR',
        icon: 'bi bi-file-earmark-text',
        title: 'Marina TOR',
        breadcrumb: 'Marina TOR',
    },
];

export function getMainPageMeta(pathname) {
    const match = MAIN_NAV_ITEMS.find(
        (item) => item.path === pathname
    );

    return (
        match || {
            title: 'Dashboard',
            breadcrumb: 'Dashboard',
        }
    );
}