import { Form } from "@lifesg/react-design-system";
import { Toggle } from "@lifesg/react-design-system/toggle";
import { useEffect, useState } from "react";
import { Row } from "./toggle-pair.styles";

interface Props {
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
}: Props) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        if (value !== defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue, id]);

    const handleChange = (value: boolean) => {
        setValue(value);
        onChange(value);
    };

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
