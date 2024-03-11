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
import { useState } from "react";

export const Card = ({
    field,
    isFocused,
    onClick,
    onHover,
    ...colProps
}: ICardProps) => {
    const [isHovered, setIsHovered] = useState(false);

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

    const handleHover = () => {
        setIsHovered(!isHovered);
        onHover?.();
    };

    return (
        <CardContent
            {...colProps}
            $isFocused={isFocused}
            onClick={onClick}
            onMouseEnter={handleHover}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardBody>
                {/* TODO: placeholder dragger icon */}
                {(isFocused || isHovered) && <CardDragger />}
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
                    <CardAction styleType="light">
                        <CopyIcon />
                        Duplicate
                    </CardAction>
                    <CardAction styleType="light">
                        <BinIcon />
                        Delete
                    </CardAction>
                </CardActions>
            )}
        </CardContent>
    );
};
