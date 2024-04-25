import { Color } from "@lifesg/react-design-system/color";
import { CrossIcon } from "@lifesg/react-icons/cross";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { IBaseTextBasedFieldValues } from "src/schemas";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { IconButton } from "../common";
import {
    HeaderChevronIcon,
    HeaderLabel,
    SaveChangesButton,
    Wrapper,
} from "./side-panel-header.styles";

export const SidePanelHeader = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const {
        showSidePanel,
        currentMode,
        togglePanel,
        removeFocusedElement,
        focusedElement,
        updateElement,
        updateFocusedElement,
    } = useBuilder();

    const { reset, handleSubmit } = useFormContext<IBaseTextBasedFieldValues>();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleCrossButtonClick = () => {
        removeFocusedElement();
    };

    const onSubmit = useCallback(
        (values) => {
            console.log("values:", values);
            updateElement(values);
            updateFocusedElement(false, values);
            reset(
                {
                    ...values,
                },
                {
                    keepDirty: false,
                }
            );
        },
        [updateElement, updateFocusedElement, reset]
    );

    const handleSaveChanges = () => {
        handleSubmit(onSubmit)();
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const getHeaderTitle = () => {
        if (focusedElement) {
            return "Edit details";
        }

        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return "Add elements";
            case EBuilderMode.EDIT_PAGES:
                return "Add pages";
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderButtons = () => {
        if (focusedElement) {
            return (
                <>
                    <SaveChangesButton onClick={handleSaveChanges}>
                        {focusedElement.isDirty === false
                            ? "Saved"
                            : "Save Changes"}
                    </SaveChangesButton>
                    <IconButton
                        $iconSize="1.5rem"
                        $iconColor={Color.Neutral[3]}
                        onClick={handleCrossButtonClick}
                    >
                        <CrossIcon />
                    </IconButton>
                </>
            );
        }

        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
            case EBuilderMode.EDIT_PAGES:
                return (
                    <IconButton
                        $iconSize="1.5rem"
                        $iconColor={Color.Neutral[3]}
                        onClick={() => togglePanel(!showSidePanel)}
                    >
                        <HeaderChevronIcon $isCollapsed={showSidePanel} />
                    </IconButton>
                );
        }
    };

    return (
        <Wrapper>
            <HeaderLabel weight="semibold">{getHeaderTitle()}</HeaderLabel>
            {renderButtons()}
            {/* TODO: To work on when react hook form is set up */}
        </Wrapper>
    );
};
