import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EXAMS = [
  {
    id: 1,
    title: 'Mid-Semester Coding Exam',
    subject: 'Data Structures & Algorithms',
    duration: 90,
    totalMarks: 100,
    problems: 5,
    startDate: '2026-03-25T09:00:00',
    endDate: '2026-03-25T10:30:00',
    status: 'upcoming',
    conductedBy: 'Prof. Sharma',
    topics: ['Arrays', 'Strings', 'Stacks'],
  },
  {
    id: 2,
    title: 'Unit Test — Linked Lists',
    subject: 'Data Structures',
    duration: 45,
    totalMarks: 50,
    problems: 3,
    startDate: '2026-03-22T14:00:00',
    endDate: '2026-03-22T14:45:00',
    status: 'live',
    conductedBy: 'Prof. Rajan',
    topics: ['Linked Lists', 'Pointers'],
  },
  {
    id: 3,
    title: 'Arrays & Strings Quiz',
    subject: 'Programming Lab',
    duration: 30,
    totalMarks: 30,
    problems: 2,
    startDate: '2026-03-18T10:00:00',
    endDate: '2026-03-18T10:30:00',
    status: 'completed',
    conductedBy: 'Prof. Sharma',
    topics: ['Arrays', 'Strings'],
    myScore: 26,
    maxScore: 30,
    rank: 3,
    totalStudents: 42,
  },
  {
    id: 4,
    title: 'Algorithm Efficiency Test',
    subject: 'Introduction to Algorithms',
    duration: 60,
    totalMarks: 60,
    problems: 4,
    startDate: '2026-03-15T11:00:00',
    endDate: '2026-03-15T12:00:00',
    status: 'completed',
    conductedBy: 'Prof. Rajan',
    topics: ['Time Complexity', 'Sorting', 'Searching'],
    myScore: 48,
    maxScore: 60,
    rank: 7,
    totalStudents: 42,
  },
];

function ExamStatusBadge({ status }) {
  const map = {
    live: { label: '🔴 LIVE', style: { background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)', animation: 'pulse-glow 2s infinite' } },
    upcoming: { label: '🟡 Upcoming', style: { background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' } },
    completed: { label: '✅ Completed', style: { background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' } },
  };
  const { label, style } = map[status] || {};
  return <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.25em 0.7em', borderRadius: '20px', ...style }}>{label}</span>;
}

function ExamPage({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [reminder, setReminder] = useState(null);

  const showReminder = (title) => {
    setReminder(`Reminder set for "${title}" ✅`);
    setTimeout(() => setReminder(null), 3000);
  };

  const upcoming = EXAMS.filter(e => e.status === 'upcoming' || e.status === 'live');
  const completed = EXAMS.filter(e => e.status === 'completed');

  const totalScore = completed.reduce((acc, e) => acc + e.myScore, 0);
  const totalMax = completed.reduce((acc, e) => acc + e.maxScore, 0);
  const avgPct = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  const formatDate = (d) => new Date(d).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="page-wrapper animate-fade-up">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">📝 My <span className="gradient-text">Exams</span></h1>
          <p className="page-subtitle">View upcoming exams, join live ones, and review your past results</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {upcoming.some(e => e.status === 'live') && (
            <span style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700 }}>
              🔴 1 Exam Live Now!
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{completed.length}</div>
          <div className="stat-label">Exams Taken</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{avgPct}%</div>
          <div className="stat-label">Avg Score</div>
          <div className="stat-change">↑ +5% vs last semester</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏅</div>
          <div className="stat-value">#3</div>
          <div className="stat-label">Best Rank</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{upcoming.length}</div>
          <div className="stat-label">Upcoming</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-bar">
        {[['upcoming', '📅 Upcoming & Live'], ['completed', '✅ Past Results']].map(([id, label]) => (
          <button key={id} className={`tab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
            {label}
            <span style={{ background: 'rgba(255,255,255,0.08)', padding: '0 6px', borderRadius: '8px', fontSize: '0.75rem', marginLeft: '4px' }}>
              {id === 'upcoming' ? upcoming.length : completed.length}
            </span>
          </button>
        ))}
      </div>

      {activeTab === 'upcoming' && (
        <div className="admin-tab-content">
          {upcoming.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem' }}>🎉</div>
              <div style={{ marginTop: '0.5rem' }}>No upcoming exams — enjoy the break!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcoming.map(exam => (
                <div key={exam.id} className="exam-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                        <ExamStatusBadge status={exam.status} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>by {exam.conductedBy}</span>
                      </div>
                      <h3 className="exam-title">{exam.title}</h3>
                      <div className="exam-meta">
                        <span className="exam-meta-item">📚 {exam.subject}</span>
                        <span className="exam-meta-item">⏱ {exam.duration} min</span>
                        <span className="exam-meta-item">🎯 {exam.totalMarks} marks</span>
                        <span className="exam-meta-item">📝 {exam.problems} problems</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        🗓 {formatDate(exam.startDate)} — {formatDate(exam.endDate)}
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {exam.topics.map(t => (
                          <span key={t} className="badge badge-teal" style={{ fontSize: '0.68rem' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                      {exam.status === 'live' ? (
                        <button
                          className="btn btn-primary"
                          style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 0 20px rgba(239,68,68,0.4)' }}
                          onClick={() => navigate(`/exam/${exam.id}`)}
                        >
                          🔴 Join Now
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/exam/${exam.id}`)}
                          >
                            📝 Attempt
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => showReminder(exam.title)}
                          >
                            📅 Reminder
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="admin-tab-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {completed.map(exam => {
              const pct = Math.round((exam.myScore / exam.maxScore) * 100);
              const grade = pct >= 90 ? { letter: 'A+', color: '#34d399' } : pct >= 75 ? { letter: 'A', color: '#34d399' } : pct >= 60 ? { letter: 'B', color: '#fbbf24' } : { letter: 'C', color: '#f87171' };
              return (
                <div key={exam.id} className="exam-card">
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ marginBottom: '0.3rem' }}>
                        <ExamStatusBadge status="completed" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                          {formatDate(exam.startDate)}
                        </span>
                      </div>
                      <h3 className="exam-title">{exam.title}</h3>
                      <div className="exam-meta">
                        <span className="exam-meta-item">📚 {exam.subject}</span>
                        <span className="exam-meta-item">⏱ {exam.duration} min</span>
                        <span className="exam-meta-item">🏅 Rank #{exam.rank} / {exam.totalStudents}</span>
                      </div>
                      <div style={{ marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Score: <strong style={{ color: 'white' }}>{exam.myScore}/{exam.maxScore}</strong></span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: grade.color }}>{pct}% — {grade.letter}</span>
                        </div>
                        <div className="progress-bar-wrapper">
                          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${grade.color}60, ${grade.color})` }} />
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 900, color: grade.color }}>{grade.letter}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Grade</div>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ marginTop: '0.5rem' }}
                        onClick={() => navigate(`/exam/${exam.id}`)}
                      >
                        📝 Review
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Reminder Toast */}
      {reminder && (
        <div className="toast">
          <span style={{ fontSize: '1.1rem' }}>✅</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{reminder}</span>
        </div>
      )}
    </div>
  );
}

export default ExamPage;
