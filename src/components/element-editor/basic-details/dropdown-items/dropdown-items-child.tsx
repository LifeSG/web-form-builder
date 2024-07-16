import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import {
    DropdownItemsChildWrapper,
    DropdownItemsDragHandleButton,
} from "./dropdown-items-child.styles";
import { Controller, useFormContext } from "react-hook-form";
import { BinIcon, DragHandleIcon } from "@lifesg/react-icons";

import DropdownItemsBinButton from "./dropdown-items-bin-button";
import { TOverallOptionGroupBasedSchema } from "src/schemas";

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
        <DropdownItemsChildWrapper>
            <DropdownItemsDragHandleButton>
                <DragHandleIcon />
            </DropdownItemsDragHandleButton>
            <Controller
                name={`dropdownItems.${index}.label`}
                control={control}
                render={({ field }) => (
                    <Form.Input
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
                        placeholder="Enter value"
                        {...field}
                        errorMessage={
                            errors.dropdownItems?.[index]?.value?.message
                        }
                    />
                )}
            ></Controller>
            <DropdownItemsBinButton
                onClick={onDelete}
                popoverMessage={renderPopoverMessage()}
                disabled={isDeleteDisabled()}
            >
                <BinIcon />
            </DropdownItemsBinButton>
        </DropdownItemsChildWrapper>
    );
};
