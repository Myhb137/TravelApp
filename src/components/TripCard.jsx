import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const TripCard = ({ pkg }) => {
  const favKey = 'travelapp:favorites'
  if (!pkg) return null

  const isAvailable = pkg.available !== false 
  const isSpecial = pkg.special == true
  if (isSpecial) return null

  const [favorite, setFavorite] = useState(() => {
    try {
      const raw = localStorage.getItem(favKey)
      const map = raw ? JSON.parse(raw) : {}
      return Boolean(map && map[pkg.id])
    } catch {
      return false
    }
  })

  const image = pkg.images?.[0]?.url || ''
  const title = pkg.title || 'Untitled'
  const location = pkg.location || ''
  const price = pkg.pricing?.displayTotal || 'N/A'
  const duration = pkg.details?.duration || ''
  const type = pkg.details?.type || ''
  const details = [duration, type].filter(Boolean).join(' | ')

  const toggleFavorite = () => {
    if (!isAvailable) return 
    

    try {
      const raw = localStorage.getItem(favKey)
      const map = raw ? JSON.parse(raw) : {}

      if (map[pkg.id]) {
        delete map[pkg.id]
        setFavorite(false)
      } else {
        map[pkg.id] = true
        setFavorite(true)
      }

      localStorage.setItem(favKey, JSON.stringify(map))
    } catch {
      setFavorite(!favorite)
    }
  }

  return (
    <div
      className={`rounded-3xl w-full mb-3 mx-auto shadow-md overflow-hidden border
        ${isAvailable ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-300 opacity-70'}
      `}
    >
      <div className="relative">

        {image && (
          isAvailable ? (
            <Link to={`/offer/${pkg.id}`}>
              <img
                src={image}
                alt={pkg.images?.[0]?.alt || title}
                className="w-full h-60 object-cover"
              />
            </Link>
          ) : (
            <img
              src={image}
              alt={pkg.images?.[0]?.alt || title}
              className="w-full h-60 object-cover grayscale"
            />
          )
        )}

        {/* Unavailable Badge */}
        {!isAvailable && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
            Unavailable
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          disabled={!isAvailable}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center
            ${isAvailable ? 'bg-white/80 hover:scale-105' : 'bg-gray-300 cursor-not-allowed'}
            transition-transform`}
        >
          <BookmarkIcon sx={{ color: favorite ? '#3b82f6' : '#6b7280' }} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {isAvailable ? (
            <Link to={`/offer/${pkg.id}`} className="hover:underline">
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </h3>

        <p className="text-sm text-gray-600">{location}</p>

        {details && (
          <p className="text-xs text-gray-500 mt-2">{details}</p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">{price}</span>
          <span className="text-sm text-yellow-500">
            {pkg.rating ? `${pkg.rating} ★` : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TripCard
