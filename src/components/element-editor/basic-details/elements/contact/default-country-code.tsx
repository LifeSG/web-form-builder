import { Alert } from "@lifesg/react-design-system/alert";
import { Form } from "@lifesg/react-design-system/form";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { IContactFieldAttributes } from "src/context-providers";
import { MandatoryFieldBox } from "../../common";
import { CountryData } from "./country-code";

export const DefaultCountryCode = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const { control, watch, unregister, setValue } =
        useFormContext<IContactFieldAttributes>();
    const defaultCountryCode = watch("defaultCountryCode");
    const displayAsFixedCountryCode = watch("displayAsFixedCountryCode");

    const options = [
        ["No default country code", null, null, null],
        ...CountryData,
    ];

    const selectedOption = options.find(
        (item) => item[0] === defaultCountryCode
    );

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        if (defaultCountryCode === "No default country code") {
            setValue("defaultCountryCode", "", {
                shouldDirty: true,
            });
        }
    }, [defaultCountryCode, setValue]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <MandatoryFieldBox>
            <Controller
                name="defaultCountryCode"
                control={control}
                render={({ field }) => {
                    const { ref, ...fieldWithoutRef } = field;
                    return (
                        <Form.Select
                            {...fieldWithoutRef}
                            data-testid="default-country-code"
                            label="Default country code (optional)"
                            options={options}
                            selectedOption={selectedOption}
                            listExtractor={(item) => ({
                                title: item[0] as string,
                                secondaryLabel: item[3] ? `+${item[3]}` : "",
                            })}
                            displayValueExtractor={(item) =>
                                `${item[0]} (+${item[3]})`
                            }
                            onSelectOption={(item) => field.onChange(item[0])}
                            enableSearch
                        />
                    );
                }}
                shouldUnregister
            />
            {defaultCountryCode && (
                <Controller
                    name="displayAsFixedCountryCode"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => {
                        const { ref, ...fieldWithoutRef } = field;
                        return (
                            <TogglePair
                                {...fieldWithoutRef}
                                label={{
                                    mainLabel: "Display as fixed country code",
                                    subLabel:
                                        "This will disable selection of country code.",
                                }}
                                onChange={(value) => {
                                    if (!value) {
                                        /** Without unregister, isDirty remains true even though current values match default values,
                                         * until a re-render occurs. By using unregister, it triggers a re-render to evaluate the correct isDirty state. */
                                        unregister(
                                            "validation.0.validationRule"
                                        );
                                    }
                                    field.onChange(value);
                                }}
                            />
                        );
                    }}
                    shouldUnregister
                />
            )}
            <Alert type="info" showIcon>
                {defaultCountryCode === "Singapore" && displayAsFixedCountryCode
                    ? "Field will validate in Singapore format. This enables selection of SG landline or mobile contact number validation under Additional Validation."
                    : "Field will validate in international format."}
            </Alert>
        </MandatoryFieldBox>
    );
};
