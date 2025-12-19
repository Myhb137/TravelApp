import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'

const Navbar = () => {
  const location = useLocation()
  
  // Pages where navbar should not render
  const hiddenRoutes = [
    '/offer/',
    '/custom-offer',
    '/all-trips'
  ]
  
  // Check if current route should hide navbar
  const shouldHide = hiddenRoutes.some(route => location.pathname.startsWith(route))
  
  if (shouldHide) {
    return null
  }

  return (
    <header className='fixed bottom-5 w-full z-30 h-fit bg-transparent'>
      <nav
        className='mx-auto w-70 backdrop-blur-md  border-gray-400/30 border-2 rounded-4xl'
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
      >
        <div className='max-w-full  mx-auto px-4 py-2'>
          <div className='flex items-center justify-around'>

            {/* Home */}
            <NavLink
              to="/"
              end
              className="flex flex-col items-center gap"
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
