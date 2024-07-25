import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { PencilIcon } from "@lifesg/react-icons/pencil";
import { PlusIcon } from "@lifesg/react-icons/plus";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
    EModalType,
    IBulkEditModalProps,
    IDropdownItemAttributes,
} from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import {
    getNonEmptyLines,
    getValidDropdownItem,
} from "src/schemas/bulk-edit-helper";
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
    const { control, getValues, trigger } =
        useFormContext<TOptionGroupBasedSchema>();
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "dropdownItems",
        shouldUnregister: true,
    });
    const { showModal } = useModal();

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        // Ensure there are always at least 2 dropdown items
        const missingItems = 2 - fields.length;
        if (missingItems > 0) {
            append(Array(missingItems).fill({ label: "", value: "" }), {
                shouldFocus: false,
            });
        }
    }, [fields, append]);

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
        const dropdownItems = lines
            .map((line) => getValidDropdownItem(line))
            .filter((item) => item !== null);

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

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        return fields.map((field, index) => {
            return (
                <DropdownItemsChild
                    key={field.id}
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
            {renderChildren()}
            {renderButtons()}
        </DropdownItemsWrapper>
    );
};
