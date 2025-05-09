import { MediaQuery } from "@lifesg/react-design-system/theme";
import { Typography } from "@lifesg/react-design-system/typography";
import styled, { css } from "styled-components";
import { generateElementCardView } from "../common/columns/columns.styles";
import { FormBuilderMediaQuery } from "src/data";

// =============================================================================
// STLE INTERFACES
// =============================================================================
interface IWrapperStyleProps {
    $mode: "expanded" | "minimised";
}

interface IElementItemWrapperProps extends IWrapperStyleProps {
    $size: "full" | "left" | "right";
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    position: relative;
    padding-bottom: 8rem;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return css`
                    grid-column: 4 / span 6;

                    ${FormBuilderMediaQuery.MaxWidth["2xl"]} {
                        grid-column: 3 / span 8;
                    }
                `;
            case "minimised":
                return css`
                    grid-column: 5 / span 6;

                    ${FormBuilderMediaQuery.MaxWidth["2xl"]} {
                        grid-column: 6 / span 6;
                    }
                `;
        }
    }}
`;

export const EmptyDisplayWrapper = styled.div<IWrapperStyleProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return css`
                    grid-column: 4 / span 6;

                    ${FormBuilderMediaQuery.MaxWidth["2xl"]} {
                        grid-column: 3 / span 9;
                    }
                `;
            case "minimised":
                return css`
                    grid-column: 5 / span 7;

                    ${FormBuilderMediaQuery.MaxWidth["2xl"]} {
                        grid-column: 6 / span 7;
                    }
                `;
        }
    }}
`;

export const EmptyDisplayTitle = styled(Typography.HeadingSM)`
    margin-top: 2rem;
`;

export const EmptyDisplayDescription = styled(Typography.BodyBL)`
    margin-top: 1rem;
`;

export const ElementsWrapper = styled.ul<IWrapperStyleProps>`
    list-style-type: none;
    display: grid;
    row-gap: 2rem;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return css`
                    grid-template-columns: repeat(6, minmax(0, 1fr));
                    column-gap: 2rem;

                    ${FormBuilderMediaQuery.MaxWidth["2xl"]} {
                        grid-template-columns: repeat(8, minmax(0, 1fr));
                        column-gap: 2rem;
                    }

                    ${MediaQuery.MaxWidth.xl} {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        column-gap: 2rem;
                    }
                `;
            case "minimised":
                return css`
                    grid-template-columns: repeat(6, minmax(0, 1fr));
                    column-gap: 2rem;

                    ${MediaQuery.MaxWidth.xl} {
                        grid-template-columns: repeat(4, minmax(0, 1fr));
                        column-gap: 1.5rem;
                    }
                `;
        }
    }}
`;

export const ElementItemWrapper = styled.li<IElementItemWrapperProps>`
    ${({ $mode, $size }) => generateElementCardView($size, $mode)}
`;
