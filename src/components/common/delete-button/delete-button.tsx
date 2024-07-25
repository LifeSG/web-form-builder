import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { StyledBinButton } from "./delete-button.styles";

interface IProps {
    onClick: () => void;
    disabled?: boolean;
    popoverMessage?: JSX.Element;
    children: React.ReactNode;
}

export const DeleteButton = ({
    onClick,
    disabled,
    children,
    popoverMessage,
}: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const deleteButton = (
        <StyledBinButton
            $disabled={disabled}
            data-testid={!disabled ? "delete-button" : undefined}
            onClick={!disabled ? onClick : undefined}
        >
            {children}
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
