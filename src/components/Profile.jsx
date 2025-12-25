import React, { useState, useEffect } from 'react'
import useProfile from '../hooks/useProfile'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DoneIcon from '@mui/icons-material/Done'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CloseIcon from '@mui/icons-material/Close'
import SettingsIcon from '@mui/icons-material/Settings'
import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Profile = () => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false);
  const { profile: profileData, isLoading, error } = useProfile()
  const [savedTrips, setSavedTrips] = useState(0);

  useEffect(() => {
    if (profileData?.stats?.saved) {
      setSavedTrips(profileData.stats.saved)
    }
  }, [profileData])

  if (isLoading) return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='animate-pulse flex flex-col items-center gap-4'>
        <div className='w-20 h-20 bg-gray-200 rounded-full'></div>
        <div className='h-4 w-32 bg-gray-200 rounded'></div>
      </div>
    </div>
  )
  if (error) return <div className='text-red-500 py-10 text-center'>Error: {error}</div>

  const data = profileData || {};
  const profile = data.profile || {}
  const name = profile.fullName || 'Guest User'
  const avatar = profile.avatar || {}
  const email = profile.email || 'No email provided'
  const passportId = profile.passportId || 'No passport ID provided'
  const stats = data.stats || { totalTrips: 0, completed: 0, upcoming: 0 }
  const history = data.history || []

  const StatCard = ({ icon, label, value, color }) => (
    <motion.div
      className='bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 flex-1 min-w-[100px]'
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        {icon}
      </div>
      <div className='flex flex-col items-center'>
        <span className='text-2xl font-bold text-gray-900'>{value}</span>
        <span className='text-xs font-medium text-gray-500 uppercase tracking-wide'>{label}</span>
      </div>
    </motion.div>
  )

  return (
    <div className="relative w-full min-h-screen bg-gray-50 pb-24 overflow-x-hidden">

      {/* HERDER BACKGROUND */}
      <div className="absolute top-0 w-full h-80 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-b-[3rem] shadow-xl z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -left-20 w-48 h-48 bg-blue-300 opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* HEADER CONTENT */}
      <div className="relative z-10 px-4 pt-12 flex justify-end items-start text-white">

        <Link to="/settings">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className='p-2 bg-white/20 backdrop-blur-md rounded-full text-white'
          >
            <SettingsIcon />
          </motion.button>
        </Link>
      </div>

      {/* PROFILE INFO CARD */}
      <div className='relative z-10 px-4 mt-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-100 flex flex-col items-center'
        >
          {/* Avatar */}
          <div className='relative -mt-20 mb-4'>
            <div className='w-32 h-32 rounded-full p-1 bg-white shadow-2xl'>
              <img
                src={avatar.url || 'https://via.placeholder.com/150'}
                alt={avatar.alt}
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <Link to="/edit-profile" className='absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white'>
              <EditIcon sx={{ fontSize: 20 }} />
            </Link>
          </div>

          <h2 className='text-2xl font-bold text-gray-900'>{name}</h2>
          <p className='text-gray-500 font-medium mb-6'>{t('travel_enthusiast')}</p>

          {/* Info Rows */}
          <div className='w-full space-y-3 mb-6'>
            <div className='flex items-center gap-4 p-3 bg-gray-50 rounded-2xl'>
              <div className='p-2 bg-white rounded-xl shadow-sm text-gray-500'>
                <MailOutlineIcon />
              </div>
              <div className='flex-1 overflow-hidden'>
                <p className='text-xs text-gray-400 font-medium uppercase'>{t('email_address')}</p>
                <p className='text-gray-800 font-semibold text-sm truncate'>{email}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-3 bg-gray-50 rounded-2xl'>
              <div className='p-2 bg-white rounded-xl shadow-sm text-gray-500'>
                <CreditCardIcon />
              </div>
              <div className='flex-1 overflow-hidden'>
                <p className='text-xs text-gray-400 font-medium uppercase'>{t('passport_id')}</p>
                <p className='text-gray-800 font-semibold text-sm truncate'>{passportId}</p>
              </div>
            </div>
          </div>

          <Link to="/edit-profile" className='w-full'>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className='w-full py-3 bg-gray-900 text-white rounded-xl font-semibold shadow-lg shadow-gray-300'
            >
              {t('edit_details')}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* STATS SECTION */}
      <div className='relative z-10 px-4 mt-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4 px-2'>{t('my_statistics')}</h3>
        <div className='flex gap-4 overflow-x-auto pb-4 no-scrollbar'>
          <StatCard
            icon={<DoneIcon />}
            label={t('completed')}
            value={stats.completed}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            icon={<AccessTimeIcon />}
            label={t('upcoming')}
            value={stats.upcoming}
            color="bg-orange-100 text-orange-600"
          />
          <StatCard
            icon={<BookmarkIcon />}
            label={t('saved')}
            value={savedTrips}
            color="bg-purple-100 text-purple-600"
          />
        </div>
      </div>

      {/* HISTORY SECTION */}
      <div className='relative z-10 px-4 mt-2 mb-8'>
        <div className='flex justify-between items-center mb-4 px-2'>
          <h3 className='text-lg font-bold text-gray-900'>{t('recent_trips')}</h3>
          <button className='text-blue-600 text-sm font-semibold'>{t('see_all')}</button>
        </div>

        <div className='space-y-4'>
          {history.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className='bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between'
            >
              <div className='flex items-center gap-4'>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold
                                ${trip.status === 'completed' ? 'bg-green-100 text-green-600' :
                    trip.status === 'upcoming' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}
                  `}>
                  {trip.status === 'completed' ? <DoneIcon /> :
                    trip.status === 'upcoming' ? <AccessTimeIcon /> : <CloseIcon />}
                </div>
                <div>
                  <h4 className='font-bold text-gray-900'>{trip.title}</h4>
                  <div className='flex items-center gap-3 text-xs text-gray-500 mt-1'>
                    <span className='flex items-center gap-1'><LocationOnIcon sx={{ fontSize: 14 }} /> {trip.location}</span>
                    <span className='flex items-center gap-1'><CalendarMonthIcon sx={{ fontSize: 14 }} /> {trip.date}</span>
                  </div>
                </div>
              </div>
              <div className={`text-gray-300 ${i18n.language === 'ar' ? 'rotate-180' : ''}`}>
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </div>
            </motion.div>
          ))}

          {history.length === 0 && (
            <div className='text-center py-10 text-gray-400 bg-white rounded-3xl border border-dashed'>
              {t('no_trip_history')}
            </div>
          )}
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <div className='px-4 mb-10'>
        <motion.button
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.95 }}
          className='w-full flex items-center justify-center gap-2 bg-white text-red-500 border border-red-100 py-4 rounded-2xl font-bold shadow-sm hover:bg-red-50 transition-colors'
        >
          <LogoutIcon /> {t('logout')}
        </motion.button>
      </div>

      {/* LOGOUT MODAL */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <motion.div
                className="bg-white w-[85%] max-w-sm p-6 rounded-[2rem] shadow-2xl pointer-events-auto"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
              >
                <div className='w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <LogoutIcon sx={{ fontSize: 30 }} />
                </div>
                <h2 className="text-xl font-bold text-center text-gray-900 mb-2">{t('sign_out_title')}</h2>
                <p className="text-center text-gray-500 text-sm mb-6 leading-relaxed">
                  {t('sign_out_confirmation')}
                </p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl active:scale-95 transition-transform"
                    onClick={() => setOpen(false)}
                  >
                    {t('cancel')}
                  </button>
                  <button
                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-200 active:scale-95 transition-transform"
                    onClick={() => {
                      console.log("Logged out")
                      setOpen(false)
                    }}
                  >
                    {t('confirm_sign_out')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile
