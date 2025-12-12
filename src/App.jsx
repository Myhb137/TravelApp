import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import OfferDetails from "./components/OfferDetails"
import TripOfferPage from "./components/TripOfferPage"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
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
    <div className="app bg-[red]">
      <div className="mobile-content overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/trips" element={<TripOfferPage />} />
        </Routes>
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
