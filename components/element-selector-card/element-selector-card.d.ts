/// <reference types="react" />
import { EElementType } from "src/context-providers";
interface IProps {
    type: EElementType;
    onClick: () => void;
}
export declare const ElementSelectorCard: ({ type, onClick }: IProps) => JSX.Element;
export {};
