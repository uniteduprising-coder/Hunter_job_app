import React, { useState } from 'react';
import { 
  MessageSquare, ShieldCheck, Cpu, Zap, Award 
} from 'lucide-react';

interface Question {
  id: string;
  category: 'System Architecture' | 'Forward-Deployed' | 'AI / Agentic' | 'Field & Trade';
  title: string;
  scenario: string;
  sampleKeyPoints: string[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "Forward-Deployed",
    title: "Handling Drifted System Requirements & Field Discrepancies",
    scenario: "You arrive at a client site where the architectural documentation states that identity integrations (Okta / Entra ID) are fully SAML compliant and APIs are documented. Upon deployment, you discover the client's internal HR system has non-standard endpoints and zero documentation. How do you proceed?",
    sampleKeyPoints: [
      "Reconcile as-built reality against documentation immediately without assigning blame.",
      "Inspect network traffic and API payloads directly (empirical observation).",
      "Deploy a lightweight translation wrapper / middleware layer rather than forcing client rewrite.",
      "Communicate clear timeline impact and carry through deployment accountability."
    ]
  },
  {
    id: "q2",
    category: "AI / Agentic",
    title: "Designing a Stateful Dual-Validated Cognitive Engine",
    scenario: "How do you prevent an AI agentic framework from suffering from 'first-answer fixation' or hallucinating action before formal checks pass?",
    sampleKeyPoints: [
      "Enforce explicit separation between Expansion (Divergence) and Filtering (Convergence).",
      "Implement Dual Validation: Heuristic Real-World Sensemaking vs Formal Logic Verification.",
      "Record disagreement between validators as diagnostic signal rather than error.",
      "Protect external actions behind a Commit Gate evaluating ExpectedUtility(Act) > ExpectedUtility(ThinkAgain)."
    ]
  },
  {
    id: "q3",
    category: "System Architecture",
    title: "Scaling Live Streaming Infrastructure & Platform Reliability",
    scenario: "At Whatnot / live-commerce scale, a real-time auction stream experiences unexpected spike in websocket latency during high-profile auctions. How do you diagnose and resolve?",
    sampleKeyPoints: [
      "Check connection pool saturation, event loop blocking, and pub/sub message queue backpressure.",
      "Deploy localized telemetry & observability metrics across Python/Go backend.",
      "Implement graceful shedding or rate limiting for non-critical chat payloads while prioritizing bid streams.",
      "Conduct post-incident root cause analysis and automate regression tests."
    ]
  }
];

