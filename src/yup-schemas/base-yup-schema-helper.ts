import {
    EElementType,
    IFocusedElement,
    TElementMap,
} from "src/context-providers";
import { ID_REGEX, PREFILL_ACTIONID_REGEX, PREFILL_PATH_REGEX } from "src/util";
import * as yup from "yup";

export namespace BaseYupSchemaHelper {
    export const getBaseYupSchema = (
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
            placeholder: yup.string().optional(),
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
            preselectedValue: yup.string().optional(),
            prefill: yup.array().of(
                yup.object().shape({
                    prefillMode: yup.string().required("Source required."),
                    actionId: yup.string().when("prefillMode", {
                        is: "Previous source",
                        then: (rule) =>
                            rule
                                .required("Action ID required.")
                                .matches(
                                    PREFILL_ACTIONID_REGEX,
                                    "Invalid action ID."
                                ),
                        otherwise: (rule) => rule.optional(),
                    }),
                    path: yup
                        .string()
                        .required("Path required.")
                        .matches(PREFILL_PATH_REGEX, "Invalid path."),
                })
            ),
            conditionalRendering: yup.array().of(
                yup.object().shape({
                    fieldKey: yup.string().required("Reference required."),
                    comparator: yup.string().required("Comparator required."),
                    value: yup.string().required("Reference value required."),
                    internalId: yup.string(),
                })
            ),
        });
}
