'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PencilIcon } from '@heroicons/react/24/outline'
import Input from '@/components/Input'
import { calculateHoroscope, calculateZodiac } from '@/utils/dateUtils'
import { useRouter } from 'next/navigation'
import HoroscopeIcon from '@/components/icons/HoroscopeIcons'
import ZodiacIcon from '@/components/icons/ZodiacIcons'

interface Profile {
  name: string
  age: number
  gender: string
  birthday: string
  horoscope: string
  zodiac: string
  height: number
  weight: number
  interests: string[]
  profileImage: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditingAbout, setIsEditingAbout] = useState<boolean>(false)
  const [formAbout, setFormAbout] = useState<Partial<Profile>>({})
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  // Fetch profile data
  const fetchProfile = async () => {
    setLoading(true)
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: { 'x-access-token': 'mock-token-12345' },
    })
    const data = await response.json()
    if (data.success) {
      setProfile({
        name: data.data.name || 'johndoe123',
        age: data.data.age || 28,
        gender: data.data.gender || 'Male',
        birthday: data.data.birthday || '1995-08-11',
        horoscope: data.data.horoscope || 'Virgo',
        zodiac: data.data.zodiac || 'Pig',
        height: data.data.height || 175,
        weight: data.data.weight || 69,
        interests: data.data.interests || ['Music', 'Basketball', 'Fitness'],
        profileImage: data.data.profileImage || '/default-profile.png',
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  // Handle Edit
  const handleEditAbout = () => {
    if (profile) {
      setIsEditingAbout(true)
      setFormAbout(profile)
    }
  }

  // Handle Change
  const handleChange = (field: keyof Profile, value: string | number) => {
    const updatedForm = { ...formAbout, [field]: value }

    if (field === 'birthday' && typeof value === 'string') {
      const [year, month, day] = value.split('-').map(Number)

      if (year && month && day) {
        updatedForm.horoscope = calculateHoroscope(value)
        updatedForm.zodiac = calculateZodiac(year)
      } else {
        console.error('Invalid birthday format:', value)
        updatedForm.horoscope = 'Invalid Date'
        updatedForm.zodiac = 'Invalid Date'
      }
    }

    setFormAbout(updatedForm)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)

      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  // Save About
  const handleSaveAbout = async () => {
    try {
      let imageUrl = profile?.profileImage || ''

      if (selectedImage) {
        const formData = new FormData()
        formData.append('profileImage', selectedImage)

        const imageResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'x-access-token': 'mock-token-12345',
          },
        })

        const imageResult = await imageResponse.json()
        if (imageResult.success) {
          imageUrl = imageResult.imageUrl
        } else {
          console.error('Image upload failed:', imageResult.message)
          return
        }
      }

      const updatedProfile = { ...formAbout, profileImage: imageUrl }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'mock-token-12345',
        },
        body: JSON.stringify(updatedProfile),
      })

      const result = await response.json()

      if (result.success) {
        setProfile(updatedProfile as Profile)
        setIsEditingAbout(false)
        setSelectedImage(null)
        console.log('Profile updated successfully')
      } else {
        console.error('Profile update failed:', result.message)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <>
          {/* Header Section */}
          <div className="relative mb-6 w-full h-48">
            <Image
              src={profile?.profileImage || ''}
              alt="Profile Header"
              layout="fill"
              objectFit="cover"
              priority
              className="rounded-b-lg"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl font-bold text-gray-500">
                @{profile?.name}
              </h1>
              <p className="text-gray-500">{profile?.gender}</p>
              <div className="flex space-x-2 mt-1">
                <span className="px-2 py-1 bg-gray-700 text-xs rounded">
                  <HoroscopeIcon
                    horoscope={profile?.horoscope || ''}
                    size={16}
                  />
                  {profile?.horoscope}
                </span>
                <span className="px-2 py-1 bg-gray-700 text-xs rounded">
                  <ZodiacIcon zodiac={profile?.zodiac || ''} size={16} />
                  {profile?.zodiac}
                </span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-100 font-bold">About</h2>
              {isEditingAbout ? (
                <button
                  onClick={handleSaveAbout}
                  className="text-gray-400 hover:text-white"
                >
                  Save & Update
                </button>
              ) : (
                <button
                  onClick={handleEditAbout}
                  className="text-gray-400 hover:text-white"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {isEditingAbout ? (
              <div className="space-y-2">
                {/* Image Upload */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 bg-gray-700 rounded-full overflow-hidden">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Profile Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <span className="text-gray-300 text-sm flex justify-center items-center w-full h-full">
                        +
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="text-gray-400">Add Image</p>
                </div>

                {/* Form Inputs */}
                <Input
                  label="Display Name"
                  type="text"
                  value={formAbout.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                <Input
                  label="Gender"
                  type="select"
                  value={formAbout.gender || ''}
                  options={['Male', 'Female', 'Other']}
                  onChange={(e) => handleChange('gender', e.target.value)}
                />
                <Input
                  label="Birthday"
                  type="date"
                  value={formAbout.birthday || ''}
                  onChange={(e) => handleChange('birthday', e.target.value)}
                />
                <Input
                  label="Horoscope"
                  type="text"
                  value={formAbout.horoscope || ''}
                  readOnly
                />
                <Input
                  label="Zodiac"
                  type="text"
                  value={formAbout.zodiac || ''}
                  readOnly
                />
                <Input
                  label="Height"
                  type="number"
                  value={formAbout.height || ''}
                  onChange={(e) => handleChange('height', e.target.value)}
                />
                <Input
                  label="Weight"
                  type="number"
                  value={formAbout.weight || ''}
                  onChange={(e) => handleChange('weight', e.target.value)}
                />
              </div>
            ) : (
              <>
                <p className="text-gray-100">
                  Birthday: {profile?.birthday} (Age: {profile?.age})
                </p>
                <p className="text-gray-100">Horoscope: {profile?.horoscope}</p>
                <p className="text-gray-100">Zodiac: {profile?.zodiac}</p>
                <p className="text-gray-100">Height: {profile?.height} cm</p>
                <p className="text-gray-100">Weight: {profile?.weight} kg</p>
              </>
            )}
          </div>

          {/* Interests Section */}
          <div className="bg-gray-800 p-4 rounded-lg relative">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-100 font-bold">Interest</h2>
              <button
                onClick={() => router.push('/edit-interest')}
                className="text-gray-400 hover:text-white"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile?.interests && profile.interests.length > 0 ? (
                profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No interest added</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
