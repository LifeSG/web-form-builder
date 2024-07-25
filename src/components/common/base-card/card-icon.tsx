import { ChevronDownIcon } from "@lifesg/react-icons/chevron-down";
import { EnvelopeIcon } from "@lifesg/react-icons/envelope";
import { PhoneIcon } from "@lifesg/react-icons/phone";
import { EElementType } from "src/context-providers";
import { LongTextIcon, NumbersIcon, ShortTextIcon } from "../icons";
import { Container } from "./card-icon.styles";

interface IProps {
    elementType: EElementType;
}

export const CardIcon = ({ elementType }: IProps) => {
    let icon: React.ReactNode;

    switch (elementType) {
        case EElementType.EMAIL:
            icon = <EnvelopeIcon />;
            break;
        case EElementType.CONTACT:
            icon = <PhoneIcon />;
            break;
        case EElementType.NUMERIC:
            icon = <NumbersIcon />;
            break;
        case EElementType.TEXT:
            icon = <ShortTextIcon />;
            break;
        case EElementType.TEXTAREA:
            icon = <LongTextIcon />;
            break;
        case EElementType.DROPDOWN:
            icon = <ChevronDownIcon />;
            break;
        default:
            break;
    }

    return <Container>{icon}</Container>;
};
