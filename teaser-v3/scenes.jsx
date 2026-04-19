/* Mind the Gap — animated video scenes.
   Swiss International Style. 1920x1080. ~72s total.
   FOCUS: 12 in-house legal ROLES (not modes). */

const _C = {
  white: '#FFFFFF', black: '#000000',
  red: '#FF0000', blue: '#0057B8',
  paper: '#F4F1EB', ink: '#0A0A0A',
};
// C.red dynamically resolves to the current accent tweak; other colors pass through.
const C = new Proxy(_C, {
  get(target, prop) {
    if (prop === 'red') return (window.__TWEAKS && window.__TWEAKS.accent) || _C.red;
    return target[prop];
  }
});
const AC = () => C.red;
const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* ── 12 in-house roles, each with a dominant gap & tension ── */
// Derived from research data (PracticeArea + Mode mixes)
// Each role has a unique shape across 7 modes: Operate, Counsel, Strategize,
// Negotiate, Argue, Teach, Govern. Values 0–100 for capability / adoption.
const MODE_AXES = ['Operate', 'Counsel', 'Strategize', 'Negotiate', 'Argue', 'Teach', 'Govern'];
const ROLES = [
  { id: 'emp',  name: 'Employment / HR',    cap: 68, adopt: 34, tension: 'Volume vs. Sensitivity',   color: '#0057B8',
    capShape: [85, 60, 50, 72, 45, 55, 70], adoptShape: [60, 28, 18, 42, 15, 32, 38] },
  { id: 'ip',   name: 'IP / Patent',        cap: 74, adopt: 31, tension: 'Precision vs. Speed',      color: '#6A1B9A',
    capShape: [88, 72, 60, 55, 78, 45, 70], adoptShape: [55, 30, 18, 32, 40, 22, 28] },
  { id: 'corp', name: 'Corporate / Sec',    cap: 72, adopt: 44, tension: 'Compliance vs. Agility',   color: '#0057B8',
    capShape: [90, 65, 68, 70, 30, 50, 85], adoptShape: [72, 42, 38, 50, 15, 32, 58] },
  { id: 'lit',  name: 'Litigation',         cap: 58, adopt: 22, tension: 'Risk vs. Cost',            color: '#333333',
    capShape: [70, 55, 60, 50, 85, 40, 45], adoptShape: [42, 18, 15, 22, 32, 15, 18] },
  { id: 'prod', name: 'Product Counsel',    cap: 65, adopt: 17, tension: 'Innovation vs. Safety',    color: '#D35400',
    capShape: [55, 82, 78, 60, 25, 70, 75], adoptShape: [30, 22, 12, 18, 8, 20, 18] },
  { id: 'com',  name: 'Commercial',         cap: 78, adopt: 40, tension: 'Velocity vs. Protection',  color: '#2E7D32',
    capShape: [92, 70, 55, 88, 35, 45, 62], adoptShape: [78, 40, 28, 58, 12, 32, 32] },
  { id: 'priv', name: 'Privacy / Data',     cap: 70, adopt: 20, tension: 'Trust vs. Utility',        color: '#6A1B9A',
    capShape: [65, 75, 80, 45, 35, 60, 92], adoptShape: [38, 22, 15, 18, 10, 22, 25] },
  { id: 'reg',  name: 'Reg / Compliance',   cap: 75, adopt: 25, tension: 'Rules vs. Reality',        color: '#D35400',
    capShape: [80, 70, 72, 40, 45, 55, 92], adoptShape: [45, 25, 22, 18, 20, 22, 32] },
  { id: 'pol',  name: 'Policy / Gov Aff',   cap: 58, adopt: 12, tension: 'Influence vs. Impact',     color: '#2E7D32',
    capShape: [50, 75, 82, 60, 55, 68, 70], adoptShape: [18, 12, 10, 12, 8, 15, 14] },
  { id: 'gc',   name: 'GC / CLO',           cap: 55, adopt: 15, tension: 'Strategy vs. Crisis',      color: '#333333',
    capShape: [45, 80, 92, 60, 55, 50, 80], adoptShape: [20, 18, 12, 15, 10, 12, 22] },
  { id: 'eng',  name: 'Legal Engineer',     cap: 62, adopt: 18, tension: 'Process vs. Practice',     color: '#0057B8',
    capShape: [92, 40, 60, 35, 15, 75, 85], adoptShape: [35, 12, 15, 10, 8, 22, 28] },
  { id: 'aig',  name: 'AI Gov Lead',        cap: 48, adopt: 10, tension: 'Governance vs. Growth',    color: '#D35400',
    capShape: [50, 65, 75, 40, 30, 60, 88], adoptShape: [15, 10, 8, 6, 4, 10, 18] },
];

/* ── Scene timing (start, duration) ─────────────────────── */
const T = {
  title:     [0,    5],
  premise:   [5,    5],
  radar:     [10,   7],
  seven:     [17,   5],
  roles:     [22,   7],
  spotlight: [29,   30],
  modes:     [59,   7],
  process:   [66,   6],
  fluency:   [72,   6],
  pipeline:  [78,   6],
  takeaway:  [84,   5],
  cta:       [89,   5],
};
const TOTAL = 94;

// Spotlight roles (5 representatives across the range)
const SPOT = ['com', 'prod', 'priv', 'gc', 'aig'].map(id => ROLES.find(r => r.id === id));
const SPOT_NOTES = {
  com:  'Standard templates, velocity pressure. AI already drafts 6-80× faster. The gap is narrowing.',
  prod: 'Advising product teams on AI features. Judgment layered on sector norms. The gap is widening.',
  priv: 'Programs, frameworks, DPIAs. The widest trust gap — lawyers won\'t delegate architecture.',
  gc:   'Strategy, crisis, pattern recognition across the business. The work that never gets mapped.',
  aig:  'Governing AI while using it. The meta-function. Newest domain. Smallest adoption.',
};

/* ── Shared chrome ──────────────────────────────────────── */
const Chrome = ({ label, color = C.black }) => (
  <div className="scene-chrome">
    <div style={{ position: 'absolute', top: 48, left: 120, right: 120, display: 'flex', justifyContent: 'space-between',
      fontFamily: FONT, fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color }}>
      <span>Mind the Gap</span>
      <span style={{ opacity: 0.55 }}>{label}</span>
    </div>
    <div style={{ position: 'absolute', top: 80, left: 120, right: 120, height: 1, background: color, opacity: 0.35 }} />
  </div>
);

const Tick = ({ color = C.black }) => {
  const { time } = useTimeline();
  return (
    <div className="scene-tick" style={{ position: 'absolute', bottom: 48, left: 120, right: 120,
      fontFamily: FONT, fontSize: 12, fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color, opacity: 0.5,
      display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${color}`, paddingTop: 16 }}>
      <span>Ken Priore · kenpriore.ai</span>
      <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
        {String(time.toFixed(2)).padStart(5, '0')} / {TOTAL.toFixed(2)}
      </span>
    </div>
  );
};

/* ── 1. Title ───────────────────────────────────────────── */
const TitleScene = () => {
  const { localTime } = useSprite();
  const reveal = (delay) => {
    const t = clamp((localTime - delay) / 0.55, 0, 1);
    const e = Easing.easeOutCubic(t);
    return { opacity: e, transform: `translateY(${(1 - e) * 80}px)` };
  };
  const dot = clamp((localTime - 2.2) / 0.6, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.white, color: C.black, fontFamily: FONT }}>
      <Chrome label="A video intro · 01 / 12" />
      <div style={{ position: 'absolute', left: 120, top: 180, fontSize: 280, fontWeight: 900, lineHeight: 0.82, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
        <div style={reveal(0)}>MIND</div>
        <div style={reveal(0.3)}>THE</div>
        <div style={{ ...reveal(0.6), display: 'flex', alignItems: 'baseline' }}>
          <span>GAP</span>
          <span style={{ color: C.red, transform: `scale(${Easing.easeOutBack(dot)})`, display: 'inline-block', transformOrigin: 'left' }}>.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 120, top: 220, width: 520, borderLeft: `1px solid ${C.black}`, paddingLeft: 32,
        ...reveal(1.2) }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 24 }}>
          AI capability vs. legal adoption
        </div>
        <div style={{ fontSize: 42, fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          <span style={{ fontStyle: 'italic', fontWeight: 700 }}>Twelve roles, twelve gaps.</span>
        </div>
      </div>
      <Tick />
    </div>
  );
};

/* ── 2. Premise ─────────────────────────────────────────── */
const PremiseScene = () => {
  const { localTime } = useSprite();
  const line1 = clamp((localTime - 0) / 0.7, 0, 1);
  const line2 = clamp((localTime - 0.5) / 0.7, 0, 1);
  const line3 = clamp((localTime - 1.0) / 0.7, 0, 1);
  const stat = clamp((localTime - 2.2) / 0.8, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.white, color: C.black, fontFamily: FONT }}>
      <Chrome label="02 · Anthropic Economic Index, 2026" />
      <div style={{ position: 'absolute', left: 120, top: 180, right: 120 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 36, opacity: line1 }}>
          Fig 01 — The setup
        </div>
        <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.035em', textTransform: 'uppercase' }}>
          <div style={{ opacity: line1, transform: `translateY(${(1 - line1) * 24}px)` }}>In March, Anthropic mapped</div>
          <div style={{ opacity: line2, transform: `translateY(${(1 - line2) * 24}px)` }}>
            AI <span style={{ color: C.blue }}>capability</span> against
          </div>
          <div style={{ opacity: line3, transform: `translateY(${(1 - line3) * 24}px)` }}>
            observed <span style={{ color: C.red }}>adoption.</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 120, right: 120, bottom: 140,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${C.black}`, paddingTop: 20 }}>
        {[['2M', 'Claude conversations'], ['22', 'Occupational categories'], ['1', 'Jagged frontier']].map(([n, l], i) => (
          <div key={i} style={{ opacity: stat, transform: `translateY(${(1 - stat) * 20}px)` }}>
            <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 8, opacity: 0.7 }}>{l}</div>
          </div>
        ))}
      </div>
      <Tick />
    </div>
  );
};

/* ── 2b. Hero radar — the Anthropic visual ──────────────── */
const RadarScene = () => {
  const { localTime, duration } = useSprite();
  const label = clamp(localTime / 0.7, 0, 1);
  const title = clamp((localTime - 0.3) / 0.7, 0, 1);
  const imgIn = Easing.easeOutCubic(clamp((localTime - 0.6) / 1.2, 0, 1));
  const ring = clamp((localTime - 2.6) / 0.7, 0, 1);
  const arrow = clamp((localTime - 3.2) / 0.7, 0, 1);
  const caption = clamp((localTime - 4.0) / 0.8, 0, 1);
  // Slow pan-in on the radar image
  const pan = Easing.easeOutCubic(clamp(localTime / duration, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.paper, color: C.black, fontFamily: FONT }}>
      <Chrome label="03 · The headline chart" />
      {/* Side label */}
      <div style={{ position: 'absolute', left: 120, top: 150, width: 420 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: label, marginBottom: 16 }}>
          Anthropic · Economic Index · Fig 01
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase',
          opacity: title, transform: `translateY(${(1-title)*20}px)` }}>
          Theoretical<br/><span style={{ color: C.blue }}>capability</span><br/>vs. observed<br/><span style={{ color: C.red }}>usage.</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 18, fontWeight: 400, lineHeight: 1.4, opacity: 0.65 * caption }}>
          Across 22 occupational categories, a single outlier has the widest gap between what the models can do and what practitioners actually use them for.
        </div>
        <div style={{ marginTop: 32, borderTop: `1px solid ${C.black}`, paddingTop: 16, opacity: caption }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 6 }}>
            → That outlier
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, color: C.red }}>
            Legal.
          </div>
        </div>
      </div>
      {/* Radar image — letterboxed right side */}
      <div style={{ position: 'absolute', left: 620, right: 120, top: 120, bottom: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%',
          opacity: imgIn, transform: `scale(${0.94 + imgIn * 0.06 + pan * 0.02})` }}>
          <img src="assets/anthropic-radar.png" alt="Anthropic occupational radar chart"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
          {/* Legal callout ring — Legal label sits mid-right, slightly below center */}
          <div style={{ position: 'absolute', top: '58%', left: '78%', width: 130, height: 90,
            border: `3px solid ${C.red}`, borderRadius: '50%', transform: `translate(-50%, -50%) scale(${0.5 + ring * 0.5})`,
            opacity: ring, boxShadow: `0 0 0 6px rgba(255,0,0,${ring * 0.12})` }} />
          {/* Arrow + label */}
          <div style={{ position: 'absolute', top: '50%', left: '86%',
            fontSize: 22, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.red,
            opacity: arrow, transform: `translate(-50%, -50%) translateX(${(1-arrow) * 30}px)`,
            display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
            <span>Legal</span>
          </div>
        </div>
      </div>
      <Tick />
    </div>
  );
};

/* ── 3. Seven out of ten ────────────────────────────────── */
const SevenScene = () => {
  const { localTime, duration } = useSprite();
  const countP = Easing.easeOutCubic(clamp(localTime / 1.4, 0, 1));
  const n = (countP * 7).toFixed(1);
  const outOf = clamp((localTime - 1.2) / 0.6, 0, 1);
  const label = clamp((localTime - 2.0) / 0.8, 0, 1);
  const kicker = clamp((localTime - 3.2) / 0.8, 0, 1);
  const scaleOut = localTime > duration - 0.6 ? Easing.easeInCubic((localTime - (duration - 0.6)) / 0.6) : 0;
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.black, color: C.white, fontFamily: FONT }}>
      <Chrome label="04 · The headline number" color={C.white} />
      <div style={{ position: 'absolute', inset: `180px 120px 160px 120px`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.55 * label, marginBottom: 24 }}>
            Legal — occupation-level score
          </div>
          <div style={{ fontSize: 520, fontWeight: 900, lineHeight: 0.82, letterSpacing: '-0.06em', display: 'flex', alignItems: 'baseline',
            transform: `scale(${1 - scaleOut * 0.1})`, transformOrigin: 'left bottom' }}>
            <span>{n}</span>
            <span style={{ fontSize: 180, opacity: 0.45 * outOf, transform: `translateX(${(1 - outOf) * 40}px)` }}>/10</span>
          </div>
        </div>
        <div style={{ opacity: kicker, transform: `translateX(${(1 - kicker) * 40}px)` }}>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase' }}>
            Legal <span style={{ color: C.red }}>sticks out</span> like a broken spoke.
          </div>
          <div style={{ marginTop: 36, fontSize: 30, fontWeight: 300, lineHeight: 1.3, opacity: 0.8 }}>
            High theoretical capability. Almost no observed adoption.
          </div>
        </div>
      </div>
      <Tick color={C.white} />
    </div>
  );
};

/* ── 4. Chart evidence ──────────────────────────────────── */
const ChartScene = () => {
  const { localTime } = useSprite();
  const title = clamp(localTime / 0.7, 0, 1);
  const chart = clamp((localTime - 0.5) / 1.0, 0, 1);
  const bar1 = clamp((localTime - 2.0) / 1.2, 0, 1);
  const bar2 = clamp((localTime - 2.6) / 1.2, 0, 1);
  const annot = clamp((localTime - 4.0) / 0.8, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.paper, color: C.black, fontFamily: FONT }}>
      <Chrome label="05 · Fig 02 — Capability vs. Adoption" />
      <div style={{ position: 'absolute', left: 120, top: 160, right: 120, bottom: 140, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase',
            opacity: title, transform: `translateY(${(1 - title) * 24}px)` }}>
            The data is <span style={{ color: C.red, fontStyle: 'italic' }}>right there.</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ borderTop: `2px solid ${C.black}`, paddingTop: 16, opacity: bar1 }}>
              <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>Capability</div>
              <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: C.blue }}>
                {Math.round(bar1 * 85)}<span style={{ fontSize: 48 }}>%</span>
              </div>
              <div style={{ height: 6, background: '#ddd', marginTop: 12 }}>
                <div style={{ width: `${bar1 * 85}%`, height: '100%', background: C.blue }} />
              </div>
            </div>
            <div style={{ borderTop: `2px solid ${C.black}`, paddingTop: 16, opacity: bar2 }}>
              <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>Adoption</div>
              <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: C.red }}>
                {Math.round(bar2 * 17)}<span style={{ fontSize: 48 }}>%</span>
              </div>
              <div style={{ height: 6, background: '#ddd', marginTop: 12 }}>
                <div style={{ width: `${bar2 * 17}%`, height: '100%', background: C.red }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ border: `1px solid ${C.black}`, background: C.white, padding: 20, display: 'flex', flexDirection: 'column',
          opacity: chart, transform: `scale(${0.94 + chart * 0.06})`, transformOrigin: 'center' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
            <img src="assets/anthropic-radar.png" alt=""
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(1) contrast(1.15)' }} />
            <div style={{ position: 'absolute', top: '48%', left: '70%', width: 180, height: 180, border: `3px solid ${C.red}`,
              borderRadius: '50%', opacity: annot, transform: `translate(-50%, -50%) scale(${0.6 + annot * 0.4})`, pointerEvents: 'none',
              boxShadow: `0 0 0 ${annot * 8}px rgba(255,0,0,0.10)` }} />
            <div style={{ position: 'absolute', top: '40%', left: '88%', fontSize: 18, fontWeight: 900, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: C.red, opacity: annot, transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap' }}>
              Legal →
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.black}`, marginTop: 12, paddingTop: 10, fontSize: 12, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
            <span>Fig 02</span><span style={{ fontWeight: 400, opacity: 0.7 }}>Anthropic · 2026</span>
          </div>
        </div>
      </div>
      <Tick />
    </div>
  );
};

/* ── 5. Not one job ─────────────────────────────────────── */
const NotOneJobScene = () => {
  const { localTime } = useSprite();
  const wipe = Easing.easeInOutCubic(clamp(localTime / 0.6, 0, 1));
  const l1 = clamp((localTime - 0.5) / 0.6, 0, 1);
  const l2 = clamp((localTime - 0.9) / 0.6, 0, 1);
  const strike = clamp((localTime - 1.6) / 0.5, 0, 1);
  const l3 = clamp((localTime - 2.0) / 0.6, 0, 1);
  const list = clamp((localTime - 3.0) / 0.8, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.white, color: C.white, fontFamily: FONT, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: C.red, clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)` }} />
      <Chrome label="06 · The reframe" color={C.white} />
      <div style={{ position: 'absolute', left: 120, right: 120, top: 220 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 32, opacity: l1 }}>
          But the problem —
        </div>
        <div style={{ fontSize: 180, fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
          <div style={{ opacity: l1, transform: `translateY(${(1-l1)*30}px)` }}>The 7/10</div>
          <div style={{ opacity: l2, transform: `translateY(${(1-l2)*30}px)` }}>
            treats <span style={{ position: 'relative', display: 'inline-block' }}>
              legal
              <span style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 10, background: C.white,
                width: `${strike * 100}%`, transformOrigin: 'left' }} />
            </span> as
          </div>
          <div style={{ opacity: l3, transform: `translateY(${(1-l3)*30}px)` }}>
            <span style={{ fontStyle: 'italic' }}>one job.</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 120, right: 120, borderTop: `1px solid ${C.white}`, paddingTop: 20,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, fontSize: 20, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: list }}>
        {[['Court reporters', 9], ['Paralegals', 9], ['Lawyers', 7], ['Judges', 5]].map(([role, n]) => (
          <div key={role} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.white}`, paddingBottom: 8 }}>
            <span>{role}</span><span style={{ fontWeight: 900 }}>{n}</span>
          </div>
        ))}
      </div>
      <Tick color={C.white} />
    </div>
  );
};

/* ── 6. 12 in-house roles — MASTER GRID ─────────────────── */
const RolesGridScene = () => {
  const { localTime } = useSprite();
  const title = clamp(localTime / 0.8, 0, 1);
  const sub = clamp((localTime - 0.6) / 0.6, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.white, color: C.black, fontFamily: FONT }}>
      <Chrome label="05 · Fig 03 — Twelve in-house roles" />
      <div style={{ position: 'absolute', left: 120, top: 140, fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: title }}>
        Inside the 7/10
      </div>
      <div style={{ position: 'absolute', left: 120, top: 180, right: 120, fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase',
        opacity: title, transform: `translateY(${(1-title)*24}px)` }}>
        Twelve <span style={{ color: C.red }}>roles.</span> Twelve different shapes.
      </div>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 420, bottom: 160,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', border: `1px solid ${C.black}`, opacity: sub }}>
        {ROLES.map((r, i) => {
          const enter = clamp((localTime - 1.0 - i * 0.12) / 0.5, 0, 1);
          const gap = r.cap - r.adopt;
          // normalize bar widths within grid cell (max ~85)
          return (
            <div key={r.id} style={{
              padding: 18,
              borderRight: (i % 4 < 3) ? `1px solid ${C.black}` : 'none',
              borderBottom: (i < 8) ? `1px solid ${C.black}` : 'none',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              opacity: enter, transform: `translateY(${(1 - enter) * 16}px)`, background: C.white,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, background: r.color }} />
                  <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5 }}>{String(i+1).padStart(2,'0')}</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', lineHeight: 1 }}>
                  {r.name}
                </div>
              </div>
              <div>
                <div style={{ height: 4, background: '#eee', marginBottom: 3 }}>
                  <div style={{ width: `${r.cap * enter}%`, height: '100%', background: C.blue }} />
                </div>
                <div style={{ height: 4, background: '#eee', marginBottom: 8 }}>
                  <div style={{ width: `${r.adopt * enter}%`, height: '100%', background: C.red }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  <span style={{ opacity: 0.55 }}>Gap</span>
                  <span style={{ color: r.color }}>{gap} pts</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Tick />
    </div>
  );
};

/* ── 7. Role spotlights (sub-scenes) ────────────────────── */

// 12-job radar — axes are all 12 in-house jobs. Two polygons:
// capability across all 12 jobs, and adoption across all 12 jobs.
// The currently-spotlighted job is highlighted.
const RoleRadar = ({ role, capProg = 1, adoptProg = 1, size = 520 }) => {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 95;
  const n = ROLES.length; // 12
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i, v) => {
    const rad = (v / 100) * r;
    return [cx + Math.cos(angle(i)) * rad, cy + Math.sin(angle(i)) * rad];
  };
  const capPoly = ROLES.map((ro, i) => pt(i, ro.cap * capProg).join(',')).join(' ');
  const adoptPoly = ROLES.map((ro, i) => pt(i, ro.adopt * adoptProg).join(',')).join(' ');
  const grid = [20, 40, 60, 80, 100];
  const highlightIdx = ROLES.findIndex(r => r.id === role.id);
  const SHORT = {
    emp: 'Employment', ip: 'IP / Patent', corp: 'Corporate', lit: 'Litigation',
    prod: 'Product', com: 'Commercial', priv: 'Privacy', reg: 'Compliance',
    pol: 'Policy', gc: 'GC / CLO', eng: 'Legal Eng', aig: 'AI Gov'
  };
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      {grid.map(g => (
        <polygon key={g}
          points={ROLES.map((_, i) => pt(i, g).join(',')).join(' ')}
          fill="none" stroke={C.black} strokeOpacity={g === 100 ? 0.45 : 0.10} strokeWidth={g === 100 ? 1.5 : 1} />
      ))}
      {ROLES.map((ro, i) => {
        const [x, y] = pt(i, 100);
        const isHi = i === highlightIdx;
        return <line key={ro.id} x1={cx} y1={cy} x2={x} y2={y}
          stroke={isHi ? role.color : C.black}
          strokeOpacity={isHi ? 0.9 : 0.12}
          strokeWidth={isHi ? 2 : 1} />;
      })}
      <polygon points={capPoly}
        fill={C.blue} fillOpacity={0.15} stroke={C.blue} strokeWidth={2.5} strokeLinejoin="round" />
      <polygon points={adoptPoly}
        fill={C.red} fillOpacity={0.25} stroke={C.red} strokeWidth={2.5} strokeLinejoin="round" />
      {ROLES.map((ro, i) => {
        const [x1, y1] = pt(i, ro.cap * capProg);
        return <circle key={`c${ro.id}`} cx={x1} cy={y1} r={i === highlightIdx ? 6 : 3} fill={C.blue}
          stroke={i === highlightIdx ? C.white : 'none'} strokeWidth={i === highlightIdx ? 2 : 0} />;
      })}
      {ROLES.map((ro, i) => {
        const [ax, ay] = pt(i, ro.adopt * adoptProg);
        return <circle key={`a${ro.id}`} cx={ax} cy={ay} r={i === highlightIdx ? 6 : 3} fill={C.red}
          stroke={i === highlightIdx ? C.white : 'none'} strokeWidth={i === highlightIdx ? 2 : 0} />;
      })}
      {ROLES.map((ro, i) => {
        const [lx, ly] = pt(i, 118);
        const isHi = i === highlightIdx;
        return (
          <text key={`l${ro.id}`} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            style={{
              fontSize: isHi ? 13 : 11,
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fill: isHi ? role.color : C.black,
              opacity: isHi ? 1 : 0.6,
            }}>
            {SHORT[ro.id]}
          </text>
        );
      })}
      {(() => {
        const [hx, hy] = pt(highlightIdx, 100);
        return (
          <>
            <circle cx={hx} cy={hy} r={14} fill="none" stroke={role.color} strokeWidth={2} opacity={0.6} />
            <circle cx={hx} cy={hy} r={22} fill="none" stroke={role.color} strokeWidth={1.2} opacity={0.3} />
          </>
        );
      })()}
    </svg>
  );
};

const RoleSpotlight = ({ role, note, spotStart, spotDur, idx, total }) => {
  const { time } = useTimeline();
  const localTime = time - spotStart;
  if (localTime < 0 || localTime > spotDur) return null;
  const name = clamp(localTime / 0.6, 0, 1);
  const tension = clamp((localTime - 0.4) / 0.5, 0, 1);
  const radarFade = clamp((localTime - 0.9) / 0.5, 0, 1);
  const capP = Easing.easeOutCubic(clamp((localTime - 1.0) / 1.4, 0, 1));
  const adoptP = Easing.easeOutCubic(clamp((localTime - 1.6) / 1.6, 0, 1));
  const gapP = clamp((localTime - 3.4) / 0.6, 0, 1);
  const noteP = clamp((localTime - 4.0) / 0.8, 0, 1);
  const gap = role.cap - role.adopt;
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.white, color: C.black, fontFamily: FONT }}>
      <Chrome label={`Spotlight 0${idx} / 0${total} — ${role.name}`} />
      {/* colored rail */}
      <div style={{ position: 'absolute', top: 100, bottom: 100, left: 120, width: 120, background: role.color }} />
      <div style={{ position: 'absolute', left: 120 + 24, top: 140, color: C.white, fontSize: 12, fontWeight: 900,
        letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
        Role · 0{idx}
      </div>

      {/* Left content column */}
      <div style={{ position: 'absolute', left: 300, top: 160, width: 760, bottom: 140 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: role.color, opacity: tension, marginBottom: 12 }}>
          Tension · {role.tension}
        </div>
        <div style={{ fontSize: role.name.length > 14 ? 110 : 130, fontWeight: 900, lineHeight: 0.82, letterSpacing: '-0.05em', textTransform: 'uppercase',
          opacity: name, transform: `translateY(${(1-name)*40}px)` }}>
          {role.name}
        </div>
        <div style={{ marginTop: 36, fontSize: 44, fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em',
          opacity: radarFade, transform: `translateY(${(1-radarFade)*16}px)`, maxWidth: 720 }}>
          {note}
        </div>

        {/* Stats strip */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0, borderTop: `1px solid ${C.black}`, paddingTop: 14,
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 4 }}>Capability</div>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.02em', color: C.blue, lineHeight: 1 }}>
              {Math.round(capP * role.cap)}<span style={{ fontSize: 20, opacity: 0.6 }}>%</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 4 }}>Adoption</div>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.02em', color: C.red, lineHeight: 1 }}>
              {Math.round(adoptP * role.adopt)}<span style={{ fontSize: 20, opacity: 0.6 }}>%</span>
            </div>
          </div>
          <div style={{ opacity: gapP }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 4 }}>Gap</div>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.02em', color: role.color, lineHeight: 1 }}>
              {gap}<span style={{ fontSize: 20, opacity: 0.6 }}> pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column — role-specific radar */}
      <div style={{ position: 'absolute', right: 120, top: 140, bottom: 120, width: 620,
        display: 'flex', flexDirection: 'column', opacity: radarFade }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Fig · Role shape
          </div>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.55 }}>
            12 jobs · {role.name} highlighted
          </div>
        </div>
        <div style={{ flex: 1, border: `1px solid ${C.black}`, background: C.paper, padding: 16, position: 'relative' }}>
          <RoleRadar role={role} capProg={capP} adoptProg={adoptP} />
        </div>
        {/* legend */}
        <div style={{ marginTop: 12, display: 'flex', gap: 24, fontSize: 11, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 14, background: C.blue }} />
            <span>Capability</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 14, background: C.red }} />
            <span>Adoption</span>
          </div>
          <div style={{ marginLeft: 'auto', opacity: 0.5 }}>
            Polygon area = practical fit
          </div>
        </div>
      </div>
      <Tick />
    </div>
  );
};

/* ── 7b. Seven modes of work ────────────────────────────── */
const MODES = [
  { id: 'op', name: 'Operate',      v: 28, note: 'Templates, routing, intake' },
  { id: 'co', name: 'Counsel',      v: 18, note: 'Advise, interpret, judge' },
  { id: 'st', name: 'Strategize',   v: 11, note: 'Pattern, portfolio, risk' },
  { id: 'ne', name: 'Negotiate',    v: 14, note: 'Redline, leverage, close' },
  { id: 'ar', name: 'Argue',        v:  9, note: 'Brief, advocate, defend' },
  { id: 'te', name: 'Teach',        v:  8, note: 'Train, document, coach' },
  { id: 'go', name: 'Govern',       v: 12, note: 'Policy, audit, oversight' },
];

const ModesScene = () => {
  const { localTime } = useSprite();
  const title = clamp(localTime / 0.7, 0, 1);
  const kicker = clamp((localTime - 3.5) / 0.7, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.paper, color: C.black, fontFamily: FONT }}>
      <Chrome label="06 · Fig 04 — Seven modes of legal work" />
      <div style={{ position: 'absolute', left: 120, top: 150, right: 120 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: title, marginBottom: 12 }}>
          Zoom out · Below the role labels
        </div>
        <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase',
          opacity: title, transform: `translateY(${(1-title)*24}px)` }}>
          Every role mixes <span style={{ color: C.red }}>seven modes.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 440, display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)', gap: 18 }}>
        {MODES.map((m, i) => {
          const enter = clamp((localTime - 1.0 - i * 0.14) / 0.6, 0, 1);
          const barH = 240;
          return (
            <div key={m.id} style={{ opacity: enter, transform: `translateY(${(1-enter)*20}px)` }}>
              <div style={{ height: barH, background: C.white, border: `1px solid ${C.black}`, position: 'relative', marginBottom: 14 }}>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${(m.v / 30) * 100 * enter}%`, background: i % 2 ? C.blue : C.red, opacity: 0.9 }} />
                <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.black, opacity: 0.6 }}>
                  0{i+1}
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.3, opacity: 0.65 }}>{m.note}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 140, left: 120, right: 120, borderTop: `1px solid ${C.black}`, paddingTop: 16,
        display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 300, letterSpacing: '-0.01em',
        opacity: kicker }}>
        <span>Each mode has its own capability curve.</span>
        <span style={{ fontWeight: 700, fontStyle: 'italic', color: C.red }}>Adoption follows the easiest mode first.</span>
      </div>
      <Tick />
    </div>
  );
};

/* ── 7c. Process intelligence gap ───────────────────────── */
const ProcessScene = () => {
  const { localTime } = useSprite();
  const l1 = clamp(localTime / 0.7, 0, 1);
  const l2 = clamp((localTime - 0.8) / 0.7, 0, 1);
  const stat = clamp((localTime - 1.8) / 0.8, 0, 1);
  const note = clamp((localTime - 3.2) / 0.8, 0, 1);
  // Two contrasting boxes
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.white, color: C.black, fontFamily: FONT }}>
      <Chrome label="07 · The process intelligence gap" />
      <div style={{ position: 'absolute', left: 120, top: 150, right: 120 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: l1, marginBottom: 12 }}>
          Why capability ≠ deployment
        </div>
        <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase',
          opacity: l1, transform: `translateY(${(1-l1)*20}px)` }}>
          AI knows the <span style={{ color: C.blue }}>task.</span>
        </div>
        <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase',
          opacity: l2, transform: `translateY(${(1-l2)*20}px)`, marginTop: 4 }}>
          It doesn't know the <span style={{ color: C.red, fontStyle: 'italic' }}>process.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 480, bottom: 140,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, opacity: stat }}>
        <div style={{ border: `1px solid ${C.black}`, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.blue, marginBottom: 18 }}>
              What models learn
            </div>
            <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.02em' }}>
              Draft an NDA.<br/>Summarize a brief.<br/>Flag a clause.
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.4, opacity: 0.65, marginTop: 24 }}>
            Atomic tasks. Public corpora. Benchmarkable.
          </div>
        </div>
        <div style={{ border: `2px solid ${C.red}`, background: C.red, color: C.white, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 18 }}>
              What in-house actually does
            </div>
            <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.02em' }}>
              Know which VP to call.<br/>When to escalate.<br/>What the board won't accept.
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.4, opacity: 0.85, marginTop: 24 }}>
            Tacit. Contextual. Not in any training set.
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 80, left: 120, right: 120, fontSize: 20, fontWeight: 300,
        letterSpacing: '-0.01em', opacity: note, textAlign: 'center' }}>
        Process intelligence is the invisible 60% of the job. It's also where the gap lives.
      </div>
      <Tick />
    </div>
  );
};

/* ── 7d. Fluency gap — Databricks OfficeQA ──────────────── */
const FluencyScene = () => {
  const { localTime } = useSprite();
  const title = clamp(localTime / 0.7, 0, 1);
  const barA = Easing.easeOutCubic(clamp((localTime - 0.8) / 1.4, 0, 1));
  const barB = Easing.easeOutCubic(clamp((localTime - 1.6) / 1.6, 0, 1));
  const punch = clamp((localTime - 3.6) / 0.7, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.black, color: C.white, fontFamily: FONT }}>
      <Chrome label="08 · Fig 05 — The fluency gap" color={C.white} />
      <div style={{ position: 'absolute', left: 120, top: 150, right: 120 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 12 }}>
          Databricks · OfficeQA benchmark
        </div>
        <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase',
          opacity: title, transform: `translateY(${(1-title)*24}px)` }}>
          Public exam: <span style={{ color: C.blue }}>passed.</span><br/>
          Real office docs: <span style={{ color: C.red }}>failed.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 480, bottom: 140,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 10 }}>
            Bar exam, standardized
          </div>
          <div style={{ fontSize: 220, fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', color: C.blue }}>
            {Math.round(barA * 92)}<span style={{ fontSize: 80, opacity: 0.6 }}>%</span>
          </div>
          <div style={{ height: 8, background: '#333', marginTop: 12 }}>
            <div style={{ width: `${barA * 92}%`, height: '100%', background: C.blue }} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.4, opacity: 0.65, marginTop: 16 }}>
            Closed-domain. Memorizable. Public training data.
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 10 }}>
            Real enterprise Q&A
          </div>
          <div style={{ fontSize: 220, fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', color: C.red }}>
            {Math.round(barB * 31)}<span style={{ fontSize: 80, opacity: 0.6 }}>%</span>
          </div>
          <div style={{ height: 8, background: '#333', marginTop: 12 }}>
            <div style={{ width: `${barB * 31}%`, height: '100%', background: C.red }} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.4, opacity: 0.65, marginTop: 16 }}>
            Private context, messy docs, cross-reference.
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 80, left: 120, right: 120, fontSize: 24, fontWeight: 300,
        letterSpacing: '-0.01em', opacity: punch }}>
        A 61-point drop when the test becomes <span style={{ fontWeight: 700, fontStyle: 'italic', color: C.red }}>your actual job.</span>
      </div>
      <Tick color={C.white} />
    </div>
  );
};

/* ── 7e. Entry-level pipeline collapse ───────────────────── */
const PipelineScene = () => {
  const { localTime } = useSprite();
  const title = clamp(localTime / 0.7, 0, 1);
  const bar = Easing.easeOutCubic(clamp((localTime - 1.0) / 1.8, 0, 1));
  const consequence = clamp((localTime - 3.2) / 0.8, 0, 1);
  const years = [
    { y: '2019', v: 100, label: 'baseline' },
    { y: '2021', v: 92 },
    { y: '2023', v: 74 },
    { y: '2024', v: 58 },
    { y: '2025', v: 41, label: '−59%' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.paper, color: C.black, fontFamily: FONT }}>
      <Chrome label="09 · Fig 06 — The pipeline problem" />
      <div style={{ position: 'absolute', left: 120, top: 150, right: 120 }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: title, marginBottom: 12 }}>
          Junior associate hiring · indexed
        </div>
        <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.035em', textTransform: 'uppercase',
          opacity: title, transform: `translateY(${(1-title)*20}px)` }}>
          The <span style={{ color: C.red }}>first rung</span> is disappearing.
        </div>
      </div>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 440, height: 340,
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, alignItems: 'end' }}>
        {years.map((yr, i) => {
          const enter = clamp((localTime - 0.8 - i * 0.25) / 0.7, 0, 1);
          const h = (yr.v / 100) * 300 * bar * enter;
          return (
            <div key={yr.y} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 6, opacity: enter }}>
                {Math.round(yr.v * bar * enter)}
              </div>
              <div style={{ height: h, background: i === years.length - 1 ? C.red : C.black, opacity: enter }} />
              <div style={{ borderTop: `1px solid ${C.black}`, marginTop: 10, paddingTop: 8,
                fontSize: 14, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase',
                display: 'flex', justifyContent: 'space-between' }}>
                <span>{yr.y}</span>
                {yr.label && <span style={{ color: i === years.length - 1 ? C.red : 'inherit', opacity: 0.7 }}>{yr.label}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 100, left: 120, right: 120, borderTop: `1px solid ${C.black}`, paddingTop: 18,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, opacity: consequence }}>
        <div style={{ fontSize: 24, fontWeight: 300, lineHeight: 1.3 }}>
          AI does the work that juniors used to learn on.
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, fontStyle: 'italic', lineHeight: 1.3, color: C.red }}>
          In ten years, who supervises the AI?
        </div>
      </div>
      <Tick />
    </div>
  );
};

const TakeawayScene = () => {
  const { localTime } = useSprite();
  const l1 = clamp(localTime / 0.6, 0, 1);
  const l2 = clamp((localTime - 0.5) / 0.6, 0, 1);
  const l3 = clamp((localTime - 1.4) / 0.6, 0, 1);
  const l4 = clamp((localTime - 1.9) / 0.6, 0, 1);
  const foot = clamp((localTime - 3.0) / 0.8, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.ink, color: C.white, fontFamily: FONT }}>
      <Chrome label="10 · The pattern" color={C.white} />
      <div style={{ position: 'absolute', inset: '200px 120px 160px 120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 160, fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.045em', textTransform: 'uppercase' }}>
          <div style={{ opacity: l1, transform: `translateX(${(1-l1)*-40}px)` }}>Each role has a <span style={{ color: C.blue }}>different shape</span>.</div>
          <div style={{ opacity: l2, transform: `translateX(${(1-l2)*-40}px)` }}>Each needs</div>
          <div style={{ height: 24 }} />
          <div style={{ opacity: l3, transform: `translateX(${(1-l3)*40}px)` }}>a <span style={{ color: C.red }}>different</span></div>
          <div style={{ opacity: l4, transform: `translateX(${(1-l4)*40}px)` }}>investment.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, borderTop: `1px solid ${C.white}`, paddingTop: 24, opacity: foot }}>
          <div style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.25, opacity: 0.85 }}>
            Same profession. Different role mix. Different AI readiness.
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.25, fontStyle: 'italic', color: C.red }}>
            The shape of the gap is the strategy.
          </div>
        </div>
      </div>
      <Tick color={C.white} />
    </div>
  );
};

/* ── 9. CTA ────────────────────────────────────────────── */
const CTAScene = () => {
  const { localTime } = useSprite();
  const title = clamp(localTime / 0.7, 0, 1);
  const url = clamp((localTime - 0.8) / 0.7, 0, 1);
  const byline = clamp((localTime - 2.0) / 0.8, 0, 1);
  const pulse = 1 + Math.sin(localTime * 2) * 0.02;
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.white, color: C.black, fontFamily: FONT }}>
      <Chrome label="End · 12 / 12" />
      <div style={{ position: 'absolute', inset: '180px 120px 160px 120px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 28, color: C.red, opacity: title }}>
            → Explore the interactive
          </div>
          <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase',
            opacity: title, transform: `translateY(${(1-title)*30}px) scale(${title * pulse})`, transformOrigin: 'left' }}>
            MIND<br/>THE<br/><span style={{ color: C.red }}>GAP.</span>
          </div>
        </div>
        <div style={{ borderLeft: `1px solid ${C.black}`, paddingLeft: 40, opacity: url }}>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 14 }}>Visit</div>
          <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 36 }}>
            <span style={{ color: C.red }}>mindthegap</span>.kenpriore.ai
          </div>
          <div style={{ borderTop: `1px solid ${C.black}`, paddingTop: 18, opacity: byline }}>
            <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 10 }}>Author</div>
            <div style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.2 }}>
              <span style={{ fontWeight: 700 }}>Ken Priore</span> — Deputy General Counsel at Docusign. Writes about AI governance and legal operations.
            </div>
          </div>
        </div>
      </div>
      <Tick />
    </div>
  );
};

/* ── Full video composition ─────────────────────────────── */
const Video = () => {
  const spotDur = 6;
  return (
    <>
      <Sprite start={T.title[0]}    end={T.title[0] + T.title[1]}><TitleScene /></Sprite>
      <Sprite start={T.premise[0]}  end={T.premise[0] + T.premise[1]}><PremiseScene /></Sprite>
      <Sprite start={T.radar[0]}    end={T.radar[0] + T.radar[1]}><RadarScene /></Sprite>
      <Sprite start={T.seven[0]}    end={T.seven[0] + T.seven[1]}><SevenScene /></Sprite>
      <Sprite start={T.roles[0]}    end={T.roles[0] + T.roles[1]}><RolesGridScene /></Sprite>
      {SPOT.map((role, i) => (
        <RoleSpotlight key={role.id} role={role} note={SPOT_NOTES[role.id]}
          spotStart={T.spotlight[0] + i * spotDur} spotDur={spotDur} idx={i+1} total={SPOT.length} />
      ))}
      <Sprite start={T.modes[0]}    end={T.modes[0] + T.modes[1]}><ModesScene /></Sprite>
      <Sprite start={T.process[0]}  end={T.process[0] + T.process[1]}><ProcessScene /></Sprite>
      <Sprite start={T.fluency[0]}  end={T.fluency[0] + T.fluency[1]}><FluencyScene /></Sprite>
      <Sprite start={T.pipeline[0]} end={T.pipeline[0] + T.pipeline[1]}><PipelineScene /></Sprite>
      <Sprite start={T.takeaway[0]} end={T.takeaway[0] + T.takeaway[1]}><TakeawayScene /></Sprite>
      <Sprite start={T.cta[0]}      end={T.cta[0] + T.cta[1]}><CTAScene /></Sprite>
    </>
  );
};

Object.assign(window, { Video, TOTAL });
