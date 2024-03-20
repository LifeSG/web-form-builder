import { Color } from "@lifesg/react-design-system/color";
import { CrossIcon } from "@lifesg/react-icons/cross";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { IconButton } from "../common";
import {
    HeaderChevronIcon,
    HeaderLabel,
    Wrapper,
} from "./side-panel-header.styles";

export const SidePanelHeader = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, togglePanel, currentMode, toggleMode } =
        useBuilder();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    // TODO: When react hook form is being set up, run this function only when there are changes in the form values
    // const handleSaveButtonClick  = () => {
    //     if (onSaveChanges) onSaveChanges();
    //     return "Save button clicked";
    // };

    const handleCrossButtonClick = () => {
        toggleMode(EBuilderMode.ADD_ELEMENT);
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const getHeaderTitle = () => {
        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return "Add elements";
            case EBuilderMode.EDIT_ELEMENT:
                return "Edit details";
            case EBuilderMode.EDIT_PAGES:
                return "Add pages";
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderIconButton = () => {
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
            case EBuilderMode.EDIT_ELEMENT:
                return (
                    <IconButton
                        $iconSize="1.5rem"
                        $iconColor={Color.Neutral[3]}
                        onClick={handleCrossButtonClick}
                    >
                        <CrossIcon />
                    </IconButton>
                );
        }
    };

    return (
        <Wrapper>
            <HeaderLabel weight="semibold">{getHeaderTitle()}</HeaderLabel>
            {renderIconButton()}
            {/* TODO: To work on when react hook form is set up */}
            {/* {onSaveChanges && (
                <SaveChangesButton onClick={handleSaveButtonClick}>
                    Save changes
                </SaveChangesButton>
            )} */}
        </Wrapper>
    );
};
