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
    IOptionAttributes,
    useBuilder,
    useIsElementDisabled,
} from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import {
    getNonEmptyLines,
    getValidOption,
    TOverallOptionGroupBasedValues,
} from "src/yup-schemas";
import {
    OptionsButton,
    OptionsButtonsWrapper,
    OptionsWrapper,
} from "./options.styles";
import { OptionsChild } from "./options-child";

interface IOptionsProps {
    label: string;
    description: string;
    fieldName: "radioItems" | "dropdownItems";
}

export const Options = ({ label, description, fieldName }: IOptionsProps) => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const { control, getValues, trigger } =
        useFormContext<TOverallOptionGroupBasedValues>();
    const { fields, append, remove, move, replace } = useFieldArray({
        control,
        name: fieldName,
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
    }, [fields]);

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over.id);

            move(oldIndex, newIndex);
        }
    };

    const handleBulkEditSaveButtonClick = (value: string) => {
        const lines = getNonEmptyLines(value);
        const dropdownItems = lines.map((line) => getValidOption(line));
        while (dropdownItems.length < 2) {
            dropdownItems.push({ label: "", value: "" });
        }
        replace(dropdownItems);
        trigger(fieldName);
    };

    const handleAddButtonClick = () => {
        append({ label: "", value: "" }, { shouldFocus: false });
    };

    const convertOptionsToString = (items: IOptionAttributes[]): string => {
        const lines = items
            .filter((item) => !isEmpty(item.label) || !isEmpty(item.value))
            .map((item) => `${item.label} | ${item.value}`);
        return lines.join("\n");
    };

    const handleBulkEditButtonClick = () => {
        const options = getValues(fieldName);
        const bulkEditModal: IBulkEditModalProps = {
            type: EModalType.BulkEdit,
            optionsString: convertOptionsToString(options),
            onClickActionButton: (value: string) =>
                handleBulkEditSaveButtonClick(value),
        };
        showModal(bulkEditModal);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        return fields.map((field, index) => {
            return (
                <OptionsChild
                    key={field.id}
                    id={field.id}
                    index={index}
                    onDelete={() => remove(index)}
                    fieldName={fieldName}
                />
            );
        });
    };

    const renderButtons = () => {
        return (
            <OptionsButtonsWrapper>
                <OptionsButton
                    disabled={isDisabled}
                    onClick={handleAddButtonClick}
                    icon={<PlusIcon />}
                    styleType="secondary"
                    type="button"
                >
                    Add Option
                </OptionsButton>
                <OptionsButton
                    disabled={isDisabled}
                    onClick={handleBulkEditButtonClick}
                    icon={<PencilIcon />}
                    styleType="secondary"
                    type="button"
                >
                    Bulk Edit
                </OptionsButton>
            </OptionsButtonsWrapper>
        );
    };

    return (
        <OptionsWrapper>
            <Form.Label>
                {label}
                <Text.H6 weight={400}>{description}</Text.H6>
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
            <OptionsButtonsWrapper>
                <OptionsButton
                    onClick={handleAddButtonClick}
                    icon={<PlusIcon />}
                    styleType="secondary"
                    type="button"
                >
                    Add Option
                </OptionsButton>
                <OptionsButton
                    onClick={handleBulkEditButtonClick}
                    icon={<PencilIcon />}
                    styleType="secondary"
                    type="button"
                >
                    Bulk Edit
                </OptionsButton>
            </OptionsButtonsWrapper>
        </OptionsWrapper>
    );
};
