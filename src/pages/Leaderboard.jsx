import React, { useState } from 'react';

const STUDENTS = [
  { rank: 1, name: 'Jaswanth Reddy',  avatar: 'JR', score: 1420, solved: 38, streak: 21, badge: '🥇', trend: '+12' },
  { rank: 2, name: 'Anirudh Sharma',  avatar: 'AS', score: 1380, solved: 35, streak: 15, badge: '🥈', trend: '+8' },
  { rank: 3, name: 'Kavya Nair',      avatar: 'KN', score: 1355, solved: 34, streak: 12, badge: '🥉', trend: '+15' },
  { rank: 4, name: 'Harsha Vardhan',  avatar: 'HV', score: 1290, solved: 32, streak: 9,  badge: null, trend: '+5' },
  { rank: 5, name: 'Javeed Khan',     avatar: 'JK', score: 1240, solved: 30, streak: 7,  badge: null, trend: '+3' },
  { rank: 6, name: 'Rohith Chandra',  avatar: 'RC', score: 1180, solved: 27, streak: 14, badge: null, trend: '-2' },
  { rank: 7, name: 'Adnan Siddiqui',  avatar: 'AD', score: 1100, solved: 25, streak: 5,  badge: null, trend: '+7' },
  { rank: 8, name: 'Hari Prasad',     avatar: 'HP', score: 1050, solved: 23, streak: 3,  badge: null, trend: '+1' },
  { rank: 9, name: 'Srinivas Rao',    avatar: 'SR', score: 980,  solved: 21, streak: 8,  badge: null, trend: '+4' },
  { rank: 10, name: 'Deepika Menon',  avatar: 'DM', score: 920,  solved: 19, streak: 2,  badge: null, trend: '-1' },
];

const YOU_RANK = 4; // Simulated: current user rank

function Leaderboard({ user }) {
  const [filter, setFilter] = useState('all-time');
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="page-wrapper animate-fade-up">
      <div className="page-header">
        <div>
          <h1 className="page-title">🏆 <span className="gradient-text">Leaderboard</span></h1>
          <p className="page-subtitle">Top coders ranked by score, problems solved, and consistency</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all-time', 'monthly', 'weekly'].map(f => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '8px', textTransform: 'capitalize' }}
              onClick={() => setFilter(f)}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* 2nd */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', color: '#000', margin: '0 auto 0.5rem', border: '3px solid #94a3b8' }}>
            {STUDENTS[1].avatar}
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{STUDENTS[1].name.split(' ')[0]}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{STUDENTS[1].score} pts</div>
          <div style={{ marginTop: '0.5rem', background: 'var(--bg-elevated)', border: '1px solid rgba(148,163,184,0.3)', borderRadius: '8px 8px 0 0', padding: '0.75rem 1.5rem', fontSize: '1.5rem' }}>🥈</div>
          <div style={{ background: '#94a3b840', padding: '0.3rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>2nd</div>
        </div>
        {/* 1st */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.4rem', color: '#000', margin: '0 auto 0.5rem', border: '3px solid #f59e0b', boxShadow: '0 0 30px rgba(245,158,11,0.4)' }}>
            {STUDENTS[0].avatar}
          </div>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'white' }}>{STUDENTS[0].name.split(' ')[0]}</div>
          <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700 }}>{STUDENTS[0].score} pts</div>
          <div style={{ marginTop: '0.5rem', background: 'var(--bg-elevated)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '8px 8px 0 0', padding: '1rem 2rem', fontSize: '1.8rem', boxShadow: '0 0 20px rgba(245,158,11,0.2)' }}>🥇</div>
          <div style={{ background: '#f59e0b40', padding: '0.3rem 2rem', fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>1st</div>
        </div>
        {/* 3rd */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #b45309, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color: '#fff', margin: '0 auto 0.5rem', border: '3px solid #b45309' }}>
            {STUDENTS[2].avatar}
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'white' }}>{STUDENTS[2].name.split(' ')[0]}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{STUDENTS[2].score} pts</div>
          <div style={{ marginTop: '0.5rem', background: 'var(--bg-elevated)', border: '1px solid rgba(180,83,9,0.3)', borderRadius: '8px 8px 0 0', padding: '0.5rem 1.5rem', fontSize: '1.3rem' }}>🥉</div>
          <div style={{ background: '#b4530940', padding: '0.3rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#d97706' }}>3rd</div>
        </div>
      </div>

      {/* Your Rank Banner */}
      {!isAdmin && (
        <div style={{ background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.2rem' }}>⭐</span>
          <div style={{ flex: 1 }}>
            <span style={{ color: 'white', fontWeight: 600 }}>Your rank: </span>
            <span style={{ color: 'var(--teal-400)', fontWeight: 800 }}>#{YOU_RANK}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> — Keep solving to climb higher!</span>
          </div>
          <span style={{ color: 'var(--teal-400)', fontWeight: 700, fontSize: '0.85rem' }}>1,290 pts</span>
        </div>
      )}

      {/* Full Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="results-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '1.5rem' }}>Rank</th>
              <th>Student</th>
              <th>Score</th>
              <th>Solved</th>
              <th>Streak</th>
              <th>This Week</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((s, idx) => {
              const isYou = !isAdmin && s.rank === YOU_RANK;
              return (
                <tr key={s.rank} style={{ background: isYou ? 'rgba(13,148,136,0.06)' : undefined }}>
                  <td style={{ paddingLeft: '1.5rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem', background: s.rank === 1 ? 'linear-gradient(135deg,#f59e0b,#fbbf24)' : s.rank === 2 ? 'linear-gradient(135deg,#94a3b8,#cbd5e1)' : s.rank === 3 ? 'linear-gradient(135deg,#b45309,#d97706)' : 'var(--bg-elevated)', color: s.rank <= 3 ? '#000' : 'var(--text-muted)' }}>
                      {s.rank}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-700), var(--accent-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'white', flexShrink: 0 }}>
                        {s.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: isYou ? 'var(--teal-300)' : 'white', fontSize: '0.9rem' }}>
                          {s.name} {isYou && <span style={{ fontSize: '0.72rem', color: 'var(--teal-400)' }}>(You)</span>}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>🔥 {s.streak} day streak</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--teal-400)', fontFamily: 'Fira Code, monospace' }}>{s.score}</td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'Fira Code, monospace' }}>{s.solved}</td>
                  <td><span style={{ color: '#fbbf24', fontWeight: 700 }}>🔥 {s.streak}d</span></td>
                  <td>
                    <span style={{ color: s.trend.startsWith('+') ? '#34d399' : '#f87171', fontWeight: 700, fontSize: '0.85rem' }}>
                      {s.trend.startsWith('+') ? '↑' : '↓'} {s.trend}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
