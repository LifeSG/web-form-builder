import { Color } from "@lifesg/react-design-system/color";
import { EFormBuilderMode, useBuilder } from "../../context-providers";
import { IconButton } from "../common";
import {
    HeaderIcon,
    HeaderLabel,
    SaveChangesButton,
    Wrapper,
} from "./side-panel-header.styles";
import { ISidePanelHeaderProps } from "./types";

export const SidePanelHeader = ({ onSaveChanges }: ISidePanelHeaderProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, togglePanel, currentMode } = useBuilder();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleSaveButtonClick: () => void = () => {
        console.log("Save button clicked");
        if (onSaveChanges) onSaveChanges();
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const displayHeaderTitle = () => {
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
            <HeaderLabel weight="semibold">{displayHeaderTitle()}</HeaderLabel>
            {onSaveChanges && (
                <SaveChangesButton onClick={handleSaveButtonClick}>
                    Save changes
                </SaveChangesButton>
            )}
        </Wrapper>
    );
};
