import React from 'react'
import Navbar from './Navbar'
import useProfile from '../hooks/useProfile'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { profile: profileData, isLoading, error } = useProfile() 

  
  if (isLoading){
    return <div className='text-center py-8'>Loading profile…</div>
  }
  if (error){
    return <div className='text-red-500 py-4'>Error: {error}</div>
  }

  const data = profileData || {}; 
  const profile = data.profile || {}
  const name = profile.fullName || 'Guest User'
  const avatar = profile.avatar || {}
  const email = profile.email || 'No email provided'
  const passportId = profile.passportId || 'No passport ID provided'
  const stats = data.stats || {
    totalTrips: 0,
    completed: 0,
    upcoming: 0,
    saved: 0
  } 
  
  const history = data.history || []
  const statusConfig = {
    completed: { 
    icon: <DoneIcon sx={{color: '#fff', fontSize:32}} className='rounded-full bg-green-600'/>,
    label: 'Completed',
    color: 'green'
  },
    upcoming: { 
    icon: <AccessTimeIcon sx={{color: '#fff', fontSize: 32}} className=' rounded-full bg-orange-600'/>,
    label: 'Upcoming',
    color: 'orange'
  },
    canceled: { 
    icon: <CloseIcon sx={{color: '#fff', fontSize: 32}} className=' rounded-full bg-red-600'/>,
    label: 'Canceled',
    color: 'red'
  }  } 

  
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-x-0 top-0 h-60 bg-blue-600 rounded-b-4xl z-0" />

      {/* CONTENT LAYER */}
      <div className="relative z-10 pb-10">
        <Navbar />

        <div className="pt-10 flex justify-center items-center">
          <div className=' drop-shadow-2xl rounded-4xl bg-white border-gray-300 flex-col  text-center text-black w-95 mt-15 p-4'>
            <img 
                src={avatar.url || 'default-avatar.png'}
                alt={avatar.alt || 'Profile Picture'}
                className="w-32 h-32 border  rounded-full mx-auto "
            />
            <div className='gap-3 flex flex-col mt-5'>
              <h1 className='text-black   text-center text-xl font-bold'>{name}</h1>
              <div className='flex-col py-5 gap-3 flex '>
                <div className='flex gap-1  justify-start '>
                  <MailOutlineIcon sx={{color : '#79716b' ,fontSize:26}} />
                <p className='text-md  text-stone-500 '>
                  Email Adress

                </p>
                </div>
                <div className='border-blue-600 border-2 py-3 px-2 rounded-2xl'>
                  <p className='text-md font-normal text-start text-gray-800'>{email}</p>
                </div>
                <div className='flex gap-1  justify-start '>
                  <CreditCardIcon sx={{color : '#79716b' ,fontSize:26}} />
                <p className='text-md  text-stone-500 '>
                  Passport ID
                </p>
                </div>
                <div className='border-blue-600 border-2 py-3 px-2 rounded-2xl'>
                  <p className='text-md font-semibold text-start text-gray-800'>{passportId}</p>
                </div>
              </div>   
              <div className='border border-gray-400  rounded-2xl'>
                {/*Line*/}
              </div>
              <div>
                <button className='bg-blue-600 text-white w-full text-xl py-3 rounded-2xl'>
                  Edit Profile
                </button>
              </div>           
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full px-4 py-4 mt-6 bg-white">
  <div className="flex gap-4 justify-center items-stretch">
    <div className="text-center border-b-2 flex flex-col gap-3 border-gray-300 rounded-4xl  max-w-xs px-3 py-7 bg-white drop-shadow-2xl">
      <div className="text-lg text-gray-600 flex flex-col items-center gap-2">
        <DoneIcon sx={{color : '#ffff',fontSize:55}} className='border-2 p-2 rounded-full bg-green-600'/>
        Completed
      </div>
      <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
    </div>
    <div className="text-center border-b-2 flex flex-col gap-3 border-gray-300 rounded-4xl flex-1 max-w-xs px-3 py-7 bg-white drop-shadow-2xl">
      <div className="text-lg text-gray-600 flex flex-col items-center gap-2">
        <AccessTimeIcon sx={{color : '#ffff',fontSize:55}} className='border-2 p-2 rounded-full bg-orange-600'/>
        Upcoming
      </div>
      <div className="text-3xl font-bold text-orange-600">{stats.upcoming}</div>
    </div>
    <div className="text-center border-b-2 flex flex-col gap-3 border-gray-300 rounded-4xl flex-1 max-w-xs px-3 py-7 bg-white drop-shadow-2xl">
      <div className="text-lg text-gray-600 flex flex-col items-center gap-2">
        <BookmarkIcon sx={{color : '#ffff',fontSize:55}} className='border-2 p-2 rounded-full bg-purple-600'/>
        Saved
      </div>
      <div className="text-3xl font-bold text-purple-600">{stats.saved}</div>
    </div>
  </div>
</div>
        

        {/* History Section */}
        <div className=" px-2 pb-6 mt-6 mb-10 flex flex-col gap-3">
          <div className='flex justify-between w-full '>
          <h2 className="text-2xl text-black text-start font-semibold mb-4">Trip History</h2>
          <Link className='text-blue-700  text-end font-medium text-lg'>See All</Link>
          </div>
          {history.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg p-4 mb-3 shadow flex justify-between items-center">
              <div>
              <h3 className="font-semibold text-lg text-black">{trip.title}</h3>
              <p className="text-md text-gray-600">{trip.location}</p>
              <p className="text-md text-gray-500">{trip.date}  </p>
              </div>
            <div key={trip.status}>
              <p>
                <p className={` p-2 rounded-[100%]  bg-${statusConfig[trip.status]?.color || 'black'}-600`}>{statusConfig[trip.status]?.icon|| 'Unknown'}</p>
              </p>
            </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile