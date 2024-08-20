import { EValidationType } from "src/context-providers";
import * as yup from "yup";

export const NUMERIC_YUP_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    validation: yup.array().of(
        yup.object().shape({
            validationType: yup
                .string()
                .transform((value) => (value === "" ? undefined : value))
                .required("Validation required.")
                .oneOf(
                    [
                        EValidationType.WHOLE_NUMBERS,
                        EValidationType.MAX_VALUE,
                        EValidationType.MAX_VALUE,
                    ],
                    "Validation type not supported"
                ),
            validationRule: yup.string().when("validationType", {
                is: EValidationType.WHOLE_NUMBERS,
                then: (rule) => rule.optional(),
                otherwise: (rule) =>
                    rule.when("validationType", {
                        is:
                            EValidationType.MIN_VALUE ||
                            EValidationType.MAX_VALUE,
                        then: (rule) =>
                            rule
                                .required("Numeric value required.")
                                .isNumber("Numeric value only."),
                        otherwise: (rule) =>
                            rule.required("Validation rule required."),
                    }),
            }),
            validationErrorMessage: yup
                .string()
                .required("Error message required."),
        })
    ),
});
