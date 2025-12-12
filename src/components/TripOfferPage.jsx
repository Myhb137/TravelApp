import React from 'react'
import TripsPageSearch from './TripsPageSearch'
import Navbar from './Navbar'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import TripCard from './TripCard';
import useFetchPackages from '../hooks/useFetchPackages';
import { Link } from 'react-router-dom';

const TripOfferPage = () => {
  const { packages = [] } = useFetchPackages()

  return (
    <div className='h-screen w-screen mx-auto flex flex-col gap-5'>
      <Navbar />
      <TripsPageSearch />

      <div className='mx-auto w-screen flex flex-col gap-3 text-black'>
        
        <h1 className='text-xl text-center font-semibold'>
          Quick Access
        </h1>

        <div className='flex pl-1 mx-auto gap-5 px-4'>
          <button className='border-2 rounded-2xl flex flex-col items-center gap-2 p-3'>
            <AutoFixHighOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3' />
            <p className='text-md'>Custom Trips</p>
          </button>

          <button className='border-2 rounded-2xl flex flex-col items-center gap-2 p-3'>
            <StarBorderOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3' />
            <p className='text-md'>Special Trips</p>
          </button>

          <button className='border-2 rounded-2xl flex flex-col items-center gap-2 p-3'>
            <HikingOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3' />
            <p className='text-md'>Activities</p>
          </button>
        </div>

        {/* Trip cards */}
        
        <div className='w-full px-4  pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5'>
          <div className='w-full  text-start  mx-auto flex justify-between items-center mt-3'>
            <h2 className='text-3xl w-full font-semibold'>
              Latest Trips
            </h2>
            <Link className='text-blue-700 w-full p-1 text-end  font-meduim text-md'>See All</Link>
          </div>
          {packages.length > 0? (
            packages.map((pkg) => (
              <TripCard key={pkg.id} pkg={pkg} />
            ))
          ) : (
            <p className='text-center w-full text-gray-600 col-span-full'>
              Loading trips...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TripOfferPage
