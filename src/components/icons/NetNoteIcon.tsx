import { SVGProps } from "react";
import IconPng from "../../assets/netnote-icon.png";

export function NetNoteIcon(props: SVGProps<SVGSVGElement> & { className?: string }) {
  // Use className for sizing from props, default to w-6 h-6 if not provided in styling context? 
  // Actually the parent passes className which usually sets w/h.
  // We'll strip the key props valid for img.
  const { className, ...other } = props as any;
  return (
    <img
      src={IconPng}
      alt="NetNote"
      className={className}
      {...other}
    />
  );
}

export function NetNoteIconSolid(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const { className, ...other } = props as any;
  return (
    <img
      src={IconPng}
      alt="NetNote"
      className={className}
      {...other}
    />
  );
}
