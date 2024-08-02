import React from "react";
import { SVGProps } from "react";

export const TopPositionIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect x="2" y="4.5" width="22" height="2" rx="1" fill="currentColor" />
        <mask id="path-2-inside-1_6699_38329" fill="white">
            <rect x="2" y="9.5" width="22" height="12" rx="1" />
        </mask>
        <rect
            x="2"
            y="9.5"
            width="22"
            height="12"
            rx="1"
            stroke="currentColor"
            fill="white"
            strokeWidth="4"
            mask="url(#path-2-inside-1_6699_38329)"
        />
    </svg>
);

TopPositionIcon.displayName = "TopPositionIcon";
