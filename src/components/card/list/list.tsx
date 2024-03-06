import { Text } from "@lifesg/react-design-system/text";

import { useBuilder } from "src/context-providers/builder";
import { Card } from "../card";
import { CardListWrapper } from "./list.styles";

export const CardList = () => {
    const { state } = useBuilder();

    return (
        <CardListWrapper desktopCols={true ? [3, 11] : [1, 7]}>
            {state.fields.size === 0 ? (
                <Text.H4>Add a field to get started!</Text.H4>
            ) : (
                Array.from(state.fields.values()).map((field) => (
                    <Card key={field.internalId} field={field} />
                ))
            )}
        </CardListWrapper>
    );
};
