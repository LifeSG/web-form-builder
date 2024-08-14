import { useBuilder } from "src/context-providers";
import * as yup from "yup";
import { EElementType } from "../context-providers/builder/element.types";
import { BaseSchemaHelper } from "./base-helper";
import { OPTION_GROUP_BASED_SCHEMA } from "./option-group-based-fields";
import { TEXT_AREA_SCHEMA, TEXT_BASED_SCHEMA } from "./text-based-fields";
import { TYupSchema } from "./types";

export namespace SchemaHelper {
    export const buildSchema = (type: EElementType): TYupSchema => {
        try {
            const { elements, focusedElement } = useBuilder();

            const baseSchema = BaseSchemaHelper.getBaseSchema(
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
