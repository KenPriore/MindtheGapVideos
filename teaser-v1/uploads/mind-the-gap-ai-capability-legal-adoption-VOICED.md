# Mind the gap: AI capability vs. legal adoption

Anthropic published its labor market impact research in March — theoretical AI capability plotted against observed adoption across 22 occupational categories. Legal sticks out like a broken spoke. High capability. Almost no adoption.

The score is roughly 7 out of 10\. At the occupation level, that's defensible. AI can perform or assist with much of what lawyers do. But the number obscures more than it reveals, because it treats legal as one job.

I wrote about this problem in March when I rebuilt Karpathy's AI job exposure map. Exposure scores are useful as screening tools — they tell you where to look. They don't tell you what you'll find. A 7/10 for "Legal" covers court reporters at 9, paralegals at 9, lawyers at 7, and judges at 5\. That's a lot of variation inside a single spoke on a chart.

Even that breakdown isn't granular enough. A lawyer who spends Monday morning triaging NDAs, Monday afternoon advising product on a new AI feature, and Tuesday negotiating a partnership agreement isn't doing one job. They're shifting between cognitive modes — different types of work with different relationships to AI.

That's the real shape of the gap.

## What the gap actually looks like

I've been building a framework that decomposes the in-house legal function into 10 task dimensions — things like contract review, regulatory compliance, legal operations, commercial deal work, and AI governance. Each dimension has a theoretical capability score and an observed adoption score, derived from practitioner research and industry data.

The range is dramatic. Contract review sits at 85% theoretical capability with 42% adoption. Legal research: 82% and 62%. Those are the Process dimensions — high volume, pattern-based, already mapped. AI has traction here because the workflows exist.

Then look at regulatory compliance: 75% theoretical, 25% adopted. Policy and governance advisory: 58% and 12%. AI deployment and governance — the function of legal teams governing AI while also using it — is 48% theoretical and 10% observed. These are the Judgment dimensions. The capability is real. The adoption is almost nonexistent.

The pattern holds across all 10 dimensions. Where the work is already structured, AI moves in. Where it requires contextual judgment, organizational trust, or institutional knowledge, it stalls. The technology isn't the constraint. The operating model is.

## Five modes, one lawyer

The occupation-level view misses something fundamental about in-house legal work. A privacy counsel doesn't just do privacy tasks. They build compliance programs (Architect mode), advise product teams on data risks (Counselor mode), process DPIAs at volume (Operator mode), and occasionally negotiate data processing agreements (Negotiator mode). Same person. Same day. Different cognitive demands.

I mapped this across 12 in-house roles and found five distinct modes that every in-house lawyer cycles through:

**Operator.** Template processing, contract triage, compliance filings, routine corporate actions. The machine work. AI has the most traction here — 80% average theoretical capability, 43% adoption. The gap is 37 points and closing.

**Counselor.** The advisory work. A product team brings a question about a new AI feature and the lawyer applies judgment about what's possible, what's risky, and how to structure it. 67% capability, 19% adoption. A 48-point gap. AI can surface the research. The determination stays human.

**Strategist.** Institutional pattern recognition — where is the regulatory environment heading, what does our contract portfolio say about concentration risk, how should we structure AI governance for the next three years. 57% capability, 17% adoption.

**Negotiator.** The relationship work. Reading the room, managing tension, knowing when to push and when to concede. 50% capability, 18% adoption. AI can prepare the talking points. It can't be in the room.

**Architect.** Builds durable systems — privacy programs, governance frameworks, compliance infrastructure, self-service contract tools. 51% capability, 14% adoption. The widest trust gap in the framework. This is Goldman Sachs' "last mile" problem applied to legal infrastructure: the capability exists, but lawyers don't trust AI to get the architecture right. They're not wrong to hesitate. When I looked at Databricks' OfficeQA research, Claude and GPT-5.1 scored below 45% on real enterprise document tasks while hitting 95% on academic benchmarks. The distance between what AI can theoretically do and what you'd actually delegate is widest where the stakes are structural.

Each mode has a different shape on the radar chart. Operator is a fat polygon — broad capability, decent adoption. Counselor is a thin spike — narrow but deep, with almost no real-world uptake. The same lawyer shifts between these shapes throughout a single day.

## Where this connects to the labor market data

The Anthropic research isn't just academic. Their paper found no systematic increase in unemployment for workers in highly exposed occupations since late 2022\. Reassuring, until you look at the entry data: a 14% drop in the rate at which 22-25 year olds are being hired into exposed occupations. Not displacement. A slowdown in entry.

That maps to what's happening in legal. I wrote last year about whether AI would replace junior lawyers or redefine their role, and the answer is coming into focus. Firms aren't firing associates. They're posting fewer positions. The Operator work that used to be the ladder junior lawyers climbed is increasingly handled by AI or smaller teams. The entry point is narrowing.

Anthropic's data also shows the most exposed workers are older, female, more educated, and higher-paid. In legal, that describes much of the in-house bar. The exposure isn't falling on the people you'd expect from headlines about blue-collar automation. It's concentrated in knowledge work — where the competence penalty (Fast Company's finding that using AI makes workers appear less capable to peers, hitting women and older workers hardest) creates resistance the exposure scores don't capture.

## The process intelligence problem

The reason adoption stalls in Counselor, Strategist, and Architect modes isn't that the AI can't help. It's that the organizational infrastructure to use it doesn't exist.

Operator work adopts AI because it's already mapped. There's a workflow. There's a template. There's a system of record. The work has been decomposed into steps, and AI slots into those steps. Contract review has CLM platforms. Legal research has established tools. Billing has been automated for a decade.

Counselor work has none of that. When a product team asks "can we use customer data to train this model," the answer lives in the lawyer's head — a synthesis of regulatory context, company risk appetite, prior decisions, relationship dynamics, and sector norms. That's not a workflow. That's judgment layered on institutional knowledge layered on trust.

The gap between Operator and Counselor adoption isn't a technology gap. It's a process intelligence gap. The work that adopts AI is the work that was already visible, already structured, already measurable. The work that resists AI is the work that was never mapped in the first place.

This creates a compounding problem. I've written about the fluency gap — how early AI adopters build institutional knowledge that becomes a competitive moat, widening the distance from organizations that wait. The same dynamic applies within a legal department. Teams that map their Counselor and Architect workflows now can adopt AI in those modes as the technology matures. Teams that only automate Operator work will find themselves efficient at the tasks that matter least and unprepared for AI in the tasks that matter most.

## What this means for legal leaders

If you run an in-house legal team, the Anthropic chart should make you uncomfortable. The 7/10 isn't wrong. It hides the real question: which parts of your team's work are ready for AI, and which parts need operational infrastructure before AI can even be useful?

The answer depends on your role mix and which modes dominate. A team heavy on commercial deal work has a different AI readiness profile than a team heavy on regulatory compliance and policy advisory. Same profession, different shapes — and different investment priorities.

The investment that matters most right now isn't in AI tools. It's in making the invisible work visible — documenting how Counselors actually make decisions, mapping the judgment patterns Architects apply when they build governance frameworks, creating the process infrastructure that turns institutional knowledge into something AI could eventually support.

The shape of the gap is the strategy.

---

*Ken Priore is Deputy General Counsel at Docusign. He writes about AI governance, legal operations, and the organizational design problems that sit underneath technology adoption. More at [kenpriore.com](http://kenpriore.com).*  
