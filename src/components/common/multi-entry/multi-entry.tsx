import { PlusIcon } from "@lifesg/react-icons/plus";
import {
    AddMultiEntryButton,
    MultiEntryAccordionItem,
} from "./multi-entry.styles";

interface IProps {
    title?: string;
    buttonLabel?: string;
    onAdd: () => void;
    children: React.ReactNode;
    disabledButton?: boolean;
}

export const MultiEntry = ({
    title,
    buttonLabel,
    onAdd,
    children,
    disabledButton,
}: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    return (
        <MultiEntryAccordionItem title={title}>
            <>
                {children}
                <AddMultiEntryButton
                    styleType="light"
                    onClick={onAdd}
                    role="button"
                    disabled={disabledButton}
                >
                    <PlusIcon />
                    {"Add " + buttonLabel}
                </AddMultiEntryButton>
            </>
        </MultiEntryAccordionItem>
    );
};
