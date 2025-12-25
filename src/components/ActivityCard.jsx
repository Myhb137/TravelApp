import React from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const ActivityCard = ({ pkg }) => {
    if (!pkg) return null

    const isAvailable = pkg.available !== false

    // Extract data using safe navigation similar to TripCard/SpecialOffersCard
    const image = pkg.images?.[0]?.url || ''
    const title = pkg.title || 'Untitled'
    const location = pkg.location || ''
    const price = pkg.pricing?.displayTotal || 'N/A'
    const rating = pkg.rating || 'N/A'
    const duration = pkg.details?.duration || ''

    const CardContent = () => (
        <>
            {/* Image Section */}
            <div className='h-28 w-28 flex-shrink-0 relative'>
                {image && (
                    <img
                        src={image}
                        alt={pkg.images?.[0]?.alt || title}
                        className={`h-full w-full object-cover rounded-[1.5rem] ${!isAvailable ? 'grayscale' : ''}`}
                    />
                )}
                {!isAvailable && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full z-10">
                        Closed
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className='flex-1 flex flex-col justify-center gap-1'>
                <h3 className='font-bold text-gray-900 text-lg leading-tight line-clamp-2'>
                    {title}
                </h3>

                <p className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
                    {location}
                </p>

                <div className='flex items-center gap-3 mt-2'>
                    <div className='flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg'>
                        <StarIcon sx={{ fontSize: 14, color: '#F59E0B' }} />
                        <span className='text-xs font-bold text-yellow-700'>{rating}</span>
                    </div>

                    <div className='flex items-center gap-1 text-gray-400'>
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        <span className='text-xs'>{duration}</span>
                    </div>
                </div>

                <div className='mt-1 text-blue-600 font-black text-lg'>
                    {price}
                </div>
            </div>

            {/* Action Button */}
            <div className='flex-shrink-0 pr-2'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                    ${isAvailable ? 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}>
                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </div>
            </div>
        </>
    )

    const containerClasses = `rounded-[2rem] p-3 shadow-lg border flex gap-4 items-center mb-4 relative group
        ${isAvailable ? 'bg-white border-gray-100 hover:shadow-xl transition-shadow cursor-pointer' : 'bg-gray-100 border-gray-300 opacity-80'}
    `

    if (isAvailable) {
        return (
            <Link to={`/offer/${pkg.id}`} className={containerClasses}>
                <CardContent />
            </Link>
        )
    }

    return (
        <div className={containerClasses}>
            <CardContent />
        </div>
    )
}

export default ActivityCard
