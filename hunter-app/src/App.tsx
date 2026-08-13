import { useState } from 'react';
import { 
  Cpu, User, Search, FileText, MessageSquare, Kanban 
} from 'lucide-react';
import { CognitiveEngineVisualizer } from './components/CognitiveEngineVisualizer';
import { CandidateProfileTab } from './components/CandidateProfileTab';
import { JobMatcherTab } from './components/JobMatcherTab';
import { ApplicationTailorTab } from './components/ApplicationTailorTab';
import { InterviewSimulatorTab } from './components/InterviewSimulatorTab';
import { PipelineTrackerTab } from './components/PipelineTrackerTab';
import type { JobMatchResult } from './engine/jobMatcher';

export function App() {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'profile' | 'matcher' | 'tailor' | 'interview' | 'pipeline'>('visualizer');
  const [activeMatchResult, setActiveMatchResult] = useState<JobMatchResult | null>(null);

  const handleGenerateTailored = (result: JobMatchResult) => {
    setActiveMatchResult(result);
    setActiveTab('tailor');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#f3f4f6' }}>
      {/* Top Application Header */}
      <header style={{
        backgroundColor: '#090d16', borderBottom: '1px solid #1f2937',
        padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        {/* Brand & Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            padding: '10px', borderRadius: '10px', backgroundColor: '#2563eb',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)'
          }}>
            <Cpu size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 800, letterSpacing: '0.5px' }}>
                HUNTER <span style={{ color: '#60a5fa' }}>AI</span>
              </h1>
              <span style={{ fontSize: '10px', backgroundColor: '#111827', color: '#10b981', padding: '2px 8px', borderRadius: '10px', border: '1px solid #10b981', fontWeight: 700 }}>
                v1.0 COGNITIVE ENGINE
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
              RECURSIVE REASONING ARCHITECTURE · CHANCE MATHIS (FDE & SYSTEMS ARCHITECT)
            </p>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav style={{ display: 'flex', gap: '6px', backgroundColor: '#111827', padding: '4px', borderRadius: '10px', border: '1px solid #1f2937' }}>
          <button
            onClick={() => setActiveTab('visualizer')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
              border: 'none', backgroundColor: activeTab === 'visualizer' ? '#2563eb' : 'transparent',
              color: activeTab === 'visualizer' ? '#ffffff' : '#94a3b8', fontWeight: 600, fontSize: '12px', cursor: 'pointer'
            }}
          >
            <Cpu size={15} /> Cognitive Engine Loop
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
              border: 'none', backgroundColor: activeTab === 'profile' ? '#2563eb' : 'transparent',
              color: activeTab === 'profile' ? '#ffffff' : '#94a3b8', fontWeight: 600, fontSize: '12px', cursor: 'pointer'
            }}
          >
            <User size={15} /> Candidate Master Profile
          </button>
          <button
            onClick={() => setActiveTab('matcher')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
              border: 'none', backgroundColor: activeTab === 'matcher' ? '#2563eb' : 'transparent',
              color: activeTab === 'matcher' ? '#ffffff' : '#94a3b8', fontWeight: 600, fontSize: '12px', cursor: 'pointer'
            }}
          >
            <Search size={15} /> Job Matcher & Scorer
          </button>
          <button
            onClick={() => setActiveTab('tailor')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
              border: 'none', backgroundColor: activeTab === 'tailor' ? '#2563eb' : 'transparent',
              color: activeTab === 'tailor' ? '#ffffff' : '#94a3b8', fontWeight: 600, fontSize: '12px', cursor: 'pointer'
            }}
          >
            <FileText size={15} /> Application Tailorer
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
              border: 'none', backgroundColor: activeTab === 'interview' ? '#2563eb' : 'transparent',
              color: activeTab === 'interview' ? '#ffffff' : '#94a3b8', fontWeight: 600, fontSize: '12px', cursor: 'pointer'
            }}
          >
            <MessageSquare size={15} /> Interview Simulator
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px',
              border: 'none', backgroundColor: activeTab === 'pipeline' ? '#2563eb' : 'transparent',
              color: activeTab === 'pipeline' ? '#ffffff' : '#94a3b8', fontWeight: 600, fontSize: '12px', cursor: 'pointer'
            }}
          >
            <Kanban size={15} /> Application Pipeline
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {activeTab === 'visualizer' && <CognitiveEngineVisualizer />}
        {activeTab === 'profile' && <CandidateProfileTab />}
        {activeTab === 'matcher' && <JobMatcherTab onGenerateTailored={handleGenerateTailored} />}
        {activeTab === 'tailor' && <ApplicationTailorTab matchResult={activeMatchResult} />}
        {activeTab === 'interview' && <InterviewSimulatorTab />}
        {activeTab === 'pipeline' && <PipelineTrackerTab />}
      </main>

      {/* Footer Banner */}
      <footer style={{
        backgroundColor: '#090d16', borderTop: '1px solid #1f2937',
        padding: '16px 28px', fontSize: '12px', color: '#64748b', textAlign: 'center'
      }}>
        COMPLEXITY IS THE ENEMY. CLARITY IS THE EDGE. EXECUTION IS THE STANDARD. · CHANCE MATHIS (UNITED UPRISING)
      </footer>
    </div>
  );
}

export default App;
