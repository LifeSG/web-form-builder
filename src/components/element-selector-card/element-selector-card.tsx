import { EElementType } from "src/schemas";
import { BaseCard, CardIcon } from "../common";
import { Body } from "./element-selector-card.styles";
import { Text } from "@lifesg/react-design-system/text";
import { ELEMENT_BUTTON_LABELS } from "src/data";

interface IProps {
    type: EElementType;
    onClick: () => void;
}

export const ElementSelectorCard = ({ type }: IProps) => {
    return (
        <BaseCard>
            <Body>
                <CardIcon elementType={type} />
                <Text.Body>{ELEMENT_BUTTON_LABELS[type]}</Text.Body>
            </Body>
        </BaseCard>
    );
};
