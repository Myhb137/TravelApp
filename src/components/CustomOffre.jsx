import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { motion, AnimatePresence } from 'framer-motion';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';

const CustomOffre = () => {
    const [open , setOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoverDate, setHoverDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [error, setError] = useState('');
    const [budget, setBudget] = useState('');
    const [interests, setInterests] = useState([]);
    const [accommodationType, setAccommodationType] = useState('');
    const [description, setDescription] = useState('');
    const number = { 'one' : '1', 'two' : '2', "three" : '3', 'four' : '4', 'five' : '5+' }
    const [selected, setSelected] = useState('one')

    const interestOptions = [
        { id: 'beach', name: 'Beach & Relaxation', icon: '🏖️', color: 'from-blue-400 to-cyan-500' },
        { id: 'adventure', name: 'Adventure', icon: '⛰️', color: 'from-orange-400 to-red-500' },
        { id: 'culture', name: 'Culture & History', icon: '🏛️', color: 'from-purple-400 to-indigo-500' },
        { id: 'nature', name: 'Nature & Wildlife', icon: '🌿', color: 'from-green-400 to-emerald-500' }
    ];

    const accommodationOptions = [
        { id: 'hotel', name: 'Hotel' },
        { id: 'resort', name: 'Resort' },
        { id: 'apartment', name: 'Apartment' },
        { id: 'hostel', name: 'Hostel' },
        { id: 'villa', name: 'Villa' },
        { id: 'camping', name: 'Camping' }
    ];

    const toggleInterest = (interestId) => {
        setInterests(prev => 
            prev.includes(interestId) 
                ? prev.filter(id => id !== interestId)
                : [...prev, interestId]
        );
    };

    // Validation: Check if all required fields are filled
    const isFormValid = useMemo(() => {
        return (
            destination.trim() !== '' &&
            startDate !== null &&
            endDate !== null &&
            budget.trim() !== '' &&
            interests.length > 0 &&
            accommodationType !== ''
        );
    }, [destination, startDate, endDate, budget, interests, accommodationType]);

    const handleConfirm = () => {
        if (!isFormValid) return;
        
        // Handle form submission
        console.log('Form submitted:', {
            destination,
            startDate,
            endDate,
            travelers: number[selected],
            budget,
            interests,
            accommodationType,
            description
        });
        // You can add navigation or API call here
        alert('Trip request submitted successfully!');
    };

    // Calendar helper functions
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        return { daysInMonth, startingDayOfWeek, year, month };
    }

    const isSameDay = (date1, date2) => {
        if (!date1 || !date2) return false;
        return date1.getTime() === date2.getTime();
    }

    const isDateInRange = (date, start, end) => {
        if (!start || !end) return false;
        return date >= start && date <= end;
    }

    const isDateInHoverRange = (date, start, hover) => {
        if (!start || !hover) return false;
        if (hover < start) return false;
        return date >= start && date <= hover;
    }

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        clickedDate.setHours(0, 0, 0, 0);
        
        if (isPastDate(clickedDate)) {
            setError("Cannot select dates in the past.");
            return;
        }

        setError('');

        // If no start date, set start date
        if (!startDate) {
            setStartDate(clickedDate);
            setEndDate(null);
            return;
        }

        // If clicking the same start date, reset
        if (isSameDay(clickedDate, startDate) && !endDate) {
            setStartDate(null);
            setEndDate(null);
            return;
        }

        // If end date exists and clicking start date, reset
        if (endDate && isSameDay(clickedDate, startDate)) {
            setStartDate(clickedDate);
            setEndDate(null);
            return;
        }

        // If clicking before start date, set as new start date
        if (clickedDate < startDate) {
            setStartDate(clickedDate);
            setEndDate(null);
            return;
        }

        // Set end date
        setEndDate(clickedDate);
        
        // Auto-close calendar when both dates are selected
        setTimeout(() => {
            setCalendarOpen(false);
        }, 400);
    }

    const handleDateHover = (day) => {
        if (!startDate || endDate) return;
        const hoveredDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        hoveredDate.setHours(0, 0, 0, 0);
        if (!isPastDate(hoveredDate) && hoveredDate >= startDate) {
            setHoverDate(hoveredDate);
        } else {
            setHoverDate(null);
        }
    }

    const handleDateLeave = () => {
        setHoverDate(null);
    }

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    }

    const { daysInMonth, startingDayOfWeek, year, month } = useMemo(() => 
        getDaysInMonth(currentMonth), [currentMonth]
    );

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    }

    const optionVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
    }

    return (
        <div className='flex flex-col overflow-x-hidden h-screen w-screen gap-10'>
            {/* Header */}
            <motion.div 
                className='w-full px-4 fixed bg-white border-b-2 p-15 border-gray-200 drop-shadow-2xl rounded-b-4xl z-50'
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
            >
                <div className='w-full flex border-2 justify-between '>
                    <Link to={"/trips"} className=' p-2 border-gray-600 rounded-[100%]' >
                        <ArrowBackIosNewIcon sx={{color : "#4a5565", fontSize : 24}} />
                    </Link>
                    <button className='border-2 border-gray-600 p-2 rounded-[100%]' onClick={() => setOpen(true)} >
                        <QuestionMarkIcon sx={{color : "#4a5565", fontSize : 24}} />
                    </button>
                    <AnimatePresence>
                        {open && (
                            <motion.div
                              className="fixed inset-0 my-[100%] flex items-center justify-center z-50"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                              <div className="bg-white w-[90%] max-w-md p-6 gap-7 rounded-3xl drop-shadow-2xl border border-gray-300 flex flex-col items-center">
                                <h1 className="text-xl text-center font-semibold text-black mb-3">
                                  Custom Trip Planning <br />
                                  How It Works
                                </h1>
                                <p className="text-center text-black mb-5">
                                  Fill in the details of your trip, such as your destination,
                                  travel dates, number of travelers, budget, and interests.
                                  You can also choose your preferred accommodation type and add any special notes.
                                </p>
                                <div className="flex gap-4 w-full justify-center">
                                    <motion.div
                                        className="border-2 border-gray-300 text-lg px-5 py-2 rounded-xl text-black cursor-pointer"
                                        onClick={() => setOpen(false)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                      Continue
                                    </motion.div>
                                </div>
                              </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <h1 className=' text-black text-center text-3xl'>Plan Your Trip</h1>
                    <p className='text-gray-500 text-center text-lg'>Tell us about your dream destination</p>
                </div>
            </motion.div>

            {/* Form Section */}
            <div className='flex flex-col gap-8 px-4 py-20 mt-50 pb-32'>
                {/* Destination Input */}
                <motion.div variants={sectionVariants} initial="hidden" animate="visible" className=' w-90 border-2 border-b-gray-300 border-x-gray-300/30 drop-shadow-lg mx-auto flex bg-white rounded-3xl flex-col gap-4 p-4'>
                    <div className=' flex gap-4 items-center '>
                        <FmdGoodOutlinedIcon sx={{color : '#ffff',fontSize : 47}} className='bg-gradient-to-b from-blue-500 to-blue-800 p-2 rounded-full'/>
                        <p className='text-2xl font-normal text-black'>Destination</p>
                    </div>
                    <input 
                        type="text" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className='w-full p-3 border-3 border-gray-300 rounded-2xl text-black focus:outline-none focus:border-blue-500 transition-all duration-100 ease-in-out' 
                        placeholder='Where do you want to go?' 
                    />
                </motion.div>

                {/* Travel Dates - Calendar Popup */}
                <motion.div variants={sectionVariants} initial="hidden" animate="visible" className='w-90 border-2 z-45 bg-black/50 border-b-gray-300 border-x-gray-300/30 drop-shadow-lg mx-auto flex bg-white rounded-3xl flex-col gap-4 p-4'>
                    <div className='flex gap-4 items-center'>
                        <CalendarMonthOutlinedIcon sx={{color : '#ffff',fontSize : 47}} className='bg-gradient-to-b from-[#FF6B35] to-[#FF006E] p-2 rounded-full'/>
                        <p className='text-2xl font-normal text-black'>Travel Dates</p>
                    </div>

                    {/* Date Selection Button */}
                    <motion.button
                        onClick={() => {
                            // Set current month to start date if exists, otherwise today
                            if (startDate) {
                                setCurrentMonth(new Date(startDate));
                            } else {
                                setCurrentMonth(new Date());
                            }
                            setCalendarOpen(true);
                        }}
                        className='w-full p-4 border-3 border-gray-300 rounded-2xl text-left focus:outline-none focus:border-blue-500 transition-all duration-100 ease-in-out bg-white hover:bg-gray-50'
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        {startDate && endDate ? (
                            <div className='flex flex-col gap-1'>
                                <div className='text-black font-semibold text-lg'>
                                    {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className='text-sm text-gray-500'>
                                    {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) === 1 ? 'day' : 'days'}
                                </div>
                            </div>
                        ) : startDate ? (
                            <div className='text-gray-700 font-medium'>
                                {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - Select end date
                            </div>
                        ) : (
                            <div className='text-gray-400'>Tap to select your travel dates</div>
                        )}
                    </motion.button>

                    {error && <p className="text-red-500 text-sm mt-1 text-center">{error}</p>}

                    {/* Calendar Popup Modal */}
                    <AnimatePresence>
                        {calendarOpen && (
                            <>
                                {/* Backdrop - Darker */}
                                <motion.div
                                    className="fixed inset-0 bg-black/90 z-[99999]"
                                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setCalendarOpen(false)}
                                />
                                
                                {/* Calendar Modal */}
                                <motion.div
                                    className="fixed inset-0 flex items-center justify-center z-[100000] p-4"
                                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="bg-white w-full max-w-md rounded-3xl drop-shadow-2xl border-2 border-gray-300 p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto shadow-2xl">
                                        {/* Modal Header */}
                                        <div className='flex items-center justify-between'>
                                            <h2 className='text-2xl font-bold text-black'>Select Travel Dates</h2>
                                            <motion.button
                                                onClick={() => setCalendarOpen(false)}
                                                className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </motion.button>
                                        </div>

                                        {/* Selected Dates Display */}
                                        {(startDate || endDate) && (
                                            <div className='flex gap-2 items-center justify-center flex-wrap pb-3 border-b border-gray-200'>
                                                {startDate && (
                                                    <div className='px-4 py-2 bg-blue-50 border-2 border-blue-500 rounded-xl text-blue-700 font-semibold text-sm shadow-sm'>
                                                        Start: {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                )}
                                                {endDate && (
                                                    <div className='px-4 py-2 bg-purple-50 border-2 border-purple-500 rounded-xl text-purple-700 font-semibold text-sm shadow-sm'>
                                                        End: {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Calendar */}
                                        <div className='w-full'>
                                            {/* Calendar Header */}
                                            <div className='flex items-center justify-between mb-4'>
                                                <motion.button
                                                    onClick={() => navigateMonth(-1)}
                                                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <ChevronLeftIcon sx={{ fontSize: 24, color: '#4a5565' }} />
                                                </motion.button>
                                                <h3 className='text-xl font-bold text-black'>
                                                    {monthNames[month]} {year}
                                                </h3>
                                                <motion.button
                                                    onClick={() => navigateMonth(1)}
                                                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <ChevronRightIcon sx={{ fontSize: 24, color: '#4a5565' }} />
                                                </motion.button>
                                            </div>

                                            {/* Day Names */}
                                            <div className='grid grid-cols-7 gap-1 mb-2'>
                                                {dayNames.map(day => (
                                                    <div key={day} className='text-center text-sm font-bold text-gray-600 py-2'>
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Calendar Grid */}
                                            <div className='grid grid-cols-7 gap-1'>
                                                {/* Empty cells for days before month starts */}
                                                {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                                                    <div key={`empty-${idx}`} className='aspect-square' />
                                                ))}

                                                {/* Days of the month */}
                                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                                    const date = new Date(year, month, day);
                                                    date.setHours(0, 0, 0, 0);
                                                    const isPast = isPastDate(date);
                                                    const isStart = startDate && isSameDay(date, startDate);
                                                    const isEnd = endDate && isSameDay(date, endDate);
                                                    const inRange = startDate && endDate && isDateInRange(date, startDate, endDate);
                                                    const inHoverRange = startDate && !endDate && hoverDate && isDateInHoverRange(date, startDate, hoverDate);
                                                    
                                                    let dayClass = 'aspect-square flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer touch-manipulation ';
                                                    
                                                    if (isPast) {
                                                        dayClass += 'text-gray-300 cursor-not-allowed bg-gray-50';
                                                    } else if (isStart || isEnd) {
                                                        dayClass += isStart 
                                                            ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg scale-110 z-10 border-3 border-blue-900 font-bold'
                                                            : 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg scale-110 z-10 border-3 border-purple-900 font-bold';
                                                    } else if (inRange) {
                                                        dayClass += 'bg-blue-200 text-blue-900 hover:bg-blue-300';
                                                    } else if (inHoverRange) {
                                                        dayClass += 'bg-blue-100 text-blue-700 hover:bg-blue-200';
                                                    } else {
                                                        dayClass += 'text-gray-700 hover:bg-gray-100 active:bg-gray-200';
                                                    }

                                                    return (
                                                        <motion.div
                                                            key={day}
                                                            className={dayClass}
                                                            onClick={() => !isPast && handleDateClick(day)}
                                                            onMouseEnter={() => !isPast && handleDateHover(day)}
                                                            onMouseLeave={handleDateLeave}
                                                            onTouchStart={() => !isPast && handleDateHover(day)}
                                                            whileHover={!isPast && !isStart && !isEnd ? { scale: 1.1 } : {}}
                                                            whileTap={!isPast ? { scale: 0.95 } : {}}
                                                        >
                                                            {day}
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {error && <p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
                                        
                                        {/* Helper Text */}
                                        <p className='text-xs text-gray-500 text-center mt-2'>
                                            {!startDate 
                                                ? 'Tap a date to set your start date'
                                                : !endDate 
                                                ? 'Tap another date to set your end date'
                                                : 'Tap start date again to reset'}
                                        </p>

                                        {/* Done Button */}
                                        {startDate && endDate && (
                                            <motion.button
                                                onClick={() => setCalendarOpen(false)}
                                                className='mt-2 w-full py-3 bg-gradient-to-r hidden from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl'
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Done
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Travelers + Budget */}
                <motion.div variants={sectionVariants} initial="hidden" animate="visible" className='w-90 border-2 border-b-gray-300 border-x-gray-300/30 drop-shadow-lg mx-auto flex bg-white rounded-3xl flex-col gap-4 p-4'>
                    <div className='flex gap-4 items-center'>
                        <PeopleAltOutlinedIcon sx={{ color: '#ffff', fontSize: 47 }} className='bg-gradient-to-b from-blue-500 to-blue-800 p-2 rounded-full'/>
                        <p className='text-2xl font-normal text-black'>Number of Travelers</p>
                    </div>

                    <div className='flex gap-4 mt-2'>
                        {Object.entries(number).map(([key, value]) => (
                            <motion.div
                                key={key}
                                onClick={() => setSelected(key)}
                                className={`cursor-pointer px-4 py-2 rounded-2xl border-2 transition-all duration-200 ${
                                  selected === key 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : 'bg-white text-black border-gray-300'
                                }`}
                                whileHover="hover"
                                whileTap="tap"
                                variants={optionVariants}
                            >
                                {value}
                            </motion.div>
                        ))}
                    </div>

                    <div className='w-full/20 border border-gray-500/20' />

                    <div className='flex gap-4 items-center'>
                        <SavingsOutlinedIcon sx={{color : '#ffff',fontSize : 47}} className='bg-gradient-to-b from-[#10B981] to-[#059669] p-2 rounded-full'/> 
                        <p className='text-2xl font-normal text-black'>Budget (DZD)</p>
                    </div>
                    <input 
                        type="text" 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className='w-full p-3 border-3 border-gray-300 rounded-2xl text-black focus:outline-none focus:border-blue-500 transition-all duration-100 ease-in-out' 
                        placeholder='Enter your budget' 
                    />
                </motion.div>

                {/* Your Interests */}
                <motion.div variants={sectionVariants} initial="hidden" animate="visible" className='w-90 border-2 border-b-gray-300 border-x-gray-300/30 drop-shadow-lg mx-auto flex bg-white rounded-3xl flex-col gap-4 p-4'>
                    <div className='flex gap-4 items-center'>
                        <FavoriteIcon sx={{color : '#ffff',fontSize : 47}} className='bg-gradient-to-b from-pink-500 to-rose-600 p-2 rounded-full'/>
                        <p className='text-2xl font-normal text-black'>Your Interests</p>
                    </div>
                    <p className='text-sm text-gray-500 -mt-2'>Select one or more interests for your trip</p>
                    
                    <div className='grid grid-cols-2 gap-3 mt-2'>
                        {interestOptions.map((interest) => (
                            <motion.div
                                key={interest.id}
                                onClick={() => toggleInterest(interest.id)}
                                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                                    interests.includes(interest.id)
                                        ? `bg-gradient-to-br ${interest.color} text-white border-transparent shadow-lg`
                                        : 'bg-white text-black border-gray-300 hover:border-gray-400'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className='text-3xl'>{interest.icon}</span>
                                <p className={`text-sm font-medium text-center ${interests.includes(interest.id) ? 'text-white' : 'text-black'}`}>
                                    {interest.name}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Accommodation Type */}
                <motion.div variants={sectionVariants} initial="hidden" animate="visible" className='w-90 border-2 border-b-gray-300 border-x-gray-300/30 drop-shadow-lg mx-auto flex bg-white rounded-3xl flex-col gap-4 p-4'>
                    <div className='flex gap-4 items-center'>
                        <ExploreIcon sx={{color : '#ffff',fontSize : 47}} className='bg-gradient-to-b from-purple-500 to-indigo-600 p-2 rounded-full'/>
                        <p className='text-2xl font-normal text-black'>Accommodation Type</p>
                    </div>
                    <p className='text-sm text-gray-500 -mt-2'>Choose your preferred accommodation</p>
                    
                    <div className='grid grid-cols-3 gap-3 mt-2'>
                        {accommodationOptions.map((option) => (
                            <motion.button
                                key={option.id}
                                onClick={() => setAccommodationType(option.id)}
                                className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                                    accommodationType === option.id
                                        ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                                        : 'bg-white text-black border-gray-300 hover:border-purple-300'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {option.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div variants={sectionVariants} initial="hidden" animate="visible" className='w-90 border-2 border-b-gray-300 border-x-gray-300/30 drop-shadow-lg mx-auto flex bg-white rounded-3xl flex-col gap-4 p-4'>
                    <div className='flex gap-4 items-center'>
                        <DescriptionIcon sx={{color : '#ffff',fontSize : 47}} className='bg-gradient-to-b from-amber-500 to-orange-600 p-2 rounded-full'/>
                        <p className='text-2xl font-normal text-black'>Additional Notes</p>
                    </div>
                    <p className='text-sm text-gray-500 -mt-2'>Tell us more about your trip preferences</p>
                    
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full p-3 border-3 border-gray-300 rounded-2xl text-black focus:outline-none focus:border-blue-500 transition-all duration-100 ease-in-out min-h-[120px] resize-none' 
                        placeholder='Any special requirements, preferences, or additional information...' 
                    />
                </motion.div>

            </div>

            {/* Fixed Confirmation Button */}
            <motion.div 
                className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 p-4 shadow-2xl'
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className='max-w-md mx-auto'>
                    <motion.button
                        onClick={handleConfirm}
                        disabled={!isFormValid}
                        className={`w-full py-4 font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 ${
                            isFormValid
                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        whileHover={isFormValid ? { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' } : {}}
                        whileTap={isFormValid ? { scale: 0.98 } : {}}
                    >
                        {isFormValid ? 'Confirm Trip Request' : 'Please fill all required fields'}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}

export default CustomOffre;
