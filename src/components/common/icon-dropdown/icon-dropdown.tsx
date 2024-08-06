import { Form, Text } from "@lifesg/react-design-system";
import { EElementType } from "src/context-providers";
import {
    ELEMENTS_CATEGORIES,
    ELEMENT_BUTTON_LABELS,
} from "../../../data/elements-data";
import { CardIcon } from "../base-card";
import { Wrapper } from "./icon-dropdown.styles";

interface IProps {
    type?: string;
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
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderOptions = () =>
        ELEMENTS_CATEGORIES.flatMap((category) => category.elementTypes);

    return (
        <Form.Select
            label={"Element type"}
            options={renderOptions()}
            renderCustomSelectedOption={(option: EElementType) => {
                return (
                    <Wrapper>
                        <CardIcon elementType={option} />
                        <Text.Body>{ELEMENT_BUTTON_LABELS[option]}</Text.Body>
                    </Wrapper>
                );
            }}
            selectedOption={type}
            renderListItem={(option: EElementType) => (
                <Wrapper>
                    <CardIcon elementType={option} />
                    <Text.Body>{ELEMENT_BUTTON_LABELS[option]}</Text.Body>
                </Wrapper>
            )}
            onSelectOption={(option) => onChange(option)}
            onBlur={onBlur}
            errorMessage={errorMessage && errorMessage}
            onBlur={onBlur}
        />
    );
};
