import React, { useState, useMemo } from 'react'
import TripCard from './TripCard'
import SpecialOffersCard from './SpecialOffersCard'
import useFetchPackages from '../hooks/useFetchPackages'
import Search from './Search'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { packages = [], isLoading, error } = useFetchPackages()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    duration: '',
    wilaya: '',
    type: ''
  })

  const { specials, regulars } = useMemo(() => {
    let results = packages

    // 1. Apply Search and Filters
    const q = (query || '').trim().toLowerCase()
    if (q) {
      results = results.filter((p) => {
        const title = (p.title || '').toLowerCase()
        const location = (p.location || '').toLowerCase()
        const description = (p.description || '').toLowerCase()
        const details = `${p.details?.duration || ''} ${p.details?.type || ''}`.toLowerCase()
        return title.includes(q) || location.includes(q) || description.includes(q) || details.includes(q)
      })
    }

    if (filters.duration) results = results.filter((p) => p.details?.duration === filters.duration)
    if (filters.type) results = results.filter((p) => p.details?.type === filters.type)
    if (filters.wilaya) {
      results = results.filter((p) => (p.location || '').toLowerCase().includes(filters.wilaya.toLowerCase()))
    }

    // 2. SPLIT the data: Specials vs Regulars
    return {
      specials: results.filter(pkg => pkg.special === true),
      regulars: results.filter(pkg => !pkg.special)
    }
  }, [packages, query, filters])

  return (
    <div className='flex flex-col overflow-x-hidden h-screen w-screen bg-gray-50'>
      <main className='px-4 pb-24 pt-10 overflow-y-auto flex-1'>
        <Search 
          value={query} 
          onChange={setQuery} 
          placeholder='Search destinations...'
          filters={filters}
          onFiltersChange={setFilters}
        />

        {isLoading && <div className='text-center py-8'>Loading packages...</div>}
        {error && <div className='text-red-500 py-4 text-center'>{error}</div>}

        {/* 1. Horizontal Specials Section */}
        {specials.length > 0 && (
          <div className='mt-8'>
            <h1 className='text-black text-xl font-bold mb-4 px-1'>Exclusive Deals</h1>
            <div className='flex gap-4 overflow-x-auto no-scrollbar py-2 snap-x'>
              {specials.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  className='snap-center'
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SpecialOffersCard pkg={pkg} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Vertical Recommended Section */}
        <div className='mt-8'>
          <h1 className='text-black text-xl font-bold mb-4 px-1'>Recommended for You</h1>
          {regulars.length === 0 && !isLoading && (
            <div className='text-center text-gray-400 py-10'>No trips found</div>
          )}
          <div className='grid grid-cols-1 gap-4'>
            {regulars.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <TripCard pkg={pkg} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage