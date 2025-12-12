import React from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'

const Navbar = () => {
  return (
    <header className='fixed bottom-0 w-full z-30 h-fit'>
      <nav
        className='mx-auto w-full backdrop-blur-md bg-white/60 border-gray-400/30 border-2 rounded-t-2xl'
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
      >
        <div className='max-w-full  mx-auto px-4 py-3'>
          <div className='flex items-center justify-around'>

            {/* Home */}
            <NavLink
              to="/"
              end
              className="flex flex-col items-center gap-1"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={
                      isActive
                        ? 'w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md'
                        : 'w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center'
                    }
                  >
                    <HomeIcon sx={{ fontSize: 24 }} />
                  </div>
                  <span
                    className={
                      isActive
                        ? 'text-blue-600 text-xs font-medium'
                        : 'text-gray-500 text-xs'
                    }
                  >
                    Home
                  </span>
                </>
              )}
            </NavLink>

            {/* Trips */}
            <NavLink
              to="/trips"
              className="flex flex-col items-center gap-1"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={
                      isActive
                        ? 'w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md'
                        : 'w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center'
                    }
                  >
                    <FlightTakeoffIcon sx={{ fontSize: 24 }} />
                  </div>
                  <span
                    className={
                      isActive
                        ? 'text-blue-600 text-xs font-medium'
                        : 'text-gray-500 text-xs'
                    }
                  >
                    Trips
                  </span>
                </>
              )}
            </NavLink>

            {/* Profile */}
            <NavLink
              to="/profile"
              className="flex flex-col items-center gap-1"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={
                      isActive
                        ? 'w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md'
                        : 'w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center'
                    }
                  >
                    <PersonSharpIcon sx={{ fontSize: 24 }} />
                  </div>
                  <span
                    className={
                      isActive
                        ? 'text-blue-600 text-xs font-medium'
                        : 'text-gray-500 text-xs'
                    }
                  >
                    Profile
                  </span>
                </>
              )}
            </NavLink>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
