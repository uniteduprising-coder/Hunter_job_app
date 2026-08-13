import React, { useState, useEffect } from 'react';
import { 
  Kanban, Plus, Trash2, DollarSign 
} from 'lucide-react';

export interface JobApplication {
  id: string;
  companyName: string;
  roleTitle: string;
  stage: 'Saved' | 'Applied' | 'Screening' | 'Technical Interview' | 'Offer' | 'Rejected';
  appliedDate: string;
  targetSalary?: string;
  notes?: string;
  cognitiveRecommendation?: string;
}

const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: "app-1",
    companyName: "Meta",
    roleTitle: "Forward-Deployed Engineer (FDE)",
    stage: "Technical Interview",
    appliedDate: "2026-08-01",
    targetSalary: "$220,000 - $260,000",
    notes: "Previous contract work with Meta Workplace & Llama 2/3 deployments gives high leverage.",
    cognitiveRecommendation: "Emphasize local-first AI harness (62% token compression) and Okta/Entra ID identity integrations."
  },
  {
    id: "app-2",
    companyName: "Whatnot, Inc.",
    roleTitle: "Staff Deployment Engineer",
    stage: "Screening",
    appliedDate: "2026-08-05",
    targetSalary: "$210,000 - $240,000",
    notes: "Maintained live-commerce streaming & CI/CD release validation pipelines in Python/Go.",
    cognitiveRecommendation: "Highlight platform reliability during high-traffic auctions and rapid post-incident resolution."
  },
  {
    id: "app-3",
    companyName: "Anthropic",
    roleTitle: "Solutions Architect / Systems Engineer",
    stage: "Saved",
    appliedDate: "2026-08-10",
    targetSalary: "$230,000 - $270,000",
    notes: "High strategic fit for MCP server orchestration and agentic reasoning architectures.",
    cognitiveRecommendation: "Submit tailored package highlighting dialectical reasoning loops and dual validation engine."
  }
];

const STAGES: JobApplication['stage'][] = [
  'Saved', 'Applied', 'Screening', 'Technical Interview', 'Offer', 'Rejected'
];

export const PipelineTrackerTab: React.FC = () => {
  const [apps, setApps] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('hunter_job_apps');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newNotes, setNewNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('hunter_job_apps', JSON.stringify(apps));
  }, [apps]);

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      companyName: newCompany,
      roleTitle: newRole,
      stage: 'Saved',
      appliedDate: new Date().toISOString().split('T')[0],
      targetSalary: newSalary || undefined,
      notes: newNotes || undefined,
      cognitiveRecommendation: "Context Fusion complete. Generate tailored cover letter & cold outreach."
    };

    setApps(prev => [newApp, ...prev]);
    setNewCompany('');
    setNewRole('');
    setNewSalary('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const moveStage = (id: string, newStage: JobApplication['stage']) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, stage: newStage } : a));
  };

  const deleteApp = (id: string) => {
    setApps(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#090d16', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Kanban color="#10b981" /> JOB APPLICATION PIPELINE TRACKER
          </h2>
          <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>
            Stateful Kanban Board & Cognitive Agent Audit Trail ({apps.length} Applications Active)
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
            backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px',
            fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
          }}
        >
          <Plus size={16} /> Add Target Opportunity
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100
        }}>
          <form onSubmit={handleAddApp} style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '24px', width: '420px' }}>
            <h3 style={{ margin: '0 0 16px', color: '#f3f4f6' }}>Add New Target Opportunity</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>COMPANY NAME</label>
              <input
                type="text" required value={newCompany} onChange={e => setNewCompany(e.target.value)}
                style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #374151', padding: '8px 12px', borderRadius: '6px', color: '#fff' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>ROLE TITLE</label>
              <input
                type="text" required value={newRole} onChange={e => setNewRole(e.target.value)}
                style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #374151', padding: '8px 12px', borderRadius: '6px', color: '#fff' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>TARGET SALARY / RANGE</label>
              <input
                type="text" value={newSalary} onChange={e => setNewSalary(e.target.value)} placeholder="e.g. $220k - $250k"
                style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #374151', padding: '8px 12px', borderRadius: '6px', color: '#fff' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>NOTES</label>
              <textarea
                rows={3} value={newNotes} onChange={e => setNewNotes(e.target.value)}
                style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #374151', padding: '8px 12px', borderRadius: '6px', color: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', backgroundColor: '#374151', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#10b981', color: '#030712', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>Save Application</button>
            </div>
          </form>
        </div>
      )}

      {/* Kanban Columns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px', overflowX: 'auto' }}>
        {STAGES.map(stage => {
          const stageApps = apps.filter(a => a.stage === stage);
          return (
            <div key={stage} style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '12px', minHeight: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #1f2937' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                  {stage}
                </span>
                <span style={{ fontSize: '11px', backgroundColor: '#030712', padding: '2px 8px', borderRadius: '10px', color: '#60a5fa', border: '1px solid #1f2937' }}>
                  {stageApps.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {stageApps.map(app => (
                  <div key={app.id} style={{ backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#f3f4f6' }}>{app.roleTitle}</h4>
                      <button onClick={() => deleteApp(app.id)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}>
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 600, marginTop: '2px' }}>
                      {app.companyName}
                    </div>

                    {app.targetSalary && (
                      <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <DollarSign size={10} /> {app.targetSalary}
                      </div>
                    )}

                    {app.notes && (
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px', lineHeight: '1.4' }}>
                        {app.notes}
                      </div>
                    )}

                    {app.cognitiveRecommendation && (
                      <div style={{ fontSize: '10px', color: '#a78bfa', backgroundColor: '#1e1b4b', padding: '6px', borderRadius: '4px', marginTop: '8px', border: '1px solid #312e81' }}>
                        💡 {app.cognitiveRecommendation}
                      </div>
                    )}

                    {/* Stage Switcher Controls */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '10px', flexWrap: 'wrap' }}>
                      {STAGES.filter(s => s !== stage).map(s => (
                        <button
                          key={s}
                          onClick={() => moveStage(app.id, s)}
                          style={{ fontSize: '9px', backgroundColor: '#111827', border: '1px solid #374151', color: '#cbd5e1', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
