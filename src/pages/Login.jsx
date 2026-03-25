import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="grid-overlay" />
            <div className="auth-container animate-fade-up">
                {/* Left: Login Form */}
                <div className="auth-left">
                    <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>⟨/⟩</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', marginLeft: '8px', color: 'var(--teal-400)', letterSpacing: '-0.5px' }}>CodeEval</span>
                    </div>
                    <h2 className="auth-form-title" style={{ marginTop: '1.5rem' }}>Login</h2>
                    <p className="auth-form-subtitle">Welcome back! Please sign in to continue.</p>
                    
                    {error && (
                        <div className="auth-error animate-slide-in">
                            <span>⚠</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Username / Email</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                                <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1rem' }}>👤</span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1rem' }}>🔒</span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            style={{ marginTop: '1.5rem', borderRadius: '8px', letterSpacing: '0.5px' }}
                            disabled={loading}
                        >
                            {loading ? <><span className="loading-spinner" style={{ width: 16, height: 16 }} /></> : 'Login'}
                        </button>
                    </form>

                    <div className="auth-form-footer">
                        Don't have an account?{' '}
                        <Link to="/register">Sign Up</Link>
                    </div>
                </div>

                {/* Right: Welcome Panel */}
                <div className="auth-right">
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👋</div>
                        <div className="auth-welcome">WELCOME<br/>BACK!</div>
                        <div className="auth-welcome-sub">Sign in to continue your coding journey</div>
                        <div className="auth-switch-text">New here?</div>
                        <Link to="/register">
                            <button className="auth-switch-btn">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
