import { useMemo, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchPackages from '../hooks/useFetchPackages'
import { useTranslation } from 'react-i18next'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark';

import StarIcon from '@mui/icons-material/Star'
import LocationOnIcon from '@mui/icons-material/LocationOn'
// Icons for Details Tiles
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
// Icons for Amenities
import WifiIcon from '@mui/icons-material/Wifi'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import PoolIcon from '@mui/icons-material/Pool'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing'
import SpaIcon from '@mui/icons-material/Spa'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'

const OfferDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { packages, isLoading } = useFetchPackages()

  const pkg = useMemo(() => {
    if (!packages) return null
    return packages.find((p) => p.id === id) || null
  }, [packages, id])

  const detailsRef = useRef(null)
  const favKey = 'travelapp:favorites'
  const [favorite, setFavorite] = useState(() => {
    try {
      const raw = localStorage.getItem(favKey)
      const map = raw ? JSON.parse(raw) : {}
      return Boolean(map && map[id])
    } catch {
      return false
    }
  })

  const toggleFavorite = () => {
    try {
      const raw = localStorage.getItem(favKey)
      const map = raw ? JSON.parse(raw) : {}
      if (map[id]) {
        delete map[id]
        setFavorite(false)
      } else {
        map[id] = true
        setFavorite(true)
      }
      localStorage.setItem(favKey, JSON.stringify(map))
    } catch {
      setFavorite((s) => !s)
    }
  }

  if (isLoading) return <div className='p-6 text-center'>{t('loading')}</div>
  if (!pkg) return <div className='p-6 text-center'>{t('offer_not_found')}</div>

  const image = pkg.images?.[0]?.url
  const title = pkg.title
  const location = pkg.location
  const rating = pkg.rating
  const priceTotal = pkg.pricing?.displayTotal || pkg.pricing?.displayPerPerson || ''
  const duration = pkg.details?.duration
  const description = pkg.description
  const groupSize = pkg.details?.places
  const type = pkg.details?.type

  return (
    // Added pb-24 to the main container to ensure content is visible above the fixed nav bar
    <div className='bg-gray-50 overflow-auto pb-24'>
      <div className='relative'>
        <div className='h-96 w-full relative'> {/* Container for image to handle height */}
          {image && <img src={image} alt={pkg.images[0]?.alt || title} className='w-full h-full absolute object-cover' />}
        </div>

        {/* Back Button */}
        <div className='absolute top-10 left-4 z-20'>
          <button
            onClick={() => navigate(-1)}
            className='w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow'
          >
            <div className={i18n.language === 'ar' ? 'rotate-180' : ''}>
              <ArrowBackIosNewIcon sx={{ fontSize: 20, color: 'gray' }} />
            </div>
          </button>
        </div>

        {/* Favorite Button (Icons increased size) */}
        <button
          onClick={toggleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className='absolute top-10 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow z-20'
        >
          {favorite ? <BookmarkIcon sx={{ color: '#3b82f6', fontSize: 24 }} /> : <BookmarkIcon sx={{ color: '#374151', fontSize: 24 }} />}
        </button>


      </div>

      {/* Details card content (Overlapping the image) */}
      <div className='-mt-8 relative mx-auto z-10 px-3 py-5 bg-white rounded-2xl text-black'>
        {/* Title, Rating, Location */}
        <div className='flex items-center justify-between '>
          <h1 className=' text-xl font-semibold text-start'>{title}</h1>
          <p>
            <span className='text-xl p-2 text-yellow-500'>{rating}★</span>
          </p>
        </div>
        <div>
          <div className='flex items-center gap-2 mt-2'>
            <LocationOnIcon sx={{ fontSize: 20, color: 'gray' }} />
            <span className='text-gray-600 text-sm'>{location}</span>
          </div>
        </div>

        {/* Details tiles for duration, places, type (Icons increased size) */}
        <div className='grid grid-cols-3 gap-3 mt-4'>
          <div className='bg-gray-50 rounded-lg p-3 text-center flex flex-col items-center'>
            <AccessTimeIcon sx={{ fontSize: 24, color: '#2563eb', marginBottom: '4px' }} />
            <div className='text-xs text-gray-600'>{t('duration')}</div>
            <div className='text-sm font-medium'>{duration}</div>
          </div>
          <div className='bg-gray-50 rounded-lg p-3 text-center flex flex-col items-center'>
            <PeopleAltIcon sx={{ fontSize: 24, color: '#2563eb', marginBottom: '4px' }} />
            <div className='text-xs text-gray-600'>{t('places_left')}</div>
            <div className='text-sm font-medium'>{groupSize}</div>
          </div>
          <div className='bg-gray-50 rounded-lg p-3 text-center flex flex-col items-center'>
            <LocalActivityIcon sx={{ fontSize: 24, color: '#2563eb', marginBottom: '4px' }} />
            <div className='text-xs text-gray-600'>{t('type')}</div>
            <div className='text-sm font-medium'>{type}</div>
          </div>
        </div>

        {/* Description */}
        <div className='mt-6 flex flex-col gap-3' ref={detailsRef}>
          <h3 className='text-xl font-medium'>
            {t('description')} :
          </h3>
          <p className='text-gray-700 leading-relaxed'>
            {description}
          </p>
        </div>

        {/* Amenities section (Icons and containers increased size) */}
        <div className='mt-6 bg-white rounded-2xl p-4'>
          <h4 className='text-sm font-semibold mb-3'>{t('amenities')}</h4>
          <div className='grid grid-cols-3 gap-3'>
            {(() => {
              const flags = pkg.amenitiesFlags || null
              const ICON_MAP = {
                wifi: WifiIcon,
                breakfast: FreeBreakfastIcon,
                restaurant: RestaurantIcon,
                pool: PoolIcon,
                beachAccess: BeachAccessIcon,
                airConditioning: AcUnitIcon,
                skiEquipment: DownhillSkiingIcon,
                spa: SpaIcon,
                heating: WhatshotIcon,
                transport: DirectionsCarIcon
              }

              if (flags) {
                return Object.entries(flags)
                  .filter(([, v]) => Boolean(v))
                  .map(([key]) => {
                    const IconComp = ICON_MAP[key] || WifiIcon
                    return (
                      <div key={key} className='flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-3'>
                        <div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600'>
                          <IconComp sx={{ fontSize: 24 }} />
                        </div>
                        <div className='text-xs text-gray-700 text-center'>{t(`amenity_${key}`, key)}</div>
                      </div>
                    )
                  })
              }

              // Fallback for amenities array
              return pkg.amenities?.map((a) => (
                <div key={a.name} className='flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-3'>
                  <div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg'>
                    🔹
                  </div>
                  <div className='text-xs text-gray-700 text-center'>{a.name}</div>
                </div>
              ))
            })()}
          </div>
        </div>


        <div className='mt-6 bg-white flex-col  gap-7 rounded-2xl p-4 shadow-sm border border-gray-100'>
          <h4 className='text-xl font-medium pb-5 text-gray-900 '>{t('trip_highlights')}</h4>
          <div className='space-y-4'>
            {pkg.itinerary?.map((it) => (
              <div key={it.day} className='flex items-start gap-3'>

                <div className='flex w-8 h-8 rounded-full bg-blue-600 text-white  items-center justify-center text-sm font-semibold mt-0.5'>
                  {it.day}
                </div>
                {/* Highlight details */}
                <div className='flex-1'>
                  <div className='text-base font-semibold text-gray-900'>{it.title}</div>
                  <div className='text-sm text-gray-600'>{it.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Added some space at the bottom of the main content */}
        <div className="h-4"></div>
      </div>

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <div className='fixed bottom-0 left-0 right-0 z-50  shadow-2xl p-4'>
        <div className='max-w-3xl mx-auto flex items-center justify-between bg-blue-600 to-indigo-600 text-white rounded-xl p-4'>
          <div>
            <div className='text-sm font-medium opacity-90'>{t('total_price')}</div>
            <div className='text-2xl font-bold'>{priceTotal}</div>
          </div>
          <button className='bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow'>
            {t('book_now')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OfferDetails