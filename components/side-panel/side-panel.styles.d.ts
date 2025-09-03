/// <reference types="react" />
export interface IWrapperStyleProps {
    $minimised: boolean;
    $offset: number;
    $narrow: boolean;
}
export interface IContentSectionStyleProps {
    $minimised: boolean;
    $isFocusedElement: boolean;
}
export declare const Wrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, IWrapperStyleProps>> & string;
export declare const ContentWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export declare const ContentSection: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, IContentSectionStyleProps>> & string;
