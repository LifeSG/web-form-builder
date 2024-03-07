import { Color } from "@lifesg/react-design-system/color";
import { EFormBuilderMode, useBuilder } from "../../context-providers";
import { IconButton } from "../common";
import { HeaderIcon, HeaderLabel, Wrapper } from "./side-panel-header.styles";

export const SidePanelHeader = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, togglePanel, currentMode } = useBuilder();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    // TODO: When react hook form is being set up, run this function only when there are changes in the form values
    // const handleSaveButtonClick  = () => {
    //     if (onSaveChanges) onSaveChanges();
    //     return "Save button clicked";
    // };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const getHeaderTitle = () => {
        switch (currentMode) {
            case EFormBuilderMode.ADD_FIELD: {
                return "Add elements";
            }
            case EFormBuilderMode.EDIT_FIELD: {
                return "Edit details";
            }
            case EFormBuilderMode.EDIT_PAGES: {
                return "Add pages";
            }
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper>
            <IconButton
                $iconSize="1.5rem"
                $iconColor={Color.Neutral[3]}
                onClick={() => togglePanel(!showSidePanel)}
            >
                <HeaderIcon $isCollapsed={showSidePanel} />
            </IconButton>
            <HeaderLabel weight="semibold">{getHeaderTitle()}</HeaderLabel>
            {/* TODO: To work on when react hook form is set up */}
            {/* {onSaveChanges && (
                <SaveChangesButton onClick={handleSaveButtonClick}>
                    Save changes
                </SaveChangesButton>
            )} */}
        </Wrapper>
    );
};
