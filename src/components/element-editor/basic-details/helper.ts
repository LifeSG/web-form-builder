import {
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import isEmpty from "lodash/isEmpty";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IOptionAttributes } from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import {
    getNonEmptyLines,
    getValidOption,
    TOverallOptionGroupBasedValues,
} from "src/yup-schemas";

export const useManageOptions = (fieldName: "radioItems" | "dropdownItems") => {
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

    return {
        fields,
        append,
        remove,
        handleDragEnd,
        handleBulkEditSaveButtonClick,
        showModal,
        getValues,
        sensors,
    };
};

export const convertOptionsToString = (items: IOptionAttributes[]): string => {
    const lines = items
        .filter((item) => !isEmpty(item.label) || !isEmpty(item.value))
        .map((item) => `${item.label} | ${item.value}`);
    return lines.join("\n");
};
