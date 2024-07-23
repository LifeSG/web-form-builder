import { BinIcon } from "@lifesg/react-icons/bin";
import { DeleteButton } from "../delete-button/delete-button";
import { ChildrenWrapper, Wrapper } from "./child-entry.styles";

interface IProps {
    onDelete: () => void;
    children: React.ReactNode;
}
// =============================================================================
// RENDER FUNCTIONS
// =============================================================================
export const ChildEntry = ({ onDelete, children }: IProps) => {
    return (
        <Wrapper>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <DeleteButton onClick={onDelete} data-testid="delete-button">
                <BinIcon />
            </DeleteButton>
        </Wrapper>
    );
};
