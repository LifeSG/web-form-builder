import {
    EElementType,
    IBaseTextBasedFieldAttributes,
} from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import * as yup from "yup";

const VALIDATION_DOMAIN_REGEX =
    /^@[^\s]+(\.[^\s]+)*(?:\s*,\s*@[^,\s]+(\.[^,\s]+)*)*$/;
const PREFILL_ACTIONID_REGEX = /^[a-zA-Z0-9_-]+$/;
const PREFILL_PATH_REGEX = /^[a-zA-Z0-9._-]+$/;

export const EMAIL_SCHEMA = yup.object<IBaseTextBasedFieldAttributes>().shape({
    placeholder: yup.string().optional(),
    validation: yup.array().of(
        yup.object().shape({
            validationType: yup.string().required("Validation required."),

            validationRule: yup.string().when("validationType", {
                is: ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
                    .validationTypes[0],
                then: (rule) =>
                    rule
                        .required("Email domain required.")
                        .matches(
                            VALIDATION_DOMAIN_REGEX,
                            "Invalid email domain. Check if email domain is correct with no whitespace between characters. Separate each with a comma if there is more than 1 email."
                        ),
                otherwise: (rule) => rule.required("Validation rule required."),
            }),

            validationErrorMessage: yup
                .string()
                .required("Error message required."),
        })
    ),
    prefill: yup.array().of(
        yup.object().shape({
            prefillMode: yup.string().required("Source required."),
            actionId: yup.string().when("prefillMode", {
                is: "Previous source",
                then: (rule) =>
                    rule
                        .required("Action ID required.")
                        .matches(PREFILL_ACTIONID_REGEX, "Invalid action ID."),
                otherwise: (rule) => rule.optional(),
            }),
            path: yup
                .string()
                .required("Path required.")
                .matches(PREFILL_PATH_REGEX, "Invalid path."),
        })
    ),
});
