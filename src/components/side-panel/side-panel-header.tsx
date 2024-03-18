import { Color } from "@lifesg/react-design-system/color";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { IconButton } from "../common";
import {
    HeaderIcon,
    HeaderLabel,
    SaveChangesButton,
    Wrapper,
} from "./side-panel-header.styles";
import { ISidePanelHeaderProps } from "./types";

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
            case EBuilderMode.ADD_ELEMENT: {
                return "Add elements";
            }
            case EBuilderMode.EDIT_ELEMENT: {
                return "Edit details";
            }
            case EBuilderMode.EDIT_PAGES: {
                return "Add pages";
            }
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper>
            <HeaderLabel weight="semibold">{getHeaderTitle()}</HeaderLabel>
            <IconButton
                $iconSize="1.5rem"
                $iconColor={Color.Neutral[3]}
                onClick={() => togglePanel(!showSidePanel)}
            >
                <HeaderIcon $isCollapsed={showSidePanel} />
            </IconButton>
            {/* TODO: To work on when react hook form is set up */}
            {/* {onSaveChanges && (
                <SaveChangesButton onClick={handleSaveButtonClick}>
                    Save changes
                </SaveChangesButton>
            )} */}
        </Wrapper>
    );
};
