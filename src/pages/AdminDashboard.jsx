import React, { useState, useEffect } from 'react';
import api from '../services/api';

/* ===================== MOCK DATA ===================== */
const MOCK_STUDENT_RESULTS = [
  { id: 1, name: 'Anirudh Sharma',  avatar: 'AS', exam: 'Mid-Semester Coding Exam', score: 88, maxScore: 100, timeTaken: 72, attempted: '2026-03-18', previousScore: 74, status: 'PASS' },
  { id: 2, name: 'Harsha Vardhan',  avatar: 'HV', exam: 'Mid-Semester Coding Exam', score: 76, maxScore: 100, timeTaken: 85, attempted: '2026-03-18', previousScore: 65, status: 'PASS' },
  { id: 3, name: 'Jaswanth Reddy',  avatar: 'JR', exam: 'Mid-Semester Coding Exam', score: 95, maxScore: 100, timeTaken: 61, attempted: '2026-03-18', previousScore: 80, status: 'PASS' },
  { id: 4, name: 'Hari Prasad',     avatar: 'HP', exam: 'Mid-Semester Coding Exam', score: 52, maxScore: 100, timeTaken: 90, attempted: '2026-03-18', previousScore: 58, status: 'FAIL' },
  { id: 5, name: 'Javeed Khan',     avatar: 'JK', exam: 'Mid-Semester Coding Exam', score: 68, maxScore: 100, timeTaken: 78, attempted: '2026-03-18', previousScore: 55, status: 'PASS' },
  { id: 6, name: 'Adnan Siddiqui',  avatar: 'AD', exam: 'Mid-Semester Coding Exam', score: 41, maxScore: 100, timeTaken: 90, attempted: '2026-03-18', previousScore: 48, status: 'FAIL' },
  { id: 7, name: 'Kavya Nair',      avatar: 'KN', exam: 'Mid-Semester Coding Exam', score: 79, maxScore: 100, timeTaken: 65, attempted: '2026-03-18', previousScore: 62, status: 'PASS' },
  { id: 8, name: 'Rohith Chandra',  avatar: 'RC', exam: 'Mid-Semester Coding Exam', score: 83, maxScore: 100, timeTaken: 70, attempted: '2026-03-18', previousScore: 77, status: 'PASS' },
  { id: 1, name: 'Anirudh Sharma',  avatar: 'AS', exam: 'Arrays & Strings Quiz',    score: 28, maxScore: 30,  timeTaken: 22, attempted: '2026-03-15', previousScore: 22, status: 'PASS' },
  { id: 2, name: 'Harsha Vardhan',  avatar: 'HV', exam: 'Arrays & Strings Quiz',    score: 21, maxScore: 30,  timeTaken: 29, attempted: '2026-03-15', previousScore: 18, status: 'PASS' },
  { id: 4, name: 'Hari Prasad',     avatar: 'HP', exam: 'Arrays & Strings Quiz',    score: 14, maxScore: 30,  timeTaken: 30, attempted: '2026-03-15', previousScore: 17, status: 'FAIL' },
  { id: 5, name: 'Javeed Khan',     avatar: 'JK', exam: 'Arrays & Strings Quiz',    score: 25, maxScore: 30,  timeTaken: 25, attempted: '2026-03-15', previousScore: 20, status: 'PASS' },
];

const MOCK_EXAMS = [
  { id: 1, title: 'Mid-Semester Coding Exam', subject: 'DSA',         duration: 90, totalMarks: 100, startDate: '2026-03-25T09:00', endDate: '2026-03-25T10:30', status: 'upcoming', attempts: 0 },
  { id: 2, title: 'Unit Test — Linked Lists', subject: 'DS',          duration: 45, totalMarks: 50,  startDate: '2026-03-22T14:00', endDate: '2026-03-22T14:45', status: 'live',     attempts: 38 },
  { id: 3, title: 'Arrays & Strings Quiz',    subject: 'Programming', duration: 30, totalMarks: 30,  startDate: '2026-03-18T10:00', endDate: '2026-03-18T10:30', status: 'completed',attempts: 42 },
];

const MOCK_PRACTICE_SETS = [
  { id: 1, title: 'Arrays Fundamentals', topic: 'Arrays',       assignedTo: '2nd Year CS', problems: 5, dueDate: '2026-03-25', submissions: 18, totalStudents: 42 },
  { id: 2, title: 'String Mastery',      topic: 'Strings',      assignedTo: '2nd Year CS', problems: 4, dueDate: '2026-03-28', submissions: 8,  totalStudents: 42 },
  { id: 3, title: 'Stacks & Queues',     topic: 'Stacks/Queues',assignedTo: '3rd Year CS', problems: 4, dueDate: '2026-04-01', submissions: 12, totalStudents: 36 },
];

