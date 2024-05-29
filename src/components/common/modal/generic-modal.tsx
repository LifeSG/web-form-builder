import { ModalBoxProps } from "@lifesg/react-design-system/modal";
import { EModalType } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { ModalBox, ModalInner } from "./generic-modal.styles";

interface IProps extends ModalBoxProps {
    type?: EModalType;
}

export const GenericModal = ({ type, children, ...otherProps }: IProps) => {
    const { hideModal } = useModal();

    const handleModalClose = () => {
        hideModal(type);
    };

    return (
        <ModalBox onClose={handleModalClose} {...otherProps}>
            <ModalInner>{children}</ModalInner>
        </ModalBox>
    );
};
