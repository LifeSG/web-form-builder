import { Form } from "@lifesg/react-design-system";
import { Toggle } from "@lifesg/react-design-system/toggle";
import { useEffect, useState } from "react";
import { Row } from "./toggle-pair.styles";

interface Props {
    label?: string;
    defaultValue?: boolean;
    id?: string;
    onChange: (value: boolean) => void;
}

export const TogglePair = ({ onChange, defaultValue, label, id }: Props) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (value !== defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue, id]);

    const handleChange = () => {
        setValue(!value);
        onChange(!value);
    };

    return (
        <div>
            <Form.Label>{label}</Form.Label>
            <Row>
                <Toggle
                    type="yes"
                    checked={value}
                    onChange={handleChange}
                    indicator
                >
                    Yes
                </Toggle>
                <Toggle
                    type="no"
                    checked={!value}
                    onChange={handleChange}
                    indicator
                >
                    No
                </Toggle>
            </Row>
        </div>
    );
};
