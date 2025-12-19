import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'

const Search = ({ 
  value = '', 
  onChange = () => {}, 
  placeholder = 'Search destinations, locations...', 
  filters = {},
  onFiltersChange = () => {}
}) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState({
    duration: filters.duration || '',
    wilaya: filters.wilaya || '',
    type: filters.type || ''
  })

  const durations = ['3 Days', '5 Days', '7 Days', '10 Days', '14 Days', 'All']
  const wilayas = [
    'Adrar',
    'Chlef',
    'Laghouat',
    'Oum El Bouaghi',
    'Batna',
    'Béjaïa',
    'Biskra',
    'Béchar',
    'Blida',
    'Bouira',
    'Tamanrasset',
    'Tébessa',
    'Tlemcen',
    'Tiaret',
    'Tizi Ouzou',
    'Alger (Algiers)',
    'Djelfa',
    'Jijel',
    'Sétif',
    'Saïda',
    'Skikda',
    'Sidi Bel Abbès',
    'Annaba',
    'Guelma',
    'Constantine',
    'Médéa',
    'Mostaganem',
    'M\'Sila',
    'Mascara',
    'Ouargla',
    'Oran',
    'El Bayadh',
    'Illizi',
    'Bordj Bou Arréridj',
    'Boumerdès',
    'El Tarf',
    'Tindouf',
    'Tissemsilt',
    'El Oued',
    'Khenchela',
    'Souk Ahras',
    'Tipaza',
    'Mila',
    'Aïn Defla',
    'Naâma',
    'Aïn Témouchent',
    'Ghardaïa',
    'Relizane',
    'Timimoun',
    'Bordj Badji Mokhtar',
    'Ouled Djellal',
    'Béni Abbès',
    'In Salah',
    'In Guezzam',
    'Touggourt',
    'Djanet',
    'El M\'Ghair',
    'El Menia',
    'All'
  ]
  const types = ['Beach', 'Mountain', 'Desert', 'City', 'Cultural', 'Adventure', 'All']

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value === 'All' ? '' : value }
    setLocalFilters(newFilters)
  }

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    setFilterOpen(false)
  }

  const handleResetFilters = () => {
    const resetFilters = { duration: '', wilaya: '', type: '' }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const hasActiveFilters = localFilters.duration || localFilters.wilaya || localFilters.type

  return (
    <>
      <div className='w-full overflow-x-hidden mx-auto mt-6 mb-7 p-1 overflow-hidden'>
        <label htmlFor='site-search' className='sr-only'>Search packages</label>
        <div className='bg-white border border-gray-200 rounded-4xl shadow-md px-3 py-3 flex items-center gap-3'>
          <div className='text-gray-500 flex'>
            <SearchIcon sx={{ fontSize: 28 }} />
          </div>

          <input
            id='site-search'
            type='search'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className='flex-1 text-base text-black bg-transparent placeholder-gray-400 border-0 focus:outline-none'
            aria-label='Search packages'
          />

          <motion.button
            type='button'
            onClick={() => setFilterOpen(true)}
            aria-label='Open filters'
            className={`p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors flex items-center justify-center relative ${
              hasActiveFilters 
                ? 'bg-blue-700 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TuneIcon sx={{ fontSize: 18, color: 'white' }} />
            {hasActiveFilters && (
              <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white'></span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {filterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 bg-black/60 z-[9999]'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
            />

            {/* Filter Modal */}
            <motion.div
              className='fixed inset-0 flex items-end justify-center z-[10000] p-4'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='bg-white w-full max-w-md rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto'>
                {/* Header */}
                <div className='sticky top-0 bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between rounded-t-3xl'>
                  <h2 className='text-2xl font-bold text-black'>Filters</h2>
                  <motion.button
                    onClick={() => setFilterOpen(false)}
                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CloseIcon sx={{ fontSize: 24, color: '#4a5565' }} />
                  </motion.button>
                </div>

                {/* Filter Content */}
                <div className='p-6 space-y-6'>
                  {/* Duration Filter */}
                  <div>
                    <h3 className='text-lg font-semibold text-black mb-3'>Duration</h3>
                    <div className='grid grid-cols-3 gap-2'>
                      {durations.map((duration) => (
                        <motion.button
                          key={duration}
                          onClick={() => handleFilterChange('duration', duration)}
                          className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                            localFilters.duration === duration || (duration === 'All' && !localFilters.duration)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-black border-gray-300 hover:border-blue-300'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {duration}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Wilaya Filter */}
                  <div>
                    <h3 className='text-lg font-semibold text-black mb-3'>Wilaya</h3>
                    <select
                      value={localFilters.wilaya || 'All'}
                      onChange={(e) => handleFilterChange('wilaya', e.target.value)}
                      className='w-full p-3 border-2 border-gray-300 rounded-xl text-black bg-white focus:outline-none focus:border-blue-500 transition-all duration-200 text-base font-medium appearance-none cursor-pointer'
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5565' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem'
                      }}
                    >
                      {wilayas.map((wilaya) => (
                        <option key={wilaya} value={wilaya === 'All' ? '' : wilaya}>
                          {wilaya}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <h3 className='text-lg font-semibold text-black mb-3'>Type</h3>
                    <div className='grid grid-cols-3 gap-2'>
                      {types.map((type) => (
                        <motion.button
                          key={type}
                          onClick={() => handleFilterChange('type', type)}
                          className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                            localFilters.type === type || (type === 'All' && !localFilters.type)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-black border-gray-300 hover:border-blue-300'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className='sticky bottom-0 bg-white border-t-2 border-gray-200 p-4 flex gap-3 rounded-b-3xl'>
                  <motion.button
                    onClick={handleResetFilters}
                    className='flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={handleApplyFilters}
                    className='flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Search
