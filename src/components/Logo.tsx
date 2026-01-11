import { NetNoteIconSolid } from "./icons/NetNoteIcon";

interface LogoIconProps {
  size?: number;
  className?: string;
}

/**
 * NetNote app icon
 */
export function LogoIcon({ size = 48, className }: LogoIconProps) {
  return (
    <NetNoteIconSolid
      width={size}
      height={size}
      className={`text-[var(--color-accent)] ${className}`}
    />
  );
}

/**
 * NetNote logo with wordmark
 */
export function LogoWithWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon size={32} />
      <span className="font-bold text-2xl tracking-tighter text-[var(--color-text)]">
        NetNote
      </span>
    </div>
  );
}

