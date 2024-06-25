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
import { debounce } from "lodash";
import { useCallback, useRef } from "react";
import { TElement, useBuilder } from "src/context-providers";
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
    } = useBuilder();
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const finalMode = focusedElement ? true : showSidePanel;
    const renderMode = finalMode ? "minimised" : "expanded";

    const items: UniqueIdentifier[] = orderedIdentifiers.map(
        (identifier) => identifier.internalId
    );
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

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleElementCardClick = (element: TElement) => () => {
        focusElement(element);
    };

    const handleOnDragMove = useCallback(
        debounce((event: DragEndEvent) => {
            const wrapperBounds = wrapperRef.current?.getBoundingClientRect();
            if (!wrapperBounds) return;

            const wrapperLeftThirds =
                wrapperBounds.left + wrapperBounds.width / 3;
            const wrapperRightThirds =
                wrapperBounds.left + (wrapperBounds.width * 2) / 3;
            const mouseX =
                event.active.rect.current.translated.left +
                event.activatorEvent["layerX"];
            const { active, over } = event;
            if (active.id === over.id) return;

            const newIndex = orderedIdentifiers.findIndex(
                (item) => item.internalId === active.id
            );
            const oldIndex = orderedIdentifiers.findIndex(
                (item) => item.internalId === over.id
            );

            let elementIdentifiers = [...orderedIdentifiers];
            let updatedOrderedIdentifiers = [];

            if (mouseX < wrapperLeftThirds) {
                // When it's dragged to the left
                elementIdentifiers[newIndex] = {
                    ...elementIdentifiers[newIndex],
                    size: "third",
                };
                elementIdentifiers[oldIndex] = {
                    ...elementIdentifiers[oldIndex],
                    size: "third",
                };

                const activeElement = elementIdentifiers.splice(newIndex, 1)[0];
                elementIdentifiers.splice(oldIndex, 0, activeElement);
                updatedOrderedIdentifiers = [...elementIdentifiers];
            } else if (mouseX > wrapperRightThirds) {
                // When it's dragged to the right
                elementIdentifiers[newIndex] = {
                    ...elementIdentifiers[newIndex],
                    size: "third",
                };
                elementIdentifiers[oldIndex] = {
                    ...elementIdentifiers[oldIndex],
                    size: "third",
                };

                const activeElement = elementIdentifiers.splice(newIndex, 1)[0];
                elementIdentifiers.splice(oldIndex + 1, 0, activeElement);
                updatedOrderedIdentifiers = [...elementIdentifiers];
            } else {
                // When it's dragged to the center
                if (elementIdentifiers[newIndex].size === "third") {
                    elementIdentifiers[newIndex] = {
                        ...elementIdentifiers[newIndex],
                        size: "full",
                    };
                }
                updatedOrderedIdentifiers = arrayMove(
                    elementIdentifiers,
                    newIndex,
                    oldIndex
                );
            }
            updateOrderedIdentifiers(updatedOrderedIdentifiers);
        }, 55),
        [orderedIdentifiers, updateOrderedIdentifiers]
    );

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
                    $size={identifier?.size}
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
        <Wrapper $mode={renderMode} ref={wrapperRef}>
            <DndContext
                sensors={sensors}
                onDragMove={handleOnDragMove}
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
