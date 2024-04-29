import { Form, Text } from "@lifesg/react-design-system";
import {
    ELEMENTS_CATEGORIES,
    ELEMENT_BUTTON_LABELS,
} from "../../../data/elements-data";
import { CardIcon } from "../base-card";
import { Wrapper } from "./icon-dropdown.styles";

interface IProps {
    id?: string;
    type?: string;
    onChange: (option: string) => void;
}

export const IconDropdown = ({ id, type, onChange }: IProps) => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderOptions = () => {
        const options = [];

        ELEMENTS_CATEGORIES.map((elementCategory) => {
            elementCategory.elementTypes.map((element) => {
                options.push(element);
            });
        });
        return options;
    };

    return (
        <Form.Select
            key={"element - " + id}
            id={id}
            label={"Element type"}
            options={renderOptions()}
            renderCustomSelectedOption={(option) => {
                return (
                    <Wrapper>
                        <CardIcon elementType={option} />
                        <Text.Body>{ELEMENT_BUTTON_LABELS[option]}</Text.Body>
                    </Wrapper>
                );
            }}
            selectedOption={type}
            renderListItem={(option) => (
                <Wrapper>
                    <CardIcon elementType={option} />
                    <Text.Body>{ELEMENT_BUTTON_LABELS[option]}</Text.Body>
                </Wrapper>
            )}
            onSelectOption={(option) => onChange(option)}
        />
    );
};
