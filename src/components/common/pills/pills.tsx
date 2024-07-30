import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { MandatoryFieldBox } from "src/components/element-editor/basic-details/basic-details.styles";
import {
    ITextarea,
    ITextareaFieldAttributes,
    useBuilder,
} from "src/context-providers";
import { BottomPositionIcon } from "../icons/bottom-position-icon";
import { TopPositionIcon } from "../icons/top-position-icon";
import { PillItems } from "./pill-items";

export const Pills = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { control, unregister, setValue, watch } =
        useFormContext<ITextareaFieldAttributes>();

    const { focusedElement } = useBuilder();
    const element = focusedElement?.element as ITextarea;

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderPillsToggle = () => (
        <Controller
            name="pills"
            control={control}
            defaultValue={false}
            render={({ field }) => (
                <TogglePair
                    label={{
                        mainLabel: "Pills",
                        subLabel:
                            "This allows a list of selectable short texts to display in pill form. This helps participant to fill up text area fast with less typing.",
                    }}
                    value={field.value}
                    onChange={(value) => {
                        if (!value) {
                            /** Without this, the form remains dirtied when toggling Pills to true and back to false */
                            unregister(["pillItems", "pillPosition"]);
                        } else {
                            setValue("pillItems", [
                                {
                                    content: "",
                                },
                                {
                                    content: "",
                                },
                            ]);
                            setValue("pillPosition", "top");
                        }
                        field.onChange(value);
                    }}
                />
            )}
            shouldUnregister={true}
        />
    );

    const renderListPositionToggle = () => (
        <Controller
            name="pillPosition"
            control={control}
            render={({ field }) => (
                <TogglePair
                    label={{
                        mainLabel: "List position",
                        subLabel:
                            "This displays pills on top or bottom of the text area.",
                    }}
                    value={field.value === "top"}
                    options={[
                        { icon: <TopPositionIcon />, title: "Top" },
                        {
                            icon: <BottomPositionIcon />,
                            title: "Bottom",
                        },
                    ]}
                    onChange={(value) =>
                        field.onChange(value ? "top" : "bottom")
                    }
                />
            )}
            shouldUnregister
        />
    );

    return (
        <MandatoryFieldBox>
            {renderPillsToggle()}
            {watch("pills", element.pills) && (
                <>
                    <PillItems />
                    {renderListPositionToggle()}
                </>
            )}
        </MandatoryFieldBox>
    );
};
