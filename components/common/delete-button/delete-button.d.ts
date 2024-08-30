/// <reference types="react" />
interface IProps {
    onClick: () => void;
    disabled?: boolean;
    popoverMessage?: JSX.Element;
}
export declare const DeleteButton: ({ onClick, disabled, popoverMessage }: IProps) => JSX.Element;
export {};
