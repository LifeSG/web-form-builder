/// <reference types="react" />
interface IWrapperStyleProps {
    $mode: "expanded" | "minimised";
}
interface IElementItemWrapperProps extends IWrapperStyleProps {
    $size: "full" | "left" | "right";
}
export declare const Wrapper: import("styled-components").StyledComponent<"div", any, IWrapperStyleProps, never>;
export declare const EmptyDisplayWrapper: import("styled-components").StyledComponent<"div", any, IWrapperStyleProps, never>;
export declare const EmptyDisplayTitle: import("styled-components").StyledComponent<keyof JSX.IntrinsicElements, any, import("@lifesg/react-design-system/typography").TypographyProps, never>;
export declare const EmptyDisplayDescription: import("styled-components").StyledComponent<"p", any, import("@lifesg/react-design-system/typography").TypographyProps, never>;
export declare const ElementsWrapper: import("styled-components").StyledComponent<"ul", any, IWrapperStyleProps, never>;
export declare const ElementItemWrapper: import("styled-components").StyledComponent<"li", any, IElementItemWrapperProps, never>;
export {};
