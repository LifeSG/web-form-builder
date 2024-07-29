import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { IDiscardChangesModalProps } from "src/context-providers";
import { useModal } from "../../../context-providers/display/modal-hook";
import { ModalDisplayTitle } from "./discard-changes-modal.styles";
import { GenericModal } from "./generic-modal";
import { ActionButton, ButtonWrapper } from "./modals.styles";

interface IProps {
    modal: IDiscardChangesModalProps;
}

export const DiscardChangesModal = ({ modal }: IProps) => {
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
        <GenericModal type={modal?.type}>
            <ErrorDisplay
                type="confirmation"
                title={
                    <ModalDisplayTitle weight={"semibold"}>
                        Discard changes?
                    </ModalDisplayTitle>
                }
            />
            {renderActionButtons()}
        </GenericModal>
    );
};
