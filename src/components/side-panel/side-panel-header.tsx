import { Color } from "@lifesg/react-design-system/color";
import { CrossIcon } from "@lifesg/react-icons/cross";
import { useModal } from "src/context-providers/display/modal-hook";
import {
    EBuilderMode,
    EModalType,
    EToastTypes,
    useBuilder,
    useDisplay,
} from "../../context-providers";
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
        toggleMode,
    } = useBuilder();
    const { isDirty } = focusedElement || {};
    const { showModal, hideModal } = useModal();
    const { showToast } = useDisplay();

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

    const handleModalOnClick = () => {
        const successToast = {
            message: "Changes discarded.",
            type: EToastTypes.SUCCESS_TOAST,
        };
        removeFocusedElement();
        toggleMode(EBuilderMode.ADD_ELEMENT);
        hideModal();
        showToast(successToast);
    };

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleCrossButtonClick = () => {
        const newModal = {
            type: EModalType.DiscardChanges,
            onClickActionButton: handleModalOnClick,
        };
        if (isDirty) {
            showModal(newModal);
        } else {
            removeFocusedElement();
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
                        type="button"
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
