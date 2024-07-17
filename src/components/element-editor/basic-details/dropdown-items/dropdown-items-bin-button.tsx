import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { StyledBinButton } from "./dropdown-items-child.styles";

interface IProps {
    onClick: () => void;
    disabled?: boolean;
    popoverMessage?: string | React.ReactNode;
    children: React.ReactNode;
}

const DropdownItemsBinButton = ({
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
                    popoverContent={popoverMessage as JSX.Element}
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
            <StyledBinButton
                data-testid="dropdown-items-bin-button"
                onClick={onClick}
            >
                {children}
            </StyledBinButton>
        );
    };

    return renderButton();
};

export default DropdownItemsBinButton;
