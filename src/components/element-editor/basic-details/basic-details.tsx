import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import {
    EElementType,
    ITextareaFieldAttributes,
    useBuilder,
} from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import {
    FieldEditorAccordionItem,
    MandatoryFieldBox,
    StyledTextarea,
    Wrapper,
} from "./basic-details.styles";
import { TopPositionIcon } from "../../../icons/top-position-icon";
import { BottomPositionIcon } from "../../../icons/bottom-position-icon";
import { PillFields } from "src/components/common/pills";
import { useEffect } from "react";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement, updateFocusedElement, elements } = useBuilder();
    const {
        control,
        formState: { errors, isDirty },
        reset,
        watch,
        setValue,
    } = useFormContext<IBaseTextBasedFieldValues | ITextareaFieldAttributes>();
    const element = focusedElement.element;

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
        updateFocusedElement(!!isDirty);
    }, [isDirty, updateFocusedElement]);

    useEffect(() => {
        reset(element, {
            keepDirty: true,
            keepValues: true,
        });
    }, []);

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
                    render={({ field }) => (
                        <IconDropdown
                            type={field.value}
                            id={element?.id}
                            onChange={(value: EElementType) => {
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

                {hasProperty("label") && (
                    <Controller
                        name="label"
                        control={control}
                        render={({ field }) => (
                            <Form.Textarea
                                {...field}
                                required
                                label="Element Name"
                                rows={1}
                                placeholder="Element Name"
                                value={field.value as string}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
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
                        render={({ field }) => (
                            <TogglePair
                                label={{
                                    mainLabel: "Mandatory field",
                                }}
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                id={element.internalId}
                            />
                        )}
                        shouldUnregister={true}
                    />

                    {watch("required", true) && (
                        <Controller
                            name="requiredErrorMsg"
                            control={control}
                            render={({ field }) => (
                                <Form.Input
                                    {...field}
                                    label="Error message"
                                    value={field.value || ""}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
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
                            value={field.value || ""}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
                            errorMessage={errors.id?.message}
                        />
                    )}
                    shouldUnregister={true}
                />
                {hasProperty("resizableInput") && (
                    <Controller
                        name="resizableInput"
                        control={control}
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
                                id={element.internalId}
                            />
                        )}
                        shouldUnregister={true}
                    />
                )}

                {hasProperty("pills") && (
                    <MandatoryFieldBox>
                        <Controller
                            name="pills"
                            control={control}
                            render={({ field }) => (
                                <TogglePair
                                    label={{
                                        mainLabel: "Pills",
                                        subLabel:
                                            "This allows a list of selectable short texts to display in pill form. This helps participant to fill up text area fast with less typing.",
                                    }}
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    id={element.internalId}
                                />
                            )}
                            shouldUnregister={true}
                        />

                        {watch("pills", true) && (
                            <>
                                <PillFields id={element.internalId} />
                            </>
                        )}
                    </MandatoryFieldBox>
                )}

                {hasProperty("description") && (
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
                                                This displays as a description
                                                under the label.
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
                )}

                {hasProperty("placeholder") && (
                    <Controller
                        name="placeholder"
                        control={control}
                        render={({ field }) => (
                            <Form.Input
                                {...field}
                                label="Placeholder text (optional)"
                                placeholder="Enter placeholder text"
                                value={field.value || ""}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                errorMessage={errors.placeholder?.message}
                            />
                        )}
                        shouldUnregister={true}
                    />
                )}
                {hasProperty("preSelectedValue") && (
                    <Controller
                        name="preSelectedValue"
                        control={control}
                        render={({ field }) => (
                            <Form.Input
                                {...field}
                                label={{
                                    children: "Pre-selected value (optional)",
                                    subtitle: (
                                        <Text.H6 weight={400}>
                                            Note that prefill value will replace
                                            the pre-selected value, if present.
                                        </Text.H6>
                                    ),
                                }}
                                placeholder="Enter pre-selected value"
                                value={field.value || ""}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                errorMessage={errors.id?.message}
                            />
                        )}
                        shouldUnregister={true}
                    />
                )}
            </Wrapper>
        </FieldEditorAccordionItem>
    );
};
