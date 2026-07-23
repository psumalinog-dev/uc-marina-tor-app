const STORAGE_KEY = 'marina-tor-auth'

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

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

export async function login({ email, password }) {
  try {
    const res = await fetch('/authentication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    })

    if (res.ok) {
      const data = await res.json()
      const user = { email, name: (data.FirstName || '') + ' ' + (data.LastName || '') }
      saveUser(user)
      return user
    }

    // If backend returned non-ok, fall through to demo fallback below
  } catch {
    // network or CORS error - fall back to demo account
  }

  // Demo fallback: if backend is not available or authentication failed, allow local demo credentials
  if (email === 'admin@example.com' && password === 'password123') {
    const user = { email: 'admin@example.com', name: 'Admin User' }
    saveUser(user)
    return user
  }

  throw new Error('Invalid email or password.')
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export async function requestPasswordReset(email) {
  const res = await fetch('/api/Login/request-password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'Failed to request password reset')
  }

  // server intentionally returns generic success
  return { ok: true }
}

export async function verifyResetToken(token) {
  const res = await fetch(`/api/Login/verify-reset?token=${encodeURIComponent(token)}`)
  if (!res.ok) return { valid: false }
  return await res.json()
}

export async function resetPassword(token, newPassword) {
  const res = await fetch('/api/Login/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(txt || 'Failed to reset password')
  }

  return await res.json()
}
