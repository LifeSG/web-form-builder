import { EFieldType } from "./types";

export type TBaseField = {
    id: string;
    internalId: string;
    label: string;
    type: EFieldType;
};
