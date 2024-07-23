import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Toggle } from "@lifesg/react-design-system/toggle";
import { IComplexLabel } from "@lifesg/web-frontend-engine/components/fields";
import { ReactNode, useEffect, useState } from "react";
import { Row, ToggleWrapper } from "./toggle-pair.styles";

interface IOptionProps {
    icon?: ReactNode;
    title: string;
}

interface IProps {
    label?: IComplexLabel;
    value?: boolean;
    id?: string;
    onChange: (value: boolean) => void;
    options?: IOptionProps[];
}

export const TogglePair = ({
    onChange,
    value: defaultValue,
    label,
    id,
    options,
}: IProps) => {
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
            <Form.Label
                subtitle={<Text.H6 weight={400}>{label?.subLabel}</Text.H6>}
            >
                {label?.mainLabel}
            </Form.Label>
            <Row $marginRequired={options ? false : true}>
                <>
                    <ToggleWrapper
                        type="yes"
                        checked={value === true}
                        onChange={() => handleChange(true)}
                        indicator={options ? false : true}
                    >
                        {options && options[0]?.icon && options[0]?.icon}
                        {options && options[0]?.title
                            ? options[0]?.title
                            : "Yes"}
                    </ToggleWrapper>
                    <ToggleWrapper
                        type="no"
                        checked={value === false}
                        onChange={() => handleChange(false)}
                        indicator={options ? false : true}
                    >
                        {options && options[1]?.icon && options[1]?.icon}
                        {options && options[1]?.title
                            ? options[1]?.title
                            : "No"}
                    </ToggleWrapper>
                </>
            </Row>
        </div>
    );
};
