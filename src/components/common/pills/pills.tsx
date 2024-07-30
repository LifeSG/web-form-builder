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
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { ITextareaFieldAttributes } from "src/context-providers";
import { BottomPositionIcon } from "../icons/bottom-position-icon";
import { TopPositionIcon } from "../icons/top-position-icon";
import { PillItem } from "./pill-items";
import { AddMultiEntryButton } from "./pills.styles";

export const Pills = () => {
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
            <PillItem
                key={item.id}
                item={item}
                index={index}
                onDelete={() => handleDeleteButtonClick(index)}
                disableDelete={disableDeleteButton}
            />
        ));

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
            >
                <Form.Label>Pill Items</Form.Label>
                {renderPillItems()}
                <AddMultiEntryButton
                    icon={<PlusIcon />}
                    styleType="light"
                    onClick={handleAddButtonClick}
                    role="button"
                    type="button"
                >
                    Add option
                </AddMultiEntryButton>
            </SortableContext>
            <Controller
                name="pillPosition"
                control={control}
                render={({ field }) => (
                    <TogglePair
                        label={{
                            mainLabel: "List position",
                            subLabel:
                                "This displays pills on top or bottom of the text area.",
                        }}
                        value={field.value === "top"}
                        options={[
                            { icon: <TopPositionIcon />, title: "Top" },
                            {
                                icon: <BottomPositionIcon />,
                                title: "Bottom",
                            },
                        ]}
                        onChange={(value) =>
                            field.onChange(value ? "top" : "bottom")
                        }
                    />
                )}
                shouldUnregister
            />
        </DndContext>
    );
};
