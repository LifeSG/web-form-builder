/// <reference types="react" />
interface IFieldEditorAccordionItemProps {
    $hideTopBorder: boolean;
}
export declare const Wrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const AccordionItem: import("styled-components").StyledComponent<(props: import("@lifesg/react-design-system/accordion").AccordionItemProps & import("react").RefAttributes<import("@lifesg/react-design-system/accordion").AccordionItemHandle>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, any, IFieldEditorAccordionItemProps, never>;
export declare const AccordionWrapper: import("styled-components").StyledComponent<(({ children, title, enableExpandAll, initialDisplay, showTitleInMobile, className, }: import("@lifesg/react-design-system/accordion").AccordionProps) => JSX.Element) & {
    Item: (props: import("@lifesg/react-design-system/accordion").AccordionItemProps & import("react").RefAttributes<import("@lifesg/react-design-system/accordion").AccordionItemHandle>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}, any, {}, never>;
export {};
