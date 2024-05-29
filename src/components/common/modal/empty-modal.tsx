import { EModalType, TModalProps } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { GrowContainer, ScrollableModal } from "./empty-modal.styles";
import { GenericModal } from "./generic-modal";

interface IProps {
    modal: TModalProps;
    index: number;
}

export const EmptyModal = ({ modal, index }: IProps) => {
    const { modals, hideModal } = useModal();

    const handleBackDropClick = (type: EModalType) => {
        hideModal(type);
    };
    return (
        <ScrollableModal
            show={modals.length > 0}
            onClick={() => handleBackDropClick(modal.type)}
        >
            <GrowContainer>
                <GenericModal key={index} type={modal.type}>
                    <></>
                </GenericModal>
            </GrowContainer>
        </ScrollableModal>
    );
};
