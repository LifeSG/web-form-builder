import { IFocusedElement, TElementMap } from "src/context-providers";
import * as yup from "yup";
import { IBaseTextBasedFieldValues } from "./types";

const CAMEL_CASE_REGEX = /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/gm;

export namespace BaseSchemaHelper {
    export const getTextFieldBasedSchema = (
        elements: TElementMap,
        focusedElement: IFocusedElement
    ) =>
        yup.object<IBaseTextBasedFieldValues>().shape({
            type: yup.string().required(),
            label: yup.string().required("Label is required"),
            placeholder: yup.string().optional(),
            required: yup.boolean().required().default(true),
            requiredErrorMsg: yup.string().test({
                name: "requiredErrorMsg",
                test: function (value) {
                    if (this.parent.required && !value) {
                        throw this.createError({
                            message: "Error message is required",
                            path: "requiredErrorMsg",
                        });
                    }
                    return true;
                },
            }),
            id: yup
                .string()
                .required("ID is required")
                .matches(CAMEL_CASE_REGEX, { message: "ID must be camelCase" })
                .notOneOf(
                    Object.values(elements)
                        .map((e) => e.id)
                        .filter((id) => id !== focusedElement.element.id),
                    "ID must not be duplicated"
                ),
        });
}
