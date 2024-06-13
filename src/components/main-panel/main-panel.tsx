import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import {
    EModalType,
    TElement,
    useBuilder,
    useDisplay,
} from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { ElementCard } from "../element-card";
import {
    ElementItemWrapper,
    ElementsWrapper,
    EmptyDisplayDescription,
    EmptyDisplayTitle,
    EmptyDisplayWrapper,
    Wrapper,
} from "./main-panel.styles";

export const MainPanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const {
        showSidePanel,
        orderedIdentifiers,
        elements,
        focusElement,
        focusedElement,
        updateOrderedIdentifiers,
        removeFocusedElement,
    } = useBuilder();
    const { isDirty } = focusedElement || {};
    const finalMode = focusedElement ? true : showSidePanel;
    const renderMode = finalMode ? "minimised" : "expanded";
    const items: (UniqueIdentifier | { id: UniqueIdentifier })[] = [];
    const { showModal, discardChanges } = useModal();
    const { showToast } = useDisplay();

    for (const orderedIdentifier of orderedIdentifiers) {
        if ("internalId" in orderedIdentifier) {
            items.push({ id: orderedIdentifier.internalId });
        } else {
            items.push(orderedIdentifier);
        }
    }

    // =========================================================================
    // HELPER FUNCTION
    // =========================================================================

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8, // mouse drag of 8px then activate the drag event
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleModalOnClick = (element?: TElement) => {
        removeFocusedElement();
        focusElement(element);
        discardChanges();
    };

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleElementCardClick = (element: TElement) => () => {
        if (
            isDirty &&
            element?.internalId !== focusedElement?.element?.internalId
        ) {
            const newModal = {
                type: EModalType.DiscardChanges,
                onClickActionButton: () => handleModalOnClick(element),
            };
            showModal(newModal);
        } else {
            focusElement(element);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = orderedIdentifiers.findIndex(
                (item) => item.internalId === active.id
            );
            const newIndex = orderedIdentifiers.findIndex(
                (item) => item.internalId === over.id
            );
            const updatedOrderedIdentifiers = arrayMove(
                orderedIdentifiers,
                oldIndex,
                newIndex
            );

            updateOrderedIdentifiers(updatedOrderedIdentifiers);
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderElements = () => {
        return orderedIdentifiers.map((identifier) => {
            const element = elements[identifier.internalId];
            return (
                <ElementItemWrapper
                    key={identifier.internalId}
                    $mode={renderMode}
                    $size="full"
                    data-testid="element-content"
                >
                    <ElementCard
                        element={element}
                        onClick={handleElementCardClick(element)}
                    />
                </ElementItemWrapper>
            );
        });
    };

    if (orderedIdentifiers.length === 0) {
        return (
            <EmptyDisplayWrapper $mode={renderMode} data-testid="empty-content">
                <ErrorDisplay type="no-item-found" imageOnly />
                <EmptyDisplayTitle weight="semibold">
                    Form is empty
                </EmptyDisplayTitle>
                <EmptyDisplayDescription>
                    Add an element to start building your form!
                </EmptyDisplayDescription>
            </EmptyDisplayWrapper>
        );
    }

    return (
        <Wrapper $mode={renderMode}>
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <ElementsWrapper $mode={renderMode}>
                        {renderElements()}
                    </ElementsWrapper>
                </SortableContext>
            </DndContext>
        </Wrapper>
    );
};
