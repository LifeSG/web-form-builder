import { DocIcon } from "@lifesg/react-icons/doc";
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
        <Wrapper data-testid="toolbar">
            <ModeButton
                type="button"
                data-testid="add-element"
                $active={currentMode === EBuilderMode.ADD_ELEMENT}
                onClick={toggleView(EBuilderMode.ADD_ELEMENT)}
            >
                <AddElementIcon />
            </ModeButton>
            <ModeButton
                type="button"
                $active={currentMode === EBuilderMode.EDIT_PAGES}
                onClick={toggleView(EBuilderMode.EDIT_PAGES)}
            >
                <DocIcon />
            </ModeButton>
        </Wrapper>
    );
};
