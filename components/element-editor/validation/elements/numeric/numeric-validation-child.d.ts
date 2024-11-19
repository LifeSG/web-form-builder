/// <reference types="react" />
interface IProps {
    onDelete: () => void;
    index: number;
    options: string[];
    disabled?: boolean;
}
export declare const NumericValidationChild: ({ onDelete, index, options, disabled, }: IProps) => JSX.Element;
export {};
