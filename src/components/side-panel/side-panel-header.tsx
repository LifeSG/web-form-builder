import { Color } from "@lifesg/react-design-system/color";
import { CrossIcon } from "@lifesg/react-icons/cross";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { IconButton } from "../common";
import {
    HeaderChevronIcon,
    HeaderLabel,
    SaveChangesButton,
    Wrapper,
} from "./side-panel-header.styles";

export const SidePanelHeader = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const {
        showSidePanel,
        currentMode,
        togglePanel,
        removeFocusedElement,
        focusedElement,
    } = useBuilder();
    const { isDirty } = focusedElement || {};

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleCrossButtonClick = () => {
        removeFocusedElement();
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const getHeaderTitle = () => {
        if (focusedElement) {
            return "Edit details";
        }

        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return "Add elements";
            case EBuilderMode.EDIT_PAGES:
                return "Add pages";
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderButtons = () => {
        if (focusedElement) {
            return (
                <>
                    <SaveChangesButton>
                        {!isDirty ? "Saved" : "Save Changes"}
                    </SaveChangesButton>
                    <IconButton
                        $iconSize="1.5rem"
                        $iconColor={Color.Neutral[3]}
                        onClick={handleCrossButtonClick}
                    >
                        <CrossIcon data-testid="cross-button" />
                    </IconButton>
                </>
            );
        }

        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
            case EBuilderMode.EDIT_PAGES:
                return (
                    <IconButton
                        $iconSize="1.5rem"
                        $iconColor={Color.Neutral[3]}
                        onClick={() => togglePanel(!showSidePanel)}
                    >
                        <HeaderChevronIcon $isCollapsed={showSidePanel} />
                    </IconButton>
                );
        }
    };

    return (
        <Wrapper>
            <HeaderLabel weight="semibold" data-testid="header-label">
                {getHeaderTitle()}
            </HeaderLabel>
            {renderButtons()}
            {/* TODO: To work on when react hook form is set up */}
        </Wrapper>
    );
};
