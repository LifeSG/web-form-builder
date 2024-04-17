import { IBaseFieldAttributes } from "src/context-providers/builder";

export interface IFieldValues extends Omit<IBaseFieldAttributes, "internalId"> {
    placeholder?: string;
    defaultValue?: string;
}
