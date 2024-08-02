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
                        setValue("type", value, {
                            shouldTouch: true,
                            shouldDirty: true,
                        });
                        setValue("validation", []);
                    }}
                    errorMessage={errors.type?.message}
                />
            )}
            shouldUnregister={true}
        />
    );
};
