# agent.md — Source Usage & Narrative Integration Protocol

This agent enforces **evidence-driven, chapter-aligned, protocol-compliant writing**.

It must ALWAYS operate in this order:

1. Read `chapters.md` → understand the chapter’s role  
2. Read `book_writing_protocol.md` → align with epistemic discipline  
3. Read `llm_writing_behavior.md` → enforce writing behavior constraints  
4. Scan `/sources`  
5. Scan `/sources/telegram`  
6. Write or validate content  

If steps 1–3 are skipped, the output is invalid.

---

## 0. Behavioral Constraints (llm_writing_behavior.md)

This layer enforces how writing is performed at a micro level:

- Think before writing (no silent assumptions)
- Prefer simplicity over over-engineering
- Make surgical changes (no unnecessary rewrites)
- Work goal-driven (each section has a verifiable purpose)

These rules override stylistic preferences.

If a passage:
- is overly complex
- introduces unnecessary elements
- drifts from the task

→ it must be simplified or rewritten.

## 1. Chapter-First Discipline (MANDATORY)

Before writing:

- Identify the current chapter
- Read its section in `chapters.md`
- Extract:

  - **Objective** → what must be demonstrated  
  - **Function** → why this chapter exists  
  - **Narrative shift** → what changes compared to previous chapters  

### Hard Rule

Do NOT produce:

- generic explanations  
- isolated facts  
- standalone analysis  

Everything must serve the chapter’s role in the overall arc.

---

## 2. Protocol Alignment (book_writing_protocol.md)

Before using any source or drafting:

- Apply the principles from `book_writing_protocol.md`

Key enforced behaviors:

### A. Think Before Writing

- State assumptions  
- Surface ambiguity  
- Do not resolve contradictions prematurely  

### B. Evidence First

- Distinguish:
  - verified facts
  - actor claims
  - external assessments  

- Never present self-description as objective truth  

---

### C. Simplicity & Precision

- Avoid over-explaining  
- Avoid narrative inflation  
- Remove non-functional paragraphs  

---

### D. Contradictions Are Signals

Do NOT smooth tensions such as:

- hooligan autonomy vs state control  
- ideology vs pragmatism  
- volunteer identity vs institutional integration  

These are structural, not accidental.

---

### E. Source-Aware Writing

Always consider:

- origin  
- bias  
- intent  

Write **from sources, not as sources**.

---

## 3. Source-First Writing

After aligning with chapter + protocol:

- Scan `/sources`
- Identify:

  - supporting evidence  
  - contradictory elements  
  - structural insights  

**Rule:** No important claim should exist without checking if a source can deepen or challenge it.

---

## 4. How Sources Must Be Used

Sources must **change the argument**, not decorate it.

---

### A. Strengthen the Thesis

Example:

- Hooliganism as a “cult of violence” :contentReference[oaicite:0]{index=0}  

Shift narrative:

→ from transformation  
→ to continuity (proto-military culture)

---

### B. Expand the Scope

Example:

- Eurasian hooligan radicalization patterns :contentReference[oaicite:1]{index=1}  

Shift:

→ Española = case study  
→ not exception  

---

### C. Deepen Causality

Example:

- war as release valve :contentReference[oaicite:2]{index=2}  

Layer:

- surface → recruitment  
- underlying → identity + violence demand  

---

### D. Introduce Temporal Structure

Example:

- 2014 ideological phase → later institutionalization :contentReference[oaicite:3]{index=3}  

Avoid flattening timelines.

---

### E. Validate Without Overclaiming

Example:

- Española as evolving paramilitary structure :contentReference[oaicite:4]{index=4}  

Support facts without overstating uniqueness.

---

### F. Extend Implications

Example:

- returning fighters as domestic risk :contentReference[oaicite:5]{index=5}  

Primarily for:

- final chapters  
- epilogue  

---

## 5. Chapter-Aligned Source Injection

Sources must match chapter function:

- Early → structure (culture, identity)  
- Middle → mechanisms (war, recruitment, organization)  
- Late → implications (state, control, aftermath)  

**Rule:** Misaligned sourcing weakens the chapter.

---

## 6. Telegram Sources (telegram)

Telegram = **internal voice layer**, not objective truth.

---

### 6.1 Extract

#### A. Battlefield Scenes

- drones, ambushes, mobility  

Convert:

→ concepts into scenes  

---

#### B. Subcultural Continuity

- performance language  
- collective identity  

Show:

→ mindset continuity  

---

#### C. Hybrid Identity

- tech + masculinity + heroism  

Support:

→ “tech-enabled street warrior”  

---

#### D. Fundraising

- explicit drone funding  

Reveal:

→ conscious civilian support  

---

### 6.2 What Telegram Adds

- normalization of violence  
- real-time myth-making  
- operational discourse  

---

### 6.3 Constraint

Telegram is:

- curated  
- partial  

Use for:

- tone  
- narrative texture  

NOT for:

- standalone factual validation  

---

## 7. Telegram Integration Pattern

1. Analytical paragraph  
2. Short excerpt (1–2 lines max)  
3. Interpretation  

Avoid:

- overuse  
- narrative dependence  

---

## 8. Integration Rule (CRITICAL)

Each section must include:

- ≥1 source that:
  - deepens causality OR
  - expands scope OR
  - challenges framing  

- ≥1 grounding element:
  - scene, example, or concrete detail  

---

## 9. Final Validation Checklist

### Chapter Alignment

- Does it fulfill the chapter’s role?

### Protocol Compliance

- Are contradictions preserved?
- Is ambiguity acknowledged?

### Source Use

- Are sources:
  - interpreted?
  - integrated?

### Telegram Use

- Is it:
  - sparse?
  - purposeful?

### Narrative Integrity

- Does it avoid simplification?

---

## 10. Failure Modes

Reject or rewrite if:

- Too generic → could apply anywhere  
- Too smooth → contradictions removed  
- Too narrative-driven → weak sourcing  
- Too Telegram-driven → propaganda leakage  

---

## Core Principle

Writing must follow:

**Chapter intent → Protocol discipline → Source insight → Narrative construction**

NOT:

**Narrative → sources added afterward**

---

## Final Reminder

This book is not about describing Española.

It is about explaining:

→ how subcultural violence becomes militarized  
→ how it becomes usable by the state  
→ and why it eventually becomes a liability
