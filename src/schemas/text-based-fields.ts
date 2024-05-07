import {
    EElementType,
    IBaseTextBasedFieldAttributes,
} from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import * as yup from "yup";

const DOMAIN_REGEX = /^@[^\s]+(\.[^\s]+)*(\s*,\s*@([^\s]+(\.[^\s]+)*)+)*$/;

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
                        .required("Email address required.")
                        .matches(
                            DOMAIN_REGEX,
                            "Invalid email address format.  Check if email address is correct with no whitespace between characters. Separate each address with a comma if there is more than 1 email."
                        ),
                otherwise: (rule) => rule.required("Validation rule required."),
            }),

            validationErrorMessage: yup
                .string()
                .required("Error message required."),
        })
    ),
});
