import { ModalBoxProps } from "@lifesg/react-design-system/modal";
import { EModalType } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { GrowContainer, ModalBox, ModalInner } from "./generic-modal.styles";

interface IProps extends ModalBoxProps {
    type?: EModalType;
    onClose?: () => void;
}

export const GenericModal = ({
    type,
    onClose,
    children,
    ...otherProps
}: IProps) => {
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
        <GrowContainer>
            <ModalBox onClose={onClose ?? handleModalClose} {...otherProps}>
                <ModalInner data-testid="modal-content">{children}</ModalInner>
            </ModalBox>
        </GrowContainer>
    );
};
