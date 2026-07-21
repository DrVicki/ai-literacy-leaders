export interface LessonData {
  slug: string;
  order: number;
  title: string;
  duration: string;
  content: string;
  reflection?: string;   // Reflection prompt for the learner
  assignment?: string;  // Real-world action assignment
  diagram?: string;    // Mermaid diagram definition for the lesson visual
  diagramCaption?: string; // Caption for the diagram
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
  // ─────────────────────────────────────────────
  // MODULE 1: Demystifying AI
  // ─────────────────────────────────────────────
  {
    slug: "demystifying-ai",
    order: 1,
    title: "Demystifying AI",
    subtitle: "Understanding the Technology Behind the Hype",
    description:
      "Get hands-on with AI tools from day one. Understand what AI actually is, try it yourself, and learn to tell the difference between real capability and vendor hype.",
    icon: "Cpu",
    color: "from-blue-600 to-indigo-700",
    lessons: [
      {
        slug: "what-is-ai",
        order: 1,
        title: "What Is AI? Your First Hands-On Session",
        duration: "20 min",
        content: `## What Is AI? Your First Hands-On Session

AI is not magic — it is software that finds patterns in data and uses those patterns to make predictions or generate content. The fastest way to understand it is to use it. This lesson gets you into a real AI tool in the first five minutes.

---

### Step-by-Step Demo: Your First AI Conversation

**Tool needed:** ChatGPT (free at chat.openai.com) or Claude (free at claude.ai). Create a free account if you do not have one — it takes two minutes.

**Step 1 — Open the tool and start a new chat.**
You will see a text box at the bottom of the screen. This is where you type your message (called a "prompt").

**Step 2 — Type this exact prompt and press Enter:**

> *"I own a small bakery with 3 employees. I have never used AI before. In plain language, give me 3 specific ways AI could save me time this week — no technical jargon."*

**Step 3 — Read the response.**
Notice that the AI gives you a direct, practical answer. It did not ask you to define "AI" first. It used the context you gave it (small bakery, 3 employees, no prior AI experience) to tailor its answer.

**Step 4 — Follow up with this prompt:**

> *"For the first idea you gave me, walk me through exactly how I would do it today, step by step."*

**Step 5 — Observe what happened.**
The AI remembered your previous message and built on it. This is called "context" — the AI uses everything in your conversation to shape its responses.

---

### What You Just Experienced

You used a **Large Language Model (LLM)** — the most useful type of AI for small businesses right now. It works by predicting the most helpful next word based on billions of examples of human writing. It does not "think" the way you do, but it is remarkably good at producing useful, relevant text when you give it clear context.

**Three things to know about how AI works:**
- It learns from patterns in data, not from rules someone typed in
- It generates responses based on probability, not certainty — which is why it can sometimes be wrong
- The more context you give it, the better its output

---

### Try This Now: The 3-Business-Questions Exercise

Open ChatGPT or Claude and type the following, replacing the bracketed parts with your actual business details:

> *"I run a [type of business] with [number] employees. My biggest time-wasters each week are [list 2–3 things]. What are the top 3 ways AI could help me with these specific problems?"*

Write down the response. You will refer back to it throughout this course.

---

### What AI Is Not

Before moving on, three important limits to understand:

**AI does not know your business.** It only knows what you tell it in the conversation. The more specific you are, the better the output.

**AI can be confidently wrong.** This is called "hallucination." Always verify any facts, numbers, or legal/financial advice it gives you.

**AI is a tool, not a replacement for your judgment.** You are the expert on your business. AI is a fast, tireless assistant — but you make the final call.`,
        reflection: `What surprised you most about your first AI conversation? Did the output feel useful, generic, or somewhere in between? What would you change about your prompt to get a better answer?`,
        assignment: `Complete the 3-Business-Questions Exercise above using your actual business details. Save the AI's response. Then try the same question with one change — add one more specific detail about your business — and compare the two responses. Note which was more useful and why.`,
      },
      {
        slug: "ml-vs-generative-ai",
        order: 2,
        title: "Two Types of AI You'll Actually Use",
        duration: "22 min",
        content: `## Two Types of AI You'll Actually Use

There are two types of AI that matter most for small businesses right now: **Predictive AI** (which forecasts and classifies) and **Generative AI** (which creates content). You have probably already used both without realizing it.

---

### Type 1: Predictive AI — AI That Forecasts

Predictive AI looks at historical data and makes predictions. You encounter it every day:
- Your email spam filter predicts whether an email is junk
- Your bank's fraud detection predicts whether a transaction is suspicious
- Square and Shopify use it to forecast your busiest sales days

**Step-by-Step Demo: Predictive AI in Your Inbox**

**Step 1 —** Open your email inbox and look at your Spam or Junk folder.

**Step 2 —** Notice that emails are automatically sorted there without you doing anything. That is a predictive AI model running silently in the background.

**Step 3 —** Open Gmail (if you use it) and look at the tabs: Primary, Social, Promotions. Gmail's AI is predicting which category each email belongs to.

**Step 4 —** Think about this: what data did the AI use to make that prediction? (Answer: the words in the subject line, the sender's address, whether similar emails were marked as spam by millions of other users.)

---

### Type 2: Generative AI — AI That Creates

Generative AI produces new content: text, images, audio, and more. ChatGPT, Claude, Canva AI, and Google Gemini are all generative AI tools.

**Step-by-Step Demo: Generate a Real Business Email**

**Tool:** ChatGPT or Claude (free)

**Step 1 —** Open ChatGPT or Claude.

**Step 2 —** Type this prompt:

> *"Write a friendly follow-up email to a customer who purchased from my [type of business] 30 days ago but hasn't returned. The email should feel personal, not salesy, and include a soft invitation to come back. Keep it under 100 words."*

**Step 3 —** Read the output. Does it sound like something you would actually send?

**Step 4 —** Now refine it. Type:

> *"Make it sound warmer and more personal. Add a specific detail about [a product or service you offer]."*

**Step 5 —** Compare version 1 and version 2. Notice how adding specifics makes the output dramatically more useful.

---

### Side-by-Side Comparison

| | Predictive AI | Generative AI |
|---|---|---|
| **What it does** | Forecasts outcomes, classifies inputs | Creates new text, images, audio |
| **Example tools** | Spam filters, fraud detection, sales forecasting | ChatGPT, Claude, Canva AI, Gemini |
| **Output** | A number, category, or yes/no | A paragraph, image, or document |
| **Main risk** | Wrong predictions | Hallucinations (confident errors) |
| **Best for small business** | Automating routine decisions | Saving time on content and communication |

---

### Try This Now: Spot the AI Around You

Before your next lesson, spend 10 minutes listing every digital tool you use in your business. For each one, ask: "Is there AI running in the background here?" You will likely find AI in your email, your accounting software, your social media ads, and your point-of-sale system — even if it is never labeled as "AI."`,
        reflection: `Which type of AI — predictive or generative — do you think would have the bigger immediate impact on your business? What specific problem would you want it to solve first?`,
        assignment: `Use the email-writing demo from this lesson to create a real follow-up email for your business. Send it to at least one customer this week. Track whether it gets a response. Note what you changed from the AI's draft and why.`,
      },
      {
        slug: "ai-hype-vs-reality",
        order: 3,
        title: "Cutting Through the Hype: A Hands-On Reality Check",
        duration: "20 min",
        content: `## Cutting Through the Hype: A Hands-On Reality Check

Every week there is a new headline claiming AI will "transform everything." Some of it is true. A lot of it is marketing. This lesson gives you a practical framework for evaluating any AI claim — and you will use it on a real example right now.

---

### The 4-Question Reality Check

When you hear an AI claim — from a vendor, a news article, or a colleague — run it through these four questions:

1. **What specific problem does it solve?** (Vague = red flag)
2. **What does it need to work?** (Data? Integration? Training?)
3. **What does failure look like?** (How often does it get it wrong?)
4. **What is the real cost?** (Time, money, and disruption to implement)

---

### Step-by-Step Demo: Evaluate a Real AI Tool

Let's apply the 4-Question Reality Check to a real tool: **AI-powered customer chatbots** (offered by tools like Tidio, Intercom, or Drift).

**Step 1 —** Open ChatGPT or Claude and type:

> *"I'm a small business owner considering adding an AI chatbot to my website. What are the realistic benefits AND the common failure points? Be honest about both."*

**Step 2 —** Read the response. Notice that a good AI tool will give you a balanced answer — not just the positives.

**Step 3 —** Now ask a follow-up:

> *"What data or setup would I need to make an AI chatbot actually useful for a [your type of business] with [number] employees?"*

**Step 4 —** You now have a realistic picture of what it would actually take. Compare this to the marketing claims on any chatbot vendor's website.

**Step 5 —** Apply the 4-Question Reality Check:
- Problem solved? ✓ (Answers common questions 24/7)
- What it needs? ✓ (A list of FAQs, integration with your website, ongoing maintenance)
- Failure modes? ✓ (Gives wrong answers, frustrates customers, requires human backup)
- Real cost? ✓ (Setup time, monthly subscription, ongoing updates)

---

### Try This Now: Evaluate a Tool You're Considering

Think of one AI tool you have seen advertised or heard about recently. Open ChatGPT and type:

> *"I'm considering [tool name] for my small business. Give me an honest assessment: what does it do well, what are its limitations, and what would I need to make it work? I want the realistic picture, not the marketing version."*

Use the 4-Question Reality Check on the response.

---

### The Most Common AI Hype Traps for Small Businesses

**"It works right out of the box."** Most AI tools require setup, data input, and a learning period before they deliver value. Budget time for this.

**"It will replace your staff."** AI is better at augmenting your team than replacing them. The businesses that get the most value use AI to free up their people for higher-value work.

**"Our AI is 99% accurate."** Ask: accurate on what dataset? Under what conditions? 99% accuracy on a benchmark test can mean 1-in-100 errors in real use — which matters a lot if you are making 500 decisions a day.`,
        reflection: `Think about an AI tool you have been curious about or a vendor pitch you have received. Which of the four questions would be hardest to answer? What would you need to find out before making a decision?`,
        assignment: `Find one AI tool relevant to your industry (search "AI tools for [your type of business]"). Apply the 4-Question Reality Check. Write a one-paragraph verdict: Is this worth exploring further? Why or why not? Share your assessment with your cohort.`,
      },
      {
        slug: "evaluating-ai-vendors",
        order: 4,
        title: "How to Evaluate Any AI Tool in 20 Minutes",
        duration: "20 min",
        content: `## How to Evaluate Any AI Tool in 20 Minutes

You do not need a technical background to evaluate AI tools. You need the right questions and a willingness to test before you commit. This lesson gives you a repeatable 20-minute evaluation process you can use on any tool.

---

### The 20-Minute AI Tool Evaluation

**Minutes 1–5: Define the job.**
Before looking at any tool, write down in one sentence what job you are hiring it to do. Example: "I want to save 2 hours per week on writing social media captions." If you cannot write this sentence, you are not ready to evaluate tools yet.

**Minutes 6–10: Test it with your real data.**
Every credible AI tool has a free trial or free tier. Do not evaluate it on their demo data — use your own. If it is a writing tool, give it your actual product descriptions. If it is a scheduling tool, give it your actual calendar. Real-world performance on your data is the only thing that matters.

**Minutes 11–15: Find the failure modes.**
Deliberately try to break it. Give it an unusual request. Ask it something ambiguous. See what happens when it gets it wrong. A tool that fails gracefully (tells you it is uncertain) is far more trustworthy than one that confidently gives wrong answers.

**Minutes 16–20: Calculate the real ROI.**
Estimate: How many hours per week would this save? What is your hourly value? Subtract the monthly cost and the setup time. Is the math positive?

---

### Step-by-Step Demo: Evaluate a Writing AI Tool

**Tool to evaluate:** ChatGPT (free) or Jasper (free trial)

**Step 1 —** Define the job: "Write social media captions for my business."

**Step 2 —** Test with real data. Type this prompt:

> *"Write 5 Instagram captions for a [your type of business]. Our brand voice is [describe your tone: friendly/professional/fun/etc.]. Our most popular product/service is [name it]. Each caption should be under 150 characters and end with a call to action."*

**Step 3 —** Rate the output 1–5 on: relevance, tone match, and whether you would actually post it.

**Step 4 —** Find the failure mode. Type:

> *"Write a caption about [something obscure or very specific to your business that the AI would not know about]."*

Notice how it handles the gap in its knowledge.

**Step 5 —** Calculate ROI. If writing 5 captions normally takes you 30 minutes, and this tool produces a usable draft in 2 minutes (with 5 minutes of editing), you save 23 minutes. At 4 posts per week, that is 92 minutes saved per week — about 6 hours per month.

---

### Red Flags That Tell You to Walk Away

- The vendor cannot tell you what data their model was trained on
- There is no free trial or pilot option
- They claim 100% accuracy or "no errors"
- The tool requires you to upload all your customer data before you can test it
- There are no real customer reviews from businesses similar to yours

---

### Try This Now: Run the 20-Minute Evaluation

Pick one AI tool you have been curious about. Run the full 20-minute evaluation using the steps above. Write down your score (1–10) and your one-sentence verdict. Bring your evaluation to the next cohort session.`,
        reflection: `After running the 20-minute evaluation, what was the biggest gap between the tool's marketing claims and its actual performance on your real business data?`,
        assignment: `Evaluate two different AI tools that could help with the same task in your business (e.g., two different writing tools, or two different scheduling tools). Compare them using the 20-minute evaluation framework. Write a one-page comparison and choose one to use for the next 30 days.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MODULE 2: Strategic AI Integration
  // ─────────────────────────────────────────────
  {
    slug: "strategic-ai-integration",
    order: 2,
    title: "Strategic AI Integration",
    subtitle: "Finding and Prioritizing Your Best AI Opportunities",
    description:
      "Stop guessing where AI can help. Use hands-on frameworks and real AI tools to map your business processes, identify your highest-value opportunities, and build a simple 90-day action plan.",
    icon: "Target",
    color: "from-violet-600 to-purple-700",
    lessons: [
      {
        slug: "ai-readiness-framework",
        order: 1,
        title: "Is Your Business Ready for AI? A Self-Assessment",
        duration: "22 min",
        content: `## Is Your Business Ready for AI? A Self-Assessment

Before spending money on AI tools, spend 20 minutes honestly assessing where your business stands. This lesson walks you through a practical readiness assessment — and uses AI to help you interpret the results.

---

### Step-by-Step Demo: The AI Readiness Self-Assessment

**Step 1 — Score your business on these four dimensions (1 = not at all, 5 = very well):**

**Data Readiness**
- Do you have customer records in a spreadsheet or software system? (Not just in your head)
- Is your sales data organized and accessible?
- Do you know where your key business data lives?

**Tool Comfort**
- Are you comfortable using new software tools?
- Does your team adopt new tools without major resistance?
- Do you currently use any cloud-based business software (QuickBooks, Square, Mailchimp, etc.)?

**Time to Implement**
- Can you dedicate 2–3 hours per week to learning and setting up new tools?
- Do you have one person (even yourself) who could own an AI project?

**Budget**
- Can you allocate $50–$200/month to test AI tools?
- Are you willing to invest time before seeing results?

**Step 2 — Add up your scores.** Maximum is 20.

**Step 3 — Open ChatGPT or Claude and type:**

> *"I'm a small business owner. I scored myself on AI readiness: Data Readiness [your score]/5, Tool Comfort [your score]/5, Time to Implement [your score]/5, Budget [your score]/5. My total is [total]/20. Based on this, what should my first AI priority be, and what should I avoid starting with?"*

**Step 4 — Read the personalized recommendation.** Notice how the AI uses your specific scores to give targeted advice rather than generic guidance.

---

### What Your Score Means

| Score | What It Means | Where to Start |
|---|---|---|
| 16–20 | High readiness | Pick a high-value use case and move fast |
| 11–15 | Moderate readiness | Start with one low-risk tool, build confidence |
| 6–10 | Building foundations | Focus on organizing data before adding AI |
| Under 6 | Early stage | Start with free tools, no commitment yet |

---

### The Most Common Readiness Gap: Messy Data

The single biggest obstacle for small businesses is not budget or technical skill — it is disorganized data. AI tools are only as useful as the information you feed them. If your customer list is in three different places, your sales data is in a spreadsheet that only one person understands, or you do not track key metrics at all, fixing that is your first AI project.

**Try This Now: The 5-Minute Data Inventory**

Open a blank document and list:
1. Where is your customer data? (CRM, spreadsheet, email, paper?)
2. Where is your sales data? (POS system, QuickBooks, spreadsheet?)
3. Where is your inventory or service data?
4. Which of these is most organized and accessible?

The most organized dataset is where you should start with AI.`,
        reflection: `What was your readiness score? Which dimension was your weakest? What is the one thing you could do this week to improve your lowest score?`,
        assignment: `Complete the full AI Readiness Self-Assessment and use ChatGPT to generate your personalized recommendation. Then identify your most organized dataset and write one sentence describing what AI question you would most like to answer with it.`,
      },
      {
        slug: "identifying-use-cases",
        order: 2,
        title: "Finding Your Best AI Opportunities",
        duration: "24 min",
        content: `## Finding Your Best AI Opportunities

The best AI use cases for your business are hiding in plain sight — they are the tasks you do repeatedly, the decisions you make on incomplete information, and the communications you write from scratch every week. This lesson shows you how to find them systematically.

---

### The Time-Drain Audit

The fastest way to find AI opportunities is to track where your time goes. Most small business owners are surprised by the results.

**Step-by-Step Demo: The Time-Drain Audit with AI**

**Step 1 —** Think about your last full work week. List every task that took more than 30 minutes. Include things like:
- Writing emails or social media posts
- Answering the same customer questions repeatedly
- Creating quotes or proposals
- Updating spreadsheets or reports
- Scheduling and calendar management
- Researching suppliers, competitors, or industry news

**Step 2 —** Open ChatGPT or Claude and type:

> *"Here is a list of tasks I do every week in my [type of business]: [paste your list]. For each one, tell me: (1) whether AI can help, (2) what specific tool I could use, and (3) how much time I could realistically save per week. Be specific and practical."*

**Step 3 —** Review the output. The AI will likely identify 3–5 tasks where it can save you significant time.

**Step 4 —** For each opportunity the AI identifies, ask a follow-up:

> *"For [specific task], walk me through exactly how I would use AI to do it. What tool, what steps, and what would I need to set up first?"*

---

### The Use Case Prioritization Matrix

Not all AI opportunities are equal. Use this matrix to prioritize:

| | **High Time Savings** | **Low Time Savings** |
|---|---|---|
| **Easy to implement** | ✅ Start here | Do later |
| **Hard to implement** | Plan for Month 2–3 | Skip for now |

**High value + easy to implement** is your sweet spot. For most small businesses, this includes:
- Writing first drafts of emails, proposals, and social posts (ChatGPT/Claude)
- Answering common customer questions (AI chatbot or FAQ tool)
- Summarizing long documents or meeting notes (ChatGPT/Otter.ai)
- Creating social media content calendars (ChatGPT + Canva)

---

### Step-by-Step Demo: Map Your Top 3 Use Cases

**Step 1 —** From your Time-Drain Audit, pick the three tasks that are both time-consuming AND feel straightforward to automate.

**Step 2 —** For each one, open ChatGPT and run this prompt:

> *"I want to use AI to help with [specific task] in my [type of business]. Give me a step-by-step plan to get started this week, including what tool to use, what I need to set up, and what a realistic first result looks like."*

**Step 3 —** Save the three plans. These become your AI roadmap for the next 30 days.

---

### Try This Now: The 10-Minute Use Case Finder

Open ChatGPT and type:

> *"I run a [type of business] with [number of employees]. My revenue is roughly [range] per year. What are the top 5 AI use cases that businesses like mine have found most valuable? For each one, give me the tool name, the approximate monthly cost, and the time savings per week."*

Use this as your starting point for building your personal AI roadmap in the next lesson.`,
        reflection: `Which use case from your Time-Drain Audit surprised you most — either because AI could help more than you expected, or less? What does that tell you about where to focus first?`,
        assignment: `Complete the Time-Drain Audit for your business. Identify your top 3 AI opportunities using the prioritization matrix. For each one, use ChatGPT to generate a step-by-step getting-started plan. You will use these plans in the next lesson to build your 90-day roadmap.`,
      },
      {
        slug: "building-ai-roadmap",
        order: 3,
        title: "Building Your 90-Day AI Roadmap",
        duration: "22 min",
        content: `## Building Your 90-Day AI Roadmap

A 90-day roadmap turns your AI ideas into a concrete plan with deadlines, tools, and success metrics. This lesson walks you through building one — using AI to help you write it.

---

### Why 90 Days?

Ninety days is long enough to see real results but short enough to stay motivated. It is also the right timeframe for testing one or two AI tools properly: setup, learning curve, and measurable outcome.

---

### Step-by-Step Demo: Build Your Roadmap with AI

**Step 1 —** Gather your inputs. You need:
- Your top 3 use cases from the previous lesson
- Your readiness score from the self-assessment
- Your approximate weekly hours available for AI projects (be honest — even 2 hours is enough)

**Step 2 —** Open ChatGPT and type:

> *"Help me build a 90-day AI implementation roadmap for my small business. Here is my situation:*
> *- Business type: [your business]*
> *- Top 3 AI use cases I want to tackle: [list them]*
> *- My AI readiness score: [your score]/20*
> *- Hours available per week: [number]*
> *- Monthly budget for tools: $[amount]*
>
> *Structure the roadmap in three phases: Days 1–30 (foundation), Days 31–60 (first application), Days 61–90 (expand and measure). For each phase, list specific actions, tools to use, and how I will know it is working."*

**Step 3 —** Review the roadmap. It will be a solid first draft. Now customize it:

> *"Adjust the roadmap to prioritize [your #1 use case] in the first 30 days. Also add a specific success metric for each phase — something I can actually measure."*

**Step 4 —** Copy the final roadmap into a document. This is your working plan.

---

### The 30-Day Quick Win Formula

Your first 30 days should follow this pattern:

**Week 1:** Pick one tool. Set it up. Use it every day, even imperfectly.
**Week 2:** Refine your prompts or settings based on what you learned in Week 1.
**Week 3:** Measure the time saved. Is it worth the effort?
**Week 4:** Decide: go deeper on this tool, or pivot to a different one.

**The most important rule:** Do not add a second tool until you are getting consistent value from the first one.

---

### Step-by-Step Demo: Set Up Your First Tool Today

Let's set up ChatGPT as your daily writing assistant — one of the highest-ROI first tools for small businesses.

**Step 1 —** Go to chat.openai.com and create a free account.

**Step 2 —** Click on your profile icon → "Customize ChatGPT."

**Step 3 —** In the "What would you like ChatGPT to know about you?" field, type:

> *"I own a [type of business] called [business name]. My customers are [describe them]. My brand voice is [describe it: professional/friendly/casual/etc.]. I use ChatGPT primarily for [your top use case]."*

**Step 4 —** In the "How would you like ChatGPT to respond?" field, type:

> *"Always give me practical, specific advice I can act on today. Keep responses concise. When I ask for writing help, match my brand voice. Always tell me if you are uncertain about something."*

**Step 5 —** Save these settings. Now every conversation starts with ChatGPT already knowing your context.

---

### Try This Now: Your Roadmap in 15 Minutes

Run the full roadmap-building prompt from Step 2 above using your actual business details. Print or save the result. Share it with your cohort and get feedback before committing to it.`,
        reflection: `Looking at your 90-day roadmap, what is the one thing most likely to derail it? What is your plan for that obstacle?`,
        assignment: `Complete your 90-day AI roadmap using the step-by-step demo. Set up ChatGPT with your custom instructions. Use it every day for the next 7 days for at least one business task. At the end of 7 days, write a one-paragraph update: What worked? What did not? What will you do differently in Week 2?`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MODULE 3: Data Strategy & Governance
  // ─────────────────────────────────────────────
  {
    slug: "data-strategy-governance",
    order: 3,
    title: "Data Strategy & Governance",
    subtitle: "Getting Your Data Ready for AI",
    description:
      "AI runs on data. This module shows you how to audit what you have, organize it for AI use, protect your customers' privacy, and set simple rules for how AI can use your business data.",
    icon: "Database",
    color: "from-emerald-600 to-teal-700",
    lessons: [
      {
        slug: "data-quality-matters",
        order: 1,
        title: "Auditing Your Business Data: A Hands-On Exercise",
        duration: "22 min",
        content: `## Auditing Your Business Data: A Hands-On Exercise

"Garbage in, garbage out" is the most important rule in AI. If your data is messy, incomplete, or scattered across three different systems, no AI tool will save you. This lesson walks you through a practical data audit you can complete in under an hour.

---

### Step-by-Step Demo: The 30-Minute Data Audit

**What you need:** Access to your customer list, sales records, or any key business dataset. A spreadsheet works fine.

**Step 1 — Export a sample of your data.**
Pull 50–100 rows from your most important dataset. This could be:
- Your customer list from your CRM or email tool
- Your last 3 months of sales from your POS or accounting software
- Your inventory list

**Step 2 — Open the spreadsheet and check for these five problems:**

| Problem | What to look for | Example |
|---|---|---|
| **Missing data** | Empty cells in important columns | Customer with no email address |
| **Inconsistent formatting** | Same thing written different ways | "St." vs "Street" vs "st" |
| **Duplicates** | Same customer or product listed twice | John Smith and john smith |
| **Outdated records** | Old addresses, inactive customers | Customer who moved 3 years ago |
| **Wrong data type** | Numbers stored as text, dates as strings | "12/5/23" vs "December 5, 2023" |

**Step 3 — Count the problems.** How many of your 50–100 rows have at least one issue?

**Step 4 — Open ChatGPT and type:**

> *"I just audited 50 rows of my customer data for my [type of business]. I found: [describe what you found — e.g., '15 rows with missing email addresses, 8 duplicates, and inconsistent address formatting']. What are the most important problems to fix first if I want to use this data with AI tools? Give me a prioritized action list."*

**Step 5 —** Follow the prioritized list. Even cleaning up one column (like standardizing email addresses) can dramatically improve what AI tools can do with your data.

---

### Why This Matters for AI

When you feed messy data to an AI tool, three things happen:
1. The AI makes predictions based on incomplete information
2. You cannot trust the output because you do not know what the AI was working with
3. Errors in your data get amplified — not corrected — by the AI

**A real example:** A small retail shop used AI to send personalized email offers to customers. Their customer list had 200 duplicate entries. The AI sent 200 customers two emails each on the same day — damaging the relationship instead of building it.

---

### Step-by-Step Demo: Use AI to Clean a Spreadsheet

**Tool:** ChatGPT with the data analysis feature (available on free plan) or Google Sheets with Gemini

**Step 1 —** In ChatGPT, click the paperclip icon to upload a file (or use the data analysis feature).

**Step 2 —** Upload a small sample of your data (remove any sensitive customer information first — use fake names/emails for this exercise).

**Step 3 —** Type:

> *"Look at this spreadsheet. Identify any data quality issues — duplicates, missing values, formatting inconsistencies. Then suggest how to fix the top 3 problems."*

**Step 4 —** Review the AI's analysis. It will often catch issues you missed.

---

### Try This Now: The 10-Minute Data Health Check

Open your most important business spreadsheet or export. Spend exactly 10 minutes looking for the five problems listed above. Write down what you find. You do not need to fix everything today — just knowing where the problems are is the first step.`,
        reflection: `What did your data audit reveal? Were you surprised by the number of issues? What is the one data quality problem that, if fixed, would have the biggest impact on your business decisions?`,
        assignment: `Complete the 30-minute data audit on your most important business dataset. Document the five types of problems and how many instances of each you found. Fix at least one category of problem (e.g., remove all duplicates, or standardize all phone number formats). Use ChatGPT to help if needed.`,
      },
      {
        slug: "data-privacy-compliance",
        order: 2,
        title: "Protecting Customer Data When Using AI Tools",
        duration: "20 min",
        content: `## Protecting Customer Data When Using AI Tools

When you use AI tools in your business, you are often sharing data — sometimes without realizing it. This lesson shows you exactly what to watch for, how to check the privacy settings of the tools you use, and how to protect your customers' information.

---

### The Risk You May Not Know About

Most AI tools — including ChatGPT, Claude, and others — have settings that control whether your conversations are used to train their AI models. By default, some tools use your inputs as training data. If you paste customer names, emails, or financial information into a chat, that data may be stored and used.

**This does not mean you should stop using AI tools.** It means you should know the settings and use them correctly.

---

### Step-by-Step Demo: Check Your AI Tool's Privacy Settings

**For ChatGPT:**

**Step 1 —** Log in to chat.openai.com.

**Step 2 —** Click your profile icon in the bottom left → Settings.

**Step 3 —** Click "Data controls."

**Step 4 —** Look for "Improve the model for everyone." If this is ON, your conversations may be used to train OpenAI's models. You can turn this OFF.

**Step 5 —** Also look for "Chat history & training." Turning this off means your conversations are not saved or used for training.

**For Claude (Anthropic):**

**Step 1 —** Log in to claude.ai.

**Step 2 —** Click your profile → Privacy settings.

**Step 3 —** Review the data retention settings. Claude's free tier conversations may be reviewed by Anthropic staff for safety.

**Key rule:** For any AI tool you use with real customer data, always check: (1) Is data retained? (2) Is it used for training? (3) Can I opt out?

---

### The Three-Category Rule for AI Data Safety

Use this simple rule to decide what data is safe to use with AI tools:

| Category | Examples | Safe to use with AI? |
|---|---|---|
| **Public information** | Product descriptions, your own business info, general questions | ✅ Yes, freely |
| **Internal business data** | Sales totals, inventory counts, general business processes | ✅ Yes, with caution — remove names |
| **Personal customer data** | Names, emails, phone numbers, payment info, health info | ⚠️ Only with enterprise/private tools |

**The practical rule:** Before pasting anything into a free AI tool, ask yourself: "Would I be comfortable if this appeared in a news story?" If no, anonymize it first.

---

### Step-by-Step Demo: Anonymize Data Before Using AI

**Scenario:** You want to use ChatGPT to analyze your customer purchase patterns, but your spreadsheet has real customer names and emails.

**Step 1 —** Before uploading or pasting, replace identifying information:
- Replace names with "Customer A," "Customer B," etc.
- Replace emails with "email1@example.com," "email2@example.com"
- Replace phone numbers with "555-0001," "555-0002"

**Step 2 —** Now you can safely paste the anonymized data into ChatGPT for analysis.

**Step 3 —** After getting the analysis, map the results back to your real data using your own key.

**This takes 5 extra minutes and protects your customers completely.**

---

### Try This Now: Privacy Audit Your Top 3 AI Tools

List the three AI tools you use most (or plan to use). For each one:
1. Find the privacy/data settings page
2. Check whether your data is used for training
3. Decide whether to opt out
4. Write down your decision and why

This takes about 15 minutes and gives you peace of mind every time you use these tools.`,
        reflection: `Were you aware of the data training settings in the AI tools you use? Did anything in this lesson change how you plan to use them? What is the one privacy practice you will implement immediately?`,
        assignment: `Complete the Privacy Audit for your top 3 AI tools. Update your settings where needed. Then create a one-page "AI Data Policy" for your business: what data is OK to use with AI tools, what is not, and what steps your team should take before using customer data with any AI tool.`,
      },
      {
        slug: "data-governance-framework",
        order: 3,
        title: "Simple Data Rules for Your Small Business",
        duration: "20 min",
        content: `## Simple Data Rules for Your Small Business

"Data governance" sounds like something only big corporations need. But every business that uses AI needs a few simple rules about how data is collected, stored, and used. This lesson helps you create those rules in under an hour — using AI to help you write them.

---

### What Small Business Data Governance Actually Looks Like

You do not need a 50-page policy document. You need answers to five questions:

1. **What data do we collect?** (Customer info, sales, inventory, etc.)
2. **Where does it live?** (Which software, which spreadsheet, which device?)
3. **Who can access it?** (Just you? Your team? Your accountant?)
4. **How long do we keep it?** (Forever? 3 years? Until the customer asks us to delete it?)
5. **What are we NOT allowed to do with it?** (Share it with third parties? Use it for marketing without consent?)

---

### Step-by-Step Demo: Build Your Data Rules with AI

**Step 1 —** Open ChatGPT and type:

> *"I run a [type of business] with [number] employees. Help me create a simple, one-page data governance policy. I collect the following types of data: [list your data types — e.g., customer names, emails, purchase history, health information if applicable]. My state is [your state]. Write the policy in plain language that a non-lawyer can understand."*

**Step 2 —** Review the draft. It will cover the five key questions above.

**Step 3 —** Customize it. Type:

> *"Add a section specifically about using AI tools with customer data. Include rules about what data can and cannot be entered into AI chatbots like ChatGPT."*

**Step 4 —** Add one more section:

> *"Add a section about what happens if there is a data breach — who we notify, in what timeframe, and how."*

**Step 5 —** You now have a working data policy. Have a lawyer review it if you handle sensitive data (health, financial, children's information).

---

### Step-by-Step Demo: Create a Simple Data Inventory

A data inventory is just a list of where your data lives. Here is how to build one in 20 minutes.

**Step 1 —** Open a spreadsheet with these columns:
- Data Type (e.g., "Customer email addresses")
- Where It Lives (e.g., "Mailchimp account")
- Who Has Access (e.g., "Owner and marketing assistant")
- How Long We Keep It (e.g., "Until customer unsubscribes")
- Privacy Risk Level (Low / Medium / High)

**Step 2 —** Fill in one row for each type of data your business collects.

**Step 3 —** Open ChatGPT and paste your inventory. Type:

> *"Review this data inventory for a small business. Identify any privacy risks I should be aware of and suggest one improvement for each high-risk item."*

**Step 4 —** Implement the top two suggestions this week.

---

### The One Rule That Matters Most

If you implement nothing else from this lesson, implement this: **Do not collect data you do not need.**

Every piece of customer data you collect is a liability as well as an asset. If you do not have a clear reason to collect it and a plan to protect it, do not collect it. This single rule reduces your privacy risk, simplifies your data management, and builds customer trust.

---

### Try This Now: The 5-Minute Data Inventory Starter

Open a blank spreadsheet right now. List every type of customer data your business currently collects. Do not worry about the other columns yet — just the list. You will fill in the rest in your assignment.`,
        reflection: `Looking at your data inventory, is there any data you collect that you do not actually use? What would happen if you stopped collecting it? What would you gain (simplicity, reduced risk) and what would you lose?`,
        assignment: `Build your complete data inventory using the spreadsheet template from this lesson. Use ChatGPT to identify the top 3 privacy risks. Then draft your one-page data policy using the step-by-step demo. Share both documents with your cohort for feedback.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MODULE 4: Ethical AI
  // ─────────────────────────────────────────────
  {
    slug: "ethical-ai",
    order: 4,
    title: "Ethical AI",
    subtitle: "Using AI Responsibly in Your Business",
    description:
      "Learn to spot bias in AI tools, understand what transparency means for your customers, manage the impact of AI on your team, and build simple ethical guidelines for your business.",
    icon: "Scale",
    color: "from-amber-600 to-orange-700",
    lessons: [
      {
        slug: "algorithmic-bias",
        order: 1,
        title: "Spotting and Avoiding AI Bias in Your Business",
        duration: "22 min",
        content: `## Spotting and Avoiding AI Bias in Your Business

AI bias is not just a problem for big tech companies. It can affect any small business that uses AI to make decisions about customers, job applicants, or pricing. This lesson shows you how to spot it and what to do about it.

---

### What AI Bias Looks Like in Small Business

Bias in AI means the tool treats some groups of people differently — and not in a way you intended or would endorse. Here are real examples at the small business level:

- A hiring tool that ranks male applicants higher than female applicants for the same qualifications
- A pricing algorithm that charges higher prices to customers in certain zip codes
- A customer service chatbot that understands standard American English well but struggles with regional accents or non-native speakers
- A social media ad tool that automatically targets your ads to a narrow demographic, excluding potential customers

---

### Step-by-Step Demo: Test an AI Tool for Bias

**Tool:** ChatGPT or Claude (free)

This exercise tests whether an AI writing tool produces different outputs for different groups of people.

**Step 1 —** Open ChatGPT and type:

> *"Write a job posting for a customer service representative at a small retail shop. The ideal candidate is hardworking, friendly, and reliable."*

**Step 2 —** Copy the output.

**Step 3 —** Now type:

> *"Rewrite that job posting to make it more welcoming to candidates from diverse backgrounds, including people who may not have traditional work experience."*

**Step 4 —** Compare the two versions. What changed? What assumptions were embedded in the first version?

**Step 5 —** Now test a pricing scenario. Type:

> *"I run a cleaning service. A customer in [wealthy neighborhood] wants a quote for a 3-bedroom house cleaning. A customer in [lower-income neighborhood] wants the same service. Should I charge different prices?"*

Notice how the AI responds. Does it suggest differential pricing? Does it flag the ethical concern? This tells you something about how the tool handles fairness.

---

### The Bias Check Checklist

Before using any AI tool for decisions that affect people, run through this checklist:

**✅ Who was this tool trained on?**
Ask the vendor or check their documentation. If they cannot tell you, be cautious.

**✅ Does it perform equally well for all your customers?**
Test it with examples from different demographic groups, languages, and backgrounds.

**✅ Are you using it to make final decisions, or just to assist?**
AI should inform your judgment, not replace it — especially for hiring, pricing, and customer service.

**✅ Do you have a way for customers to appeal or get a human review?**
If AI makes a decision that affects a customer, they should be able to talk to a person.

---

### Step-by-Step Demo: Audit Your Current AI Tools for Bias Risk

**Step 1 —** List every AI tool you currently use or plan to use that makes or influences decisions about people (customers, employees, applicants).

**Step 2 —** Open ChatGPT and type:

> *"I use [tool name] for [what you use it for] in my [type of business]. What are the potential bias risks I should be aware of? How would I know if it was producing biased outcomes? What should I do if I discover bias?"*

**Step 3 —** For each tool, write down the top bias risk and one step you will take to monitor for it.

---

### Try This Now: The Bias Stress Test

Pick one AI tool you use regularly. Deliberately test it with inputs from different groups:
- Try it with names that suggest different ethnicities or genders
- Try it with different geographic locations
- Try it with different writing styles or language levels

Does the output change in ways you would not endorse? Document what you find.`,
        reflection: `Did the bias stress test reveal anything unexpected about a tool you use? How does knowing about potential bias change how you will use that tool going forward?`,
        assignment: `Complete the Bias Check Checklist for your top two AI tools. Run the bias stress test on at least one of them. Write a one-page summary of what you found and what changes you will make to how you use these tools. Share your findings with your cohort.`,
      },
      {
        slug: "transparency-accountability",
        order: 2,
        title: "Being Honest with Customers About AI",
        duration: "18 min",
        content: `## Being Honest with Customers About AI

Your customers interact with AI in your business whether they know it or not — through your chatbot, your email campaigns, your recommendation engine, or your pricing. Being transparent about this is not just ethical — it builds trust and protects your reputation.

---

### What Transparency Means in Practice

Transparency does not mean you have to explain your entire technology stack to every customer. It means:
- Not pretending an AI-generated response is from a human
- Telling customers when a decision was made by an algorithm (especially if it affects them negatively)
- Making it easy for customers to reach a real person
- Being honest if asked whether you use AI

---

### Step-by-Step Demo: Write Your AI Transparency Statement

**Step 1 —** Open ChatGPT and type:

> *"Help me write a short, friendly transparency statement for my [type of business] website. I use AI for: [list what you use AI for — e.g., 'answering common customer questions via chatbot, personalizing email recommendations, and drafting social media content']. The statement should be honest, reassuring, and under 100 words. It should tell customers what AI does and what humans still do."*

**Step 2 —** Review the draft. Does it sound like your brand?

**Step 3 —** Refine it:

> *"Make it warmer and more conversational. Add a line about how customers can always reach a real person."*

**Step 4 —** Add this statement to your website's FAQ page or privacy policy.

---

### Step-by-Step Demo: Set Up a Human Escalation Path

If you use an AI chatbot or automated email system, customers need a clear way to reach a human. Here is how to set this up.

**Step 1 —** Identify every touchpoint where AI interacts with customers (chatbot, automated emails, recommendation engine).

**Step 2 —** For each touchpoint, add a clear human escalation option:
- Chatbot: Add a "Talk to a person" button that triggers an email or phone call
- Automated emails: Include a reply-to address that a human monitors
- Recommendation engine: Add "Not what you're looking for? Contact us" link

**Step 3 —** Open ChatGPT and type:

> *"Write a short message I can add to my automated customer service emails. It should acknowledge that the response was generated with AI assistance, reassure the customer that a human will follow up if needed, and give them a direct way to reach me. Keep it under 50 words."*

**Step 4 —** Use this message as a footer in all AI-assisted customer communications.

---

### The Trust Dividend

Businesses that are upfront about using AI consistently report higher customer trust than those that hide it. Customers are not afraid of AI — they are afraid of being deceived. A simple "This response was drafted with AI assistance — a team member will follow up within 24 hours" builds more trust than a perfectly polished AI response that pretends to be human.

---

### Try This Now: The Transparency Audit

List every place in your business where AI interacts with customers. For each one, ask: "Does the customer know AI is involved?" If the answer is no, decide whether to add a disclosure. Use ChatGPT to help you draft the disclosure language.`,
        reflection: `Is there anywhere in your business where AI interacts with customers without their knowledge? How would your customers feel if they found out? What would you change?`,
        assignment: `Write your AI Transparency Statement using the step-by-step demo. Add it to your website or customer communications. Set up at least one human escalation path for your AI-assisted customer interactions. Share your transparency statement with your cohort for feedback.`,
      },
      {
        slug: "ai-workforce-impact",
        order: 3,
        title: "Talking to Your Team About AI",
        duration: "20 min",
        content: `## Talking to Your Team About AI

The biggest obstacle to AI adoption in small businesses is not technology — it is people. Your team may be worried about their jobs, skeptical about new tools, or simply overwhelmed by change. This lesson gives you a practical playbook for having the AI conversation with your team.

---

### Why Teams Resist AI (And What to Do About It)

**Fear of job loss** is the most common concern. Address it directly and honestly. For most small businesses, AI is more likely to change what jobs look like than eliminate them entirely. Be specific: "AI will handle the first draft of our weekly newsletter, which frees you up to focus on customer relationships."

**Fear of looking incompetent** is often unspoken. Some employees worry that struggling with a new tool will make them look bad. Create a safe learning environment: "We are all learning this together. There are no stupid questions."

**Skepticism about value** is healthy. Some employees have seen technology initiatives come and go. Show them a quick win early — something that makes their specific job easier — and skepticism often turns into enthusiasm.

---

### Step-by-Step Demo: Prepare for the AI Conversation

**Step 1 —** Before talking to your team, use ChatGPT to prepare. Type:

> *"I'm a small business owner about to introduce AI tools to my team of [number] employees. My team works in [describe roles — e.g., 'customer service, bookkeeping, and social media']. What are the top concerns they are likely to have? How should I address each one? Give me specific talking points."*

**Step 2 —** Review the talking points. Add any concerns specific to your team that the AI did not mention.

**Step 3 —** Now prepare your opening message. Type:

> *"Write a short, honest message I can share with my team introducing our plan to start using AI tools. The tone should be reassuring, not hype-y. Acknowledge that change can be uncomfortable. Explain that the goal is to make their jobs easier, not to replace them. Keep it under 200 words."*

**Step 4 —** Customize the message with your specific tools and timeline.

---

### Step-by-Step Demo: Run a Team AI Discovery Session

This 30-minute team exercise gets everyone involved in finding AI opportunities — and builds buy-in at the same time.

**Step 1 —** Gather your team (even if it is just 2–3 people).

**Step 2 —** Give everyone 5 minutes to write down their answer to: "What is the most repetitive, time-consuming task in your job?"

**Step 3 —** Share the answers. You will likely find 3–5 tasks that everyone agrees are tedious.

**Step 4 —** Together, open ChatGPT and ask:

> *"Our small business team has identified these repetitive tasks: [list them]. For each one, suggest one AI tool that could help and describe how it would work. Keep it practical and affordable."*

**Step 5 —** Let the team react to the suggestions. Which ones excite them? Which ones concern them? Use this conversation to choose your first team AI project.

---

### Try This Now: The One-on-One AI Check-In

Before your next team meeting, have a brief one-on-one conversation with each team member. Ask two questions:
1. "What part of your job do you wish you had more time for?"
2. "Is there anything about AI tools that worries you?"

Listen more than you talk. The answers will tell you where to start and what concerns to address.`,
        reflection: `What is your team's biggest concern about AI? How will you address it specifically — not with generic reassurance, but with a concrete plan or example?`,
        assignment: `Run the Team AI Discovery Session with your team (or, if you work alone, do it with a trusted colleague or advisor). Document the top 3 repetitive tasks identified and the AI tools suggested. Choose one to pilot together. Write a one-paragraph summary of the session and what you learned about your team's readiness.`,
      },
      {
        slug: "ai-ethics-committee",
        order: 4,
        title: "Your Simple AI Ethics Policy",
        duration: "18 min",
        content: `## Your Simple AI Ethics Policy

You do not need a board of directors or a legal team to have an AI ethics policy. You need a one-page document that answers: What will we use AI for? What will we never use AI for? And how will we make sure we are using it responsibly? This lesson helps you build that document in 30 minutes.

---

### Why Every Small Business Needs an AI Policy

Without a policy, AI decisions get made inconsistently — different employees using different tools in different ways, with no shared understanding of what is acceptable. A simple policy:
- Protects your customers
- Protects your business from legal and reputational risk
- Gives your team clear guidance
- Builds customer trust when you share it publicly

---

### Step-by-Step Demo: Build Your AI Ethics Policy

**Step 1 —** Open ChatGPT and type:

> *"Help me create a simple, one-page AI ethics policy for my [type of business] with [number] employees. The policy should cover: (1) what we will use AI for, (2) what we will never use AI for, (3) how we protect customer data when using AI, (4) how we ensure AI outputs are reviewed by a human before they affect customers, and (5) how employees can raise concerns about AI use. Write it in plain language."*

**Step 2 —** Review the draft. Add your specific AI tools and use cases.

**Step 3 —** Add a "Red Lines" section — things your business will never do with AI. Type:

> *"Add a 'Red Lines' section to the policy. Include: we will never use AI to make final hiring decisions without human review, we will never use AI to generate fake customer reviews, we will never share customer personal data with AI tools without anonymizing it first. Add any other red lines appropriate for a [type of business]."*

**Step 4 —** Add a review schedule:

> *"Add a final section: this policy will be reviewed every 6 months and updated as our AI use evolves. Include a simple process for employees to suggest updates."*

**Step 5 —** Save the policy as a document. Share it with your team and, if appropriate, publish a summary on your website.

---

### The Five Non-Negotiables

Regardless of your business type, these five rules should be in every small business AI policy:

1. **A human reviews AI outputs before they affect customers.** No fully automated customer-facing decisions without a human checkpoint.
2. **Customer data is anonymized before being entered into free AI tools.** No real names, emails, or payment information in ChatGPT or similar tools.
3. **AI-generated content is disclosed when asked.** If a customer asks whether a response was AI-generated, answer honestly.
4. **Employees can raise AI concerns without fear.** Create a simple process (even just an email address) for flagging AI problems.
5. **The policy is reviewed every 6 months.** AI is changing fast. Your policy needs to keep up.

---

### Try This Now: The 10-Minute Policy Starter

Open ChatGPT and run the policy-building prompt from Step 1 above using your actual business details. Save the output. You do not need to finalize it today — but having a first draft is the most important step.`,
        reflection: `What is the most important "red line" for your specific business — the thing you would never want AI to do, no matter how efficient it might be? What would the consequences be if that line were crossed?`,
        assignment: `Build your complete AI Ethics Policy using the step-by-step demo. Share it with your team and get their input. Finalize the policy and save it somewhere accessible to everyone. Bring it to the next cohort session for peer review.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MODULE 5: Leading the AI-Powered Organization
  // ─────────────────────────────────────────────
  {
    slug: "leading-ai-powered-organization",
    order: 5,
    title: "Leading the AI-Powered Organization",
    subtitle: "Change, Culture, and the Future of Your Business",
    description:
      "Lead your team through the AI transition with confidence. Practical tools for managing change, building AI skills in your team, and positioning your business for long-term success.",
    icon: "Rocket",
    color: "from-rose-600 to-pink-700",
    lessons: [
      {
        slug: "change-management",
        order: 1,
        title: "Managing the AI Transition in Your Business",
        duration: "22 min",
        content: `## Managing the AI Transition in Your Business

Introducing AI to your business is a change management challenge as much as a technology challenge. The tools are easy to set up. Getting your team — and yourself — to use them consistently is the hard part. This lesson gives you a practical playbook.

---

### The Three Stages of AI Adoption

Every business goes through three stages when adopting AI:

**Stage 1 — Experimentation (Weeks 1–4):** You try a few tools, get excited about some, frustrated by others. Results are inconsistent. This is normal.

**Stage 2 — Integration (Months 2–3):** You identify 2–3 tools that genuinely save time. You build them into your daily workflow. Your team starts using them regularly.

**Stage 3 — Optimization (Month 4+):** You are getting consistent value. You start looking for the next opportunity. AI becomes part of how your business operates, not a separate "AI project."

Most businesses get stuck in Stage 1 because they try too many tools at once, do not measure results, or give up after the first frustrating experience. This lesson helps you move through the stages faster.

---

### Step-by-Step Demo: Build Your AI Adoption Tracker

**Tool:** Google Sheets (free) or any spreadsheet

**Step 1 —** Create a spreadsheet with these columns:
- Tool Name
- What We Use It For
- Who Uses It
- Time Saved Per Week (estimate)
- Problems Encountered
- Status (Testing / Active / Paused / Dropped)

**Step 2 —** Add every AI tool you are currently testing or using.

**Step 3 —** Open ChatGPT and type:

> *"I'm tracking AI tool adoption in my small business. Here is my current status: [paste your tracker]. Based on this, what should I prioritize in the next 30 days? Which tools should I go deeper on, and which should I drop?"*

**Step 4 —** Update your tracker weekly. This 5-minute weekly review is the single most effective habit for AI adoption.

---

### Step-by-Step Demo: Create a 30-Day AI Habit

The research on habit formation is clear: new behaviors stick when they are tied to existing routines. Here is how to build an AI habit that lasts.

**Step 1 —** Identify one existing daily routine in your business (morning email check, end-of-day reporting, weekly team meeting).

**Step 2 —** Attach one AI action to that routine. For example:
- Morning email check → Use ChatGPT to draft responses to the three most complex emails
- End-of-day reporting → Use ChatGPT to summarize the day's key decisions in 3 bullet points
- Weekly team meeting → Use Otter.ai to transcribe and summarize the meeting automatically

**Step 3 —** Open ChatGPT and type:

> *"I want to build a daily AI habit for my [type of business]. My existing routine is [describe it]. Suggest 3 specific AI actions I could attach to this routine that would save me time and be easy to do consistently."*

**Step 4 —** Choose one. Do it every day for 21 days. Do not add a second habit until the first one is automatic.

---

### Try This Now: Your Week 1 AI Commitment

Write down one specific AI action you will take every day this week. Be specific: not "use AI more" but "use ChatGPT to draft my daily customer follow-up email before I write it myself." Share your commitment with your cohort for accountability.`,
        reflection: `Which stage of AI adoption are you currently in — Experimentation, Integration, or Optimization? What is the one thing holding you back from moving to the next stage?`,
        assignment: `Build your AI Adoption Tracker using the step-by-step demo. Add all current and planned tools. Set up your 30-Day AI Habit using the routine-attachment method. Check in with your cohort at the end of Week 1 with a progress update.`,
      },
      {
        slug: "building-ai-talent",
        order: 2,
        title: "Building AI Skills in Your Team",
        duration: "20 min",
        content: `## Building AI Skills in Your Team

You do not need to hire an AI expert. You need to build AI fluency in the people you already have. This lesson shows you how to upskill your team using free resources, peer learning, and hands-on practice.

---

### The AI Skills Your Team Actually Needs

For most small business teams, AI fluency means three things:

1. **Prompt writing:** Knowing how to ask AI tools for what you need clearly and specifically
2. **Output evaluation:** Knowing how to judge whether an AI response is accurate, appropriate, and on-brand
3. **Tool selection:** Knowing which tool to use for which task

You do not need your team to understand machine learning. You need them to use tools confidently and critically.

---

### Step-by-Step Demo: Run a Team Prompt Workshop

This 45-minute workshop builds prompt writing skills across your team.

**What you need:** A laptop or tablet for each participant, free ChatGPT accounts

**Step 1 — The Bad Prompt (5 minutes)**
Everyone types the same vague prompt: *"Help me with my job."*
Share the results. Notice how useless they are.

**Step 2 — The Better Prompt (10 minutes)**
Teach the CCAT formula:
- **C**ontext: Who you are and what you do
- **C**ommand: What you want the AI to do
- **A**udience: Who the output is for
- **T**one: How it should sound

**Step 3 — Practice Round (15 minutes)**
Each person writes a prompt for a real task in their job using the CCAT formula. Share and compare results.

**Step 4 — Refinement Round (10 minutes)**
Everyone takes their prompt and adds one more specific detail. Compare the new output to the first version.

**Step 5 — Debrief (5 minutes)**
What surprised you? What will you use this week?

---

### Step-by-Step Demo: The CCAT Prompt Formula in Action

**Example — Customer service email:**

**Bad prompt:** *"Write a customer email."*

**CCAT prompt:**
> *"[Context] I run a small plumbing business in Austin, Texas. [Command] Write a follow-up email to a customer whose repair appointment was delayed by 2 hours due to an emergency call. [Audience] The customer is a homeowner who was waiting at home. [Tone] Apologetic, professional, and warm. Offer a 10% discount on their next service."*

**The difference in output quality is dramatic.** Run this comparison live with your team.

---

### Free Resources for Team AI Training

| Resource | What It Covers | Cost |
|---|---|---|
| ChatGPT's own tutorials (help.openai.com) | Prompt basics, use cases | Free |
| Google's "Prompting Essentials" course | Prompt engineering fundamentals | Free |
| Coursera "AI for Everyone" (Andrew Ng) | AI concepts for non-technical people | Free to audit |
| LinkedIn Learning AI courses | Business-specific AI applications | Free with LinkedIn Premium |
| YouTube: "AI for Small Business" | Practical tool tutorials | Free |

---

### Try This Now: The Prompt Challenge

Give your team (or yourself) this challenge: Find one task you do this week and write a CCAT prompt for it. Compare the AI output to what you would have produced without AI. Share the best examples at your next team meeting.`,
        reflection: `Which of your team members do you think will adapt to AI tools most quickly? Which will need the most support? What specific support will you provide to the person who needs it most?`,
        assignment: `Run the Team Prompt Workshop with your team (adapt it for a solo session if you work alone). Document the best prompts your team creates. Assign each team member one AI tool to learn and use for one week. Reconvene to share what they learned.`,
      },
      {
        slug: "future-proofing",
        order: 3,
        title: "Future-Proofing Your Small Business with AI",
        duration: "20 min",
        content: `## Future-Proofing Your Small Business with AI

AI is not a one-time project — it is an ongoing capability you build over time. This lesson helps you think about where AI is heading and how to position your business to benefit from it, rather than be disrupted by it.

---

### The Three Waves of AI for Small Business

**Wave 1 (Now):** Generative AI tools that save time on content, communication, and research. Most small businesses are here or just entering.

**Wave 2 (1–3 years):** AI agents that can take multi-step actions on your behalf — booking appointments, processing orders, following up with leads — without you manually triggering each step.

**Wave 3 (3–5 years):** AI deeply integrated into every business system — your accounting, your inventory, your customer relationships — all connected and learning from each other.

The businesses that will thrive in Wave 3 are the ones building good data habits and AI fluency now.

---

### Step-by-Step Demo: Scenario Planning with AI

**Step 1 —** Open ChatGPT and type:

> *"I run a [type of business]. In 3 years, how might AI change my industry? What new competitors might emerge? What customer expectations might shift? What jobs in my business might change significantly? Give me a realistic scenario, not a utopian or dystopian one."*

**Step 2 —** Read the scenario. Does it match your intuition? What surprises you?

**Step 3 —** Now ask:

> *"Based on that scenario, what are the top 3 things I should be doing NOW to position my business well? Be specific and practical."*

**Step 4 —** Write down the top 3 actions. Add them to your AI roadmap.

---

### Step-by-Step Demo: Identify Your AI Moat

An "AI moat" is a competitive advantage that AI makes harder for competitors to replicate. For small businesses, this usually comes from:

- **Proprietary data:** Customer purchase history, preferences, and behavior that only you have
- **Trusted relationships:** Long-term customer relationships that AI can enhance but not replace
- **Local knowledge:** Deep understanding of your community, market, or specialty that generic AI tools do not have

**Step 1 —** Open ChatGPT and type:

> *"I run a [type of business]. What data do I likely have that competitors don't? How could I use AI to turn that data into a competitive advantage? Give me 3 specific examples."*

**Step 2 —** For each example, ask: "Is this realistic for a business my size? What would I need to implement it?"

**Step 3 —** Choose one AI moat to start building. Add it to your 90-day roadmap.

---

### The One Investment That Always Pays Off

Regardless of how AI evolves, one investment always pays off: **organizing your data.** Every year you spend collecting clean, organized customer and business data is a year of competitive advantage. The businesses that will benefit most from Wave 2 and Wave 3 AI are those that built good data habits during Wave 1.

---

### Try This Now: Your 3-Year AI Vision

Open ChatGPT and ask it to help you write a one-paragraph vision for your business in 3 years — what it looks like, how AI is integrated, and what you are able to do that you cannot do today. Use this vision to motivate your near-term AI investments.`,
        reflection: `What is the biggest threat AI poses to your business in the next 3 years? What is the biggest opportunity? Are you more focused on the threat or the opportunity right now — and is that the right balance?`,
        assignment: `Complete the Scenario Planning exercise using your actual business type. Identify your AI moat and write a one-paragraph plan for building it. Add your top 3 future-proofing actions to your 90-day roadmap. Share your 3-year AI vision with your cohort.`,
      },
      {
        slug: "ai-augmented-leadership",
        order: 4,
        title: "You as an AI-Augmented Leader",
        duration: "18 min",
        content: `## You as an AI-Augmented Leader

The most powerful AI tool in your business is not a chatbot or an analytics platform — it is you, augmented by AI. This final lesson in Module 5 is about building your personal AI practice: the habits, tools, and mindset that will make you a more effective leader.

---

### What AI-Augmented Leadership Looks Like

An AI-augmented leader does not just use AI tools — they use them strategically, critically, and consistently. They:
- Use AI to think through decisions before making them
- Use AI to prepare for difficult conversations
- Use AI to learn faster than they could alone
- Use AI to communicate more clearly and efficiently
- Always apply their own judgment to AI outputs

---

### Step-by-Step Demo: AI as Your Thinking Partner

One of the most underused applications of AI for small business owners is using it as a thinking partner — a tireless sounding board that helps you think through decisions before you make them.

**Step 1 —** Think of a real business decision you are currently facing (a hiring decision, a pricing change, a new service offering, a difficult customer situation).

**Step 2 —** Open ChatGPT and type:

> *"I'm a small business owner facing this decision: [describe the decision]. Help me think through it. What are the key factors I should consider? What are the risks of each option? What questions should I be asking that I might not be thinking about? Do not tell me what to decide — help me think more clearly."*

**Step 3 —** Read the response. Notice that AI is often very good at surfacing considerations you had not thought of — not because it is smarter than you, but because it has no emotional stake in the outcome.

**Step 4 —** Follow up with:

> *"What is the strongest argument against the option I am currently leaning toward?"*

This is one of the most valuable prompts in business — it forces you to stress-test your own thinking.

---

### Step-by-Step Demo: Build Your Personal AI Toolkit

**Step 1 —** Open a document and create your personal AI toolkit: a list of the tools you use, what you use them for, and your best prompts for each.

**Step 2 —** Open ChatGPT and type:

> *"I'm a small business owner. Based on everything we've discussed in this conversation, suggest 5 prompts I should save and use regularly — one for decision-making, one for communication, one for learning, one for planning, and one for creative problem-solving."*

**Step 3 —** Save these prompts. Add them to your toolkit document.

**Step 4 —** Review and update your toolkit monthly. The prompts that work best for you will evolve as you get better at working with AI.

---

### The Leader's AI Mindset

Three principles for sustainable AI-augmented leadership:

**Curiosity over fear.** AI is changing fast. The leaders who thrive are those who stay curious — trying new tools, asking new questions, and learning from both successes and failures.

**Judgment over automation.** AI can do many things faster than you. It cannot replace your judgment, your relationships, or your values. Those are your most important assets — protect them.

**Progress over perfection.** You do not need to master AI before you start using it. The best way to learn is to use it imperfectly, reflect on what worked, and improve. Start now.

---

### Try This Now: Your AI Leadership Commitment

Write down three specific ways you will use AI differently as a leader starting this week. Be specific: not "use AI more" but "use ChatGPT to think through one business decision before I make it" or "use Otter.ai to transcribe and summarize every team meeting." Share your commitments with your cohort.`,
        reflection: `What is the most important leadership decision you have made in the last month? How could AI have helped you think through it more clearly? Would you have made the same decision?`,
        assignment: `Use the Thinking Partner demo to work through a real current business decision. Document the process: what question you asked, what the AI surfaced, and what you decided. Build your Personal AI Toolkit with at least 5 saved prompts. Share your toolkit with your cohort.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MODULE 6: AI in Action
  // ─────────────────────────────────────────────
  {
    slug: "ai-in-action",
    order: 6,
    title: "AI in Action",
    subtitle: "Real-World Applications for Your Business",
    description:
      "Put everything together. Step-by-step walkthroughs for using AI in the four highest-impact areas for small businesses: data analysis, daily operations, marketing, and your personal implementation plan.",
    icon: "Zap",
    color: "from-emerald-600 to-teal-700",
    lessons: [
      {
        slug: "ai-for-data-analysis",
        order: 1,
        title: "Using AI to Understand Your Business Data",
        duration: "25 min",
        content: `## Using AI to Understand Your Business Data

You already have data that could transform your business decisions. Sales records, customer lists, inventory data, financial reports — it is all there. This lesson shows you how to use AI to turn that data into insights you can act on today.

---

### Step-by-Step Demo: Analyze Your Sales Data with ChatGPT

**What you need:** A spreadsheet of your sales data (last 3–6 months). Export it from your POS system, accounting software, or wherever you track sales.

**Step 1 —** Open your sales spreadsheet. Make sure it has at least these columns: Date, Product/Service, Revenue, and ideally Customer or Location.

**Step 2 —** Remove any sensitive customer information (names, contact details). Keep the transaction data.

**Step 3 —** Open ChatGPT (you need the free account — the data analysis feature is available). Click the paperclip icon to upload your file, OR copy and paste a sample of 20–50 rows.

**Step 4 —** Type this prompt:

> *"This is my sales data for the last [time period]. Please analyze it and tell me: (1) What are my top 5 best-selling products/services by revenue? (2) What day of the week generates the most sales? (3) Are there any trends — is revenue growing, declining, or flat? (4) Are there any unusual patterns I should investigate? Give me the key insights in plain language."*

**Step 5 —** Read the analysis. For each insight, ask: "What decision does this change?"

**Step 6 —** Follow up with specific questions:

> *"Based on this data, what products should I promote more? Which ones should I consider dropping?"*

> *"If I wanted to increase revenue by 15% in the next 90 days, what does this data suggest I should focus on?"*

---

### Step-by-Step Demo: Use Google Sheets + Gemini for Ongoing Analysis

For ongoing data analysis, Google Sheets with Gemini (Google's AI) is a powerful free option.

**Step 1 —** Open Google Sheets and import your data.

**Step 2 —** Click the Gemini icon in the top right (or go to Extensions → Gemini).

**Step 3 —** Type a question about your data in plain English:
> *"What is the average sale value by day of week?"*
> *"Which product has the highest profit margin?"*
> *"Show me a chart of monthly revenue for the last 6 months."*

**Step 4 —** Gemini will generate formulas, charts, or summaries automatically — no spreadsheet expertise required.

---

### The Three Questions to Ask Your Data Every Month

Build a monthly habit of asking your data these three questions using AI:

1. **"What is my best-performing [product/service/channel] this month, and why?"**
2. **"What is my worst-performing [product/service/channel], and what should I do about it?"**
3. **"What trend in my data should I pay attention to that I might be missing?"**

These three questions, answered consistently, will improve your business decisions more than any dashboard or report.

---

### Try This Now: Your First AI Data Analysis

Export or copy 30 days of sales data from your business. Upload it to ChatGPT or paste it in. Ask the four questions from Step 4 above. Write down the top 3 insights and one decision you will make differently as a result.`,
        reflection: `What did the AI find in your data that you did not already know? How does it change what you will focus on this month? What data do you wish you had been collecting that you have not been?`,
        assignment: `Complete a full AI analysis of your last 3 months of sales data using ChatGPT or Google Sheets + Gemini. Document the top 5 insights. Make one concrete business decision based on the data — a product to promote, a service to drop, a day to run a promotion. Track the result over the next 30 days.`,
      },
      {
        slug: "ai-for-productivity",
        order: 2,
        title: "AI for Daily Operations: Save 5 Hours a Week",
        duration: "25 min",
        content: `## AI for Daily Operations: Save 5 Hours a Week

The fastest ROI from AI for most small businesses comes from daily operational tasks — writing, scheduling, summarizing, and communicating. This lesson walks you through five specific workflows that can save you 5+ hours per week, starting today.

---

### Workflow 1: AI-Assisted Email (Save 1–2 hours/week)

**Step-by-Step Demo:**

**Step 1 —** Identify your three most common types of emails (e.g., customer inquiries, supplier follow-ups, appointment confirmations).

**Step 2 —** For each type, create a "template prompt" in ChatGPT. Example:

> *"Write a professional, friendly reply to a customer who is asking about [topic]. My business is [name], a [type of business]. The customer's question is: [paste question]. Keep the reply under 100 words and end with a clear next step."*

**Step 3 —** Save this prompt in a document called "My AI Prompts." Use it every time you get that type of email.

**Step 4 —** Time yourself. How long does it take to get a usable draft? How long to edit it? Compare to writing from scratch.

---

### Workflow 2: Meeting Summaries with Otter.ai (Save 1 hour/week)

**Step 1 —** Go to otter.ai and create a free account.

**Step 2 —** On your next phone call or meeting, open Otter and tap "Record."

**Step 3 —** Otter transcribes the conversation in real time.

**Step 4 —** After the meeting, tap "Summary." Otter generates a summary with key points and action items automatically.

**Step 5 —** Copy the action items into your task manager. You never need to take meeting notes again.

**Free tier:** 300 minutes of transcription per month — enough for most small businesses.

---

### Workflow 3: Social Media Content in Bulk (Save 1–2 hours/week)

**Step-by-Step Demo:**

**Step 1 —** Open ChatGPT and type:

> *"I need to create social media content for my [type of business] for the next 2 weeks. My audience is [describe them]. My brand voice is [describe it]. Create a content calendar with 10 posts: 3 educational, 3 promotional, 2 behind-the-scenes, and 2 customer-focused. For each post, write the caption and suggest a visual idea."*

**Step 2 —** Review the 10 posts. Edit any that do not match your voice.

**Step 3 —** Open Canva (free at canva.com). Use their AI image generator or templates to create the visuals for each post.

**Step 4 —** Schedule all 10 posts using Buffer (free for up to 3 channels) or Meta Business Suite (free for Facebook/Instagram).

**Total time:** 45–60 minutes for 2 weeks of content.

---

### Workflow 4: Research and Competitive Intelligence (Save 30 min/week)

**Step 1 —** Open ChatGPT and type:

> *"I run a [type of business] in [city/region]. Who are my top 3–5 competitors? What are they doing well? What are the gaps in the market that I could fill? What are customers in my industry complaining about online?"*

**Step 2 —** Use this as a starting point, then verify with a quick Google search.

**Step 3 —** Set up a weekly prompt: every Monday morning, ask ChatGPT:

> *"What are the latest trends in [your industry] that a small business owner should know about this week? What should I be paying attention to?"*

---

### Workflow 5: Financial Summaries (Save 30 min/week)

**Step 1 —** Export your weekly or monthly financial summary from QuickBooks, Wave, or your accounting software.

**Step 2 —** Paste the key numbers into ChatGPT and type:

> *"Here are my financial numbers for [time period]: [paste numbers]. Summarize the key takeaways in plain language. What is going well? What needs attention? What one thing should I focus on this week?"*

**Step 3 —** Use this summary in your weekly business review instead of staring at a spreadsheet.

---

### Try This Now: Pick One Workflow and Start Today

Choose the one workflow from this lesson that would save you the most time. Set it up today — not next week, today. The setup takes 15–30 minutes. The time savings start immediately.`,
        reflection: `Which of the five workflows would have the biggest impact on your week? What is the one thing stopping you from setting it up right now?`,
        assignment: `Implement all five workflows over the next two weeks — one every 2–3 days. Track the time saved for each one. At the end of two weeks, calculate your total weekly time savings. Share your results with your cohort.`,
      },
      {
        slug: "ai-for-marketing",
        order: 3,
        title: "AI Marketing for Small Business: A Complete Walkthrough",
        duration: "25 min",
        content: `## AI Marketing for Small Business: A Complete Walkthrough

Marketing is where AI delivers some of its fastest and most visible results for small businesses. This lesson walks you through a complete AI marketing workflow — from understanding your customers to creating content to measuring what works.

---

### Step-by-Step Demo: Build Your Customer Persona with AI

Understanding your best customers is the foundation of effective marketing. AI can help you build a detailed customer persona in 10 minutes.

**Step 1 —** Open ChatGPT and type:

> *"Help me build a customer persona for my [type of business]. My typical customer is [describe what you know: age range, location, what they buy, why they come to you, what problems you solve for them]. Create a detailed persona including: demographics, goals, pain points, where they spend time online, what they read, and what would make them choose my business over a competitor."*

**Step 2 —** Review the persona. Add any details you know that the AI missed.

**Step 3 —** Save this persona. Every piece of marketing content you create should be written for this person.

---

### Step-by-Step Demo: Create a Month of Marketing Content

**Step 1 —** Open ChatGPT and type:

> *"I need a month of marketing content for my [type of business]. My customer persona is [paste your persona from above]. My business goal this month is [e.g., 'drive 20% more foot traffic' or 'increase online orders by 15%']. Create a 4-week content plan with: 2 social media posts per week, 2 email subject lines, and 1 blog post topic. For each piece of content, write the actual copy — not just the idea."*

**Step 2 —** Review the content. Edit for your brand voice.

**Step 3 —** Open Canva (free at canva.com).

**Step 4 —** Click "Create a design" → choose "Social Media Post" for your platform.

**Step 5 —** Use Canva's AI features: click "Magic Write" to generate text, or "Text to Image" to generate custom visuals.

**Step 6 —** Create visuals for each social post using Canva templates. This takes about 5 minutes per post once you have a template you like.

---

### Step-by-Step Demo: Set Up an AI Email Campaign

**Tool:** Mailchimp (free for up to 500 contacts) or Klaviyo (free for up to 250 contacts)

**Step 1 —** Log in to Mailchimp. Click "Create" → "Email."

**Step 2 —** Choose a template. Click "Edit" to customize.

**Step 3 —** In the email body, click "AI Content Generator" (Mailchimp's built-in AI tool). Type:

> *"Write a promotional email for [your business] offering [your promotion]. The audience is [describe them]. The goal is [e.g., 'drive them to book an appointment']. Tone: [friendly/professional/etc.]."*

**Step 4 —** Review and edit the generated email.

**Step 5 —** Set up a subject line A/B test: let Mailchimp test two different subject lines and automatically send the better-performing one to the rest of your list.

**Step 6 —** Schedule the email and send.

---

### Step-by-Step Demo: Measure What Works

**Step 1 —** After your email campaign, open Mailchimp's Reports section.

**Step 2 —** Look at: Open Rate (industry average is ~20%), Click Rate (industry average is ~2%), and Unsubscribe Rate (anything over 0.5% is a warning sign).

**Step 3 —** Open ChatGPT and type:

> *"My email campaign results were: Open Rate [X]%, Click Rate [X]%, Unsubscribe Rate [X]%. The subject line was [paste it]. The main offer was [describe it]. What do these results tell me? What should I do differently next time?"*

**Step 4 —** Apply the feedback to your next campaign.

---

### Try This Now: Your First AI Marketing Asset

Use the customer persona demo to build your persona right now. Then use it to write one social media post for this week. Compare it to your usual posts — does it feel more targeted? More compelling?`,
        reflection: `Looking at your current marketing, where is the biggest gap between what you are doing and what your customer persona actually wants to see? How would AI help you close that gap?`,
        assignment: `Build your customer persona using ChatGPT. Create a 4-week content plan with actual copy for each piece. Set up one email campaign in Mailchimp or Klaviyo using AI-generated content. Measure the results and bring your analysis to the next cohort session.`,
      },
      {
        slug: "ai-implementation-plan",
        order: 4,
        title: "Your Personal AI Implementation Plan",
        duration: "22 min",
        content: `## Your Personal AI Implementation Plan

This is the final lesson of the course. Everything you have learned only creates value when you act on it. This lesson walks you through building a complete, personalized AI implementation plan — and takes you through the first steps right now, before you close this tab.

---

### Step-by-Step Demo: Build Your Complete Implementation Plan

**Step 1 —** Gather your work from this course:
- Your AI Readiness Score (Module 2)
- Your top 3 use cases (Module 2)
- Your 90-day roadmap draft (Module 2)
- Your data audit findings (Module 3)
- Your AI Ethics Policy (Module 4)
- Your AI Adoption Tracker (Module 5)

**Step 2 —** Open ChatGPT and type:

> *"Help me finalize my AI implementation plan. Here is my situation:*
> *- Business: [type and size]*
> *- Readiness score: [your score]/20*
> *- Top 3 use cases: [list them]*
> *- Biggest data challenge: [describe it]*
> *- Team size and AI comfort level: [describe]*
> *- Monthly budget for AI tools: $[amount]*
> *- Hours available per week: [number]*
>
> *Create a complete 90-day implementation plan with: specific tools to use, a week-by-week action schedule for the first 30 days, success metrics for each use case, and a list of the top 3 risks and how to mitigate them."*

**Step 3 —** Review the plan. Customize it with your specific business details.

**Step 4 —** Add a "What I Will NOT Do" section. Type:

> *"Add a section to my plan listing 3 things I should avoid or defer — AI tools or projects that are not right for my business right now, and why."*

This is as important as the "what to do" section. Focus is your most valuable resource.

---

### Step-by-Step Demo: Your First 24 Hours

The most important moment in any implementation plan is the first 24 hours. Here is your action list for today:

**Action 1 — Set up your primary AI tool (15 minutes)**
If you have not already, set up ChatGPT with your custom instructions (from Module 2, Lesson 3). This takes 15 minutes and makes every future interaction more useful.

**Action 2 — Complete your first real task with AI (20 minutes)**
Pick the highest-value use case from your plan. Do it now, imperfectly. The goal is not a perfect output — it is building the habit of reaching for AI first.

**Action 3 — Share your plan with one person (5 minutes)**
Send your implementation plan to a colleague, a cohort member, or a trusted advisor. Accountability dramatically increases follow-through.

**Action 4 — Set a 30-day check-in (2 minutes)**
Put a calendar reminder for 30 days from today: "AI check-in — what is working, what is not, what is next?"

---

### The Habits That Separate Successful AI Adopters

Research on technology adoption consistently shows that the businesses that get the most value from AI share three habits:

**They start small and go deep.** One tool, used consistently and improved over time, delivers more value than five tools used occasionally.

**They measure results.** Not AI activity (how many prompts they wrote) but business outcomes (time saved, revenue generated, customer satisfaction improved).

**They learn in community.** The small business owners who make the fastest progress with AI are those who share what works, what does not, and what they are trying next. Use the network you have built in this course.

---

### Your Commitment to Your Cohort

Before you mark this lesson complete, write down and share with your cohort:

1. The one AI tool you are committing to use every day for the next 30 days
2. The one business metric you will use to measure whether it is working
3. The date of your 30-day check-in

This is not homework — it is the most important thing you can do to ensure this course changes your business.

---

### Congratulations

You have completed AI Literacy & Application for Small Business. You now have the knowledge, tools, and plan to use AI in ways that are practical, responsible, and genuinely valuable for your business. The technology will keep evolving. Your judgment, your relationships, and your commitment to learning will always be your greatest assets.

Go build something great.`,
        reflection: `What is the one thing you have learned in this course that you are most excited to apply? What is the one thing most likely to get in the way? How specifically will you address that obstacle?`,
        assignment: `Complete your full 90-Day AI Implementation Plan using the step-by-step demo. Complete all four First 24 Hours actions today. Share your plan and your 30-day commitment with your cohort. Schedule your 30-day check-in on your calendar right now.`,
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
