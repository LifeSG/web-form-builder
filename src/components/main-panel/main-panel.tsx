import {
    DndContext,
    DragMoveEvent,
    DragStartEvent,
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
} from "@dnd-kit/sortable";
import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import debounce from "lodash/debounce";
import { useEffect, useRef } from "react";
import {
    EModalType,
    IDiscardChangesModalProps,
    IElementIdentifier,
    TElement,
    useBuilder,
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

interface IElementRef {
    internalId?: string;
    element?: HTMLLIElement | null;
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
        removeFocusedElement,
    } = useBuilder();
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const elementRefs = useRef<IElementRef[] | null>([]);
    const elementStartingRefs = useRef<Array<DOMRect | null>>([]);
    const { isDirty } = focusedElement || {};
    const finalMode = focusedElement ? true : showSidePanel;
    const renderMode = finalMode ? "minimised" : "expanded";
    const dragStartY = useRef(-1);
    const items: (UniqueIdentifier | { id: UniqueIdentifier })[] = [];
    const { showModal, discardChanges } = useModal();

    for (const orderedIdentifier of orderedIdentifiers) {
        if ("internalId" in orderedIdentifier) {
            items.push({ id: orderedIdentifier.internalId });
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
            const newModal: IDiscardChangesModalProps = {
                type: EModalType.DiscardChanges,
                onClickActionButton: () => handleModalOnClick(element),
            };
            showModal(newModal);
        } else if (
            !isDirty &&
            element?.internalId !== focusedElement?.element?.internalId
        ) {
            focusElement(element);
        }
    };

    const handleOnDragStart = (event: DragStartEvent) => {
        dragStartY.current = event.active.rect.current.initial?.top;
        elementRefs.current.forEach((elementRef, index) => {
            elementStartingRefs.current[index] =
                elementRef.element.getBoundingClientRect();
        });
    };

    const handleOnDragMove = debounce((event: DragMoveEvent) => {
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
            active.rect.current.translated?.left +
            event.activatorEvent["layerX"];

        let elementIndex = currentActiveIndex;
        let size: IElementIdentifier["size"] = "full";
        if (mouseX <= wrapperLeftThirds) {
            size = "left";
        } else if (mouseX >= wrapperRightThirds) {
            size = "right";
        }

        if (active.rect.current.translated.top > dragStartY.current) {
            // move down
            elementIndex = elementStartingRefs.current.findIndex(
                (elementRect) =>
                    active.rect.current.translated.bottom + 16 >
                    elementRect.y + elementRect.height / 2
            );
        } else {
            // move up
            const reversedIndex = [...elementStartingRefs.current]
                .reverse()
                .findIndex(
                    (elementRect) =>
                        active.rect.current.translated.bottom + 16 >
                        elementRect.y + elementRect.height / 2
                );
            const elementCount = elementStartingRefs.current.length - 1;
            elementIndex = elementCount - reversedIndex;
        }

        const updatedOrderedIdentifiers = arrayMove(
            orderedIdentifiers,
            currentActiveIndex,
            elementIndex
        );

        // update dragged element size
        updatedOrderedIdentifiers[elementIndex] = {
            ...updatedOrderedIdentifiers[elementIndex],
            size,
        };

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

        elementRefs.current = elementRefs.current.filter(
            (ref) => validInternalIds.has(ref.internalId) && ref.element
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
                onDragStart={handleOnDragStart}
                onDragEnd={onHandleDragEnd}
                collisionDetection={closestCorners}
            >
                <SortableContext items={items}>
                    <ElementsWrapper $mode={renderMode}>
                        {renderElements()}
                    </ElementsWrapper>
                </SortableContext>
            </DndContext>
        </Wrapper>
    );
};
