import * as yup from "yup";
export declare const DROPDOWN_YUP_SCHEMA: yup.ObjectSchema<{
    placeholder: string;
    dropdownItems: {
        label?: string;
        value?: string;
    }[];
}, yup.AnyObject, {
    placeholder: undefined;
    dropdownItems: "";
}, "">;
