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
export declare const DragHandle: import("styled-components").StyledComponent<{
    (props: import("react").SVGProps<SVGSVGElement>): JSX.Element;
    displayName: string;
}, any, {}, never>;
export declare const Container: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const DetailsContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const IdLabel: import("styled-components").StyledComponent<"span", any, import("@lifesg/react-design-system/text").TextProps, never>;
export declare const ActionsContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ActionButton: import("styled-components").StyledComponent<"button", any, IActionButtonStyleProps, never>;
export declare const DroppableWrapper: import("styled-components").StyledComponent<"div", any, IDroppableWrapperProps, never>;
export declare const DroppableText: import("styled-components").StyledComponent<"p", any, import("@lifesg/react-design-system/text").TextProps, never>;
export declare const ElementBaseCard: import("styled-components").StyledComponent<({ id, children, focused, onClick, className, }: IProps) => JSX.Element, any, IElementCardProps, never>;
export declare const CardWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export {};
