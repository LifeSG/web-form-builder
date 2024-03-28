import { IBaseTextBasedFieldAttributes } from "src/context-providers";

export type IBaseTextBasedFieldValues = Omit<
    IBaseTextBasedFieldAttributes,
    "internalId"
>;
