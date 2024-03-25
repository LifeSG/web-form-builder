import { DocPencilIcon } from "@lifesg/react-icons";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { AddElementIcon } from "../common/icons";
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
                <AddElementIcon />
            </ModeButton>
            <ModeButton
                $active={currentMode === EBuilderMode.EDIT_PAGES}
                onClick={toggleView(EBuilderMode.EDIT_PAGES)}
            >
                <DocPencilIcon />
            </ModeButton>
        </Wrapper>
    );
};
