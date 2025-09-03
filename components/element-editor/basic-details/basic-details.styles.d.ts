/// <reference types="react" />
interface IFieldEditorAccordionItemProps {
    $hideTopBorder: boolean;
}
export declare const Wrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export declare const AccordionItem: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("@lifesg/react-design-system/accordion").AccordionItemProps & import("react").RefAttributes<import("@lifesg/react-design-system/accordion").AccordionItemHandle>, IFieldEditorAccordionItemProps>> & string & Omit<(props: import("@lifesg/react-design-system/accordion").AccordionItemProps & import("react").RefAttributes<import("@lifesg/react-design-system/accordion").AccordionItemHandle>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, keyof import("react").Component<any, {}, any>>;
export declare const AccordionWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("@lifesg/react-design-system/accordion").AccordionProps, never>> & string & Omit<(({ children, title, enableExpandAll, initialDisplay, showTitleInMobile, id, "data-testid": testId, className, headingLevel, onExpandCollapseChange, }: import("@lifesg/react-design-system/accordion").AccordionProps) => JSX.Element) & {
    Item: (props: import("@lifesg/react-design-system/accordion").AccordionItemProps & import("react").RefAttributes<import("@lifesg/react-design-system/accordion").AccordionItemHandle>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}, keyof import("react").Component<any, {}, any>>;
export {};
