import { EValidationType } from "src/context-providers";
import * as yup from "yup";

export const CONTACT_YUP_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    enableClearButton: yup.boolean().optional(),
    defaultCountryCode: yup.string().optional(),
    displayAsFixedCountryCode: yup.boolean().optional(),
    validation: yup.array().of(
        yup.object().shape({
            validationType: yup
                .string()
                .required("Validation type required.")
                .oneOf(
                    [EValidationType.CONTACT_NUMBER],
                    "Invalid validation type."
                ),
            validationRule: yup
                .string()
                .when(["defaultCountryCode", "displayAsFixedCountryCode"], {
                    is: (
                        defaultCountryCode: string,
                        displayAsFixedCountryCode: boolean
                    ) =>
                        defaultCountryCode === "65" &&
                        displayAsFixedCountryCode,
                    then: (rule) =>
                        rule.required(
                            "Validation rule required when country code is '65' and display as fixed country code is true."
                        ),
                    otherwise: (rule) => rule.optional(),
                }),
            validationErrorMessage: yup
                .string()
                .required("Error message required."),
        })
    ),
});
