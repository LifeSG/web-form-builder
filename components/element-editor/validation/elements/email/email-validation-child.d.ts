/// <reference types="react" />
interface IProps {
    onDelete: () => void;
    index: number;
    options: string[];
    disabled?: boolean;
}
export declare const EmailValidationChild: ({ onDelete, index, options }: IProps) => JSX.Element;
export {};
