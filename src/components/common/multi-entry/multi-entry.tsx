import { PlusIcon } from "@lifesg/react-icons/plus";
import {
    AddMultiEntryButton,
    MultiEntryAccordionItem,
} from "./multi-entry.styles";
import { ButtonWithIcon } from "@lifesg/react-design-system/button-with-icon";

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
                    icon={<PlusIcon />}
                    styleType="light"
                    onClick={onAdd}
                    role="button"
                    disabled={disabledButton}
                >
                    {"Add " + buttonLabel}
                </AddMultiEntryButton>
            </>
        </MultiEntryAccordionItem>
    );
};
