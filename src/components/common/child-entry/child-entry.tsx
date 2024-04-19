import { BinIcon } from "@lifesg/react-icons/bin";
import {
    ChildStyles,
    DeleteValidationButton,
    Wrapper,
} from "./child-entry.styles";

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
            <DeleteValidationButton
                onClick={onDelete}
                data-testid="delete-button"
            >
                <BinIcon />
            </DeleteValidationButton>
        </Wrapper>
    );
};
