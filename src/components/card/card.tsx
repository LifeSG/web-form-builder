import { useBuilder } from "src/context-providers/builder";
import { ICardProps } from "./types";
import {
    CardBody,
    CardDragger,
    CardIcon,
    CardContent,
    CardActions,
    CardAction,
    CardDetails,
} from "./card.styles";
import { BinIcon } from "@lifesg/react-icons/bin";
import { CopyIcon } from "@lifesg/react-icons/copy";
import { EnvelopeIcon } from "@lifesg/react-icons/envelope";
import { EFieldType } from "src/schemas/types";
import { Text } from "@lifesg/react-design-system/text";

export const Card = ({ field }: ICardProps) => {
    const { getFocusControls } = useBuilder();
    const { isFocused, setFocus } = getFocusControls(field.internalId);    

    const renderIcon = () => {
        let icon: React.ReactNode;

        switch (field.type) {
            case EFieldType.EMAIL:
                icon = <EnvelopeIcon />;
                break;
            default:
                break;
        }

        return <CardIcon>{icon}</CardIcon>;
    };

    return (
        <CardContent $isFocused={isFocused} onClick={() => setFocus(field)}>
            <CardBody>
                {/* TODO: placeholder dragger icon */}
                {isFocused && <CardDragger />}
                {renderIcon()}
                <CardDetails>
                    <Text.Body weight={"semibold"}>{field.label}</Text.Body>
                    <Text.XSmall weight={"semibold"}>
                        ID: {field.id}
                    </Text.XSmall>
                </CardDetails>
            </CardBody>
            {isFocused && (
                <CardActions>
                    <CardAction>
                        <CopyIcon />
                        Duplicate
                    </CardAction>
                    <CardAction>
                        <BinIcon />
                        Delete
                    </CardAction>
                </CardActions>
            )}
        </CardContent>
    );
};
