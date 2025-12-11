import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'

const Navbar = () => {
  const [active, setActive] = useState('home')

  return (
    <header className='fixed bottom-0 w-full z-30'>
      <nav className='mx-auto w-full backdrop-blur-md bg-white/60 border-t border-white/30' style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
        <div className='max-w-3xl mx-auto px-4 py-5'>
          <div className='flex items-center justify-around'>
            {/* Home */}
            <button
              onClick={() => setActive('home')}
              aria-pressed={active === 'home'}
              className='flex flex-col items-center gap-1'
            >
              <div className={active === 'home' ? 'w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md' : 'w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center'}>
                <HomeIcon sx={{ fontSize: 30 }} />
              </div>
              <span className={active === 'home' ? 'text-blue-600 text-xs font-medium' : 'text-gray-500 text-xs'}>Home</span>
            </button>

            {/* Trips */}
            <button
              onClick={() => setActive('trips')}
              aria-pressed={active === 'trips'}
              className='flex flex-col items-center gap-1'
            >
              <div className={active === 'trips' ? 'w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md' : 'w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center'}>
                <FlightTakeoffIcon sx={{ fontSize: 30 }} />
              </div>
              <span className={active === 'trips' ? 'text-blue-600 text-xs font-medium' : 'text-gray-500 text-xs'}>Trips</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => setActive('profile')}
              aria-pressed={active === 'profile'}
              className='flex flex-col items-center gap-1'
            >
              <div className={active === 'profile' ? 'w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md' : 'w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center'}>
                <PersonSharpIcon sx={{ fontSize: 30 }} />
              </div>
              <span className={active === 'profile' ? 'text-blue-600 text-xs font-medium' : 'text-gray-500 text-xs'}>Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
