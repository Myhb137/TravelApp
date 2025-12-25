import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import CheckIcon from '@mui/icons-material/Check'

const SettingsPage = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const [notifications, setNotifications] = useState(true)
    const [showLangModal, setShowLangModal] = useState(false)

    // Handle direction based on language
    useEffect(() => {
        document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    }, [i18n.language])

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        setShowLangModal(false)
    }

    const SectionTitle = ({ title }) => (
        <h2 className='px-6 mt-8 mb-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-start'>{title}</h2>
    )

    const SettingItem = ({ icon: Icon, label, value, type = 'link', onClick, color = 'text-gray-600' }) => (
        <motion.div
            className='bg-white px-6 py-4 flex items-center justify-between border-b border-gray-50 last:border-b-0 active:bg-gray-50 transition-colors cursor-pointer'
            onClick={onClick}
        >
            <div className='flex items-center gap-4'>
                <div className={`p-2 rounded-xl bg-gray-50 ${color}`}>
                    <Icon sx={{ fontSize: 22 }} />
                </div>
                <span className='font-semibold text-gray-900'>{label}</span>
            </div>

            {type === 'link' && (
                <div className='flex items-center gap-2'>
                    {value && <span className='text-sm text-gray-400'>{value}</span>}
                    <div className={i18n.language === 'ar' ? 'rotate-180' : ''}>
                        <ChevronRightIcon sx={{ color: '#d1d5db' }} />
                    </div>
                </div>
            )}

            {type === 'toggle' && (
                <div
                    className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${value ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                    <motion.div
                        className='bg-white w-5 h-5 rounded-full shadow-md'
                        animate={{ x: value ? (i18n.language === 'ar' ? -20 : 20) : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                </div>
            )}
        </motion.div>
    )

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'ar', label: 'العربية' }
    ]

    const getCurrentLangLabel = () => {
        const lang = languages.find(l => l.code === i18n.language)
        return lang ? lang.label : 'English'
    }

    return (
        <div className='min-h-screen bg-gray-50 pb-10'>
            {/* Header */}
            <div className='px-4 pt-12 pb-4 flex items-center gap-4 bg-white sticky top-0 z-50 shadow-sm'>
                <button
                    onClick={() => navigate(-1)}
                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                >
                    <div className={i18n.language === 'ar' ? 'rotate-180' : ''}>
                        <ArrowBackIosNewIcon sx={{ fontSize: 20, color: '#1f2937' }} />
                    </div>
                </button>
                <h1 className='text-xl font-bold text-gray-900'>{t('settings')}</h1>
            </div>

            <div className='flex flex-col mt-5'>

                <SectionTitle title={t('general')} />
                <div className='bg-white border-y border-gray-100'>
                    <SettingItem
                        icon={LanguageOutlinedIcon}
                        label={t('language')}
                        value={getCurrentLangLabel()}
                        color="text-blue-600"
                        onClick={() => setShowLangModal(true)}
                    />
                    <SettingItem
                        icon={NotificationsOutlinedIcon}
                        label={t('push_notifications')}
                        type="toggle"
                        value={notifications}
                        onClick={() => setNotifications(!notifications)}
                        color="text-purple-600"
                    />
                </div>

                <SectionTitle title={t('security_privacy')} />
                <div className='bg-white border-y border-gray-100'>
                    <SettingItem
                        icon={LockOutlinedIcon}
                        label={t('change_password')}
                        color="text-orange-600"
                    />
                    <SettingItem
                        icon={DescriptionOutlinedIcon}
                        label={t('privacy_policy')}
                        color="text-green-600"
                    />
                </div>

                <SectionTitle title={t('support')} />
                <div className='bg-white border-y border-gray-100'>
                    <SettingItem
                        icon={HelpOutlineOutlinedIcon}
                        label={t('help_center')}
                        color="text-cyan-600"
                    />
                </div>

                <div className='px-6 mt-10'>
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className='w-full bg-white text-red-500 font-bold py-4 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center gap-2'
                    >
                        <LogoutIcon /> {t('logout')}
                    </motion.button>
                    <p className='text-center text-xs text-gray-400 mt-4'>{t('app_version')} 1.0.2</p>
                </div>

            </div>

            {/* Language Selection Modal */}
            <AnimatePresence>
                {showLangModal && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLangModal(false)}
                        />
                        <motion.div
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 pb-10"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <h3 className="text-xl font-bold mb-6 text-center">{t('language')}</h3>
                            <div className="flex flex-col gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`flex items-center justify-between p-4 rounded-xl transition-colors ${i18n.language === lang.code ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-700'}`}
                                    >
                                        <span className="font-semibold">{lang.label}</span>
                                        {i18n.language === lang.code && <CheckIcon />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SettingsPage
