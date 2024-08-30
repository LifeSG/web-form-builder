import * as Yup from "yup";
export declare const BULK_EDIT_SCHEMA: Yup.ObjectSchema<{
    items: string;
}, Yup.AnyObject, {
    items: undefined;
}, "">;
export type TBulkEditData = Yup.InferType<typeof BULK_EDIT_SCHEMA>;
