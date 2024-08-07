import {
    Controller,
    ControllerRenderProps,
    useFormContext,
} from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { EElementType, TElement, useBuilder } from "src/context-providers";
import { TFormFieldValues } from "src/schemas";
import { ElementObjectGenerator } from "src/util";

export const TypeField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const { selectElementType, orderedIdentifiers, elements, focusedElement } =
        useBuilder();
    const {
        control,
        formState: { errors },
        reset,
    } = useFormContext<TFormFieldValues>();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const resetFieldValues = (type: EElementType) => {
        const existingIdentifiers = orderedIdentifiers
            .filter(
                (elementId) =>
                    elementId.internalId !== focusedElement.element.internalId
            )
            .map((elementId) => elementId.internalId);

        const existingIds = Object.values(elements)
            .filter((element) => element.id !== focusedElement.element.id)
            .map((element) => element.id);

        const newElement: TElement = ElementObjectGenerator.generate(
            type,
            existingIdentifiers,
            existingIds
        );

        reset(newElement, {
            keepDefaultValues: true, // Dirty form upon changing type
        });
    };

    const handleChange = (
        value: EElementType,
        field: ControllerRenderProps<TFormFieldValues, "type">
    ) => {
        if (value === field.value) {
            return;
        }
        selectElementType(value);

        // Reset all field values and populate with default values
        resetFieldValues(value);

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
