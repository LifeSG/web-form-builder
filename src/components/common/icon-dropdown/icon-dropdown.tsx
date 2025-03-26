import { Form, V2_Text } from "@lifesg/react-design-system";
import {
    EElementType,
    useBuilder,
    useIsAttributeDisabled,
    useIsElementDisabled,
} from "src/context-providers";
import {
    ELEMENTS_CATEGORIES,
    ELEMENT_BUTTON_LABELS,
} from "../../../data/elements-data";
import { CardIcon } from "../base-card";
import { Wrapper } from "./icon-dropdown.styles";

interface IProps {
    type?: EElementType;
    onChange?: (option: unknown) => void;
    onBlur?: () => void;
    errorMessage?: string;
}

export const IconDropdown = ({
    type,
    onChange,
    onBlur,
    errorMessage,
}: IProps) => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const { focusedElement } = useBuilder();
    const isElementDisabled = useIsElementDisabled(
        focusedElement?.element.id,
        focusedElement?.element.type
    );
    const isAttributeDisabled = useIsAttributeDisabled(focusedElement, "type");
    const isDisabled = isElementDisabled || isAttributeDisabled;
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderOptions = () =>
        ELEMENTS_CATEGORIES.flatMap((category) => category.elementTypes);

    return (
        (<Form.Select
            data-testid="type-field"
            disabled={isDisabled}
            label={"Element type"}
            options={renderOptions()}
            renderCustomSelectedOption={(option: EElementType) => {
                return (
                    (<Wrapper>
                        <CardIcon elementType={option} />
                        <V2_Text.Body>{ELEMENT_BUTTON_LABELS[option]}</V2_Text.Body>
                    </Wrapper>)
                );
            }}
            selectedOption={type}
            renderListItem={(option: EElementType) => (
                <Wrapper>
                    <CardIcon elementType={option} />
                    <V2_Text.Body>{ELEMENT_BUTTON_LABELS[option]}</V2_Text.Body>
                </Wrapper>
            )}
            onSelectOption={(option) => onChange(option)}
            errorMessage={errorMessage && errorMessage}
            onBlur={onBlur}
        />)
    );
};
