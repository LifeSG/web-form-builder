import { Button } from "@lifesg/react-design-system";
import type { Meta } from "@storybook/react";
import { GenericModal } from "src/components/common";
import { Modals } from "src/components/common/modal/modals";
import { DisplayProvider, EModalType } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { Container } from "./doc-elements";

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
    const { showModal } = useModal();

    const handleButtonClick = () => {
        showModal({ type: EModalType.Custom });
    };

    return (
        <>
            <Modals />
            <Button.Default styleType="secondary" onClick={handleButtonClick}>
                Click to show modal!
            </Button.Default>
        </>
    );
};
