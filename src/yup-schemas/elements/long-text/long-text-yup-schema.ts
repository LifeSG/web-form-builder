import { EValidationType } from "src/context-providers";
import * as yup from "yup";

export const LONG_TEXT_YUP_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    resizableInput: yup.boolean().required(),
    pills: yup.boolean().required(),
    pillItems: yup
        .array()
        .of(
            yup.object().shape({
                content: yup.string().optional(),
            })
        )
        .test(
            "min-2-valid-items",
            "At least 2 items with valid content are required.",
            function (pillItems) {
                const validItemsCount = pillItems?.reduce((count, item) => {
                    return item.content && item.content.trim() !== ""
                        ? count + 1
                        : count;
                }, 0);

                if (validItemsCount >= 2) {
                    return true;
                }

                const errors = pillItems?.reduce((acc, item, index) => {
                    if (!item.content || item.content.trim() === "") {
                        acc.push(
                            this.createError({
                                path: `${this.path}[${index}].content`,
                                message: "Pill item content is required.",
                            })
                        );
                    }
                    return acc;
                }, []);

                if (errors?.length > 0) {
                    throw new yup.ValidationError(errors);
                }

                return true;
            }
        ),
    pillPosition: yup.string().oneOf(["top", "bottom"]),
    validation: yup.array().of(
        yup.object().shape({
            validationType: yup
                .string()
                .transform((value) => (value === "" ? undefined : value))
                .required("Validation required.")
                .oneOf(
                    [EValidationType.MAX_LENGTH],
                    "Validation type must be MAX_LENGTH"
                ),
            validationRule: yup.string().when("validationType", {
                is: EValidationType.MAX_LENGTH,
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
});
