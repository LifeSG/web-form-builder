import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { useBuilder } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import {
    FieldEditorAccordionItem,
    MandatoryFieldBox,
} from "./basic-details.styles";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const { focusedElement } = useBuilder();
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const element = focusedElement.element;

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasProperty = (key: string) => {
        return key in element;
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <FieldEditorAccordionItem type="default" expanded title="Basic">
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <IconDropdown
                        type={element?.type}
                        id={element?.id}
                        onChange={(value) => field.onChange(value)}
                    />
                )}
            />
            {hasProperty("label") && (
                <Controller
                    name="label"
                    control={control}
                    data-testid="label-field"
                    render={() => (
                        <Form.Textarea
                            required
                            label="Element Name"
                            rows={1}
                            placeholder="Element Name"
                            errorMessage={errors.label?.message}
                            maxLength={40}
                            value={element?.label}
                        />
                    )}
                />
            )}
            <MandatoryFieldBox>
                <Controller
                    name="required"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                        <TogglePair
                            label="Mandatory field"
                            defaultValue={true}
                            onChange={(value) => field.onChange(value)}
                        />
                    )}
                />
                {watch("required", true) && (
                    <Form.Input
                        role="input"
                        data-testid="required-error-message-input"
                        label="Error message"
                        errorMessage={errors.requiredErrorMsg?.message}
                    />
                )}
            </MandatoryFieldBox>
            <Controller
                name="id"
                control={control}
                data-testid="id-field"
                render={() => (
                    <Form.Input
                        label={{
                            children: "ID",
                            subtitle: (
                                <Text.H6 weight={400}>
                                    ID is used to differentiate element from the
                                    others in the UI schema.
                                </Text.H6>
                            ),
                        }}
                        required
                        placeholder="Create an ID"
                        errorMessage={errors.id?.message}
                    />
                )}
            />

            {hasProperty("placeholder") && (
                <Controller
                    name="placeholder"
                    control={control}
                    render={() => (
                        <Form.Input
                            label="Placeholder text (optional)"
                            placeholder="Enter placeholder text"
                            errorMessage={errors.placeholder?.message}
                        />
                    )}
                />
            )}
        </FieldEditorAccordionItem>
    );
};