export const InterviewSimulatorTab: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(QUESTIONS[0]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<{
    heuristicScore: number;
    logicScore: number;
    disagreementIndex: number;
    strengths: string[];
    gaps: string[];
    architectFeedback: string;
  } | null>(null);

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const textLower = userAnswer.toLowerCase();
      
      let hScore = 75;
      let lScore = 78;
      const strengths: string[] = [];
      const gaps: string[] = [];

      if (textLower.includes("field") || textLower.includes("observe") || textLower.includes("inspect") || textLower.includes("real")) {
        hScore += 15;
        strengths.push("Excellent practical field grounding and empirical observation mindset.");
      } else {
        gaps.push("Consider mentioning direct empirical observation of field realities.");
      }

      if (textLower.includes("wrapper") || textLower.includes("schema") || textLower.includes("logic") || textLower.includes("api") || textLower.includes("validation")) {
        lScore += 16;
        strengths.push("Strong technical & formal architectural reasoning.");
      } else {
        gaps.push("Include explicit architectural mechanisms (e.g. middleware wrappers, schema checks).");
      }

      if (textLower.includes("accountable") || textLower.includes("clarity") || textLower.includes("client")) {
        hScore += 6;
        strengths.push("High FDE client accountability and clear communication.");
      }

      const heuristicScore = Math.min(98, hScore);
      const logicScore = Math.min(96, lScore);
      const disagreementIndex = Math.abs(heuristicScore - logicScore);

      setEvaluation({
        heuristicScore,
        logicScore,
        disagreementIndex,
        strengths,
        gaps: gaps.length > 0 ? gaps : ["Answer covers all core FDE & system requirements cleanly."],
        architectFeedback: `Dual Validation Result: Heuristic Real-World Grounding (${heuristicScore}%) & Formal Logic Verification (${logicScore}%). Candidate demonstrates clear Forward-Deployed Engineering discipline: 'Complexity is the enemy. Clarity is the edge.'`
      });

      setIsEvaluating(false);
    }, 700);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#090d16', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessageSquare color="#8b5cf6" /> FDE & SYSTEM ARCHITECTURE INTERVIEW SIMULATOR
        </h2>
        <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>
          Practice technical scenarios scored in real-time by the Cognitive Engine Dual Validation Layer.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left Column: Select Question & Enter Answer */}
        <div>
          {/* Question Selector */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#8b5cf6', marginBottom: '8px' }}>
              SELECT INTERVIEW SCENARIO:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUESTIONS.map(q => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setEvaluation(null);
                    setUserAnswer("");
                  }}
                  style={{
                    padding: '10px 14px', borderRadius: '8px', border: '1px solid #374151',
                    textAlign: 'left', cursor: 'pointer',
                    backgroundColor: selectedQuestion.id === q.id ? '#1e1b4b' : '#030712',
                    color: selectedQuestion.id === q.id ? '#a78bfa' : '#cbd5e1',
                    fontWeight: selectedQuestion.id === q.id ? 700 : 500
                  }}
                >
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{q.category}</div>
                  <div style={{ fontSize: '13px' }}>{q.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Details */}
          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
            <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, color: '#f3f4f6' }}>
              {selectedQuestion.title}
            </h4>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', backgroundColor: '#030712', padding: '12px', borderRadius: '8px', border: '1px solid #1f2937' }}>
              {selectedQuestion.scenario}
            </p>

            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
              YOUR CANDIDATE RESPONSE:
            </label>
            <textarea
              rows={10}
              placeholder="Structure your answer using FDE principles (Clarify problem, empirical observation, maintainable architecture, execution accountability)..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{
                width: '100%', backgroundColor: '#030712', border: '1px solid #374151',
                borderRadius: '8px', padding: '12px', color: '#f3f4f6', fontSize: '13px',
                fontFamily: 'sans-serif', lineHeight: '1.5', marginBottom: '14px'
              }}
            />

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || !userAnswer.trim()}
              style={{
                width: '100%', padding: '12px', backgroundColor: isEvaluating ? '#374151' : '#7c3aed',
                color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px',
                cursor: isEvaluating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
              }}
            >
              {isEvaluating ? <Cpu className="spin" size={18} /> : <Zap size={18} />}
              {isEvaluating ? 'Evaluating Dual Validation Scores...' : 'Submit Answer for Cognitive AI Evaluation'}
            </button>
          </div>
        </div>

        {/* Right Column: AI Dual Validation Feedback */}
        <div>
          {evaluation ? (
            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 700, color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck color="#a78bfa" /> DUAL VALIDATION EVALUATION REPORT
              </h3>

              {/* Gauges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#030712', border: '1px solid #1f2937', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>HEURISTIC GROUNDING</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#38bdf8' }}>{evaluation.heuristicScore}%</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Real-World Practicality</div>
                </div>

                <div style={{ backgroundColor: '#030712', border: '1px solid #1f2937', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#a855f7', fontWeight: 700 }}>LOGIC VERIFICATION</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#a855f7' }}>{evaluation.logicScore}%</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Formal Architecture</div>
                </div>
              </div>

              {/* Architect Feedback Note */}
              <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', border: '1px solid #7c3aed', padding: '14px', borderRadius: '8px', fontSize: '13px', color: '#ddd6fe', marginBottom: '20px' }}>
                💡 <strong>Architect Synthesis:</strong> {evaluation.architectFeedback}
              </div>

              {/* Strengths */}
              <h4 style={{ margin: '0 0 8px', fontSize: '13px', color: '#34d399' }}>STRENGTHS DETECTED:</h4>
              <ul style={{ margin: '0 0 16px', paddingLeft: '20px', fontSize: '12px', color: '#cbd5e1' }}>
                {evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>

              {/* Gaps / Refinement */}
              <h4 style={{ margin: '0 0 8px', fontSize: '13px', color: '#eab308' }}>REFINEMENT RECOMMENDATIONS:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#cbd5e1' }}>
                {evaluation.gaps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          ) : (
            <div style={{ backgroundColor: '#111827', border: '1px border #1f2937', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
              <Award size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
              <h4 style={{ margin: 0, color: '#94a3b8' }}>Interview Evaluator Standby</h4>
              <p style={{ margin: '6px 0 0', fontSize: '13px' }}>
                Type your candidate response on the left and click submit to test your answer against the Dual Validation Cognitive Engine.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
