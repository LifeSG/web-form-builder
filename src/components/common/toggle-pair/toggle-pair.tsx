import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { IComplexLabel } from "@lifesg/web-frontend-engine/components/fields";
import { ReactNode } from "react";
import { Row, ToggleOptionWrapper, ToggleWrapper } from "./toggle-pair.styles";

interface IOptionProps {
    icon?: ReactNode;
    title: string;
}

interface IProps {
    label?: IComplexLabel;
    value?: boolean;
    onChange: (value: boolean) => void;
    options?: IOptionProps[];
}

export const TogglePair = ({ onChange, value, label, options }: IProps) => {
    const handleChange = (value: boolean) => {
        onChange(value);
    };

    return (
        <ToggleWrapper>
            <Form.Label
                subtitle={<Text.H6 weight={400}>{label?.subLabel}</Text.H6>}
            >
                {label?.mainLabel}
            </Form.Label>
            <Row>
                <ToggleOptionWrapper
                    type="yes"
                    checked={value === true}
                    onChange={() => handleChange(true)}
                    indicator={options ? false : true}
                >
                    {options?.[0]?.icon}
                    {options?.[0]?.title || "Yes"}
                </ToggleOptionWrapper>
                <ToggleOptionWrapper
                    type="no"
                    checked={value === false}
                    onChange={() => handleChange(false)}
                    indicator={options ? false : true}
                >
                    {options?.[1]?.icon}
                    {options?.[1]?.title || "No"}
                </ToggleOptionWrapper>
            </Row>
        </ToggleWrapper>
    );
};
