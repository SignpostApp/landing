export type IconName =
  | "steps"
  | "play"
  | "help"
  | "hand"
  | "home"
  | "cpu"
  | "book"
  | "lock"
  | "grid"
  | "clock";

const PATHS: Record<IconName, React.ReactNode> = {
  steps: <path d="M3.5 19h4v-4h4v-4h4V7h4.5" />,
  play: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m10.4 8.6 5 3.4-5 3.4V8.6Z" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.7 9.6a2.4 2.4 0 1 1 3.1 2.3c-.6.2-.9.8-.9 1.4v.4" />
      <path d="M12 16.6h.01" />
    </>
  ),
  hand: (
    <>
      <path d="M9.2 11V5.2a1.5 1.5 0 0 1 3 0V10" />
      <path d="M12.2 10V4.2a1.5 1.5 0 0 1 3 0V10" />
      <path d="M15.2 10.2V6.6a1.5 1.5 0 0 1 3 0v7.6a6.8 6.8 0 0 1-6.8 6.8h-.3A6.3 6.3 0 0 1 4.8 14v-2a1.5 1.5 0 0 1 3 0v1.2" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.4 12 4l8 6.4v9.2a1 1 0 0 1-1 1h-4.2v-5.4H9.2v5.4H5a1 1 0 0 1-1-1v-9.2Z" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.6" />
      <rect x="9.6" y="9.6" width="4.8" height="4.8" rx=".6" />
      <path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3" />
    </>
  ),
  book: (
    <>
      <path d="M4.5 5.2A1.7 1.7 0 0 1 6.2 3.5h11.6a.7.7 0 0 1 .7.7v13.1H6.2a1.7 1.7 0 0 0-1.7 1.7V5.2Z" />
      <path d="M4.5 19a1.7 1.7 0 0 0 1.7 1.7h12.3v-3.4" />
    </>
  ),
  lock: (
    <>
      <rect x="5.2" y="10.4" width="13.6" height="10.1" rx="1.8" />
      <path d="M8.2 10.4V7.6a3.8 3.8 0 0 1 7.6 0v2.8" />
      <path d="M12 14.6v2.2" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.6" height="6.6" rx="1.4" />
      <rect x="13.4" y="4" width="6.6" height="6.6" rx="1.4" />
      <rect x="4" y="13.4" width="6.6" height="6.6" rx="1.4" />
      <path d="M16.7 13.4V20M13.4 16.7H20" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.1 2" />
    </>
  ),
};

export function NavIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      {PATHS[name]}
    </svg>
  );
}
