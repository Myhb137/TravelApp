import React, { useState, useEffect } from 'react'
import useProfile from '../hooks/useProfile'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { profile: profileData, isLoading, error } = useProfile() 

  const [savedTrips, setSavedTrips] = useState(0);

  useEffect(() => {
    if (profileData?.stats?.saved) {
      setSavedTrips(profileData.stats.saved)
    }
  }, [profileData])

  if (isLoading) return <div className='text-center py-8'>Loading profile…</div>
  if (error) return <div className='text-red-500 py-4'>Error: {error}</div>

  const data = profileData || {}; 
  const profile = data.profile || {}
  const name = profile.fullName || 'Guest User'
  const avatar = profile.avatar || {}
  const email = profile.email || 'No email provided'
  const passportId = profile.passportId || 'No passport ID provided'
  const stats = data.stats || { totalTrips: 0, completed: 0, upcoming: 0 }
  const history = data.history || []

  const statusConfig = {
    completed: { icon: <DoneIcon sx={{color: '#fff', fontSize:32}} className='rounded-full bg-green-600'/>, label: 'Completed', color: 'green' },
    upcoming: { icon: <AccessTimeIcon sx={{color: '#fff', fontSize:32}} className='rounded-full bg-orange-600'/>, label: 'Upcoming', color: 'orange' },
    canceled: { icon: <CloseIcon sx={{color: '#fff', fontSize:32}} className='rounded-full bg-red-600'/>, label: 'Canceled', color: 'red' }
  }

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-x-0 top-0 h-60 bg-blue-600 rounded-b-4xl z-0" />

      {/* CONTENT */}
      <div className="relative z-10 pb-10 mb-20">
        {/* Profile Card */}
        <motion.div
          className="pt-10 flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='drop-shadow-2xl rounded-4xl bg-white border-gray-300 flex-col text-center text-black w-95 mt-15 p-4'>
            <motion.img 
              src={avatar.url || 'default-avatar.png'}
              alt={avatar.alt || 'Profile Picture'}
              className="w-32 h-32 border rounded-full mx-auto drop-shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            />
            <div className='gap-3 flex flex-col mt-5'>
              <motion.h1 
                className='text-black text-center text-xl font-bold'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {name}
              </motion.h1>

              {/* Email & Passport */}
              <motion.div 
                className='flex-col py-5 gap-3 flex'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className='flex gap-1 justify-start'>
                  <MailOutlineIcon sx={{color : '#79716b' ,fontSize:26}} />
                  <p className='text-md text-stone-500'>Email Address</p>
                </div>
                <div className='border-blue-600 border-2 py-3 px-2 rounded-2xl'>
                  <p className='text-md font-normal text-start text-gray-800'>{email}</p>
                </div>

                <div className='flex gap-1 justify-start'>
                  <CreditCardIcon sx={{color : '#79716b' ,fontSize:26}} />
                  <p className='text-md text-stone-500'>Passport ID</p>
                </div>
                <div className='border-blue-600 border-2 py-3 px-2 rounded-2xl'>
                  <p className='text-md font-semibold text-start text-gray-800'>{passportId}</p>
                </div>
              </motion.div>

              <div className='border border-gray-400 rounded-2xl my-3'></div>

              <motion.button 
                className='bg-blue-600 text-white w-full text-xl py-3 rounded-2xl'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Profile
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="w-full px-4 py-4 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex gap-4 justify-center items-stretch">
            <motion.div className="text-center border-b-2 flex flex-col gap-3 border-gray-300 rounded-4xl flex-1 max-w-xs px-3 py-7 bg-white drop-shadow-2xl" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
              <div className="text-lg text-gray-600 flex flex-col items-center gap-2">
                <DoneIcon sx={{color : '#ffff',fontSize:55}} className='border-2 p-2 rounded-full  bg-green-600'/>
                Completed
              </div>
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
            </motion.div>

            <motion.div className="text-center border-b-2 flex flex-col gap-3 border-gray-300 rounded-4xl flex-1 max-w-xs px-3 py-7 bg-white drop-shadow-2xl" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
              <div className="text-lg text-gray-600 flex flex-col items-center gap-2">
                <AccessTimeIcon sx={{color : '#ffff',fontSize:55}} className='border-2 p-2 rounded-full bg-orange-600'/>
                Upcoming
              </div>
              <div className="text-3xl font-bold text-orange-600">{stats.upcoming}</div>
            </motion.div>

            <motion.div className="text-center border-b-2 flex flex-col gap-3 border-gray-300 rounded-4xl flex-1 max-w-xs px-3 py-7 bg-white drop-shadow-2xl" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
              <div className="text-lg text-gray-600 flex flex-col items-center gap-2">
                <BookmarkIcon sx={{color : '#ffff',fontSize:55}} className='border-2 p-2 rounded-full bg-purple-600'/>
                Saved
              </div>
              <motion.div className="text-3xl font-bold text-purple-600" 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                transition={{ type:'spring', stiffness:120 }}
              >
                {savedTrips}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trip History Section */}
        <motion.div 
          className="px-2 pb-6 mt-10 flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className='flex justify-between w-full'>
            <h2 className="text-2xl text-black text-start font-semibold mb-4">Trip History</h2>
          </div>

          {history.map((trip, i) => (
            <motion.div 
              key={trip.id} 
              className="bg-white rounded-lg p-4 mb-3 shadow flex justify-between items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              <div>
                <h3 className="font-semibold text-lg text-black">{trip.title}</h3>
                <p className="text-md text-gray-600">{trip.location}</p>
                <p className="text-md text-gray-500">{trip.date}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className={`p-2 rounded-full bg-${statusConfig[trip.status]?.color}-600`}>
                  {statusConfig[trip.status]?.icon || 'Unknown'}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logout Section */}
        <div className="mt-6">
          <motion.button
            onClick={() => setOpen(true)}
            className="bg-red-700 text-white w-[90%] max-w-md mx-auto flex justify-center drop-shadow-2xl text-center text-xl py-3 rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log out
          </motion.button>

          {/* Animated logout popup */}
          <AnimatePresence>
            {open && (
              <>
                {/* Overlay */}
                <motion.div
                  className="fixed inset-0 bg-black/50 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                />

                {/* Popup card */}
                <motion.div
                  className="fixed inset-0 flex items-center justify-center z-50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-white w-[90%] max-w-md p-6 gap-7 rounded-3xl drop-shadow-2xl border border-gray-300 flex flex-col items-center">
                    <h1 className="text-xl text-center font-semibold text-black mb-3">
                      Log out
                    </h1>
                    <p className="text-center text-black mb-5">
                      You’re about to log out of your account. This will end your current session, but your data will stay safe.
                    </p>
                    <div className="flex gap-4 w-full justify-center">
                      <button
                        className="border-2 border-gray-300 text-lg px-5 py-2 rounded-xl text-black"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button className="border-2 border-gray-300 rounded-3xl px-7 py-2 bg-red-500 text-lg text-white">
                        Confirm
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Profile
