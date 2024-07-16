import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { PencilIcon } from "@lifesg/react-icons/pencil";
import { PlusIcon } from "@lifesg/react-icons/plus";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/schemas";
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
    const { control } = useFormContext<TFormFieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "dropdownItems",
        rules: {
            minLength: 2,
        },
    });
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
