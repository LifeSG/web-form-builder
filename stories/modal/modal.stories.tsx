import { Button } from "@lifesg/react-design-system";
import type { Meta } from "@storybook/react";
import { GenericModal } from "src/components/common";
import { DisplayProvider, EModalType } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { Container, GrowContainer, ScrollableModal } from "./doc-elements";

const meta: Meta<typeof GenericModal> = {
    title: "Modal",
    component: GenericModal,
};

export default meta;

export const Default = () => {
    return (
        <DisplayProvider>
            <Container>
                <ModalContent />
            </Container>
        </DisplayProvider>
    );
};

const ModalContent = () => {
    const { modals, showModal, hideModal } = useModal();

    const handleButtonClick = () => {
        showModal({ type: EModalType.Custom });
    };

    const handleBackDropClick = (type: EModalType) => {
        hideModal(type);
    };

    const renderModal = () => {
        return modals.map((modal, index) => (
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
        ));
    };

    return (
        <>
            {renderModal()}
            <Button.Default styleType="secondary" onClick={handleButtonClick}>
                Click to show modal!
            </Button.Default>
        </>
    );
};
