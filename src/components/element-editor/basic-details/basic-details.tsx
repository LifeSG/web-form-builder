import { Controller, useFormContext } from "react-hook-form";
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
    ToggleWrapper,
    Wrapper,
} from "./basic-details.styles";
import { Description } from "./common/description";
import { Id } from "./common/id";
import { Label } from "./common/label";
import { MandatoryField } from "./common/mandatory-field";
import { Placeholder } from "./common/placeholder";
import { TextBasedPreselectedValue } from "./common/text-based-preselected-value";
import { Type } from "./common/type";
import { DropdownItems } from "./dropdown-items/dropdown-items";
import { DropdownPreselectedValue } from "./dropdown-preselected-value";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const { control, watch } = useFormContext<TFormFieldValues>();
    const type = watch("type", focusedElement?.element?.type) as EElementType;

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
                <Type />
                <Label />
                <MandatoryField />

                {type === EElementType.DROPDOWN && <DropdownItems />}

                <Id />
                <Description />

                {type == EElementType.TEXTAREA && (
                    <>
                        <ToggleWrapper>
                            <Controller
                                name="resizableInput"
                                control={control}
                                render={({ field }) => (
                                    <TogglePair
                                        label={{
                                            mainLabel: "Resizable area input",
                                            subLabel:
                                                "This allows participant to resize text area.",
                                        }}
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                                shouldUnregister={true}
                            />
                        </ToggleWrapper>
                        <Pills />
                    </>
                )}

                <Placeholder />

                {TextBasedElementTypes.has(type) && (
                    <TextBasedPreselectedValue />
                )}

                {type === EElementType.DROPDOWN && <DropdownPreselectedValue />}
            </Wrapper>
        </FieldEditorAccordionItem>
    );
};
