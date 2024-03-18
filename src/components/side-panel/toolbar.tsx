import { DocIcon } from "@lifesg/react-icons/doc";
import { Square2x2Icon } from "@lifesg/react-icons/square-2x2";
import { EFormBuilderMode, useBuilder } from "../../context-providers";
import { ModeButton, Wrapper } from "./toolbar.styles";

export const Toolbar = () => {
    const { currentMode } = useBuilder();

    return (
        <Wrapper>
            <ModeButton $active={currentMode === EFormBuilderMode.ADD_FIELD}>
                <Square2x2Icon />
            </ModeButton>
            <ModeButton $active={currentMode === EFormBuilderMode.EDIT_PAGES}>
                <DocIcon />
            </ModeButton>
        </Wrapper>
    );
};