// ========= MY CLASSES DATA =========
const DEFAULT_CLASSES = [
  {
    id: 1, name: '2nd Year CS — Section A', code: 'CS2A', subject: 'Data Structures & Algorithms',
    semester: '4th Sem', room: 'CS Lab 1', schedule: 'Mon, Wed, Fri — 9:00 AM',
    totalStudents: 42, activeStudents: 38, icon: '💻', color: '#14b8a6',
    examsGiven: 2, practiceAssigned: 2, avgScore: 73,
    students: ['Anirudh Sharma', 'Harsha Vardhan', 'Jaswanth Reddy', 'Hari Prasad', 'Javeed Khan', 'Adnan Siddiqui', 'Kavya Nair', 'Rohith Chandra'],
    invites: [],
    recentActivity: [
      { type: 'exam',     label: 'Arrays & Strings Quiz',       date: '2026-03-18', status: 'completed' },
      { type: 'practice', label: 'Arrays Fundamentals assigned', date: '2026-03-16', status: 'ongoing' },
      { type: 'exam',     label: 'Mid-Semester Exam scheduled',  date: '2026-03-12', status: 'upcoming' },
    ],
  },
  {
    id: 2, name: '3rd Year CS — Section B', code: 'CS3B', subject: 'Advanced Algorithms',
    semester: '6th Sem', room: 'CS Lab 2', schedule: 'Tue, Thu — 11:00 AM',
    totalStudents: 36, activeStudents: 34, icon: '🌲', color: '#8b5cf6',
    examsGiven: 1, practiceAssigned: 1, avgScore: 68,
    students: ['Srinivas Rao', 'Deepika Menon', 'Salman Hyder', 'Nithya Krishnan'],
    invites: [],
    recentActivity: [
      { type: 'practice', label: 'Stacks & Queues assigned',      date: '2026-03-17', status: 'ongoing' },
      { type: 'exam',     label: 'Unit Test — Linked Lists live', date: '2026-03-13', status: 'live' },
    ],
  },
  {
    id: 3, name: '1st Year CS — Section C', code: 'CS1C', subject: 'Introduction to Programming',
    semester: '2nd Sem', room: 'Lab 3', schedule: 'Mon, Wed — 2:00 PM',
    totalStudents: 55, activeStudents: 50, icon: '🚀', color: '#f59e0b',
    examsGiven: 0, practiceAssigned: 0, avgScore: null,
    students: ['Rithvik Patel', 'Aisha Banu', 'Karthik Subramani'],
    invites: [],
    recentActivity: [
      { type: 'info', label: 'Class starts next week', date: '2026-03-20', status: 'upcoming' },
    ],
  },
];

const CLASS_COLORS = ['#14b8a6','#8b5cf6','#f59e0b','#3b82f6','#ec4899','#22c55e'];
const CLASS_ICONS  = ['💻','🌲','🚀','🔬','🎯','📐','🧠','⚡'];

const TAB_CONFIG = [
  { id: 'classes',   label: 'My Classes',   icon: '🏫' },
  { id: 'problems',  label: 'Problems',     icon: '📝' },
  { id: 'testcases', label: 'Test Cases',   icon: '🧪' },
  { id: 'exams',     label: 'Exams',        icon: '📋' },
  { id: 'practice',  label: 'Practice Sets',icon: '💪' },
  { id: 'results',   label: 'Results',      icon: '📊' },
];

