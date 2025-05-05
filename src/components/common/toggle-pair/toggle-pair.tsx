import { Form } from "@lifesg/react-design-system/form";
import { Typography } from "@lifesg/react-design-system/typography";
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
    disabled?: boolean;
}

export const TogglePair = ({
    onChange,
    value,
    label,
    options,
    disabled,
}: IProps) => {
    const handleChange = (value: boolean) => {
        onChange(value);
    };

    return (
        <ToggleWrapper>
            <Form.Label
                subtitle={
                    <Typography.BodySM>{label?.subLabel}</Typography.BodySM>
                }
            >
                {label?.mainLabel}
            </Form.Label>
            <Row>
                <ToggleOptionWrapper
                    disabled={disabled}
                    type="yes"
                    checked={value === true}
                    onChange={() => handleChange(true)}
                    indicator={options ? false : true}
                >
                    {options?.[0]?.icon}
                    {options?.[0]?.title || "Yes"}
                </ToggleOptionWrapper>
                <ToggleOptionWrapper
                    disabled={disabled}
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
