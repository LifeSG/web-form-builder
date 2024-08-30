import { EValidationType } from "src/context-providers";
import * as yup from "yup";
export declare const EMAIL_YUP_SCHEMA: yup.ObjectSchema<{
    placeholder: string;
    validation: {
        validationType?: EValidationType;
        validationRule?: string;
        validationErrorMessage?: string;
    }[];
}, yup.AnyObject, {
    placeholder: undefined;
    validation: "";
}, "">;
