import { Text } from "@lifesg/react-design-system/text";
import { ELEMENTS_CATEGORIES, ELEMENT_BUTTON_LABELS } from "src/data";
import { EElementType } from "src/schemas";
import {
    Category,
    CategoryHeader,
    ElementButtonList,
    Wrapper,
} from "./add-elements-panel.styles";

export const AddElementsPanel = () => {
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderElementButtons = (elementTypes: EElementType[]) => {
        return elementTypes.map((elementType) => {
            return (
                <li key={EElementType[elementType]}>
                    {ELEMENT_BUTTON_LABELS[elementType]}
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
