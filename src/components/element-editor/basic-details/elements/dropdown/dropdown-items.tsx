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
import isEmpty from "lodash/isEmpty";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
    EModalType,
    IBulkEditModalProps,
    IDropdownItemAttributes,
    useBuilder,
    useIsElementDisabled,
} from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import {
    getNonEmptyLines,
    getValidDropdownItem,
    TOverallOptionGroupBasedValues,
} from "src/yup-schemas";
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
    const { control, getValues, trigger } =
        useFormContext<TOverallOptionGroupBasedValues>();
    const { fields, append, remove, move, replace } = useFieldArray({
        control,
        name: "dropdownItems",
        shouldUnregister: true,
    });
    const { showModal } = useModal();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const { focusedElement } = useBuilder();
    const isDisabled = useIsElementDisabled(
        focusedElement?.element?.id,
        focusedElement?.element?.type
    );

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        if (fields.length < 2) {
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
    // HELPER FUNCTIONS
    // =========================================================================

    const convertDropdownItemsToString = (
        items: IDropdownItemAttributes[]
    ): string => {
        const lines = items
            .filter((item) => !isEmpty(item.label) || !isEmpty(item.value))
            .map((item) => `${item.label} | ${item.value}`);
        return lines.join("\n");
    };

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

    const handleBulkEditSaveButtonClick = (value: string): void => {
        const lines = getNonEmptyLines(value);
        const dropdownItems = lines.map((line) => getValidDropdownItem(line));
        while (dropdownItems.length < 2) {
            dropdownItems.push({ label: "", value: "" });
        }
        replace(dropdownItems);
        trigger("dropdownItems");
    };

    const handleBulkEditButtonClick = () => {
        const dropdownItems = getValues(
            "dropdownItems"
        ) as IDropdownItemAttributes[];
        const bulkEditModal: IBulkEditModalProps = {
            type: EModalType.BulkEdit,
            dropdownItemsString: convertDropdownItemsToString(dropdownItems),
            onClickActionButton: handleBulkEditSaveButtonClick,
        };
        showModal(bulkEditModal);
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
                    disabled={isDisabled}
                    onClick={handleAddButtonClick}
                    icon={<PlusIcon />}
                    styleType="secondary"
                    type="button"
                >
                    Add Option
                </DropdownItemsButton>
                <DropdownItemsButton
                    disabled={isDisabled}
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
