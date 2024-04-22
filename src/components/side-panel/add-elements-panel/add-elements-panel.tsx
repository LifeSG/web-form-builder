import { Text } from "@lifesg/react-design-system/text";
import { ElementSelectorCard } from "src/components/element-selector-card";
import { EElementType, useBuilder } from "src/context-providers";
import { ELEMENTS_CATEGORIES } from "src/data";
import {
    Category,
    CategoryHeader,
    ElementButtonList,
    Wrapper,
} from "./add-elements-panel.styles";

export const AddElementsPanel = () => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================
    const { addElement } = useBuilder();

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleElementSelectorClick = (type: EElementType) => () => {
        addElement(type, true);
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderElementButtons = (elementTypes: EElementType[]) => {
        return elementTypes.map((elementType) => {
            return (
                <li key={elementType}>
                    <ElementSelectorCard
                        type={elementType}
                        onClick={handleElementSelectorClick(elementType)}
                    />
                </li>
            );
        });
    };

    const renderCategories = () => {
        return ELEMENTS_CATEGORIES.map((category, key) => {
            return (
                <Category key={key}>
                    <CategoryHeader>
                        <Text.H6 weight="semibold">
                            {category.categoryTitle}
                        </Text.H6>
                    </CategoryHeader>
                    <ElementButtonList>
                        {renderElementButtons(category.elementTypes)}
                    </ElementButtonList>
                </Category>
            );
        });
    };

    return (
        <Wrapper data-testid="add-elements-panel">{renderCategories()}</Wrapper>
    );
};
