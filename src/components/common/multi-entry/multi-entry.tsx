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
    subtitle?: string;
}

export const MultiEntry = ({
    title,
    buttonLabel,
    onAdd,
    children,
    disabledButton,
    subtitle,
}: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    return (
        <MultiEntryAccordionItem
            title={title}
            $hasSubtitle={subtitle ? true : false}
        >
            {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
            <>
                {children}
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
            </>
        </MultiEntryAccordionItem>
    );
};
