import { EValidationType } from "src/context-providers";
import * as yup from "yup";
export declare const CONTACT_YUP_SCHEMA: yup.ObjectSchema<{
    placeholder: string;
    enableClearButton: boolean;
    defaultCountryCode: string;
    displayAsFixedCountryCode: boolean;
    validation: {
        validationType?: EValidationType;
        validationRule?: string;
        validationErrorMessage?: string;
    }[];
}, yup.AnyObject, {
    placeholder: undefined;
    enableClearButton: undefined;
    defaultCountryCode: undefined;
    displayAsFixedCountryCode: undefined;
    validation: "";
}, "">;
