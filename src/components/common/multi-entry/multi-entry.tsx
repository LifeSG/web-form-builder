import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { PlusIcon } from "@lifesg/react-icons/plus";
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
    popoverMessage?: string | React.ReactNode;
    subtitle?: string;
    expanded?: boolean;
    hideAddButton?: boolean;
}

export const MultiEntry = ({
    title,
    buttonLabel,
    onAdd,
    children,
    disabledButton,
    popoverMessage,
    subtitle,
    expanded,
    hideAddButton,
}: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderButton = () => {
        if (disabledButton && popoverMessage) {
            return (
                <PopoverTrigger
                    popoverContent={popoverMessage as JSX.Element}
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
        <MultiEntryAccordionItem
            title={title}
            $hasSubtitle={!!subtitle}
            expanded={expanded}
        >
            <>
                {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
                {children}
                {!hideAddButton && renderButton()}
            </>
        </MultiEntryAccordionItem>
    );
};
