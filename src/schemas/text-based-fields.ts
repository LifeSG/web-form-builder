import { EElementType } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
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
        const { path, createError } = this;
        if (isValidRegex(value)) {
            return true;
        }
        return createError({ path, message });
    });
});

yup.addMethod(yup.string, "isNumber", function (message) {
    return this.test("isNumber", message, function (value) {
        const { path, createError } = this;
        if (
            !isNaN(Number(value)) &&
            Number.isInteger(Number(value)) &&
            parseInt(value) >= 0
        ) {
            return true;
        }
        return createError({ path, message });
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
                        is: (value: string) => {
                            return ELEMENT_VALIDATION_TYPES["Text field"][
                                EElementType.EMAIL
                            ].validationTypes.includes(value);
                        },
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
                            is: (value: string) => {
                                const validationTypes =
                                    ELEMENT_VALIDATION_TYPES["Text field"][
                                        EElementType.TEXT
                                    ].validationTypes;
                                return (
                                    validationTypes.includes(value) &&
                                    value === "Custom regex"
                                );
                            },
                            then: (rule) =>
                                rule
                                    .required("Custom regex required.")
                                    .validRegex("Regex not valid."),
                        })
                        .when("validationType", {
                            is: (value: string) => {
                                const validationTypes =
                                    ELEMENT_VALIDATION_TYPES["Text field"][
                                        EElementType.TEXT
                                    ].validationTypes;
                                return (
                                    validationTypes.includes(value) &&
                                    (value === "Minimum length" ||
                                        value === "Maximum length")
                                );
                            },
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
                        is: ELEMENT_VALIDATION_TYPES["Text field"][
                            EElementType.NUMERIC
                        ].validationTypes[0],
                        then: (rule) => rule.optional(),
                        otherwise: (rule) =>
                            rule.when("validationType", {
                                is:
                                    ELEMENT_VALIDATION_TYPES["Text field"][
                                        EElementType.NUMERIC
                                    ].validationTypes[1] ||
                                    ELEMENT_VALIDATION_TYPES["Text field"][
                                        EElementType.NUMERIC
                                    ].validationTypes[2],
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
        validation: yup.array().of(
            yup.object().shape({
                validationType: yup.string().required("Validation required."),
                validationRule: yup.string().when("validationType", {
                    is: (value: string) => {
                        return ELEMENT_VALIDATION_TYPES["Text field"][
                            EElementType.TEXTAREA
                        ].validationTypes.includes(value);
                    },
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
