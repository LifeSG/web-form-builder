import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { TElement, TModalProps } from "src/context-providers";
import { useModal } from "../../../context-providers/display/modal-hook";
import {
    ActionButton,
    ButtonWrapper,
    GrowContainer,
} from "./discard-changes-modal.styles";
import { GenericModal } from "./generic-modal";

interface IProps {
    modal: TModalProps;
    index: number;
    element?: TElement;
}

export const DiscardChangesModal = ({ modal, index, element }: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { hideModal } = useModal();
    const { type, onClickActionButton } = modal;

    // =============================================================================
    // HELPER FUNCTION
    // ============================================================================

    const handleKeepEditing = () => {
        hideModal(type);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderActionButtons = () => {
        return (
            <ButtonWrapper>
                <ActionButton onClick={onClickActionButton}>
                    Discard changes
                </ActionButton>
                <ActionButton onClick={handleKeepEditing} styleType="light">
                    Keep editing
                </ActionButton>
            </ButtonWrapper>
        );
    };

    return (
        <GrowContainer>
            <GenericModal key={index} type={modal?.type}>
                <ErrorDisplay type="confirmation" title="Discard changes?" />
                {renderActionButtons()}
            </GenericModal>
        </GrowContainer>
    );
};
