import { Color } from "@lifesg/react-design-system/color";
import { useBuilder } from "../../../context-providers/builder/hook";
import { IconButton } from "../../common/icon-button";
import {
    HeaderIcon,
    HeaderTitle,
    HeaderWrapper,
    SaveChangesButton,
} from "./side-panel.styles";

export const SidePanelHeader = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { state, togglePanel } = useBuilder();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleSaveButtonClick: () => void = () => {
        console.log("Save button clicked");
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <HeaderWrapper>
            <IconButton
                $iconSize="1.5rem"
                $iconColor={Color.Neutral[3]}
                onClick={() => togglePanel(!state.showSidePanel)}
            >
                <HeaderIcon $isCollapsed={state.showSidePanel} />
            </IconButton>
            <HeaderTitle>Add elements</HeaderTitle>
            <SaveChangesButton onClick={handleSaveButtonClick}>
                Save changes
            </SaveChangesButton>
        </HeaderWrapper>
    );
};
