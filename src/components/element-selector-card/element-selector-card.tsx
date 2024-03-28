import { Text } from "@lifesg/react-design-system/text";
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
                <Text.Body>{ELEMENT_BUTTON_LABELS[type]}</Text.Body>
            </Body>
        </BaseCard>
    );
};
