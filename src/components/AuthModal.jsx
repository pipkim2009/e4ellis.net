import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../contexts/AuthContext'

export function AuthModal({ isOpen, onClose, mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn, signUp } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'signin') {
        console.log('Attempting sign in...')
        await signIn(email, password)
        console.log('Sign in successful, closing modal')
        setLoading(false)
        onClose()
      } else {
        await signUp(email, password)
        setMessage('Check your email to confirm your account! Your account will need to be approved before you can access all features.')
        setEmail('')
        setPassword('')
        setLoading(false)
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <h2 className="modal-title">
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="auth-submit-button" disabled={loading}>
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}
