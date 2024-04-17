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

interface IProps {
    saveChangesHandler?: () => void;
}

export const SidePanelHeader = ({ saveChangesHandler }: IProps) => {
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

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleSaveButtonClick = () => {
        if (saveChangesHandler) {
            saveChangesHandler();
        }
    };

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
    const renderIconButton = () => {
        if (focusedElement) {
            return (
                <>
                    <SaveChangesButton onClick={handleSaveButtonClick}>
                        {focusedElement.isDirty === false
                            ? "Saved"
                            : "Save Changes"}
                    </SaveChangesButton>
                    <IconButton
                        $iconSize="1.5rem"
                        $iconColor={Color.Neutral[3]}
                        onClick={handleCrossButtonClick}
                    >
                        <CrossIcon />
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
            <HeaderLabel weight="semibold">{getHeaderTitle()}</HeaderLabel>
            {renderIconButton()}
            {/* TODO: To work on when react hook form is set up */}
        </Wrapper>
    );
};
