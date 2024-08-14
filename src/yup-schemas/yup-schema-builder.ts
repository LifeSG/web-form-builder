import { useBuilder } from "src/context-providers";
import * as yup from "yup";
import { EElementType } from "../context-providers/builder/element.types";
import { BaseYupSchemaHelper } from "./base-yup-schema-helper";
import { OPTION_GROUP_BASED_SCHEMA } from "./option-group-based-fields";
import { TEXT_AREA_SCHEMA, TEXT_BASED_SCHEMA } from "./text-based-fields";
import { TYupSchema } from "./types";

export namespace YupSchemaBuilder {
    export const buildYupSchema = (type: EElementType): TYupSchema => {
        try {
            const { elements, focusedElement } = useBuilder();

            const baseSchema = BaseYupSchemaHelper.getBaseYupSchema(
                elements,
                focusedElement
            );

            switch (type) {
                case EElementType.EMAIL:
                case EElementType.TEXT:
                case EElementType.NUMERIC:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(TEXT_BASED_SCHEMA(type));
                case EElementType.TEXTAREA:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(TEXT_AREA_SCHEMA());
                case EElementType.DROPDOWN:
                    return yup
                        .object()
                        .concat(baseSchema)
                        .concat(OPTION_GROUP_BASED_SCHEMA);
            }
        } catch (error) {
            console.error("Error in schema helper:", error);
        }
    };
}
