import React, { useState, useMemo } from 'react'
import Search from './Search'
import useFetchPackages from '../hooks/useFetchPackages'
import TripCard from './TripCard'
import { motion, AnimatePresence } from 'framer-motion'

const TripsPageSearch = () => {
  const { packages = [], isLoading, error } = useFetchPackages()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase()
    if (!q) return []

    return packages.filter((p) => {
      const title = (p.title || '').toLowerCase()
      const location = (p.location || '').toLowerCase()
      const description = (p.description || '').toLowerCase()
      const details = `${p.details?.duration || ''} ${p.details?.groupSize || ''} ${p.details?.type || ''}`.toLowerCase()

      return (
        title.includes(q) ||
        location.includes(q) ||
        description.includes(q) ||
        details.includes(q)
      )
    })
  }, [packages, query])

  return (
    <div>
      <main className="bg-blue-600 rounded-b-3xl overflow-y-auto  flex-1 overflow-x-hidden">
        {/* SEARCH AREA */}
        <div className="w-full px-4 pt-6 pb-4 bg-blue-600 abolute top-0 z-20">
          <Search
            value={query}
            onChange={setQuery}
            placeholder="Search places or experiences…"
          />

          {isLoading && <div className="text-center py-4 text-white/80">Loading…</div>}
          {error && <div className="text-red-300 py-2">{error}</div>}
        </div>

        {/* RESULTS AREA – independent animation */}
        <div className="px-4 mt-2">
          {!isLoading && !error && query.trim() !== '' && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-200 py-8"
            >
              No results found for "{query}"
            </motion.div>
          )}

          <AnimatePresence>
            {query.trim() !== '' && filtered.length > 0 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <TripCard pkg={pkg} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

    </div>
  )
}

export default TripsPageSearch
