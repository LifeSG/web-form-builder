import { ModalBoxProps } from "@lifesg/react-design-system/modal";
import { EModalType } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { ModalBox, ModalInner } from "./generic-modal.styles";

interface IProps extends ModalBoxProps {
    type?: EModalType;
}

export const GenericModal = ({ type, children, ...otherProps }: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { hideModal } = useModal();

    const handleModalClose = () => {
        hideModal(type);
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    return (
        <ModalBox onClose={handleModalClose} {...otherProps}>
            <ModalInner data-testid="modal-content">{children}</ModalInner>
        </ModalBox>
    );
};
