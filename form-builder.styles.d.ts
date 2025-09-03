/// <reference types="react" />
export interface IContainerProps {
    $isLargeScreen: boolean;
}
export interface IWrapperProps {
    $disabled?: boolean;
}
export declare const Wrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("@lifesg/react-design-system/layout").SectionProps & import("react").RefAttributes<HTMLDivElement>, IWrapperProps>> & string & Omit<(props: import("@lifesg/react-design-system/layout").SectionProps & import("react").RefAttributes<HTMLDivElement>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, keyof import("react").Component<any, {}, any>>;
export declare const Container: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("@lifesg/react-design-system/layout").ContainerProps & import("react").RefAttributes<HTMLDivElement>, IContainerProps>> & string & Omit<(props: import("@lifesg/react-design-system/layout").ContainerProps & import("react").RefAttributes<HTMLDivElement>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, keyof import("react").Component<any, {}, any>>;
