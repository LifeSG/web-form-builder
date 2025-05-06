/// <reference types="react" />
export interface IContainerProps {
    $isLargeScreen: boolean;
}
export interface IWrapperProps {
    $disabled?: boolean;
}
export declare const Wrapper: import("styled-components").StyledComponent<(props: import("@lifesg/react-design-system/layout").SectionProps & import("react").RefAttributes<HTMLDivElement>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, any, IWrapperProps, never>;
export declare const Container: import("styled-components").StyledComponent<(props: import("@lifesg/react-design-system/layout").ContainerProps & import("react").RefAttributes<HTMLDivElement>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, any, IContainerProps, never>;
