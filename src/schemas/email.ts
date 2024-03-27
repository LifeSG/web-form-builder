import * as yup from "yup";

export const buildEmailSchema = (baseSchema: yup.AnyObjectSchema) => {
    const schema = baseSchema.shape({
        label: yup.string().required(),
        placeholder: yup.string().optional(),
    });

    return schema;
};
