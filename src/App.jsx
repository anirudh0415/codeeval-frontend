import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import ThemePanel from './components/ThemePanel';
import Login from './pages/Login';
import Register from './pages/Register';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import AdminDashboard from './pages/AdminDashboard';
import Practice from './pages/Practice';
import ExamPage from './pages/ExamPage';
import ExamDetail from './pages/ExamDetail';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

function Sidebar({ user, setUser, logout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';
  const savedProfile = JSON.parse(localStorage.getItem('codeeval-profile') || '{}');
  const avatarColor = savedProfile.avatarColor || 'linear-gradient(135deg, #0d9488, #3b82f6)';
  const displayName = savedProfile.name || user.name;
  const initials = displayName
    ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/" className="logo-mark" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">⟨/⟩</div>
          <span className="logo-text">CodeEval</span>
        </Link>
      </div>

      {/* Clickable User Avatar → Profile */}
      <Link to="/profile" className="sidebar-user" style={{ textDecoration: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <div className="user-avatar" style={{ background: avatarColor }}>{initials}</div>
        <div className="user-info-sidebar">
          <div className="user-name">{displayName}</div>
          <div className="user-role">{isAdmin ? '👨‍🏫 Teacher' : '🎓 Student'}</div>
        </div>
      </Link>

      <nav className="sidebar-nav">
        {isAdmin ? (
          <>
            <div className="nav-section-label">Admin</div>
            <Link to="/admin" className={`nav-item ${isActive('/admin') ? 'active' : ''}`}>
              <span className="nav-icon">⚙</span> Dashboard
            </Link>
            <Link to="/admin/results" className={`nav-item ${isActive('/admin/results') ? 'active' : ''}`}>
              <span className="nav-icon">📊</span> Student Results
            </Link>
            <Link to="/leaderboard" className={`nav-item ${isActive('/leaderboard') ? 'active' : ''}`}>
              <span className="nav-icon">🏆</span> Leaderboard
            </Link>
            <div className="nav-section-label" style={{ marginTop: '0.5rem' }}>Problems</div>
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              <span className="nav-icon">📋</span> All Problems
            </Link>
            <div className="nav-section-label" style={{ marginTop: '0.5rem' }}>Account</div>
            <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
              <span className="nav-icon">👤</span> Profile
            </Link>
          </>
        ) : (
          <>
            <div className="nav-section-label">Study</div>
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              <span className="nav-icon">📋</span> Problems
            </Link>
            <Link to="/practice" className={`nav-item ${isActive('/practice') ? 'active' : ''}`}>
              <span className="nav-icon">💪</span> Practice
              <span className="nav-badge">New</span>
            </Link>
            <Link to="/exam" className={`nav-item ${isActive('/exam') ? 'active' : ''}`}>
              <span className="nav-icon">📝</span> Exams
            </Link>
            <div className="nav-section-label" style={{ marginTop: '0.5rem' }}>Community</div>
            <Link to="/leaderboard" className={`nav-item ${isActive('/leaderboard') ? 'active' : ''}`}>
              <span className="nav-icon">🏆</span> Leaderboard
            </Link>
            <div className="nav-section-label" style={{ marginTop: '0.5rem' }}>Account</div>
            <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
              <span className="nav-icon">👤</span> Profile
            </Link>
          </>
        )}
      </nav>

      <div className="sidebar-bottom">
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', paddingLeft: '0.25rem' }}>
          🔥 <strong style={{ color: '#fbbf24' }}>7</strong> day streak — keep it up!
        </div>
        {/* Theme Switcher */}
        <ThemePanel />
        <button className="logout-btn" style={{ marginTop: '0.5rem' }} onClick={logout}>
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <ThemeProvider>
      <Router>
        <div className="app-layout">
          <Sidebar user={user} setUser={setUser} logout={logout} />
          <div className={`main-content ${user ? '' : 'full-width'}`}>
            <Routes>
              <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
              <Route path="/" element={user ? <ProblemList user={user} /> : <Navigate to="/login" />} />
              <Route path="/problems/:id" element={user ? <ProblemDetail user={user} /> : <Navigate to="/login" />} />
              <Route path="/practice" element={user && !isAdmin ? <Practice user={user} /> : <Navigate to="/" />} />
              <Route path="/exam" element={user && !isAdmin ? <ExamPage user={user} /> : <Navigate to="/" />} />
              <Route path="/exam/:id" element={user ? <ExamDetail user={user} /> : <Navigate to="/login" />} />
              <Route path="/leaderboard" element={user ? <Leaderboard user={user} /> : <Navigate to="/login" />} />
              <Route path="/admin" element={user && isAdmin ? <AdminDashboard user={user} /> : <Navigate to="/" />} />
              <Route path="/admin/results" element={user && isAdmin ? <AdminDashboard user={user} initialTab="results" /> : <Navigate to="/" />} />
              <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
