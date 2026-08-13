import React, { useState } from 'react';
import { CHANCE_MATHIS_PROFILE } from '../data/candidateProfile';
import { 
  Briefcase, GraduationCap, Award, Wrench, Terminal, 
  MapPin, Phone, Mail, Globe 
} from 'lucide-react';

export const CandidateProfileTab: React.FC = () => {
  const profile = CHANCE_MATHIS_PROFILE;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...profile.skills.map(s => s.category)];

  const filteredSkills = selectedCategory === 'ALL'
    ? profile.skills
    : profile.skills.filter(s => s.category === selectedCategory);

  return (
    <div style={{ padding: '24px', backgroundColor: '#090d16', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Top Profile Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '140px 1fr', gap: '24px',
        backgroundColor: '#111827', padding: '24px', borderRadius: '16px',
        border: '1px solid #1f2937', marginBottom: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
      }}>
        {/* Avatar Image */}
        <div style={{ position: 'relative' }}>
          <img
            src="/avatar.png"
            alt="Chance Mathis"
            style={{
              width: '140px', height: '140px', borderRadius: '12px',
              objectFit: 'cover', border: '2px solid #3b82f6', boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
            }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div style={{
            position: 'absolute', bottom: '-8px', right: '-8px', backgroundColor: '#10b981',
            color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '10px',
            border: '2px solid #111827'
          }}>
            VERIFIED
          </div>
        </div>

        {/* Candidate Meta Info */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
                {profile.name}
              </h1>
              <h3 style={{ margin: '4px 0 12px', fontSize: '14px', fontWeight: 700, color: '#60a5fa', letterSpacing: '0.5px' }}>
                {profile.title}
              </h3>
            </div>
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '6px 14px', borderRadius: '20px', color: '#34d399', fontSize: '12px', fontWeight: 700 }}>
              AVAILABLE FOR FORWARD-DEPLOYED ROLES
            </div>
          </div>

          <p style={{ margin: '0 0 14px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5' }}>
            {profile.summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color="#60a5fa" /> {profile.contact.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} color="#60a5fa" /> {profile.contact.phone}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} color="#60a5fa" /> {profile.contact.email}</span>
            <a href={profile.contact.portfolio} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60a5fa', textDecoration: 'none' }}><Globe size={14} /> Portfolio</a>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60a5fa', textDecoration: 'none' }}><Globe size={14} /> LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Ethos Bar */}
      <div style={{ backgroundColor: '#070b14', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {profile.tagline}
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {profile.ethos.map((e, idx) => (
            <span key={idx} style={{ backgroundColor: '#111827', border: '1px solid #374151', color: '#f3f4f6', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
              ⚡ {e}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid: Work Experience vs Education/Certifications */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Work Experience Column */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Briefcase color="#3b82f6" /> Professional & Trade Experience
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {profile.experiences.map((exp, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>
                      {exp.role}
                    </h4>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#60a5fa', marginTop: '2px' }}>
                      {exp.company} · <span style={{ color: '#94a3b8' }}>{exp.type}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, backgroundColor: '#030712', padding: '4px 10px', borderRadius: '6px', border: '1px solid #1f2937' }}>
                    {exp.period}
                  </span>
                </div>

                <ul style={{ margin: '12px 0 16px', paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{b}</li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {exp.skillsUsed.map((sk, i) => (
                    <span key={i} style={{ fontSize: '11px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Education & Certifications */}
        <div>
          {/* Certifications */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award color="#eab308" /> Certifications
            </h4>
            {profile.certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: '14px', borderBottom: i < profile.certifications.length - 1 ? '1px solid #1f2937' : 'none', paddingBottom: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#f8fafc' }}>{c.title}</div>
                <div style={{ fontSize: '12px', color: '#eab308', margin: '2px 0' }}>{c.issuer} · {c.date}</div>
                {c.details && <div style={{ fontSize: '11px', color: '#94a3b8' }}>{c.details}</div>}
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap color="#10b981" /> Education
            </h4>
            {profile.education.map((ed, i) => (
              <div key={i}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#f8fafc' }}>{ed.degree}</div>
                <div style={{ fontSize: '12px', color: '#34d399', margin: '2px 0' }}>{ed.honors} · GPA {ed.gpa}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{ed.institution} ({ed.date})</div>
              </div>
            ))}
          </div>

          {/* Apprenticeship */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
            <h4 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench color="#ec4899" /> Trade Apprenticeship
            </h4>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#f8fafc' }}>{profile.apprenticeship.organization}</div>
            <div style={{ fontSize: '12px', color: '#f472b6', marginTop: '4px' }}>{profile.apprenticeship.program}</div>
          </div>
        </div>
      </div>

      {/* Filterable Skill Matrix */}
      <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal color="#8b5cf6" /> Systems & Architecture Skill Taxonomy
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                  border: '1px solid #374151', cursor: 'pointer',
                  backgroundColor: selectedCategory === cat ? '#8b5cf6' : '#030712',
                  color: selectedCategory === cat ? '#ffffff' : '#94a3b8'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(280px, 1fr) )', gap: '16px' }}>
          {filteredSkills.map((skGroup, idx) => (
            <div key={idx} style={{ backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '10px', padding: '16px' }}>
              <h5 style={{ margin: '0 0 10px', fontSize: '12px', color: '#a78bfa', letterSpacing: '0.5px' }}>
                {skGroup.category}
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skGroup.items.map((item, i) => (
                  <span key={i} style={{ fontSize: '12px', backgroundColor: '#111827', border: '1px solid #374151', color: '#e2e8f0', padding: '4px 10px', borderRadius: '6px' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
