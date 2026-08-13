import React, { useState } from 'react';
import { 
  Search, Cpu, CheckCircle, AlertTriangle, 
  ArrowRight, FileText, Zap 
} from 'lucide-react';
import { matchJobDescription } from '../engine/jobMatcher';
import type { JobMatchResult } from '../engine/jobMatcher';

interface Props {
  onGenerateTailored: (result: JobMatchResult) => void;
}

export const JobMatcherTab: React.FC<Props> = ({ onGenerateTailored }) => {
  const [jobText, setJobText] = useState<string>(
`We are seeking a Forward-Deployed Engineer / Systems Architect to lead client deployments of enterprise AI applications and cloud infrastructure.

Key Responsibilities:
- Work directly with client engineering teams to translate ambiguous business requirements into deployed, high-reliability software.
- Architect private AWS and Google Cloud environments for LLM deployments (Llama 2 / Llama 3) and custom RAG pipelines.
- Integrate enterprise identity management systems including Okta, Entra ID, and SAML SSO with workplace APIs.
- Build and maintain CI/CD pipelines, release validation tooling, and real-time streaming architectures using Python, Rust, and TypeScript.
- Own deployment accountability from architecture phase through operational handoff.

Qualifications:
- 5+ years building enterprise technical software and cloud infrastructure.
- Hands-on mastery of Python, TypeScript, REST APIs, and Docker/Kubernetes.
- Experience with AI agentic frameworks, vector databases (HNSW), or local LLM deployments.
- Exceptional client leadership and practical field-problem solving under strict constraints.`
  );

  const [companyName, setCompanyName] = useState<string>("Meta AI Deployment Team");
  const [roleTitle, setRoleTitle] = useState<string>("Forward-Deployed Engineer (FDE)");
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleRunMatch = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = matchJobDescription(jobText, roleTitle, companyName);
      setMatchResult(res);
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#090d16', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search color="#3b82f6" /> COGNITIVE JOB DESCRIPTION MATCHER
        </h2>
        <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>
          Paste target job postings to execute Context Fusion & Dual Validation against Chance Mathis's master profile state.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left Column: Job Description Input */}
        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
          <h4 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 700, color: '#60a5fa' }}>
            TARGET JOB DETAILS
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>TARGET COMPANY</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #374151', borderRadius: '6px', padding: '8px 12px', color: '#fff', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>ROLE TITLE</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #374151', borderRadius: '6px', padding: '8px 12px', color: '#fff', fontSize: '13px' }}
              />
            </div>
          </div>

          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
            PASTE JOB DESCRIPTION / REQUIRMENTS:
          </label>
          <textarea
            rows={14}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            style={{
              width: '100%', backgroundColor: '#030712', border: '1px solid #374151',
              borderRadius: '8px', padding: '12px', color: '#f3f4f6', fontSize: '13px',
              fontFamily: 'monospace', lineHeight: '1.5', resize: 'vertical', marginBottom: '16px'
            }}
          />

          <button
            onClick={handleRunMatch}
            disabled={isAnalyzing || !jobText.trim()}
            style={{
              width: '100%', padding: '12px', backgroundColor: isAnalyzing ? '#374151' : '#2563eb',
              color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px',
              cursor: isAnalyzing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
            }}
          >
            {isAnalyzing ? <Cpu className="spin" size={18} /> : <Zap size={18} />}
            {isAnalyzing ? 'Executing Context Fusion & Scoring...' : 'Run Dual-Validated Matcher'}
          </button>
        </div>

        {/* Right Column: Match Results */}
        <div>
          {matchResult ? (
            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
              {/* Fit Score Banner */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: '#070b14', border: '1px solid #1f2937', padding: '16px', borderRadius: '10px', marginBottom: '20px'
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#34d399' }}>
                    {matchResult.overallMatchScore}% MATCH SCORE
                  </h3>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                    {matchResult.companyName} · {matchResult.jobTitle}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>
                    Heuristic Fit: {matchResult.heuristicFitScore}%
                  </div>
                  <div style={{ fontSize: '11px', color: '#a855f7', fontWeight: 700 }}>
                    Logic Keyword: {matchResult.logicMatchScore}%
                  </div>
                </div>
              </div>

              {/* Dual Validation Alert if applicable */}
              {matchResult.frictionNotice && (
                <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', color: '#fef08a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} color="#eab308" />
                  {matchResult.frictionNotice}
                </div>
              )}

              {/* Requirement Matrix */}
              <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: '#f3f4f6' }}>
                REQUIREMENT EVALUATION MATRIX ({matchResult.requirements.filter(r => r.matched).length}/{matchResult.requirements.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto', marginBottom: '20px' }}>
                {matchResult.requirements.map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#030712', border: '1px solid #1f2937', padding: '8px 12px', borderRadius: '6px' }}>
                    <span style={{ fontSize: '12px', color: req.matched ? '#f3f4f6' : '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {req.matched ? <CheckCircle size={14} color="#10b981" /> : <AlertTriangle size={14} color="#64748b" />}
                      {req.name} <span style={{ fontSize: '10px', color: '#64748b' }}>({req.category})</span>
                    </span>
                    {req.matched && <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 600 }}>MATCHED</span>}
                  </div>
                ))}
              </div>

              {/* Action Button: Generate Package */}
              <button
                onClick={() => onGenerateTailored(matchResult)}
                style={{
                  width: '100%', padding: '14px', backgroundColor: '#10b981', color: '#030712',
                  border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '14px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                }}
              >
                <FileText size={18} />
                Generate Tailored Cover Letter & Application Package <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div style={{ backgroundColor: '#111827', border: '1px border #1f2937', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <Cpu size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
              <h4 style={{ margin: 0, color: '#94a3b8' }}>No Analysis Run Yet</h4>
              <p style={{ margin: '6px 0 0', fontSize: '13px' }}>
                Click "Run Dual-Validated Matcher" on the left to analyze the job description against Chance Mathis's master profile.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
