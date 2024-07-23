import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { BinIcon, DragHandleIcon } from "@lifesg/react-icons";
import { Controller, useFormContext } from "react-hook-form";
import { TOverallOptionGroupBasedSchema } from "src/schemas";
import { DeleteButton } from "../../../common/delete-button/delete-button";
import {
    DropdownItemsChildWrapper,
    DropdownItemsDragHandleButton,
} from "./dropdown-items-child.styles";

interface IProps {
    onDelete: () => void;
    index: number;
}

export const DropdownItemsChild = ({ onDelete, index }: IProps) => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================

    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<TOverallOptionGroupBasedSchema>();

    const dropdownItems = watch("dropdownItems");

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const isDeleteDisabled = () => {
        return dropdownItems.length < 3;
    };
    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderPopoverMessage = () => {
        return (
            <Text.Body>
                Item deletion is not allowed when there are less than 3 items.
            </Text.Body>
        );
    };

    return (
        <DropdownItemsChildWrapper data-testid="dropdown-item-child">
            <DropdownItemsDragHandleButton>
                <DragHandleIcon />
            </DropdownItemsDragHandleButton>
            <Controller
                name={`dropdownItems.${index}.label`}
                control={control}
                render={({ field }) => (
                    <Form.Input
                        data-testid="dropdown-item-label"
                        placeholder="Enter label"
                        {...field}
                        errorMessage={
                            errors.dropdownItems?.[index]?.label?.message
                        }
                    />
                )}
            ></Controller>
            <Controller
                name={`dropdownItems.${index}.value`}
                control={control}
                render={({ field }) => (
                    <Form.Input
                        data-testid="dropdown-item-value"
                        placeholder="Enter value"
                        {...field}
                        errorMessage={
                            errors.dropdownItems?.[index]?.value?.message
                        }
                    />
                )}
            ></Controller>
            <DeleteButton
                onClick={onDelete}
                popoverMessage={renderPopoverMessage()}
                disabled={isDeleteDisabled()}
            >
                <BinIcon />
            </DeleteButton>
        </DropdownItemsChildWrapper>
    );
};
