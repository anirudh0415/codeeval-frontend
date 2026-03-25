import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register({ setUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/register', { name, email, password, role });
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
        } catch (err) {
            const backendError = err.response && err.response.data;
            setError(typeof backendError === 'string' ? backendError : 'Registration failed. Email might already be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="grid-overlay" />
            <div className="auth-container animate-fade-up" style={{ maxWidth: 960 }}>
                {/* Left: Welcome Panel (mirrored) */}
                <div className="auth-right" style={{ order: -1, borderRadius: '24px 0 0 24px' }}>
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚀</div>
                        <div className="auth-welcome">WELCOME!</div>
                        <div className="auth-welcome-sub">Join thousands of coders sharpening their skills</div>
                        <div className="auth-switch-text">Already have an account?</div>
                        <Link to="/login">
                            <button className="auth-switch-btn">Sign In</button>
                        </Link>
                    </div>
                </div>

                {/* Right: Register Form */}
                <div className="auth-left">
                    <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>⟨/⟩</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', marginLeft: '8px', color: 'var(--teal-400)', letterSpacing: '-0.5px' }}>CodeEval</span>
                    </div>
                    <h2 className="auth-form-title" style={{ marginTop: '1.5rem' }}>Register</h2>
                    <p className="auth-form-subtitle">Create your account and start your journey!</p>

                    {error && (
                        <div className="auth-error animate-slide-in">
                            <span>⚠</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                                <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>👤</span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                                <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>✉</span>
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
                                    placeholder="Min. 8 characters"
                                    required
                                />
                                <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔒</span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">I am a</label>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.3rem' }}>
                                {['STUDENT', 'ADMIN'].map(r => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        style={{
                                            flex: 1,
                                            padding: '0.6rem',
                                            borderRadius: '8px',
                                            border: `1.5px solid ${role === r ? 'var(--teal-500)' : 'rgba(255,255,255,0.1)'}`,
                                            background: role === r ? 'rgba(13,148,136,0.15)' : 'transparent',
                                            color: role === r ? 'var(--teal-300)' : 'var(--text-muted)',
                                            cursor: 'pointer',
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            transition: 'all 0.2s',
                                            fontFamily: 'Outfit, sans-serif'
                                        }}
                                    >
                                        {r === 'STUDENT' ? '🎓 Student' : '👨‍🏫 Teacher'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            style={{ marginTop: '1rem', borderRadius: '8px', letterSpacing: '0.5px' }}
                            disabled={loading}
                        >
                            {loading ? <span className="loading-spinner" style={{ width: 16, height: 16 }} /> : 'Register'}
                        </button>
                    </form>

                    <div className="auth-form-footer">
                        Already have an account?{' '}
                        <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
