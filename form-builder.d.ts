/// <reference types="react" />
import { IConfigState, TElement, TElementMap } from "./context-providers";
import { ISchemaProps } from "./translator";
export interface IFormBuilderMethods {
    generateSchema: (elementsList?: TElementMap) => ISchemaProps;
    parseSchema: (schema: ISchemaProps) => void;
}
interface IProps {
    offset?: number;
    onSubmit?: (formData: TElement) => Promise<unknown>;
    config?: IConfigState;
}
export declare const FormBuilder: import("react").ForwardRefExoticComponent<IProps & import("react").RefAttributes<IFormBuilderMethods>>;
export {};
