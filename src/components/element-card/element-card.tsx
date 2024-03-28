import { Text } from "@lifesg/react-design-system/text";
import { BinIcon } from "@lifesg/react-icons/bin";
import { CopyIcon } from "@lifesg/react-icons/copy";
import { TElement, useBuilder } from "src/context-providers";
import { BaseCard, CardIcon } from "../common";
import {
    ActionButton,
    ActionsContainer,
    Container,
    DetailsContainer,
    IdLabel,
} from "./element-card.styles";

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
    const { focusedElement, deleteElement } = useBuilder();

    const isFocused = checkIsFocused();
    const disableDuplicate = shouldDisableDuplicate();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleDuplicateClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        if (disableDuplicate) {
            event.preventDefault();
        }
        // TODO: Add handling
    };

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        // TODO: Add confirmation modal
        deleteElement(element.internalId);
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function checkIsFocused() {
        return (
            focusedElement &&
            focusedElement.element.internalId === element.internalId
        );
    }

    function shouldDisableDuplicate() {
        return (
            checkIsFocused() &&
            (focusedElement.isDirty || !focusedElement.isValid)
        );
    }

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <BaseCard onClick={onClick} focused={isFocused} id={element.internalId}>
            <Container>
                <CardIcon elementType={element.type} />
                <DetailsContainer>
                    <Text.Body weight="semibold">{label}</Text.Body>
                    <IdLabel weight="semibold">ID: {id}</IdLabel>
                </DetailsContainer>
                {isFocused && (
                    <ActionsContainer>
                        <ActionButton
                            type="button"
                            onClick={handleDuplicateClick}
                            $disabled={disableDuplicate}
                        >
                            <CopyIcon />
                            Duplicate
                        </ActionButton>
                        <ActionButton type="button" onClick={handleDeleteClick}>
                            <BinIcon />
                            Delete
                        </ActionButton>
                    </ActionsContainer>
                )}
            </Container>
        </BaseCard>
    );
};
