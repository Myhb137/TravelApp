# TravelApp - Mobile Travel Booking Application

A modern, mobile-first travel booking application built with React and Vite, designed to help users discover, search, and book travel packages. The app features a beautiful UI with smooth animations and is optimized for mobile devices using Capacitor for native Android support.

## 🚀 Features

- **Browse Travel Packages**: Explore a curated collection of travel packages with detailed information
- **Search Functionality**: Search destinations, locations, and trip details
- **Trip Details**: View comprehensive information about each travel package including:
  - High-quality images
  - Pricing information
  - Duration, group size, and trip type
  - Amenities and facilities
  - Ratings and reviews
- **User Profile**: 
  - View profile information (name, email, passport ID)
  - Track trip statistics (completed, upcoming, saved trips)
  - View trip history with status tracking
- **Custom Trip Requests**: Create custom trip requests with destination, dates, group size, and budget
- **Favorites**: Save favorite trips for later viewing
- **Mobile-Optimized**: Responsive design optimized for mobile devices
- **Native Android Support**: Built with Capacitor for native mobile app experience
- **Smooth Animations**: Enhanced UX with Framer Motion animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.10.1
- **Styling**: 
  - Tailwind CSS 4.1.17
  - Emotion (for Material-UI components)
- **UI Components**: 
  - Material-UI Joy 5.0.0-beta.52
  - Material-UI Icons 7.3.6
- **Animations**: Framer Motion 12.23.26
- **Mobile Framework**: Capacitor 8.0.0
- **Code Quality**: ESLint 9.39.1

## 📁 Project Structure

```
TravelApp/
├── android/                 # Android native project (Capacitor)
├── dist/                    # Production build output
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── CustomOffre.jsx  # Custom trip request form
│   │   ├── HomeNav.jsx      # Home navigation component
│   │   ├── HomePage.jsx     # Main home page with trip listings
│   │   ├── Navbar.jsx       # Navigation bar component
│   │   ├── OfferDetails.jsx # Trip package details page
│   │   ├── Profile.jsx      # User profile page
│   │   ├── Search.jsx       # Search component
│   │   ├── TripCard.jsx     # Trip card component
│   │   ├── TripOfferPage.jsx # Trips listing page
│   │   └── TripsPageSearch.jsx # Search component for trips page
│   ├── data/                # JSON data files
│   │   ├── offers.json      # Travel packages data
│   │   └── profile.json     # User profile data
│   ├── hooks/               # Custom React hooks
│   │   ├── useFetchPackages.js # Hook for fetching travel packages
│   │   └── useProfile.js    # Hook for fetching user profile
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── capacitor.config.json    # Capacitor configuration
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager
- Android Studio (for Android development)
- Java Development Kit (JDK) 11 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TravelApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

### Building for Production

1. **Build the web app**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `dist/` directory.

2. **Preview the production build**
   ```bash
   npm run preview
   ```

### Android Development

1. **Sync Capacitor with native projects**
   ```bash
   npx cap sync
   ```

2. **Open Android Studio**
   ```bash
   npx cap open android
   ```

3. **Run the app**
   - Use Android Studio to build and run the app on an emulator or physical device
   - Or use the command line:
     ```bash
     cd android
     ./gradlew assembleDebug
     ```

## 📱 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## 🎨 Key Features Explained

### Data Management

The app currently uses local JSON files for data (`src/data/offers.json` and `src/data/profile.json`). The `useFetchPackages` hook is configured to use local data by default but can be easily switched to use an API endpoint by modifying the `USE_LOCAL_DATA` flag in `src/hooks/useFetchPackages.js`.

### Routing

The app uses React Router for navigation with the following routes:
- `/` - Home page with trip listings
- `/offer/:id` - Individual trip package details
- `/trips` - Trips page with quick access features
- `/profile` - User profile and trip history
- `/custom-offer` - Custom trip request form

### Mobile-First Design

The app is designed with a mobile-first approach and includes:
- Responsive layouts using Tailwind CSS
- Touch-friendly UI elements
- Hardware back button handling (Android)
- Desktop fallback message for non-mobile devices

### Animations

Framer Motion is used throughout the app for:
- Page transitions
- Component entrance animations
- Interactive hover and tap effects
- Loading states

## 🔧 Configuration

### Capacitor Configuration

Edit `capacitor.config.json` to configure:
- App ID and name
- Web directory
- Server URL for live reload (development)

### API Integration

To switch from local data to API:
1. Open `src/hooks/useFetchPackages.js`
2. Set `USE_LOCAL_DATA = false`
3. Update `API_URL` with your API endpoint

## 📝 Code Style

The project uses ESLint for code quality. Run `npm run lint` to check for issues.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

Mohamed Yahia Benaissa 

## 🙏 Acknowledgments

- Material-UI for the icon library
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Capacitor team for mobile framework support

---

**Note**: This app is optimized for mobile devices. For the best experience, use it on iOS or Android devices.
