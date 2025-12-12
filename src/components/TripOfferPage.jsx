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
            <AutoFixHighOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3 border-3 rounded-[100%] ' />
            <p className='text-md'>Custom Trips</p>
          </button>

          <button className='border-2 rounded-2xl flex flex-col items-center gap-2 p-3'>
            <StarBorderOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3 border-3 rounded-[100%]' />
            <p className='text-md'>Special Trips</p>
          </button>

          <button className='border-2 rounded-2xl flex flex-col items-center gap-2 p-3'>
            <HikingOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3 border-3 rounded-[100%]' />
            <p className='text-md'>Activities</p>
          </button>
        </div>

        {/* Trip cards */}
        
        <div className='w-screen px-1 pb-30 mt-5'>
          <div className='w-full flex px-2 justify-between items-center mb-4'>
            <h2 className='text-3xl font-semibold'>
              Latest Trips
            </h2>
            <Link className='text-blue-700 font-medium text-md'>See All</Link>
          </div>
          
          <div className='overflow-x-auto w-full pr-2 '>
            <div className='flex w-full gap-4 px-2 pr-1 '>
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <div key={pkg.id} className='flex-shrink-0 w-64 h-fit'>
                    <TripCard pkg={pkg}/>
                  </div>
                ))
              ) : (
                <p className='text-center w-full text-gray-600'>
                  Loading trips...
                </p>
              )}
            </div>
          </div>
        </div>

          </div>
        </div>

  )
}

export default TripOfferPage
