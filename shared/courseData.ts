export interface LessonData {
  slug: string;
  order: number;
  title: string;
  duration: string;
  content: string;
  reflection?: string;   // Reflection prompt for the learner
  assignment?: string;  // Real-world action assignment
}

export interface ModuleData {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  lessons: LessonData[];
}

export const COURSE_MODULES: ModuleData[] = [
  {
    slug: "demystifying-ai",
    order: 1,
    title: "Demystifying AI",
    subtitle: "Understanding the Technology Behind the Hype",
    description:
      "Establish a clear, non-technical understanding of what AI is, how it works, and its current capabilities and limitations — so you can lead with clarity and confidence.",
    icon: "Cpu",
    color: "from-blue-600 to-indigo-700",
    lessons: [
      {
        slug: "what-is-ai",
        order: 1,
        title: "What Is Artificial Intelligence?",
        duration: "12 min",
        content: `## What Is Artificial Intelligence?

Artificial Intelligence (AI) refers to the simulation of human intelligence processes by computer systems. These processes include learning (acquiring information and rules for using it), reasoning (using rules to reach approximate or definite conclusions), and self-correction. The term was coined in 1956 by John McCarthy, but the field has experienced exponential growth in the past decade.

### The Three Pillars of Modern AI

**Machine Learning (ML)** is the most prevalent form of AI in use today. Rather than being explicitly programmed with rules, ML systems learn patterns from data. When you see a product recommendation on an e-commerce site or a fraud alert from your bank, you are witnessing ML in action.

**Deep Learning** is a specialized subset of ML that uses artificial neural networks with many layers — hence "deep" — to model complex patterns. Deep learning powers image recognition, natural language processing, and the large language models (LLMs) that have captured global attention.

**Generative AI** represents the latest frontier, encompassing systems like GPT-4, Claude, and Gemini that can generate new content — text, images, code, audio — that is statistically coherent and contextually relevant. These systems are trained on vast datasets and can engage in nuanced conversation, draft documents, write code, and synthesize information.

### What AI Is Not

AI is not magic, nor is it a single technology. It is a collection of statistical and computational techniques. It does not "understand" in the human sense; it recognizes patterns. It does not have goals, desires, or consciousness. These distinctions matter enormously when evaluating vendor claims and setting organizational expectations.

### Key Takeaway for Leaders

Your role is not to become a data scientist. Your role is to ask the right questions: What data was this model trained on? What problem is it actually solving? How do we measure success? How do we know when it fails? These questions will serve you far better than any technical deep-dive.`,
        reflection: `Think about a tool or service you use every day — your email inbox, a navigation app, or a social media feed. Where do you see AI at work in it? What decisions is it making on your behalf, and are you comfortable with that?`,
        assignment: `Write down three AI-powered tools or features you already use in your business or daily life (even simple ones like spam filters or autocomplete). For each one, note what problem it solves and what data it likely relies on. Share your list with a colleague and compare notes.`,
      },
      {
        slug: "ml-vs-generative-ai",
        order: 2,
        title: "Predictive AI vs. Generative AI",
        duration: "15 min",
        content: `## Predictive AI vs. Generative AI

The distinction between predictive and generative AI is one of the most practically important for leaders to grasp, as it directly determines which business problems each type can solve.

### Predictive AI: Pattern Recognition at Scale

Predictive AI analyzes historical data to forecast future outcomes or classify inputs. It answers questions like: "Will this customer churn?", "Is this transaction fraudulent?", or "Which applicants are likely to succeed?" These systems are trained on labeled datasets and optimize for accuracy on a specific, well-defined task.

**Business applications include:**
- Credit scoring and risk assessment
- Demand forecasting and inventory optimization
- Predictive maintenance in manufacturing
- Customer churn prediction and lifetime value modeling
- Medical diagnosis support

The key characteristic of predictive AI is that it operates within a defined scope. It is highly reliable within its training distribution but can fail unpredictably when encountering data that differs significantly from what it was trained on.

### Generative AI: Creating New Content

Generative AI, by contrast, produces new content — text, images, code, audio, video — rather than making a binary prediction. Large Language Models (LLMs) like GPT-4 are trained on enormous corpora of text and learn to predict the next token in a sequence, which gives rise to their remarkable ability to generate coherent, contextually appropriate language.

**Business applications include:**
- Document drafting, summarization, and translation
- Code generation and debugging assistance
- Customer service chatbots with nuanced conversation
- Marketing copy and content creation
- Knowledge management and internal search

### The Critical Difference for Decision-Makers

Predictive AI gives you a number or a category with a confidence score. Generative AI gives you prose, and that prose can be fluent, persuasive, and entirely wrong. This phenomenon — known as "hallucination" — is perhaps the most important limitation for leaders to internalize. Generative AI outputs must be verified, especially in high-stakes contexts.`,
        reflection: `Think about a decision your business makes regularly — forecasting demand, screening applicants, responding to customer inquiries. Would predictive AI, generative AI, or a combination be most useful? What would you need to trust the output?`,
        assignment: `Pick one repetitive task in your business that involves either predicting an outcome or generating content (emails, reports, summaries). Spend 15 minutes trying a free generative AI tool (ChatGPT, Claude, or Gemini) on that task. Note what it did well and where it fell short.`,
      },
      {
        slug: "ai-hype-vs-reality",
        order: 3,
        title: "Separating AI Hype from Reality",
        duration: "18 min",
        content: `## Separating AI Hype from Reality

The AI landscape is saturated with hyperbole. Vendors promise transformative outcomes; media coverage oscillates between utopian enthusiasm and existential dread. Developing a calibrated, evidence-based perspective is one of the most valuable skills a leader can cultivate.

### The Gartner Hype Cycle Applied to AI

Gartner's Hype Cycle describes a predictable pattern: a technology trigger ignites inflated expectations, followed by a trough of disillusionment when reality falls short, before a slope of enlightenment leads to a plateau of productivity. AI has traversed this cycle multiple times — the "AI winters" of the 1970s and 1980s are historical examples of overcorrection after hype.

Today, different AI capabilities sit at different points on the curve. Large language models are arguably at or near the peak of inflated expectations for some use cases, while computer vision for quality control in manufacturing has reached the plateau of productivity.

### Common Misconceptions Leaders Encounter

**"AI will replace all knowledge workers."** The evidence suggests AI is more likely to augment knowledge work than wholesale replace it, at least in the near term. Tasks that are routine, well-defined, and data-rich are most susceptible to automation. Complex judgment, relationship management, and creative strategy remain distinctly human strengths.

**"AI is objective and unbiased."** AI systems inherit the biases present in their training data. A hiring algorithm trained on historical hiring data will encode historical biases. Objectivity must be designed and audited, not assumed.

**"The best AI wins."** In practice, the organizations that extract the most value from AI are those with the best data infrastructure, change management capabilities, and domain expertise — not necessarily those with the most sophisticated models.

### A Framework for Evaluating AI Claims

When a vendor or internal team presents an AI solution, ask: What is the baseline you are comparing against? What data was used to train and evaluate the model? What does failure look like, and how often does it occur? What is the total cost of ownership, including data preparation, integration, and ongoing maintenance? These questions cut through the noise and ground the conversation in business reality.`,
        reflection: `Where have you personally experienced AI hype — in a vendor pitch, a news headline, or a conversation with a colleague? Looking back, what questions would have helped you evaluate the claim more critically?`,
        assignment: `Find one recent AI-related news article or vendor claim relevant to your industry. Apply the four-question framework from this lesson: What is the baseline? What data was used? What does failure look like? What is the total cost? Write a one-paragraph assessment.`,
      },
      {
        slug: "evaluating-ai-vendors",
        order: 4,
        title: "Evaluating AI Vendors Without Technical Jargon",
        duration: "14 min",
        content: `## Evaluating AI Vendors Without Technical Jargon

Leaders are frequently in the position of evaluating AI vendors without deep technical expertise. This lesson provides a practical framework for making those evaluations with confidence.

### The Five Questions That Matter Most

**1. What problem does this actually solve?** Insist on a precise problem statement. Vague claims about "transforming your business with AI" are a red flag. A credible vendor should be able to articulate the specific workflow being improved, the metric being optimized, and the baseline being beaten.

**2. What data does it require, and do we have it?** AI systems are only as good as the data they are trained on. Understand what data the system needs, whether you currently collect it, whether it is clean and labeled, and who owns it. Data readiness is frequently the primary bottleneck in AI deployments.

**3. How was it validated, and on whose data?** Ask for evidence of performance — not on the vendor's benchmark dataset, but on data similar to yours. Request a pilot or proof-of-concept with your own data before committing to a full deployment.

**4. What does the integration look like?** AI does not exist in isolation. Understand how the system connects to your existing data infrastructure, workflows, and applications. Integration complexity is consistently underestimated and is a major driver of cost overruns.

**5. What is the ongoing relationship?** AI systems degrade over time as the world changes and the distribution of input data shifts — a phenomenon called "model drift." Understand what monitoring, retraining, and support the vendor provides.

### Red Flags to Watch For

Be cautious of vendors who cannot explain their model's limitations, who claim their system requires no data from you, who cannot provide references from comparable organizations, or who resist a structured pilot. Transparency and a willingness to be evaluated are hallmarks of a trustworthy AI partner.`,
        reflection: `Think about a technology purchase your business has made in the past. In hindsight, which of the five questions from this lesson would have changed your decision or negotiation? What would you do differently?`,
        assignment: `Identify one AI tool or service you are currently considering or already using. Run it through all five questions from this lesson. If you cannot answer one of them, make a plan to get that answer — either by asking the vendor directly or researching online.`,
      },
    ],
  },
  {
    slug: "strategic-ai-integration",
    order: 2,
    title: "Strategic AI Integration",
    subtitle: "Aligning AI with Business Objectives",
    description:
      "Learn how to identify high-impact AI use cases, build a coherent AI roadmap, and transition from isolated experiments to scalable, enterprise-wide deployment.",
    icon: "Target",
    color: "from-violet-600 to-purple-700",
    lessons: [
      {
        slug: "ai-readiness-framework",
        order: 1,
        title: "Assessing Your Organization's AI Readiness",
        duration: "16 min",
        content: `## Assessing Your Organization's AI Readiness

Before investing in AI capabilities, leaders must honestly assess where their organization stands. AI readiness is not a binary state — it is a spectrum across multiple dimensions, and understanding your current position determines which investments will yield the highest returns.

### The Four Dimensions of AI Readiness

**Data Maturity** is the most foundational dimension. Organizations with fragmented, siloed, or poorly governed data will struggle to realize AI's potential regardless of the sophistication of the models they deploy. Assess: Do you have centralized data infrastructure? Are your key datasets clean, labeled, and accessible? Do you have a data governance framework?

**Technical Infrastructure** encompasses the computing resources, software platforms, and engineering talent required to build, deploy, and maintain AI systems. Cloud platforms have dramatically lowered the barrier to entry, but integration with legacy systems remains a significant challenge for many enterprises.

**Talent and Culture** may be the most underestimated dimension. AI transformation requires not just data scientists and ML engineers, but also business leaders who can identify valuable use cases, product managers who can translate between technical and business requirements, and a culture that embraces experimentation and tolerates failure.

**Process and Governance** refers to the organizational structures, policies, and workflows that enable responsible AI deployment. This includes model risk management, ethical review processes, and clear accountability for AI-driven decisions.

### The AI Readiness Assessment

Rate your organization on each dimension from 1 (nascent) to 5 (advanced). Organizations scoring 1–2 across dimensions should focus on foundational data infrastructure before pursuing sophisticated AI applications. Those scoring 3–4 are ready for targeted, high-value use cases. Those scoring 5 across dimensions are positioned for enterprise-wide AI transformation.`,
        reflection: `Honestly rate your business on each of the four dimensions — Data Maturity, Technical Infrastructure, Talent and Culture, Process and Governance. Where is your biggest gap? What is one concrete thing you could do in the next 30 days to improve your lowest-scoring dimension?`,
        assignment: `Complete the AI Readiness Assessment for your business: score each of the four dimensions from 1 to 5 and write two to three sentences explaining each score. Identify your top priority dimension and list two specific actions to improve it this quarter.`,
      },
      {
        slug: "identifying-use-cases",
        order: 2,
        title: "Identifying High-Value AI Use Cases",
        duration: "20 min",
        content: `## Identifying High-Value AI Use Cases

The most common failure mode in enterprise AI is not technical — it is strategic. Organizations invest in AI capabilities without a clear connection to business value, resulting in impressive demonstrations that never reach production or generate meaningful returns.

### The Value-Feasibility Matrix

The most practical framework for prioritizing AI use cases is a two-by-two matrix plotting business value against technical feasibility. High-value, high-feasibility opportunities — the upper-right quadrant — are your immediate priorities. High-value, low-feasibility opportunities require capability building before they can be pursued. Low-value opportunities, regardless of feasibility, should generally be deprioritized.

### Two Categories of AI Value

**Efficiency gains** come from automating or accelerating existing processes. Examples include automating invoice processing, accelerating contract review, or reducing the time required for customer service interactions. These use cases are typically easier to justify with ROI calculations and have a clearer path to implementation.

**New revenue streams** come from AI-enabled products, services, or business models that were not previously possible. Examples include personalized product recommendations that increase conversion, predictive maintenance services sold to customers, or AI-powered analytics platforms. These use cases carry higher risk but also higher potential reward.

### A Structured Discovery Process

The most effective approach to use case identification combines top-down strategic alignment with bottom-up operational insight. Engage senior leadership to identify the organization's most pressing strategic challenges. Then engage frontline managers and individual contributors to identify the most painful, time-consuming, or error-prone processes in their daily work. The intersection of strategic importance and operational pain is where the highest-value AI opportunities typically reside.`,
        reflection: `Think about the three most time-consuming or error-prone processes in your business right now. Which quadrant of the Value-Feasibility Matrix does each fall into? Are you spending your energy in the right places?`,
        assignment: `Create a simple Value-Feasibility Matrix for your business. List at least five potential AI use cases, place each in a quadrant, and identify your top two immediate priorities. For each priority, write one sentence describing the specific outcome you would measure to know it is working.`,
      },
      {
        slug: "building-ai-roadmap",
        order: 3,
        title: "Building Your AI Roadmap",
        duration: "18 min",
        content: `## Building Your AI Roadmap

An AI roadmap is a strategic plan that sequences AI investments over time, balancing short-term wins with long-term capability building. A well-constructed roadmap aligns stakeholders, allocates resources effectively, and provides a framework for measuring progress.

### The Three Horizons of AI Investment

**Horizon 1 (0–12 months): Quick Wins and Foundation Building.** Focus on high-feasibility, moderate-value use cases that can demonstrate ROI quickly and build organizational confidence in AI. Simultaneously, invest in the foundational data infrastructure that will enable more ambitious applications in later horizons.

**Horizon 2 (12–36 months): Scaling and Differentiation.** Having demonstrated value and built foundational capabilities, expand AI deployment across the enterprise. Focus on use cases that create competitive differentiation — capabilities that are difficult for competitors to replicate because they depend on your unique data assets or organizational knowledge.

**Horizon 3 (36+ months): Transformation.** The most ambitious horizon involves reimagining core business processes and potentially entire business models around AI capabilities. This horizon requires the greatest investment and carries the greatest uncertainty, but also the greatest potential for transformative value creation.

### Key Elements of a Robust AI Roadmap

A credible AI roadmap includes: a clear articulation of the strategic objectives AI is intended to serve; a prioritized portfolio of use cases with defined success metrics; a capability-building plan addressing data, talent, and infrastructure; a governance framework for responsible AI deployment; and a change management plan for driving adoption. The roadmap should be treated as a living document, reviewed and updated quarterly as the technology landscape evolves and organizational learning accumulates.`,
        reflection: `If you were to build a 12-month AI roadmap for your business today, what would your Horizon 1 quick win be? What foundational investment would you need to make alongside it to enable bigger opportunities in Year 2?`,
        assignment: `Draft a one-page AI roadmap for your business covering the next 12 months. Include: one Horizon 1 quick win with a success metric, one foundational capability you will build, and one Horizon 2 opportunity you are preparing for. Share it with a trusted colleague or advisor for feedback.`,
      },
    ],
  },
  {
    slug: "data-strategy-governance",
    order: 3,
    title: "Data Strategy & Governance",
    subtitle: "Building the Foundation for AI Success",
    description:
      "Understand why data quality is the decisive factor in AI outcomes, establish robust governance frameworks, and build a data-driven culture that enables sustainable AI advantage.",
    icon: "Database",
    color: "from-emerald-600 to-teal-700",
    lessons: [
      {
        slug: "data-quality-matters",
        order: 1,
        title: "Why Data Quality Is Your Most Critical Asset",
        duration: "15 min",
        content: `## Why Data Quality Is Your Most Critical Asset

The most sophisticated AI model in the world cannot compensate for poor data quality. This principle — often expressed as "garbage in, garbage out" — is the single most important concept for leaders to internalize about AI. Organizations that invest heavily in AI models while neglecting data quality are building on sand.

### The Five Dimensions of Data Quality

**Accuracy** refers to whether data values correctly represent the real-world entities they describe. Inaccurate data — whether due to data entry errors, sensor malfunctions, or outdated records — directly degrades model performance.

**Completeness** refers to whether all required data is present. Missing values are ubiquitous in real-world datasets and require careful handling. The pattern of missingness itself can be informative — data that is not missing at random can introduce systematic bias.

**Consistency** refers to whether data is uniform across different systems and time periods. When the same customer appears with different names, addresses, or identifiers across multiple systems, downstream analysis becomes unreliable.

**Timeliness** refers to whether data is current enough to be relevant. In rapidly changing environments — financial markets, social media, supply chains — stale data can be worse than no data.

**Relevance** refers to whether the data collected actually captures the phenomena that drive the outcomes you care about. This is a strategic question as much as a technical one: are you measuring the right things?

### The Business Case for Data Quality Investment

Poor data quality costs organizations an estimated 15–25% of revenue annually, according to research by Gartner. The costs manifest as poor decisions made on inaccurate information, operational inefficiencies from data reconciliation, regulatory penalties for non-compliant reporting, and failed AI initiatives. Conversely, organizations with mature data quality practices consistently outperform their peers in AI adoption and business outcomes.`,
        reflection: `Think about one key dataset your business relies on — customer records, sales data, inventory. Rate it honestly on the five dimensions: Accuracy, Completeness, Consistency, Timeliness, and Relevance. Which dimension is your weakest link?`,
        assignment: `Pick one dataset your business uses regularly. Spend 30 minutes auditing a sample of 20–50 records against the five quality dimensions. Document what you find and identify the single most impactful improvement you could make to that dataset this month.`,
      },
      {
        slug: "data-privacy-compliance",
        order: 2,
        title: "Data Privacy, Security, and Compliance",
        duration: "20 min",
        content: `## Data Privacy, Security, and Compliance

As AI systems consume ever-larger volumes of data, the legal, ethical, and reputational risks associated with data privacy and security have grown commensurately. Leaders must understand the regulatory landscape and build compliance into their data strategy from the outset.

### The Regulatory Landscape

**GDPR (General Data Protection Regulation)** applies to any organization processing the personal data of EU residents, regardless of where the organization is located. It establishes rights for data subjects — including the right to access, correct, and delete their data — and imposes significant obligations on data controllers and processors. Violations can result in fines of up to 4% of global annual revenue.

**CCPA (California Consumer Privacy Act)** and its successor, the CPRA, establish similar rights for California residents. As the most populous U.S. state and home to many of the world's largest technology companies, California's privacy law has effectively set a de facto national standard.

**Sector-specific regulations** — including HIPAA for healthcare, GLBA for financial services, and FERPA for education — impose additional requirements on organizations in regulated industries.

### Privacy by Design

The most effective approach to data privacy is not compliance-as-afterthought but privacy by design — embedding privacy protections into data systems and processes from the outset. This includes data minimization (collecting only the data you need), purpose limitation (using data only for the purposes for which it was collected), and storage limitation (retaining data only as long as necessary).

### AI-Specific Privacy Risks

AI introduces privacy risks that go beyond traditional data management. Model inversion attacks can extract training data from deployed models. Membership inference attacks can determine whether a specific individual's data was used to train a model. Differential privacy techniques can provide mathematical guarantees against these attacks, but they involve tradeoffs with model accuracy that leaders must understand.`,
        reflection: `What personal or customer data does your business collect and store? If a customer asked you today exactly what data you hold about them and how it is used, could you answer confidently? What gaps would that question reveal?`,
        assignment: `Conduct a simple data inventory for your business: list every category of personal data you collect (customer names, emails, payment info, etc.), where it is stored, who has access, and how long you keep it. Identify one privacy risk and one concrete step to address it.`,
      },
      {
        slug: "data-governance-framework",
        order: 3,
        title: "Building a Data Governance Framework",
        duration: "17 min",
        content: `## Building a Data Governance Framework

Data governance is the system of decision rights and accountabilities for information-related processes, executed according to agreed-upon models that describe who can take what actions with what information, and when, under what circumstances, and using what methods. Effective data governance is the organizational infrastructure that makes sustainable AI possible.

### Core Components of Data Governance

**Data ownership and stewardship.** Every critical data asset should have a clearly identified owner — typically a senior business leader — who is accountable for its quality, security, and appropriate use. Data stewards are operational roles responsible for implementing the policies set by data owners.

**Data catalog and lineage.** A data catalog is a comprehensive inventory of an organization's data assets, including their definitions, locations, owners, and quality metrics. Data lineage tracks how data flows through systems and transformations, enabling organizations to understand the provenance of any given dataset and assess the reliability of downstream analyses.

**Data quality management.** A formal data quality management program includes defined quality standards, automated quality monitoring, clear processes for identifying and remediating quality issues, and metrics for tracking quality over time.

**Access control and security.** Data governance must define who has access to what data, under what circumstances, and with what controls. Role-based access control, data masking, and encryption are standard tools. The principle of least privilege — granting users the minimum access required to perform their functions — is a foundational security principle.

### Breaking Down Data Silos

Data silos — isolated repositories of data controlled by individual business units and inaccessible to the rest of the organization — are one of the most persistent obstacles to AI value creation. Addressing silos requires both technical solutions (data integration platforms, data lakes, data meshes) and organizational solutions (incentive structures that reward data sharing, cross-functional data governance bodies, and executive sponsorship).`,
        reflection: `Does your business have a data owner for each critical dataset? If not, what would it take to assign one? Think about who in your organization would be the right person to own your customer data, your financial data, and your operational data.`,
        assignment: `Create a one-page data governance starter plan for your business: identify your three most critical data assets, assign a provisional owner to each, define one quality standard for each, and describe who currently has access and whether that access is appropriate.`,
      },
    ],
  },
  {
    slug: "ethical-ai",
    order: 4,
    title: "Ethical AI",
    subtitle: "Navigating Responsibility and Societal Impact",
    description:
      "Navigate the ethical dilemmas of AI deployment, understand algorithmic bias, establish accountability frameworks, and lead with integrity in the age of intelligent systems.",
    icon: "Scale",
    color: "from-amber-600 to-orange-700",
    lessons: [
      {
        slug: "algorithmic-bias",
        order: 1,
        title: "Understanding and Mitigating Algorithmic Bias",
        duration: "19 min",
        content: `## Understanding and Mitigating Algorithmic Bias

Algorithmic bias occurs when an AI system produces systematically unfair outcomes for certain groups of people. It is one of the most consequential challenges in applied AI, with real-world impacts on hiring, lending, healthcare, criminal justice, and beyond. Understanding its sources and mitigation strategies is a leadership imperative.

### Sources of Algorithmic Bias

**Historical bias** arises when training data reflects historical patterns of discrimination. A hiring algorithm trained on historical hiring decisions will learn to replicate those decisions — including any discriminatory patterns they embody. The algorithm is not creating new bias; it is systematizing existing bias at scale.

**Representation bias** occurs when training data underrepresents certain groups, causing the model to perform poorly for those groups. Facial recognition systems trained predominantly on lighter-skinned faces have been shown to have significantly higher error rates for darker-skinned faces — a finding with profound implications for any application of facial recognition in law enforcement or security.

**Measurement bias** arises when the proxies used to measure a concept introduce systematic distortions. Using zip code as a proxy for creditworthiness, for example, can encode racial bias because residential segregation means zip codes are correlated with race.

**Feedback loops** occur when biased model outputs influence future training data, amplifying bias over time. A predictive policing algorithm that directs more police to certain neighborhoods will generate more arrests in those neighborhoods, which then reinforces the algorithm's prediction — regardless of the underlying crime rate.

### Mitigation Strategies

Effective bias mitigation requires action at multiple stages of the AI development lifecycle: diverse and representative training data; fairness metrics defined and measured before deployment; regular audits of deployed systems; diverse teams involved in development and review; and clear processes for identifying and addressing bias when it is discovered. No technical fix eliminates the need for ongoing human oversight.`,
        reflection: `Think about an AI-powered tool your business uses or is considering — a hiring tool, a customer scoring system, a recommendation engine. What groups of people could be disadvantaged by that system? How would you know if it was producing biased outcomes?`,
        assignment: `Research one real-world case of algorithmic bias (search "algorithmic bias examples" for documented cases in hiring, lending, or healthcare). Write a one-page analysis: What went wrong? Who was harmed? What should the organization have done differently? What lesson applies directly to your business?`,
      },
      {
        slug: "transparency-accountability",
        order: 2,
        title: "Transparency, Explainability, and Accountability",
        duration: "16 min",
        content: `## Transparency, Explainability, and Accountability

As AI systems make or influence increasingly consequential decisions — loan approvals, medical diagnoses, parole recommendations — the question of how those decisions are made becomes a matter of justice, not just technical interest. Transparency and explainability are not merely desirable features; in many contexts, they are legal requirements and ethical obligations.

### Defining the Terms

**Transparency** refers to openness about how an AI system works at a high level: what data it uses, what it is optimizing for, and what its known limitations are. Transparency is primarily an organizational and communication challenge.

**Explainability** refers to the ability to provide a meaningful account of why a specific decision was made. "The loan application was denied because the applicant's debt-to-income ratio exceeded our threshold" is an explanation. "The model assigned a score of 0.23" is not. Explainability is both a technical challenge — many high-performing models are inherently opaque — and a communication challenge.

**Accountability** refers to the assignment of responsibility for AI-driven decisions and their consequences. When an AI system causes harm, who is responsible? The organization that deployed it? The vendor that built it? The data scientists who trained it? Clear accountability structures are essential for both ethical governance and legal compliance.

### The Explainability-Performance Tradeoff

There is often a tradeoff between model explainability and predictive performance. Simple, interpretable models — linear regression, decision trees — are easy to explain but may sacrifice accuracy. Complex models — deep neural networks, gradient boosting ensembles — often achieve higher accuracy but are difficult to explain. Leaders must make conscious decisions about where on this tradeoff curve to operate, based on the stakes of the decisions being made and the regulatory requirements that apply.`,
        reflection: `If an AI system made a decision that negatively affected one of your customers or employees, could you explain why it made that decision? Who in your organization would be accountable for that outcome? Is that clear today?`,
        assignment: `Write a one-page Accountability Statement for one AI tool your business uses or plans to use. Define: what the system does, what data it uses, who is responsible if it causes harm, how affected parties can raise concerns, and how you will monitor it over time.`,
      },
      {
        slug: "ai-workforce-impact",
        order: 3,
        title: "AI and the Workforce: Displacement vs. Augmentation",
        duration: "21 min",
        content: `## AI and the Workforce: Displacement vs. Augmentation

Few topics generate more anxiety about AI than its impact on employment. Leaders have a responsibility to engage with this question honestly — neither dismissing legitimate concerns nor succumbing to fatalism. The evidence suggests a nuanced picture: AI will displace some jobs, transform many more, and create new categories of work that we cannot yet fully anticipate.

### The Historical Context

Technological revolutions have always disrupted labor markets. The Industrial Revolution displaced agricultural and artisanal workers while creating factory jobs and eventually the modern service economy. The computerization of the 20th century eliminated many clerical and manufacturing roles while creating software engineering, data analysis, and digital marketing. In each case, the transition was painful for affected workers, but aggregate employment eventually recovered and living standards improved.

### What the Research Shows

The most rigorous economic research suggests that AI and automation are most likely to displace tasks rather than jobs. Most jobs consist of a bundle of tasks, some of which are more susceptible to automation than others. A radiologist's job, for example, includes image interpretation (highly susceptible to AI assistance), patient communication (less susceptible), and complex diagnostic reasoning in ambiguous cases (least susceptible). AI is likely to transform the radiologist's role rather than eliminate it.

The jobs most at risk are those that are routine, well-defined, and involve processing structured information — regardless of whether they are "blue collar" or "white collar." The jobs most resilient to automation involve complex social interaction, creative judgment, and physical dexterity in unstructured environments.

### The Leader's Responsibility

Leaders have both an ethical and a business interest in managing AI-driven workforce transitions responsibly. Ethically, workers deserve transparency about how AI will affect their roles and support in developing new skills. From a business perspective, organizations that manage transitions poorly — through abrupt layoffs, inadequate retraining, or a culture of fear — will struggle to attract talent and may face significant reputational damage. A proactive approach to workforce transformation, characterized by transparency, investment in reskilling, and genuine partnership with employees, is both the right thing to do and the strategically sound approach.`,
        reflection: `Think about the roles in your business that involve the most routine, well-defined, information-processing tasks. How might AI change those roles over the next three years? What would you want to communicate to the people in those roles today?`,
        assignment: `Have an honest conversation with one employee whose role may be affected by AI. Ask them: What parts of your job do you think AI could help with? What concerns do you have? What skills would you want to develop? Document what you learn and identify one concrete action you will take as a result.`,
      },
      {
        slug: "ai-ethics-committee",
        order: 4,
        title: "Establishing an AI Ethics Framework",
        duration: "14 min",
        content: `## Establishing an AI Ethics Framework

Responsible AI deployment requires more than good intentions — it requires institutional structures, processes, and governance mechanisms that embed ethical considerations into the AI development lifecycle. This lesson provides a practical guide to building those structures.

### The AI Ethics Committee

An AI ethics committee — sometimes called an AI review board or responsible AI council — is a cross-functional body responsible for reviewing high-risk AI applications before deployment, establishing ethical guidelines and standards, monitoring deployed systems for ethical issues, and advising leadership on emerging ethical challenges.

Effective committees include diverse perspectives: technical experts who understand model behavior, legal and compliance professionals who understand regulatory requirements, business leaders who understand operational context, and ideally external voices — ethicists, community representatives, or independent experts — who can provide perspectives not available internally.

### Key Principles for an Ethical AI Framework

**Fairness:** AI systems should not discriminate against individuals or groups on the basis of protected characteristics. Fairness must be defined operationally and measured empirically.

**Transparency:** Organizations should be open about when and how AI is being used to make or influence decisions that affect people.

**Privacy:** AI systems should collect and use only the data necessary for their intended purpose, and should protect that data from unauthorized access or misuse.

**Safety and reliability:** AI systems should perform as intended, fail gracefully, and be subject to appropriate human oversight — especially in high-stakes contexts.

**Accountability:** Clear lines of responsibility should exist for AI-driven decisions and their consequences.

These principles are not self-implementing. They require ongoing investment in processes, tools, and organizational culture to translate from aspiration to practice.`,
        reflection: `Does your business have any formal process for reviewing the ethical implications of AI tools before deploying them? If not, what is the smallest, most practical first step you could take to create one?`,
        assignment: `Draft a one-page AI Ethics Checklist for your business. Include at least one question for each of the five principles: Fairness, Transparency, Privacy, Safety, and Accountability. Use this checklist the next time you evaluate a new AI tool or feature.`,
      },
    ],
  },
  {
    slug: "leading-ai-powered-organization",
    order: 5,
    title: "Leading the AI-Powered Organization",
    subtitle: "Change, Culture, and the Future of Leadership",
    description:
      "Develop the leadership skills to drive AI adoption, build and retain AI talent, manage organizational change, and position your organization to thrive in a continuously evolving technological landscape.",
    icon: "Rocket",
    color: "from-rose-600 to-pink-700",
    lessons: [
      {
        slug: "change-management",
        order: 1,
        title: "Change Management for AI Adoption",
        duration: "18 min",
        content: `## Change Management for AI Adoption

AI transformation is fundamentally a human challenge, not a technical one. The most sophisticated AI system will fail to deliver value if the people who are supposed to use it do not trust it, understand it, or feel that it serves their interests. Effective change management is the difference between AI initiatives that transform organizations and those that gather dust.

### Understanding Resistance to AI

Resistance to AI adoption is rational, not irrational. Workers who fear that AI will eliminate their jobs have legitimate concerns. Employees who distrust algorithmic decisions that affect them have legitimate grievances. Managers who worry about losing control over processes they are accountable for have legitimate anxieties. Effective change management begins with taking these concerns seriously rather than dismissing them.

### The ADKAR Model Applied to AI

The ADKAR model — Awareness, Desire, Knowledge, Ability, Reinforcement — provides a useful framework for managing AI-related change. Awareness means ensuring that employees understand why the organization is investing in AI and what it means for them. Desire means creating genuine motivation to engage with AI tools, which requires addressing the "what's in it for me?" question honestly. Knowledge means providing the training and education employees need to understand and use AI effectively. Ability means ensuring that employees have the practical skills and support to apply their knowledge. Reinforcement means embedding AI adoption into performance management, recognition, and organizational culture.

### Building Trust in AI Systems

Trust in AI systems is earned through transparency, reliability, and demonstrated value. Organizations that deploy AI without explaining how it works, acknowledge its limitations, or provide mechanisms for employees to flag errors will struggle to build the trust necessary for effective adoption. Conversely, organizations that invest in explainable AI, establish clear feedback mechanisms, and demonstrate responsiveness to employee concerns build the trust that enables transformative adoption.`,
        reflection: `Think about a recent change initiative in your business — a new system, process, or strategy. How did people respond? Looking back, which stage of the ADKAR model was the weakest link? How would you approach it differently with AI adoption?`,
        assignment: `Choose one AI tool you plan to introduce to your team. Write a one-page Change Communication Plan: What will you tell your team about why you are adopting it? How will you address their concerns? What training will you provide? How will you measure adoption success?`,
      },
      {
        slug: "building-ai-talent",
        order: 2,
        title: "Attracting, Retaining, and Developing AI Talent",
        duration: "17 min",
        content: `## Attracting, Retaining, and Developing AI Talent

The global demand for AI talent far exceeds supply. Data scientists, ML engineers, and AI researchers command premium compensation and have their choice of employers. Building the AI talent base your organization needs requires a multi-pronged strategy that combines external hiring, internal development, and strategic partnerships.

### The AI Talent Landscape

AI talent exists on a spectrum. At one end are research scientists with PhDs in machine learning who push the boundaries of what is technically possible. At the other end are business analysts who use AI-powered tools to enhance their work without writing a line of code. Most organizations need talent across this spectrum, and the talent strategy should reflect that diversity.

**Technical roles** include data scientists, ML engineers, data engineers, and AI product managers. These roles require specialized skills that are in high demand and short supply. Compensation must be competitive with technology companies, and the work environment must offer intellectually stimulating challenges and opportunities for professional growth.

**AI-enabled roles** encompass the much larger population of workers who use AI tools to enhance their existing functions — finance professionals using AI for forecasting, marketers using AI for personalization, HR professionals using AI for talent analytics. Developing these capabilities requires targeted training programs, not wholesale hiring.

### Building an Internal AI Academy

The most sustainable approach to AI talent development is building internal capability through a structured learning program. An AI Academy provides foundational AI literacy for all employees, technical training for those who need to work directly with AI systems, and leadership development for those who need to manage AI initiatives. The curriculum should be tailored to different roles and learning styles, and should be continuously updated as the technology evolves.`,
        reflection: `Where does your business currently sit on the AI talent spectrum? Do you have the technical roles you need, or are you primarily developing AI-enabled roles? What is the single biggest talent gap that is slowing your AI progress?`,
        assignment: `Conduct a quick AI Skills Audit of your team: for each person, identify their current AI skill level (none, basic user, power user, technical). Identify the two or three people who could become internal AI champions with targeted development. Write a one-paragraph development plan for each.`,
      },
      {
        slug: "future-proofing",
        order: 3,
        title: "Future-Proofing Your Organization",
        duration: "20 min",
        content: `## Future-Proofing Your Organization

The AI landscape is evolving faster than any previous technological transition in history. Capabilities that seemed like science fiction two years ago are now commercially available. Strategies that seem optimal today may be obsolete in three years. Future-proofing your organization requires building the adaptive capacity to navigate continuous change, not just optimizing for today's AI landscape.

### The Principles of Organizational Adaptability

**Invest in learning infrastructure.** Organizations that learn faster than their competitors have a durable advantage. This means investing in systems for capturing and sharing organizational knowledge, creating psychological safety for experimentation and failure, and building feedback loops that enable rapid iteration.

**Maintain strategic optionality.** In a rapidly evolving landscape, the ability to pivot is as valuable as the ability to execute. Avoid over-committing to specific AI vendors, platforms, or architectures that may become obsolete. Build modular, interoperable systems where possible.

**Cultivate external intelligence.** The AI landscape is shaped by research institutions, technology companies, regulatory bodies, and industry consortia. Organizations that maintain active connections to these external sources of intelligence — through partnerships, advisory boards, conference participation, and research collaboration — will have earlier warning of significant shifts.

**Build resilience alongside efficiency.** AI-driven automation creates efficiency but can also create brittleness — systems that work well under normal conditions but fail catastrophically under unexpected ones. Resilient organizations maintain human expertise and judgment in critical processes, even as they automate routine tasks.

### The Leader's Personal Journey

Future-proofing your organization begins with future-proofing yourself as a leader. Commit to continuous learning about AI — not to become a technical expert, but to maintain the informed perspective that effective leadership requires. Engage with AI tools personally. Build relationships with technical experts who can help you navigate the landscape. Cultivate intellectual humility — the willingness to update your beliefs as evidence accumulates. The leaders who will thrive in the AI era are not those who know the most about AI today, but those who are most committed to learning about it tomorrow.`,
        reflection: `Which of the four principles of organizational adaptability — learning infrastructure, strategic optionality, external intelligence, resilience — is your business strongest at? Which is your biggest blind spot? What would it take to address it?`,
        assignment: `Create a personal Future-Proofing Action Plan: identify one AI trend you will track over the next six months, one external connection (conference, community, advisor) you will cultivate, and one internal experiment you will run to build organizational learning. Set a calendar reminder to review your progress in 90 days.`,
      },
      {
        slug: "ai-augmented-leadership",
        order: 4,
        title: "From Traditional to AI-Augmented Leadership",
        duration: "16 min",
        content: `## From Traditional to AI-Augmented Leadership

The final lesson of this course addresses the most personal dimension of AI leadership: how AI changes the nature of leadership itself. The leaders who will be most effective in the AI era are not those who resist this change, but those who embrace it thoughtfully — using AI to amplify their distinctly human capabilities while remaining clear-eyed about its limitations.

### What AI Changes About Leadership

**Decision-making** is perhaps the most significant area of change. AI can process vastly more information than any human, identify patterns that are invisible to unaided perception, and model the consequences of decisions with unprecedented sophistication. Leaders who leverage these capabilities will make better decisions than those who rely solely on intuition and experience. But AI cannot replace the judgment required to define what "better" means in a given context — that remains a human responsibility.

**Communication and influence** are areas where AI offers powerful augmentation. AI can help leaders craft clearer communications, identify the most effective messages for different audiences, and analyze the impact of past communications. But the authenticity, empathy, and relational intelligence that make communication truly effective remain distinctly human.

**Strategic vision** — the ability to imagine a compelling future and inspire others to work toward it — is perhaps the most distinctly human leadership capability. AI can inform strategy with data and analysis, but the creative leap from analysis to vision, and the emotional intelligence required to inspire commitment to that vision, are beyond the reach of current AI systems.

### The Enduring Value of Human Leadership

As AI takes on more of the analytical and operational work of organizations, the distinctly human dimensions of leadership become more valuable, not less. Empathy, ethical judgment, creative vision, and the ability to build trust and inspire commitment are capabilities that AI cannot replicate. The leaders who will thrive in the AI era are those who invest in developing these human capabilities while learning to leverage AI as a powerful tool for amplifying their impact.

This course has equipped you with the knowledge to lead confidently in the age of AI. The journey continues — the technology will evolve, new challenges will emerge, and new opportunities will arise. Approach that journey with curiosity, humility, and the conviction that thoughtful human leadership remains the most essential ingredient in any successful AI transformation.`,
        reflection: `Looking back across all five modules, which concept or framework has changed how you think about your business most? What is the single most important action you will take in the next 30 days as a result of this course?`,
        assignment: `Write a one-page Personal AI Leadership Manifesto: What do you believe about AI and its role in your business? What commitments are you making to your team, your customers, and yourself about how you will lead in the AI era? Share it with at least one trusted colleague or advisor.`,
      },
    ],
  },
  {
    slug: "ai-in-action",
    order: 6,
    title: "AI in Action",
    subtitle: "Real-World Applications for Your Business",
    description:
      "Apply AI directly to the areas that drive your business — data analysis, daily productivity, marketing, and customer engagement — with practical tools, real examples, and hands-on activities you can implement immediately.",
    icon: "Zap",
    color: "from-emerald-600 to-teal-700",
    lessons: [
      {
        slug: "ai-for-data-analysis",
        order: 1,
        title: "AI for Data Analysis and Business Insights",
        duration: "22 min",
        content: `## AI for Data Analysis and Business Insights

For small and mid-sized businesses, data has historically been an underused asset. Spreadsheets pile up, reports get generated but not acted on, and the insights that could drive better decisions stay buried. AI-powered data analysis tools are changing this — making it possible for any business owner to surface patterns, spot anomalies, and make data-informed decisions without a data science team.

### What AI Can Do With Your Business Data

Modern AI tools can analyze sales trends and forecast demand, identify your most profitable customers and products, flag unusual patterns that may indicate fraud or operational problems, generate plain-language summaries of complex datasets, and answer natural-language questions about your data without requiring SQL or coding skills.

Tools like Microsoft Copilot in Excel, Google Gemini in Sheets, and standalone platforms like Polymer, Julius AI, and ChatGPT with data analysis capabilities have made these functions accessible to any business owner with a spreadsheet.

### Getting Started: Your First AI Data Analysis

The fastest path to value is to start with data you already have. Export your sales data from your point-of-sale system or accounting software. Upload it to a tool like ChatGPT (with the data analysis feature enabled) or Julius AI. Ask plain-language questions: Which products have the highest margin? Which customers have not purchased in the last 90 days? What day of the week generates the most revenue?

The goal is not to build a sophisticated analytics infrastructure on day one — it is to develop the habit of asking your data questions and acting on the answers.

### Turning Insights Into Decisions

Data analysis only creates value when it changes decisions. For each insight you surface, ask: What decision does this inform? What action will I take? How will I measure whether the action worked? This simple three-question framework prevents analysis from becoming an end in itself and keeps your AI investment connected to business outcomes.`,
        reflection: `What business question do you most wish you could answer with your data right now — but currently cannot? What data do you already have that might help answer it, even imperfectly?`,
        assignment: `Export one dataset from your business (sales, customer list, inventory, or financial data). Upload it to ChatGPT or a similar AI tool and ask at least three business questions. Document the insights you receive and identify one decision you will make differently as a result.`,
      },
      {
        slug: "ai-for-productivity",
        order: 2,
        title: "AI for Daily Productivity and Operations",
        duration: "20 min",
        content: `## AI for Daily Productivity and Operations

The most immediate ROI from AI for most small businesses comes not from sophisticated machine learning systems but from AI-powered productivity tools that save hours every week on routine tasks. Writing, scheduling, summarizing, researching, and communicating — the daily operational work that consumes enormous time — can all be accelerated significantly with the right tools.

### The Productivity AI Stack for Small Business

**Writing and communication:** Tools like ChatGPT, Claude, and Microsoft Copilot can draft emails, proposals, reports, and social media content in a fraction of the time it takes to write from scratch. The key is learning to prompt effectively — providing context, tone, audience, and purpose — and then editing the output rather than accepting it verbatim.

**Meeting productivity:** Tools like Otter.ai, Fireflies, and Microsoft Teams Copilot can transcribe meetings, generate summaries, and extract action items automatically. A 60-minute meeting that previously required 30 minutes of follow-up note-taking can be summarized in seconds.

**Research and information synthesis:** AI tools can summarize long documents, compare options, and synthesize information from multiple sources in minutes. Tasks that previously required hours of reading and note-taking can be compressed dramatically.

**Scheduling and workflow automation:** Tools like Zapier with AI capabilities, Make (formerly Integromat), and native AI features in tools like HubSpot and Salesforce can automate repetitive workflows — routing leads, sending follow-up emails, updating records — without coding.

### Tool Selection: What Matters for Small Business

The SME feedback from this course's development was clear: tool selection matters more than prompting technique. When evaluating any AI productivity tool, ask: Does it integrate with the tools I already use? What data does it access, and is that appropriate? Is there a free tier or low-cost entry point to test value before committing? What happens to my data — is it used to train the model? For most small businesses, the right answer is a small number of well-chosen tools used consistently, not a proliferation of specialized tools that create their own management overhead.`,
        reflection: `What is the single most time-consuming routine task in your business week? How many hours does it consume? What would you do with that time if AI could handle half of it?`,
        assignment: `Identify your top three most time-consuming routine tasks. For each one, research one AI tool that could help (use ChatGPT to help you search: “What AI tools can help with [task] for a small business?”). Pick one tool, try it for one week, and track the time you save. Report back to your cohort.`,
      },
      {
        slug: "ai-for-marketing",
        order: 3,
        title: "AI for Marketing and Customer Engagement",
        duration: "21 min",
        content: `## AI for Marketing and Customer Engagement

Marketing is one of the highest-leverage areas for AI in small business. Creating content, reaching the right audience, personalizing communications, and measuring what works — all of these have historically required either significant budget or significant time. AI is dramatically lowering both barriers.

### Content Creation at Scale

AI tools can generate blog posts, social media captions, email newsletters, ad copy, and product descriptions in minutes. Tools like Jasper, Copy.ai, and ChatGPT can produce a week's worth of social media content in an hour. The quality requires human editing and brand voice calibration, but the raw material — which is often the hardest part — is generated instantly.

For visual content, tools like Canva with AI features, Adobe Firefly, and Midjourney can generate images, graphics, and design variations without a graphic designer. Small businesses that previously could not afford consistent visual branding can now produce professional-quality assets at minimal cost.

### Personalization and Customer Segmentation

AI-powered email marketing tools like Klaviyo, Mailchimp with AI features, and ActiveCampaign can segment your customer list based on behavior, purchase history, and engagement patterns — and send different messages to different segments automatically. A customer who bought a specific product gets a follow-up about related products. A customer who has not purchased in 90 days gets a re-engagement offer. This level of personalization was previously available only to large enterprises with dedicated marketing technology teams.

### Measuring What Works

AI tools are also transforming marketing measurement. Platforms like Google Analytics 4 with AI insights, HubSpot, and Meta Ads Manager use machine learning to identify which campaigns, channels, and messages are driving results — and to optimize automatically. For small businesses, the key is to connect your marketing tools to your sales data so you can measure the full customer journey from first touch to purchase.

### The Human Element in AI Marketing

The businesses that use AI marketing most effectively are those that use it to amplify their authentic voice, not replace it. AI can generate content, but it cannot generate the genuine expertise, personality, and relationships that differentiate a small business from a faceless corporation. Use AI to handle the volume and mechanics of marketing; invest your human energy in the authenticity and relationships that AI cannot replicate.`,
        reflection: `Where does your business currently spend the most time and money on marketing? Which of the AI marketing capabilities described in this lesson would have the biggest impact on your business if you implemented it in the next 30 days?`,
        assignment: `Choose one marketing task you do regularly (writing social posts, drafting emails, creating ad copy). Use an AI tool to complete next week's version of that task. Compare the time it took and the quality of the output to your usual approach. What would you do differently next time?`,
      },
      {
        slug: "ai-implementation-plan",
        order: 4,
        title: "Building Your Personal AI Implementation Plan",
        duration: "18 min",
        content: `## Building Your Personal AI Implementation Plan

This final lesson is about action. Everything you have learned across six modules only creates value when it changes what you do. This lesson provides a structured framework for translating your learning into a concrete, prioritized implementation plan that you can begin executing immediately.

### The 90-Day AI Quick Start

The most effective implementation plans are specific, time-bound, and small enough to actually execute. A 90-day horizon is long enough to see real results but short enough to maintain urgency. Structure your plan around three phases:

**Days 1–30: Foundation.** Pick one AI productivity tool and use it every day. Conduct your AI readiness assessment. Identify your top three AI use cases. Have the data conversation — what data do you have, where is it, and how clean is it?

**Days 31–60: First Application.** Implement your highest-value, lowest-complexity use case. Measure the result. Share what you learn with your team. Identify what you would do differently.

**Days 61–90: Expand and Reflect.** Add a second use case. Review your AI roadmap in light of what you have learned. Identify the capability investment (data, talent, process) that will unlock the most value in Year 2.

### Avoiding the Most Common Implementation Mistakes

**Trying to do too much at once.** AI FOMO is real — there are always more tools to try and more use cases to pursue. The businesses that get the most value from AI are those that go deep on a small number of high-value applications rather than spreading thin across many.

**Skipping the data foundation.** AI runs on data. If your business data is disorganized, incomplete, or inaccessible, no AI tool will save you. The time you invest in data organization pays dividends across every AI application you pursue.

**Measuring the wrong things.** Track business outcomes — revenue, cost, time, customer satisfaction — not AI activity. The goal is not to use AI; it is to grow your business.

**Going it alone.** The small business owners who make the fastest progress with AI are those who learn in community — sharing what works, what does not, and what they are trying next. Use the network you have built in this course.

### Your Next Step

The most important thing you can do right now is take one concrete action in the next 24 hours. Not plan to take action — take action. Open a new AI tool. Upload a dataset. Draft one piece of content. The momentum you build in the first 24 hours is the best predictor of the progress you will make in the next 90 days.`,
        reflection: `What is the one thing you have learned in this course that you are most excited to apply? What is the one thing that is most likely to get in the way? How will you address that obstacle?`,
        assignment: `Write your complete 90-Day AI Quick Start Plan: list your chosen productivity tool for Days 1–30, your first use case for Days 31–60, and your expansion plan for Days 61–90. Include one success metric for each phase. Share your plan with your cohort and commit to a 90-day check-in.`,
      },
    ],
  },
];

export const TOTAL_LESSONS = COURSE_MODULES.reduce(
  (acc, m) => acc + m.lessons.length,
  0
);

export const STRIPE_PRICE_ID = "price_1TcTdk2sRPcPpeWO6tUs1UUD";
export const COURSE_PRICE_CENTS = 49700;
export const COURSE_PRICE_DISPLAY = "$497";
