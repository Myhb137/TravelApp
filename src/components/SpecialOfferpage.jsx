import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import useFetchPackages from '../hooks/useFetchPackages'
import SpecialOffersCard from './SpecialOffersCard'

const SpecialOfferpage = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { packages = [], isLoading, error } = useFetchPackages()

  const specials = useMemo(() => {
    return packages.filter(pkg => pkg.special === true)
  }, [packages])

  // Variants copied from CustomOffre for consistency
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className='flex flex-col overflow-x-hidden h-screen w-screen gap-10 bg-white'>
      {/* Header - Matching CustomOffre Design */}
      <motion.div
        className='w-full px-4 fixed bg-white border-b-2 pt-12 pb-8 border-gray-200 drop-shadow-2xl rounded-b-3xl z-50 top-0'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
      >
        <div className='w-full flex justify-between items-start mb-4'>
          <button
            onClick={() => navigate(-1)}
            className='p-2 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition-colors'
          >
            <div className={i18n.language === 'ar' ? 'rotate-180' : ''}>
              <ArrowBackIosNewIcon sx={{ color: "#4a5565", fontSize: 24 }} />
            </div>
          </button>
        </div>
        <div className='w-full flex flex-col gap-2 px-2'>
          <h1 className='text-black text-center text-3xl font-bold'>{t('special_offers')}</h1>
          <p className='text-gray-500 text-center text-lg'>{t('exclusive_deals_subtitle')}</p>
        </div>
      </motion.div>

      {/* Main Content Sections */}
      <div className='flex flex-col gap-8 px-4 py-8 mt-56 pb-32 w-full'>

        {/* Loading / Error / Empty States */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className='flex flex-col items-center justify-center py-20'
            >
              <div className='w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
              <p className='mt-4 text-gray-500 font-medium'>{t('loading_best_deals')}</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className='text-red-500 py-10 text-center bg-red-50 rounded-3xl border border-red-100 mx-auto w-full max-w-md'
            >
              <p className='font-medium'>{t('unable_to_load_offers')}</p>
              <p className='text-sm mt-1'>{error}</p>
            </motion.div>
          )}

          {!isLoading && specials.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className='text-center py-20'
            >

              <h3 className='text-2xl font-bold text-gray-800'>{t('no_special_offers')}</h3>
              <p className='text-gray-500 mt-2 text-lg'>{t('check_back_later')}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Offers Grid/List */}
        <div className='flex flex-col gap-6'>
          {specials.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              className='transform transition-transform'
            >
              <SpecialOffersCard pkg={pkg} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SpecialOfferpage