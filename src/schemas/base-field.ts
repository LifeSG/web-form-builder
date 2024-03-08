import { EFieldType } from "./types";

export type IBaseField = {
    id: string;
    internalId: string;
    label: string;
    type: EFieldType;
};
