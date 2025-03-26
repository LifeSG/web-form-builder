import { V2_MediaQuery } from "@lifesg/react-design-system/v2_media";
import { V2_Text } from "@lifesg/react-design-system/v2_text";
import styled, { css } from "styled-components";
import { generateElementCardView } from "../common/columns/columns.styles";

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
                    ${V2_MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 4 / span 6;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopL} {
                        grid-column: 3 / span 8;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopM} {
                        grid-column: 3 / span 8;
                    }
                    ${V2_MediaQuery.MaxWidth.tablet} {
                        grid-column: 2 / span 6;
                    }
                `;
            case "minimised":
                return css`
                    ${V2_MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 5 / span 6;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopL} {
                        grid-column: 6 / span 6;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopM} {
                        grid-column: 6 / span 6;
                    }
                    ${V2_MediaQuery.MaxWidth.tablet} {
                        grid-column: 5 / span 4;
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
                    ${V2_MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 4 / span 6;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopL} {
                        grid-column: 3 / span 9;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopM} {
                        grid-column: 3 / span 9;
                    }
                    ${V2_MediaQuery.MaxWidth.tablet} {
                        grid-column: 2 / span 7;
                    }
                `;
            case "minimised":
                return css`
                    ${V2_MediaQuery.MaxWidth.desktop4k} {
                        grid-column: 5 / span 7;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopL} {
                        grid-column: 6 / span 7;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopM} {
                        grid-column: 6 / span 7;
                    }
                    ${V2_MediaQuery.MaxWidth.tablet} {
                        grid-column: 5 / span 4;
                    }
                `;
        }
    }}
`;

export const EmptyDisplayTitle = styled(V2_Text.H3)`
    margin-top: 2rem;
`;

export const EmptyDisplayDescription = styled(V2_Text.Body)`
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
                    ${V2_MediaQuery.MaxWidth.desktop4k} {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        column-gap: 2rem;
                    }
                    ${V2_MediaQuery.MaxWidth.desktopL} {
                        grid-template-columns: repeat(8, minmax(0, 1fr));
                        column-gap: 2rem;
                    }
                    ${V2_MediaQuery.MaxWidth.tablet} {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        column-gap: 1.5rem;
                    }
                `;
            case "minimised":
                return css`
                    ${V2_MediaQuery.MaxWidth.desktop4k} {
                        grid-template-columns: repeat(6, minmax(0, 1fr));
                        column-gap: 2rem;
                    }
                    ${V2_MediaQuery.MaxWidth.tablet} {
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
