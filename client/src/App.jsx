import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductAdmin from './pages/ProductAdmin'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/productos" element={<ProductAdmin />} />
            </Routes>
          </main>
          <footer>
            <p>&copy; 2026 Shoppy - Reservamos tus derechos</p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
