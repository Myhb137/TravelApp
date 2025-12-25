import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import SearchIcon from '@mui/icons-material/Search'
import ActivityCard from './ActivityCard'
import useFetchPackages from '../hooks/useFetchPackages'

const ActivitiesPage = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const [filter, setFilter] = useState('All')

    // Dummy Data for Activities
    const { packages = [], isLoading } = useFetchPackages()

    // Filter only items tagged as 'Activity'
    const activityPackages = packages.filter(pkg => pkg.tags?.includes('Activity'))

    const categories = ['All', 'Culture', 'Adventure', 'History', 'Desert']

    const filteredActivities = filter === 'All'
        ? activityPackages
        : activityPackages.filter(pkg =>
            pkg.details?.type === filter || pkg.tags?.includes(filter)
        )

    return (
        <div className='flex flex-col min-h-screen bg-gray-50'>
            {/* Header */}
            <motion.div
                className='w-full px-4 fixed bg-white border-b-2 pt-12 pb-6 border-gray-200 drop-shadow-2xl rounded-b-3xl z-50 top-0'
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
                <div className='flex flex-col text-center gap-2'>
                    <h1 className='text-3xl font-bold text-gray-900 px-2'>{t('activities')}</h1>
                    <p className='text-gray-500 px-2'>{t('find_adventure')}</p>
                </div>

                {/* Categories / Filter */}
                <div className='flex gap-3 overflow-x-auto no-scrollbar mt-6 px-4 pb-3'>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === cat
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            {t(`cat_${cat.toLowerCase()}`)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Content */}
            <div className='flex-1 px-4 pt-64 pb-10 mt-20'>
                {filteredActivities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ActivityCard pkg={activity} />
                    </motion.div>
                ))}

                {filteredActivities.length === 0 && (
                    <div className='text-center py-20 text-gray-400'>
                        {t('no_activities_found')}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActivitiesPage
