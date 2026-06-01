export interface QuizQuestionData {
  lessonSlug: string;
  moduleSlug: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  questionOrder: number;
}

export const QUIZ_QUESTIONS: QuizQuestionData[] = [
  // ── Module 1: Demystifying AI ──────────────────────────────────────────────

  // Lesson: what-is-ai
  {
    lessonSlug: "what-is-ai",
    moduleSlug: "demystifying-ai",
    question: "Which of the following best describes Machine Learning?",
    options: [
      "A system explicitly programmed with every possible rule",
      "A system that learns patterns from data without being explicitly programmed",
      "A system that simulates human emotions",
      "A database of pre-written answers",
    ],
    correctIndex: 1,
    explanation:
      "Machine Learning systems learn patterns from data rather than following explicitly programmed rules. This is what allows them to generalize to new situations.",
    questionOrder: 1,
  },
  {
    lessonSlug: "what-is-ai",
    moduleSlug: "demystifying-ai",
    question: "What is the most important question a leader should ask about an AI system?",
    options: [
      "Which programming language was used to build it?",
      "How many parameters does the model have?",
      "What data was it trained on, and what problem is it actually solving?",
      "Which cloud provider hosts it?",
    ],
    correctIndex: 2,
    explanation:
      "Leaders don't need to understand the technical internals. The critical questions are about the training data, the problem being solved, and how success and failure are measured.",
    questionOrder: 2,
  },
  {
    lessonSlug: "what-is-ai",
    moduleSlug: "demystifying-ai",
    question: "Generative AI systems like GPT-4 produce outputs by:",
    options: [
      "Accessing a live database of facts",
      "Generating statistically coherent content based on training data patterns",
      "Following a set of hand-coded logical rules",
      "Copying text directly from the internet",
    ],
    correctIndex: 1,
    explanation:
      "Generative AI produces new content by predicting statistically likely outputs based on patterns learned during training — it does not retrieve facts from a live database.",
    questionOrder: 3,
  },

  // Lesson: ml-vs-generative-ai
  {
    lessonSlug: "ml-vs-generative-ai",
    moduleSlug: "demystifying-ai",
    question: "What is the primary difference between predictive AI and generative AI?",
    options: [
      "Predictive AI is newer than generative AI",
      "Predictive AI forecasts outcomes from existing data; generative AI creates new content",
      "Generative AI is only used for images",
      "Predictive AI requires more data than generative AI",
    ],
    correctIndex: 1,
    explanation:
      "Predictive AI (e.g., fraud detection, demand forecasting) outputs a prediction or classification. Generative AI (e.g., LLMs, image generators) creates new content such as text, images, or code.",
    questionOrder: 1,
  },
  {
    lessonSlug: "ml-vs-generative-ai",
    moduleSlug: "demystifying-ai",
    question: "Which use case is best suited for predictive AI rather than generative AI?",
    options: [
      "Drafting a marketing email",
      "Generating a product image",
      "Predicting customer churn probability",
      "Summarizing a legal document",
    ],
    correctIndex: 2,
    explanation:
      "Predicting customer churn is a classification/regression task — a core strength of predictive ML. Drafting emails, generating images, and summarizing documents are generative tasks.",
    questionOrder: 2,
  },

  // Lesson: ai-hype-vs-reality
  {
    lessonSlug: "ai-hype-vs-reality",
    moduleSlug: "demystifying-ai",
    question: "What is an AI 'hallucination'?",
    options: [
      "When an AI system crashes unexpectedly",
      "When an AI generates confident but factually incorrect information",
      "When an AI refuses to answer a question",
      "When an AI produces output too slowly",
    ],
    correctIndex: 1,
    explanation:
      "Hallucination refers to AI generating plausible-sounding but factually incorrect content with apparent confidence. This is a critical risk leaders must account for in high-stakes applications.",
    questionOrder: 1,
  },
  {
    lessonSlug: "ai-hype-vs-reality",
    moduleSlug: "demystifying-ai",
    question: "Why is it important for leaders to distinguish AI hype from reality?",
    options: [
      "To avoid using AI altogether",
      "To make informed investment and deployment decisions that deliver real value",
      "To impress technical teams with their knowledge",
      "To delay AI adoption until the technology matures",
    ],
    correctIndex: 1,
    explanation:
      "Understanding what AI can and cannot do allows leaders to set realistic expectations, allocate resources wisely, and avoid costly failures driven by vendor overpromising.",
    questionOrder: 2,
  },

  // Lesson: evaluating-ai-vendors
  {
    lessonSlug: "evaluating-ai-vendors",
    moduleSlug: "demystifying-ai",
    question: "When evaluating an AI vendor's claims, what should you ask first?",
    options: [
      "How many Fortune 500 clients do they have?",
      "Can they demonstrate measurable results on a problem similar to yours?",
      "What is their marketing budget?",
      "How long have they been in business?",
    ],
    correctIndex: 1,
    explanation:
      "Vendor credibility is best assessed through demonstrated, measurable results on comparable problems — not brand recognition, client count, or company age.",
    questionOrder: 1,
  },
  {
    lessonSlug: "evaluating-ai-vendors",
    moduleSlug: "demystifying-ai",
    question: "What does 'model explainability' mean in the context of AI vendor evaluation?",
    options: [
      "The vendor can explain their pricing model",
      "The AI system can provide understandable reasons for its outputs",
      "The model is open source",
      "The vendor has a detailed user manual",
    ],
    correctIndex: 1,
    explanation:
      "Model explainability means the system can articulate why it reached a particular conclusion — critical for regulated industries and for building stakeholder trust.",
    questionOrder: 2,
  },

  // ── Module 2: Strategic AI Integration ────────────────────────────────────

  // Lesson: ai-readiness-framework
  {
    lessonSlug: "ai-readiness-framework",
    moduleSlug: "strategic-ai-integration",
    question: "Which of the following is a key dimension of organizational AI readiness?",
    options: [
      "The CEO's personal interest in technology",
      "Data infrastructure, talent capability, and leadership alignment",
      "The number of software licenses purchased",
      "Office location proximity to tech hubs",
    ],
    correctIndex: 1,
    explanation:
      "AI readiness encompasses data infrastructure quality, the organization's talent and skills, and alignment among leadership on AI's strategic role — not superficial factors.",
    questionOrder: 1,
  },
  {
    lessonSlug: "ai-readiness-framework",
    moduleSlug: "strategic-ai-integration",
    question: "Why should organizations assess AI readiness before launching AI initiatives?",
    options: [
      "To delay implementation as long as possible",
      "To identify gaps that could cause initiatives to fail and address them proactively",
      "To satisfy regulatory requirements",
      "To justify not investing in AI",
    ],
    correctIndex: 1,
    explanation:
      "Readiness assessments surface gaps in data quality, skills, or processes that would undermine AI projects. Addressing these proactively dramatically improves success rates.",
    questionOrder: 2,
  },

  // Lesson: identifying-use-cases
  {
    lessonSlug: "identifying-use-cases",
    moduleSlug: "strategic-ai-integration",
    question: "What makes a strong AI use case for an organization to prioritize?",
    options: [
      "It is the most technically complex problem available",
      "It has high business impact and sufficient quality data to support it",
      "It has been implemented by a competitor",
      "It requires the least amount of change management",
    ],
    correctIndex: 1,
    explanation:
      "The best use cases combine high business impact with data availability. Technical complexity alone is not a good selection criterion, and copying competitors ignores your unique context.",
    questionOrder: 1,
  },
  {
    lessonSlug: "identifying-use-cases",
    moduleSlug: "strategic-ai-integration",
    question: "Which framework helps prioritize AI use cases by balancing value and feasibility?",
    options: [
      "SWOT Analysis",
      "Impact-Feasibility Matrix",
      "Porter's Five Forces",
      "Balanced Scorecard",
    ],
    correctIndex: 1,
    explanation:
      "An Impact-Feasibility Matrix plots use cases by their potential business value against implementation feasibility, helping teams focus on high-value, achievable initiatives first.",
    questionOrder: 2,
  },

  // Lesson: building-ai-roadmap
  {
    lessonSlug: "building-ai-roadmap",
    moduleSlug: "strategic-ai-integration",
    question: "What is the recommended approach to sequencing an AI roadmap?",
    options: [
      "Start with the largest, most transformational project to signal commitment",
      "Begin with quick wins that build confidence and organizational capability",
      "Implement all initiatives simultaneously to maximize speed",
      "Wait until the technology is fully mature before starting",
    ],
    correctIndex: 1,
    explanation:
      "Starting with quick wins builds organizational confidence, demonstrates value to stakeholders, and develops the internal capabilities needed for larger initiatives.",
    questionOrder: 1,
  },
  {
    lessonSlug: "building-ai-roadmap",
    moduleSlug: "strategic-ai-integration",
    question: "Why is stakeholder alignment critical when building an AI roadmap?",
    options: [
      "It is a legal requirement in most jurisdictions",
      "Misaligned stakeholders can block funding, resist adoption, or set conflicting priorities",
      "It ensures the roadmap looks more professional",
      "It is only important for public companies",
    ],
    correctIndex: 1,
    explanation:
      "Without stakeholder alignment, AI initiatives face funding cuts, organizational resistance, and conflicting priorities that derail execution. Alignment must be built before and during implementation.",
    questionOrder: 2,
  },

  // ── Module 3: Data Strategy & Governance ──────────────────────────────────

  // Lesson: data-quality-matters
  {
    lessonSlug: "data-quality-matters",
    moduleSlug: "data-strategy-governance",
    question: "Why is data quality described as the foundation of AI success?",
    options: [
      "Because AI systems are only as reliable as the data they are trained on",
      "Because data storage is the most expensive part of AI",
      "Because regulators require high-quality data",
      "Because data quality affects only the speed of AI systems",
    ],
    correctIndex: 0,
    explanation:
      "AI models learn from data. Poor-quality data — incomplete, biased, or inaccurate — produces unreliable models. 'Garbage in, garbage out' is the foundational principle of AI data strategy.",
    questionOrder: 1,
  },
  {
    lessonSlug: "data-quality-matters",
    moduleSlug: "data-strategy-governance",
    question: "Which of the following is NOT a dimension of data quality?",
    options: [
      "Accuracy",
      "Completeness",
      "Profitability",
      "Timeliness",
    ],
    correctIndex: 2,
    explanation:
      "The standard dimensions of data quality are accuracy, completeness, consistency, timeliness, and validity. Profitability is a business metric, not a data quality dimension.",
    questionOrder: 2,
  },

  // Lesson: data-privacy-compliance
  {
    lessonSlug: "data-privacy-compliance",
    moduleSlug: "data-strategy-governance",
    question: "What does GDPR's 'right to explanation' require of AI systems?",
    options: [
      "That all AI code be made open source",
      "That individuals can request an explanation of automated decisions that affect them",
      "That AI systems must be approved by a government body",
      "That companies publish their AI training datasets",
    ],
    correctIndex: 1,
    explanation:
      "GDPR's right to explanation requires that individuals subject to automated decisions can request a meaningful explanation of how that decision was reached — driving the need for explainable AI.",
    questionOrder: 1,
  },
  {
    lessonSlug: "data-privacy-compliance",
    moduleSlug: "data-strategy-governance",
    question: "What is 'data minimization' in the context of AI and privacy?",
    options: [
      "Reducing the size of datasets to save storage costs",
      "Collecting and using only the data necessary for a specific, defined purpose",
      "Deleting all data after one year",
      "Anonymizing all data before storage",
    ],
    correctIndex: 1,
    explanation:
      "Data minimization is a privacy principle requiring that only data strictly necessary for a defined purpose is collected and processed — reducing privacy risk and regulatory exposure.",
    questionOrder: 2,
  },

  // Lesson: data-governance-framework
  {
    lessonSlug: "data-governance-framework",
    moduleSlug: "data-strategy-governance",
    question: "What is the primary role of a Data Steward in a governance framework?",
    options: [
      "To write code for data pipelines",
      "To own accountability for data quality and compliance within a specific domain",
      "To manage the IT infrastructure",
      "To approve all data purchases",
    ],
    correctIndex: 1,
    explanation:
      "Data Stewards are accountable for the quality, integrity, and appropriate use of data within their domain. They bridge business and technical teams in governance processes.",
    questionOrder: 1,
  },
  {
    lessonSlug: "data-governance-framework",
    moduleSlug: "data-strategy-governance",
    question: "Why do organizations need a data governance framework before scaling AI?",
    options: [
      "To satisfy investor relations requirements",
      "To ensure data is trustworthy, compliant, and consistently defined across the organization",
      "To reduce the number of data analysts needed",
      "To prevent employees from accessing data",
    ],
    correctIndex: 1,
    explanation:
      "Without governance, AI initiatives encounter inconsistent data definitions, quality issues, and compliance risks that undermine model reliability and organizational trust in AI outputs.",
    questionOrder: 2,
  },

  // ── Module 4: Ethical AI ───────────────────────────────────────────────────

  // Lesson: algorithmic-bias
  {
    lessonSlug: "algorithmic-bias",
    moduleSlug: "ethical-ai",
    question: "What is algorithmic bias?",
    options: [
      "A deliberate error introduced by programmers",
      "Systematic and unfair discrimination in AI outputs caused by biased training data or design",
      "The tendency of AI to favor newer data over older data",
      "A technical error that causes AI to run slowly",
    ],
    correctIndex: 1,
    explanation:
      "Algorithmic bias occurs when AI systems produce systematically unfair outcomes — often because training data reflects historical inequities or because protected characteristics are inadvertently encoded.",
    questionOrder: 1,
  },
  {
    lessonSlug: "algorithmic-bias",
    moduleSlug: "ethical-ai",
    question: "Which action best helps leaders mitigate algorithmic bias?",
    options: [
      "Using larger datasets regardless of their composition",
      "Auditing AI outputs regularly across demographic groups and diverse use cases",
      "Avoiding AI in hiring decisions entirely",
      "Outsourcing all AI development to third parties",
    ],
    correctIndex: 1,
    explanation:
      "Regular auditing of AI outputs across demographic groups is the most effective ongoing mitigation. Larger datasets can amplify bias if the underlying data is skewed.",
    questionOrder: 2,
  },

  // Lesson: transparency-accountability
  {
    lessonSlug: "transparency-accountability",
    moduleSlug: "ethical-ai",
    question: "What does AI transparency mean for organizational leaders?",
    options: [
      "Publishing all AI source code publicly",
      "Being able to explain how AI systems make decisions and who is accountable for outcomes",
      "Sharing AI training data with competitors",
      "Allowing employees to override all AI decisions",
    ],
    correctIndex: 1,
    explanation:
      "Transparency means stakeholders can understand how AI decisions are made and that clear accountability exists for outcomes — essential for trust, compliance, and ethical governance.",
    questionOrder: 1,
  },
  {
    lessonSlug: "transparency-accountability",
    moduleSlug: "ethical-ai",
    question: "Why is human oversight important in high-stakes AI applications?",
    options: [
      "Because AI systems are always wrong",
      "Because AI can make errors with serious consequences that require human judgment to catch",
      "Because regulators require a human signature on all decisions",
      "Because it is cheaper than fully automated systems",
    ],
    correctIndex: 1,
    explanation:
      "In high-stakes domains like healthcare, lending, or criminal justice, AI errors can cause serious harm. Human oversight provides a critical check on AI outputs before they affect people's lives.",
    questionOrder: 2,
  },

  // Lesson: ai-workforce-impact
  {
    lessonSlug: "ai-workforce-impact",
    moduleSlug: "ethical-ai",
    question: "What is the most effective leadership response to AI-driven workforce displacement?",
    options: [
      "Delay AI adoption to protect jobs",
      "Invest in reskilling and redeployment programs alongside AI implementation",
      "Communicate nothing until decisions are finalized",
      "Outsource all affected roles immediately",
    ],
    correctIndex: 1,
    explanation:
      "Proactive reskilling and redeployment programs allow organizations to capture AI's productivity benefits while fulfilling their duty of care to employees — and maintaining trust and morale.",
    questionOrder: 1,
  },
  {
    lessonSlug: "ai-workforce-impact",
    moduleSlug: "ethical-ai",
    question: "Which roles are most likely to be augmented (rather than replaced) by AI?",
    options: [
      "Roles requiring only routine, repetitive data processing",
      "Roles requiring judgment, empathy, creativity, and complex problem-solving",
      "Roles that involve no human interaction",
      "Roles in manufacturing and logistics only",
    ],
    correctIndex: 1,
    explanation:
      "AI augments roles requiring uniquely human capabilities — judgment, empathy, creativity, and complex reasoning. Purely routine, rule-based tasks are more susceptible to full automation.",
    questionOrder: 2,
  },

  // Lesson: ai-ethics-committee
  {
    lessonSlug: "ai-ethics-committee",
    moduleSlug: "ethical-ai",
    question: "What is the primary purpose of an AI Ethics Committee?",
    options: [
      "To slow down AI projects with bureaucratic review",
      "To provide oversight, guidance, and accountability for responsible AI deployment",
      "To replace the legal and compliance department",
      "To evaluate AI vendor contracts",
    ],
    correctIndex: 1,
    explanation:
      "An AI Ethics Committee provides structured governance for responsible AI use — reviewing high-risk applications, setting standards, and ensuring accountability across the organization.",
    questionOrder: 1,
  },
  {
    lessonSlug: "ai-ethics-committee",
    moduleSlug: "ethical-ai",
    question: "Who should be represented on an AI Ethics Committee?",
    options: [
      "Only data scientists and engineers",
      "A cross-functional group including legal, HR, business leaders, and technical experts",
      "Only senior executives",
      "Only external consultants",
    ],
    correctIndex: 1,
    explanation:
      "Effective AI ethics governance requires diverse perspectives — technical, legal, business, and human — to identify risks that any single function would miss.",
    questionOrder: 2,
  },

  // ── Module 5: Leading the AI-Powered Organization ─────────────────────────

  // Lesson: change-management
  {
    lessonSlug: "change-management",
    moduleSlug: "leading-ai-powered-organization",
    question: "What is the most common reason AI initiatives fail during implementation?",
    options: [
      "The AI technology is not advanced enough",
      "Organizational resistance and poor change management",
      "Insufficient computing power",
      "Lack of vendor support",
    ],
    correctIndex: 1,
    explanation:
      "Research consistently shows that organizational resistance — not technology limitations — is the primary cause of AI implementation failure. Change management is as important as the technology itself.",
    questionOrder: 1,
  },
  {
    lessonSlug: "change-management",
    moduleSlug: "leading-ai-powered-organization",
    question: "Which change management approach is most effective for AI adoption?",
    options: [
      "Top-down mandate with immediate full deployment",
      "Involving employees early, communicating transparently, and building trust through pilots",
      "Keeping plans confidential until launch",
      "Replacing resistant employees",
    ],
    correctIndex: 1,
    explanation:
      "Early involvement, transparent communication, and trust-building through pilots reduce resistance and create internal champions who accelerate adoption across the organization.",
    questionOrder: 2,
  },

  // Lesson: building-ai-talent
  {
    lessonSlug: "building-ai-talent",
    moduleSlug: "leading-ai-powered-organization",
    question: "What is 'AI fluency' and why does it matter for all employees?",
    options: [
      "The ability to write AI code — only relevant for technical staff",
      "A baseline understanding of AI concepts that enables everyone to work effectively alongside AI tools",
      "Certification in machine learning algorithms",
      "Fluency in Python and R programming languages",
    ],
    correctIndex: 1,
    explanation:
      "AI fluency is a baseline conceptual understanding — not coding ability — that allows all employees to use AI tools effectively, ask good questions, and identify risks in their work.",
    questionOrder: 1,
  },
  {
    lessonSlug: "building-ai-talent",
    moduleSlug: "leading-ai-powered-organization",
    question: "When building an AI team, what is the most important factor beyond technical skills?",
    options: [
      "Candidates with the most prestigious university degrees",
      "Domain expertise and the ability to translate business problems into AI solutions",
      "Experience with the latest AI frameworks",
      "The number of published research papers",
    ],
    correctIndex: 1,
    explanation:
      "The most effective AI teams combine technical skills with deep domain expertise and strong communication skills — the ability to translate messy business problems into solvable AI problems is rare and valuable.",
    questionOrder: 2,
  },

  // Lesson: future-proofing
  {
    lessonSlug: "future-proofing",
    moduleSlug: "leading-ai-powered-organization",
    question: "What does 'future-proofing' your organization against AI disruption primarily involve?",
    options: [
      "Investing in the latest AI hardware",
      "Building adaptive capacity — the ability to learn, experiment, and pivot as AI evolves",
      "Hiring more data scientists each year",
      "Waiting for AI to stabilize before making strategic decisions",
    ],
    correctIndex: 1,
    explanation:
      "Future-proofing is about building organizational adaptability — a culture of learning, experimentation, and rapid iteration — rather than betting on any specific technology.",
    questionOrder: 1,
  },
  {
    lessonSlug: "future-proofing",
    moduleSlug: "leading-ai-powered-organization",
    question: "Which leadership behavior most strongly signals an AI-ready culture?",
    options: [
      "Punishing failed AI experiments to enforce quality standards",
      "Modeling curiosity, rewarding learning, and treating failures as data",
      "Delegating all AI decisions to the CTO",
      "Requiring all staff to complete advanced AI certifications",
    ],
    correctIndex: 1,
    explanation:
      "Leaders who model curiosity and treat failures as learning opportunities create psychological safety — the foundation of the experimentation culture that AI adoption requires.",
    questionOrder: 2,
  },

  // Lesson: ai-augmented-leadership
  {
    lessonSlug: "ai-augmented-leadership",
    moduleSlug: "leading-ai-powered-organization",
    question: "What is the core idea behind 'AI-augmented leadership'?",
    options: [
      "Replacing human leaders with AI systems",
      "Using AI to enhance human judgment, freeing leaders to focus on strategy, relationships, and values",
      "Automating all routine leadership tasks",
      "Requiring leaders to supervise AI systems full-time",
    ],
    correctIndex: 1,
    explanation:
      "AI-augmented leadership means using AI to handle data processing, pattern recognition, and routine analysis — so leaders can focus on the uniquely human work: strategy, culture, ethics, and relationships.",
    questionOrder: 1,
  },
  {
    lessonSlug: "ai-augmented-leadership",
    moduleSlug: "leading-ai-powered-organization",
    question: "What remains the irreplaceable contribution of human leaders in an AI-powered organization?",
    options: [
      "Processing large volumes of data quickly",
      "Providing moral judgment, empathy, vision, and accountability",
      "Running machine learning models",
      "Writing technical documentation",
    ],
    correctIndex: 1,
    explanation:
      "Moral judgment, empathy, vision, and accountability are distinctly human capabilities that AI cannot replicate. These become more — not less — important as AI handles more analytical work.",
    questionOrder: 2,
  },
];

export const PASS_THRESHOLD = 0.7; // 70% correct to pass
