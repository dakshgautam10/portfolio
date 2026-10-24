type Props = {
  variant: "base" | "reveal" | "badge";
  className?: string;
};

// The illustrated figure from the design, in its three colourways.
export default function Avatar({ variant, className }: Props) {
  if (variant === "base") {
    return (
      <svg aria-hidden="true" viewBox="0 0 600 700" className={className}>
        <path d="M30 700 C30 560 140 492 300 492 C460 492 570 560 570 700 Z" fill="#3A3732" />
        <rect x="252" y="390" width="96" height="130" rx="36" fill="#45413B" />
        <ellipse cx="300" cy="295" rx="122" ry="148" fill="#4C4841" />
        <path d="M176 292 C164 160 240 122 312 126 C394 131 438 186 425 292 C404 226 362 200 300 205 C238 208 198 238 176 292 Z" fill="#26241F" />
      </svg>
    );
  }

  const reveal = variant === "reveal";
  return (
    <svg aria-hidden="true" viewBox="0 0 600 700" className={className}>
      <path d="M30 700 C30 560 140 492 300 492 C460 492 570 560 570 700 Z" fill={reveal ? "#F1EDE4" : "#1B1A18"} />
      {reveal && <path d="M210 500 C230 560 370 560 390 500" fill="none" stroke="#1B1A18" strokeWidth="10" strokeLinecap="round" />}
      <rect x="252" y="390" width="96" height="130" rx="36" fill={reveal ? "#E3DDD1" : "#2A2824"} />
      <ellipse cx="300" cy="295" rx="122" ry="148" fill="#F1EDE4" />
      <path d="M176 292 C164 160 240 122 312 126 C394 131 438 186 425 292 C404 226 362 200 300 205 C238 208 198 238 176 292 Z" fill="#1B1A18" />
      {reveal && (
        <>
          <rect x="214" y="282" width="72" height="44" rx="14" fill="none" stroke="#1B1A18" strokeWidth="9" />
          <rect x="314" y="282" width="72" height="44" rx="14" fill="none" stroke="#1B1A18" strokeWidth="9" />
          <path d="M286 300 L314 300" stroke="#1B1A18" strokeWidth="9" />
        </>
      )}
      <path d="M160 300 C150 120 450 120 440 300" fill="none" stroke="#1B1A18" strokeWidth="24" strokeLinecap="round" />
      <rect x="136" y="262" width="50" height="104" rx="22" fill="#1B1A18" />
      <rect x="414" y="262" width="50" height="104" rx="22" fill="#1B1A18" />
    </svg>
  );
}
