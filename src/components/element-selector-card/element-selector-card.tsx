import { Typography } from "@lifesg/react-design-system/typography";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { BaseCard, CardIcon } from "../common";
import { Body } from "./element-selector-card.styles";

interface IProps {
    type: EElementType;
    onClick: () => void;
}

export const ElementSelectorCard = ({ type, onClick }: IProps) => {
    return (
        <BaseCard onClick={onClick}>
            <Body>
                <CardIcon elementType={type} />
                <Typography.BodyBL>
                    {ELEMENT_BUTTON_LABELS[type]}
                </Typography.BodyBL>
            </Body>
        </BaseCard>
    );
};
