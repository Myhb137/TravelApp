import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'

const Search = ({ value = '', onChange = () => {}, placeholder = 'Search destinations, locations...', onFilterClick = () => {} }) => {
  return (
    <div className='w-full overflow-x-hidden  mx-auto mt-6 mb-7 p-1 overflow-hidden'>
      <label htmlFor='site-search' className='sr-only'>Search packages</label>
      <div className='bg-white border border-gray-200  rounded-4xl shadow-md px-3 py-3 flex items-center gap-3'>
        <div className='text-gray-500 flex  '>
          <SearchIcon sx={{ fontSize: 28 }} />
        </div>

        <input
          id='site-search'
          type='search'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='flex-1 text-base text-black bg-transparent  placeholder-gray-400 border-0 focus:outline-none'
          aria-label='Search packages'
        />

        <button
          type='button'
          onClick={onFilterClick}
          aria-label='Open filters'
          className='bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors flex items-center justify-center'
        >
          <TuneIcon sx={{ fontSize: 18, color: 'white' }} />
        </button>
      </div>
    </div>
  )
}

export default Search
