import { LogoWithWordmark } from "./Logo";

interface LogoImageProps {
  className?: string;
}

export function LogoImage({ className }: LogoImageProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <LogoWithWordmark />
    </div>
  );
}
