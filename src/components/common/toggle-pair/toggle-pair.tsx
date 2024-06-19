import { Form } from "@lifesg/react-design-system";
import { Toggle } from "@lifesg/react-design-system/toggle";
import { useEffect, useState } from "react";
import { Row } from "./toggle-pair.styles";

interface IProps {
    label?: string;
    value?: boolean;
    id?: string;
    onChange: (value: boolean) => void;
}

export const TogglePair = ({
    onChange,
    value: defaultValue,
    label,
    id,
}: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const [value, setValue] = useState(defaultValue);

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    const handleChange = (value: boolean) => {
        setValue(value);
        onChange(value);
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        if (value !== defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue, id]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <div>
            <Form.Label>{label}</Form.Label>
            <Row>
                <Toggle
                    type="yes"
                    checked={value === true}
                    onChange={() => handleChange(true)}
                    indicator
                >
                    Yes
                </Toggle>
                <Toggle
                    type="no"
                    checked={value === false}
                    onChange={() => handleChange(false)}
                    indicator
                >
                    No
                </Toggle>
            </Row>
        </div>
    );
};
