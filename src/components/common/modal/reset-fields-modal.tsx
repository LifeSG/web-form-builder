import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { IResetFieldsModalProps } from "src/context-providers";
import { ModalDisplayTitle } from "./discard-changes-modal.styles";
import { GenericModal } from "./generic-modal";
import { ActionButton, ButtonWrapper } from "./modals.styles";

interface IProps {
    modal: IResetFieldsModalProps;
}

export const ResetFieldsModal = ({ modal }: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { onClickActionButton, onClose } = modal;

    console.log("RESET FIELDS MODAL", modal);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderActionButtons = () => {
        return (
            <ButtonWrapper>
                <ActionButton onClick={onClickActionButton}>
                    Reset all fields
                </ActionButton>
                <ActionButton onClick={onClose} styleType="light">
                    Return to edit
                </ActionButton>
            </ButtonWrapper>
        );
    };

    return (
        <GenericModal type={modal?.type} onClose={onClose}>
            <ErrorDisplay
                type="confirmation"
                description={
                    "You've changed the element type. This will reset all fields to match the new element type."
                }
                title={
                    <ModalDisplayTitle weight={"semibold"}>
                        Reset all fields?
                    </ModalDisplayTitle>
                }
            />
            {renderActionButtons()}
        </GenericModal>
    );
};
