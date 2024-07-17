import * as yup from "yup";

const PREFILL_ACTIONID_REGEX = /^[a-zA-Z0-9_-]+$/;
const PREFILL_PATH_REGEX = /^[a-zA-Z0-9._-]+$/;

export const OPTION_GROUP_BASED_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    dropdownItems: yup
        .array()
        .of(
            yup.object().shape({
                label: yup.string().required("Option label required."),
                value: yup.string().required("Option value required."),
            })
        )
        .min(2, "At least 2 items required."),
    preselectedValue: yup.string().nullable(),
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
    conditionalRendering: yup.array().of(
        yup.object().shape({
            fieldKey: yup.string().required("Reference required."),
            comparator: yup.string().required("Comparator required."),
            value: yup.string().required("Reference value required."),
        })
    ),
});

export type TOptionGroupBasedSchema = yup.InferType<
    typeof OPTION_GROUP_BASED_SCHEMA
>;
