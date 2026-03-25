import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const CATEGORIES = [
  { id: 'all', label: '🔍 All', icon: '🔍' },
  { id: 'arrays', label: '📦 Arrays', icon: '📦' },
  { id: 'strings', label: '🔤 Strings', icon: '🔤' },
  { id: 'data-structures', label: '🌲 Data Structures', icon: '🌲' },
  { id: 'stacks-queues', label: '📚 Stacks & Queues', icon: '📚' },
  { id: 'interview', label: '💼 Interview Ready', icon: '💼' },
];

const MOCK_EXTRA_PROBLEMS = [
  { id: 'a1', title: 'Two Sum', difficulty: 'EASY', category: 'arrays', description: 'Given an array of integers and a target, return indices of the two numbers that add up to target.' },
  { id: 'a2', title: 'Maximum Subarray', difficulty: 'MEDIUM', category: 'arrays', description: 'Find the contiguous subarray which has the largest sum.' },
  { id: 'a3', title: 'Rotate Array', difficulty: 'MEDIUM', category: 'arrays', description: 'Rotate an array to the right by k steps, where k is non-negative.' },
  { id: 'a4', title: 'Find Missing Number', difficulty: 'EASY', category: 'arrays', description: 'Given an array containing n distinct numbers in range [0,n], find the missing one.' },
  { id: 'a5', title: 'Merge Sorted Arrays', difficulty: 'EASY', category: 'arrays', description: 'Merge two sorted arrays into a single sorted array in-place.' },
  { id: 's1', title: 'Reverse a String', difficulty: 'EASY', category: 'strings', description: 'Write a function that reverses a string in-place.' },
  { id: 's2', title: 'Valid Palindrome', difficulty: 'EASY', category: 'strings', description: 'Check if a string is a palindrome, considering only alphanumeric characters.' },
  { id: 's3', title: 'Longest Substring Without Repeating', difficulty: 'MEDIUM', category: 'strings', description: 'Find the length of the longest substring without repeating characters.' },
  { id: 's4', title: 'Anagram Check', difficulty: 'EASY', category: 'strings', description: 'Given two strings, check if one is an anagram of the other.' },
  { id: 'd1', title: 'Implement a Stack', difficulty: 'EASY', category: 'data-structures', description: 'Implement a stack using arrays with push, pop, peek, and isEmpty operations.' },
  { id: 'd2', title: 'Binary Search Tree Insert', difficulty: 'MEDIUM', category: 'data-structures', description: 'Insert a value into a Binary Search Tree and return the root.' },
  { id: 'd3', title: 'Linked List Reversal', difficulty: 'MEDIUM', category: 'data-structures', description: 'Reverse a singly linked list.' },
  { id: 'd4', title: 'Detect Cycle in Linked List', difficulty: 'MEDIUM', category: 'data-structures', description: 'Given a linked list, determine if it has a cycle.' },
  { id: 'd5', title: 'Height of Binary Tree', difficulty: 'EASY', category: 'data-structures', description: 'Calculate the maximum depth of a binary tree.' },
  { id: 'q1', title: 'Implement Queue Using Stacks', difficulty: 'MEDIUM', category: 'stacks-queues', description: 'Implement a queue using two stacks supporting enqueue, dequeue and peek.' },
  { id: 'q2', title: 'Valid Parentheses', difficulty: 'EASY', category: 'stacks-queues', description: 'Check if the given string of brackets is valid and properly matched.' },
  { id: 'q3', title: 'Next Greater Element', difficulty: 'MEDIUM', category: 'stacks-queues', description: 'For each element find the next greater element using a stack.' },
  { id: 'q4', title: 'Min Stack', difficulty: 'MEDIUM', category: 'stacks-queues', description: 'Design a stack that supports push, pop, top, and retrieving the minimum element.' },
  { id: 'i1', title: 'Find Duplicate Number', difficulty: 'MEDIUM', category: 'interview', description: 'Given an array of n+1 integers where each integer is 1 to n, find the duplicate.' },
  { id: 'i2', title: 'LRU Cache', difficulty: 'HARD', category: 'interview', description: 'Design a data structure that follows the LRU cache replacement policy.' },
  { id: 'i3', title: 'Word Search in Matrix', difficulty: 'HARD', category: 'interview', description: 'Given a board and a word, find if the word exists in the grid using DFS.' },
  { id: 'i4', title: 'Merge K Sorted Lists', difficulty: 'HARD', category: 'interview', description: 'Merge k sorted linked lists and return it as one sorted list.' },
  { id: 'i5', title: 'Number of Islands', difficulty: 'MEDIUM', category: 'interview', description: 'Count the number of islands in a 2D grid using BFS/DFS.' },
];

