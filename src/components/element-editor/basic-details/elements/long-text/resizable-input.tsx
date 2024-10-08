import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { ITextareaAttributes } from "src/context-providers";

export const ResizableInput = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const { control } = useFormContext<ITextareaAttributes>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="resizableInput"
            control={control}
            defaultValue={false}
            render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field;
                return (
                    <TogglePair
                        {...fieldWithoutRef}
                        label={{
                            mainLabel: "Resizable area input",
                            subLabel:
                                "This allows participant to resize text area.",
                        }}
                    />
                );
            }}
            shouldUnregister={true}
        />
    );
};
