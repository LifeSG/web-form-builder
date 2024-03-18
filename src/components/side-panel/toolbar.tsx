import { DocIcon } from "@lifesg/react-icons/doc";
import { Square2x2Icon } from "@lifesg/react-icons/square-2x2";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { ModeButton, Wrapper } from "./toolbar.styles";

export const Toolbar = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { currentMode, toggleMode, togglePanel, showSidePanel } =
        useBuilder();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const toggleView = (mode: EBuilderMode) => () => {
        toggleMode(mode);

        if (!showSidePanel) {
            togglePanel(true);
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper>
            <ModeButton
                $active={currentMode === EBuilderMode.ADD_ELEMENT}
                onClick={toggleView(EBuilderMode.ADD_ELEMENT)}
            >
                <Square2x2Icon />
            </ModeButton>
            <ModeButton
                $active={currentMode === EBuilderMode.EDIT_PAGES}
                onClick={toggleView(EBuilderMode.EDIT_PAGES)}
            >
                <DocIcon />
            </ModeButton>
        </Wrapper>
    );
};
