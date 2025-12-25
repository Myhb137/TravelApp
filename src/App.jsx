import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom" // Added hooks
import { App as CapApp } from "@capacitor/app" // Import Capacitor App
import HomePage from "./components/HomePage"
import OfferDetails from "./components/OfferDetails"
import TripOfferPage from "./components/TripOfferPage"
import AllTripsPage from "./components/AllTripsPage"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import "./App.css"
import Profile from "./components/Profile"
import CustomOffre from "./components/CustomOffre"
import Navbar from "./components/Navbar"
import SpecialOfferpage from "./components/SpecialOfferpage"
import ActivitiesPage from "./components/ActivitiesPage"
import SettingsPage from "./components/SettingsPage"
import EditProfilePage from "./components/EditProfilePage"

function App() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  // 1. Loading timer effect
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  // 2. Hardware Back Button Listener
  useEffect(() => {
    const backHandler = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (location.pathname === '/') {
        // If we are on the Home page, close the app
        CapApp.exitApp();
      } else {
        // Otherwise, go back one step in React Router
        navigate(-1);
      }
    });

    return () => {
      backHandler.then(h => h.remove());
    };
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[999]">
        <div className="animate-spin-slow">
          <ExploreOutlinedIcon
            sx={{ fontSize: 80, color: "#0046A8" }}
            className="drop-shadow-md"
          />
        </div>
        <p className="mt-4 text-lg font-semibold text-[#0046A8] tracking-wide animate-pulse">
          Exploring your next adventure...
        </p>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="mobile-content overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/trips" element={<TripOfferPage />} />
          <Route path="/all-trips" element={<AllTripsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/custom-offer" element={<CustomOffre />} />
          <Route path="/special-offer" element={<SpecialOfferpage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
        <Navbar />
      </div>

      <div className="desktop-fallback">
        <div className="fallback-content">
          <div className="icon">📱</div>
          <h1>This app works only on mobile devices</h1>
          <p>Please open this link on your iOS or Android device.</p>
        </div>
      </div>
    </div>
  )
}

export default App