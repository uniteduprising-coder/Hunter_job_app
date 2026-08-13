import React, { useState } from 'react';
import { 
  FileText, Copy, Download, Check, Sparkles, Mail, Share2, Send 
} from 'lucide-react';
import { generateTailoredPackage } from '../engine/applicationTailorer';
import type { TailoredApplicationPackage } from '../engine/applicationTailorer';
import type { JobMatchResult } from '../engine/jobMatcher';

interface Props {
  matchResult?: JobMatchResult | null;
}

export const ApplicationTailorTab: React.FC<Props> = ({ matchResult }) => {
  const initialPackage = matchResult 
    ? generateTailoredPackage(matchResult)
    : generateTailoredPackage({
        jobTitle: "Forward-Deployed Engineer",
        companyName: "Meta / Target Enterprise",
        overallMatchScore: 94,
        heuristicFitScore: 96,
        logicMatchScore: 92,
        requirements: [],
        keyStrengths: [],
        gapAnalysis: [],
        suggestedHooks: []
      });

  const [pkg, setPkg] = useState<TailoredApplicationPackage>(initialPackage);
  const [activeSection, setActiveSection] = useState<'cover' | 'resume' | 'outreach'>('cover');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    const content = `# APPLICATION PACKAGE FOR ${pkg.companyName.toUpperCase()} — ${pkg.roleTitle.toUpperCase()}
Candidate: Chance Mathis (Forward-Deployed Engineer & Systems Architect)
Ethos: ${pkg.fdeToneTagline}

---

## COVER LETTER

${pkg.coverLetter}

---

## TAILORED RESUME SUMMARY

${pkg.resumeSummary}

### KEY BULLET HIGHLIGHTS
${pkg.bulletHighlights.map(b => `- ${b}`).join('\n')}

---

## COLD OUTREACH EMAIL

${pkg.coldEmail}

---

## LINKEDIN INVITATION NOTE

${pkg.linkedinMessage}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChanceMathis_Application_${pkg.companyName.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#090d16', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles color="#10b981" /> TAILORED APPLICATION & OUTREACH ARCHITECT
          </h2>
          <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>
            Target: <strong style={{ color: '#60a5fa' }}>{pkg.companyName}</strong> · Role: <strong style={{ color: '#34d399' }}>{pkg.roleTitle}</strong>
          </p>
        </div>

        <button
          onClick={handleDownloadMarkdown}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
            backgroundColor: '#10b981', color: '#030712', border: 'none', borderRadius: '8px',
            fontWeight: 800, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}
        >
          <Download size={16} /> Export Markdown Package (.md)
        </button>
      </div>

      {/* Sub-Nav */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveSection('cover')}
          style={{
            padding: '8px 18px', borderRadius: '6px', border: '1px solid #374151',
            backgroundColor: activeSection === 'cover' ? '#2563eb' : '#111827', color: '#fff',
            fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <FileText size={16} /> Cover Letter
        </button>
        <button
          onClick={() => setActiveSection('resume')}
          style={{
            padding: '8px 18px', borderRadius: '6px', border: '1px solid #374151',
            backgroundColor: activeSection === 'resume' ? '#2563eb' : '#111827', color: '#fff',
            fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <Sparkles size={16} /> Resume Highlights
        </button>
        <button
          onClick={() => setActiveSection('outreach')}
          style={{
            padding: '8px 18px', borderRadius: '6px', border: '1px solid #374151',
            backgroundColor: activeSection === 'outreach' ? '#2563eb' : '#111827', color: '#fff',
            fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <Send size={16} /> Cold Outreach & LinkedIn
        </button>
      </div>

      {/* Cover Letter Panel */}
      {activeSection === 'cover' && (
        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#60a5fa' }}>
              FDE COVER LETTER (DIRECT & PRINCIPLED TONE)
            </h3>
            <button
              onClick={() => handleCopy(pkg.coverLetter, 'cover')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                backgroundColor: copiedSection === 'cover' ? '#10b981' : '#030712',
                color: '#fff', border: '1px solid #374151', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'
              }}
            >
              {copiedSection === 'cover' ? <Check size={14} /> : <Copy size={14} />}
              {copiedSection === 'cover' ? 'Copied!' : 'Copy Text'}
            </button>
          </div>

          <textarea
            rows={18}
            value={pkg.coverLetter}
            onChange={(e) => setPkg({ ...pkg, coverLetter: e.target.value })}
            style={{
              width: '100%', backgroundColor: '#030712', border: '1px solid #374151',
              borderRadius: '8px', padding: '16px', color: '#f3f4f6', fontSize: '13px',
              fontFamily: 'monospace', lineHeight: '1.6', resize: 'vertical'
            }}
          />
        </div>
      )}

      {/* Resume Highlights Panel */}
      {activeSection === 'resume' && (
        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#34d399' }}>
              TAILORED EXECUTIVE SUMMARY & HIGHLIGHT BULLETS
            </h3>
            <button
              onClick={() => handleCopy(`${pkg.resumeSummary}\n\n` + pkg.bulletHighlights.join('\n'), 'resume')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                backgroundColor: copiedSection === 'resume' ? '#10b981' : '#030712',
                color: '#fff', border: '1px solid #374151', borderRadius: '6px', fontSize: '12px', cursor: 'pointer'
              }}
            >
              {copiedSection === 'resume' ? <Check size={14} /> : <Copy size={14} />}
              {copiedSection === 'resume' ? 'Copied!' : 'Copy Summary'}
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>PROFESSIONAL SUMMARY:</label>
            <textarea
              rows={4}
              value={pkg.resumeSummary}
              onChange={(e) => setPkg({ ...pkg, resumeSummary: e.target.value })}
              style={{
                width: '100%', backgroundColor: '#030712', border: '1px solid #374151',
                borderRadius: '8px', padding: '12px', color: '#f3f4f6', fontSize: '13px', lineHeight: '1.5'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>TAILORED HIGHLIGHT BULLETS:</label>
            {pkg.bulletHighlights.map((bullet, idx) => (
              <div key={idx} style={{ backgroundColor: '#030712', border: '1px solid #1f2937', padding: '12px', borderRadius: '6px', marginBottom: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                • {bullet}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outreach Panel */}
      {activeSection === 'outreach' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Cold Email */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={16} /> COLD OUTREACH EMAIL
              </h4>
              <button
                onClick={() => handleCopy(pkg.coldEmail, 'email')}
                style={{
                  padding: '4px 10px', backgroundColor: copiedSection === 'email' ? '#10b981' : '#030712',
                  color: '#fff', border: '1px solid #374151', borderRadius: '4px', fontSize: '11px', cursor: 'pointer'
                }}
              >
                {copiedSection === 'email' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              rows={14}
              value={pkg.coldEmail}
              onChange={(e) => setPkg({ ...pkg, coldEmail: e.target.value })}
              style={{
                width: '100%', backgroundColor: '#030712', border: '1px solid #374151',
                borderRadius: '8px', padding: '12px', color: '#f3f4f6', fontSize: '12px',
                fontFamily: 'monospace', lineHeight: '1.5'
              }}
            />
          </div>

          {/* LinkedIn Invitation */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Share2 size={16} /> LINKEDIN CONNECTION NOTE (300 CHAR MAX)
              </h4>
              <button
                onClick={() => handleCopy(pkg.linkedinMessage, 'linkedin')}
                style={{
                  padding: '4px 10px', backgroundColor: copiedSection === 'linkedin' ? '#10b981' : '#030712',
                  color: '#fff', border: '1px solid #374151', borderRadius: '4px', fontSize: '11px', cursor: 'pointer'
                }}
              >
                {copiedSection === 'linkedin' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              rows={8}
              value={pkg.linkedinMessage}
              onChange={(e) => setPkg({ ...pkg, linkedinMessage: e.target.value })}
              style={{
                width: '100%', backgroundColor: '#030712', border: '1px solid #374151',
                borderRadius: '8px', padding: '12px', color: '#f3f4f6', fontSize: '13px',
                lineHeight: '1.5', marginBottom: '12px'
              }}
            />
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Length: {pkg.linkedinMessage.length} characters
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
