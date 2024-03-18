import { Text } from "@lifesg/react-design-system/text";
import { BinIcon } from "@lifesg/react-icons/bin";
import { CopyIcon } from "@lifesg/react-icons/copy";
import { EnvelopeIcon } from "@lifesg/react-icons/envelope";
import { EElementType, TElement } from "src/schemas";
import { BaseCard, CardIcon } from "../common";
import {
    ActionButton,
    ActionsContainer,
    Container,
    DetailsContainer,
    IdLabel,
} from "./element-card.styles";
import { useBuilder } from "src/context-providers";

interface IProps {
    element: TElement;
    onClick: () => void;
    onDelete?: () => void;
    onDuplicate?: () => void;
}

export const ElementCard = ({ element, onClick }: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { label, id } = element;
    const { focusedElement } = useBuilder();

    const isFocused = checkIsFocused();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleDuplicateClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();
        // TODO: Add handling
    };

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        // TODO: Add handling
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function checkIsFocused() {
        return focusedElement.internalId === element.internalId;
    }

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderIcon = () => {
        let icon: React.ReactNode;

        switch (element.type) {
            case EElementType.EMAIL:
                icon = <EnvelopeIcon />;
                break;
            default:
                break;
        }

        return <CardIcon>{icon}</CardIcon>;
    };

    return (
        <BaseCard onClick={onClick} focused={isFocused}>
            <Container>
                {renderIcon()}
                <DetailsContainer>
                    <Text.Body weight="semibold">{label}</Text.Body>
                    <IdLabel weight="semibold">ID: {id}</IdLabel>
                </DetailsContainer>
                {isFocused && (
                    <ActionsContainer>
                        <ActionButton
                            type="button"
                            onClick={handleDuplicateClick}
                        >
                            <CopyIcon />
                            Duplicate
                        </ActionButton>
                        <ActionButton
                            type="button"
                            $primary
                            onClick={handleDeleteClick}
                        >
                            <BinIcon />
                            Delete
                        </ActionButton>
                    </ActionsContainer>
                )}
            </Container>
        </BaseCard>
    );
};
