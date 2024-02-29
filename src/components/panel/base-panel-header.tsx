import { Color } from "@lifesg/react-design-system/color";
import { Text } from "@lifesg/react-design-system/text";
import { ChevronLeftIcon } from "@lifesg/react-icons/chevron-left";
import { ChevronRightIcon } from "@lifesg/react-icons/chevron-right";
import { useBuilder } from "../../context-providers/builder/hook";
import { IconButton } from "../common/icon-button";
import { BasePanelHeaderWrapper } from "./base-panel.styles";

export const BasePanelHeader = () => {
    const { state, togglePanel } = useBuilder();
    return (
        <BasePanelHeaderWrapper>
            <IconButton
                $iconSize="1.5rem"
                $iconColor={Color.Neutral[3]}
                onClick={() => togglePanel(!state.showPanel)}
            >
                {state.showPanel ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Text.H3 weight="semibold">Add elements</Text.H3>
        </BasePanelHeaderWrapper>
    );
};
