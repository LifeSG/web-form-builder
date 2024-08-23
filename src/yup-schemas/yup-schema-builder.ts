import { useBuilder } from "src/context-providers";
import * as yup from "yup";
import { EElementType } from "../context-providers/builder/element.types";
import {
    DROPDOWN_YUP_SCHEMA,
    EMAIL_YUP_SCHEMA,
    LONG_TEXT_YUP_SCHEMA,
    NUMERIC_YUP_SCHEMA,
    TEXT_YUP_SCHEMA,
} from "./elements";
import { generateBaseYupSchema } from "./helper";
import { TYupSchema } from "./types";

export namespace YupSchemaBuilder {
    export const buildYupSchema = (type: EElementType): TYupSchema => {
        try {
            const { elements, focusedElement } = useBuilder();

            const baseSchema = generateBaseYupSchema(elements, focusedElement);

            switch (type) {
                case EElementType.EMAIL:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(EMAIL_YUP_SCHEMA);
                case EElementType.TEXT:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(TEXT_YUP_SCHEMA);
                case EElementType.NUMERIC:
                case EElementType.CONTACT:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(NUMERIC_YUP_SCHEMA);
                case EElementType.TEXTAREA:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(LONG_TEXT_YUP_SCHEMA);
                case EElementType.DROPDOWN:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(DROPDOWN_YUP_SCHEMA);
            }
        } catch (error) {
            console.error("Error in schema helper:", error);
        }
    };
}