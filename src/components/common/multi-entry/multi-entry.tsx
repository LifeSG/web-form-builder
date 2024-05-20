import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { PlusIcon } from "@lifesg/react-icons/plus";
import { EPopoverReason } from "src/context-providers";
import {
    AddMultiEntryButton,
    MultiEntryAccordionItem,
    SubtitleText,
} from "./multi-entry.styles";

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
            case EPopoverReason.MAX_ENTRY:
                return `Limit reached. To add new ${buttonLabel}, remove existing ones first`;
            case EPopoverReason.EMPTY_OR_INVALID:
                return `To add new ${buttonLabel}, fill up existing ${buttonLabel} first.`;
            case EPopoverReason.NO_CONDITION:
                return `No conditional rendering available.`;
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
