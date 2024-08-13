import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { Pills } from "src/components/common/pills";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import {
    EElementType,
    TextBasedElementTypes,
    useBuilder,
} from "src/context-providers";
import { TFormFieldValues } from "src/schemas";
import {
    FieldEditorAccordionItem,
    MandatoryFieldBox,
    StyledTextarea,
    ToggleWrapper,
    Wrapper,
} from "./basic-details.styles";
import { DropdownItems } from "./dropdown-items/dropdown-items";
import { DropdownPreselectedValue } from "./dropdown-preselected-value";
import { TextBasedPreselectedValue } from "./text-based-preselected-value";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement, selectElementType } = useBuilder();
    const {
        control,
        formState: { errors, isDirty },
        watch,
        setValue,
        resetField,
    } = useFormContext<TFormFieldValues>();
    const element = focusedElement.element;
    const type = watch("type", focusedElement.element?.type) as EElementType;
    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasProperty = (key: string) => {
        return key in element;
    };

    // =========================================================================
    // EFFECT
    // =========================================================================

    useEffect(() => {
        if (!isDirty) return;

        setValue("validation", []);
        resetField("validation");
    }, [type]);

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
                                selectElementType(value);
                                setValue("type", value, {
                                    shouldTouch: true,
                                    shouldDirty: true,
                                });
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
                    <ToggleWrapper>
                        <Controller
                            name="required"
                            control={control}
                            render={({
                                field: { ref, onChange, ...withoutRef },
                            }) => (
                                <TogglePair
                                    {...withoutRef}
                                    label={{
                                        mainLabel: "Mandatory field",
                                    }}
                                    onChange={(value) => {
                                        if (value) {
                                            setTimeout(() => {
                                                resetField("requiredErrorMsg", {
                                                    defaultValue:
                                                        focusedElement.element
                                                            .requiredErrorMsg,
                                                });
                                            });
                                        }
                                        onChange(value);
                                    }}
                                />
                            )}
                            shouldUnregister={true}
                        />
                    </ToggleWrapper>
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
                                    placeholder="Enter error message"
                                    errorMessage={
                                        errors.requiredErrorMsg?.message
                                    }
                                />
                            )}
                            shouldUnregister={true}
                        />
                    )}
                </MandatoryFieldBox>

                {type === EElementType.DROPDOWN && <DropdownItems />}

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
                {type === EElementType.TEXTAREA && (
                    <>
                        <ToggleWrapper>
                            <Controller
                                name="resizableInput"
                                control={control}
                                defaultValue={false}
                                render={({ field: { ref, ...withoutRef } }) => (
                                    <TogglePair
                                        {...withoutRef}
                                        label={{
                                            mainLabel: "Resizable area input",
                                            subLabel:
                                                "This allows participant to resize text area.",
                                        }}
                                    />
                                )}
                                shouldUnregister={true}
                            />
                        </ToggleWrapper>
                        <Pills />
                    </>
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

                {TextBasedElementTypes.has(type) && (
                    <TextBasedPreselectedValue />
                )}
                {type === EElementType.DROPDOWN && <DropdownPreselectedValue />}
            </Wrapper>
        </FieldEditorAccordionItem>
    );
};
