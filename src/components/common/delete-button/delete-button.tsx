import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { StyledBinButton } from "../../element-editor/basic-details/dropdown-items/dropdown-items-child.styles";

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

    const renderButton = () => {
        if (disabled) {
            return (
                <PopoverTrigger
                    popoverContent={popoverMessage}
                    trigger="hover"
                    position="bottom-end"
                >
                    <StyledBinButton $disabled={true}>
                        {children}
                    </StyledBinButton>
                </PopoverTrigger>
            );
        }
        return (
            <StyledBinButton data-testid="delete-button" onClick={onClick}>
                {children}
            </StyledBinButton>
        );
    };

    return renderButton();
};
