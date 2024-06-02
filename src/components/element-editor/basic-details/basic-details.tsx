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

interface IBasicDetailsProps {
    elementType: EElementType;
    elementName: string;
    required: boolean;
    requiredErrorMsg?: string;
    id?: string;
    placeholder?: string;
}

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
    const [basicDetails, setBasicDetails] = useState<IBasicDetailsProps>({
        elementType: element?.type || EElementType.EMAIL,
        elementName: element?.label || "",
        required: element?.required,
        requiredErrorMsg: element?.requiredErrorMsg || "",
        id: element?.id || "",
        placeholder: element?.placeholder || "",
    });

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasProperty = (key: string) => {
        return key in element;
    };

    const handleChangeField = (
        value: string | EElementType | boolean,
        fieldType: string,
        field: (value: string | boolean) => void
    ) => {
        const updatedValue = { ...basicDetails, [fieldType]: value };
        setBasicDetails(updatedValue);
        field(value);
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
                    render={({ field }) => (
                        <IconDropdown
                            type={basicDetails.elementType}
                            id={element?.id}
                            onChange={(value: EElementType) => {
                                handleChangeField(
                                    value,
                                    "elementType",
                                    field.onChange
                                );
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
                                value={basicDetails.elementName}
                                onChange={(e) => {
                                    handleChangeField(
                                        e.target.value,
                                        "elementName",
                                        field.onChange
                                    );
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
                                label="Mandatory field"
                                value={basicDetails.required}
                                onChange={(value) => {
                                    handleChangeField(
                                        value,
                                        "required",
                                        field.onChange
                                    );
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
                                    value={basicDetails.requiredErrorMsg}
                                    onChange={(e) => {
                                        handleChangeField(
                                            e.target.value,
                                            "requiredErrorMsg",
                                            field.onChange
                                        );
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
                            value={basicDetails.id}
                            onChange={(e) => {
                                handleChangeField(
                                    e.target.value,
                                    "id",
                                    field.onChange
                                );
                            }}
                            errorMessage={errors.id?.message}
                        />
                    )}
                    shouldUnregister={true}
                />

                {element?.hasOwnProperty("placeholder") && (
                    <Controller
                        name="placeholder"
                        control={control}
                        render={({ field }) => (
                            <Form.Input
                                {...field}
                                label="Placeholder text (optional)"
                                placeholder="Enter placeholder text"
                                value={basicDetails.placeholder}
                                onChange={(e) => {
                                    handleChangeField(
                                        e.target.value,
                                        "placeholder",
                                        field.onChange
                                    );
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
