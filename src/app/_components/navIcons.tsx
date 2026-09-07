export type IconName =
  | "bolt"
  | "steps"
  | "play"
  | "shield"
  | "user"
  | "building"
  | "users"
  | "chat"
  | "doc"
  | "help"
  | "hand"
  | "home"
  | "code";

const PATHS: Record<IconName, React.ReactNode> = {
  bolt: <path d="M13 3 5.5 13H10l-1 8 7.5-10H12l1-8Z" />,
  steps: <path d="M3.5 19h4v-4h4v-4h4V7h4.5" />,
  play: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m10.4 8.6 5 3.4-5 3.4V8.6Z" />
    </>
  ),
  shield: <path d="M12 3.2 5.4 6v5.4c0 4 2.8 7.6 6.6 9.4 3.8-1.8 6.6-5.4 6.6-9.4V6L12 3.2Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.7" />
      <path d="M4.6 20c0-3.3 3.3-5.3 7.4-5.3s7.4 2 7.4 5.3" />
    </>
  ),
  building: (
    <>
      <path d="M4.5 20.5V6.4L12 3.4l7.5 3v14.1" />
      <path d="M9.6 20.5v-4.2h4.8v4.2" />
      <path d="M8.6 9.4h.01M12 9.4h.01M15.4 9.4h.01M8.6 12.8h.01M12 12.8h.01M15.4 12.8h.01" />
    </>
  ),
  users: (
    <>
      <circle cx="9.4" cy="8.4" r="3.4" />
      <path d="M2.8 20c0-3.1 3-5 6.6-5s6.6 1.9 6.6 5" />
      <path d="M16.2 5.4a3.4 3.4 0 0 1 0 6.4" />
      <path d="M18 15.3c2 .6 3.2 1.9 3.2 3.9" />
    </>
  ),
  chat: <path d="M20.5 11.6a7.9 7.9 0 0 1-8 7.9H4.6l2.1-2.7a7.9 7.9 0 1 1 13.8-5.2Z" />,
  doc: (
    <>
      <path d="M13.6 3.5H7.4a1.9 1.9 0 0 0-1.9 1.9v13.2a1.9 1.9 0 0 0 1.9 1.9h9.2a1.9 1.9 0 0 0 1.9-1.9V8.4l-4.9-4.9Z" />
      <path d="M13.6 3.5v4.9h4.9" />
      <path d="M9 13.2h6M9 16.6h4" />
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
  code: <path d="m8.4 8.2-4.6 3.9 4.6 3.9M15.6 8.2l4.6 3.9-4.6 3.9M13.6 4.4 10.4 19.6" />,
};

export function NavIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      {PATHS[name]}
    </svg>
  );
}
