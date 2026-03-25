import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

const AVATAR_COLORS = [
  'linear-gradient(135deg,#0d9488,#14b8a6)',
  'linear-gradient(135deg,#6366f1,#818cf8)',
  'linear-gradient(135deg,#a855f7,#ec4899)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#22c55e,#16a34a)',
  'linear-gradient(135deg,#3b82f6,#06b6d4)',
  'linear-gradient(135deg,#ec4899,#f43f5e)',
  'linear-gradient(135deg,#f97316,#f59e0b)',
];

const SKILL_SUGGESTIONS = [
  'C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript',
  'React', 'Spring Boot', 'SQL', 'Data Structures', 'Algorithms',
  'Dynamic Programming', 'Graph Theory', 'System Design',
];

function StatBadge({ icon, label, value }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      background: 'var(--bg-elevated)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      minWidth: 100,
      flex: 1,
    }}>
      <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</span>
      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginTop: '0.25rem', fontWeight: 600 }}>{label}</span>
    </div>
  );
}

export default function Profile({ user, setUser }) {
  const savedProfile = JSON.parse(localStorage.getItem('codeeval-profile') || '{}');

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(savedProfile.bio || '');
  const [college, setCollege] = useState(savedProfile.college || '');
  const [year, setYear] = useState(savedProfile.year || '');
  const [github, setGithub] = useState(savedProfile.github || '');
  const [linkedin, setLinkedin] = useState(savedProfile.linkedin || '');
  const [skills, setSkills] = useState(savedProfile.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [avatarColor, setAvatarColor] = useState(savedProfile.avatarColor || AVATAR_COLORS[0]);

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddSkill = (skill) => {
    const s = skill.trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
    }
    setSkillInput('');
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill(skillInput);
    }
  };

  const handleRemoveSkill = (s) => setSkills(prev => prev.filter(x => x !== s));

  const handleSave = async () => {
    setSaving(true);
    const profileData = { bio, college, year, github, linkedin, skills, avatarColor, name };
    localStorage.setItem('codeeval-profile', JSON.stringify(profileData));

    // Sync to backend if available
    if (user?.id) {
      try {
        await userService.updateProfile(user.id, {
          bio, college, year, github, linkedin,
          skills: skills.join(','),
          avatarColor, name,
        });
        const updatedUser = { ...user, name, bio, college, year, github, linkedin, skills: skills.join(','), avatarColor };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch {
        // Backend might be offline — localStorage is the fallback
      }
    }
    setSaving(false);
    setEditing(false);
    showToast('Profile saved! 🎉');
  };

  const handleCancel = () => {
    // Restore from saved
    const p = JSON.parse(localStorage.getItem('codeeval-profile') || '{}');
    setName(user?.name || '');
    setBio(p.bio || '');
    setCollege(p.college || '');
    setYear(p.year || '');
    setGithub(p.github || '');
    setLinkedin(p.linkedin || '');
    setSkills(p.skills || []);
    setAvatarColor(p.avatarColor || AVATAR_COLORS[0]);
    setEditing(false);
  };

  return (
    <div className="page-wrapper animate-fade-up">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {user?.role === 'ADMIN' ? '👨‍🏫' : '🎓'} My <span className="gradient-text">Profile</span>
          </h1>
          <p className="page-subtitle">Manage your personal details, skills and academic info</p>
        </div>
        {!editing ? (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            ✏️ Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? '⏳ Saving…' : '💾 Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Card — Avatar + Quick Info */}
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.2rem',
            fontWeight: 800,
            color: 'white',
            margin: '0 auto 1rem',
            boxShadow: '0 0 30px rgba(13,148,136,0.3)',
            transition: 'all 0.3s',
          }}>
            {initials}
          </div>

          {/* Avatar color picker */}
          {editing && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.7px', fontWeight: 700, marginBottom: '0.5rem' }}>
                Avatar Color
              </p>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                {AVATAR_COLORS.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setAvatarColor(c)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: c,
                      border: avatarColor === c ? '2.5px solid white' : '2px solid transparent',
                      cursor: 'pointer',
                      outline: avatarColor === c ? '2px solid var(--primary)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Name */}
          {editing ? (
            <input
              className="input-field-box"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}
              placeholder="Your Name"
            />
          ) : (
            <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.25rem' }}>{name}</h2>
          )}

          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
            {user?.role === 'ADMIN' ? '👨‍🏫 Faculty' : '🎓 Student'} · {user?.email}
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {editing ? (
              <>
                <div className="input-group" style={{ textAlign: 'left' }}>
                  <label className="input-label">GitHub URL</label>
                  <input className="input-field-box" value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/username" />
                </div>
                <div className="input-group" style={{ textAlign: 'left' }}>
                  <label className="input-label">LinkedIn URL</label>
                  <input className="input-field-box" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" />
                </div>
              </>
            ) : (
              <>
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ width: '100%' }}>
                    🐙 GitHub
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ width: '100%' }}>
                    💼 LinkedIn
                  </a>
                )}
                {!github && !linkedin && !editing && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No social links added yet.</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Stats */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <StatBadge icon="✅" label="Solved" value={user?.solved ?? 0} />
            <StatBadge icon="🔥" label="Streak" value={`7d`} />
            <StatBadge icon="🏆" label="Rank" value={`#${user?.rank ?? '—'}`} />
            <StatBadge icon="📊" label="Score" value={user?.score ?? '—'} />
          </div>

          {/* About / Bio */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.7px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1rem' }}>
              About Me
            </h3>
            {editing ? (
              <textarea
                className="input-field-box"
                rows={4}
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Write a short bio about yourself, your interests, and goals…"
              />
            ) : (
              <p style={{ color: bio ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, fontStyle: bio ? 'normal' : 'italic' }}>
                {bio || 'No bio added yet. Click Edit Profile to add one!'}
              </p>
            )}
          </div>

          {/* Academic Info */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.7px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1rem' }}>
              Academic Info
            </h3>
            {editing ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">College / University</label>
                  <input className="input-field-box" value={college} onChange={e => setCollege(e.target.value)} placeholder="e.g. VIT Vellore" />
                </div>
                <div className="input-group">
                  <label className="input-label">Year / Semester</label>
                  <select className="input-field-box" value={year} onChange={e => setYear(e.target.value)}>
                    <option value="">— Select Year —</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>College</span>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontStyle: college ? 'normal' : 'italic' }}>
                    {college || 'Not set'}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Year</span>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontStyle: year ? 'normal' : 'italic' }}>
                    {year || 'Not set'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.7px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1rem' }}>
              Skills & Technologies
            </h3>

            {/* Skill chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: editing ? '1rem' : 0 }}>
              {skills.length === 0 && !editing && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>No skills added yet.</p>
              )}
              {skills.map(s => (
                <span
                  key={s}
                  className="badge badge-teal"
                  style={{ fontSize: '0.78rem', gap: editing ? '0.4rem' : 0 }}
                >
                  {s}
                  {editing && (
                    <button
                      onClick={() => handleRemoveSkill(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, lineHeight: 1, fontSize: '0.9rem' }}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {editing && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input
                    className="input-field-box"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Type a skill and press Enter…"
                    style={{ flex: 1 }}
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    type="button"
                    onClick={() => handleAddSkill(skillInput)}
                  >
                    + Add
                  </button>
                </div>
                {/* Suggestions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).map(s => (
                    <button
                      key={s}
                      onClick={() => handleAddSkill(s)}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '0.2rem 0.65rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--teal-300)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
