import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ResidentPage from './pages/resident/ResidentPage'
import TocPage from './pages/toc/TocPage'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() { return <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/resident" element={<ProtectedRoute role="resident"><ResidentPage /></ProtectedRoute>} />
  <Route path="/toc/*" element={<ProtectedRoute role="toc"><TocPage /></ProtectedRoute>} />
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes> }
