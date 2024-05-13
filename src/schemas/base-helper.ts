import {
    IBaseFieldAttributes,
    IFocusedElement,
    TElementMap,
} from "src/context-providers";
import * as yup from "yup";

const CAMEL_CASE_REGEX = /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/gm;

export namespace BaseSchemaHelper {
    export const getTextFieldBasedSchema = (
        elements: TElementMap,
        focusedElement: IFocusedElement
    ) =>
        yup.object<IBaseFieldAttributes>().shape({
            type: yup.string().required("Element type required."),
            label: yup.string().required("Label required."),
            required: yup.boolean().required().default(true),
            requiredErrorMsg: yup.string().optional(),
            id: yup
                .string()
                .required("ID required.")
                .matches(CAMEL_CASE_REGEX, { message: "ID must be camelCase." })
                .notOneOf(
                    Object.values(elements)
                        .map((e) => e.id)
                        .filter((id) => id !== focusedElement?.element.id),
                    "ID must not be duplicated."
                ),
        });
}
