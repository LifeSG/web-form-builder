import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { forwardRef } from "react";
import { IDiscardChangesModalProps } from "src/context-providers";
import { useModal } from "../../../context-providers/display/modal-hook";
import { GenericModal } from "./generic-modal";
import {
    ActionButton,
    ButtonWrapper,
    ModalDisplayTitle,
} from "./modals.styles";

interface IProps {
    modal: IDiscardChangesModalProps;
}

const Modal = ({ modal }: IProps, ref: React.Ref<HTMLDivElement>) => {
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
        <GenericModal ref={ref} type={modal?.type}>
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

export const DiscardChangesModal = forwardRef(Modal);
