import {
    Controller,
    ControllerRenderProps,
    useFormContext,
} from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { EElementType, useBuilder } from "src/context-providers";
import { TFormFieldValues } from "src/schemas";

export const TypeField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const { selectElementType } = useBuilder();
    const {
        control,
        formState: { errors },
        setValue,
    } = useFormContext<TFormFieldValues>();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const handleChange = (
        value: EElementType,
        field: ControllerRenderProps<TFormFieldValues, "type">
    ) => {
        if (value === field.value) {
            return;
        }
        selectElementType(value);
        setValue("validation", []);
        /** The purpose of this setValue is to deliberately clear the preselectedValue
         * when the input type of the preselectedValue is different. Currently,
         * the preselectedValue is different only when the input type is dropdown.
         */
        if (field.value === EElementType.DROPDOWN) {
            setValue("preselectedValue", "");
        }
        field.onChange(value);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="type"
            control={control}
            render={({ field }) => (
                <IconDropdown
                    onBlur={field.onBlur}
                    type={field.value}
                    onChange={(value: EElementType) => {
                        handleChange(value, field);
                    }}
                    errorMessage={errors.type?.message}
                />
            )}
        />
    );
};
