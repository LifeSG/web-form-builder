/// <reference types="react" />
import { IProps } from "../common";
interface IActionButtonStyleProps {
    $disabled?: boolean;
}
interface IDroppableWrapperProps {
    isOver: boolean;
    $size: "full" | "left" | "right";
}
interface IElementCardProps extends IProps {
    $isDragging: boolean;
}
export declare const DragHandle: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<Omit<import("react").SVGProps<SVGSVGElement>, "ref"> & {
    ref?: import("react").Ref<SVGSVGElement>;
}, never>> & string & Omit<{
    (props: import("react").SVGProps<SVGSVGElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
}, keyof import("react").Component<any, {}, any>>;
export declare const Container: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export declare const DetailsContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export declare const ElementName: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components/dist/types").Substitute<import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & {
    ref?: import("react").RefObject<HTMLParagraphElement> | ((instance: HTMLParagraphElement) => void);
}>, import("@lifesg/react-design-system/typography").TypographyProps>, keyof import("@lifesg/react-design-system/typography").TypographyProps> & import("@lifesg/react-design-system/typography").TypographyProps, never>> & string;
export declare const IdLabel: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components/dist/types").Substitute<import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & {
    ref?: import("react").RefObject<HTMLParagraphElement> | ((instance: HTMLParagraphElement) => void);
}>, import("@lifesg/react-design-system/typography").TypographyProps>, keyof import("@lifesg/react-design-system/typography").TypographyProps> & import("@lifesg/react-design-system/typography").TypographyProps, never>> & string;
export declare const ActionsContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export declare const ActionButton: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, IActionButtonStyleProps>> & string;
export declare const DroppableWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, IDroppableWrapperProps>> & string;
export declare const DroppableText: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("styled-components").FastOmit<import("styled-components/dist/types").Substitute<import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & {
    ref?: import("react").RefObject<HTMLParagraphElement> | ((instance: HTMLParagraphElement) => void);
}>, import("@lifesg/react-design-system/typography").TypographyProps>, keyof import("@lifesg/react-design-system/typography").TypographyProps> & import("@lifesg/react-design-system/typography").TypographyProps, never>> & string;
export declare const ElementBaseCard: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<IProps, IElementCardProps>> & string & Omit<({ id, children, focused, onClick, className, }: IProps) => import("react/jsx-runtime").JSX.Element, keyof import("react").Component<any, {}, any>>;
export declare const CardWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export {};
