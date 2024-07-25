import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { EElementType, useBuilder } from "src/context-providers";
import { TFormFieldValues } from "src/schemas";
import {
    FieldEditorAccordionItem,
    MandatoryFieldBox,
    Wrapper,
} from "./basic-details.styles";
import { DropdownItems } from "./dropdown-items/dropdown-items";
import { DropdownPreselectedValue } from "./dropdown-preselected-value";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement, selectElementType } = useBuilder();
    const {
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<TFormFieldValues>();
    const element = focusedElement.element;
    const type = watch("type");
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
                                value={field.value}
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
                                label="Mandatory field"
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

                {element?.hasOwnProperty("description") && (
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Form.Textarea
                                {...field}
                                label={{
                                    children: "Description text (optional)",
                                    subtitle: (
                                        <Text.H6 weight={400}>
                                            This displays as a description under
                                            the label.
                                        </Text.H6>
                                    ),
                                }}
                                placeholder="Enter description text"
                                value={field.value || ""}
                                rows={1}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                errorMessage={errors.placeholder?.message}
                                maxLength={180}
                            />
                        )}
                        shouldUnregister={true}
                    />
                )}

                {element?.hasOwnProperty("placeholder") && (
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

                {type === EElementType.DROPDOWN && <DropdownPreselectedValue />}
            </Wrapper>
        </FieldEditorAccordionItem>
    );
};
