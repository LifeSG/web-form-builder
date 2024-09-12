import { validateOptions } from "src/yup-schemas/helper";
import * as yup from "yup";

export const RADIO_BUTTON_YUP_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    radioItems: yup
        .array()
        .of(
            yup.object().shape({
                label: yup.string().optional(),
                value: yup.string().optional(),
            })
        )
        .test(
            "min-2-valid-items",
            "At least 2 items with valid label and value are required.",
            function (radioItems) {
                return validateOptions(radioItems, this);
            }
        ),
});
