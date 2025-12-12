import React, { useState, useMemo } from 'react'
import TripCard from './TripCard'
import useFetchPackages from '../hooks/useFetchPackages'
import Search from './Search'
import Navbar from './Navbar'

const HomePage = () => {
  const { packages = [], isLoading, error } = useFetchPackages()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase()
    if (!q) return packages
    return packages.filter((p) => {
      const title = (p.title || '').toLowerCase()
      const location = (p.location || '').toLowerCase()
      const description = (p.description || '').toLowerCase()
      const details = `${p.details?.duration || ''} ${p.details?.groupSize || ''} ${p.details?.type || ''}`.toLowerCase()
      return title.includes(q) || location.includes(q) || description.includes(q) || details.includes(q)
    })
  }, [packages, query])

  return (
    <div className='flex flex-col  overflow-x-hidden h-screen w-screen'>
      
      <Navbar></Navbar>

      <main className='mt- p-4 overflow-y-auto mb-26 flex-1'>
        <Search value={query} onChange={setQuery} placeholder='Search destinations, locations...'/>

        {isLoading && <div className='text-center py-8'>Loading packages…</div>}
        {error && <div className='text-red-500 py-4'>{error}</div>}

        {!isLoading && !error && filtered.length === 0 && (
          <div className='text-center text-gray-500 py-8'>No results found for "{query}"</div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {filtered.map((pkg) => (
            <TripCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomePage