"use client";

const proofs = [
  { metric: "47.3%", label: "Avg. organic lift", desc: "Across all campaigns" },
  { metric: "3.2x", label: "Content velocity", desc: "AI-accelerated output" },
  { metric: "98%", label: "Lighthouse score", desc: "Best-in-class performance" },
  { metric: "40+", label: "Hrs/week saved", desc: "Through automation" },
];

export default function ProofStrip() {
  return (
    <div className="hp-proof-strip-inner">
      <div className="hp-proof-scroll">
        {proofs.map((p) => (
          <div key={p.label} className="hp-proof-card">
            <span className="hp-proof-metric">{p.metric}</span>
            <span className="hp-proof-label">{p.label}</span>
            <span className="hp-proof-desc">{p.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
