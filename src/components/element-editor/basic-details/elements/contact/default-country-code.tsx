import { Alert } from "@lifesg/react-design-system/alert";
import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { IContactFieldAttributes } from "src/context-providers";
import { MandatoryFieldBox } from "../../common";
import { CountryData } from "./country-code";
import { SecondaryLabel } from "./default-country-code.styles";

export const DefaultCountryCode = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const { control, watch, unregister, setValue } =
        useFormContext<IContactFieldAttributes>();
    const defaultCountryCode = watch("defaultCountryCode", "");
    const displayAsFixedCountryCode = watch("displayAsFixedCountryCode");

    const options = [["No default country code", "", "", ""], ...CountryData];

    const selectedOption =
        options.find((item) => item[0] === defaultCountryCode) || options[0];

    // =========================================================================
    // EFFECTS
    // =========================================================================

    /** This useEffect ensures that dirty state is cleared if default value of defaultCountryCode is empty. */
    useEffect(() => {
        if (defaultCountryCode === "") {
            setValue("defaultCountryCode", "", {
                shouldDirty: true,
            });
        }
    }, [defaultCountryCode, setValue]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderCustomOption = (item: (string | number | string[])[]) => (
        <Text.Body>
            {item[0]}{" "}
            <SecondaryLabel>{item[3] ? `+${item[3]}` : ""}</SecondaryLabel>
        </Text.Body>
    );

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
                            label="Default country code"
                            renderCustomSelectedOption={renderCustomOption}
                            renderListItem={renderCustomOption}
                            options={options}
                            selectedOption={selectedOption}
                            onSelectOption={(item) => {
                                if (item[0] === "No default country code") {
                                    field.onChange("");
                                    return;
                                }
                                field.onChange(item[0]);
                            }}
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
