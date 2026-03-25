import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ProblemDetail.css';

// ======= SAME MOCK DATA AS PROBLEM LIST =======
const MOCK_PROBLEMS = {
  a1: { id: 'a1', title: 'Two Sum', difficulty: 'EASY', category: 'arrays', timeLimit: 1000,
    description: 'Given an array of integers nums and a target integer, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'First line: integer n (array size) and target.\nSecond line: n space-separated integers.',
    outputFormat: 'Two space-separated indices i j such that nums[i] + nums[j] == target.',
    constraints: '2 ≤ n ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\nExactly one valid answer exists.',
    sampleInput: '4 9\n2 7 11 15', sampleOutput: '0 1' },
  a2: { id: 'a2', title: 'Maximum Subarray', difficulty: 'MEDIUM', category: 'arrays', timeLimit: 1000,
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. (Kadane\'s Algorithm)',
    inputFormat: 'First line: integer n.\nSecond line: n space-separated integers.',
    outputFormat: 'A single integer — the maximum subarray sum.',
    constraints: '1 ≤ n ≤ 10⁵\n-10⁴ ≤ nums[i] ≤ 10⁴',
    sampleInput: '9\n-2 1 -3 4 -1 2 1 -5 4', sampleOutput: '6' },
  a3: { id: 'a3', title: 'Rotate Array', difficulty: 'MEDIUM', category: 'arrays', timeLimit: 1000,
    description: 'Given an array, rotate the array to the right by k steps, where k is non-negative.',
    inputFormat: 'First line: n and k.\nSecond line: n space-separated integers.',
    outputFormat: 'n space-separated integers after rotation.',
    constraints: '1 ≤ n ≤ 10⁵\n0 ≤ k ≤ 10⁵',
    sampleInput: '7 3\n1 2 3 4 5 6 7', sampleOutput: '5 6 7 1 2 3 4' },
  a4: { id: 'a4', title: 'Find Missing Number', difficulty: 'EASY', category: 'arrays', timeLimit: 1000,
    description: 'Given an array containing n distinct numbers taken from 0 to n, find the one missing number.',
    inputFormat: 'First line: integer n.\nSecond line: n space-separated integers.',
    outputFormat: 'Single integer — the missing number.',
    constraints: '1 ≤ n ≤ 10⁴',
    sampleInput: '3\n3 0 1', sampleOutput: '2' },
  a5: { id: 'a5', title: 'Merge Sorted Arrays', difficulty: 'EASY', category: 'arrays', timeLimit: 1000,
    description: 'Merge two sorted arrays nums1 and nums2 into nums1 in-place.',
    inputFormat: 'First line: m and n.\nSecond line: m numbers (nums1).\nThird line: n numbers (nums2).',
    outputFormat: 'Space-separated merged sorted array.',
    constraints: '0 ≤ m, n ≤ 200',
    sampleInput: '3 3\n1 2 3\n2 5 6', sampleOutput: '1 2 2 3 5 6' },
  s1: { id: 's1', title: 'Reverse a String', difficulty: 'EASY', category: 'strings', timeLimit: 1000,
    description: 'Write a function that reverses a string. The input string is given as an array of characters. Do it in-place with O(1) extra memory.',
    inputFormat: 'A single string on one line.',
    outputFormat: 'The reversed string.',
    constraints: '1 ≤ s.length ≤ 10⁵\ns[i] is a printable ASCII character.',
    sampleInput: 'hello', sampleOutput: 'olleh' },
  s2: { id: 's2', title: 'Valid Palindrome', difficulty: 'EASY', category: 'strings', timeLimit: 1000,
    description: 'Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    inputFormat: 'A single string.',
    outputFormat: '"true" or "false"',
    constraints: '1 ≤ s.length ≤ 2×10⁵',
    sampleInput: 'A man, a plan, a canal: Panama', sampleOutput: 'true' },
  s3: { id: 's3', title: 'Longest Substring Without Repeating', difficulty: 'MEDIUM', category: 'strings', timeLimit: 1000,
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    inputFormat: 'A single string.',
    outputFormat: 'A single integer.',
    constraints: '0 ≤ s.length ≤ 5×10⁴',
    sampleInput: 'abcabcbb', sampleOutput: '3' },
  s4: { id: 's4', title: 'Anagram Check', difficulty: 'EASY', category: 'strings', timeLimit: 1000,
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    inputFormat: 'Two strings on separate lines.',
    outputFormat: '"true" or "false"',
    constraints: '1 ≤ s.length, t.length ≤ 5×10⁴',
    sampleInput: 'anagram\nnagaram', sampleOutput: 'true' },
  d1: { id: 'd1', title: 'Implement a Stack', difficulty: 'EASY', category: 'data-structures', timeLimit: 2000,
    description: 'Implement a stack using arrays supporting push(x), pop(), peek(), and isEmpty().\nProcess Q commands: PUSH x, POP, PEEK, ISEMPTY.',
    inputFormat: 'First line: Q (number of commands).\nNext Q lines: one command each.',
    outputFormat: 'For POP/PEEK print the value; for ISEMPTY print true/false.',
    constraints: '1 ≤ Q ≤ 10⁴',
    sampleInput: '4\nPUSH 5\nPUSH 3\nPEEK\nPOP', sampleOutput: '3\n3' },
  d2: { id: 'd2', title: 'Binary Search Tree Insert', difficulty: 'MEDIUM', category: 'data-structures', timeLimit: 2000,
    description: 'Insert a sequence of values into a BST and print the inorder traversal.',
    inputFormat: 'First line: n.\nSecond line: n space-separated values to insert.',
    outputFormat: 'Inorder traversal space-separated.',
    constraints: '1 ≤ n ≤ 1000',
    sampleInput: '5\n5 3 7 1 4', sampleOutput: '1 3 4 5 7' },
  d3: { id: 'd3', title: 'Linked List Reversal', difficulty: 'MEDIUM', category: 'data-structures', timeLimit: 1000,
    description: 'Given a singly linked list, reverse it and print the resulting list.',
    inputFormat: 'First line: n.\nSecond line: n space-separated node values.',
    outputFormat: 'Space-separated reversed list.',
    constraints: '0 ≤ n ≤ 5000',
    sampleInput: '5\n1 2 3 4 5', sampleOutput: '5 4 3 2 1' },
  d4: { id: 'd4', title: 'Detect Cycle in Linked List', difficulty: 'MEDIUM', category: 'data-structures', timeLimit: 1000,
    description: 'Given a linked list and a position pos (0-indexed) where tail connects to, determine if the list has a cycle.',
    inputFormat: 'First line: n and pos (-1 if no cycle).\nSecond line: n values.',
    outputFormat: '"true" or "false"',
    constraints: '0 ≤ n ≤ 10⁴',
    sampleInput: '4 1\n3 2 0 -4', sampleOutput: 'true' },
  d5: { id: 'd5', title: 'Height of Binary Tree', difficulty: 'EASY', category: 'data-structures', timeLimit: 1000,
    description: 'Given a binary tree, find its maximum depth (number of nodes along the longest path from root to the farthest leaf).',
    inputFormat: 'Level-order traversal with -1 for null nodes.',
    outputFormat: 'A single integer — the height.',
    constraints: 'Number of nodes ≤ 10⁴',
    sampleInput: '3 9 20 -1 -1 15 7', sampleOutput: '3' },
  q1: { id: 'q1', title: 'Implement Queue Using Stacks', difficulty: 'MEDIUM', category: 'stacks-queues', timeLimit: 1000,
    description: 'Implement a FIFO queue using only two stacks.\nProcess commands: ENQUEUE x, DEQUEUE, PEEK.',
    inputFormat: 'First line: Q.\nNext Q lines: command.',
    outputFormat: 'For DEQUEUE/PEEK print the value.',
    constraints: '1 ≤ Q ≤ 10⁴',
    sampleInput: '4\nENQUEUE 1\nENQUEUE 2\nPEEK\nDEQUEUE', sampleOutput: '1\n1' },
  q2: { id: 'q2', title: 'Valid Parentheses', difficulty: 'EASY', category: 'stacks-queues', timeLimit: 1000,
    description: 'Given a string s containing just \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    inputFormat: 'A single string.',
    outputFormat: '"true" or "false"',
    constraints: '1 ≤ s.length ≤ 10⁴',
    sampleInput: '()[]{}\n([)]', sampleOutput: 'true\nfalse' },
  q3: { id: 'q3', title: 'Next Greater Element', difficulty: 'MEDIUM', category: 'stacks-queues', timeLimit: 1000,
    description: 'For each element in an array, find the next greater element to its right. If none exists, output -1.',
    inputFormat: 'First line: n.\nSecond line: n integers.',
    outputFormat: 'n space-separated integers.',
    constraints: '1 ≤ n ≤ 10⁴',
    sampleInput: '5\n4 5 2 10 8', sampleOutput: '5 10 10 -1 -1' },
  q4: { id: 'q4', title: 'Min Stack', difficulty: 'MEDIUM', category: 'stacks-queues', timeLimit: 1000,
    description: 'Design a stack that supports push, pop, top, and getMin in O(1). Process Q commands.',
    inputFormat: 'First line: Q.\nCommands: PUSH x, POP, TOP, GETMIN.',
    outputFormat: 'Output for TOP and GETMIN.',
    constraints: '1 ≤ Q ≤ 3×10⁴',
    sampleInput: '5\nPUSH -2\nPUSH 0\nPUSH -3\nGETMIN\nPOP', sampleOutput: '-3' },
  i1: { id: 'i1', title: 'Find Duplicate Number', difficulty: 'MEDIUM', category: 'interview', timeLimit: 1000,
    description: 'Given an array nums of n+1 integers where each integer is between 1 and n (inclusive), find the one repeated number (Floyd\'s cycle detection).',
    inputFormat: 'First line: n.\nSecond line: n+1 integers.',
    outputFormat: 'A single integer — the duplicate.',
    constraints: '1 ≤ n ≤ 10⁵',
    sampleInput: '4\n1 3 4 2 2', sampleOutput: '2' },
  i2: { id: 'i2', title: 'LRU Cache', difficulty: 'HARD', category: 'interview', timeLimit: 2000,
    description: 'Design a data structure for an LRU cache with capacity k.\nprocess GET x and PUT x v commands.',
    inputFormat: 'First line: Q and capacity k.\nNext Q lines: GET x or PUT x v.',
    outputFormat: 'For each GET command, print the value or -1.',
    constraints: '1 ≤ k ≤ 3000\n0 ≤ Q ≤ 3×10⁴',
    sampleInput: '5 2\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2', sampleOutput: '1\n-1' },
  i3: { id: 'i3', title: 'Word Search in Matrix', difficulty: 'HARD', category: 'interview', timeLimit: 2000,
    description: 'Given an m×n board of characters and a string word, return true if the word exists on the board using adjacent cells (4-directional).',
    inputFormat: 'First line: m and n.\nNext m lines: n characters each.\nLast line: the word.',
    outputFormat: '"true" or "false"',
    constraints: '1 ≤ m, n ≤ 6\n1 ≤ word.length ≤ 15',
    sampleInput: '3 4\nABCE\nSFCS\nADEE\nSEE', sampleOutput: 'true' },
  i4: { id: 'i4', title: 'Merge K Sorted Lists', difficulty: 'HARD', category: 'interview', timeLimit: 2000,
    description: 'Merge k sorted linked lists and return one sorted list. Analyze and describe its complexity.',
    inputFormat: 'First line: k (number of lists).\nNext k lines: space-separated sorted integers, -1 to end.',
    outputFormat: 'Space-separated merged sorted values.',
    constraints: '0 ≤ k ≤ 10⁴',
    sampleInput: '3\n1 4 5\n1 3 4\n2 6', sampleOutput: '1 1 2 3 4 4 5 6' },
  i5: { id: 'i5', title: 'Number of Islands', difficulty: 'MEDIUM', category: 'interview', timeLimit: 1000,
    description: 'Given an m×n 2D binary grid where \'1\' represents land and \'0\' represents water, count the number of islands (connected 1s).',
    inputFormat: 'First line: m and n.\nNext m lines: n characters (0 or 1) space-separated.',
    outputFormat: 'A single integer — number of islands.',
    constraints: '1 ≤ m, n ≤ 300',
    sampleInput: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0', sampleOutput: '1' },
};

const DEFAULT_CODE = {
  c: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    /* Read input from STDIN. Print output to STDOUT */\n    return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    // Write your solution here\n    return 0;\n}`,
  python: `import sys\ninput = sys.stdin.readline\n\n# Write your solution here\n`,
  javascript: `const readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nconst lines = [];\nrl.on('line', l => lines.push(l.trim()));\nrl.on('close', () => {\n    // Write your solution here\n});\n`,
};

function ProblemDetail({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState(DEFAULT_CODE.c);
    const [language, setLanguage] = useState('c');
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(null);
    const [timerStopped, setTimerStopped] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'submissions'
    const [submissions, setSubmissions] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [tabSize, setTabSize] = useState(4);

    // Timer State
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (id.startsWith('mock-')) {
            // Load from local mock data — no backend needed
            const mockId = id.replace('mock-', '');
            const mockProblem = MOCK_PROBLEMS[mockId];
            if (mockProblem) {
                setProblem(mockProblem);
            } else {
                setProblem({ title: 'Problem Not Found', description: 'This problem could not be loaded.', difficulty: 'EASY' });
            }
            setCode(DEFAULT_CODE.c);
        } else {
            // Try backend
            api.get(`/problems/${id}`)
                .then(res => {
                    setProblem(res.data);
                    setCode(DEFAULT_CODE.c);
                })
                .catch(() => {
                    setProblem({ title: 'Backend Offline', description: 'Could not load problem from server. Start the Spring Boot backend to load this problem.', difficulty: 'EASY' });
                });
        }
    }, [id]);

    useEffect(() => {
        if (timerStopped) return;
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(s => s - 1);
            } else if (minutes > 0) {
                setMinutes(m => m - 1);
                setSeconds(59);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [minutes, seconds, timerStopped]);

    const fetchSubmissions = async () => {
        try {
            const userId = user?.id || 1;
            const res = await api.get(`/submissions/problem/${id}/user/${userId}`);
            setSubmissions(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'submissions') {
            fetchSubmissions();
        }
    };

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setLanguage(lang);
        setCode(DEFAULT_CODE[lang] || DEFAULT_CODE.c);
    };


    const handleSubmit = async () => {
        setLoading(true);
        setResult(null);
        try {
            // Mock problems (non-numeric IDs) cannot be submitted to backend
            if (id.startsWith('mock-')) {
                await new Promise(r => setTimeout(r, 800)); // simulate latency
                const mockResult = { status: 'Submitted Locally — connect a real problem to grade via backend' };
                setResult(mockResult);
                setScore(0);
                setLoading(false);
                return;
            }
            const payload = {
                userId: user?.id || 1,
                problemId: id,
                code,
                language
            };
            const res = await api.post('/submissions', payload);
            setResult(res.data);
            if (res.data.status === 'PASS') {
                setScore(50);
                setTimerStopped(true);
            } else {
                setScore(0);
            }
            // Refresh submissions list if on that tab
            if (activeTab === 'submissions') fetchSubmissions();
        } catch (e) {
            console.error(e);
            setResult({ status: 'Error submitting code' });
            setScore(0);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        if (status === 'PASS') return '#4CAF50';
        if (status === 'Wrong Answer on Test Case 1' || status?.startsWith('Wrong')) return '#FF9800';
        return '#F44336';
    };

    if (!problem) return <div className="loading-state">Loading...</div>;

    return (
        <div className="split-layout">
            {/* Settings Modal */}
            {showSettings && (
                <div className="settings-overlay" onClick={() => setShowSettings(false)}>
                    <div className="settings-modal" onClick={e => e.stopPropagation()}>
                        <div className="settings-header">
                            <h3>Editor Settings</h3>
                            <button className="close-btn" onClick={() => setShowSettings(false)}>✕</button>
                        </div>
                        <div className="settings-body">
                            <div className="settings-row">
                                <label>Font Size: <strong>{fontSize}px</strong></label>
                                <input
                                    type="range" min="10" max="24" value={fontSize}
                                    onChange={e => setFontSize(Number(e.target.value))}
                                    className="settings-slider"
                                />
                            </div>
                            <div className="settings-row">
                                <label>Tab Size: <strong>{tabSize}</strong></label>
                                <select value={tabSize} onChange={e => setTabSize(Number(e.target.value))} className="settings-select">
                                    <option value={2}>2 spaces</option>
                                    <option value={4}>4 spaces</option>
                                    <option value={8}>8 spaces</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Left Pane */}
            <div className="left-pane">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'problem' ? 'active' : ''}`}
                        onClick={() => handleTabChange('problem')}
                    >Problem</div>
                    <div
                        className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
                        onClick={() => handleTabChange('submissions')}
                    >Submissions</div>
                </div>

                {activeTab === 'problem' && (
                    <div className="problem-content">
                        <h2 className="problem-title">
                            {problem.title}
                            <span style={{ marginLeft: '0.5rem' }}
                                  className={`badge badge-${problem.difficulty?.toLowerCase()}`}>
                              {problem.difficulty}
                            </span>
                            {problem.timeLimit && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>⏱ {problem.timeLimit}ms</span>
                            )}
                            <span className="bookmark-icon">🔖</span>
                        </h2>
                        <div className="problem-description">
                            <p style={{ whiteSpace: 'pre-line' }}>{problem.description}</p>
                        </div>
                        {problem.inputFormat && (
                          <div className="problem-section">
                              <h4>Input Format</h4>
                              <p style={{ whiteSpace: 'pre-line' }}>{problem.inputFormat}</p>
                          </div>
                        )}
                        {problem.outputFormat && (
                          <div className="problem-section">
                              <h4>Output Format</h4>
                              <p style={{ whiteSpace: 'pre-line' }}>{problem.outputFormat}</p>
                          </div>
                        )}
                        {problem.constraints && (
                          <div className="problem-section">
                              <h4>Constraints</h4>
                              <p style={{ whiteSpace: 'pre-line', fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>{problem.constraints}</p>
                          </div>
                        )}
                        {(problem.sampleInput || problem.sampleOutput) && (
                          <div className="problem-section">
                              <h4>Sample</h4>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {problem.sampleInput && (
                                  <div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Input</div>
                                    <pre style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.6rem 0.8rem', fontSize: '0.82rem', margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{problem.sampleInput}</pre>
                                  </div>
                                )}
                                {problem.sampleOutput && (
                                  <div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Output</div>
                                    <pre style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.6rem 0.8rem', fontSize: '0.82rem', margin: 0, color: '#86efac', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{problem.sampleOutput}</pre>
                                  </div>
                                )}
                              </div>
                          </div>
                        )}
                    </div>
                )}


                {activeTab === 'submissions' && (
                    <div className="submissions-panel">
                        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>My Submissions</h3>
                        {submissions.length === 0 ? (
                            <div className="no-submissions">
                                <p>No submissions yet.</p>
                                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Submit your code to see results here.</p>
                            </div>
                        ) : (
                            <div className="submissions-list">
                                {submissions.map((sub, idx) => (
                                    <div key={sub.id || idx} className="submission-item">
                                        <div className="sub-header">
                                            <span className="sub-lang">{sub.language?.toUpperCase()}</span>
                                            <span className="sub-status" style={{ color: getStatusColor(sub.status) }}>
                                                {sub.status}
                                            </span>
                                            <span className="sub-time">
                                                {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : ''}
                                            </span>
                                        </div>
                                        <pre className="sub-code">{sub.code}</pre>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right Pane: Code Editor */}
            <div className="right-pane">
                {/* Editor Top Bar */}
                <div className="editor-top-bar">
                    <div className="editor-actions-left">
                        <button className="icon-btn" title="Back to Home" onClick={() => navigate('/')}>←</button>
                        <button className="icon-btn" title="Refresh" onClick={() => {
                            setResult(null);
                            setScore(null);
                        }}>↻</button>
                        <button className="icon-btn" title="Settings" onClick={() => setShowSettings(true)}>⚙</button>
                        <button className="icon-btn" title="Save">💾</button>
                        <div className="score-badge">
                            Score: {score !== null ? `${score} / 50` : '-- / 50'}
                        </div>
                    </div>

                    <div className="editor-actions-right">
                        <div className="timer">
                            <div className="time-display">
                                <span>{String(minutes).padStart(2, '0')}</span> : <span>{String(seconds).padStart(2, '0')}</span>
                            </div>
                            <div className="time-labels">
                                <small>Minutes</small> <small>Seconds</small>
                            </div>
                        </div>
                        <div className="language-select-wrapper">
                            <label>Language*</label>
                            <select value={language} onChange={handleLanguageChange} className="language-select">
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Editor textarea */}
                <div className="editor-container">
                    <div className="line-numbers">
                        {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                    </div>
                    <textarea
                        className="code-textarea"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck="false"
                        style={{ fontSize: `${fontSize}px`, tabSize: tabSize }}
                        onKeyDown={(e) => {
                            if (e.key === 'Tab') {
                                e.preventDefault();
                                const start = e.target.selectionStart;
                                const end = e.target.selectionEnd;
                                const spaces = ' '.repeat(tabSize);
                                const newCode = code.substring(0, start) + spaces + code.substring(end);
                                setCode(newCode);
                                setTimeout(() => e.target.setSelectionRange(start + tabSize, start + tabSize), 0);
                            }
                        }}
                    />
                </div>

                {/* Editor Bottom Bar */}
                <div className="editor-bottom-bar">
                    <div className="bottom-left">
                        <button className="console-btn">^ Console</button>
                        <button className="query-btn">Raise Query</button>
                    </div>
                    <div className="bottom-right">
                        {result && (
                            <span style={{ color: getStatusColor(result.status), marginRight: '15px', fontSize: '0.85rem' }}>
                                {result.status}
                            </span>
                        )}
                        <button className="run-btn" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Running...' : 'Run'}
                        </button>
                        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemDetail;
