import { TElement } from "src/context-providers";
interface IProps {
    offset?: number;
    onSubmit?: (formData: TElement) => Promise<unknown>;
}
export declare const SidePanel: ({ offset, onSubmit }: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
