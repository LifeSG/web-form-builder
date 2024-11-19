/// <reference types="react" />
interface IProps {
    onDelete: () => void;
    index: number;
    options: string[];
    disabled?: boolean;
}
export declare const TextValidationChild: ({ onDelete, index, options, disabled, }: IProps) => JSX.Element;
export {};
