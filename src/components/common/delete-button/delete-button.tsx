import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { StyledBinButton } from "./delete-button.styles";
import { BinIcon } from "@lifesg/react-icons/bin";

interface IProps {
    onClick: () => void;
    disabled?: boolean;
    popoverMessage?: JSX.Element;
}

export const DeleteButton = ({ onClick, disabled, popoverMessage }: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const deleteButton = (
        <StyledBinButton
            $disabled={disabled}
            data-testid={!disabled ? "delete-button" : undefined}
            onClick={!disabled ? onClick : undefined}
        >
            <BinIcon />
        </StyledBinButton>
    );

    if (disabled) {
        return (
            <PopoverTrigger
                popoverContent={popoverMessage}
                trigger="hover"
                position="bottom-end"
            >
                {deleteButton}
            </PopoverTrigger>
        );
    }

    return deleteButton;
};
