import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { PencilIcon } from "@lifesg/react-icons/pencil";
import { PlusIcon } from "@lifesg/react-icons/plus";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TOptionGroupBasedSchema } from "src/schemas/option-group-based-fields";
import { DropdownItemsChild } from "./dropdown-items-child";
import {
    DropdownItemsButton,
    DropdownItemsButtonsWrapper,
    DropdownItemsWrapper,
} from "./dropdown-items.styles";

export const DropdownItems = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { control } = useFormContext<TOptionGroupBasedSchema>();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "dropdownItems",
        shouldUnregister: true,
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        if (fields.length === 0) {
            append(
                [
                    { label: "", value: "" },
                    { label: "", value: "" },
                ],
                {
                    shouldFocus: false,
                }
            );
        }
    }, []);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleAddButtonClick = () => {
        append(
            { label: "", value: "" },
            {
                shouldFocus: false,
            }
        );
    };

    const handleDeleteButtonClick = (index: number) => {
        remove(index);
    };

    const handleBulkEditButtonClick = () => {
        // TODO: to be implemented
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over.id);

            move(oldIndex, newIndex);
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        return fields.map((field, index) => {
            return (
                <DropdownItemsChild
                    key={field.id}
                    id={field.id}
                    index={index}
                    onDelete={() => handleDeleteButtonClick(index)}
                />
            );
        });
    };

    const renderButtons = () => {
        return (
            <DropdownItemsButtonsWrapper>
                <DropdownItemsButton
                    onClick={handleAddButtonClick}
                    icon={<PlusIcon />}
                    styleType="secondary"
                    type="button"
                >
                    Add Option
                </DropdownItemsButton>
                <DropdownItemsButton
                    onClick={handleBulkEditButtonClick}
                    icon={<PencilIcon />}
                    styleType="secondary"
                    type="button"
                >
                    Bulk Edit
                </DropdownItemsButton>
            </DropdownItemsButtonsWrapper>
        );
    };

    return (
        <DropdownItemsWrapper>
            <Form.Label>
                Dropdown items
                <Text.H6 weight={400}>
                    Label is the item displayed to the users in the dropdown
                    menu. Value is used to differentiate the dropdown items in
                    the backend.
                </Text.H6>
            </Form.Label>
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
            >
                <SortableContext
                    items={fields}
                    strategy={verticalListSortingStrategy}
                >
                    {renderChildren()}
                </SortableContext>
            </DndContext>
            {renderButtons()}
        </DropdownItemsWrapper>
    );
};
