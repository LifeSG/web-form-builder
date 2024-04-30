import { Form, Text } from "@lifesg/react-design-system";
import { EElementType } from "src/context-providers";
import {
    ELEMENTS_CATEGORIES,
    ELEMENT_BUTTON_LABELS,
} from "../../../data/elements-data";
import { CardIcon } from "../base-card";
import { Wrapper } from "./icon-dropdown.styles";

interface IProps {
    id?: string;
    type?: string;
    onChange?: (option: unknown) => void;
    errorMessage?: string;
}

export const IconDropdown = ({ id, type, onChange, errorMessage }: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderOptions = () =>
        ELEMENTS_CATEGORIES.flatMap((category) => category.elementTypes);

    return (
        <Form.Select
            key={"element - " + id}
            id={id}
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
            errorMessage={errorMessage && errorMessage}
        />
    );
};
