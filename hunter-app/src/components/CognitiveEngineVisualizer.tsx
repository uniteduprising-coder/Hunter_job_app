import React, { useState } from 'react';
import { 
  Cpu, Zap, ShieldCheck, GitMerge, Compass, CheckCircle2, 
  AlertTriangle, RefreshCw, Layers, Play, Check, Eye 
} from 'lucide-react';
import { 
  fuseContext, expandHypotheses, filterCandidates, 
  synthesizeReasoning, runDualValidation, evaluateCommitGate 
} from '../engine/cognitiveEngine';
import type { 
  PromptInput, WorldVector, Constraints, EngineState, DualValidationScores, 
  CommitDecision 
} from '../engine/cognitiveEngine';

interface Props {
  initialJobText?: string;
  initialCompany?: string;
}

export const CognitiveEngineVisualizer: React.FC<Props> = ({ initialJobText, initialCompany }) => {
  const [engineStep, setEngineStep] = useState<EngineState['step']>('IDLE');
  const [promptText, setPromptText] = useState<string>(
    initialJobText || "Evaluate fit for Forward-Deployed Engineer role at target enterprise. Reconcile enterprise AI, identity integrations, and electrical trade grounding."
  );
  const [companyName, setCompanyName] = useState<string>(initialCompany || "Target Enterprise");
  const [activeTab, setActiveTab] = useState<'visualizer' | 'audit' | 'state'>('visualizer');

  const [currentContext, setCurrentContext] = useState<any>(null);
  const [reasoning, setReasoning] = useState<any>(null);
  const [validation, setValidation] = useState<DualValidationScores | null>(null);
  const [decision, setDecision] = useState<CommitDecision | null>(null);
  const [auditLogs, setAuditLogs] = useState<string[]>([
    "[SYSTEM_INIT] Cognitive engine loaded into memory.",
    "[DIALECTIC] Standard tri-system matrix standby ready."
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (msg: string) => {
    setAuditLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const runFullLoop = async () => {
    setIsRunning(true);
    setAuditLogs([]);
    addLog("=== STARTING RECURSIVE COGNITIVE ENGINE LOOP ===");

    // Step 1: Context Fusion
    setEngineStep('CONTEXTUALIZE');
    addLog("Step 1/8: Executing Context Fusion X = ContextFusion(P, V, C, S_t)");
    const promptInput: PromptInput = {
      rawPrompt: promptText,
      companyName,
      targetRole: "Forward-Deployed Engineer",
      userDirectives: ["Enforce FDE direct tone", "Emphasize Meta + Whatnot + Electrical trade pairing"]
    };
    const worldVec: WorldVector = {
      retrievedDocuments: ["ChanceMathis_Resume.pdf", "ChanceMathis_Cover_Letter.pdf", "architecture hunter logic.txt"],
      candidateSkills: ["Python", "Rust", "TypeScript", "Llama 2/3", "Okta", "Entra ID", "WebGL", "NEC Compliance"],
      candidateExperiences: ["United Uprising Founder", "Meta FDE Contract", "Whatnot Deployment Engineer", "Mathis Electric Owner"],
      knownFailureModes: ["Rhetorical fluency without empirical proof", "Premature solution space collapse"],
      activeMemories: ["Local-first AI research harness (62% token compression)"]
    };
    const constr: Constraints = {
      hardBoundaries: ["No hyperbole", "Verifiable timelines only", "Must contain FDE principles"],
      toneRequirement: "FDE - Direct, principled, zero hype",
      timeLimitMs: 5000,
      safetyChecks: ["Schema validation passed", "Timeline consistency verified"]
    };
    
    await new Promise(r => setTimeout(r, 400));
    const ctx = fuseContext(promptInput, worldVec, constr);
    setCurrentContext(ctx);
    addLog(`Context fused: Confidence ${Math.round(ctx.confidence * 100)}%, Goal: "${ctx.extractedGoal.slice(0, 60)}..."`);

    // Step 2: Divergent Expansion
    setEngineStep('DIVERGE');
    addLog("Step 2/8: Divergent Expansion H = Expand(X) — intentional hypothesis space widening.");
    await new Promise(r => setTimeout(r, 400));
    const hyp = expandHypotheses(ctx);
    addLog(`Expanded ${hyp.length} distinct hypotheses across Strategic, Technical, and Outreach dimensions.`);

    // Step 3: Convergent Filtering
    setEngineStep('CONVERGE');
    addLog("Step 3/8: Convergent Filtering H' = Filter(H, X, C) — constraint enforcement.");
    await new Promise(r => setTimeout(r, 400));
    const flt = filterCandidates(hyp, ctx, constr);
    addLog(`Filtered candidates. Top candidate viability score: ${flt[0].viabilityScore}/100.`);

    // Step 4: Central Reasoning & Synthesis
    setEngineStep('SYNTHESIZE');
    addLog("Step 4/8: Central Reasoning R = Reason(X, H') — dialectical synthesis.");
    await new Promise(r => setTimeout(r, 400));
    const rsn = synthesizeReasoning(ctx, flt);
    setReasoning(rsn);
    addLog(`Synthesized solution with ${rsn.keyArguments.length} core architectural pillars.`);

    // Step 5: Dual Validation Layer
    setEngineStep('CHECK');
    addLog("Step 5/8: Dual Validation Layer — Heuristic Real-World Sensemaking vs Formal Logic Verification.");
    await new Promise(r => setTimeout(r, 400));
    const val = runDualValidation(rsn, ctx);
    setValidation(val);
    addLog(`Dual Validation Complete: Heuristic Score = ${val.heuristicScore}/100 | Logic Score = ${val.logicScore}/100`);
    if (val.frictionAlert) {
      addLog(`[FRICTION SIGNAL] Score variance detected (|${val.heuristicScore} - ${val.logicScore}|). Triggering dialectical refinement edge.`);
    }

    // Step 6: State Aggregation
    setEngineStep('AGGREGATE');
    addLog("Step 6/8: State Aggregation S_(t+1) = Aggregate(X, R, S_H, S_L) — updating truth state.");
    await new Promise(r => setTimeout(r, 400));

    // Step 7: Commit Gate Evaluation
    setEngineStep('DECIDE');
    addLog("Step 7/8: Evaluating Commit Gate: ExpectedUtility(Act) > ExpectedUtility(ThinkAgain).");
    await new Promise(r => setTimeout(r, 400));
    const dec = evaluateCommitGate({
      step: 'DECIDE',
      taskContext: ctx,
      hypotheses: hyp,
      filteredCandidates: flt,
      reasoningOutput: rsn,
      validationScores: val,
      objective: ctx.extractedGoal,
      knownFacts: rsn.keyArguments,
      openQuestions: ctx.missingInformation,
      rejectedHypotheses: [],
      auditTrail: auditLogs,
      iterationCount: 1
    });
    setDecision(dec);
    addLog(`Commit Gate Result: ${dec.warrantExplanation}`);

    // Step 8: Action Emission
    setEngineStep('ACT');
    addLog(`Step 8/8: ACTION EXECUTED -> ${dec.proposedAction}`);
    addLog("=== RECURSIVE ENGINE LOOP COMPLETE: STATEFUL RECONCILIATION ACHIEVED ===");

    setIsRunning(false);
  };

  const stepsList = [
    { id: 'CONTEXTUALIZE', title: 'Context Fusion', icon: Compass, color: '#3b82f6', desc: 'X = ContextFusion(P, V, C, S_t)' },
    { id: 'DIVERGE', title: 'Expansion (Divergence)', icon: GitMerge, color: '#8b5cf6', desc: 'H = Expand(X)' },
    { id: 'CONVERGE', title: 'Filtering (Convergence)', icon: Layers, color: '#ec4899', desc: "H' = Filter(H, X, C)" },
    { id: 'SYNTHESIZE', title: 'Central Reasoning', icon: Cpu, color: '#eab308', desc: 'R = Reason(X, H\')' },
    { id: 'CHECK', title: 'Dual Validation', icon: ShieldCheck, color: '#06b6d4', desc: 'Heuristics vs Formal Logic' },
    { id: 'DECIDE', title: 'Commit Gate', icon: Zap, color: '#10b981', desc: 'Utility(Act) > Utility(Think)' },
    { id: 'ACT', title: 'Action Emission', icon: CheckCircle2, color: '#22c55e', desc: 'Execute & Observe' }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#090d16', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header Banner */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '20px 24px', backgroundColor: '#111827', borderRadius: '12px', 
        border: '1px solid #1f2937', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <Cpu size={32} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, letterSpacing: '0.5px' }}>
              RECURSIVE COGNITIVE ENGINE <span style={{ fontSize: '13px', color: '#10b981', marginLeft: '10px', padding: '2px 8px', borderRadius: '12px', border: '1px solid #10b981' }}>DIALECTICAL MATRIX</span>
            </h2>
            <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>
              Unified Tri-System Architecture · State: <strong style={{ color: '#60a5fa' }}>{engineStep}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={runFullLoop}
          disabled={isRunning}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
            backgroundColor: isRunning ? '#374151' : '#2563eb', color: '#ffffff',
            border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px',
            cursor: isRunning ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            boxShadow: isRunning ? 'none' : '0 4px 14px rgba(37, 99, 235, 0.4)'
          }}
        >
          {isRunning ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
          {isRunning ? 'Processing Dialectic Loop...' : 'Execute Cognitive Loop'}
        </button>
      </div>

      {/* Input prompt area */}
      <div style={{ backgroundColor: '#111827', padding: '18px 24px', borderRadius: '12px', border: '1px solid #1f2937', marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
          COGNITIVE TASK PROMPT (P) & CONTEXT SPECIFICATION:
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            style={{
              flex: 1, backgroundColor: '#030712', border: '1px solid #374151',
              borderRadius: '6px', padding: '10px 14px', color: '#f3f4f6', fontSize: '14px',
              fontFamily: 'monospace'
            }}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{
              width: '200px', backgroundColor: '#030712', border: '1px solid #374151',
              borderRadius: '6px', padding: '10px 14px', color: '#f3f4f6', fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Navigation tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('visualizer')}
          style={{
            padding: '8px 18px', borderRadius: '6px', border: '1px solid #374151',
            backgroundColor: activeTab === 'visualizer' ? '#1d4ed8' : '#111827', color: '#ffffff',
            fontWeight: 600, cursor: 'pointer', fontSize: '13px'
          }}
        >
          Dialectical Loop Diagram
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          style={{
            padding: '8px 18px', borderRadius: '6px', border: '1px solid #374151',
            backgroundColor: activeTab === 'audit' ? '#1d4ed8' : '#111827', color: '#ffffff',
            fontWeight: 600, cursor: 'pointer', fontSize: '13px'
          }}
        >
          Live Audit Log ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('state')}
          style={{
            padding: '8px 18px', borderRadius: '6px', border: '1px solid #374151',
            backgroundColor: activeTab === 'state' ? '#1d4ed8' : '#111827', color: '#ffffff',
            fontWeight: 600, cursor: 'pointer', fontSize: '13px'
          }}
        >
          Truth State Inspector
        </button>
      </div>

      {activeTab === 'visualizer' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {stepsList.map((st, idx) => {
            const IconComponent = st.icon;
            const isActive = engineStep === st.id;
            const isPassed = ['CONTEXTUALIZE', 'DIVERGE', 'CONVERGE', 'SYNTHESIZE', 'CHECK', 'DECIDE', 'ACT'].indexOf(engineStep) > idx;

            return (
              <div
                key={st.id}
                style={{
                  backgroundColor: isActive ? 'rgba(30, 58, 138, 0.5)' : isPassed ? '#111827' : '#0b0f19',
                  border: `2px solid ${isActive ? st.color : isPassed ? '#1f2937' : '#111827'}`,
                  borderRadius: '10px', padding: '16px 12px', textAlign: 'center',
                  transition: 'all 0.3s ease', boxShadow: isActive ? `0 0 15px ${st.color}55` : 'none'
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 10px',
                  backgroundColor: isActive ? st.color : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#fff' : st.color
                }}>
                  <IconComponent size={20} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px', color: isActive ? '#ffffff' : '#e2e8f0' }}>
                  {st.title}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dual Validation Gauge Panel */}
      {validation && (
        <div style={{ 
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', 
          backgroundColor: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937', marginBottom: '24px' 
        }}>
          {/* Heuristic Score */}
          <div style={{ backgroundColor: '#070b14', padding: '16px', borderRadius: '8px', border: '1px solid #1f2937' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={16} /> Heuristics (Real-World Sensemaking S_H)
              </span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8' }}>{validation.heuristicScore}/100</span>
            </div>
            <div style={{ height: '8px', backgroundColor: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ height: '100%', width: `${validation.heuristicScore}%`, backgroundColor: '#38bdf8' }} />
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#94a3b8' }}>
              {validation.heuristicNotes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          </div>

          {/* Logic Score */}
          <div style={{ backgroundColor: '#070b14', padding: '16px', borderRadius: '8px', border: '1px solid #1f2937' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#a855f7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Logic Verification (Formal Check S_L)
              </span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#a855f7' }}>{validation.logicScore}/100</span>
            </div>
            <div style={{ height: '8px', backgroundColor: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ height: '100%', width: `${validation.logicScore}%`, backgroundColor: '#a855f7' }} />
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#94a3b8' }}>
              {validation.logicNotes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* Commit Gate Outcome Card */}
      {decision && (
        <div style={{ 
          backgroundColor: decision.actionWarranted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
          border: `1px solid ${decision.actionWarranted ? '#10b981' : '#ef4444'}`,
          borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px'
        }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: '50%', 
            backgroundColor: decision.actionWarranted ? '#10b981' : '#ef4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}>
            {decision.actionWarranted ? <Check size={28} /> : <AlertTriangle size={28} />}
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: decision.actionWarranted ? '#34d399' : '#f87171' }}>
              COMMIT GATE: {decision.decisionType} (Utility Act: {decision.expectedUtilityAct} vs Utility Think: {decision.expectedUtilityThinkAgain})
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>
              {decision.warrantExplanation}
            </p>
          </div>
        </div>
      )}

      {/* Audit Log Tab */}
      {activeTab === 'audit' && (
        <div style={{ backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '10px', padding: '16px', fontFamily: 'monospace', fontSize: '12px', maxHeight: '400px', overflowY: 'auto' }}>
          {auditLogs.map((log, i) => (
            <div key={i} style={{ color: log.includes('===') ? '#60a5fa' : log.includes('Step') ? '#a855f7' : '#94a3b8', marginBottom: '6px' }}>
              {log}
            </div>
          ))}
        </div>
      )}

      {/* State Inspector Tab */}
      {activeTab === 'state' && currentContext && (
        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: '#60a5fa' }}>CANONICAL TASK STATE OBJECT (X)</h4>
          <pre style={{ backgroundColor: '#030712', padding: '16px', borderRadius: '8px', color: '#34d399', fontSize: '12px', overflowX: 'auto' }}>
            {JSON.stringify({ context: currentContext, reasoning, validation, decision }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
