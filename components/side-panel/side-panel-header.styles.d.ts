/// <reference types="react" />
interface IWrapperStyleProps {
    $showDivider: boolean;
}
interface IIconStyleProps {
    $isCollapsed: boolean;
}
export declare const Wrapper: import("styled-components").StyledComponent<"div", any, IWrapperStyleProps, never>;
export declare const HeaderChevronIcon: import("styled-components").StyledComponent<{
    (props: import("react").SVGProps<SVGSVGElement>): JSX.Element;
    displayName: string;
}, any, IIconStyleProps, never>;
export declare const HeaderLabel: import("styled-components").StyledComponent<"h3", any, import("@lifesg/react-design-system/text").TextProps, never>;
export declare const SaveChangesButton: import("styled-components").StyledComponent<(props: import("@lifesg/react-design-system/button").ButtonProps & import("react").RefAttributes<HTMLButtonElement>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, any, {}, never>;
export {};
