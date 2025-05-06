import * as yup from "yup";
export declare const RADIO_BUTTON_YUP_SCHEMA: yup.ObjectSchema<{
    placeholder: string;
    radioItems: {
        label?: string;
        value?: string;
    }[];
}, yup.AnyObject, {
    placeholder: undefined;
    radioItems: "";
}, "">;
