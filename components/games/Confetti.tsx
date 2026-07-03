const COLORS = ["#C9A646", "#E5C76B", "#F5F5F5", "#B8941F"];

export function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((i) => (
        <span
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: COLORS[i % COLORS.length],
            animationDelay: `${Math.random() * 0.6}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
          className="absolute top-0 h-2 w-2 animate-[confetti-fall_2s_ease-in_forwards]"
        />
      ))}
    </div>
  );
}
