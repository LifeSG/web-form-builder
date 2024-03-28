import * as yup from "yup";
import { useBuilder } from "src/context-providers";
import { EElementType } from "../context-providers/builder/element.types";
import { BaseSchemaHelper } from "./base-helper";
import { EMAIL_SCHEMA } from "./text-based-fields";

export namespace SchemaHelper {
    export const buildSchema = (type: EElementType) => {
        const { elements, focusedElement } = useBuilder();

        const baseTextFieldBasedSchema =
            BaseSchemaHelper.getTextFieldBasedSchema(elements, focusedElement);

        switch (type) {
            case EElementType.EMAIL:
                return yup
                    .object()
                    .concat(baseTextFieldBasedSchema)
                    .concat(EMAIL_SCHEMA);
        }
    };
}
