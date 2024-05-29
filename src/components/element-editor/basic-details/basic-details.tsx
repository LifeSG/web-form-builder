import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { useBuilder } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import {
    FieldEditorAccordionItem,
    MandatoryFieldBox,
    Wrapper,
} from "./basic-details.styles";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const { focusedElement, updateFocusedElement } = useBuilder();
    const {
        control,
        formState: { errors, isDirty, touchedFields },
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const element = focusedElement.element;
    const shouldUpdateFocusedElement =
        isDirty && Object.keys(touchedFields)?.length > 0;

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasProperty = (key: string) => {
        return key in element;
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================
    useEffect(() => {
        if (shouldUpdateFocusedElement) {
            updateFocusedElement(true);
        }
    }, [shouldUpdateFocusedElement]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <FieldEditorAccordionItem
            type="default"
            expanded
            title="Basic"
            $hideTopBorder={focusedElement.isDirty}
        >
            <Wrapper>
                <Controller
                    name="type"
                    control={control}
                    defaultValue={element?.type}
                    render={({ field }) => (
                        <IconDropdown
                            type={element?.type}
                            id={element?.id}
                            errorMessage={errors.type?.message}
                            onChange={(value) =>
                                field.onChange({ target: { value: value } })
                            }
                        />
                    )}
                    shouldUnregister={true}
                />

                {hasProperty("label") && (
                    <Controller
                        name="label"
                        control={control}
                        defaultValue={element?.label}
                        render={({ field }) => (
                            <Form.Textarea
                                {...field}
                                required
                                label="Element Name"
                                rows={1}
                                placeholder="Element Name"
                                errorMessage={errors.label?.message}
                                maxLength={40}
                            />
                        )}
                        shouldUnregister={true}
                    />
                )}

                <MandatoryFieldBox>
                    <Controller
                        name="required"
                        control={control}
                        defaultValue={element.required}
                        render={({ field }) => (
                            <TogglePair
                                label="Mandatory field"
                                defaultValue={element.required}
                                id={element.internalId}
                                onChange={(value) => field.onChange(value)}
                            />
                        )}
                        shouldUnregister={true}
                    />

                    {watch("required", true) && (
                        <Controller
                            name="requiredErrorMsg"
                            control={control}
                            defaultValue={element.requiredErrorMsg}
                            render={({ field }) => (
                                <Form.Input
                                    {...field}
                                    label="Error message"
                                    defaultValue={element.requiredErrorMsg}
                                    errorMessage={
                                        errors.requiredErrorMsg?.message
                                    }
                                />
                            )}
                            shouldUnregister={true}
                        />
                    )}
                </MandatoryFieldBox>

                <Controller
                    name="id"
                    control={control}
                    defaultValue={element?.id}
                    render={({ field }) => (
                        <Form.Input
                            {...field}
                            label={{
                                children: "ID",
                                subtitle: (
                                    <Text.H6 weight={400}>
                                        ID is used to differentiate element from
                                        the others in the UI schema.
                                    </Text.H6>
                                ),
                            }}
                            placeholder="Create an ID"
                            errorMessage={errors.id?.message}
                        />
                    )}
                    shouldUnregister={true}
                />

                {hasProperty("placeholder") && (
                    <Controller
                        name="placeholder"
                        control={control}
                        defaultValue={element?.placeholder}
                        render={({ field }) => (
                            <Form.Input
                                {...field}
                                label="Placeholder text (optional)"
                                placeholder="Enter placeholder text"
                                errorMessage={errors.placeholder?.message}
                            />
                        )}
                        shouldUnregister={true}
                    />
                )}
            </Wrapper>
        </FieldEditorAccordionItem>
    );
};
