
import HomePage from './components/HomePage'
import OfferDetails from './components/OfferDetails'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    <div className="app bg-[red]">
      <div className="mobile-content">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/offer/:id' element={<OfferDetails />} />
        </Routes>
      </div>

      {/* Desktop-only fallback */}
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
