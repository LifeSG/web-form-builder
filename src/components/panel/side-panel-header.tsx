import { Color } from "@lifesg/react-design-system/color";
import { Text } from "@lifesg/react-design-system/text";
import { useBuilder } from "../../context-providers/builder/hook";
import { IconButton } from "../common/icon-button";
import { HeaderIcon, HeaderWrapper } from "./side-panel.styles";

export const BasePanelHeader = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { state, togglePanel } = useBuilder();

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
            <Text.H3 weight="semibold">Add elements</Text.H3>
        </HeaderWrapper>
    );
};
