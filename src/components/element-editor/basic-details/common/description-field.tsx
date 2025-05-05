import { Typography } from "@lifesg/react-design-system/typography";
import {
    Controller,
    ControllerRenderProps,
    useFormContext,
} from "react-hook-form";
import {
    useBuilder,
    useIsAttributeDisabled,
    useIsElementDisabled,
} from "src/context-providers";
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

    const { focusedElement } = useBuilder();
    const isElementDisabled = useIsElementDisabled(
        focusedElement.element.id,
        focusedElement.element.type
    );
    const isAttributeDisabled = useIsAttributeDisabled(
        focusedElement,
        "description"
    );
    const isDisabled = isElementDisabled || isAttributeDisabled;

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
                    disabled={isDisabled}
                    {...field}
                    data-testid="description-field"
                    label={{
                        children: "Description text (optional)",
                        subtitle: (
                            <Typography.BodySM>
                                This displays as a description under the label.
                            </Typography.BodySM>
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
