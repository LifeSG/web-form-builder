import { EValidationType } from "src/context-providers";
import * as yup from "yup";

export const TEXT_YUP_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    validation: yup.array().of(
        yup.object().shape({
            validationType: yup
                .string()
                .transform((value) => (value === "" ? undefined : value))
                .required("Validation required.")
                .oneOf(
                    [
                        EValidationType.CUSTOM_REGEX,
                        EValidationType.MIN_LENGTH,
                        EValidationType.MAX_LENGTH,
                    ],
                    "Validation type not supported"
                ),
            validationRule: yup
                .string()
                .when("validationType", {
                    is: EValidationType.CUSTOM_REGEX,
                    then: (rule) =>
                        rule
                            .required("Custom regex required.")
                            .validRegex("Regex not valid."),
                })
                .when("validationType", {
                    is: (val: EValidationType) =>
                        val === EValidationType.MIN_LENGTH ||
                        val === EValidationType.MAX_LENGTH,
                    then: (rule) =>
                        rule
                            .required("Numeric value required.")
                            .isNumber("Numeric value only."),
                    otherwise: (rule) =>
                        rule.required("Validation rule required."),
                }),
            validationErrorMessage: yup
                .string()
                .required("Error message required."),
        })
    ),
});
