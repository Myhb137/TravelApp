import React from 'react'
import TripsPageSearch from './TripsPageSearch'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import TripCard from './TripCard';
import useFetchPackages from '../hooks/useFetchPackages';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TripOfferPage = () => {
  const { packages = [] } = useFetchPackages()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const quickAccessVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }
    })
  }

  return (
    <motion.div 
      className='h-screen w-screen mx-auto flex flex-col gap-5'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <TripsPageSearch />

      <motion.div 
        className='mx-auto w-screen flex flex-col gap-3 text-black'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className='text-xl text-center font-semibold'
          variants={itemVariants}
        >
          Quick Access
        </motion.h1>

        <motion.div 
          className='flex pl-1 mx-auto gap-5 px-4'
          variants={containerVariants}
        >
          <motion.div
            variants={quickAccessVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/custom-offer" className='rounded-2xl flex flex-col items-center gap-2 p-3 transition-all duration-200 hover:bg-gray-50'>
              <AutoFixHighOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3 border-3 rounded-[100%] transition-transform duration-200' />
              <p className='text-md'>Custom Trips</p>
            </Link>
          </motion.div>

          <motion.div
            variants={quickAccessVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className='border-2 rounded-2xl flex flex-col items-center gap-2 p-3 transition-all duration-200 hover:bg-gray-50'>
              <StarBorderOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3 border-3 rounded-[100%] transition-transform duration-200' />
              <p className='text-md'>Special Trips</p>
            </button>
          </motion.div>

          <motion.div
            variants={quickAccessVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className='border-2 rounded-2xl flex flex-col items-center gap-2 p-3 transition-all duration-200 hover:bg-gray-50'>
              <HikingOutlinedIcon sx={{ fontSize: 60, color: '#0046A8' }} className='p-3 border-3 rounded-[100%] transition-transform duration-200' />
              <p className='text-md'>Activities</p>
            </button>
          </motion.div>
        </motion.div>

        {/* Trip cards */}
        
        <motion.div 
          className='w-screen px-1 pb-30 mt-5'
          variants={itemVariants}
        >
          <motion.div 
            className='w-full flex px-2 justify-between items-center mb-4'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className='text-3xl font-semibold'>
              Latest Trips
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/all-trips" 
                className='text-blue-700 font-medium text-md transition-colors duration-200 hover:text-blue-900'
              >
                See All
              </Link>
            </motion.div>
          </motion.div>
          
          <div className='overflow-x-auto w-full pr-2'>
            <div className='flex w-full gap-4 px-2 pr-1'>
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <motion.div 
                    key={pkg.id} 
                    className='flex-shrink-0 w-64 h-fit'
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TripCard pkg={pkg}/>
                  </motion.div>
                ))
              ) : (
                <motion.p 
                  className='text-center w-full text-gray-600'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Loading trips...
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>

  )
}

export default TripOfferPage
