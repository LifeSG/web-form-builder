import { DocIcon } from "@lifesg/react-icons/doc";
import { Square2x2Icon } from "@lifesg/react-icons/square-2x2";
import { useBuilder } from "../../../context-providers/builder/hook";
import { EFormBuilderMode } from "../../../context-providers/builder/types";
import { ModeButton, ToolbarWrapper } from "./toolbar.styles";

export const Toolbar = () => {
    const { state } = useBuilder();

    return (
        <ToolbarWrapper>
            <ModeButton $active={state.mode === EFormBuilderMode.ADD_FIELD}>
                <Square2x2Icon />
            </ModeButton>
            <ModeButton $active={state.mode === EFormBuilderMode.EDIT_PAGES}>
                <DocIcon />
            </ModeButton>
        </ToolbarWrapper>
    );
};
