import { IComplexLabel } from "@lifesg/web-frontend-engine/components/fields";
import { ReactNode } from "react";
interface IOptionProps {
    icon?: ReactNode;
    title: string;
}
interface IProps {
    label?: IComplexLabel;
    value?: boolean;
    onChange: (value: boolean) => void;
    options?: IOptionProps[];
    disabled?: boolean;
}
export declare const TogglePair: ({ onChange, value, label, options, disabled, }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
