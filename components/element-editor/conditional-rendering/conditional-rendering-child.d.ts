import { EElementType } from "src/context-providers";
export interface IOptions {
    label: string;
    elementType?: EElementType;
    id?: string;
    internalId?: string;
}
export interface IOnChangeProps {
    fieldKey: string;
    comparator: string;
    value: string | number;
    internalId: string;
}
interface IProps {
    onDelete: () => void;
    options: IOptions[];
    index?: number;
}
export declare const ConditionalRenderingChild: ({ onDelete, options, index, }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
