import { IValidation } from "src/context-providers";

export interface ISchemaValidation {
    [key: string]: string | number | boolean;
    errorMessage?: string;
}

export type ValidationSchemaGenerator = (
    value: IValidation
) => ISchemaValidation;
