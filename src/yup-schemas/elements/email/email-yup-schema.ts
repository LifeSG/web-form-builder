import { EValidationType } from "src/context-providers";
import * as yup from "yup";

const VALIDATION_DOMAIN_REGEX =
    /^@[^\s]+(\.[^\s]+)*(?:\s*,\s*@[^,\s]+(\.[^,\s]+)*)*$/;

export const EMAIL_YUP_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    validation: yup.array().of(
        yup.object().shape({
            validationType: yup
                .string()
                .transform((value) => (value === "" ? undefined : value))
                .required("Validation required.")
                .oneOf(
                    [EValidationType.EMAIL_DOMAIN],
                    "Validation type must be EMAIL_DOMAIN"
                ),
            validationRule: yup.string().when("validationType", {
                is: EValidationType.EMAIL_DOMAIN,
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
});
