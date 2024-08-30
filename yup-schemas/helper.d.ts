import { EElementType, IFocusedElement, TElementMap } from "src/context-providers";
import * as yup from "yup";
export declare const PREFILL_ACTIONID_REGEX: RegExp;
export declare const PREFILL_PATH_REGEX: RegExp;
declare module "yup" {
    interface StringSchema {
        validRegex(message: string): this;
        isNumber(message: string): this;
    }
}
export declare const generateBaseYupSchema: (elements: TElementMap, focusedElement: IFocusedElement) => yup.ObjectSchema<{
    internalId: string;
    type: NonNullable<EElementType>;
    label: string;
    required: boolean;
    requiredErrorMsg: string;
    description: string;
    id: string;
    preselectedValue: string;
    prefill: {
        path?: string;
        prefillMode?: string;
        actionId?: string;
    }[];
    conditionalRendering: {
        internalId?: string;
        fieldKey?: string;
        comparator?: string;
        value?: string;
    }[];
}, yup.AnyObject, {
    internalId: undefined;
    type: undefined;
    label: undefined;
    required: true;
    requiredErrorMsg: undefined;
    description: undefined;
    id: undefined;
    preselectedValue: undefined;
    prefill: "";
    conditionalRendering: "";
}, "">;
export type TBaseValues = yup.InferType<ReturnType<typeof generateBaseYupSchema>>;
