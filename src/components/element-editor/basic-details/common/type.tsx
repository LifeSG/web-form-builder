import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { EElementType, useBuilder } from "src/context-providers";
import { TFormFieldValues } from "src/schemas";

export const Type = () => {
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
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="type"
            control={control}
            render={({ field }) => (
                <IconDropdown
                    type={field.value}
                    onChange={(value: EElementType) => {
                        selectElementType(value);
                        setValue("validation", []);
                        // setTimeout is used here to ensure the value is updated after the mounting of the new basic details components
                        setTimeout(() => field.onChange(value));
                    }}
                    onBlur={field.onBlur}
                    errorMessage={errors.type?.message}
                />
            )}
            shouldUnregister={true}
        />
    );
};
