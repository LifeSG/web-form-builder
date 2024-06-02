import { TModalProps } from "src/context-providers";
import { GrowContainer } from "./empty-modal.styles";
import { GenericModal } from "./generic-modal";

interface IProps {
    modal: TModalProps;
    index: number;
}

export const EmptyModal = ({ modal, index }: IProps) => {
    return (
        <GrowContainer>
            <GenericModal key={index} type={modal.type}>
                <></>
            </GenericModal>
        </GrowContainer>
    );
};
