import { EModalType, TModalProps } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { DiscardChangesModal } from "./discard-changes-modal";
import { ScrollableModal } from "./modals.styles";

export const Modals = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { modals } = useModal();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const renderModalContent = (modal: TModalProps, index: number) => {
        switch (modal?.type) {
            case EModalType.DiscardChanges:
                return <DiscardChangesModal modal={modal} />;
            default:
                console.error("type given is not a modal type!");
                break;
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <ScrollableModal show={!!modals?.length}>
            {renderModalContent(modals[0], 0)}
        </ScrollableModal>
    );
};
