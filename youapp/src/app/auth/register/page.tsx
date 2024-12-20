'use client'

import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { register } from '@/services/auth/register'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    setError('')

    // Validasi input
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const result = await register({ email, password })
    setLoading(false)

    if (result.success) {
      router.push('/auth/login')
    } else {
      setError(result.message || 'Registration failed.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <div className="p-6 bg-gray-800 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Register
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Username"
          type="name"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          label="Register"
          onClick={handleRegister}
          isLoading={loading}
          disabled={loading}
        />
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  )
}