/* ===================== CSV EXPORT ===================== */
function exportToCSV(data, filename) {
  if (!data || data.length === 0) return;

  const headers = ['Rank', 'Student Name', 'Exam', 'Score', 'Max Score', 'Percentage', 'Time Taken (min)', 'Previous Score', 'Improvement', 'Status', 'Date'];
  const sorted = [...data].sort((a, b) => b.score - a.score);

  const rows = sorted.map((r, idx) => {
    const pct = Math.round((r.score / r.maxScore) * 100);
    const improvement = r.score - r.previousScore;
    return [
      idx + 1,
      r.name,
      `"${r.exam}"`,
      r.score,
      r.maxScore,
      `${pct}%`,
      r.timeTaken,
      r.previousScore,
      improvement >= 0 ? `+${improvement}` : improvement,
      r.status,
      r.attempted,
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ===================== MAIN COMPONENT ===================== */
function AdminDashboard({ user, initialTab = 'classes' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);
  const [toast, setToast] = useState(null);
  const [expandedClass, setExpandedClass] = useState(null);

  // Classes state (persisted in localStorage)
  const [classes, setClasses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('codeeval-classes')) || DEFAULT_CLASSES; }
    catch { return DEFAULT_CLASSES; }
  });

  // Create Class modal
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [newClassName, setNewClassName]       = useState('');
  const [newClassSubject, setNewClassSubject] = useState('');
  const [newClassSemester, setNewClassSemester] = useState('');
  const [newClassRoom, setNewClassRoom]       = useState('');
  const [newClassSchedule, setNewClassSchedule] = useState('');
  const [newClassCode, setNewClassCode]       = useState('');

  // Invite Students modal
  const [inviteClassId, setInviteClassId]     = useState(null);
  const [inviteEmails, setInviteEmails]       = useState('');

  // Problem form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('EASY');
  const [timeLimit, setTimeLimit] = useState(2000);
  const [category, setCategory] = useState('arrays');
  const [lastProblemId, setLastProblemId] = useState(null);

  // Test case form
  const [problemId, setProblemId] = useState('');
  const [inputData, setInputData] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');

  // Exam form
  const [examTitle, setExamTitle] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [examDuration, setExamDuration] = useState(60);
  const [examMarks, setExamMarks] = useState(100);
  const [examStart, setExamStart] = useState('');
  const [examEnd, setExamEnd] = useState('');
  const [exams, setExams] = useState(MOCK_EXAMS);

  // Practice form
  const [practiceTitle, setPracticeTitle] = useState('');
  const [practiceTopic, setPracticeTopic] = useState('Arrays');
  const [practiceGroup, setPracticeGroup] = useState('');
  const [practiceDue, setPracticeDue] = useState('');
  const [practiceSets, setPracticeSets] = useState(MOCK_PRACTICE_SETS);

  // Results filter
  const [resultExam, setResultExam] = useState('Mid-Semester Coding Exam');

  const saveClasses = (updated) => {
    setClasses(updated);
    localStorage.setItem('codeeval-classes', JSON.stringify(updated));
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    const colorIdx = classes.length % CLASS_COLORS.length;
    const iconIdx  = classes.length % CLASS_ICONS.length;
    const nc = {
      id: Date.now(), name: newClassName, code: newClassCode,
      subject: newClassSubject, semester: newClassSemester,
      room: newClassRoom, schedule: newClassSchedule,
      totalStudents: 0, activeStudents: 0,
      icon: CLASS_ICONS[iconIdx], color: CLASS_COLORS[colorIdx],
      examsGiven: 0, practiceAssigned: 0, avgScore: null,
      students: [], invites: [],
      recentActivity: [{ type: 'info', label: 'Class created', date: new Date().toISOString().slice(0,10), status: 'upcoming' }],
    };
    saveClasses([...classes, nc]);
    setShowCreateClass(false);
    setNewClassName(''); setNewClassSubject(''); setNewClassSemester('');
    setNewClassRoom(''); setNewClassSchedule(''); setNewClassCode('');
    showToast(`Class "${nc.name}" created! 🎉`);
  };

  const handleInviteStudents = (e) => {
    e.preventDefault();
    const emails = inviteEmails.split(/[,\n]+/).map(e => e.trim()).filter(Boolean);
    if (!emails.length) return;
    const updated = classes.map(c => {
      if (c.id !== inviteClassId) return c;
      const newInvites = emails.filter(em => !c.invites?.includes(em) && !c.students.includes(em));
      return { ...c, invites: [...(c.invites || []), ...newInvites] };
    });
    saveClasses(updated);
    setInviteClassId(null);
    setInviteEmails('');
    showToast(`${emails.length} invite(s) sent! 📧`);
  };

  const handleRemoveStudent = (classId, studentName) => {
    const updated = classes.map(c =>
      c.id === classId
        ? { ...c, students: c.students.filter(s => s !== studentName), totalStudents: c.totalStudents - 1 }
        : c
    );
    saveClasses(updated);
    showToast(`${studentName} removed from class.`, 'error');
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleAddProblem = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/problems', { title, description, difficulty, timeLimit: parseInt(timeLimit) });
      setLastProblemId(res.data.id);
      showToast(`Problem "${res.data.title}" created! ID: ${res.data.id}`);
      setTitle(''); setDescription('');
    } catch {
      showToast('Error creating problem.', 'error');
    }
  };

  const handleAddTestCase = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/problems/${problemId}/testcases`, { inputData, expectedOutput });
      showToast('Test case added successfully!');
      setInputData(''); setExpectedOutput('');
    } catch {
      showToast('Error adding test case. Check the Problem ID.', 'error');
    }
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    const newExam = { id: exams.length + 1, title: examTitle, subject: examSubject, duration: parseInt(examDuration), totalMarks: parseInt(examMarks), startDate: examStart, endDate: examEnd, status: 'upcoming', attempts: 0 };
    setExams(prev => [newExam, ...prev]);
    showToast(`Exam "${examTitle}" scheduled!`);
    setExamTitle(''); setExamSubject(''); setExamStart(''); setExamEnd('');
  };

  const handleCreatePractice = (e) => {
    e.preventDefault();
    const newSet = { id: practiceSets.length + 1, title: practiceTitle, topic: practiceTopic, assignedTo: practiceGroup, problems: 0, dueDate: practiceDue, submissions: 0, totalStudents: 42 };
    setPracticeSets(prev => [newSet, ...prev]);
    showToast(`Practice set "${practiceTitle}" assigned!`);
    setPracticeTitle(''); setPracticeGroup(''); setPracticeDue('');
  };

  const handleExportCSV = () => {
    const filtered = MOCK_STUDENT_RESULTS.filter(r => r.exam === resultExam);
    if (filtered.length === 0) {
      showToast('No data to export for this exam.', 'error');
      return;
    }
    const filename = `${resultExam.replace(/\s+/g, '_')}_results_${new Date().toISOString().slice(0,10)}.csv`;
    exportToCSV(filtered, filename);
    showToast(`📥 Exported "${filename}" successfully!`);
  };

  const filteredResults = MOCK_STUDENT_RESULTS.filter(r => r.exam === resultExam);
  const avgScore = filteredResults.length > 0
    ? Math.round(filteredResults.reduce((a, r) => a + r.score, 0) / filteredResults.length)
    : 0;
  const passCount = filteredResults.filter(r => r.status === 'PASS').length;

  const totalStudentsAll = classes.reduce((a, c) => a + c.totalStudents, 0);

  return (
    <div className="page-wrapper animate-fade-up">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">⚙ Teacher <span className="gradient-text">Console</span></h1>
          <p className="page-subtitle">Manage classes, problems, exams, practice sets, and track student performance</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-teal">👨‍🏫 {user?.name}</span>
          <span className="badge badge-blue">🏫 2026 Spring</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon">🏫</div>
          <div className="stat-value">{classes.length}</div>
          <div className="stat-label">My Classes</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-value">{totalStudentsAll}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">{exams.length}</div>
          <div className="stat-label">Exams Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-value">{practiceSets.length}</div>
          <div className="stat-label">Practice Sets</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-bar">
        {TAB_CONFIG.map(tab => (
          <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ========== MY CLASSES TAB ========== */}
      {activeTab === 'classes' && (
        <div className="admin-tab-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.15rem', color: 'white' }}>My Classes</h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>All batches and sections you are conducting this semester</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowCreateClass(true)}>
              + Create Class
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {classes.map((cls, idx) => {
              const isExpanded = expandedClass === cls.id;
              return (
                <div key={cls.id} className="card" style={{ padding: '0', overflow: 'hidden', animationDelay: `${idx * 0.07}s` }}>
                  {/* Colored top bar */}
                  <div style={{ height: '4px', background: `linear-gradient(90deg, ${cls.color}88, ${cls.color})` }} />

                  <div style={{ padding: '1.5rem' }}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', flexWrap: 'wrap' }}
                      onClick={() => setExpandedClass(isExpanded ? null : cls.id)}
                    >
                      {/* Icon */}
                      <div style={{
                        width: 52, height: 52, borderRadius: '14px', flexShrink: 0,
                        background: `${cls.color}18`, border: `1.5px solid ${cls.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
                      }}>
                        {cls.icon}
                      </div>

                      {/* Main info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                          <h3 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>{cls.name}</h3>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: cls.color, background: `${cls.color}15`, border: `1px solid ${cls.color}35`, padding: '0.15em 0.6em', borderRadius: '10px', letterSpacing: '0.5px' }}>
                            {cls.code}
                          </span>
                          <span className="badge badge-teal" style={{ fontSize: '0.67rem' }}>{cls.semester}</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                          📚 {cls.subject} &nbsp;·&nbsp; 🏢 {cls.room} &nbsp;·&nbsp; 🕐 {cls.schedule}
                        </div>
                        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            👥 <strong style={{ color: 'white' }}>{cls.activeStudents}</strong>/{cls.totalStudents} active
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            📋 <strong style={{ color: 'white' }}>{cls.examsGiven}</strong> exams
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            💪 <strong style={{ color: 'white' }}>{cls.practiceAssigned}</strong> practice sets
                          </span>
                          {cls.avgScore !== null && (
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              📈 Avg: <strong style={{ color: cls.color }}>{cls.avgScore}%</strong>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, alignItems: 'center' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={e => { e.stopPropagation(); setInviteClassId(cls.id); }}
                        >
                          ✉️ Invite
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={e => { e.stopPropagation(); setActiveTab('exams'); showToast(`Creating exam for ${cls.name}`); }}
                        >
                          📋 Exam
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={e => { e.stopPropagation(); setActiveTab('practice'); }}
                        >
                          💪 Practice
                        </button>
                        <span style={{ color: 'var(--text-muted)', fontSize: '1rem', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none', cursor: 'pointer', padding: '0.25rem' }}>
                          ▾
                        </span>
                      </div>
                    </div>

                    {/* Expanded: students + invites + recent activity */}
                    {isExpanded && (
                      <div style={{ marginTop: '1.2rem', borderTop: '1px solid var(--border)', paddingTop: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Student list */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.7px', fontWeight: 700, margin: 0 }}>
                              Students ({cls.students.length}) · Strength: <span style={{ color: cls.color }}>{cls.students.length}/{cls.totalStudents || cls.students.length}</span>
                            </h4>
                          </div>
                          {/* Strength bar */}
                          <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, marginBottom: '0.75rem', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${cls.totalStudents ? (cls.students.length/cls.totalStudents)*100 : 100}%`, background: `linear-gradient(90deg, ${cls.color}88, ${cls.color})`, borderRadius: 4 }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {cls.students.slice(0, 6).map((s, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${cls.color}60, ${cls.color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                                  {s.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                </div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', flex: 1 }}>{s}</span>
                                <button onClick={() => handleRemoveStudent(cls.id, s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '2px 4px', borderRadius: 4 }} title="Remove">✕</button>
                              </div>
                            ))}
                            {cls.students.length > 6 && (
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem', paddingLeft: '0.5rem' }}>
                                +{cls.students.length - 6} more students…
                              </span>
                            )}
                          </div>
                          {/* Pending invites */}
                          {cls.invites?.length > 0 && (
                            <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(245,158,11,0.07)', borderRadius: 8, border: '1px solid rgba(245,158,11,0.2)' }}>
                              <p style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>⏳ Pending Invites ({cls.invites.length})</p>
                              {cls.invites.map((em, i) => <p key={i} style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.15rem 0' }}>📧 {em}</p>)}
                            </div>
                          )}
                        </div>

                        {/* Recent activity */}
                        <div>
                          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.75rem', fontWeight: 700 }}>
                            Recent Activity
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {cls.recentActivity.map((act, i) => {
                              const typeIcon = act.type === 'exam' ? '📋' : act.type === 'practice' ? '💪' : 'ℹ';
                              const statusColors = { completed: '#34d399', live: '#fca5a5', upcoming: '#fbbf24', ongoing: '#93c5fd', info: '#94a3b8' };
                              return (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{typeIcon}</span>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.82rem', color: 'white', lineHeight: 1.3 }}>{act.label}</div>
                                    <div style={{ fontSize: '0.71rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{act.date}</div>
                                  </div>
                                  <span style={{ fontSize: '0.67rem', fontWeight: 700, color: statusColors[act.status] || '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
                                    {act.status}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========== PROBLEMS TAB ========== */}
      {activeTab === 'problems' && (
        <div className="admin-tab-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'rgba(13,148,136,0.15)', padding: '0.3rem 0.6rem', borderRadius: '8px' }}>📝</span>
                Create New Problem
              </h3>
              <form onSubmit={handleAddProblem}>
                <div className="input-group">
                  <label className="input-label">Problem Title</label>
                  <input className="input-field-box" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Two Sum" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Description</label>
                  <textarea className="input-field-box" rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the problem clearly..." required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label className="input-label">Difficulty</label>
                    <select className="input-field-box" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                      <option value="EASY">🟢 Easy</option>
                      <option value="MEDIUM">🟡 Medium</option>
                      <option value="HARD">🔴 Hard</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select className="input-field-box" value={category} onChange={e => setCategory(e.target.value)}>
                      <option value="arrays">Arrays</option>
                      <option value="strings">Strings</option>
                      <option value="data-structures">Data Structures</option>
                      <option value="stacks-queues">Stacks & Queues</option>
                      <option value="interview">Interview</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Time Limit (ms)</label>
                    <input type="number" className="input-field-box" value={timeLimit} onChange={e => setTimeLimit(e.target.value)} required />
                  </div>
                </div>
                {lastProblemId && (
                  <div className="alert alert-success">
                    ✅ Problem created! ID: <strong>{lastProblemId}</strong>
                    <button type="button" className="btn btn-sm btn-ghost" style={{ marginLeft: 'auto' }} onClick={() => setProblemId(String(lastProblemId))}>
                      Use for Test Cases →
                    </button>
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '0.5rem' }}>+ Create Problem</button>
              </form>
            </div>
            <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-surface)' }}>
              <h3 style={{ marginBottom: '1rem' }}>📌 Quick Guide</h3>
              {[
                { icon: '1️⃣', title: 'Create Problem', desc: 'Fill in title, description, difficulty, and time limit.' },
                { icon: '2️⃣', title: 'Note the ID',    desc: 'After creation, use the problem ID to add test cases.' },
                { icon: '3️⃣', title: 'Add Test Cases', desc: 'Go to "Test Cases" tab and add input/output pairs.' },
                { icon: '4️⃣', title: 'Assign to Exam', desc: 'Create an exam and include problem IDs in it.' },
              ].map(step => (
                <div key={step.icon} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{step.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{step.title}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
              <div className="alert alert-info" style={{ marginTop: '1rem' }}>
                💡 Students can only submit code for problems linked to the backend.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== TEST CASES TAB ========== */}
      {activeTab === 'testcases' && (
        <div className="admin-tab-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'rgba(245,158,11,0.15)', padding: '0.3rem 0.6rem', borderRadius: '8px' }}>🧪</span>
                Add Test Case
              </h3>
              <form onSubmit={handleAddTestCase}>
                <div className="input-group">
                  <label className="input-label">Problem ID</label>
                  <input type="number" className="input-field-box" value={problemId} onChange={e => setProblemId(e.target.value)} placeholder="e.g. 1" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Input (STDIN)</label>
                  <textarea className="input-field-box code-font" rows={4} value={inputData} onChange={e => setInputData(e.target.value)} placeholder="3 5" />
                </div>
                <div className="input-group">
                  <label className="input-label">Expected Output</label>
                  <textarea className="input-field-box code-font" rows={4} value={expectedOutput} onChange={e => setExpectedOutput(e.target.value)} placeholder="8" required />
                </div>
                <button type="submit" className="btn btn-primary btn-full" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>+ Add Test Case</button>
              </form>
            </div>
            <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-surface)' }}>
              <h3 style={{ marginBottom: '1rem' }}>⚡ Test Case Tips</h3>
              {[
                { label: 'Edge Cases',    desc: 'Always add test cases for empty input, max size, and negative values.' },
                { label: 'Multiple Cases',desc: 'Add at least 3 test cases per problem for accurate evaluation.' },
                { label: 'Exact Format', desc: 'Make sure output format matches exactly — extra spaces will fail.' },
                { label: 'Hidden Tests', desc: 'Students see sample test cases; add hidden ones for grading.' },
              ].map(tip => (
                <div key={tip.label} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--teal-300)', marginBottom: '0.2rem' }}>● {tip.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tip.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== EXAMS TAB ========== */}
      {activeTab === 'exams' && (
        <div className="admin-tab-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'rgba(59,130,246,0.15)', padding: '0.3rem 0.6rem', borderRadius: '8px' }}>📋</span>
                Schedule Exam
              </h3>
              <form onSubmit={handleCreateExam}>
                <div className="input-group"><label className="input-label">Exam Title</label><input className="input-field-box" value={examTitle} onChange={e => setExamTitle(e.target.value)} placeholder="e.g. Mid-Semester Exam" required /></div>
                <div className="input-group"><label className="input-label">Subject</label><input className="input-field-box" value={examSubject} onChange={e => setExamSubject(e.target.value)} placeholder="e.g. Data Structures" required /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group"><label className="input-label">Duration (min)</label><input type="number" className="input-field-box" value={examDuration} onChange={e => setExamDuration(e.target.value)} required /></div>
                  <div className="input-group"><label className="input-label">Total Marks</label><input type="number" className="input-field-box" value={examMarks} onChange={e => setExamMarks(e.target.value)} required /></div>
                </div>
                <div className="input-group"><label className="input-label">Start Date & Time</label><input type="datetime-local" className="input-field-box" value={examStart} onChange={e => setExamStart(e.target.value)} required /></div>
                <div className="input-group"><label className="input-label">End Date & Time</label><input type="datetime-local" className="input-field-box" value={examEnd} onChange={e => setExamEnd(e.target.value)} required /></div>
                <button type="submit" className="btn btn-primary btn-full">📋 Schedule Exam</button>
              </form>
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>All Exams</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {exams.map(exam => (
                  <div key={exam.id} className="card" style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2em 0.6em', borderRadius: '12px',
                            background: exam.status === 'live' ? 'rgba(239,68,68,0.15)' : exam.status === 'completed' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                            color: exam.status === 'live' ? '#fca5a5' : exam.status === 'completed' ? '#34d399' : '#fbbf24',
                            border: `1px solid ${exam.status === 'live' ? 'rgba(239,68,68,0.3)' : exam.status === 'completed' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
                          }}>
                            {exam.status === 'live' ? '🔴 LIVE' : exam.status === 'completed' ? '✅ Done' : '📅 Upcoming'}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>{exam.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {exam.subject} · {exam.duration}min · {exam.totalMarks}pts{exam.attempts > 0 && <span style={{ color: 'var(--teal-400)', marginLeft: '0.5rem' }}>· {exam.attempts} attempts</span>}
                        </div>
                      </div>
                      <button className="btn btn-ghost btn-sm btn-icon">✏</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== PRACTICE TAB ========== */}
      {activeTab === 'practice' && (
        <div className="admin-tab-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'rgba(16,185,129,0.15)', padding: '0.3rem 0.6rem', borderRadius: '8px' }}>💪</span>
                Assign Practice Set
              </h3>
              <form onSubmit={handleCreatePractice}>
                <div className="input-group"><label className="input-label">Set Title</label><input className="input-field-box" value={practiceTitle} onChange={e => setPracticeTitle(e.target.value)} placeholder="e.g. Arrays Week 1" required /></div>
                <div className="input-group">
                  <label className="input-label">Topic</label>
                  <select className="input-field-box" value={practiceTopic} onChange={e => setPracticeTopic(e.target.value)}>
                    <option>Arrays</option><option>Strings</option><option>Data Structures</option><option>Stacks & Queues</option><option>Trees & Graphs</option><option>Interview Prep</option>
                  </select>
                </div>
                <div className="input-group"><label className="input-label">Assign To (Batch)</label>
                  <select className="input-field-box" value={practiceGroup} onChange={e => setPracticeGroup(e.target.value)} required>
                    <option value="">-- Select Class --</option>
                    {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="input-group"><label className="input-label">Due Date</label><input type="date" className="input-field-box" value={practiceDue} onChange={e => setPracticeDue(e.target.value)} required /></div>
                <button type="submit" className="btn btn-primary btn-full" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>💪 Assign Practice Set</button>
              </form>
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Active Practice Sets</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {practiceSets.map(set => {
                  const pct = Math.round((set.submissions / set.totalStudents) * 100);
                  return (
                    <div key={set.id} className="card" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white', marginBottom: '0.2rem' }}>{set.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{set.topic} · {set.assignedTo} · Due: {set.dueDate}</div>
                          <div style={{ marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{set.submissions}/{set.totalStudents} submitted</span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--teal-400)', fontWeight: 700 }}>{pct}%</span>
                            </div>
                            <div className="progress-bar-wrapper"><div className="progress-bar-fill" style={{ width: `${pct}%` }} /></div>
                          </div>
                        </div>
                        <span className="badge badge-teal">{set.problems} prbs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== RESULTS TAB ========== */}
      {activeTab === 'results' && (
        <div className="admin-tab-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="stat-card"><div className="stat-icon">👥</div><div className="stat-value">{filteredResults.length}</div><div className="stat-label">Attempted</div></div>
            <div className="stat-card"><div className="stat-icon">📈</div><div className="stat-value">{avgScore}%</div><div className="stat-label">Class Avg</div></div>
            <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value">{passCount}</div><div className="stat-label">Passed</div></div>
            <div className="stat-card"><div className="stat-icon">❌</div><div className="stat-value">{filteredResults.length - passCount}</div><div className="stat-label">Failed</div></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Student Results</h3>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Filter by exam:</label>
              <select className="input-field-box" value={resultExam} onChange={e => setResultExam(e.target.value)} style={{ width: 'auto', fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}>
                {[...new Set(MOCK_STUDENT_RESULTS.map(r => r.exam))].map(e => <option key={e}>{e}</option>)}
              </select>
              {/* ✅ REAL WORKING CSV EXPORT BUTTON */}
              <button
                className="btn btn-outline btn-sm"
                onClick={handleExportCSV}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                📥 Export CSV
              </button>
            </div>
          </div>

          {filteredResults.length === 0 ? (
            <div className="alert alert-warning">No results found for the selected exam.</div>
          ) : (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="results-table">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '1.5rem' }}>Rank</th>
                    <th>Student</th>
                    <th>Score</th>
                    <th>Time</th>
                    <th>Prev Score</th>
                    <th>Improvement</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.sort((a, b) => b.score - a.score).map((r, idx) => {
                    const improvement = r.score - r.previousScore;
                    return (
                      <tr key={`${r.id}-${idx}`}>
                        <td style={{ paddingLeft: '1.5rem' }}>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem', background: idx === 0 ? 'linear-gradient(135deg,#f59e0b,#fbbf24)' : idx === 1 ? 'linear-gradient(135deg,#94a3b8,#cbd5e1)' : idx === 2 ? 'linear-gradient(135deg,#b45309,#d97706)' : 'var(--bg-elevated)', color: idx < 3 ? '#000' : 'var(--text-muted)' }}>
                            {idx + 1}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--teal-700),var(--accent-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', color: 'white', flexShrink: 0 }}>{r.avatar}</div>
                            <span style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>{r.name}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'white' }}>{r.score}/{r.maxScore}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{Math.round(r.score / r.maxScore * 100)}%</div>
                        </td>
                        <td style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>{r.timeTaken}m</td>
                        <td style={{ color: 'var(--text-muted)', fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>{r.previousScore}</td>
                        <td>
                          <span className={improvement > 0 ? 'improvement-positive' : improvement < 0 ? 'improvement-negative' : 'improvement-neutral'}>
                            {improvement > 0 ? '↑' : improvement < 0 ? '↓' : '→'} {Math.abs(improvement)} pts
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-${r.status === 'PASS' ? 'success' : 'danger'}`}>
                            {r.status === 'PASS' ? '✅ Pass' : '❌ Fail'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===== CREATE CLASS MODAL ===== */}
      {showCreateClass && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowCreateClass(false)}>
          <div className="card" style={{ padding: '2rem', maxWidth: 500, width: '100%', animation: 'fadeUp 0.2s ease-out' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🏫 Create New Class</h2>
            <form onSubmit={handleCreateClass}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group" style={{ gridColumn: '1/-1' }}><label className="input-label">Class Name</label><input className="input-field-box" value={newClassName} onChange={e=>setNewClassName(e.target.value)} placeholder="e.g. 2nd Year CS — Section A" required /></div>
                <div className="input-group"><label className="input-label">Class Code</label><input className="input-field-box" value={newClassCode} onChange={e=>setNewClassCode(e.target.value)} placeholder="e.g. CS2A" required /></div>
                <div className="input-group"><label className="input-label">Semester</label><input className="input-field-box" value={newClassSemester} onChange={e=>setNewClassSemester(e.target.value)} placeholder="e.g. 4th Sem" /></div>
                <div className="input-group" style={{ gridColumn: '1/-1' }}><label className="input-label">Subject</label><input className="input-field-box" value={newClassSubject} onChange={e=>setNewClassSubject(e.target.value)} placeholder="e.g. Data Structures & Algorithms" required /></div>
                <div className="input-group"><label className="input-label">Room / Lab</label><input className="input-field-box" value={newClassRoom} onChange={e=>setNewClassRoom(e.target.value)} placeholder="e.g. CS Lab 1" /></div>
                <div className="input-group"><label className="input-label">Schedule</label><input className="input-field-box" value={newClassSchedule} onChange={e=>setNewClassSchedule(e.target.value)} placeholder="e.g. Mon, Wed — 9 AM" /></div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-ghost btn-full" onClick={() => setShowCreateClass(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-full">🏫 Create Class</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== INVITE STUDENTS MODAL ===== */}
      {inviteClassId && (() => {
        const cls = classes.find(c => c.id === inviteClassId);
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setInviteClassId(null)}>
            <div className="card" style={{ padding: '2rem', maxWidth: 460, width: '100%', animation: 'fadeUp 0.2s ease-out' }} onClick={e => e.stopPropagation()}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>✉️ Invite Students</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Inviting to: <strong style={{ color: 'var(--teal-300)' }}>{cls?.name}</strong></p>
              <form onSubmit={handleInviteStudents}>
                <div className="input-group">
                  <label className="input-label">Student Email IDs (comma or newline separated)</label>
                  <textarea className="input-field-box" rows={5} value={inviteEmails} onChange={e=>setInviteEmails(e.target.value)} placeholder="anirudh@college.edu, harsha@college.edu\njaswanth@college.edu" required />
                </div>
                {cls?.invites?.length > 0 && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(245,158,11,0.07)', borderRadius: 8, border: '1px solid rgba(245,158,11,0.2)' }}>
                    <p style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.4rem' }}>⏳ Already Invited ({cls.invites.length})</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cls.invites.join(', ')}</p>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" className="btn btn-ghost btn-full" onClick={() => setInviteClassId(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary btn-full">✉️ Send Invites</button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

      {/* Toast */}
      {toast && (
        <div className="toast">
          <span style={{ fontSize: '1.2rem' }}>{toast.type === 'error' ? '❌' : '✅'}</span>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
