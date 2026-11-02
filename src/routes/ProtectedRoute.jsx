import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'
export default function ProtectedRoute({ role, children }) { const { user, loading } = useAuth(); const loc = useLocation(); if (loading) return <main className="center"><p>Loading secure workspace…</p></main>; if (!user) return <Navigate to="/login" state={{ from: loc }} replace />; if (user.role !== role) return <Navigate to={user.role === 'toc' ? '/toc' : '/resident'} replace />; return children }
