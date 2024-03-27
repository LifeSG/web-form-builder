import { useMemo } from "react";
import { IFieldValues } from "../components/element-editor/types";
import * as yup from "yup";
import { useBuilder } from "src/context-providers";
import { EElementType } from "./types";
import { buildEmailSchema } from "./email";

export const buildSchema = (type: EElementType) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { elements, focusedElement } = useBuilder();

    const camelCaseRegex = /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/gm;
    const baseSchema = yup.object<IFieldValues>().shape({
        type: yup.string().required(),
        required: yup.boolean().required().default(false),
        requiredErrorMsg: yup.string().optional(),
        id: yup
            .string()
            .required("ID is required")
            .matches(camelCaseRegex, { message: "ID must be camelcase" })
            .notOneOf(
                Object.values(elements)
                    .map((e) => e.id)
                    .filter((id) => id !== focusedElement.element.id),
                "ID must not be duplicated"
            ),
    });

    switch (type) {
        case EElementType.EMAIL:
            return buildEmailSchema(baseSchema);
    }
};
