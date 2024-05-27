import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { EElementType, useBuilder } from "src/context-providers";
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
        formState: { errors, isDirty },
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const element = focusedElement.element;
    const [elementType, setElementType] = useState<EElementType>(element.type);
    const [elementName, setElementName] = useState<string>(element.label);
    const [required, setRequired] = useState<boolean>(element.required || true);
    const [requiredErrorMsg, setRequiredErrorMsg] = useState<string>(
        element.requiredErrorMsg || ""
    );
    const [id, setId] = useState<string>(element.id || "");
    const [placeholder, setPlaceholder] = useState(element.placeholder || "");

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
        if (isDirty) {
            updateFocusedElement(true);
        }
    }, [isDirty, updateFocusedElement]);

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
                    defaultValue={elementType}
                    render={({ field }) => (
                        <IconDropdown
                            type={elementType}
                            id={element?.id}
                            onChange={(value: EElementType) => {
                                setElementType(value);
                                field.onChange({ target: { value: value } });
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
                        defaultValue={elementName}
                        render={({ field }) => (
                            <Form.Textarea
                                {...field}
                                required
                                label="Element Name"
                                rows={1}
                                placeholder="Element Name"
                                value={elementName}
                                onChange={(e) => {
                                    setElementName(e.target.value);
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
                        defaultValue={required}
                        render={({ field }) => (
                            <TogglePair
                                label="Mandatory field"
                                defaultValue={required}
                                onChange={(value) => {
                                    setRequired(value);
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
                            defaultValue={requiredErrorMsg}
                            render={({ field }) => (
                                <Form.Input
                                    {...field}
                                    label="Error message"
                                    defaultValue={element.requiredErrorMsg}
                                    value={requiredErrorMsg}
                                    onChange={(e) => {
                                        setRequiredErrorMsg(e.target.value);
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
                    defaultValue={id}
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
                            value={id}
                            onChange={(e) => {
                                setId(e.target.value);
                                field.onChange(e.target.value);
                            }}
                            errorMessage={errors.id?.message}
                        />
                    )}
                    shouldUnregister={true}
                />

                {hasProperty("placeholder") && (
                    <Controller
                        name="placeholder"
                        control={control}
                        defaultValue={placeholder}
                        render={({ field }) => (
                            <Form.Input
                                {...field}
                                label="Placeholder text (optional)"
                                placeholder="Enter placeholder text"
                                value={placeholder}
                                onChange={(e) => {
                                    setPlaceholder(e.target.value);
                                    field.onChange(e.target.value);
                                }}
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
