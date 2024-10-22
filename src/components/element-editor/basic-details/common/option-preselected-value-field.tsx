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
import { IOptionAttributes, useBuilder } from "src/context-providers/builder/";
import { TOverallOptionGroupBasedValues } from "src/yup-schemas";

interface IProps {
    fieldName: "dropdownItems" | "radioItems";
}

export const OptionPreselectedValue = ({ fieldName }: IProps) => {
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
    const options = watch(fieldName, []);
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

    const preselectedValueOptions: IOptionAttributes[] = [
        {
            label: "Unselect default value",
            value: null,
        },
    ];

    options.forEach((item: IOptionAttributes) => {
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
            !options.some((item) => item.value === preselectedValue)
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
