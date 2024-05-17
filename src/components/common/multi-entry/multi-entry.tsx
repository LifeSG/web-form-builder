import { PlusIcon } from "@lifesg/react-icons/plus";
import {
    AddMultiEntryButton,
    MultiEntryAccordionItem,
    SubtitleText,
} from "./multi-entry.styles";
import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";

interface IProps {
    title?: string;
    buttonLabel?: string;
    onAdd: () => void;
    children: React.ReactNode;
    disabledButton?: boolean;
    popoverReason?: string;
    subtitle?: string;
}

export const MultiEntry = ({
    title,
    buttonLabel,
    onAdd,
    children,
    disabledButton,
    popoverReason,
    subtitle,
}: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderPopoverContent = () => {
        switch (popoverReason) {
            case "maxEntry":
                return `Limit reached. To add new ${buttonLabel}, remove existing ones first`;
            case "emptyOrInvalid":
                return `To add new ${buttonLabel}, fill up existing ${buttonLabel} first.`;
        }
    };

    const renderButton = () => {
        if (disabledButton && popoverReason) {
            return (
                <PopoverTrigger
                    popoverContent={renderPopoverContent()}
                    trigger="hover"
                    data-testid="add-button-popover"
                >
                    <AddMultiEntryButton
                        icon={<PlusIcon />}
                        styleType="light"
                        onClick={onAdd}
                        role="button"
                        disabled={disabledButton}
                        type="button"
                    >
                        {"Add " + buttonLabel}
                    </AddMultiEntryButton>
                </PopoverTrigger>
            );
        } else {
            return (
                <AddMultiEntryButton
                    icon={<PlusIcon />}
                    styleType="light"
                    onClick={onAdd}
                    role="button"
                    disabled={disabledButton}
                    type="button"
                >
                    {"Add " + buttonLabel}
                </AddMultiEntryButton>
            );
        }
    };

    return (
        <MultiEntryAccordionItem title={title} $hasSubtitle={!!subtitle}>
            <>
                {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
                {children}
                {renderButton()}
            </>
        </MultiEntryAccordionItem>
    );
};
