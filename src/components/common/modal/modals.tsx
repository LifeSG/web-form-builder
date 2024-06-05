import { EModalType, TModalProps } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { EmptyModal } from "./empty-modal";
import { ScrollableModal } from "./empty-modal.styles";

export const Modals = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { modals, hideModal } = useModal();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const handleBackDropClick = (type: EModalType) => {
        hideModal(type);
    };

    const renderModalContent = (modal: TModalProps, index: number) => {
        switch (modal.type) {
            case EModalType.BulkEdit:
            case EModalType.Custom:
            case EModalType.DiscardChanges:
                return (
                    <ScrollableModal
                        show={!!modal}
                        onClick={() => handleBackDropClick(modal.type)}
                    >
                        <EmptyModal modal={modal} index={index} />
                    </ScrollableModal>
                );
            default:
                console.error("type given is not a modal type!");
                break;
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <ScrollableModal show={!!modals.length}>
            {renderModalContent(modals[0], 0)}
        </ScrollableModal>
    );
};
