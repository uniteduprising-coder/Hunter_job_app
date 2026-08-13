export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  type: string;
  location: string;
  bullets: string[];
  skillsUsed: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  details?: string;
}

export interface CandidateProfile {
  name: string;
  title: string;
  subtitle: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    portfolio: string;
    linkedin: string;
  };
  ethos: string[];
  tagline: string;
  summary: string;
  tradeSummary: string;
  experiences: WorkExperience[];
  education: {
    institution: string;
    degree: string;
    honors: string;
    gpa: string;
    date: string;
  }[];
  apprenticeship: {
    organization: string;
    program: string;
  };
  certifications: Certification[];
  skills: {
    category: string;
    items: string[];
  }[];
}

export const CHANCE_MATHIS_PROFILE: CandidateProfile = {
  name: "Chance Mathis",
  title: "FORWARD-DEPLOYED ENGINEER (FDE) & SYSTEMS ARCHITECT",
  subtitle: "Build Real Systems. Solve Real Problems. Create Real Impact.",
  contact: {
    location: "New Albany, IN",
    phone: "502-821-7108",
    email: "chance@uniteduprising.com",
    portfolio: "https://uniteduprising.com",
    linkedin: "https://linkedin.com/in/chancemathis"
  },
  tagline: "COMPLEXITY IS THE ENEMY. CLARITY IS THE EDGE. EXECUTION IS THE STANDARD.",
  ethos: [
    "NO HYPE. ONLY WORK.",
    "Diverge before you converge.",
    "Plausibility is not truth — dual validate everything.",
    "Systems must survive real users, physical constraints, deadlines, and imperfect documentation."
  ],
  summary: `Forward-Deployed Engineer with an unusual pairing: nine years building enterprise technical systems and eight running my own electrical and telecom contracting business. I work at the architecture level — translating ambiguous customer requirements into deployed, working software — with the field background to know what happens when the documentation and the physical installation disagree. Experience spans AI and agentic systems, cloud infrastructure, and enterprise integration.`,
  tradeSummary: `Owned and operated Mathis Electric LLC (2009-2016). Commercial scope: service & panel work, conduit & raceway, load calculations, structured cabling, print reading & redlining, NEC compliance, inspector & trade coordination. Routinely reconciled as-built field conditions against drawings where stacked revisions had drifted out of sync with physical installation.`,
  experiences: [
    {
      company: "United Uprising, Inc.",
      role: "FOUNDER & SYSTEMS ARCHITECT",
      period: "MAR 2024 – PRESENT",
      type: "Founder / Principal",
      location: "New Albany, IN",
      bullets: [
        "Built and maintain a local-first AI research harness: retrieval, indexing, connector orchestration, and a terminal agent with a reversible context-compression layer cutting operational token overhead to ~62% of baseline.",
        "Deliver WebGL geospatial visualization tooling and data pipelines handling WGS84 transforms and KML/GeoJSON/CSV interchange.",
        "Architect stateful agentic cognitive engines utilizing dialectical reconciliation, HNSW vector graphs, and dual validation layers."
      ],
      skillsUsed: ["Python", "Rust", "TypeScript", "AI Agentic Frameworks", "MCP Servers", "RAG", "WebGL", "Geospatial WGS84"]
    },
    {
      company: "Meta",
      role: "SOFTWARE ENGINEER · DEPLOYMENT ENGINEER",
      period: "JAN 2023 – NOV 2025",
      type: "Contract / Hybrid",
      location: "Remote / Hybrid",
      bullets: [
        "Delivered enterprise AI, cloud identity management, and workplace automation for large organizations.",
        "Deployed AI business agents across Instagram and WhatsApp; integrated Meta Workplace with Okta, Entra ID, Google Workspace, SAML SSO, HR ticketing, and facilities systems.",
        "Architected private AWS and Google Cloud environments for Llama 2 and Llama 3 deployments against proprietary enterprise data."
      ],
      skillsUsed: ["Enterprise AI", "Llama 2/3", "Okta", "Entra ID", "SAML SSO", "AWS", "Google Cloud", "Workplace Automation"]
    },
    {
      company: "Whatnot, Inc.",
      role: "DEPLOYMENT ENGINEER",
      period: "MAR 2021 – DEC 2022",
      type: "Contract",
      location: "Remote",
      bullets: [
        "Supported deployment, platform reliability, developer tooling, and backend infrastructure for a high-traffic live-commerce marketplace.",
        "Managed CI/CD pipelines and release automation; built monitoring and release-validation tooling.",
        "Maintained cloud infrastructure, real-time streaming, and messaging architecture supporting live auctions across Python and Go."
      ],
      skillsUsed: ["Python", "Go", "CI/CD", "Release Automation", "Real-Time Streaming", "Monitoring", "Cloud Infrastructure"]
    },
    {
      company: "Signature Healthcare",
      role: "NETWORK ENGINEER",
      period: "APR 2018 – NOV 2020",
      type: "Full-Time",
      location: "Louisville, KY / Regional",
      bullets: [
        "Administered enterprise networks, infrastructure services, and access management across healthcare environments.",
        "Diagnosed connectivity and systems failures and coordinated incident resolution under strict availability and HIPAA security requirements."
      ],
      skillsUsed: ["Networking", "Enterprise Security", "HIPAA Compliance", "Access Management", "Infrastructure Diagnostics"]
    },
    {
      company: "Compucom",
      role: "SOFTWARE SPECIALIST",
      period: "FEB 2017 – APR 2018",
      type: "Full-Time",
      location: "Louisville, KY",
      bullets: [
        "Installed, configured, and repaired enterprise software, workstation systems, and network hardware.",
        "Troubleshot OS and connectivity failures in end-user support environments."
      ],
      skillsUsed: ["Workstation OS", "Enterprise Software", "Hardware Troubleshooting", "Connectivity Diagnostics"]
    },
    {
      company: "Kindred Healthcare",
      role: "DEVICE ENGINEER",
      period: "APR 2016 – FEB 2017",
      type: "Full-Time",
      location: "Louisville, KY",
      bullets: [
        "Administered enterprise networks, infrastructure services, user access, and device hardware across hospital environments."
      ],
      skillsUsed: ["Device Management", "Hospital Networks", "User Access Control", "Infrastructure Services"]
    },
    {
      company: "Mathis Electric LLC",
      role: "OWNER / OPERATOR",
      period: "JAN 2009 – NOV 2016",
      type: "Self-Employed",
      location: "Southern IN / Louisville",
      bullets: [
        "Owned and operated a commercial and residential electrical and telecom contracting business — bidding, scheduling, crew coordination, and customer delivery.",
        "Commercial scope: service and panel work, conduit and raceway, load calculations, structured cabling and telecom rough-in, print reading and redlining, NEC compliance, and inspector/trade coordination.",
        "Routinely reconciled as-built field conditions against drawings where stacked revisions had drifted out of sync with the physical installation."
      ],
      skillsUsed: ["Electrical Systems", "NEC Compliance", "Project Leadership", "Telecom Cabling", "Field Diagnostics", "As-Built Reconciliation"]
    }
  ],
  education: [
    {
      institution: "SULLIVAN UNIVERSITY — COLLEGE OF TECHNOLOGY AND DESIGN",
      degree: "Bachelor of Science in Information Technology",
      honors: "Summa Cum Laude",
      gpa: "3.9",
      date: "October 2018"
    }
  ],
  apprenticeship: {
    organization: "INDEPENDENT ELECTRICAL CONTRACTORS (IEC)",
    program: "Electrical apprenticeship program — residential and commercial"
  },
  certifications: [
    {
      title: "Google AI Professional Certificate",
      issuer: "Google",
      date: "2026",
      details: "7-course comprehensive AI & ML engineering program"
    },
    {
      title: "IBM RAG & Generative AI Professional Certificate",
      issuer: "IBM",
      date: "Jul 2026",
      details: "Building RAG Applications & Developing Generative AI Applications"
    }
  ],
  skills: [
    {
      category: "LANGUAGES",
      items: ["Python", "Rust", "TypeScript", "SQL", "HTML/CSS", "PowerShell", "Go", "Bash"]
    },
    {
      category: "AI & AGENTIC ARCHITECTURES",
      items: [
        "Agentic Reasoners", "Context Fusion", "Dialectical Loops", "Dual Validation (Heuristics + Formal Logic)",
        "MCP Servers", "RAG Pipelines", "HNSW Vector Databases", "LangSmith", "Llama 2 / Llama 3", "Context Compression"
      ]
    },
    {
      category: "CLOUD & INFRASTRUCTURE",
      items: ["AWS", "Google Cloud", "CI/CD Pipelines", "Release Automation", "Monitoring & Observability", "Real-Time Streaming"]
    },
    {
      category: "ENTERPRISE INTEGRATION",
      items: ["REST APIs", "Okta", "Entra ID", "SAML SSO", "Google Workspace API", "Notion API", "GitHub APIs", "Meta Workplace"]
    },
    {
      category: "GEOSPATIAL & VISUALIZATION",
      items: ["WebGL", "WGS84 Coordinates", "KML / GeoJSON / CSV Pipelines", "Relational Spatial Routing"]
    },
    {
      category: "FIELD & TRADE DISCIPLINE",
      items: ["Commercial Electrical", "NEC Compliance", "As-Built Redlining", "Telecom Cabling", "Inspector Coordination"]
    }
  ]
};
