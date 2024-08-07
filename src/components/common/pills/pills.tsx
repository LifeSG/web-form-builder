import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import {
    ITextarea,
    ITextareaFieldAttributes,
    useBuilder,
} from "src/context-providers";
import { BottomPositionIcon } from "../icons/bottom-position-icon";
import { TopPositionIcon } from "../icons/top-position-icon";
import { PillItems } from "./pill-items";
import { MandatoryFieldBox } from "src/components/element-editor/basic-details/common";

export const Pills = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { control, unregister, setValue, watch, resetField } =
        useFormContext<ITextareaFieldAttributes>();

    const { focusedElement } = useBuilder();
    const element: ITextarea = focusedElement?.element;
    const watchPills = watch("pills");

    // =========================================================================
    // EFFECTS
    // =========================================================================

    /** This useEffect repopulates the defaultValues of pillPosition when it is remounted. */
    useEffect(() => {
        if (watchPills) {
            if (element?.pillItems) {
                resetField("pillPosition", {
                    defaultValue: element.pillPosition,
                });
            }
        }
    }, [watchPills]);

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
                        if (value) {
                            setValue(
                                "pillItems",
                                [
                                    {
                                        content: "",
                                    },
                                    {
                                        content: "",
                                    },
                                ],
                                {
                                    shouldDirty: true,
                                }
                            );
                            setValue("pillPosition", "top", {
                                shouldDirty: true,
                            });
                        } else {
                            /** Without unregister, isDirty remains true even though current values match default values,
                             * until a re-render occurs. This behaviour seems to be caused by the un-mounting/re-mounting of the pillItems' useFieldArray.
                             * By using unregister, it triggers a re-render to evaluate the correct isDirty state. */
                            unregister(["pillItems", "pillPosition"]);
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
