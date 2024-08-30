export interface IWrapperStyleProps {
    $minimised: boolean;
    $offset: number;
}
export interface IContentSectionStyleProps {
    $isFocusedElement: boolean;
}
export declare const Wrapper: import("styled-components").StyledComponent<"div", any, IWrapperStyleProps, never>;
export declare const ContentWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ContentSection: import("styled-components").StyledComponent<"div", any, IContentSectionStyleProps, never>;
