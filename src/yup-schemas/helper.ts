import {
    EElementType,
    IFocusedElement,
    IOptionAttributes,
    TElementMap,
} from "src/context-providers";
import * as yup from "yup";

const ID_REGEX = /^[a-z]+(?:[A-Z0-9][a-z0-9]*)*(?:[-_][a-z0-9]+)*$/gm;
export const PREFILL_ACTIONID_REGEX = /^[a-zA-Z0-9_-]+$/;
export const PREFILL_PATH_REGEX = /^[a-zA-Z0-9._-]+$/;

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

export const validateOptions = (
    options: IOptionAttributes[],
    context: yup.TestContext<yup.AnyObject>
) => {
    const validItemsCount = options.filter(
        (item) => item.label && item.value
    ).length;

    const allItemsValidOrEmpty = options.every(
        (item) => (item.label && item.value) || (!item.label && !item.value)
    );

    if (validItemsCount >= 2 && allItemsValidOrEmpty) {
        return true;
    }

    const errors = options.reduce((acc, item, index) => {
        if (!item.label && !item.value && validItemsCount >= 2) {
            return acc;
        }
        if (!item.label) {
            acc.push(
                context.createError({
                    path: `${context.path}[${index}].label`,
                    message: "Option label required.",
                })
            );
        }
        if (!item.value) {
            acc.push(
                context.createError({
                    path: `${context.path}[${index}].value`,
                    message: "Option value required.",
                })
            );
        }
        return acc;
    }, []);

    throw new yup.ValidationError(errors);
};

export const generateBaseYupSchema = (
    elements: TElementMap,
    focusedElement: IFocusedElement
) =>
    yup.object().shape({
        internalId: yup.string().required("Internal ID required."),
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
export type TBaseValues = yup.InferType<
    ReturnType<typeof generateBaseYupSchema>
>;
