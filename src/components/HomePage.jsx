import React, { useState, useMemo } from 'react'
import TripCard from './TripCard'
import useFetchPackages from '../hooks/useFetchPackages'
import Search from './Search'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { packages = [], isLoading, error } = useFetchPackages()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    duration: '',
    wilaya: '',
    type: ''
  })

  const filtered = useMemo(() => {
    let results = packages

    // Apply text search filter
    const q = (query || '').trim().toLowerCase()
    if (q) {
      results = results.filter((p) => {
        const title = (p.title || '').toLowerCase()
        const location = (p.location || '').toLowerCase()
        const description = (p.description || '').toLowerCase()
        const details = `${p.details?.duration || ''} ${p.details?.groupSize || ''} ${p.details?.type || ''}`.toLowerCase()
        return title.includes(q) || location.includes(q) || description.includes(q) || details.includes(q)
      })
    }

    // Apply duration filter
    if (filters.duration) {
      results = results.filter((p) => {
        const packageDuration = p.details?.duration || ''
        return packageDuration === filters.duration
      })
    }

    // Apply wilaya filter
    if (filters.wilaya) {
      results = results.filter((p) => {
        const location = (p.location || '').toLowerCase()
        const wilayaLower = filters.wilaya.toLowerCase()
        return location.includes(wilayaLower)
      })
    }

    // Apply type filter
    if (filters.type) {
      results = results.filter((p) => {
        const packageType = p.details?.type || ''
        return packageType === filters.type
      })
    }

    return results
  }, [packages, query, filters])

  return (
    <div className='flex flex-col overflow-x-hidden h-screen w-screen'>
      <main className='px-4 pb-23 pt-10 overflow-y-auto flex-1'>
        <Search 
          value={query} 
          onChange={setQuery} 
          placeholder='Search destinations, locations...'
          filters={filters}
          onFiltersChange={setFilters}
        />

        {isLoading && <div className='text-center py-8'>Loading packages…</div>}
        {error && <div className='text-red-500 py-4'>{error}</div>}
        {!isLoading && !error && filtered.length === 0 && (
          <div className='text-center text-gray-500 py-8'>No results found for "{query}"</div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {filtered.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5, type: 'spring', stiffness: 120 }}
            >
              <TripCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomePage
