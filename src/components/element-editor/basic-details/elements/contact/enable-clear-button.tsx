import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { IContactFieldAttributes } from "src/context-providers";

export const EnableClearButton = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const { control } = useFormContext<IContactFieldAttributes>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="enableClearButton"
            control={control}
            defaultValue={false}
            render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field;
                return (
                    <TogglePair
                        {...fieldWithoutRef}
                        label={{
                            mainLabel: "Enable clear button",
                            subLabel:
                                "This enables form participant to remove contact number input with a click on a clear button.",
                        }}
                    />
                );
            }}
            shouldUnregister={true}
        />
    );
};
