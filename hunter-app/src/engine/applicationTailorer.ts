import type { JobMatchResult } from './jobMatcher';

export interface TailoredApplicationPackage {
  companyName: string;
  roleTitle: string;
  coverLetter: string;
  resumeSummary: string;
  bulletHighlights: string[];
  coldEmail: string;
  linkedinMessage: string;
  fdeToneTagline: string;
}

export function generateTailoredPackage(matchResult: JobMatchResult): TailoredApplicationPackage {
  const company = matchResult.companyName;
  const role = matchResult.jobTitle;

  const coverLetter = `// SYSTEMS ARCHITECT FILE
CHANCE MATHIS
FORWARD-DEPLOYED ENGINEER (FDE) & Systems Architect
New Albany, IN | 502-821-7108 | chance@uniteduprising.com | Portfolio: uniteduprising.com | LinkedIn: chancemathis

AI SYSTEMS · CLOUD & IDENTITY · DEPLOYMENT · TECHNICAL OPERATIONS

${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}

Hiring Team & Engineering Leadership
${company}

Dear ${company} Hiring Team,

Your team needs more than someone who can discuss architecture in a conference room. It needs a Forward-Deployed Engineer who can take ambiguous, messy requirements, translate them into deployed, reliable software, and remain fully accountable through handoff. I bring nine years of enterprise technical experience, paired with eight years running an electrical and telecom contracting business.

At Meta (contract), I delivered enterprise AI, cloud identity, and workplace automation — deploying AI business agents across Instagram and WhatsApp, and architecting private AWS and Google Cloud environments for Llama 2 and Llama 3 deployments against proprietary enterprise data. At Whatnot, I supported platform reliability, developer tooling, CI/CD, release validation, and real-time streaming infrastructure.

Through United Uprising, I built and maintain a local-first AI research harness spanning retrieval, indexing, connector orchestration (MCP servers), terminal agents, and reversible context compression cutting operational token overhead to ~62%. My field background adds a crucial engineering discipline: systems must survive real users, physical constraints, deadlines, and imperfect documentation.

I would bring ${company} a practical architecture mindset: clarify the problem, choose maintainable systems, make integrations observable, and carry the work through deployment.

Sincerely,

Chance Mathis
DESIGN. BUILD. DELIVER.
NO HYPE. ONLY WORK.
chance@uniteduprising.com | 502-821-7108`;

  const resumeSummary = `Forward-Deployed Engineer & Systems Architect with an unusual pairing: 9 years building enterprise technical systems (Meta, Whatnot) and 8 years running a commercial electrical contracting business. Proven track record deploying enterprise AI agents, Llama 2/3 cloud infrastructure, identity integrations (Okta, Entra ID, SAML), and local-first agentic harnesses. Known for translating ambiguous client goals into battle-tested production code.`;

  const bulletHighlights = [
    `Meta (Software/Deployment Engineer): Deployed AI business agents across IG/WhatsApp; architected private AWS/GCP Llama 2/3 deployments; integrated Workplace with Okta, Entra ID, & SAML SSO.`,
    `Whatnot (Deployment Engineer): Supported platform reliability, CI/CD pipelines, release validation, and real-time streaming for high-traffic live-commerce auctions across Python & Go.`,
    `United Uprising (Founder & Architect): Built local-first AI research harness with MCP servers, terminal agent, WebGL geospatial pipelines, and context compression layer (62% token reduction).`,
    `Mathis Electric (Owner/Operator): 8 years commercial electrical contractor. Mastered print reading, NEC compliance, and reconciling as-built field reality against drifted documentation.`
  ];

  const coldEmail = `Subject: Forward-Deployed Engineer / Systems Architect — Chance Mathis

Hi ${company} Engineering Team,

I noticed ${company}'s opening for ${role}. 

I am a Forward-Deployed Engineer with 9 years building enterprise technical systems (Meta, Whatnot) and 8 years running a commercial electrical contracting business.

A quick summary of what I bring:
1. Enterprise AI & Cloud: Deployed AI agents across Instagram/WhatsApp and architected private AWS/GCP environments for Llama 2/3 at Meta.
2. Platform Reliability: Managed CI/CD, release validation, and real-time streaming at Whatnot.
3. Agentic Architecture: Built a local-first AI research harness with MCP servers and context-compression cutting token overhead to 62%.

My ethos is simple: Complexity is the enemy. Clarity is the edge. Execution is the standard. No hype — only work.

I would welcome a 10-minute conversation about how I can help ${company} deploy robust systems.

Best regards,

Chance Mathis
chance@uniteduprising.com | 502-821-7108
Portfolio: uniteduprising.com`;

  const linkedinMessage = `Hi team, I saw ${company}'s ${role} role. I'm an FDE & Systems Architect (ex-Meta, Whatnot) with 9 yrs in software & 8 yrs in commercial electrical contracting. I build real AI/cloud systems that survive field reality. Would love to connect! - Chance Mathis`;

  return {
    companyName: company,
    roleTitle: role,
    coverLetter,
    resumeSummary,
    bulletHighlights,
    coldEmail,
    linkedinMessage,
    fdeToneTagline: "COMPLEXITY IS THE ENEMY. CLARITY IS THE EDGE. EXECUTION IS THE STANDARD."
  };
}
