import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Roster from './pages/Roster'
import Matches from './pages/Matches'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
