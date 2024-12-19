'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditInterestsPage() {
  const router = useRouter()
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: { 'x-access-token': 'mock-token-12345' },
        })
        const data = await response.json()
        if (data.success) {
          setInterests(data.data.interests || [])
        } else {
          console.error('Failed to fetch profile:', data.message)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest('')
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'mock-token-12345',
        },
        body: JSON.stringify({
          interests,
        }),
      })

      const result = await response.json()

      if (result.success) {
        router.push('/profile')
      } else {
        console.error('Failed to save interests:', result.message)
      }
    } catch (error) {
      console.error('Error saving interests:', error)
    }
  }

  if (loading) {
    return <p className="text-center mt-10 text-white">Loading...</p>
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="text-blue-500 hover:text-blue-400"
        >
          Save
        </button>
      </div>

      <h1 className="text-lg font-bold mb-4">What interest you?</h1>

      {/* Input for Adding Interest */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Add your interest"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg outline-none"
        />
        <button
          onClick={handleAddInterest}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
        >
          Add
        </button>
      </div>

      {/* List of Interests */}
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300 flex items-center space-x-2"
          >
            <span>{interest}</span>
            <button
              onClick={() => handleRemoveInterest(interest)}
              className="text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
