/// <reference types="react" />
export interface IProps {
    id?: string;
    children: React.ReactNode;
    focused?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
}
export declare const BaseCard: ({ id, children, focused, onClick, className, }: IProps) => import("react/jsx-runtime").JSX.Element;
