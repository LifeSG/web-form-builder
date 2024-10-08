import { EModalType, TModalProps } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { BulkEditModal } from "./bulk-edit-modal";
import { DiscardChangesModal } from "./discard-changes-modal";
import { ScrollableModal } from "./modals.styles";
import { ResetFieldsModal } from "./reset-fields-modal";

export const Modals = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { modals } = useModal();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const renderModalContent = (modal: TModalProps, index: number) => {
        if (modal?.type) {
            switch (modal?.type) {
                case EModalType.DiscardChanges:
                    return <DiscardChangesModal modal={modal} />;
                case EModalType.BulkEdit:
                    return <BulkEditModal modal={modal} />;
                case EModalType.ResetFields:
                    return <ResetFieldsModal modal={modal} />;
                default:
                    console.error("type given is not a modal type!");
                    break;
            }
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
