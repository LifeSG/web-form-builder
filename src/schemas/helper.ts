import { useBuilder } from "src/context-providers";
import * as yup from "yup";
import { EElementType } from "../context-providers/builder/element.types";
import { BaseSchemaHelper } from "./base-helper";
import { TEXT_BASED_SCHEMA } from "./text-based-fields";

export namespace SchemaHelper {
    export const buildSchema = (type: EElementType) => {
        try {
            const { elements, focusedElement } = useBuilder();

            const baseTextFieldBasedSchema =
                BaseSchemaHelper.getTextFieldBasedSchema(
                    elements,
                    focusedElement
                );

            switch (type) {
                case EElementType.EMAIL:
                    return yup
                        .object()
                        .concat(baseTextFieldBasedSchema)
                        .concat(TEXT_BASED_SCHEMA(type));

                case EElementType.TEXT:
                    return yup
                        .object()
                        .concat(baseTextFieldBasedSchema)
                        .concat(TEXT_BASED_SCHEMA(type));
            }
        } catch (error) {
            console.error("Error in schema helper:", error);
        }
    };
}
