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
            type="button"
            disabled={disabled}
            data-testid="delete-button"
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
                data-testid="delete-button-popover"
            >
                {deleteButton}
            </PopoverTrigger>
        );
    }

    return deleteButton;
};
