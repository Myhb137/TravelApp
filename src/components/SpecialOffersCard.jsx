import React from 'react'
import { Link } from 'react-router-dom' 

const SpecialOffersCard = ({ pkg }) => {
  if (!pkg) return null

  const image = pkg.images?.[0]?.url
  const title = pkg.title || 'Untitled'
  const location = pkg.location || ''
  const price = pkg.pricing?.displayTotal || 'N/A'

  return (
    <Link to={`/offer/${pkg.id}`} className="block no-underline">
      <div className="flex-shrink-0 w-93 h-60 rounded-[2.5rem] overflow-hidden mx-auto relative  active:scale-95 transition-transform duration-200">
        
        <div className="absolute inset-0 w-full h-full">
          {image && (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover object-center scale-105"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>

        <div className="absolute inset-0 p-8 flex flex-col justify-center z-20 w-[75%]">
          <h3 className="font-black text-2xl text-white leading-tight tracking-tight">
            {title}
          </h3>

          {location && (
            <p className="text-cyan-400 font-bold text-sm uppercase tracking-wider mt-2">
              {location}
            </p>
          )}

          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
              Total Price
            </p>
            <p className="text-2xl font-black text-white mt-1">
              {price}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 rounded-[2.5rem] border-[1.5px] border-white/20 pointer-events-none z-30"></div>
      </div>
    </Link>
  )
}

export default SpecialOffersCard