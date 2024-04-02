import { IBaseFieldAttributes } from "src/schemas";

export interface IFieldValues extends Omit<IBaseFieldAttributes, "internalId"> {
    placeholder?: string;
}
