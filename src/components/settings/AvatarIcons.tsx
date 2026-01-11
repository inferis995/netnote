import { SVGProps } from "react";
import IconPng from "../../assets/netnote-icon.png";

export const AvatarIcons = [
    // 0. Official Logo
    (props: SVGProps<SVGSVGElement> & { className?: string }) => {
        // Filter out props that might be invalid for img if necessary, but className is key.
        // We'll cast to any to avoid strict SVG vs Img prop type conflicts in this mixed array
        const { className, ...other } = props as any;
        return (
            <img
                src={IconPng}
                alt="NetNote"
                className={className}
                {...other}
                style={{ objectFit: 'contain' }}
            />
        );
    },
    // 1. Abstract Geometric (Professional)
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 9h.01M15 9h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
    ),
    // 2. Minimalist Person
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    // 3. Tech/Bot
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <rect x="3" y="11" width="18" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="16" r="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 11V7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 7h4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="5" r="1" fill="currentColor" opacity="0.5" />
            <circle cx="17" cy="5" r="1" fill="currentColor" opacity="0.5" />
        </svg>
    ),
    // 4. Star/Creator
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    ),
    // 5. Briefcase/Professional
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    // 6. Focus/Target
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    ),
    // 7. Idea/Spark
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
    // 8. Abstract Hexagon
    (props: SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8.66 5v10L12 22 3.34 17V7L12 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        </svg>
    )
];
