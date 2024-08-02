import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { TFormFieldValues } from "src/schemas";
import { ToggleWrapper } from "../basic-details.styles";

export const ResizableInput = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const { control } = useFormContext<TFormFieldValues>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <ToggleWrapper>
            <Controller
                name="resizableInput"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                    <TogglePair
                        label={{
                            mainLabel: "Resizable area input",
                            subLabel:
                                "This allows participant to resize text area.",
                        }}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                    />
                )}
                shouldUnregister={true}
            />
        </ToggleWrapper>
    );
};
