import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    EElementType,
    IDropdownItemAttributes,
} from "src/context-providers/builder/";
import { TOverallOptionGroupBasedSchema } from "src/schemas";

export const PreselectedValue = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const {
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<TOverallOptionGroupBasedSchema>();

    const type = watch("type");
    const preselectedValue = watch("preselectedValue");

    useEffect(() => {
        if (preselectedValue === "") {
            setValue("preselectedValue", null, {
                shouldDirty: true,
            });
        }
    }, [preselectedValue, setValue]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    switch (type) {
        case EElementType.DROPDOWN:
            const dropdownItems = watch("dropdownItems", []);
            const preselectedValueOptions: IDropdownItemAttributes[] = [
                {
                    label: "Unselect default value",
                    value: "",
                },
            ];

            dropdownItems.forEach((item: IDropdownItemAttributes) => {
                if (!isEmpty(item.label) && !isEmpty(item.value)) {
                    preselectedValueOptions.push(item);
                }
            });
            if (
                preselectedValue &&
                !dropdownItems.some((item) => item.value === preselectedValue)
            ) {
                setValue("preselectedValue", null);
            }

            const selectedOption = preselectedValueOptions.find(
                (option) => option.value === preselectedValue
            );

            return (
                preselectedValueOptions.length > 1 && (
                    <Controller
                        name="preselectedValue"
                        control={control}
                        render={({ field }) => {
                            const { ref, ...withoutRef } = field;
                            return (
                                <Form.Select
                                    {...withoutRef}
                                    options={preselectedValueOptions}
                                    valueExtractor={(item) => item.value}
                                    listExtractor={(item) => item.label}
                                    displayValueExtractor={(item) => item.label}
                                    placeholder="Select default value"
                                    label={{
                                        children:
                                            "Pre-selected value (optional)",
                                        subtitle: (
                                            <Text.H6 weight={400}>
                                                Select a value for users. Note
                                                that prefill value will replace
                                                the pre-selected value, if
                                                present.
                                            </Text.H6>
                                        ),
                                    }}
                                    selectedOption={
                                        preselectedValue === ""
                                            ? null
                                            : selectedOption
                                    }
                                    onSelectOption={(option) => {
                                        if (option.value === "") {
                                            setValue("preselectedValue", "");
                                            return;
                                        }
                                        field.onChange(option.value);
                                    }}
                                    errorMessage={
                                        errors.preselectedValue?.message
                                    }
                                />
                            );
                        }}
                        shouldUnregister={true}
                    />
                )
            );
    }
};
