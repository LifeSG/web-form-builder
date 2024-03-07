import { Text } from "@lifesg/react-design-system/text";
import { ETextFieldMode } from "src/context-providers";
import {
    ElementButtonListWrapper,
    ElementPickerWrapper,
    FieldCategoryDivider,
} from "./add-elements-panel.styles";
import { TextFieldLabels } from "./elements-data";
import {
    IElementButtonListProps,
    IElementListCategoryDividerProps,
} from "./types";

export const AddElementsPanel = () => {
    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    const ElementListCategoryDivider = ({
        category,
    }: IElementListCategoryDividerProps) => {
        return (
            <div>
                <Text.H6>{category}</Text.H6>
                <FieldCategoryDivider />
            </div>
        );
    };

    const ElementButtonList = ({
        category,
        children,
    }: IElementButtonListProps) => {
        return (
            <ElementButtonListWrapper>
                <div>
                    <ElementListCategoryDivider category={category} />
                </div>
                {children}
            </ElementButtonListWrapper>
        );
    };

    const ElementButton = ({ label }: { label: string }) => {
        return <li>{label}</li>;
    };

    const displayElementButtonList = (
        categoryMode: Record<string, string>,
        categoryLabels: Record<string, string>
    ) => {
        return Object.values(categoryMode).map((element: string) => {
            return (
                <ElementButton key={element} label={categoryLabels[element]} />
            );
        });
    };

    const getElementButtonListByCategory = (category: string) => {
        switch (category) {
            case "Text field": {
                return displayElementButtonList(
                    ETextFieldMode,
                    TextFieldLabels
                );
            }

            default: {
                return <></>;
            }
        }
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    return (
        <ElementPickerWrapper>
            <ElementButtonList category="Text field">
                <ul>{getElementButtonListByCategory("Text field")}</ul>
            </ElementButtonList>
        </ElementPickerWrapper>
    );
};
