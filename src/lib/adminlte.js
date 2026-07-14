import { OverlayScrollbars } from 'overlayscrollbars'

const THEME_STORAGE_KEY = 'lte-theme'
const SIDEBAR_WRAPPER_SELECTOR = '.sidebar-wrapper'

let sidebarScrollbarsInstance = null
let colorModeInitialized = false

export function initAdminLteTheme() {
  const stored = (() => {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
})();

  const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
  let resolved = 'light'

  if (stored === 'dark' || stored === 'light') {
    resolved = stored
  } else if (prefersDark) {
    resolved = 'dark'
  }

  document.documentElement.setAttribute('data-bs-theme', resolved)
  document.documentElement.style.colorScheme = resolved
}

export function setBodyClass(className) {
  document.body.className = className
}

export function initSidebarScrollbars() {
  const sidebarWrapper = document.querySelector(SIDEBAR_WRAPPER_SELECTOR)
  const isMobile = window.innerWidth <= 992

  if (!sidebarWrapper || isMobile) {
    return
  }

  destroySidebarScrollbars()

  sidebarScrollbarsInstance = OverlayScrollbars(sidebarWrapper, {
    scrollbars: {
      theme: 'os-theme-light',
      autoHide: 'leave',
      clickScroll: true,
    },
  })
}

export function destroySidebarScrollbars() {
  if (sidebarScrollbarsInstance) {
    sidebarScrollbarsInstance.destroy()
    sidebarScrollbarsInstance = null
  }
}

export function initColorModeToggle() {
  if (colorModeInitialized) {
    return
  }
  colorModeInitialized = true

  const getStoredTheme = () => localStorage.getItem(THEME_STORAGE_KEY)
  const setStoredTheme = (theme) => localStorage.setItem(THEME_STORAGE_KEY, theme)
  const prefersDark = () => globalThis.matchMedia('(prefers-color-scheme: dark)').matches

  const getPreferredTheme = () => {
    const stored = getStoredTheme()
    if (stored) return stored
    return prefersDark() ? 'dark' : 'light'
  }

  const setTheme = (theme) => {
    const resolved = theme === 'auto' ? (prefersDark() ? 'dark' : 'light') : theme
    document.documentElement.setAttribute('data-bs-theme', resolved)
    document.documentElement.style.colorScheme = resolved
  }

  const showActiveTheme = (theme) => {
    document.querySelectorAll('[data-bs-theme-value]').forEach((el) => {
      el.classList.remove('active')
      el.setAttribute('aria-pressed', 'false')
      const check = el.querySelector('.bi-check-lg')
      if (check) check.classList.add('d-none')
    })

    const active = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    if (active) {
      active.classList.add('active')
      active.setAttribute('aria-pressed', 'true')
      const check = active.querySelector('.bi-check-lg')
      if (check) check.classList.remove('d-none')
    }

    document.querySelectorAll('[data-lte-theme-icon]').forEach((icon) => {
      icon.classList.toggle('d-none', icon.dataset.lteThemeIcon !== theme)
    })
  }

  setTheme(getPreferredTheme())
  showActiveTheme(getPreferredTheme())

  document.querySelectorAll('[data-bs-theme-value]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const theme = toggle.getAttribute('data-bs-theme-value')
      setStoredTheme(theme)
      setTheme(theme)
      showActiveTheme(theme)
    })
  })

  globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const stored = getStoredTheme()
    if (!stored || stored === 'auto') {
      setTheme(getPreferredTheme())
    }
  })
}
