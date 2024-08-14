import * as yup from "yup";

export const PREFILL_ACTIONID_REGEX = /^[a-zA-Z0-9_-]+$/;
export const PREFILL_PATH_REGEX = /^[a-zA-Z0-9._-]+$/;

export const PREFILL_YUP_SCHEMA = yup.array().of(
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
);
