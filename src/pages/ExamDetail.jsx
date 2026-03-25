import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ProblemDetail.css';

// Exam problem definitions (mapped by examId)
const EXAM_PROBLEMS = {
  1: [ // Mid-Semester
    { id: 'a1', title: 'Two Sum',         difficulty: 'EASY',   marks: 20, description: 'Given an array of integers and target, return indices of pair that sums to target.', sampleInput: '4 9\n2 7 11 15', sampleOutput: '0 1' },
    { id: 'a2', title: 'Maximum Subarray', difficulty: 'MEDIUM', marks: 20, description: 'Find the contiguous subarray with the largest sum (Kadane\'s Algorithm).', sampleInput: '9\n-2 1 -3 4 -1 2 1 -5 4', sampleOutput: '6' },
    { id: 's1', title: 'Reverse a String', difficulty: 'EASY',   marks: 20, description: 'Reverse a string in-place.', sampleInput: 'hello', sampleOutput: 'olleh' },
    { id: 'q2', title: 'Valid Parentheses', difficulty: 'EASY',  marks: 20, description: 'Given a string of brackets, determine if it is valid.', sampleInput: '()[]{}\n([)]', sampleOutput: 'true\nfalse' },
    { id: 'i5', title: 'Number of Islands', difficulty: 'MEDIUM', marks: 20, description: 'Count connected islands in a 2D grid of 1s and 0s.', sampleInput: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0', sampleOutput: '1' },
  ],
  2: [ // Unit Test Linked Lists
    { id: 'd3', title: 'Linked List Reversal',     difficulty: 'MEDIUM', marks: 20, description: 'Reverse a singly linked list.', sampleInput: '5\n1 2 3 4 5', sampleOutput: '5 4 3 2 1' },
    { id: 'd4', title: 'Detect Cycle in Linked List', difficulty: 'MEDIUM', marks: 15, description: 'Determine if the linked list has a cycle.', sampleInput: '4 1\n3 2 0 -4', sampleOutput: 'true' },
    { id: 'd2', title: 'BST Insert',               difficulty: 'MEDIUM', marks: 15, description: 'Insert values into BST and print inorder traversal.', sampleInput: '5\n5 3 7 1 4', sampleOutput: '1 3 4 5 7' },
  ],
  3: [ // Arrays & Strings Quiz
    { id: 'a4', title: 'Find Missing Number', difficulty: 'EASY', marks: 15, description: 'Find the missing number in [0..n].', sampleInput: '3\n3 0 1', sampleOutput: '2' },
    { id: 's4', title: 'Anagram Check',       difficulty: 'EASY', marks: 15, description: 'Check if two strings are anagrams.', sampleInput: 'anagram\nnagaram', sampleOutput: 'true' },
  ],
  4: [ // Algorithm Efficiency Test
    { id: 'a2', title: 'Maximum Subarray',    difficulty: 'MEDIUM', marks: 15, description: 'Kadane\'s Algorithm.', sampleInput: '9\n-2 1 -3 4 -1 2 1 -5 4', sampleOutput: '6' },
    { id: 's3', title: 'Longest Substring',   difficulty: 'MEDIUM', marks: 15, description: 'Longest substring without repeating characters.', sampleInput: 'abcabcbb', sampleOutput: '3' },
    { id: 'a3', title: 'Rotate Array',        difficulty: 'MEDIUM', marks: 15, description: 'Rotate an array to the right by k steps.', sampleInput: '7 3\n1 2 3 4 5 6 7', sampleOutput: '5 6 7 1 2 3 4' },
    { id: 'i1', title: 'Find Duplicate',      difficulty: 'MEDIUM', marks: 15, description: 'Find the duplicate number using Floyd\'s cycle detection.', sampleInput: '4\n1 3 4 2 2', sampleOutput: '2' },
  ],
};

const EXAM_META = {
  1: { title: 'Mid-Semester Coding Exam',    duration: 90,  totalMarks: 100, subject: 'Data Structures & Algorithms' },
  2: { title: 'Unit Test — Linked Lists',    duration: 45,  totalMarks: 50,  subject: 'Data Structures' },
  3: { title: 'Arrays & Strings Quiz',       duration: 30,  totalMarks: 30,  subject: 'Programming Lab' },
  4: { title: 'Algorithm Efficiency Test',   duration: 60,  totalMarks: 60,  subject: 'Introduction to Algorithms' },
};

const DEFAULT_CODE = {
  c: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    /* Read input from STDIN. Print output to STDOUT */\n    return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    return 0;\n}`,
  python: `import sys\ninput = sys.stdin.readline\n\n# Write your solution here\n`,
  javascript: `const readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nconst lines = [];\nrl.on('line', l => lines.push(l.trim()));\nrl.on('close', () => {\n    // Write your solution here\n});\n`,
};

function ExamDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const examId = parseInt(id);
  const meta = EXAM_META[examId] || { title: 'Exam', duration: 60, totalMarks: 0, subject: '' };
  const problems = EXAM_PROBLEMS[examId] || [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [codes, setCodes] = useState(() => problems.reduce((acc, p) => ({ ...acc, [p.id]: DEFAULT_CODE.c }), {}));
  const [language, setLanguage] = useState('c');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  // Timer
  const [timeLeft, setTimeLeft] = useState(meta.duration * 60);
  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setTimeLeft(s => {
      if (s <= 1) { clearInterval(t); setSubmitted(true); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const timerColor = timeLeft < 300 ? '#f87171' : timeLeft < 600 ? '#fbbf24' : 'var(--teal-400)';

  const currentProb = problems[currentIdx];

  const handleRun = async () => {
    if (!currentProb) return;
    setLoading(true);
    try {
      // Exam problems use mock string IDs (e.g. 'a1', 's1') — skip backend
      const probIdNum = Number(currentProb.id);
      if (!currentProb.id || isNaN(probIdNum)) {
        await new Promise(r => setTimeout(r, 700));
        setResults(prev => ({ ...prev, [currentProb.id]: { status: 'Submitted – backend grading requires a real numeric problem ID' } }));
        return;
      }
      const res = await api.post('/submissions', {
        userId: user?.id || 1,
        problemId: currentProb.id,
        code: codes[currentProb.id],
        language,
      });
      setResults(prev => ({ ...prev, [currentProb.id]: res.data }));
    } catch {
      setResults(prev => ({ ...prev, [currentProb.id]: { status: 'System Error – check that execution service is running' } }));
    } finally {
      setLoading(false);
    }
  };

  const handleLangChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCodes(prev => ({ ...prev, [currentProb.id]: DEFAULT_CODE[lang] || DEFAULT_CODE.c }));
  };

  const handleFinalSubmit = () => setSubmitted(true);

  const totalScore = problems.reduce((acc, p) => {
    const r = results[p.id];
    if (r?.status === 'PASS') return acc + p.marks;
    return acc;
  }, 0);

  if (submitted) {
    const pct = meta.totalMarks > 0 ? Math.round((totalScore / meta.totalMarks) * 100) : 0;
    const grade = pct >= 90 ? 'A+' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'F';
    const gradeColor = pct >= 75 ? '#34d399' : pct >= 60 ? '#fbbf24' : '#f87171';
    return (
      <div className="page-wrapper animate-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '1.5rem' }}>
        <div style={{ fontSize: '4rem' }}>{pct >= 75 ? '🎉' : pct >= 40 ? '👍' : '💪'}</div>
        <h1 style={{ color: 'white', fontSize: '2rem', margin: 0 }}>Exam Submitted!</h1>
        <p style={{ color: 'var(--text-muted)' }}>{meta.title}</p>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', minWidth: 340 }}>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: gradeColor }}>{grade}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginTop: '0.5rem' }}>
            {totalScore} / {meta.totalMarks}
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{pct}% score</div>
          <div style={{ height: 8, background: 'var(--border)', borderRadius: 8, overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${gradeColor}88, ${gradeColor})`, borderRadius: 8, transition: 'width 1s ease' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {problems.map(p => {
              const r = results[p.id];
              const pass = r?.status === 'PASS';
              return (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{p.title}</span>
                  <span style={{ color: pass ? '#34d399' : '#f87171', fontWeight: 700 }}>
                    {pass ? `+${p.marks}` : codes[p.id]?.length > 50 ? 'Wrong' : 'Skipped'}
                  </span>
                </div>
              );
            })}
          </div>
          <button className="btn btn-primary btn-full" onClick={() => navigate('/exam')}>← Back to Exams</button>
        </div>
      </div>
    );
  }

  if (!currentProb) return <div className="loading-state">Loading exam...</div>;

  return (
    <div className="split-layout">
      {/* Left Pane — Problem */}
      <div className="left-pane">
        {/* Exam header */}
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📝 Exam</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{meta.title}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Time Left</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: timerColor, fontFamily: 'Fira Code, monospace', letterSpacing: '2px' }}>
                {mins}:{secs}
              </div>
            </div>
          </div>
          {/* Question navigator */}
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            {problems.map((p, i) => {
              const done = !!results[p.id];
              const active = i === currentIdx;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentIdx(i)}
                  style={{
                    width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                    background: active ? 'var(--teal-500)' : done ? 'rgba(52,211,153,0.2)' : 'var(--bg-card)',
                    color: active ? 'white' : done ? '#34d399' : 'var(--text-muted)',
                    outline: active ? '2px solid var(--teal-400)' : 'none',
                  }}
                >{i + 1}</button>
              );
            })}
          </div>
        </div>

        {/* Problem content */}
        <div className="problem-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Q{currentIdx + 1} of {problems.length}</span>
            <span className={`badge badge-${currentProb.difficulty.toLowerCase()}`}>{currentProb.difficulty}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--teal-400)', fontWeight: 700 }}>+{currentProb.marks} marks</span>
          </div>
          <h2 className="problem-title" style={{ fontSize: '1.15rem' }}>{currentProb.title}</h2>
          <div className="problem-description">
            <p style={{ whiteSpace: 'pre-line' }}>{currentProb.description}</p>
          </div>
          {(currentProb.sampleInput || currentProb.sampleOutput) && (
            <div className="problem-section">
              <h4>Sample</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {currentProb.sampleInput && (
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Input</div>
                    <pre style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.6rem', fontSize: '0.82rem', margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>{currentProb.sampleInput}</pre>
                  </div>
                )}
                {currentProb.sampleOutput && (
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Output</div>
                    <pre style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.6rem', fontSize: '0.82rem', margin: 0, color: '#86efac', whiteSpace: 'pre-wrap' }}>{currentProb.sampleOutput}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0}>← Prev</button>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentIdx(i => Math.min(problems.length - 1, i + 1))} disabled={currentIdx === problems.length - 1}>Next →</button>
            <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto', background: 'linear-gradient(135deg, #ef4444, #dc2626)' }} onClick={handleFinalSubmit}>
              🏁 Finish &amp; Submit
            </button>
          </div>
        </div>
      </div>

      {/* Right Pane — Editor */}
      <div className="right-pane">
        <div className="editor-top-bar">
          <div className="editor-actions-left">
            <button className="icon-btn" title="Back" onClick={() => navigate('/exam')}>←</button>
            <div className="score-badge">
              Q{currentIdx + 1} | {currentProb.marks} marks
            </div>
          </div>
          <div className="editor-actions-right">
            <div className="timer">
              <div className="time-display" style={{ color: timerColor }}>
                <span>{mins}</span> : <span>{secs}</span>
              </div>
              <div className="time-labels"><small>Min</small> <small>Sec</small></div>
            </div>
            <div className="language-select-wrapper">
              <label>Language*</label>
              <select value={language} onChange={handleLangChange} className="language-select">
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
            </div>
          </div>
        </div>

        <div className="editor-container">
          <div className="line-numbers">
            {(codes[currentProb.id] || '').split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          <textarea
            className="code-textarea"
            value={codes[currentProb.id] || ''}
            onChange={e => setCodes(prev => ({ ...prev, [currentProb.id]: e.target.value }))}
            spellCheck={false}
            style={{ fontSize: `${fontSize}px` }}
            onKeyDown={e => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const s = e.target.selectionStart, en = e.target.selectionEnd;
                const v = codes[currentProb.id] || '';
                const nv = v.substring(0, s) + '    ' + v.substring(en);
                setCodes(prev => ({ ...prev, [currentProb.id]: nv }));
                setTimeout(() => e.target.setSelectionRange(s + 4, s + 4), 0);
              }
            }}
          />
        </div>

        <div className="editor-bottom-bar">
          <div className="bottom-left">
            {results[currentProb.id] && (
              <span style={{
                color: results[currentProb.id].status === 'PASS' ? '#34d399' : '#f87171',
                fontSize: '0.85rem', fontWeight: 600
              }}>
                {results[currentProb.id].status === 'PASS' ? '✅ Passed' : `❌ ${results[currentProb.id].status}`}
              </span>
            )}
          </div>
          <div className="bottom-right">
            <button className="run-btn" onClick={handleRun} disabled={loading}>
              {loading ? 'Running...' : 'Run'}
            </button>
            <button className="submit-btn" onClick={handleRun} disabled={loading}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDetail;
