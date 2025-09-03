import { EValidationType } from "src/context-providers";
import * as yup from "yup";
export declare const LONG_TEXT_YUP_SCHEMA: yup.ObjectSchema<{
    placeholder: string;
    resizableInput: boolean;
    pills: boolean;
    pillItems: {
        content?: string;
    }[];
    pillPosition: string;
    validation: {
        validationType?: EValidationType;
        validationRule?: string;
        validationErrorMessage?: string;
    }[];
}, yup.AnyObject, {
    placeholder: undefined;
    resizableInput: undefined;
    pills: undefined;
    pillItems: "";
    pillPosition: undefined;
    validation: "";
}, "">;
