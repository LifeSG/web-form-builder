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
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = orderedIdentifiers.findIndex(
                (item) => item.internalId === active.id
            );
            const newIndex = orderedIdentifiers.findIndex(
                (item) => item.internalId === over.id
            );

            let updatedOrderedIdentifiers = [...orderedIdentifiers];

            const activeCenterX =
                active.rect.current?.translated.left +
                active.rect.current?.translated.width / 3;
            const overCenterX = over.rect.left + over.rect.width / 3;
            console.log(overCenterX, activeCenterX);

            if (activeCenterX > overCenterX) {
                // when its dragged to the right
                updatedOrderedIdentifiers[newIndex] = {
                    ...updatedOrderedIdentifiers[newIndex],
                    size: "third-right",
                };
                updatedOrderedIdentifiers[oldIndex] = {
                    ...updatedOrderedIdentifiers[oldIndex],
                    size: "third-left",
                };
            }

            if (activeCenterX < overCenterX) {
                // when its dragged to the left
                updatedOrderedIdentifiers[newIndex] = {
                    ...updatedOrderedIdentifiers[newIndex],
                    size: "third-left",
                };
                updatedOrderedIdentifiers[oldIndex] = {
                    ...updatedOrderedIdentifiers[oldIndex],
                    size: "third-right",
                };
            }

            // TODO: Need to come back cause not sure what can be tracked for this
            // if (activeCenterX - overCenterX >= 0) {
            //     // when its dragged to the center
            //     updatedOrderedIdentifiers[newIndex] = {
            //         ...updatedOrderedIdentifiers[newIndex],
            //         size: "full",
            //     };
            // }

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
