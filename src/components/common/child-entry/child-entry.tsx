import { BinIcon } from "@lifesg/react-icons/bin";
import { ChildStyles, DeleteButton, Wrapper } from "./child-entry.styles";

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
            <ChildStyles>{children}</ChildStyles>
            <DeleteButton onClick={onDelete} data-testid="delete-button">
                <BinIcon />
            </DeleteButton>
        </Wrapper>
    );
};
