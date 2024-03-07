import { DocIcon } from "@lifesg/react-icons/doc";
import { Square2x2Icon } from "@lifesg/react-icons/square-2x2";
import { EFormBuilderMode, useBuilder } from "../../context-providers";
import { ModeButton, Wrapper } from "./toolbar.styles";

export const Toolbar = () => {
    const { state, toggleMode } = useBuilder();

    return (
        <Wrapper>
            <ModeButton
                $active={state.mode === EFormBuilderMode.ADD_FIELD}
                onClick={() => toggleMode(EFormBuilderMode.ADD_FIELD)}
            >
                <Square2x2Icon />
            </ModeButton>
            <ModeButton
                $active={state.mode === EFormBuilderMode.EDIT_PAGES}
                onClick={() => toggleMode(EFormBuilderMode.EDIT_PAGES)}
            >
                <DocIcon />
            </ModeButton>
        </Wrapper>
    );
};
