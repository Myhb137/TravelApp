import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TripCard from './TripCard'
import useFetchPackages from '../hooks/useFetchPackages'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const AllTripsPage = () => {
  const { packages = [], isLoading } = useFetchPackages()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <motion.div 
      className='h-screen w-screen flex flex-col overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className='w-full px-4 py-4 bg-white border-b-2 border-gray-200'>
        <div className='flex items-center gap-4 mb-2'>
          <Link 
            to="/trips" 
            className='p-2 border-2 border-gray-600 rounded-full hover:bg-gray-100 transition-colors'
          >
            <ArrowBackIosNewIcon sx={{ color: "#4a5565", fontSize: 24 }} />
          </Link>
          <h1 className='text-2xl font-bold text-black'>
            Latest Trips
          </h1>
        </div>
        <p className='text-sm text-gray-500 ml-14'>
          Explore all available trips
        </p>
      </div>

      {/* Trips Grid */}
      <div className='flex-1 overflow-y-auto px-4 py-6'>
        {isLoading ? (
          <motion.div 
            className='text-center py-12'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className='text-gray-600 text-lg'>Loading trips...</p>
          </motion.div>
        ) : packages.length > 0 ? (
          <motion.div 
            className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <TripCard pkg={pkg} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className='text-center py-12'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className='text-gray-600 text-lg'>No trips available</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default AllTripsPage

