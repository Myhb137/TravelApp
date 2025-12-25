import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useProfile from '../hooks/useProfile'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

const EditProfilePage = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const { profile: profileData, isLoading, updateProfile } = useProfile()

    // Initialize with default values, will update when profileData loads
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        passportId: ''
    })

    const [avatar, setAvatar] = useState('')

    // Update form when data is loaded
    useEffect(() => {
        if (profileData?.profile) {
            const p = profileData.profile
            setFormData({
                fullName: p.fullName || '',
                email: p.email || '',
                phone: p.phone || '+213 555 123 456', // Fallback or existing value
                location: p.location || 'Algiers, Algeria',
                passportId: p.passportId || ''
            })
            if (p.avatar?.url) {
                setAvatar(p.avatar.url)
            }
        }
    }, [profileData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Prompt
            })

            if (image.webPath) {
                setAvatar(image.webPath)
            }
        } catch (error) {
            console.error('Camera error:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await updateProfile({
                ...formData,
                avatar: {
                    url: avatar,
                    alt: 'User Avatar'
                }
            })
            navigate(-1)
        } catch (error) {
            console.error("Failed to update profile", error)
            // You might want to show an error toast here
        }
    }

    const InputField = ({ icon: Icon, name, label, type = "text", value }) => (
        <div className='flex flex-col gap-2'>
            <label className='text-sm font-semibold text-gray-700 ml-1'>{label}</label>
            <div className='flex items-center gap-3 bg-gray-50 border border-gray-200 p-4 rounded-2xl focus-within:border-blue-500 focus-within:bg-white transition-all'>
                <Icon sx={{ color: '#9ca3af' }} />
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className='bg-transparent outline-none flex-1 text-gray-800 font-medium placeholder-gray-400'
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                />
            </div>
        </div>
    )

    return (
        <div className='min-h-screen bg-white pb-24'>
            {/* Header */}
            <div className='px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50'>
                <button
                    onClick={() => navigate(-1)}
                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                >
                    <div className={i18n.language === 'ar' ? 'rotate-180' : ''}>
                        <ArrowBackIosNewIcon sx={{ fontSize: 20, color: '#1f2937' }} />
                    </div>
                </button>
                <h1 className='text-xl font-bold text-gray-900'>{t('edit_profile')}</h1>
                <div className='w-10'></div> {/* Spacer for alignment */}
            </div>

            <form onSubmit={handleSubmit} className='px-6 pt-4 flex flex-col gap-6'>

                {/* Avatar Upload */}
                <div className='flex flex-col items-center mb-4'>
                    <div className='relative'>
                        <motion.div
                            className='w-32 h-32 rounded-full p-1 border-2 border-dashed border-gray-300 overflow-hidden'
                            whileTap={{ scale: 0.95 }}
                            onClick={handleImageUpload}
                        >
                            <img
                                src={avatar}
                                alt="Profile"
                                className='w-full h-full rounded-full object-cover'
                            />
                        </motion.div>
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            className='absolute bottom-0 right-0 p-2.5 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white'
                        >
                            <CameraAltIcon sx={{ fontSize: 20 }} />
                        </button>
                    </div>
                    <p onClick={handleImageUpload} className='mt-3 text-sm font-medium text-blue-600 cursor-pointer'>{t('change_picture')}</p>
                </div>

                {/* Form Fields */}
                <div className='space-y-5'>
                    <InputField
                        icon={PersonOutlineIcon}
                        name="fullName"
                        label={t('full_name')}
                        value={formData.fullName}
                    />

                    <InputField
                        icon={MailOutlineIcon}
                        name="email"
                        label={t('email_address')}
                        type="email"
                        value={formData.email}
                    />

                    <InputField
                        icon={PhoneAndroidIcon}
                        name="phone"
                        label={t('phone_number')}
                        type="tel"
                        value={formData.phone}
                    />

                    <InputField
                        icon={LocationOnOutlinedIcon}
                        name="location"
                        label={t('location')}
                        value={formData.location}
                    />

                    <InputField
                        icon={CreditCardIcon}
                        name="passportId"
                        label={t('passport_id')}
                        value={formData.passportId}
                    />
                </div>

                {/* Save Button */}
                <motion.button
                    type="submit"
                    className='fixed bottom-8 left-6 right-6 bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 z-40'
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {t('save_changes')}
                </motion.button>
            </form>
        </div>
    )
}

export default EditProfilePage
