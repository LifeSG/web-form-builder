/// <reference types="react" />
import { EElementType } from "src/context-providers";
interface IProps {
    type?: EElementType;
    onChange?: (option: unknown) => void;
    onBlur?: () => void;
    errorMessage?: string;
}
export declare const IconDropdown: ({ type, onChange, onBlur, errorMessage, }: IProps) => JSX.Element;
export {};
