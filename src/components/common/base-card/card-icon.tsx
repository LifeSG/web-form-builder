import { EnvelopeIcon } from "@lifesg/react-icons/envelope";
import { PhoneIcon } from "@lifesg/react-icons/phone";
import { EElementType } from "src/schemas";
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
        default:
            break;
    }

    return <Container>{icon}</Container>;
};
