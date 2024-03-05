import { Color } from "@lifesg/react-design-system/color";
import { useBuilder } from "../../context-providers";
import { IconButton } from "../common";
import {
    HeaderIcon,
    HeaderLabel,
    SaveChangesButton,
    Wrapper,
} from "./side-panel-header.styles";
import { ISidePanelHeaderProps } from "./types";

export const SidePanelHeader = ({
    onSaveChanges,
    headerTitle, // TODO: decide from context
}: ISidePanelHeaderProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { state, togglePanel } = useBuilder();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleSaveButtonClick: () => void = () => {
        console.log("Save button clicked");
        if (onSaveChanges) onSaveChanges();
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper>
            <IconButton
                $iconSize="1.5rem"
                $iconColor={Color.Neutral[3]}
                onClick={() => togglePanel(!state.showSidePanel)}
            >
                <HeaderIcon $isCollapsed={state.showSidePanel} />
            </IconButton>
            <HeaderLabel weight="semibold">{headerTitle}</HeaderLabel>
            {onSaveChanges && (
                <SaveChangesButton onClick={handleSaveButtonClick}>
                    Save changes
                </SaveChangesButton>
            )}
        </Wrapper>
    );
};
