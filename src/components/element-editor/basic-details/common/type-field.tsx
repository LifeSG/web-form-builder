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
        selectElementType(value);
        setValue("validation", []);
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
            shouldUnregister={true}
        />
    );
};
