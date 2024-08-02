import { EElementType, EValidationType } from "src/context-providers";
import * as yup from "yup";
import { PREFILL_ACTIONID_REGEX, PREFILL_PATH_REGEX } from "./base-helper";

const VALIDATION_DOMAIN_REGEX =
    /^@[^\s]+(\.[^\s]+)*(?:\s*,\s*@[^,\s]+(\.[^,\s]+)*)*$/;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
declare module "yup" {
    interface StringSchema {
        validRegex(message: string): this;
        isNumber(message: string): this;
    }
}

yup.addMethod(yup.string, "validRegex", function (message) {
    const isValidRegex = (pattern: string) => {
        try {
            new RegExp(pattern);
            return true;
        } catch (e) {
            return false;
        }
    };

    return this.test("validRegex", message, function (value) {
        if (isValidRegex(value)) {
            return true;
        }
        return false;
    });
});

yup.addMethod(yup.string, "isNumber", function (message) {
    return this.test("isNumber", message, function (value) {
        if (
            !isNaN(Number(value)) &&
            Number.isInteger(Number(value)) &&
            parseInt(value) >= 0
        ) {
            return true;
        }
        return false;
    });
});

const generateValidationSchema = (elementType: EElementType) => {
    switch (elementType) {
        case EElementType.EMAIL: {
            return yup.array().of(
                yup.object().shape({
                    validationType: yup
                        .string()
                        .required("Validation required."),
                    validationRule: yup.string().when("validationType", {
                        is: EValidationType.EMAIL_DOMAIN,
                        then: (rule) =>
                            rule
                                .required("Email domain required.")
                                .matches(
                                    VALIDATION_DOMAIN_REGEX,
                                    "Invalid email domain. Check if email domain is correct with no whitespace between characters. Separate each with a comma if there is more than 1 email."
                                ),
                        otherwise: (rule) =>
                            rule.required("Validation rule required."),
                    }),
                    validationErrorMessage: yup
                        .string()
                        .required("Error message required."),
                })
            );
        }
        case EElementType.TEXT: {
            return yup.array().of(
                yup.object().shape({
                    validationType: yup
                        .string()
                        .required("Validation required."),
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
                            is:
                                EValidationType.MIN_LENGTH ||
                                EValidationType.MAX_LENGTH,
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
            );
        }
        case EElementType.NUMERIC: {
            return yup.array().of(
                yup.object().shape({
                    validationType: yup
                        .string()
                        .required("Validation required."),
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
            );
        }
    }
};

// =============================================================================
// SCHEMAS
// =============================================================================
export const TEXT_BASED_SCHEMA = (elementType: EElementType) => {
    return yup.object().shape({
        placeholder: yup.string().optional(),
        validation: generateValidationSchema(elementType),
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
};

export const TEXT_AREA_SCHEMA = () => {
    return yup.object().shape({
        placeholder: yup.string().optional(),
        preselectedValue: yup.string().optional(),
        resizableInput: yup.boolean().required().default(true),
        pills: yup.boolean().required().default(true),
        pillItems: yup
            .array()
            .of(
                yup.object().shape({
                    content: yup.string().optional(),
                })
            )
            .test(
                "min-2-valid-items",
                "At least 2 items with valid content are required.",
                function (pillItems) {
                    const validItemsCount = pillItems?.reduce((count, item) => {
                        return item.content && item.content.trim() !== ""
                            ? count + 1
                            : count;
                    }, 0);

                    if (validItemsCount >= 2) {
                        return true;
                    }

                    const errors = pillItems?.reduce((acc, item, index) => {
                        if (!item.content || item.content.trim() === "") {
                            acc.push(
                                this.createError({
                                    path: `${this.path}[${index}].content`,
                                    message: "Pill item content is required.",
                                })
                            );
                        }
                        return acc;
                    }, []);

                    if (errors?.length > 0) {
                        throw new yup.ValidationError(errors);
                    }

                    return true;
                }
            ),

        pillPosition: yup.string().required().default("top"),
        validation: yup.array().of(
            yup.object().shape({
                validationType: yup.string().required("Validation required."),
                validationRule: yup.string().when("validationType", {
                    is: EValidationType.MAX_LENGTH,
                    then: (rule) =>
                        rule
                            .required("Numeric value required.")
                            .isNumber("Numeric value only."),
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
            })
        ),
    });
};

export type TTextBasedSchema = yup.InferType<
    ReturnType<typeof TEXT_BASED_SCHEMA>
>;

export type TTextAreaSchema = yup.InferType<
    ReturnType<typeof TEXT_AREA_SCHEMA>
>;
