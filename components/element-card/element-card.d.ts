/// <reference types="react" />
import { TElement } from "src/context-providers";
interface IProps {
    element: TElement;
    onClick: () => void;
    onDelete?: () => void;
    onDuplicate?: () => void;
}
export declare const ElementCard: ({ element, onClick }: IProps) => JSX.Element;
export {};
