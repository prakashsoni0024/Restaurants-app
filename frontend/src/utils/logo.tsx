/** Small arched-window mark that echoes the printed menu. */
export function ArchMark({ className = "mx-auto h-12 w-10" }) {
  return (
    <svg
      viewBox="0 0 40 48"
      className={`${className} text-[#904c2e]`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 44V22C6 12 12 5 20 5s14 7 14 17v22z" />
      <path d="M13 44V24c0-6 3-11 7-11s7 5 7 11v20" />
    </svg>
  );
}