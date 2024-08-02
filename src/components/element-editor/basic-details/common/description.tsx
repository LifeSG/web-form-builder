import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/schemas";
import { StyledTextarea } from "../basic-details.styles";

export const Description = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="description"
            control={control}
            render={({ field }) => {
                const handleTextareaChange = (
                    e: React.ChangeEvent<HTMLTextAreaElement>
                ) => {
                    field.onChange(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.max(40, e.target.scrollHeight)}px`;
                };

                return (
                    <StyledTextarea
                        {...field}
                        label={{
                            children: "Description text (optional)",
                            subtitle: (
                                <Text.H6 weight={400}>
                                    This displays as a description under the
                                    label.
                                </Text.H6>
                            ),
                        }}
                        placeholder="Enter description text"
                        value={field.value || ""}
                        rows={1}
                        onChange={handleTextareaChange}
                        errorMessage={errors.description?.message}
                        maxLength={180}
                    />
                );
            }}
            shouldUnregister={true}
        />
    );
};
