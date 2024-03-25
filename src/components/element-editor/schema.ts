import { useMemo } from "react";
import { IFieldValues } from "./types";
import * as yup from "yup";
import { useBuilder } from "src/context-providers";

// TODO: add element-based schema building; only for email as of now
export const buildSchema = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { elements, focusedElement } = useBuilder();

    const camelCaseRegex = /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/gm;

    const schema = useMemo(() => {
        return yup.object<IFieldValues>().shape({
            id: yup
                .string()
                .required("ID is required")
                .matches(camelCaseRegex, { message: "ID must be camelcase" })
                .notOneOf(
                    Array.from(elements.values())
                        .map((e) => e.id)
                        .filter((id) => id !== focusedElement.element.id),
                    "ID must not be duplicated"
                ),
            label: yup.string().required(),
            type: yup.string().required(),
            placeholder: yup.string().optional(),
        });
    }, []);

    return schema;
};
