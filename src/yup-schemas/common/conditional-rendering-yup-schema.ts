import * as yup from "yup";

export const CONDITIONAL_RENDERING_SCHEMA = yup.array().of(
    yup.object().shape({
        fieldKey: yup.string().required("Reference required."),
        comparator: yup.string().required("Comparator required."),
        value: yup.string().required("Reference value required."),
        internalId: yup.string(),
    })
);
