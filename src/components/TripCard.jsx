import { useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark';

const TripCard = ({ pkg }) => {
  const favKey = 'travelapp:favorites'

  const [favorite, setFavorite] = useState(() => {
    try {
      const raw = localStorage.getItem(favKey)
      const map = raw ? JSON.parse(raw) : {}
      return Boolean(map && map[pkg?.id])
    } catch {
      return false
    }
  })

  if (!pkg) return null

  const image = pkg.images?.[0]?.url || ''
  const title = pkg.title || 'Untitled'
  const location = pkg.location || ''
  const price = pkg.pricing?.displayTotal || 'N/A'
  const duration = pkg.details?.duration || ''
  const groupSize = pkg.details?.groupSize || ''
  const type = pkg.details?.type || ''
  const details = [duration, groupSize, type].filter(Boolean).join(' | ')

  const toggleFavorite = () => {
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
    <div className="rounded-3xl w-full mb-3 bg-white mx-auto shadow-md overflow-hidden border border-gray-200">
      <div className="relative">

        {image && (
          <Link to={`/offer/${pkg.id}`} className="block">
            <img
              src={image}
              alt={pkg.images?.[0]?.alt || title}
              className="w-full h-60 object-cover block"
            />
          </Link>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm hover:scale-105 transition-transform"
        >
          {favorite ? (
            <BookmarkIcon sx={{ color: '#3b82f6' }} />
          ) : (
            <BookmarkIcon sx={{ color: '#6b7280' }} />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link to={`/offer/${pkg.id}`} className="hover:underline">
            {title}
          </Link>
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
