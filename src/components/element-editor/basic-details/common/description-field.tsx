import { Text } from "@lifesg/react-design-system/text";
import {
    Controller,
    ControllerRenderProps,
    useFormContext,
} from "react-hook-form";
import { TFormFieldValues } from "src/yup-schemas";
import { StyledTextarea } from "./common.styles";

export const DescriptionField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        field: ControllerRenderProps<TFormFieldValues, "description">
    ) => {
        field.onChange(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${Math.max(40, e.target.scrollHeight)}px`;
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <StyledTextarea
                    {...field}
                    data-testid="description-field"
                    label={{
                        children: "Description text (optional)",
                        subtitle: (
                            <Text.H6 weight={400}>
                                This displays as a description under the label.
                            </Text.H6>
                        ),
                    }}
                    placeholder="Enter description text"
                    rows={1}
                    onChange={(e) => handleTextareaChange(e, field)}
                    errorMessage={errors.description?.message}
                    maxLength={180}
                />
            )}
        />
    );
};