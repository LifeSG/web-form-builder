import * as yup from "yup";
import { useBuilder } from "src/context-providers";
import { EElementType } from "../context-providers/builder/element.types";
import { BaseSchemaHelper } from "./base-helper";
import { EMAIL_SCHEMA, SHORT_TEXT_SCHEMA } from "./text-based-fields";

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
                        .concat(EMAIL_SCHEMA);

                case EElementType.TEXT:
                    return yup
                        .object()
                        .concat(baseTextFieldBasedSchema)
                        .concat(SHORT_TEXT_SCHEMA);
            }
        } catch (error) {
            console.error("Error in schema helper:", error);
        }
    };
}
