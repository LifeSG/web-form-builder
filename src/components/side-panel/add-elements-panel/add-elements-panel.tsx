import { Text } from "@lifesg/react-design-system/text";
import { MagnifierIcon } from "@lifesg/react-icons/magnifier";
import { useRef, useState } from "react";
import { ElementSelectorCard } from "src/components/element-selector-card";
import { EElementType, useBuilder } from "src/context-providers";
import { ELEMENTS_CATEGORIES, ELEMENT_BUTTON_LABELS } from "src/data";
import {
    Category,
    CategoryHeader,
    ElementButtonList,
    ElementSearch,
    NoResultsWrapper,
    NotFoundIcon,
    Wrapper,
} from "./add-elements-panel.styles";

export const AddElementsPanel = () => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================
    const { addElement } = useBuilder();
    const [elementCategories, setElementCategories] =
        useState(ELEMENTS_CATEGORIES);
    const [searchInput, setSearchInput] = useState("");

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const generateSearchResults = (search: string) => {
        const regex = new RegExp(search, "i");
        const results = [];
        setSearchInput(search);
        ELEMENTS_CATEGORIES.forEach((category) => {
            const matchedElements = category.elementTypes.filter((element) => {
                return regex.test(ELEMENT_BUTTON_LABELS[element]);
            });
            if (matchedElements.length > 0) {
                results.push({
                    categoryTitle: category.categoryTitle,
                    elementTypes: matchedElements,
                });
            }
        });

        setElementCategories(results);
    };

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleElementSelectorClick = (type: EElementType) => () => {
        addElement(type, true);
    };

    const handleOnClear = () => {
        setSearchInput("");
        setElementCategories(ELEMENTS_CATEGORIES);
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
        if (elementCategories.length > 0) {
            return elementCategories.map((category, key) => (
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
            ));
        } else {
            return (
                <NoResultsWrapper>
                    <NotFoundIcon />
                    <Text.Body>No results found.</Text.Body>
                </NoResultsWrapper>
            );
        }
    };

    return (
        <Wrapper data-testid="add-elements-panel">
            <label>
                <ElementSearch
                    placeholder="Search"
                    addon={{
                        type: "custom",
                        attributes: {
                            children: (
                                <MagnifierIcon data-testid="maginfying-glass" />
                            ),
                        },
                        position: "left",
                    }}
                    allowClear={true}
                    value={searchInput}
                    onClear={handleOnClear}
                    onChange={(event) =>
                        generateSearchResults(event.target.value)
                    }
                />
            </label>

            {renderCategories()}
        </Wrapper>
    );
};
