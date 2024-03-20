import { Text } from "@lifesg/react-design-system/text";
import { ElementSelectorCard } from "src/components/element-selector-card";
import { ELEMENTS_CATEGORIES } from "src/data";
import { EElementType } from "src/schemas";
import {
    Category,
    CategoryHeader,
    ElementButtonList,
    Wrapper,
} from "./add-elements-panel.styles";
import { useBuilder } from "src/context-providers";

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
        const rendered: JSX.Element[] = [];

        ELEMENTS_CATEGORIES.forEach((value, key) => {
            rendered.push(
                <Category key={key}>
                    <CategoryHeader>
                        <Text.H6>{value.categoryTitle}</Text.H6>
                    </CategoryHeader>
                    <ElementButtonList>
                        {renderElementButtons(value.elementTypes)}
                    </ElementButtonList>
                </Category>
            );
        });

        return rendered;
    };

    return <Wrapper>{renderCategories()}</Wrapper>;
};
