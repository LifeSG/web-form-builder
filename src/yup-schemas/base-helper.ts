import {
    EElementType,
    IFocusedElement,
    TElementMap,
} from "src/context-providers";
import * as yup from "yup";
import { CONDITIONAL_RENDERING_SCHEMA, PREFILL_YUP_SCHEMA } from "./common";

const ID_REGEX = /^[a-z]+(?:[A-Z0-9][a-z0-9]*)*(?:[-_][a-z0-9]+)*$/gm;

export namespace BaseSchemaHelper {
    export const getBaseSchema = (
        elements: TElementMap,
        focusedElement: IFocusedElement
    ) =>
        yup.object().shape({
            type: yup
                .string()
                .oneOf(Object.values(EElementType))
                .required("Element type required."),
            label: yup.string().required("Label required."),
            required: yup.boolean().required().default(true),
            requiredErrorMsg: yup.string().when("required", {
                is: true,
                then: (rule) => rule.required("Error message required."),
                otherwise: (rule) => rule.optional(),
            }),
            description: yup.string().optional(),
            id: yup
                .string()
                .required("ID required.")
                .matches(ID_REGEX, { message: "ID must be camelCase." })
                .notOneOf(
                    Object.values(elements)
                        .map((e) => e.id)
                        .filter((id) => id !== focusedElement?.element.id),
                    "ID must not be duplicated."
                ),
            prefill: PREFILL_YUP_SCHEMA,
            conditionalRendering: CONDITIONAL_RENDERING_SCHEMA,
        });
    export type TBaseSchema = yup.InferType<ReturnType<typeof getBaseSchema>>;
}
