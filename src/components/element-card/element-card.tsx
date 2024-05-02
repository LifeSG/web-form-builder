import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Text } from "@lifesg/react-design-system/text";
import { PlusCircleIcon } from "@lifesg/react-icons";
import { BinIcon } from "@lifesg/react-icons/bin";
import { CopyIcon } from "@lifesg/react-icons/copy";
import { TElement, useBuilder } from "src/context-providers";
import { BaseCard, CardIcon } from "../common";
import {
    ActionButton,
    ActionsContainer,
    Container,
    DetailsContainer,
    DragHandle,
    DroppableText,
    DroppableWrapper,
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

    const { isDragging } = useDraggable({
        id: element.internalId,
    });
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: element.internalId });
    const { isOver, setNodeRef: droppableRef } = useDroppable({
        id: element.internalId,
    });

    const isFocused = checkIsFocused();
    const disableDuplicate = shouldDisableDuplicate();

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? "70%" : "100%",
        background: isDragging ? "white" : "inherit",
        gap: isDragging ? "1rem" : "inherit",
        zIndex: isDragging ? 1 : "auto",
        cursor: isDragging ? "grabbing" : "pointer",
    };

    const sortableProps = {
        style,
        ...attributes,
        ...listeners,
    };

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
    const droppableContent = isOver ? (
        <DroppableWrapper isOver={isOver}>
            <PlusCircleIcon />
            <DroppableText>Drop your element here</DroppableText>
        </DroppableWrapper>
    ) : null;

    return (
        <div ref={droppableRef}>
            {droppableContent}
            <div ref={setNodeRef} {...sortableProps}>
                <BaseCard
                    onClick={onClick}
                    focused={isFocused}
                    id={element.internalId}
                >
                    <Container data-testid={"card" + element.internalId}>
                        <DragHandle data-testid="drag-handle" />
                        <CardIcon elementType={element.type} />
                        <DetailsContainer>
                            <Text.Body weight="semibold">{label}</Text.Body>
                            <IdLabel weight="semibold">ID: {id}</IdLabel>
                        </DetailsContainer>
                        {isFocused && (
                            <ActionsContainer>
                                <ActionButton
                                    data-testid="delete-button"
                                    type="button"
                                    onClick={handleDuplicateClick}
                                    $disabled={disableDuplicate}
                                    disabled={disableDuplicate}
                                >
                                    <CopyIcon />
                                    Duplicate
                                </ActionButton>
                                <ActionButton
                                    data-testid="duplicate-button"
                                    type="button"
                                    onClick={handleDeleteClick}
                                >
                                    <BinIcon />
                                    Delete
                                </ActionButton>
                            </ActionsContainer>
                        )}
                    </Container>
                </BaseCard>
            </div>
        </div>
    );
};
