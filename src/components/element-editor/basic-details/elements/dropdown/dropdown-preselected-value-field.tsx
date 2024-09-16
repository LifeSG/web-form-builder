import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import isEmpty from "lodash/isEmpty";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    useIsAttributeDisabled,
    useIsElementDisabled,
    useShouldShowPrefill,
} from "src/context-providers";
import {
    IDropdownItemAttributes,
    useBuilder,
} from "src/context-providers/builder/";
import { TOverallOptionGroupBasedValues } from "src/yup-schemas";

export const DropdownPreselectedValue = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const {
        control,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<TOverallOptionGroupBasedValues>();

    const preselectedValue = watch("preselectedValue");
    const dropdownItems = watch("dropdownItems", []);
    const shouldShowPrefill = useShouldShowPrefill();
    const { focusedElement } = useBuilder();
    const isElementDisabled = useIsElementDisabled(
        focusedElement.element.id,
        focusedElement.element.type
    );
    const isAttributeDisabled = useIsAttributeDisabled(
        focusedElement,
        "preselectedValue"
    );
    const isDisabled = isElementDisabled || isAttributeDisabled;

    const preselectedValueOptions: IDropdownItemAttributes[] = [
        {
            label: "Unselect default value",
            value: null,
        },
    ];

    dropdownItems.forEach((item: IDropdownItemAttributes) => {
        if (!isEmpty(item.label) && !isEmpty(item.value)) {
            preselectedValueOptions.push(item);
        }
    });

    const selectedOption = preselectedValueOptions.find(
        (option) => option.value === preselectedValue
    );

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        if (preselectedValue === null) {
            setValue("preselectedValue", "", {
                shouldDirty: true,
            });
        }
    }, [preselectedValue, setValue]);

    /** This effect ensures that preselectedValue is being cleared if the corresponding dropdown value no longer exists */
    useEffect(() => {
        if (
            preselectedValue &&
            !dropdownItems.some((item) => item.value === preselectedValue)
        ) {
            setValue("preselectedValue", "");
        }
    }, [selectedOption]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        preselectedValueOptions.length > 1 && (
            <Controller
                name="preselectedValue"
                control={control}
                render={({ field }) => {
                    const { ref, ...withoutRef } = field;
                    return (
                        <Form.Select
                            disabled={isDisabled}
                            {...withoutRef}
                            data-testid="preselected-value-field"
                            options={preselectedValueOptions}
                            valueExtractor={(item) => item.value}
                            listExtractor={(item) => item.label}
                            displayValueExtractor={(item) => item.label}
                            placeholder="Select default value"
                            label={{
                                children: "Pre-selected value (optional)",
                                subtitle: shouldShowPrefill ? (
                                    <Text.H6 weight={400}>
                                        Select a value for users. Note that
                                        prefill value will replace the
                                        pre-selected value, if present.
                                    </Text.H6>
                                ) : null,
                            }}
                            selectedOption={selectedOption}
                            onSelectOption={(option) => {
                                field.onChange(option.value);
                            }}
                            errorMessage={errors.preselectedValue?.message}
                        />
                    );
                }}
            />
        )
    );
};
