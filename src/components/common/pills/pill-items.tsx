import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Form } from "@lifesg/react-design-system/form";
import { PlusIcon } from "@lifesg/react-icons/plus";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ITextareaFieldAttributes } from "src/context-providers";
import { PillItemsChild } from "./pill-items-child";
import { AddMultiEntryButton, PillItemsWrapper } from "./pill-items.styles";

export const PillItems = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { control } = useFormContext<ITextareaFieldAttributes>();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "pillItems",
        shouldUnregister: true,
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const disableDeleteButton = fields.length <= 2;
    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    const handleAddButtonClick = () => {
        append({ content: "" });
    };

    const handleDeleteButtonClick = (index: number) => {
        remove(index);
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderPillItems = () =>
        fields.map((item, index) => (
            <PillItemsChild
                key={item.id}
                item={item}
                index={index}
                onDelete={() => handleDeleteButtonClick(index)}
                disableDelete={disableDeleteButton}
            />
        ));
    return (
        <PillItemsWrapper>
            <Form.Label>Pill items</Form.Label>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={fields}
                    strategy={verticalListSortingStrategy}
                >
                    {renderPillItems()}
                </SortableContext>
            </DndContext>
            <AddMultiEntryButton
                icon={<PlusIcon />}
                styleType="light"
                onClick={handleAddButtonClick}
                role="button"
                type="button"
            >
                Add option
            </AddMultiEntryButton>
        </PillItemsWrapper>
    );
};
