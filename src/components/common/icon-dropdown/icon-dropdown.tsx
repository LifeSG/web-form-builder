import { Form } from "@lifesg/react-design-system";
import { Typography } from "@lifesg/react-design-system/typography";
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
        <Form.Select
            data-testid="type-field"
            disabled={isDisabled}
            label={"Element type"}
            options={renderOptions()}
            renderCustomSelectedOption={(option: EElementType) => {
                return (
                    <Wrapper>
                        <CardIcon elementType={option} />
                        <Typography.BodyBL>
                            {ELEMENT_BUTTON_LABELS[option]}
                        </Typography.BodyBL>
                    </Wrapper>
                );
            }}
            selectedOption={type}
            renderListItem={(option: EElementType) => (
                <Wrapper>
                    <CardIcon elementType={option} />
                    <Typography.BodyBL>
                        {ELEMENT_BUTTON_LABELS[option]}
                    </Typography.BodyBL>
                </Wrapper>
            )}
            onSelectOption={(option) => onChange(option)}
            errorMessage={errorMessage && errorMessage}
            onBlur={onBlur}
        />
    );
};
