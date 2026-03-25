import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PRACTICE_SETS = [
  {
    id: 1,
    title: 'Arrays Fundamentals',
    topic: 'arrays',
    icon: '📦',
    color: '#14b8a6',
    assignedBy: 'Prof. Sharma',
    dueDate: '2026-03-25',
    totalProblems: 5,
    completed: 2,
    problems: [
      { id: 'a1', title: 'Two Sum', difficulty: 'EASY', done: true },
      { id: 'a2', title: 'Maximum Subarray', difficulty: 'MEDIUM', done: true },
      { id: 'a3', title: 'Rotate Array', difficulty: 'MEDIUM', done: false },
      { id: 'a4', title: 'Find Missing Number', difficulty: 'EASY', done: false },
      { id: 'a5', title: 'Merge Sorted Arrays', difficulty: 'EASY', done: false },
    ]
  },
  {
    id: 2,
    title: 'String Mastery',
    topic: 'strings',
    icon: '🔤',
    color: '#8b5cf6',
    assignedBy: 'Prof. Sharma',
    dueDate: '2026-03-28',
    totalProblems: 4,
    completed: 0,
    problems: [
      { id: 's1', title: 'Reverse a String', difficulty: 'EASY', done: false },
      { id: 's2', title: 'Valid Palindrome', difficulty: 'EASY', done: false },
      { id: 's3', title: 'Longest Substring Without Repeating', difficulty: 'MEDIUM', done: false },
      { id: 's4', title: 'Anagram Check', difficulty: 'EASY', done: false },
    ]
  },
  {
    id: 3,
    title: 'Stacks & Queues',
    topic: 'stacks-queues',
    icon: '📚',
    color: '#f59e0b',
    assignedBy: 'Prof. Rajan',
    dueDate: '2026-04-01',
    totalProblems: 4,
    completed: 1,
    problems: [
      { id: 'q1', title: 'Valid Parentheses', difficulty: 'EASY', done: true },
      { id: 'q2', title: 'Implement Queue Using Stacks', difficulty: 'MEDIUM', done: false },
      { id: 'q3', title: 'Next Greater Element', difficulty: 'MEDIUM', done: false },
      { id: 'q4', title: 'Min Stack', difficulty: 'MEDIUM', done: false },
    ]
  },
  {
    id: 4,
    title: 'Data Structures Deep Dive',
    topic: 'data-structures',
    icon: '🌲',
    color: '#ec4899',
    assignedBy: 'Prof. Sharma',
    dueDate: '2026-04-05',
    totalProblems: 5,
    completed: 0,
    problems: [
      { id: 'd1', title: 'Implement a Stack', difficulty: 'EASY', done: false },
      { id: 'd2', title: 'Binary Search Tree Insert', difficulty: 'MEDIUM', done: false },
      { id: 'd3', title: 'Linked List Reversal', difficulty: 'MEDIUM', done: false },
      { id: 'd4', title: 'Detect Cycle in Linked List', difficulty: 'MEDIUM', done: false },
      { id: 'd5', title: 'Height of Binary Tree', difficulty: 'EASY', done: false },
    ]
  },
];

const TIPS = [
  { icon: '💡', text: 'Solve at least 2 problems daily to maintain your streak!' },
  { icon: '📌', text: 'Review your wrong answers — understanding mistakes is key.' },
  { icon: '⏱', text: 'Practice under time pressure to simulate real exams.' },
  { icon: '🔁', text: 'Repetition matters — re-solve hard problems after 2 days.' },
];

function Practice({ user }) {
  const navigate = useNavigate();
  const [expandedSet, setExpandedSet] = useState(null);
  const [tipIdx] = useState(Math.floor(Math.random() * TIPS.length));

  const totalCompleted = PRACTICE_SETS.reduce((acc, s) => acc + s.completed, 0);
  const totalProblems = PRACTICE_SETS.reduce((acc, s) => acc + s.totalProblems, 0);
  const overallPct = Math.round((totalCompleted / totalProblems) * 100);

  return (
    <div className="page-wrapper animate-fade-up">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">💪 Practice <span className="gradient-text">Hub</span></h1>
          <p className="page-subtitle">Assigned practice sets from your teachers — tackle them before the deadline!</p>
        </div>
        <div className="streak-widget">🔥 7 day streak</div>
      </div>

      {/* Daily Tip */}
      <div className="alert alert-info animate-fade-up stagger-1" style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{TIPS[tipIdx].icon}</span>
        <div>
          <strong>Daily Tip:</strong> {TIPS[tipIdx].text}
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Overall Progress</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>{totalCompleted} of {totalProblems} problems completed</p>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--teal-400)' }}>{overallPct}%</span>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-fill" style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{PRACTICE_SETS.length}</div>
          <div className="stat-label">Practice Sets</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{totalCompleted}</div>
          <div className="stat-label">Solved</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{totalProblems - totalCompleted}</div>
          <div className="stat-label">Remaining</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">3</div>
          <div className="stat-label">Due This Week</div>
        </div>
      </div>

      {/* Practice Sets */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>Assigned Practice Sets</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {PRACTICE_SETS.map((set, idx) => {
          const pct = Math.round((set.completed / set.totalProblems) * 100);
          const isExpanded = expandedSet === set.id;
          const daysLeft = Math.ceil((new Date(set.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

          return (
            <div key={set.id} className="card" style={{ padding: '1.5rem', animationDelay: `${idx * 0.07}s` }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                onClick={() => setExpandedSet(isExpanded ? null : set.id)}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
                  background: `${set.color}20`, border: `1.5px solid ${set.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem'
                }}>
                  {set.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{set.title}</h3>
                    {daysLeft <= 3 && daysLeft > 0 && (
                      <span className="badge badge-danger">⚡ {daysLeft}d left</span>
                    )}
                    {daysLeft > 3 && (
                      <span className="badge badge-teal">📅 {daysLeft}d left</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Assigned by {set.assignedBy} · {set.totalProblems} problems · Due {set.dueDate}
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{set.completed}/{set.totalProblems} done</span>
                      <span style={{ fontSize: '0.75rem', color: set.color, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${set.color}88, ${set.color})` }} />
                    </div>
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>
                  ▾
                </span>
              </div>

              {isExpanded && (
                <div style={{ marginTop: '1.2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  {set.problems.map((prob, pidx) => (
                    <div key={prob.id} style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.6rem 0', borderBottom: pidx < set.problems.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                    }}>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>
                        {prob.done ? '✅' : '⬜'}
                      </span>
                      <span style={{
                        flex: 1, fontSize: '0.9rem',
                        color: prob.done ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: prob.done ? 'line-through' : 'none'
                      }}>
                        {prob.title}
                      </span>
                      <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span>
                      {!prob.done ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/problems/mock-${prob.id}`)}
                        >
                          Solve →
                        </button>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--teal-400)', fontSize: '0.78rem' }}
                          onClick={() => navigate(`/problems/mock-${prob.id}`)}
                        >
                          Review ↗
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Practice;