function ProblemList({ user }) {
  const [backendProblems, setBackendProblems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    api.get('/problems')
      .then(res => setBackendProblems(res.data))
      .catch(err => console.error(err));
  }, []);

  const backendMapped = backendProblems.map(p => ({ ...p, category: 'interview', isBackend: true }));
  const allProblems = [...backendMapped, ...MOCK_EXTRA_PROBLEMS];

  const filtered = allProblems.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    return matchCat && matchSearch && matchDiff;
  });

  const counts = {
    easy: allProblems.filter(p => p.difficulty === 'EASY').length,
    medium: allProblems.filter(p => p.difficulty === 'MEDIUM').length,
    hard: allProblems.filter(p => p.difficulty === 'HARD').length,
  };

  return (
    <div className="page-wrapper animate-fade-up">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Coding <span className="gradient-text">Problems</span></h1>
          <p className="page-subtitle">Master algorithms and ace your interviews</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-easy">{counts.easy} Easy</span>
          <span className="badge badge-medium">{counts.medium} Medium</span>
          <span className="badge badge-hard">{counts.hard} Hard</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid stagger-1">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{allProblems.length}</div>
          <div className="stat-label">Total Problems</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">3</div>
          <div className="stat-label">Solved</div>
          <div className="stat-change">↑ +1 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">7</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">68%</div>
          <div className="stat-label">Acceptance Rate</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search problems by title or keyword..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <select
            className="input-field-box btn-sm"
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value)}
            style={{ width: 'auto', padding: '0.35rem 0.8rem', fontSize: '0.82rem' }}
          >
            <option value="all">All Levels</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      {/* Problem count */}
      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Showing <strong style={{ color: 'var(--teal-400)' }}>{filtered.length}</strong> problems
        {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
      </div>

      {/* Problems list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔎</div>
            <div>No problems match your search. Try a different keyword or category.</div>
          </div>
        ) : filtered.map((problem, idx) => (
          <Link
            key={problem.id}
            to={problem.isBackend ? `/problems/${problem.id}` : `/problems/mock-${problem.id}`}
            className="problem-card"
            style={{ animationDelay: `${idx * 0.03}s`, textDecoration: 'none' }}
          >
            <span className="problem-number">#{String(idx + 1).padStart(2, '0')}</span>
            <div className="problem-info">
              <div className="problem-title-text">{problem.title}</div>
              <div className="problem-meta">
                {problem.isBackend ? (
                  <>
                    <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>💼 Interview</span>
                    <span className="problem-meta-item">⏱ {problem.timeLimit || 2000}ms</span>
                  </>
                ) : (
                  <>
                    <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                      {CATEGORIES.find(c => c.id === problem.category)?.icon}{' '}
                      {CATEGORIES.find(c => c.id === problem.category)?.label.split(' ').slice(1).join(' ')}
                    </span>
                    <span className="problem-meta-item" style={{ fontSize: '0.72rem', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {problem.description?.substring(0, 60)}...
                    </span>
                  </>
                )}
              </div>
            </div>
            <span className={`badge badge-${problem.difficulty?.toLowerCase()}`}>
              {problem.difficulty}
            </span>
          </Link>
        ))}

      </div>
    </div>
  );
}

export default ProblemList;
