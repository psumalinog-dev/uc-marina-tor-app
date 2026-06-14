const DEMO_USER = {
  email: 'admin@example.com',
  password: 'password123',
  name: 'Admin User',
}

const STORAGE_KEY = 'marina-tor-auth'

export function getStoredUser() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return null

  try {
    return JSON.parse(saved)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        const user = { email: DEMO_USER.email, name: DEMO_USER.name }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        resolve(user)
      } else {
        reject(new Error('Invalid email or password.'))
      }
    }, 400)
  })
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}
