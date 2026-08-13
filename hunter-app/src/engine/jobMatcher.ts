
export interface MatchRequirement {
  name: string;
  category: 'Must Have' | 'Nice Have' | 'Architecture' | 'Domain';
  matched: boolean;
  matchingExperience?: string;
  candidateEvidence?: string;
}

export interface JobMatchResult {
  jobTitle: string;
  companyName: string;
  overallMatchScore: number; // 0 - 100
  heuristicFitScore: number; // 0 - 100 (Culture/Tone/Practical Grounding)
  logicMatchScore: number;     // 0 - 100 (Technical/Skill Keywords match)
  frictionNotice?: string;
  requirements: MatchRequirement[];
  keyStrengths: string[];
  gapAnalysis: string[];
  suggestedHooks: string[];
}

export function matchJobDescription(jobText: string, customTitle?: string, customCompany?: string): JobMatchResult {
  const textLower = jobText.toLowerCase();

  // Keyword / Requirement taxonomy
  const criteria = [
    { keywords: ["python"], name: "Python Engineering", category: "Must Have" as const, experience: "9+ Years enterprise & local AI harness" },
    { keywords: ["rust"], name: "Rust Systems Development", category: "Nice Have" as const, experience: "Built local AI research harness & compression layer" },
    { keywords: ["typescript", "ts", "react", "node"], name: "TypeScript / Web Engineering", category: "Must Have" as const, experience: "Full-stack apps, WebGL geospatial, React" },
    { keywords: ["ai", "agent", "llm", "rag", "llama"], name: "AI / Agentic Systems & RAG", category: "Architecture" as const, experience: "Meta Llama 2/3, WhatsApp/IG AI business agents, RAG certification" },
    { keywords: ["aws", "gcp", "google cloud", "cloud"], name: "Cloud Infrastructure (AWS/GCP)", category: "Must Have" as const, experience: "Private AWS & GCP environments for enterprise AI & streaming" },
    { keywords: ["okta", "entra", "saml", "sso", "identity"], name: "Enterprise Identity & SSO", category: "Domain" as const, experience: "Meta Workplace integration with Okta, Entra ID, SAML SSO" },
    { keywords: ["ci/cd", "deployment", "docker", "k8s", "kubernetes", "pipeline"], name: "CI/CD & Release Automation", category: "Must Have" as const, experience: "Whatnot live-commerce CI/CD, monitoring, release validation" },
    { keywords: ["forward deployed", "fde", "architecture", "solutions architect"], name: "Forward-Deployed / Architecture Mindset", category: "Architecture" as const, experience: "Translating ambiguous client needs to deployed software + trade discipline" },
    { keywords: ["geospatial", "webgl", "kml", "wgs84"], name: "Geospatial & Visualization", category: "Nice Have" as const, experience: "United Uprising WebGL geospatial & WGS84 transform pipelines" },
    { keywords: ["leadership", "client", "customer", "contractor"], name: "Client Leadership & Accountability", category: "Domain" as const, experience: "8 years running electrical contracting business + Meta FDE client roles" }
  ];

  let matchedCount = 0;
  const requirements: MatchRequirement[] = [];
  const keyStrengths: string[] = [];
  const gapAnalysis: string[] = [];

  criteria.forEach(item => {
    const isMatched = item.keywords.some(kw => textLower.includes(kw));
    if (isMatched) {
      matchedCount++;
      requirements.push({
        name: item.name,
        category: item.category,
        matched: true,
        matchingExperience: item.experience,
        candidateEvidence: `Direct match in Chance's profile: ${item.experience}`
      });
      keyStrengths.push(`${item.name}: ${item.experience}`);
    } else {
      requirements.push({
        name: item.name,
        category: item.category,
        matched: false
      });
      gapAnalysis.push(`Job mentions or implies ${item.name} — emphasize Chance's fast adaptability and transferrable architecture skills.`);
    }
  });

  const logicMatchScore = Math.round((matchedCount / criteria.length) * 100);
  const heuristicFitScore = Math.min(100, logicMatchScore + (textLower.includes("forward") || textLower.includes("architect") || textLower.includes("deploy") ? 12 : 5));
  const overallMatchScore = Math.round((logicMatchScore * 0.6) + (heuristicFitScore * 0.4));

  // Extract job title and company if not passed
  const title = customTitle || (textLower.includes("forward deployed") ? "Forward-Deployed Engineer" : textLower.includes("architect") ? "Systems Architect" : "Senior AI / Software Engineer");
  const company = customCompany || "Target Enterprise";

  const suggestedHooks = [
    `"I bring 9 years building enterprise technical systems (Meta, Whatnot) paired with 8 years running my own electrical & telecom contracting business."`,
    `"Built a local-first AI research harness with reversible context-compression cutting token overhead to 62%."`,
    `"Complexity is the enemy. Clarity is the edge. Execution is the standard."`
  ];

  return {
    jobTitle: title,
    companyName: company,
    overallMatchScore,
    heuristicFitScore,
    logicMatchScore,
    frictionNotice: heuristicFitScore !== logicMatchScore ? `Dual Validation Variance: Heuristic Fit (${heuristicFitScore}%) vs Keyword Logic (${logicMatchScore}%). High candidate adaptivity.` : undefined,
    requirements,
    keyStrengths,
    gapAnalysis,
    suggestedHooks
  };
}
