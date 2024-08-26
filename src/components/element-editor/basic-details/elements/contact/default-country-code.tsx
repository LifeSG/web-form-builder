import { Alert } from "@lifesg/react-design-system/alert";
import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { IContactFieldAttributes } from "src/context-providers";
import { MandatoryFieldBox } from "../../common";
import { CountryData } from "./country-code";

export const DefaultCountryCode = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const { control, watch, unregister } =
        useFormContext<IContactFieldAttributes>();
    const defaultCountryCode = watch("defaultCountryCode");

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
                            label="Default country code (optional)"
                            options={CountryData}
                            selectedOption={CountryData.find(
                                (item) => item[3] === field.value
                            )}
                            valueExtractor={(item) => item[3]}
                            listExtractor={(item) => ({
                                title: item[0] as string,
                                secondaryLabel: `+${item[3] as string}`,
                            })}
                            displayValueExtractor={(item) =>
                                `${item[0]} (+${item[3]})`
                            }
                            onSelectOption={(item) => field.onChange(item[3])}
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
                Field will validate in international format.
            </Alert>
        </MandatoryFieldBox>
    );
};
