/// <reference types="react" />
interface IProps {
    title?: string;
    buttonLabel?: string;
    onAdd: () => void;
    children: React.ReactNode;
    disabledButton?: boolean;
    popoverMessage?: string | React.ReactNode;
    subtitle?: string;
    expanded?: boolean;
    hideAddButton?: boolean;
}
export declare const MultiEntry: ({ title, buttonLabel, onAdd, children, disabledButton, popoverMessage, subtitle, expanded, hideAddButton, }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
