import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    closestCorners,
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
import { useEffect, useRef } from "react";
import {
    IElementIdentifier,
    TElement,
    useBuilder,
} from "src/context-providers";
import { ElementCard } from "../element-card";
import {
    ElementItemWrapper,
    ElementsWrapper,
    EmptyDisplayDescription,
    EmptyDisplayTitle,
    EmptyDisplayWrapper,
    Wrapper,
} from "./main-panel.styles";

interface IElementRef {
    internalId?: string;
    element?: HTMLLIElement | null;
}

interface IAffectedElementRef {
    internalId?: string;
    elementColumn?: IElementIdentifier["size"];
}

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
    const elementRefs = useRef<IElementRef[] | null>([]);
    const elementStartingRefs = useRef<Array<DOMRect | null>>([]);
    const affectElementsRects = useRef<IAffectedElementRef>({});
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

    const handleonDragStart = () => {
        elementRefs.current.forEach((elementRef, index) => {
            elementStartingRefs.current[index] =
                elementRef.element.getBoundingClientRect();
        });
    };

    const handleOnDragMove = debounce((event: DragEndEvent) => {
        const { active } = event;

        const wrapperBounds = wrapperRef.current?.getBoundingClientRect();

        const wrapperLeftThirds = wrapperBounds.left + wrapperBounds.width / 3;
        const wrapperRightThirds =
            wrapperBounds.left +
            (wrapperBounds.width * 2) / 3 -
            wrapperBounds.width / 9;

        const currentActiveIndex = orderedIdentifiers.findIndex(
            (item) => item.internalId === active.id
        );

        const mouseX =
            event.active.rect.current.translated?.left +
            event.activatorEvent["layerX"];

        const mouseY =
            event.active.rect.current.translated.top +
            event.activatorEvent["layerY"];

        let elementIndex = 0;
        let inSameRow = false;
        let column: IElementIdentifier["size"] = "full";

        elementStartingRefs.current.forEach((elementRect, index) => {
            if (mouseY >= elementRect.y) {
                elementIndex = index;
            }
            if (mouseY > elementRect.y && mouseY < elementRect.bottom) {
                inSameRow = true;
            }
        });

        let updatedOrderedIdentifiers = arrayMove(
            orderedIdentifiers,
            currentActiveIndex,
            elementIndex
        );

        if (mouseX <= wrapperLeftThirds) {
            column = "left";
        } else if (mouseX >= wrapperRightThirds) {
            column = "right";
        }

        updatedOrderedIdentifiers[elementIndex] = {
            ...updatedOrderedIdentifiers[elementIndex],
            size: column,
        };

        // to  change sizes of the affected elements accordingly
        if (
            column === "left" &&
            inSameRow &&
            updatedOrderedIdentifiers[elementIndex + 1]
        ) {
            affectElementsRects.current = {
                internalId:
                    updateOrderedIdentifiers[elementIndex + 1]?.internalId,
                elementColumn: updatedOrderedIdentifiers[elementIndex + 1].size,
            };
            updateOrderedIdentifiers[elementIndex + 1] = {
                ...updateOrderedIdentifiers[elementIndex + 1],
                size: "right",
            };
        } else if (
            column === "right" &&
            inSameRow &&
            updatedOrderedIdentifiers[elementIndex - 1]
        ) {
            affectElementsRects.current = {
                internalId:
                    updateOrderedIdentifiers[elementIndex - 1]?.internalId,
                elementColumn: updatedOrderedIdentifiers[elementIndex - 1].size,
            };
            updateOrderedIdentifiers[elementIndex - 1] = {
                ...updateOrderedIdentifiers[elementIndex - 1],
                size: "left",
            };
        } else if (!inSameRow) {
            affectElementsRects.current = null;
        }

        updateOrderedIdentifiers(updatedOrderedIdentifiers);
    }, 10);

    const onHandleDragEnd = () => {
        elementStartingRefs.current = [];
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        const validInternalIds = new Set(
            orderedIdentifiers.map((identifier) => identifier.internalId)
        );

        elementRefs.current = elementRefs.current.filter((ref) =>
            validInternalIds.has(ref.internalId)
        );
    }, [orderedIdentifiers]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderElements = () => {
        return orderedIdentifiers.map((identifier, index) => {
            const element = elements[identifier.internalId];
            return (
                <ElementItemWrapper
                    key={identifier.internalId}
                    $mode={renderMode}
                    $size={identifier?.size}
                    data-testid="element-content"
                    ref={(element) =>
                        (elementRefs.current[index] = {
                            internalId: identifier.internalId,
                            element,
                        })
                    }
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
                onDragStart={handleonDragStart}
                onDragEnd={onHandleDragEnd}
                collisionDetection={closestCorners}
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
